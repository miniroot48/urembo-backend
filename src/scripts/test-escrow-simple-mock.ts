import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { EscrowService } from '../escrow/escrow.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';

// Simple mock implementation for testing without Jest
class MockAxios {
  private responses: any[] = [];
  
  post(url: string, data: any, config: any) {
    console.log(`🔗 Mock API Call: ${url}`);
    console.log(`📤 Request Data:`, JSON.stringify(data, null, 2));
    
    // Return appropriate mock response based on URL
    if (url.includes('/subaccount')) {
      return Promise.resolve({
        data: {
          status: true,
          message: 'Subaccount created successfully',
          data: {
            id: 'ACCT_mock123456',
            subaccount_code: 'ACCT_mock123456',
            business_name: data.business_name,
            description: 'Mock vendor for testing',
            primary_contact_email: data.primary_contact_email,
            primary_contact_name: data.primary_contact_name,
            primary_contact_phone: data.primary_contact_phone,
            settlement_bank: data.settlement_bank,
            account_number: data.account_number,
            percentage_charge: data.percentage_charge,
            is_verified: true,
          },
        },
      });
    } else if (url.includes('/transfer')) {
      return Promise.resolve({
        data: {
          status: true,
          message: 'Transfer successful',
          data: {
            id: 'TRF_mock123456',
            reference: data.reference,
            amount: data.amount,
            status: 'success',
          },
        },
      });
    } else if (url.includes('/refund')) {
      return Promise.resolve({
        data: {
          status: true,
          message: 'Refund successful',
          data: {
            id: 'REF_mock123456',
            reference: `REF_mock_${Date.now()}`,
            amount: data.amount,
            status: 'success',
          },
        },
      });
    }
    
    return Promise.resolve({
      data: {
        status: true,
        message: 'Mock response',
        data: {},
      },
    });
  }
}

// Replace axios with our mock
const originalAxios = require('axios');
const mockAxios = new MockAxios();

// Monkey patch axios for this test
const axios = require('axios');
axios.default = mockAxios;

