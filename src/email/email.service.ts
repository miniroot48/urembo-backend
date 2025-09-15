import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { generateBaseEmailHTML } from './templates/base-template';
import { 
  getWelcomeTemplate, 
  getVerificationTemplate, 
  getPasswordResetTemplate, 
  getPasswordChangedTemplate, 
  getSuspiciousLoginTemplate 
} from './templates/auth-templates';
import { 
  getAccountCreatedTemplate, 
  getProfileApprovedTemplate, 
  getProfileRejectedTemplate, 
  getPaymentMissingTemplate, 
  getKycUpdateTemplate 
} from './templates/onboarding-templates';
import { 
  getNewOrderTemplate, 
  getOrderAcceptedTemplate, 
  getOrderShippedTemplate, 
  getOrderDeliveredTemplate 
} from './templates/order-templates';
import { 
  getBookingConfirmedClientTemplate, 
  getBookingConfirmedVendorTemplate, 
  getBookingReminderTemplate 
} from './templates/booking-templates';
import { 
  getPaymentSuccessfulTemplate, 
  getPaymentFailedTemplate 
} from './templates/payment-templates';

export interface EmailTemplate {
  subject: string;
  html: string;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: Resend;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (!apiKey) {
      this.logger.warn('RESEND_API_KEY not found in environment variables');
    }
    this.resend = new Resend(apiKey);
  }

  async sendEmail(options: SendEmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const { data, error } = await this.resend.emails.send({
        from: options.from || 'Urembo Hub <noreply@urembohub.com>',
        to: [options.to],
        subject: options.subject,
        html: options.html,
        replyTo: options.replyTo || 'support@urembohub.com',
      });

      if (error) {
        this.logger.error('Failed to send email:', error);
        return { success: false, error: error.message };
      }

      this.logger.log(`Email sent successfully to ${options.to}, message ID: ${data?.id}`);
      return { success: true, messageId: data?.id };
    } catch (error) {
      this.logger.error('Email service error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // Authentication Emails
  async sendWelcomeEmail(userEmail: string, userName: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getWelcomeTemplate(userName);
    return this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendVerificationEmail(userEmail: string, userName: string, verificationUrl: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getVerificationTemplate(userName, verificationUrl);
    return this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendPasswordResetEmail(userEmail: string, userName: string, resetUrl: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getPasswordResetTemplate(userName, resetUrl);
    return this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendPasswordChangedEmail(userEmail: string, userName: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getPasswordChangedTemplate(userName);
    return this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendSuspiciousLoginEmail(userEmail: string, userName: string, loginIp: string, location?: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getSuspiciousLoginTemplate(userName, loginIp, location);
    return this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  // Onboarding Emails
  async sendAccountCreatedEmail(userEmail: string, userName: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getAccountCreatedTemplate(userName);
    return this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendProfileApprovedEmail(userEmail: string, userName: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getProfileApprovedTemplate(userName);
    return this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendProfileRejectedEmail(userEmail: string, userName: string, reason: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getProfileRejectedTemplate(userName, reason);
    return this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendPaymentMissingEmail(userEmail: string, userName: string, setupUrl?: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getPaymentMissingTemplate(userName, setupUrl);
    return this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendKycUpdateEmail(userEmail: string, userName: string, status: string, reason?: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getKycUpdateTemplate(userName, status, reason);
    return this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  // Order Emails
  async sendNewOrderEmail(vendorEmail: string, vendorName: string, orderId: string, orderData: any): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getNewOrderTemplate(vendorName, orderId, orderData);
    return this.sendEmail({
      to: vendorEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendOrderAcceptedEmail(customerEmail: string, customerName: string, orderId: string, orderData: any): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getOrderAcceptedTemplate(customerName, orderId, orderData);
    return this.sendEmail({
      to: customerEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendOrderShippedEmail(customerEmail: string, customerName: string, orderId: string, trackingNumber?: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getOrderShippedTemplate(customerName, orderId, trackingNumber);
    return this.sendEmail({
      to: customerEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendOrderDeliveredEmail(customerEmail: string, customerName: string, orderId: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getOrderDeliveredTemplate(customerName, orderId);
    return this.sendEmail({
      to: customerEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  // Booking Emails
  async sendBookingConfirmedClientEmail(clientEmail: string, clientName: string, bookingData: any): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getBookingConfirmedClientTemplate(clientName, bookingData);
    return this.sendEmail({
      to: clientEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendBookingConfirmedVendorEmail(vendorEmail: string, vendorName: string, bookingData: any): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getBookingConfirmedVendorTemplate(vendorName, bookingData);
    return this.sendEmail({
      to: vendorEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendBookingReminderEmail(clientEmail: string, clientName: string, bookingData: any): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getBookingReminderTemplate(clientName, bookingData);
    return this.sendEmail({
      to: clientEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  // Payment Emails
  async sendPaymentSuccessfulEmail(userEmail: string, userName: string, paymentData: any): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getPaymentSuccessfulTemplate(userName, paymentData);
    return this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendPaymentFailedEmail(userEmail: string, userName: string, paymentData: any): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = getPaymentFailedTemplate(userName, paymentData);
    return this.sendEmail({
      to: userEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  // Admin Emails
  async sendDisputePendingEmail(adminEmail: string, disputeId: string, disputeData: any): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = this.getDisputePendingTemplate(disputeId, disputeData);
    return this.sendEmail({
      to: adminEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  async sendHighValueOrderEmail(adminEmail: string, orderId: string, orderData: any): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const template = this.getHighValueOrderTemplate(orderId, orderData);
    return this.sendEmail({
      to: adminEmail,
      subject: template.subject,
      html: template.html,
    });
  }

  // Email Templates
  private getWelcomeTemplate(userName: string): EmailTemplate {
    return {
      subject: 'Welcome to Urembo Hub!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Welcome to Urembo Hub!</h1>
          <p>Hi ${userName},</p>
          <p>Thank you for joining our beauty marketplace. We're excited to have you on board!</p>
          <p>Get started by exploring our services and products.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://urembohub.com" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Get Started</a>
          </div>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getVerificationTemplate(userName: string, verificationUrl: string): EmailTemplate {
    return {
      subject: 'Verify Your Email Address',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Verify Your Email</h1>
          <p>Hi ${userName},</p>
          <p>Please click the button below to verify your email address:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
          </div>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getPasswordResetTemplate(userName: string, resetUrl: string): EmailTemplate {
    return {
      subject: 'Reset Your Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Reset Your Password</h1>
          <p>Hi ${userName},</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
          </div>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getPasswordChangedTemplate(userName: string): EmailTemplate {
    return {
      subject: 'Password Changed Successfully',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #28a745; text-align: center;">Password Changed</h1>
          <p>Hi ${userName},</p>
          <p>Your password has been successfully changed.</p>
          <p>If you didn't make this change, please contact support immediately.</p>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getSuspiciousLoginTemplate(userName: string, loginIp: string, location?: string): EmailTemplate {
    return {
      subject: 'Security Alert: Unusual Login Activity',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #dc3545; text-align: center;">Security Alert</h1>
          <p>Hi ${userName},</p>
          <p>We detected unusual login activity on your account:</p>
          <ul>
            <li><strong>IP Address:</strong> ${loginIp}</li>
            <li><strong>Location:</strong> ${location || 'Unknown'}</li>
          </ul>
          <p>If this wasn't you, please secure your account immediately.</p>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getAccountCreatedTemplate(userName: string): EmailTemplate {
    return {
      subject: 'Account Created Successfully',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Account Created</h1>
          <p>Hi ${userName},</p>
          <p>Your business account has been created successfully!</p>
          <p>Complete your profile to start accepting bookings and orders.</p>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getProfileApprovedTemplate(userName: string): EmailTemplate {
    return {
      subject: 'Congratulations! Your Profile is Approved',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #28a745; text-align: center;">Profile Approved!</h1>
          <p>Hi ${userName},</p>
          <p>Great news! Your business profile has been approved.</p>
          <p>You can now start accepting bookings and orders from customers.</p>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getProfileRejectedTemplate(userName: string, reason: string): EmailTemplate {
    return {
      subject: 'Profile Review Update Required',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #dc3545; text-align: center;">Profile Update Required</h1>
          <p>Hi ${userName},</p>
          <p>Your profile needs some updates before approval:</p>
          <p><strong>Reason:</strong> ${reason}</p>
          <p>Please update your profile and resubmit for review.</p>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getPaymentMissingTemplate(userName: string, setupUrl?: string): EmailTemplate {
    return {
      subject: 'Payment Setup Required',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #ffc107; text-align: center;">Payment Setup Required</h1>
          <p>Hi ${userName},</p>
          <p>To start receiving payments, please set up your payment details.</p>
          ${setupUrl ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="${setupUrl}" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Setup Payment</a>
            </div>
          ` : ''}
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getKycUpdateTemplate(userName: string, status: string, reason?: string): EmailTemplate {
    return {
      subject: 'KYC Documents Status Update',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">KYC Status Update</h1>
          <p>Hi ${userName},</p>
          <p>Your KYC documents have been reviewed:</p>
          <p><strong>Status:</strong> ${status}</p>
          ${reason ? `<p><strong>Note:</strong> ${reason}</p>` : ''}
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getNewOrderTemplate(vendorName: string, orderId: string, orderData: any): EmailTemplate {
    return {
      subject: 'New Order Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">New Order Received</h1>
          <p>Hi ${vendorName},</p>
          <p>You have received a new order:</p>
          <ul>
            <li><strong>Order ID:</strong> ${orderId}</li>
            <li><strong>Order Number:</strong> ${orderData.order_number || 'N/A'}</li>
            <li><strong>Total:</strong> ${orderData.total_amount || 'N/A'}</li>
            <li><strong>Date:</strong> ${orderData.created_at || new Date().toLocaleDateString()}</li>
          </ul>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getOrderAcceptedTemplate(customerName: string, orderId: string, orderData: any): EmailTemplate {
    return {
      subject: 'Order Confirmed',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #28a745; text-align: center;">Order Confirmed</h1>
          <p>Hi ${customerName},</p>
          <p>Your order has been accepted and confirmed:</p>
          <ul>
            <li><strong>Order ID:</strong> ${orderId}</li>
            <li><strong>Order Number:</strong> ${orderData.order_number || 'N/A'}</li>
            <li><strong>Total:</strong> ${orderData.total_amount || 'N/A'}</li>
          </ul>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getOrderShippedTemplate(customerName: string, orderId: string, trackingNumber?: string): EmailTemplate {
    return {
      subject: 'Order Shipped',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #007bff; text-align: center;">Order Shipped</h1>
          <p>Hi ${customerName},</p>
          <p>Your order has been shipped:</p>
          <ul>
            <li><strong>Order ID:</strong> ${orderId}</li>
            <li><strong>Tracking Number:</strong> ${trackingNumber || 'N/A'}</li>
          </ul>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getOrderDeliveredTemplate(customerName: string, orderId: string): EmailTemplate {
    return {
      subject: 'Order Delivered',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #28a745; text-align: center;">Order Delivered</h1>
          <p>Hi ${customerName},</p>
          <p>Your order has been delivered:</p>
          <ul>
            <li><strong>Order ID:</strong> ${orderId}</li>
          </ul>
          <p>Thank you for your business!</p>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getBookingConfirmedClientTemplate(clientName: string, bookingData: any): EmailTemplate {
    return {
      subject: 'Booking Confirmed',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #28a745; text-align: center;">Booking Confirmed</h1>
          <p>Hi ${clientName},</p>
          <p>Your booking has been confirmed:</p>
          <ul>
            <li><strong>Service:</strong> ${bookingData.service_name || 'N/A'}</li>
            <li><strong>Vendor:</strong> ${bookingData.vendor_name || 'N/A'}</li>
            <li><strong>Date:</strong> ${bookingData.appointment_date || 'N/A'}</li>
            <li><strong>Time:</strong> ${bookingData.appointment_time || 'N/A'}</li>
            <li><strong>Amount:</strong> ${bookingData.booking_amount || 'N/A'}</li>
          </ul>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getBookingConfirmedVendorTemplate(vendorName: string, bookingData: any): EmailTemplate {
    return {
      subject: 'New Booking Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">New Booking Received</h1>
          <p>Hi ${vendorName},</p>
          <p>You have received a new booking:</p>
          <ul>
            <li><strong>Service:</strong> ${bookingData.service_name || 'N/A'}</li>
            <li><strong>Client:</strong> ${bookingData.client_name || 'N/A'}</li>
            <li><strong>Date:</strong> ${bookingData.appointment_date || 'N/A'}</li>
            <li><strong>Time:</strong> ${bookingData.appointment_time || 'N/A'}</li>
            <li><strong>Amount:</strong> ${bookingData.booking_amount || 'N/A'}</li>
          </ul>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getBookingReminderTemplate(clientName: string, bookingData: any): EmailTemplate {
    return {
      subject: 'Appointment Reminder',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #ffc107; text-align: center;">Appointment Reminder</h1>
          <p>Hi ${clientName},</p>
          <p>This is a reminder for your upcoming appointment:</p>
          <ul>
            <li><strong>Service:</strong> ${bookingData.service_name || 'N/A'}</li>
            <li><strong>Vendor:</strong> ${bookingData.vendor_name || 'N/A'}</li>
            <li><strong>Date:</strong> ${bookingData.appointment_date || 'N/A'}</li>
            <li><strong>Time:</strong> ${bookingData.appointment_time || 'N/A'}</li>
          </ul>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getPaymentSuccessfulTemplate(userName: string, paymentData: any): EmailTemplate {
    return {
      subject: 'Payment Successful',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #28a745; text-align: center;">Payment Successful</h1>
          <p>Hi ${userName},</p>
          <p>Your payment has been processed successfully:</p>
          <ul>
            <li><strong>Amount:</strong> ${paymentData.amount || 'N/A'}</li>
            <li><strong>Currency:</strong> ${paymentData.currency || 'N/A'}</li>
            <li><strong>Method:</strong> ${paymentData.payment_method || 'N/A'}</li>
            <li><strong>Transaction ID:</strong> ${paymentData.transaction_id || 'N/A'}</li>
          </ul>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getPaymentFailedTemplate(userName: string, paymentData: any): EmailTemplate {
    return {
      subject: 'Payment Failed',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #dc3545; text-align: center;">Payment Failed</h1>
          <p>Hi ${userName},</p>
          <p>Your payment could not be processed:</p>
          <ul>
            <li><strong>Amount:</strong> ${paymentData.amount || 'N/A'}</li>
            <li><strong>Currency:</strong> ${paymentData.currency || 'N/A'}</li>
            <li><strong>Method:</strong> ${paymentData.payment_method || 'N/A'}</li>
            <li><strong>Transaction ID:</strong> ${paymentData.transaction_id || 'N/A'}</li>
          </ul>
          <p>Please try again or use a different payment method.</p>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getDisputePendingTemplate(disputeId: string, disputeData: any): EmailTemplate {
    return {
      subject: 'New Dispute Requires Review',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #dc3545; text-align: center;">New Dispute Alert</h1>
          <p>A new dispute requires your attention:</p>
          <ul>
            <li><strong>Dispute ID:</strong> ${disputeId}</li>
            <li><strong>Type:</strong> ${disputeData.dispute_type || 'N/A'}</li>
            <li><strong>Description:</strong> ${disputeData.reason || 'N/A'}</li>
            <li><strong>Order ID:</strong> ${disputeData.order_id || 'N/A'}</li>
            <li><strong>Amount:</strong> ${disputeData.amount || 'N/A'}</li>
          </ul>
          <p>Please review and take appropriate action.</p>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }

  private getHighValueOrderTemplate(orderId: string, orderData: any): EmailTemplate {
    return {
      subject: 'High-Value Order Alert',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #ffc107; text-align: center;">High-Value Order Alert</h1>
          <p>A high-value order has been placed:</p>
          <ul>
            <li><strong>Order ID:</strong> ${orderId}</li>
            <li><strong>Order Number:</strong> ${orderData.order_number || 'N/A'}</li>
            <li><strong>Amount:</strong> ${orderData.payment_amount || 'N/A'}</li>
            <li><strong>Customer:</strong> ${orderData.user_name || 'N/A'}</li>
            <li><strong>Vendor:</strong> ${orderData.vendor_name || 'N/A'}</li>
            <li><strong>Date:</strong> ${orderData.order_date || 'N/A'}</li>
          </ul>
          <p>Best regards,<br>The Urembo Hub Team</p>
        </div>
      `
    };
  }
}
