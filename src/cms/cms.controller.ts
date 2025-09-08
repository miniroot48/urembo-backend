import { Controller, Get } from '@nestjs/common';
import { CmsService } from './cms.service';

@Controller('cms')
export class CmsController {
  constructor(private cmsService: CmsService) {}

  @Get('settings')
  async getSettings() {
    return this.cmsService.getSettings();
  }
}