async function testEscrowServiceWithSimpleMocks() {
  console.log('🧪 Starting Simple Mock Escrow Service Tests...\n');

  try {
    // Create NestJS application context
    const app = await NestFactory.createApplicationContext(AppModule);
    const escrowService = app.get(EscrowService);
    const prismaService = app.get(PrismaService);
    const emailService = app.get(EmailService);

    // Test 1: Create Mock Vendor Subaccount
    console.log('📋 Test 1: Creating Mock Vendor Subaccount');
    console.log('==========================================');

    // Create a test vendor profile
    const testVendor = await prismaService.profile.create({
      data: {
        email: `mock-vendor-${Date.now()}@test.com`,
        password: 'hashedpassword123',
        fullName: 'Mock Vendor',
        phone: '+1234567890',
        businessName: 'Mock Vendor Business',
        role: 'retailer',
        onboardingStatus: 'approved',
        paymentDetailsVerified: true,
      },
    });

    console.log('✅ Created test vendor profile:', testVendor.email);

    // Test subaccount creation
    const subaccountData = {
      businessName: 'Mock Vendor Business',
      email: testVendor.email,
      contactName: 'Mock Vendor',
      phone: '+1234567890',
      bankCode: 'MOCK_BANK',
      accountNumber: '1234567890',
      percentageCharge: 0,
    };

    const subaccount = await escrowService.createVendorSubaccount(subaccountData);
    console.log('✅ Mock subaccount created:', subaccount.subaccount_code);
    console.log('✅ Subaccount verified:', subaccount.is_verified);

    // Test 2: Create Mock Order and Initialize Escrow
    console.log('\n📋 Test 2: Creating Mock Order and Initializing Escrow');
    console.log('====================================================');

    // Create a test customer
    const testCustomer = await prismaService.profile.create({
      data: {
        email: `mock-customer-${Date.now()}@test.com`,
        password: 'hashedpassword123',
        fullName: 'Mock Customer',
        phone: '+1234567891',
        role: 'client',
        onboardingStatus: 'approved',
      },
    });

    // Create a test product
    const testProduct = await prismaService.product.create({
      data: {
        name: 'Mock Test Product',
        description: 'A mock product for testing escrow',
        price: 100.00,
        currency: 'USD',
        retailerId: testVendor.id,
        isActive: true,
      },
    });

    // Create a test order
    const testOrder = await prismaService.order.create({
      data: {
        userId: testCustomer.id,
        customerEmail: testCustomer.email,
        totalAmount: 100.00,
        currency: 'USD',
        status: 'pending',
        orderItems: {
          create: {
            productId: testProduct.id,
            quantity: 1,
            unitPrice: 100.00,
            totalPrice: 100.00,
          },
        },
      },
    });

    console.log('✅ Created test order:', testOrder.id);
    console.log('✅ Order total:', testOrder.currency, testOrder.totalAmount);

    // Test escrow initialization
    const mockPaymentReference = `PAY_mock_${Date.now()}`;
    const escrowTransaction = await escrowService.initializeEscrow(testOrder.id, mockPaymentReference);
    
    console.log('✅ Escrow initialized successfully');
    console.log('✅ Escrow amount:', escrowTransaction.currency, escrowTransaction.amount);
    console.log('✅ Platform commission:', escrowTransaction.currency, escrowTransaction.platformAmount);
    console.log('✅ Vendor amount:', escrowTransaction.currency, escrowTransaction.vendorAmount);
    console.log('✅ Escrow status:', escrowTransaction.status);

    // Test 3: Mock Escrow Release
    console.log('\n📋 Test 3: Mock Escrow Release');
    console.log('==============================');

    // Update order status to completed to allow release
    await prismaService.order.update({
      where: { id: testOrder.id },
      data: { status: 'completed' },
    });

    const releaseResult = await escrowService.releaseEscrow(testOrder.id, 'Test release');
    console.log('✅ Escrow released successfully:', releaseResult);

    // Test 4: Mock Escrow Refund
    console.log('\n📋 Test 4: Mock Escrow Refund');
    console.log('=============================');

    // Create another test order for refund testing
    const testOrder2 = await prismaService.order.create({
      data: {
        userId: testCustomer.id,
        customerEmail: testCustomer.email,
        totalAmount: 50.00,
        currency: 'USD',
        status: 'pending',
        escrowAmount: 50.00,
        escrowStatus: 'held',
        paystackReference: `PAY_mock_refund_${Date.now()}`,
        orderItems: {
          create: {
            productId: testProduct.id,
            quantity: 1,
            unitPrice: 50.00,
            totalPrice: 50.00,
          },
        },
      },
    });

    const refundResult = await escrowService.refundEscrow(testOrder2.id, 'Test refund - customer dispute');
    console.log('✅ Escrow refunded successfully:', refundResult);

    // Test 5: Get Escrow Statistics
    console.log('\n📋 Test 5: Escrow Statistics');
    console.log('============================');

    const stats = await escrowService.getEscrowStats();
    console.log('✅ Escrow Statistics:');
    console.log('   - Total Held:', stats.totalHeld);
    console.log('   - Total Released:', stats.totalReleased);
    console.log('   - Total Refunded:', stats.totalRefunded);
    console.log('   - Pending Orders:', stats.pendingOrders);

    // Test 6: Test Auto-Release Process
    console.log('\n📋 Test 6: Auto-Release Process');
    console.log('===============================');

    // Create an order with auto-release date in the past
    const autoReleaseOrder = await prismaService.order.create({
      data: {
        userId: testCustomer.id,
        customerEmail: testCustomer.email,
        totalAmount: 75.00,
        currency: 'USD',
        status: 'completed',
        escrowAmount: 75.00,
        escrowStatus: 'held',
        autoReleaseAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        orderItems: {
          create: {
            productId: testProduct.id,
            quantity: 1,
            unitPrice: 75.00,
            totalPrice: 75.00,
          },
        },
      },
    });

    await escrowService.processAutoRelease();
    console.log('✅ Auto-release process completed');

    // Test 7: Test Email Notifications
    console.log('\n📋 Test 7: Email Notifications');
    console.log('==============================');

    // Test sending escrow notification emails
    const mockEscrowTransaction = {
      orderId: testOrder.id,
      customerId: testCustomer.id,
      vendorId: testVendor.id,
      amount: 100,
      currency: 'USD',
      commissionRate: 0.1,
      platformAmount: 10,
      vendorAmount: 90,
      status: 'held' as const,
      paystackReference: mockPaymentReference,
      vendorSubaccountId: subaccount.subaccount_code,
      createdAt: new Date(),
    };

    // Test escrow notification emails
    await escrowService['sendEscrowNotificationEmails'](mockEscrowTransaction);
    console.log('✅ Escrow notification emails sent');

    // Cleanup
    console.log('\n🧹 Cleaning up test data...');
    await prismaService.order.deleteMany({
      where: {
        customerEmail: {
          contains: 'mock-',
        },
      },
    });
    await prismaService.product.deleteMany({
      where: {
        name: 'Mock Test Product',
      },
    });
    await prismaService.profile.deleteMany({
      where: {
        email: {
          contains: 'mock-',
        },
      },
    });
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 All Simple Mock Escrow Tests Completed Successfully!');
    console.log('======================================================');
    console.log('✅ Subaccount creation mocked');
    console.log('✅ Escrow initialization mocked');
    console.log('✅ Escrow release mocked');
    console.log('✅ Escrow refund mocked');
    console.log('✅ Statistics retrieval tested');
    console.log('✅ Auto-release process tested');
    console.log('✅ Email notifications tested');

    await app.close();
  } catch (error) {
    console.error('❌ Simple Mock Escrow Test Failed:', error);
    throw error;
  }
}

// Run the mock tests
if (require.main === module) {
  testEscrowServiceWithSimpleMocks()
    .then(() => {
      console.log('\n✅ Simple mock escrow tests completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Simple mock escrow tests failed:', error);
      process.exit(1);
    });
}

export { testEscrowServiceWithSimpleMocks };
