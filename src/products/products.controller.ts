import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Patch,
  Body, 
  Param, 
  Query, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { ProductsService, CreateProductDto, UpdateProductDto } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateStockDto } from './dto/update-stock.dto';
import { UpdateQcStatusDto } from './dto/update-qc-status.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAllProducts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('category') category?: string,
    @Query('isActive') isActive?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const isActiveBool = isActive !== 'false';
    
    return this.productsService.getAllProducts(pageNum, limitNum, category, isActiveBool);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(@Request() req, @Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(req.user.sub, req.user.role, createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Request() req,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, req.user.sub, req.user.role, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @Request() req) {
    return this.productsService.deleteProduct(id, req.user.sub, req.user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my/products')
  async getUserProducts(
    @Request() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    
    return this.productsService.getUserProducts(req.user.sub, pageNum, limitNum);
  }

  @Get('category/:category')
  async getProductsByCategory(
    @Param('category') category: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    
    return this.productsService.getProductsByCategory(category, pageNum, limitNum);
  }

  @Get('manufacturer/:manufacturerId')
  async getProductsByManufacturer(
    @Param('manufacturerId') manufacturerId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    
    return this.productsService.getProductsByManufacturer(manufacturerId, pageNum, limitNum);
  }

  @Get('search')
  async searchProducts(
    @Query('q') query: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    
    return this.productsService.searchProducts(query, pageNum, limitNum);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/stock')
  async updateStockQuantity(
    @Param('id') id: string,
    @Request() req,
    @Body() body: UpdateStockDto
  ) {
    return this.productsService.updateStockQuantity(id, req.user.sub, req.user.role, body.quantity);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/qc-status')
  async updateQcStatus(
    @Param('id') id: string,
    @Request() req,
    @Body() body: UpdateQcStatusDto
  ) {
    return this.productsService.updateQcStatus(id, req.user.sub, req.user.role, body.qcStatus);
  }

  @UseGuards(JwtAuthGuard)
  @Get('low-stock')
  async getLowStockProducts(
    @Query('threshold') threshold?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const thresholdNum = threshold ? parseInt(threshold, 10) : 10;
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    
    return this.productsService.getLowStockProducts(thresholdNum, pageNum, limitNum);
  }
}
