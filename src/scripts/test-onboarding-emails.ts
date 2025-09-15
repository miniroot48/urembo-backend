/**
 * Onboarding Email Testing Script
 * 
 * Tests all onboarding-related email templates
 * 
 * Run with: npm run test:emails:onboarding
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { EmailService } from '../email/email.service';

const TEST_EMAIL = 'pablocasso20@gmail.com';
const TEST_USER_NAME = 'Pablo Casso';

async function testOnboardingEmails() {
  console.log('🚀 Testing Onboarding Emails...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const emailService = app.get(EmailService);

  try {
    // Test account created email
    console.log('  📧 Sending account created email...');
    await emailService.sendAccountCreatedEmail(TEST_EMAIL, TEST_USER_NAME);
    console.log('  ✅ Account created email sent successfully!');

    // Test profile approved email
    console.log('  📧 Sending profile approved email...');
    await emailService.sendProfileApprovedEmail(TEST_EMAIL, TEST_USER_NAME);
    console.log('  ✅ Profile approved email sent successfully!');

    // Test profile rejected email
    console.log('  📧 Sending profile rejected email...');
    await emailService.sendProfileRejectedEmail(TEST_EMAIL, TEST_USER_NAME, 'Missing business license documentation');
    console.log('  ✅ Profile rejected email sent successfully!');

    // Test payment setup missing email
    console.log('  📧 Sending payment setup missing email...');
    await emailService.sendPaymentMissingEmail(TEST_EMAIL, TEST_USER_NAME, 'https://urembohub.com/setup-payment');
    console.log('  ✅ Payment setup missing email sent successfully!');

    // Test KYC update email
    console.log('  📧 Sending KYC update email...');
    await emailService.sendKycUpdateEmail(TEST_EMAIL, TEST_USER_NAME, 'approved', 'All documents verified successfully');
    console.log('  ✅ KYC update email sent successfully!');

    // Test dispute pending email (admin email, not onboarding)
    console.log('  📧 Sending dispute pending email...');
    await emailService.sendDisputePendingEmail(TEST_EMAIL, 'DIS-2024-001', {
      disputeId: 'DIS-2024-001',
      orderId: 'ORD-2024-001',
      reason: 'Product quality issue',
      amount: 299.99,
      customerName: 'John Doe',
      vendorName: 'Beauty Salon Pro'
    });
    console.log('  ✅ Dispute pending email sent successfully!');

    console.log('\n🎉 All onboarding emails sent successfully!');
    console.log(`📬 Check your email at ${TEST_EMAIL}`);

  } catch (error) {
    console.error('❌ Onboarding email test failed:', error);
  } finally {
    await app.close();
  }
}

// Run the test
testOnboardingEmails().catch(console.error);
