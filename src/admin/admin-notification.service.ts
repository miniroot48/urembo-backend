import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class AdminNotificationService {
  private readonly logger = new Logger(AdminNotificationService.name);

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async getAdminEmails(): Promise<string[]> {
    try {
      const admins = await this.prisma.profile.findMany({
        where: {
          role: 'admin',
          isVerified: true,
        },
        select: {
          email: true,
        },
      });

      return admins.map(admin => admin.email);
    } catch (error) {
      this.logger.error('Error fetching admin emails:', error);
      return [];
    }
  }

  async notifyAdminsOfSignup(userData: any): Promise<void> {
    try {
      const adminEmails = await this.getAdminEmails();
      
      if (adminEmails.length === 0) {
        this.logger.warn('No admin emails found for signup notification');
        return;
      }

      // Send notification to all admins
      const promises = adminEmails.map(adminEmail => 
        this.emailService.sendAdminSignupNotificationEmail(adminEmail, userData)
      );

      await Promise.all(promises);
      this.logger.log(`Signup notification sent to ${adminEmails.length} admins for user: ${userData.email}`);
    } catch (error) {
      this.logger.error('Error sending signup notification to admins:', error);
    }
  }

  async notifyAdminsOfTicket(ticketData: any): Promise<void> {
    try {
      const adminEmails = await this.getAdminEmails();
      
      if (adminEmails.length === 0) {
        this.logger.warn('No admin emails found for ticket notification');
        return;
      }

      // Send notification to all admins
      const promises = adminEmails.map(adminEmail => 
        this.emailService.sendAdminTicketNotificationEmail(adminEmail, ticketData)
      );

      await Promise.all(promises);
      this.logger.log(`Ticket notification sent to ${adminEmails.length} admins for ticket: ${ticketData.id}`);
    } catch (error) {
      this.logger.error('Error sending ticket notification to admins:', error);
    }
  }

  async notifyAdminsOfSale(saleData: any): Promise<void> {
    try {
      const adminEmails = await this.getAdminEmails();
      
      if (adminEmails.length === 0) {
        this.logger.warn('No admin emails found for sale notification');
        return;
      }

      // Send notification to all admins
      const promises = adminEmails.map(adminEmail => 
        this.emailService.sendAdminSaleNotificationEmail(adminEmail, saleData)
      );

      await Promise.all(promises);
      this.logger.log(`Sale notification sent to ${adminEmails.length} admins for sale: ${saleData.transactionId}`);
    } catch (error) {
      this.logger.error('Error sending sale notification to admins:', error);
    }
  }

  async notifyAdminsOfCartAddition(cartData: any): Promise<void> {
    try {
      const adminEmails = await this.getAdminEmails();
      
      if (adminEmails.length === 0) {
        this.logger.warn('No admin emails found for cart notification');
        return;
      }

      // Send notification to all admins
      const promises = adminEmails.map(adminEmail => 
        this.emailService.sendAdminCartNotificationEmail(adminEmail, cartData)
      );

      await Promise.all(promises);
      this.logger.log(`Cart notification sent to ${adminEmails.length} admins for cart addition`);
    } catch (error) {
      this.logger.error('Error sending cart notification to admins:', error);
    }
  }

  async notifyPartnerSignup(partnerData: any): Promise<void> {
    try {
      // Notify admins
      await this.notifyAdminsOfSignup(partnerData);

      // Notify partner
      await this.emailService.sendPartnerSignupNotificationEmail(
        partnerData.email,
        partnerData.fullName || 'Partner'
      );

      this.logger.log(`Partner signup notifications sent for: ${partnerData.email}`);
    } catch (error) {
      this.logger.error('Error sending partner signup notifications:', error);
    }
  }

  async notifyPartnerApproval(partnerData: any, approved: boolean, reason?: string): Promise<void> {
    try {
      await this.emailService.sendPartnerApprovalEmail(
        partnerData.email,
        partnerData.fullName || 'Partner',
        approved,
        reason
      );

      this.logger.log(`Partner approval notification sent to: ${partnerData.email}, approved: ${approved}`);
    } catch (error) {
      this.logger.error('Error sending partner approval notification:', error);
    }
  }
}
