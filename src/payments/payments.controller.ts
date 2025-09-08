import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('process')
  async processPayment(@Body() paymentData: any) {
    return this.paymentsService.processPayment(paymentData.orderId, paymentData);
  }
}
