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
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CreateTicketResponseDto } from './dto/create-ticket-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  // Get all tickets with filtering and pagination
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllTickets(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('categoryId') categoryId?: string,
    @Query('assignedTo') assignedTo?: string,
    @Query('createdBy') createdBy?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    
    return this.ticketsService.getAllTickets(
      pageNum,
      limitNum,
      status,
      priority,
      categoryId,
      assignedTo,
      createdBy
    );
  }

  // Get ticket by ID
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getTicketById(@Param('id') id: string) {
    return this.ticketsService.getTicketById(id);
  }

  // Create new ticket
  @Post()
  @UseGuards(JwtAuthGuard)
  async createTicket(
    @Body() createTicketDto: CreateTicketDto,
    @Request() req
  ) {
    return this.ticketsService.createTicket(createTicketDto, req.user.sub);
  }

  // Update ticket
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateTicket(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
    @Request() req
  ) {
    return this.ticketsService.updateTicket(id, updateTicketDto, req.user.sub, req.user.role);
  }

  // Delete ticket
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTicket(
    @Param('id') id: string,
    @Request() req
  ) {
    return this.ticketsService.deleteTicket(id, req.user.sub, req.user.role);
  }

  // Add response to ticket
  @Post(':id/responses')
  @UseGuards(JwtAuthGuard)
  async addResponse(
    @Param('id') id: string,
    @Body() createResponseDto: CreateTicketResponseDto,
    @Request() req
  ) {
    return this.ticketsService.addResponse(id, createResponseDto, req.user.sub);
  }

  // Get user's tickets
  @Get('my/tickets')
  @UseGuards(JwtAuthGuard)
  async getUserTickets(
    @Request() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    
    return this.ticketsService.getUserTickets(req.user.sub, req.user.role, pageNum, limitNum);
  }

  // Get ticket statistics
  @Get('stats/overview')
  @UseGuards(JwtAuthGuard)
  async getTicketStats(@Request() req) {
    return this.ticketsService.getTicketStats(req.user.sub, req.user.role);
  }

  // Get ticket categories
  @Get('categories/list')
  async getTicketCategories() {
    return this.ticketsService.getTicketCategories();
  }

  // Create ticket category (admin only)
  @Post('categories')
  @UseGuards(JwtAuthGuard)
  async createTicketCategory(
    @Body() data: {
      name: string;
      description?: string;
      color?: string;
      icon?: string;
    },
    @Request() req
  ) {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      throw new Error('Only admins can create ticket categories');
    }
    
    return this.ticketsService.createTicketCategory(data);
  }

  // Update ticket category (admin only)
  @Put('categories/:id')
  @UseGuards(JwtAuthGuard)
  async updateTicketCategory(
    @Param('id') id: string,
    @Body() data: {
      name?: string;
      description?: string;
      color?: string;
      icon?: string;
      isActive?: boolean;
    },
    @Request() req
  ) {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      throw new Error('Only admins can update ticket categories');
    }
    
    return this.ticketsService.updateTicketCategory(id, data);
  }

  // Delete ticket category (admin only)
  @Delete('categories/:id')
  @UseGuards(JwtAuthGuard)
  async deleteTicketCategory(
    @Param('id') id: string,
    @Request() req
  ) {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      throw new Error('Only admins can delete ticket categories');
    }
    
    return this.ticketsService.deleteTicketCategory(id);
  }

  // Search tickets
  @Get('search/query')
  @UseGuards(JwtAuthGuard)
  async searchTickets(
    @Request() req,
    @Query('q') query: string
  ) {
    return this.ticketsService.searchTickets(query, req.user.sub, req.user.role);
  }
}