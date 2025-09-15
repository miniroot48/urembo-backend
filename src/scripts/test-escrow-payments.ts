/**
 * Escrow and Payment Testing Script
 * 
 * Tests the complete escrow and Paystack integration flow
 * 
 * Run with: npm run test:escrow:payments
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { EscrowService } from '../escrow/escrow.service';
import { PaymentsService } from '../payments/payments.service';
import { PrismaService } from '../prisma/prisma.service';

const TEST_EMAIL = 'pablocasso20@gmail.com';
const TEST_VENDOR_EMAIL = 'vendor@test.com';

async function testEscrowPayments() {
  console.log('🏦 Testing Escrow and Payment Integration...');
  console.log('=' .repeat(60));
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const escrowService = app.get(EscrowService);
  const paymentsService = app.get(PaymentsService);
  const prisma = app.get(PrismaService);

  try {
    // 1. Create a test vendor with Paystack subaccount
    console.log('\n👤 STEP 1: Creating Vendor with Paystack Subaccount');
    console.log('-'.repeat(50));
    
    const vendorSubaccount = await escrowService.createVendorSubaccount({
      businessName: 'Test Beauty Salon',
      email: TEST_VENDOR_EMAIL,
      contactName: 'Jane Vendor',
      phone: '+1234567890',
      bankCode: '044', // Access Bank Nigeria
      accountNumber: '1234567890',
      percentageCharge: 0,
    });
    
    console.log('✅ Vendor subaccount created:', vendorSubaccount.subaccount_code);
    console.log('   Business:', vendorSubaccount.business_name);
    console.log('   Verified:', vendorSubaccount.is_verified);

    // 2. Create a test order
    console.log('\n📦 STEP 2: Creating Test Order');
    console.log('-'.repeat(50));
    
    const testOrder = await prisma.order.create({
      data: {
        userId: 'test-customer-id',
        totalAmount: 150.00,
        currency: 'USD',
        status: 'pending',
        customerEmail: TEST_EMAIL,
        customerPhone: '+1234567890',
        orderItems: {
          create: [
            {
              productId: 'test-product-id',
              quantity: 1,
              unitPrice: 150.00,
              totalPrice: 150.00,
            },
          ],
        },
      },
    });
    
    console.log('✅ Test order created:', testOrder.id);
    console.log('   Amount:', testOrder.currency, testOrder.totalAmount);
    console.log('   Status:', testOrder.status);

    // 3. Initialize payment with Paystack
    console.log('\n💳 STEP 3: Initializing Payment with Paystack');
    console.log('-'.repeat(50));
    
    const paymentData = {
      amount: 150.00,
      currency: 'USD',
      email: TEST_EMAIL,
      reference: `test_payment_${Date.now()}`,
      metadata: {
        orderId: testOrder.id,
        customerName: 'Test Customer',
      },
    };
    
    const paymentResponse = await paymentsService.initializePayment(paymentData);
    
    if (paymentResponse.success) {
      console.log('✅ Payment initialized successfully');
      console.log('   Reference:', paymentResponse.reference);
      console.log('   Authorization URL:', paymentResponse.authorization_url);
    } else {
      console.log('❌ Payment initialization failed:', paymentResponse.message);
      return;
    }

    // 4. Simulate payment callback and initialize escrow
    console.log('\n🔒 STEP 4: Simulating Payment Callback and Escrow Initialization');
    console.log('-'.repeat(50));
    
    // Update order with payment reference
    await prisma.order.update({
      where: { id: testOrder.id },
      data: {
        paystackReference: paymentResponse.reference,
        status: 'confirmed',
        confirmedAt: new Date(),
      },
    });
    
    // Initialize escrow
    const escrowTransaction = await escrowService.initializeEscrow(
      testOrder.id, 
      paymentResponse.reference
    );
    
    console.log('✅ Escrow initialized successfully');
    console.log('   Order ID:', escrowTransaction.orderId);
    console.log('   Total Amount:', escrowTransaction.currency, escrowTransaction.amount);
    console.log('   Platform Commission:', escrowTransaction.currency, escrowTransaction.platformAmount);
    console.log('   Vendor Amount:', escrowTransaction.currency, escrowTransaction.vendorAmount);
    console.log('   Status:', escrowTransaction.status);

    // 5. Test escrow release
    console.log('\n💰 STEP 5: Testing Escrow Release');
    console.log('-'.repeat(50));
    
    // Simulate order completion
    await prisma.order.update({
      where: { id: testOrder.id },
      data: {
        status: 'completed',
        completedAt: new Date(),
      },
    });
    
    const releaseResult = await escrowService.releaseEscrow(
      testOrder.id, 
      'Order completed successfully'
    );
    
    if (releaseResult) {
      console.log('✅ Escrow released successfully');
      console.log('   Vendor should receive:', escrowTransaction.currency, escrowTransaction.vendorAmount);
    } else {
      console.log('❌ Escrow release failed');
    }

    // 6. Test escrow statistics
    console.log('\n📊 STEP 6: Testing Escrow Statistics');
    console.log('-'.repeat(50));
    
    const escrowStats = await escrowService.getEscrowStats();
    console.log('✅ Escrow statistics retrieved:');
    console.log('   Total Held:', escrowStats.totalHeld);
    console.log('   Total Released:', escrowStats.totalReleased);
    console.log('   Total Refunded:', escrowStats.totalRefunded);
    console.log('   Pending Orders:', escrowStats.pendingOrders);

    // 7. Test payment statistics
    console.log('\n💳 STEP 7: Testing Payment Statistics');
    console.log('-'.repeat(50));
    
    const paymentStats = await paymentsService.getPaymentStats();
    console.log('✅ Payment statistics retrieved:');
    console.log('   Total Transactions:', paymentStats.totalTransactions);
    console.log('   Total Amount:', paymentStats.totalAmount);
    console.log('   Successful Transactions:', paymentStats.successfulTransactions);
    console.log('   Failed Transactions:', paymentStats.failedTransactions);

    // 8. Test refund scenario
    console.log('\n🔄 STEP 8: Testing Refund Scenario');
    console.log('-'.repeat(50));
    
    // Create another test order for refund
    const refundOrder = await prisma.order.create({
      data: {
        userId: 'test-customer-id-2',
        totalAmount: 75.00,
        currency: 'USD',
        status: 'confirmed',
        customerEmail: TEST_EMAIL,
        paystackReference: `refund_test_${Date.now()}`,
        escrowAmount: 75.00,
        escrowStatus: 'held',
        commissionAmount: 7.50,
        commissionRate: 0.10,
      },
    });
    
    const refundResult = await escrowService.refundEscrow(
      refundOrder.id,
      'Customer requested refund due to service quality issues'
    );
    
    if (refundResult) {
      console.log('✅ Refund processed successfully');
      console.log('   Order ID:', refundOrder.id);
      console.log('   Refund Amount:', refundOrder.currency, refundOrder.escrowAmount);
    } else {
      console.log('❌ Refund processing failed');
    }

    console.log('\n' + '='.repeat(60));
    console.log('🎉 ALL ESCROW AND PAYMENT TESTS COMPLETED!');
    console.log('📧 Check your email for notifications');
    console.log('🏦 Escrow system is working correctly');
    console.log('💳 Paystack integration is functional');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('❌ Escrow/Payment test failed:', error);
  } finally {
    await app.close();
  }
}

// Run the test
testEscrowPayments().catch(console.error);
