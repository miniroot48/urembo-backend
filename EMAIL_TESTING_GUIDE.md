# Email Testing Guide

This guide explains how to test all email functionality in the Urembo Hub backend system.

## Overview

The email system is fully integrated into the backend services and sends emails at the appropriate times during user workflows:

- **Authentication**: Welcome emails when users register
- **Onboarding**: Profile approval/rejection emails
- **Orders**: Order confirmation, status updates, and completion emails
- **Bookings**: Appointment confirmation and reminder emails
- **Payments**: Payment success/failure and refund emails
- **Admin**: System notifications and reports

## Prerequisites

1. **Environment Setup**: Ensure your `.env` file contains:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   EMAIL_FROM_NAME=Urembo Hub
   EMAIL_FROM_EMAIL=noreply@urembohub.com
   EMAIL_REPLY_TO=support@urembohub.com
   FRONTEND_URL=https://urembohub.com
   ```

2. **Dependencies**: Make sure all dependencies are installed:
   ```bash
   npm install
   ```

## Email Integration Points

### 1. Authentication Service (`src/auth/auth.service.ts`)
- **Registration**: Sends welcome email when user creates account
- **Location**: `register()` method

### 2. Onboarding Service (`src/onboarding/onboarding.service.ts`)
- **Profile Approval**: Sends approval email when profile is approved
- **Profile Rejection**: Sends rejection email with reason when profile is rejected
- **Location**: `updateUserOnboardingStatus()` method

### 3. Orders Service (`src/orders/orders.service.ts`)
- **Order Creation**: Sends confirmation email when order is created
- **Status Updates**: Sends appropriate emails when order status changes
- **Locations**: `createOrder()` and `updateOrder()` methods

### 4. Appointments Service (`src/appointments/appointments.service.ts`)
- **Booking Creation**: Sends confirmation email when appointment is booked
- **Location**: `createAppointment()` method

## Testing Commands

### Test All Emails
```bash
npm run test:emails:all
```
Sends all 25+ email templates to `pablocasso20@gmail.com`

### Test by Category

#### Authentication Emails
```bash
npm run test:emails:auth
```
Tests: Account created, password reset, email verification, login notification

#### Onboarding Emails
```bash
npm run test:emails:onboarding
```
Tests: Account created, profile approved/rejected, payment missing, KYC update, dispute pending

#### Order Emails
```bash
npm run test:emails:orders
```
Tests: Order confirmation, confirmed, shipped, delivered, cancelled, refund processed

#### Booking Emails
```bash
npm run test:emails:bookings
```
Tests: Booking confirmation, reminder, cancelled, completed

#### Payment Emails
```bash
npm run test:emails:payments
```
Tests: Payment successful/failed, refunded, commission earned, escrow released

#### Admin Emails
```bash
npm run test:emails:admin
```
Tests: New user registration, dispute notification, system maintenance, security alert, monthly report

### Test Original Script
```bash
npm run test:emails
```
Runs the original comprehensive test script

## Email Templates Available

### Authentication (4 templates)
- `sendAccountCreatedEmail()` - Welcome email for new users
- `sendPasswordResetEmail()` - Password reset instructions
- `sendEmailVerificationEmail()` - Email verification link
- `sendLoginNotificationEmail()` - Login activity notification

### Onboarding (6 templates)
- `sendAccountCreatedEmail()` - Account creation confirmation
- `sendProfileApprovedEmail()` - Profile approval notification
- `sendProfileRejectedEmail()` - Profile rejection with reason
- `sendPaymentMissingEmail()` - Payment setup reminder
- `sendKycUpdateEmail()` - KYC status update
- `sendDisputePendingEmail()` - Dispute notification

### Orders (6 templates)
- `sendOrderConfirmationEmail()` - Order confirmation
- `sendOrderConfirmedEmail()` - Order confirmed by vendor
- `sendOrderShippedEmail()` - Order shipped notification
- `sendOrderDeliveredEmail()` - Order delivered confirmation
- `sendOrderCancelledEmail()` - Order cancellation
- `sendRefundProcessedEmail()` - Refund processed notification

### Bookings (4 templates)
- `sendBookingConfirmationEmail()` - Appointment confirmation
- `sendBookingReminderEmail()` - Appointment reminder
- `sendBookingCancelledEmail()` - Appointment cancellation
- `sendBookingCompletedEmail()` - Service completion

### Payments (5 templates)
- `sendPaymentSuccessfulEmail()` - Payment success
- `sendPaymentFailedEmail()` - Payment failure
- `sendPaymentRefundedEmail()` - Refund processed
- `sendCommissionEarnedEmail()` - Commission earned
- `sendEscrowReleasedEmail()` - Escrow release

### Admin (5 templates)
- `sendNewUserRegistrationEmail()` - New user notification
- `sendDisputeNotificationEmail()` - Dispute alert
- `sendSystemMaintenanceEmail()` - Maintenance notification
- `sendSecurityAlertEmail()` - Security alert
- `sendMonthlyReportEmail()` - Monthly statistics

## Verification Steps

1. **Run Test Commands**: Execute the desired test command
2. **Check Email**: Look for emails in `pablocasso20@gmail.com`
3. **Verify Content**: Ensure email content matches expected templates
4. **Check Timing**: Verify emails are sent at appropriate workflow points

## Troubleshooting

### Common Issues

1. **Missing RESEND_API_KEY**: Ensure your `.env` file has the correct Resend API key
2. **Module Import Errors**: Make sure all modules properly import `EmailModule`
3. **Email Service Not Found**: Verify `EmailService` is properly injected in constructors

### Debug Mode

To see detailed email sending logs, check the console output when running tests. The system logs:
- Email sending attempts
- Success/failure status
- Error messages if any

### Email Service Location

The main email service is located at:
- **Service**: `src/email/email.service.ts`
- **Module**: `src/email/email.module.ts`
- **Templates**: `src/email/templates/` (if using template files)

## Production Considerations

1. **Error Handling**: Email failures don't break main workflows
2. **Rate Limiting**: Consider Resend API rate limits
3. **Monitoring**: Set up email delivery monitoring
4. **Templates**: Customize email templates for your brand
5. **Testing**: Always test in staging before production

## Support

For issues with email functionality:
1. Check the console logs for error messages
2. Verify environment variables are set correctly
3. Test with individual email categories first
4. Check Resend dashboard for delivery status
