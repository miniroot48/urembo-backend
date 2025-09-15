import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Body, 
  Param, 
  Query, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistItemDto } from './dto/create-wishlist-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  async getUserWishlist(@Request() req) {
    const userId = req.user.sub;
    const wishlistItems = await this.wishlistService.getUserWishlist(userId);
    
    return {
      success: true,
      data: wishlistItems,
      message: 'Wishlist retrieved successfully'
    };
  }

  @Post()
  async addToWishlist(@Request() req, @Body() createWishlistItemDto: CreateWishlistItemDto) {
    const userId = req.user.sub;
    const wishlistItem = await this.wishlistService.addToWishlist(userId, createWishlistItemDto);
    
    return {
      success: true,
      data: wishlistItem,
      message: 'Item added to wishlist successfully'
    };
  }

  @Delete(':id')
  async removeFromWishlist(@Request() req, @Param('id') wishlistItemId: string) {
    const userId = req.user.sub;
    const result = await this.wishlistService.removeFromWishlist(userId, wishlistItemId);
    
    return {
      success: true,
      data: result,
      message: 'Item removed from wishlist successfully'
    };
  }

  @Get('check')
  async isInWishlist(
    @Request() req, 
    @Query('itemId') itemId: string, 
    @Query('itemType') itemType: 'product' | 'service'
  ) {
    const userId = req.user.sub;
    const isInWishlist = await this.wishlistService.isInWishlist(userId, itemId, itemType);
    
    return {
      success: true,
      data: isInWishlist,
      message: 'Wishlist check completed'
    };
  }

  @Delete('clear')
  async clearWishlist(@Request() req) {
    const userId = req.user.sub;
    const result = await this.wishlistService.clearWishlist(userId);
    
    return {
      success: true,
      data: result,
      message: 'Wishlist cleared successfully'
    };
  }

  @Get('count')
  async getWishlistCount(@Request() req) {
    const userId = req.user.sub;
    const count = await this.wishlistService.getWishlistCount(userId);
    
    return {
      success: true,
      data: count,
      message: 'Wishlist count retrieved successfully'
    };
  }

  @Get('type/:itemType')
  async getWishlistByType(
    @Request() req, 
    @Param('itemType') itemType: 'product' | 'service'
  ) {
    const userId = req.user.sub;
    const wishlistItems = await this.wishlistService.getWishlistByType(userId, itemType);
    
    return {
      success: true,
      data: wishlistItems,
      message: `${itemType} wishlist items retrieved successfully`
    };
  }

  @Get('stats')
  async getWishlistStats(@Request() req) {
    const userId = req.user.sub;
    const stats = await this.wishlistService.getWishlistStats(userId);
    
    return {
      success: true,
      data: stats,
      message: 'Wishlist statistics retrieved successfully'
    };
  }
}
