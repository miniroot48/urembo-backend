import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLiveSessionDto } from './dto/create-live-session.dto';
import { UpdateLiveSessionDto } from './dto/update-live-session.dto';
import { CreateLiveMessageDto } from './dto/create-live-message.dto';

@Injectable()
export class LiveShoppingService {
  constructor(private prisma: PrismaService) {}

  // Get all live shopping sessions with filtering and pagination
  async getAllSessions(
    page: number = 1,
    limit: number = 10,
    status?: string,
    retailerId?: string,
    category?: string
  ) {
    const skip = (page - 1) * limit;
    
    const where: any = {};
    if (status) where.status = status;
    if (retailerId) where.retailerId = retailerId;
    if (category) where.category = category;

    const [sessions, total] = await Promise.all([
      this.prisma.liveShoppingSession.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          retailer: {
            select: {
              id: true,
              fullName: true,
              businessName: true,
              email: true,
            },
          },
          products: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  currency: true,
                  imageUrl: true,
                  stockQuantity: true,
                },
              },
            },
          },
          _count: {
            select: {
              messages: true,
              participants: true,
            },
          },
        },
      }),
      this.prisma.liveShoppingSession.count({ where }),
    ]);

    return {
      sessions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get session by ID
  async getSessionById(id: string) {
    const session = await this.prisma.liveShoppingSession.findUnique({
      where: { id },
      include: {
        retailer: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
          },
        },
        products: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                currency: true,
                imageUrl: true,
                stockQuantity: true,
              },
            },
          },
        },
        messages: {
          orderBy: { createdAt: 'asc' },
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
              },
            },
          },
        },
        participants: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
              },
            },
          },
        },
      },
    });

    if (!session) {
      throw new NotFoundException('Live shopping session not found');
    }

    return session;
  }

  // Create new live shopping session
  async createSession(createSessionDto: CreateLiveSessionDto, userId: string) {
    const {
      title,
      description,
      retailerId,
      scheduledStart,
      scheduledEnd,
      status = 'scheduled',
      streamUrl,
      thumbnailUrl,
      tags = [],
      metadata,
      category,
      language = 'en',
      timezone = 'UTC',
    } = createSessionDto;

    // Validate retailer exists
    const retailer = await this.prisma.profile.findUnique({
      where: { id: retailerId },
    });
    if (!retailer) {
      throw new BadRequestException('Invalid retailer ID');
    }

    // Check if user is the retailer or admin
    if (retailerId !== userId && retailer.role !== 'admin') {
      throw new ForbiddenException('You can only create sessions for yourself');
    }

    const session = await this.prisma.liveShoppingSession.create({
      data: {
        title,
        description,
        vendorId: retailerId,
        retailerId,
        scheduledAt: scheduledStart ? new Date(scheduledStart) : new Date(),
        // scheduledEnd: scheduledEnd ? new Date(scheduledEnd) : null, // This field doesn't exist in schema
        status,
        streamUrl,
        thumbnailUrl,
        // tags, // This field doesn't exist in the schema
        // metadata, // This field doesn't exist in the schema
        // category, // This field doesn't exist in the schema
        // language, // This field doesn't exist in the schema
        // timezone, // This field doesn't exist in the schema
      },
      include: {
        retailer: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
          },
        },
      },
    });

    return session;
  }

  // Update live shopping session
  async updateSession(id: string, updateSessionDto: UpdateLiveSessionDto, userId: string, userRole: string) {
    const session = await this.getSessionById(id);

    // Check permissions
    if (userRole !== 'admin' && session.retailerId !== userId) {
      throw new ForbiddenException('You can only update your own sessions');
    }

    const updatedSession = await this.prisma.liveShoppingSession.update({
      where: { id },
      data: {
        ...updateSessionDto,
        actualStart: updateSessionDto.status === 'live' && !session.actualStart ? new Date() : session.actualStart,
        actualEnd: updateSessionDto.status === 'ended' ? new Date() : session.actualEnd,
      },
      include: {
        retailer: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
          },
        },
        products: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                currency: true,
                imageUrl: true,
                stockQuantity: true,
              },
            },
          },
        },
      },
    });

    return updatedSession;
  }

  // Delete live shopping session
  async deleteSession(id: string, userId: string, userRole: string) {
    const session = await this.getSessionById(id);

    // Check permissions
    if (userRole !== 'admin' && session.retailerId !== userId) {
      throw new ForbiddenException('You can only delete your own sessions');
    }

    await this.prisma.liveShoppingSession.delete({
      where: { id },
    });

    return { message: 'Live shopping session deleted successfully' };
  }

  // Add product to session
  async addProductToSession(sessionId: string, productId: string, userId: string, userRole: string) {
    const session = await this.getSessionById(sessionId);

    // Check permissions
    if (userRole !== 'admin' && session.retailerId !== userId) {
      throw new ForbiddenException('You can only add products to your own sessions');
    }

    // Validate product exists
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new BadRequestException('Invalid product ID');
    }

    // Check if product is already in session
    const existingProduct = await this.prisma.liveSessionProduct.findFirst({
      where: {
        sessionId,
        productId,
      },
    });

    if (existingProduct) {
      throw new BadRequestException('Product is already in this session');
    }

    const sessionProduct = await this.prisma.liveSessionProduct.create({
      data: {
        sessionId,
        productId,
        isCurrentlyFeatured: false,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            currency: true,
            imageUrl: true,
            stockQuantity: true,
          },
        },
      },
    });

    return sessionProduct;
  }

  // Remove product from session
  async removeProductFromSession(sessionId: string, productId: string, userId: string, userRole: string) {
    const session = await this.getSessionById(sessionId);

    // Check permissions
    if (userRole !== 'admin' && session.retailerId !== userId) {
      throw new ForbiddenException('You can only remove products from your own sessions');
    }

    await this.prisma.liveSessionProduct.deleteMany({
      where: {
        sessionId,
        productId,
      },
    });

    return { message: 'Product removed from session successfully' };
  }

  // Feature a product in session
  async featureProduct(sessionId: string, productId: string, userId: string, userRole: string) {
    const session = await this.getSessionById(sessionId);

    // Check permissions
    if (userRole !== 'admin' && session.retailerId !== userId) {
      throw new ForbiddenException('You can only feature products in your own sessions');
    }

    // First, unfeature all products in the session
    await this.prisma.liveSessionProduct.updateMany({
      where: { sessionId },
      data: { isCurrentlyFeatured: false },
    });

    // Then feature the selected product
    const featuredProduct = await this.prisma.liveSessionProduct.updateMany({
      where: {
        sessionId,
        productId,
      },
      data: { isCurrentlyFeatured: true },
    });

    if (featuredProduct.count === 0) {
      throw new BadRequestException('Product not found in session');
    }

    return { message: 'Product featured successfully' };
  }

  // Add message to session
  async addMessage(createMessageDto: CreateLiveMessageDto, userId: string) {
    const { sessionId, message, messageType = 'text', isModerator = false, metadata, productId, replyToMessageId } = createMessageDto;

    // Validate session exists
    const session = await this.prisma.liveShoppingSession.findUnique({
      where: { id: sessionId },
    });
    if (!session) {
      throw new BadRequestException('Invalid session ID');
    }

    // Check if session is live
    if (session.status !== 'live') {
      throw new BadRequestException('Can only send messages to live sessions');
    }

    const liveMessage = await this.prisma.liveSessionMessage.create({
      data: {
        sessionId,
        userId,
        message,
        messageType,
        isModerator,
        // metadata, // This field doesn't exist in the schema
        // productId, // This field doesn't exist in the schema
        // replyToMessageId, // This field doesn't exist in the schema
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return liveMessage;
  }

  // Get session messages
  async getSessionMessages(sessionId: string, page: number = 1, limit: number = 50) {
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      this.prisma.liveSessionMessage.findMany({
        where: { sessionId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      this.prisma.liveSessionMessage.count({ where: { sessionId } }),
    ]);

    return {
      messages: messages.reverse(), // Show oldest first
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Join session as participant
  async joinSession(sessionId: string, userId: string) {
    // Validate session exists
    const session = await this.prisma.liveShoppingSession.findUnique({
      where: { id: sessionId },
    });
    if (!session) {
      throw new BadRequestException('Invalid session ID');
    }

    // Check if user is already a participant
    const existingParticipant = await this.prisma.liveSessionParticipant.findFirst({
      where: {
        sessionId,
        userId,
      },
    });

    if (existingParticipant) {
      // Update last seen
      await this.prisma.liveSessionParticipant.update({
        where: { id: existingParticipant.id },
        data: { lastSeenAt: new Date() },
      });
      return { message: 'Already joined session' };
    }

    const participant = await this.prisma.liveSessionParticipant.create({
      data: {
        sessionId,
        userId,
        joinedAt: new Date(),
        lastSeenAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return participant;
  }

  // Leave session
  async leaveSession(sessionId: string, userId: string) {
    await this.prisma.liveSessionParticipant.deleteMany({
      where: {
        sessionId,
        userId,
      },
    });

    return { message: 'Left session successfully' };
  }

  // Get session participants
  async getSessionParticipants(sessionId: string) {
    return this.prisma.liveSessionParticipant.findMany({
      where: { sessionId },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
    });
  }

  // Get user's sessions
  async getUserSessions(userId: string, userRole: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    let where: any = {};
    
    if (userRole === 'admin') {
      // Admin can see all sessions
      where = {};
    } else {
      // Users can see their own sessions
      where = { retailerId: userId };
    }

    const [sessions, total] = await Promise.all([
      this.prisma.liveShoppingSession.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          retailer: {
            select: {
              id: true,
              fullName: true,
              businessName: true,
              email: true,
            },
          },
          _count: {
            select: {
              messages: true,
              participants: true,
            },
          },
        },
      }),
      this.prisma.liveShoppingSession.count({ where }),
    ]);

    return {
      sessions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get live shopping statistics
  async getLiveShoppingStats(userId?: string, userRole?: string) {
    let where: any = {};
    
    if (userRole === 'admin') {
      where = {};
    } else if (userId) {
      where = { retailerId: userId };
    }

    const [
      totalSessions,
      liveSessions,
      scheduledSessions,
      endedSessions,
      totalMessages,
      totalParticipants,
    ] = await Promise.all([
      this.prisma.liveShoppingSession.count({ where }),
      this.prisma.liveShoppingSession.count({ where: { ...where, status: 'live' } }),
      this.prisma.liveShoppingSession.count({ where: { ...where, status: 'scheduled' } }),
      this.prisma.liveShoppingSession.count({ where: { ...where, status: 'ended' } }),
      this.prisma.liveSessionMessage.count(),
      this.prisma.liveSessionParticipant.count(),
    ]);

    return {
      totalSessions,
      liveSessions,
      scheduledSessions,
      endedSessions,
      totalMessages,
      totalParticipants,
    };
  }

  // Search sessions
  async searchSessions(query: string, userId?: string, userRole?: string) {
    let where: any = {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { category: { contains: query, mode: 'insensitive' } },
        { tags: { has: query } },
      ],
    };

    if (userRole === 'admin') {
      // Admin can search all sessions
    } else if (userId) {
      where = { ...where, retailerId: userId };
    }

    return this.prisma.liveShoppingSession.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        retailer: {
          select: {
            id: true,
            fullName: true,
            businessName: true,
            email: true,
          },
        },
        _count: {
          select: {
            messages: true,
            participants: true,
          },
        },
      },
    });
  }
}
