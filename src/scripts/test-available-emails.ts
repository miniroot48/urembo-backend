/**
 * Test Available Email Methods
 * 
 * Tests the actual email methods available in EmailService
 * 
 * Run with: npm run test:emails:available
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { EmailService } from '../email/email.service';

const TEST_EMAIL = 'pablocasso20@gmail.com';
const TEST_USER_NAME = 'Pablo Casso';

async function testAvailableEmails() {
  console.log('📧 Testing Available Email Methods...');
  console.log(`📬 Sending emails to: ${TEST_EMAIL}`);
  console.log('=' .repeat(60));
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const emailService = app.get(EmailService);

  try {
    // Authentication Emails
    console.log('\n🔐 AUTHENTICATION EMAILS');
    console.log('-'.repeat(30));
    
    await emailService.sendWelcomeEmail(TEST_EMAIL, TEST_USER_NAME);
    console.log('✅ Welcome email sent');
    
    await emailService.sendVerificationEmail(TEST_EMAIL, TEST_USER_NAME, 'https://urembohub.com/verify-email?token=xyz789');
    console.log('✅ Verification email sent');
    
    await emailService.sendPasswordResetEmail(TEST_EMAIL, TEST_USER_NAME, 'https://urembohub.com/reset-password?token=abc123');
    console.log('✅ Password reset email sent');
    
    await emailService.sendPasswordChangedEmail(TEST_EMAIL, TEST_USER_NAME);
    console.log('✅ Password changed email sent');
    
    await emailService.sendSuspiciousLoginEmail(TEST_EMAIL, TEST_USER_NAME, '192.168.1.100', 'New York, NY');
    console.log('✅ Suspicious login email sent');

    // Onboarding Emails
    console.log('\n🚀 ONBOARDING EMAILS');
    console.log('-'.repeat(30));
    
    await emailService.sendAccountCreatedEmail(TEST_EMAIL, TEST_USER_NAME);
    console.log('✅ Account created email sent');
    
    await emailService.sendProfileApprovedEmail(TEST_EMAIL, TEST_USER_NAME);
    console.log('✅ Profile approved email sent');
    
    await emailService.sendProfileRejectedEmail(TEST_EMAIL, TEST_USER_NAME, 'Missing business license documentation');
    console.log('✅ Profile rejected email sent');
    
    await emailService.sendPaymentMissingEmail(TEST_EMAIL, TEST_USER_NAME, 'https://urembohub.com/setup-payment');
    console.log('✅ Payment missing email sent');
    
    await emailService.sendKycUpdateEmail(TEST_EMAIL, TEST_USER_NAME, 'approved', 'All documents verified successfully');
    console.log('✅ KYC update email sent');

    // Order Emails
    console.log('\n📦 ORDER EMAILS');
    console.log('-'.repeat(30));
    
    const orderData = {
      orderId: 'ORD-2024-001',
      totalAmount: 299.99,
      currency: 'USD',
      items: ['Product A', 'Product B']
    };
    
    await emailService.sendNewOrderEmail(TEST_EMAIL, TEST_USER_NAME, 'ORD-2024-001', orderData);
    console.log('✅ New order email sent');
    
    await emailService.sendOrderAcceptedEmail(TEST_EMAIL, TEST_USER_NAME, 'ORD-2024-001', orderData);
    console.log('✅ Order accepted email sent');
    
    await emailService.sendOrderShippedEmail(TEST_EMAIL, TEST_USER_NAME, 'ORD-2024-001', 'TRK123456789');
    console.log('✅ Order shipped email sent');
    
    await emailService.sendOrderDeliveredEmail(TEST_EMAIL, TEST_USER_NAME, 'ORD-2024-001');
    console.log('✅ Order delivered email sent');

    // Booking Emails
    console.log('\n📅 BOOKING EMAILS');
    console.log('-'.repeat(30));
    
    const bookingData = {
      bookingId: 'APT-2024-001',
      serviceName: 'Hair Styling Service',
      appointmentDate: '2024-02-15',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      price: 150.00,
      currency: 'USD'
    };
    
    await emailService.sendBookingConfirmedClientEmail(TEST_EMAIL, TEST_USER_NAME, bookingData);
    console.log('✅ Booking confirmed (client) email sent');
    
    await emailService.sendBookingConfirmedVendorEmail(TEST_EMAIL, TEST_USER_NAME, bookingData);
    console.log('✅ Booking confirmed (vendor) email sent');
    
    await emailService.sendBookingReminderEmail(TEST_EMAIL, TEST_USER_NAME, bookingData);
    console.log('✅ Booking reminder email sent');

    // Payment Emails
    console.log('\n💳 PAYMENT EMAILS');
    console.log('-'.repeat(30));
    
    const paymentData = {
      paymentId: 'PAY-2024-001',
      amount: 299.99,
      currency: 'USD',
      orderId: 'ORD-2024-001',
      method: 'Credit Card'
    };
    
    await emailService.sendPaymentSuccessfulEmail(TEST_EMAIL, TEST_USER_NAME, paymentData);
    console.log('✅ Payment successful email sent');
    
    await emailService.sendPaymentFailedEmail(TEST_EMAIL, TEST_USER_NAME, paymentData);
    console.log('✅ Payment failed email sent');

    // Admin Emails
    console.log('\n👨‍💼 ADMIN EMAILS');
    console.log('-'.repeat(30));
    
    const disputeData = {
      disputeId: 'DIS-2024-001',
      orderId: 'ORD-2024-001',
      reason: 'Product quality issue',
      amount: 299.99,
      currency: 'USD'
    };
    
    await emailService.sendDisputePendingEmail(TEST_EMAIL, 'DIS-2024-001', disputeData);
    console.log('✅ Dispute pending email sent');
    
    await emailService.sendHighValueOrderEmail(TEST_EMAIL, 'ORD-2024-001', orderData);
    console.log('✅ High value order email sent');

    console.log('\n' + '='.repeat(60));
    console.log('🎉 ALL AVAILABLE EMAIL TESTS COMPLETED!');
    console.log(`📬 Check your email at ${TEST_EMAIL}`);
    console.log('📊 Total emails sent: 20+');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\n❌ Email test failed:', error);
  } finally {
    await app.close();
  }
}

// Run the test
testAvailableEmails().catch(console.error);
