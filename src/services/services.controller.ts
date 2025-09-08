import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { ServicesService, CreateServiceDto, UpdateServiceDto } from './services.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  async getAllServices(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('category') category?: string,
    @Query('isActive') isActive?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const isActiveBool = isActive !== 'false';
    
    return this.servicesService.getAllServices(pageNum, limitNum, category, isActiveBool);
  }

  @Get(':id')
  async getServiceById(@Param('id') id: string) {
    return this.servicesService.getServiceById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createService(@Request() req, @Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.createService(req.user.sub, req.user.role, createServiceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateService(
    @Param('id') id: string,
    @Request() req,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.updateService(id, req.user.sub, req.user.role, updateServiceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteService(@Param('id') id: string, @Request() req) {
    return this.servicesService.deleteService(id, req.user.sub, req.user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my/services')
  async getUserServices(
    @Request() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    
    return this.servicesService.getUserServices(req.user.sub, pageNum, limitNum);
  }

  @Get('category/:category')
  async getServicesByCategory(
    @Param('category') category: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    
    return this.servicesService.getServicesByCategory(category, pageNum, limitNum);
  }

  @Get('category-id/:categoryId')
  async getServicesByCategoryId(
    @Param('categoryId') categoryId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    
    return this.servicesService.getServicesByCategoryId(categoryId, pageNum, limitNum);
  }

  @Get('search')
  async searchServices(
    @Query('q') query: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    
    return this.servicesService.searchServices(query, pageNum, limitNum);
  }

  @Get('delivery/:deliveryMethod')
  async getServicesByDeliveryMethod(
    @Param('deliveryMethod') deliveryMethod: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    
    return this.servicesService.getServicesByDeliveryMethod(deliveryMethod, pageNum, limitNum);
  }

  @Get('price-range')
  async getServicesByPriceRange(
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const minPriceNum = minPrice ? parseFloat(minPrice) : 0;
    const maxPriceNum = maxPrice ? parseFloat(maxPrice) : 999999;
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    
    return this.servicesService.getServicesByPriceRange(minPriceNum, maxPriceNum, pageNum, limitNum);
  }

  @Get('duration/:maxDuration')
  async getServicesByDuration(
    @Param('maxDuration') maxDuration: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const maxDurationNum = parseInt(maxDuration, 10);
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    
    return this.servicesService.getServicesByDuration(maxDurationNum, pageNum, limitNum);
  }
}
