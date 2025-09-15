/**
 * Backend Email Testing Script
 * 
 * This script tests all available email templates by sending test emails
 * to pablocasso20@gmail.com for verification.
 * 
 * Run with: npm run test:emails
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { EmailService } from '../email/email.service';

// Test configuration
const TEST_EMAIL = 'pablocasso20@gmail.com';
const TEST_USER_NAME = 'Pablo Casso';

// Test data generators
const generateOrderData = () => ({
  order_number: 'ORD-2024-001',
  total_amount: '$150.00',
  currency: 'USD',
  created_at: new Date().toLocaleDateString(),
  customer_name: 'John Doe',
  vendor_name: 'Beauty Studio Pro'
});

const generateBookingData = () => ({
  service_name: 'Hair Styling & Makeup',
  vendor_name: 'Glamour Studio',
  client_name: 'Jane Smith',
  appointment_date: '2024-01-15',
  appointment_time: '2:00 PM',
  booking_amount: '$200.00'
});

const generatePaymentData = () => ({
  amount: '$150.00',
  currency: 'USD',
  payment_method: 'Credit Card',
  transaction_id: 'TXN-2024-001'
});

const generateDisputeData = () => ({
  dispute_type: 'Service Quality',
  reason: 'Service did not meet expectations',
  order_id: 'ORD-2024-001',
  amount: '$150.00'
});

// Test functions
async function testAuthenticationEmails(emailService: EmailService) {
  console.log('\n🔐 Testing Authentication Emails...');
  
  try {
    // Welcome email
    console.log('  📧 Sending welcome email...');
    await emailService.sendWelcomeEmail(TEST_EMAIL, TEST_USER_NAME);
    
    // Email verification
    console.log('  📧 Sending email verification...');
    await emailService.sendVerificationEmail(TEST_EMAIL, TEST_USER_NAME, 'https://urembohub.com/verify?token=test123');
    
    // Password reset
    console.log('  📧 Sending password reset...');
    await emailService.sendPasswordResetEmail(TEST_EMAIL, TEST_USER_NAME, 'https://urembohub.com/reset?token=test123');
    
    // Password changed
    console.log('  📧 Sending password changed confirmation...');
    await emailService.sendPasswordChangedEmail(TEST_EMAIL, TEST_USER_NAME);
    
    // Suspicious login
    console.log('  📧 Sending suspicious login alert...');
    await emailService.sendSuspiciousLoginEmail(TEST_EMAIL, TEST_USER_NAME, '192.168.1.100', 'New York, NY');
    
    console.log('  ✅ Authentication emails sent successfully!');
  } catch (error) {
    console.error('  ❌ Authentication email test failed:', error);
  }
}

async function testOnboardingEmails(emailService: EmailService) {
  console.log('\n🚀 Testing Onboarding Emails...');
  
  try {
    // Account created
    console.log('  📧 Sending account created email...');
    await emailService.sendAccountCreatedEmail(TEST_EMAIL, TEST_USER_NAME);
    
    // Profile approved
    console.log('  📧 Sending profile approved email...');
    await emailService.sendProfileApprovedEmail(TEST_EMAIL, TEST_USER_NAME);
    
    // Profile rejected
    console.log('  📧 Sending profile rejected email...');
    await emailService.sendProfileRejectedEmail(TEST_EMAIL, TEST_USER_NAME, 'Missing business license documentation');
    
    // Payment missing
    console.log('  📧 Sending payment setup missing email...');
    await emailService.sendPaymentMissingEmail(TEST_EMAIL, TEST_USER_NAME, 'https://urembohub.com/setup-payment');
    
    // KYC update
    console.log('  📧 Sending KYC update email...');
    await emailService.sendKycUpdateEmail(TEST_EMAIL, TEST_USER_NAME, 'approved', 'All documents verified successfully');
    
    console.log('  ✅ Onboarding emails sent successfully!');
  } catch (error) {
    console.error('  ❌ Onboarding email test failed:', error);
  }
}

async function testOrderEmails(emailService: EmailService) {
  console.log('\n📦 Testing Order Emails...');
  
  try {
    const orderData = generateOrderData();
    
    // New order placed
    console.log('  📧 Sending new order email...');
    await emailService.sendNewOrderEmail(TEST_EMAIL, TEST_USER_NAME, 'ORD-2024-001', orderData);
    
    // Order accepted
    console.log('  📧 Sending order accepted email...');
    await emailService.sendOrderAcceptedEmail(TEST_EMAIL, TEST_USER_NAME, 'ORD-2024-001', orderData);
    
    // Order shipped
    console.log('  📧 Sending order shipped email...');
    await emailService.sendOrderShippedEmail(TEST_EMAIL, TEST_USER_NAME, 'ORD-2024-001', 'TRK-123456789');
    
    // Order delivered
    console.log('  📧 Sending order delivered email...');
    await emailService.sendOrderDeliveredEmail(TEST_EMAIL, TEST_USER_NAME, 'ORD-2024-001');
    
    console.log('  ✅ Order emails sent successfully!');
  } catch (error) {
    console.error('  ❌ Order email test failed:', error);
  }
}

async function testBookingEmails(emailService: EmailService) {
  console.log('\n📅 Testing Booking Emails...');
  
  try {
    const bookingData = generateBookingData();
    
    // Booking confirmed (client)
    console.log('  📧 Sending booking confirmed (client) email...');
    await emailService.sendBookingConfirmedClientEmail(TEST_EMAIL, TEST_USER_NAME, bookingData);
    
    // Booking confirmed (vendor)
    console.log('  📧 Sending booking confirmed (vendor) email...');
    await emailService.sendBookingConfirmedVendorEmail(TEST_EMAIL, TEST_USER_NAME, bookingData);
    
    // Booking reminder
    console.log('  📧 Sending booking reminder email...');
    await emailService.sendBookingReminderEmail(TEST_EMAIL, TEST_USER_NAME, bookingData);
    
    console.log('  ✅ Booking emails sent successfully!');
  } catch (error) {
    console.error('  ❌ Booking email test failed:', error);
  }
}

async function testPaymentEmails(emailService: EmailService) {
  console.log('\n💳 Testing Payment Emails...');
  
  try {
    const paymentData = generatePaymentData();
    
    // Payment successful
    console.log('  📧 Sending payment successful email...');
    await emailService.sendPaymentSuccessfulEmail(TEST_EMAIL, TEST_USER_NAME, paymentData);
    
    // Payment failed
    console.log('  📧 Sending payment failed email...');
    await emailService.sendPaymentFailedEmail(TEST_EMAIL, TEST_USER_NAME, paymentData);
    
    console.log('  ✅ Payment emails sent successfully!');
  } catch (error) {
    console.error('  ❌ Payment email test failed:', error);
  }
}

async function testAdminEmails(emailService: EmailService) {
  console.log('\n👨‍💼 Testing Admin Emails...');
  
  try {
    const disputeData = generateDisputeData();
    const orderData = generateOrderData();
    
    // Dispute pending
    console.log('  📧 Sending dispute pending email...');
    await emailService.sendDisputePendingEmail(TEST_EMAIL, 'DISP-2024-001', disputeData);
    
    // High value order
    console.log('  📧 Sending high value order alert...');
    await emailService.sendHighValueOrderEmail(TEST_EMAIL, 'ORD-2024-001', orderData);
    
    console.log('  ✅ Admin emails sent successfully!');
  } catch (error) {
    console.error('  ❌ Admin email test failed:', error);
  }
}

// Main test runner
async function runAllEmailTests() {
  console.log('🚀 Starting Backend Email Testing Suite');
  console.log(`📧 Test emails will be sent to: ${TEST_EMAIL}`);
  console.log('=' .repeat(60));
  
  const startTime = Date.now();
  
  try {
    // Create NestJS application context
    const app = await NestFactory.createApplicationContext(AppModule);
    const emailService = app.get(EmailService);
    
    await testAuthenticationEmails(emailService);
    await testOnboardingEmails(emailService);
    await testOrderEmails(emailService);
    await testBookingEmails(emailService);
    await testPaymentEmails(emailService);
    await testAdminEmails(emailService);
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log('\n' + '='.repeat(60));
    console.log('🎉 All email tests completed successfully!');
    console.log(`⏱️  Total time: ${duration.toFixed(2)} seconds`);
    console.log(`📧 Check your inbox at ${TEST_EMAIL} for all test emails`);
    console.log('='.repeat(60));
    
    await app.close();
  } catch (error) {
    console.error('\n❌ Email testing suite failed:', error);
    process.exit(1);
  }
}

// Individual test runners
async function runSingleCategoryTest(category: string) {
  console.log(`🚀 Running ${category} email tests`);
  console.log(`📧 Test emails will be sent to: ${TEST_EMAIL}`);
  console.log('=' .repeat(60));
  
  try {
    // Create NestJS application context
    const app = await NestFactory.createApplicationContext(AppModule);
    const emailService = app.get(EmailService);
    
    switch (category.toLowerCase()) {
      case 'auth':
      case 'authentication':
        await testAuthenticationEmails(emailService);
        break;
      case 'onboarding':
        await testOnboardingEmails(emailService);
        break;
      case 'orders':
        await testOrderEmails(emailService);
        break;
      case 'bookings':
        await testBookingEmails(emailService);
        break;
      case 'payments':
        await testPaymentEmails(emailService);
        break;
      case 'admin':
        await testAdminEmails(emailService);
        break;
      default:
        console.error(`❌ Unknown category: ${category}`);
        console.log('Available categories: auth, onboarding, orders, bookings, payments, admin');
        process.exit(1);
    }
    
    console.log('\n✅ Category test completed successfully!');
    await app.close();
  } catch (error) {
    console.error(`❌ ${category} email test failed:`, error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  const category = process.argv[2];
  
  if (category) {
    runSingleCategoryTest(category);
  } else {
    runAllEmailTests();
  }
}

export {
  runAllEmailTests,
  runSingleCategoryTest,
  testAuthenticationEmails,
  testOnboardingEmails,
  testOrderEmails,
  testBookingEmails,
  testPaymentEmails,
  testAdminEmails
};
