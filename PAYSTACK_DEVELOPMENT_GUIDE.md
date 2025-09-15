# Paystack Development Testing Guide

This guide explains how to test Paystack integration in development mode, including IP whitelisting, callback URLs, and mock testing.

## 🔧 Development Setup

### 1. Paystack Test Environment

#### Test API Keys
- **Public Key**: `pk_test_...` (for frontend)
- **Secret Key**: `sk_test_...` (for backend)
- **Base URL**: `https://api.paystack.co` (same for test and live)

#### Environment Variables
```bash
# .env
PAYSTACK_SECRET_KEY=sk_test_your_test_secret_key_here
PAYSTACK_PUBLIC_KEY=pk_test_your_test_public_key_here
PAYSTACK_WEBHOOK_SECRET=your_webhook_secret_here
```

### 2. IP Whitelisting for Development

#### For Local Development:
1. **Get your public IP**: Visit [whatismyipaddress.com](https://whatismyipaddress.com)
2. **Add to Paystack Dashboard**:
   - Go to [Paystack Dashboard](https://dashboard.paystack.com)
   - Navigate to Settings → API Keys & Webhooks
   - Add your IP address to the whitelist

#### For ngrok (Recommended):
1. **Install ngrok**: `npm install -g ngrok` or download from [ngrok.com](https://ngrok.com)
2. **Start your backend**: `npm run start:dev`
3. **Expose your backend**: `ngrok http 3000`
4. **Use ngrok URL**: `https://your-ngrok-url.ngrok.io`
5. **Add ngrok IP to whitelist**: Use ngrok's static IP feature for consistent testing

#### Common Development IPs:
- **Localhost**: `127.0.0.1` (usually not needed)
- **Your ISP IP**: Check with `curl ifconfig.me`
- **ngrok IP**: Changes with each session (use static IP for consistency)

### 3. Callback URLs Configuration

#### Webhook URLs:
```
# Development with ngrok
https://your-ngrok-url.ngrok.io/api/payments/callback/paystack

# Local development (if using port forwarding)
http://localhost:3000/api/payments/callback/paystack

# Production
https://yourdomain.com/api/payments/callback/paystack
```

#### Redirect URLs:
```
# Success page
https://your-ngrok-url.ngrok.io/payment/success

# Failure page
https://your-ngrok-url.ngrok.io/payment/failure
```

### 4. Testing with ngrok

#### Setup ngrok:
```bash
# Install ngrok
npm install -g ngrok

# Start your backend
npm run start:dev

# In another terminal, expose your backend
ngrok http 3000
```

#### Update Paystack Webhooks:
1. Go to Paystack Dashboard → Settings → API Keys & Webhooks
2. Update webhook URL to: `https://your-ngrok-url.ngrok.io/api/payments/callback/paystack`
3. Test webhook delivery

## 🧪 Testing Strategies

### 1. Mock Testing (Recommended for Development)

Use our mock test scripts to test escrow functionality without making real Paystack API calls:

```bash
# Test escrow service with mocks
npm run test:escrow:mock

# Test all escrow functionality
npm run test:escrow:simple-mock
```

### 2. Sandbox Testing

For testing with real Paystack API calls but in test mode:

```bash
# Test with real Paystack test environment
npm run test:escrow:payments
npm run test:paystack:subaccounts
npm run test:split:payments
```

### 3. Webhook Testing

#### Using ngrok for webhook testing:
1. Start ngrok: `ngrok http 3000`
2. Update Paystack webhook URL
3. Make test payments
4. Monitor webhook delivery in Paystack dashboard

#### Webhook Testing Tools:
- **Paystack Webhook Tester**: Built into Paystack dashboard
- **ngrok Web Interface**: Monitor requests at `http://localhost:4040`
- **Postman**: Test webhook endpoints directly

## 🔍 Test Scenarios

### 1. Payment Flow Testing
```bash
# Test complete payment flow
npm run test:escrow:payments
```

**What it tests:**
- Payment initialization
- Payment verification
- Escrow initialization
- Order status updates

### 2. Subaccount Testing
```bash
# Test vendor subaccount creation
npm run test:paystack:subaccounts
```

**What it tests:**
- Vendor subaccount creation
- Subaccount verification
- Profile updates

### 3. Split Payment Testing
```bash
# Test split payments
npm run test:split:payments
```

**What it tests:**
- Platform commission calculation
- Vendor payment distribution
- Transfer processing

## 🚨 Common Issues & Solutions

### 1. IP Whitelist Issues
**Error**: `403 Forbidden - IP not whitelisted`
**Solution**: Add your IP to Paystack dashboard whitelist

### 2. Webhook Delivery Issues
**Error**: Webhooks not being received
**Solutions**:
- Check ngrok is running
- Verify webhook URL in Paystack dashboard
- Check webhook secret configuration

### 3. Test Card Issues
**Error**: Test cards not working
**Solutions**:
- Use Paystack test cards: `4084084084084081`
- Check card details (CVV: 408, Expiry: any future date)
- Verify test mode is enabled

### 4. SSL Certificate Issues
**Error**: SSL certificate problems with ngrok
**Solutions**:
- Use HTTPS ngrok URL
- Check ngrok certificate status
- Use ngrok's paid plan for custom domains

## 📊 Monitoring & Debugging

### 1. Paystack Dashboard
- Monitor transactions in real-time
- Check webhook delivery status
- View API usage and limits

### 2. Application Logs
```bash
# Monitor backend logs
npm run start:dev

# Check specific service logs
grep "EscrowService" logs/app.log
```

### 3. Database Monitoring
```bash
# Check escrow transactions
npx prisma studio

# Query escrow data
npx prisma db seed
```

## 🔐 Security Considerations

### 1. API Key Security
- Never commit API keys to version control
- Use environment variables
- Rotate keys regularly
- Use different keys for test/production

### 2. Webhook Security
- Verify webhook signatures
- Use HTTPS for webhook URLs
- Implement idempotency
- Log all webhook events

### 3. Test Data
- Use test data only in development
- Clean up test data regularly
- Don't use real customer data in tests

## 📝 Best Practices

### 1. Development Workflow
1. Start with mock tests
2. Test with sandbox environment
3. Use ngrok for webhook testing
4. Test with real test cards
5. Verify all scenarios work

### 2. Error Handling
- Implement proper error handling
- Log all API calls and responses
- Handle network timeouts
- Implement retry logic

### 3. Testing Coverage
- Test all payment scenarios
- Test error conditions
- Test webhook delivery
- Test refund scenarios

## 🚀 Production Deployment

### 1. Environment Setup
- Use production API keys
- Configure production webhook URLs
- Set up proper SSL certificates
- Configure IP whitelisting

### 2. Monitoring
- Set up transaction monitoring
- Configure webhook monitoring
- Implement alerting
- Monitor API usage

### 3. Security
- Use production-grade security
- Implement proper authentication
- Monitor for suspicious activity
- Regular security audits

## 📞 Support

### Paystack Support
- **Documentation**: [Paystack Docs](https://paystack.com/docs)
- **Support**: [Paystack Support](https://paystack.com/support)
- **Status**: [Paystack Status](https://status.paystack.com)

### Internal Support
- Check application logs
- Review error messages
- Test with mock data first
- Contact development team

---

## Quick Commands Reference

```bash
# Mock testing
npm run test:escrow:simple-mock

# Real API testing
npm run test:escrow:payments
npm run test:paystack:subaccounts
npm run test:split:payments

# Development server
npm run start:dev

# Database operations
npm run db:push
npm run db:generate
npx prisma studio

# ngrok setup
ngrok http 3000
```
