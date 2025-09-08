import { Controller, Get } from '@nestjs/common';
import { CommissionService } from './commission.service';

@Controller('commission')
export class CommissionController {
  constructor(private commissionService: CommissionService) {}

  @Get('settings')
  async getCommissionSettings() {
    return this.commissionService.getCommissionSettings();
  }
}
