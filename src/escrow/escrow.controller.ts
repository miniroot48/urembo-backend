import { Controller, Post, Get, Put, Body, Param, Query } from '@nestjs/common';
import { EscrowService } from './escrow.service';

@Controller('escrow')
export class EscrowController {
  constructor(private readonly escrowService: EscrowService) {}

  @Post('initialize/:orderId')
  async initializeEscrow(
    @Param('orderId') orderId: string,
    @Body() body: { paymentReference: string }
  ) {
    return this.escrowService.initializeEscrow(orderId, body.paymentReference);
  }

  @Put('release/:orderId')
  async releaseEscrow(
    @Param('orderId') orderId: string,
    @Body() body: { reason?: string }
  ) {
    return this.escrowService.releaseEscrow(orderId, body.reason);
  }

  @Put('refund/:orderId')
  async refundEscrow(
    @Param('orderId') orderId: string,
    @Body() body: { reason: string }
  ) {
    return this.escrowService.refundEscrow(orderId, body.reason);
  }

  @Post('auto-release')
  async processAutoRelease() {
    return this.escrowService.processAutoRelease();
  }

  @Get('stats')
  async getEscrowStats() {
    return this.escrowService.getEscrowStats();
  }

  @Post('vendor/subaccount')
  async createVendorSubaccount(@Body() vendorData: {
    businessName: string;
    email: string;
    contactName: string;
    phone: string;
    bankCode: string;
    accountNumber: string;
    percentageCharge?: number;
  }) {
    return this.escrowService.createVendorSubaccount(vendorData);
  }
}
