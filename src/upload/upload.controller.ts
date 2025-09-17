import { Controller, Post, Get, UseInterceptors, UploadedFile, Body, UseGuards, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const imageUrl = await this.uploadService.uploadImage(file, folder || 'general');
    
    return {
      success: true,
      url: imageUrl,
      message: 'Image uploaded successfully',
    };
  }

  @Get('storage-stats')
  @UseGuards(AdminGuard)
  async getStorageStats() {
    const stats = await this.uploadService.getStorageStats();
    
    return {
      success: true,
      data: stats,
    };
  }

  @Post('cleanup-orphaned')
  @UseGuards(AdminGuard)
  async cleanupOrphanedImages(@Body('usedImagePaths') usedImagePaths: string[]) {
    const result = await this.uploadService.cleanupOrphanedImages(usedImagePaths);
    
    return {
      success: true,
      data: result,
      message: `Cleaned up ${result.deletedFiles} orphaned files, freed ${result.freedSpace} bytes`,
    };
  }
}
