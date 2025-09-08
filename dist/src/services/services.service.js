"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ServicesService = class ServicesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createService(userId, userRole, createServiceDto) {
        if (userRole !== client_1.user_role.vendor) {
            throw new common_1.ForbiddenException('Only vendors can create services');
        }
        const serviceData = {
            name: createServiceDto.name,
            description: createServiceDto.description,
            price: createServiceDto.price,
            currency: createServiceDto.currency || 'USD',
            durationMinutes: createServiceDto.durationMinutes,
            imageUrl: createServiceDto.imageUrl,
            category: createServiceDto.category,
            categoryId: createServiceDto.categoryId,
            subcategoryId: createServiceDto.subcategoryId,
            actualServiceId: createServiceDto.actualServiceId,
            deliveryMethod: createServiceDto.deliveryMethod,
            metadata: createServiceDto.metadata,
            vendorId: userId,
        };
        return this.prisma.service.create({
            data: serviceData,
            include: {
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                    },
                },
            },
        });
    }
    async getAllServices(category, isActive = true) {
        const where = { isActive };
        if (category) {
            where.category = category;
        }
        const services = await this.prisma.service.findMany({
            where,
            include: {
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return services;
    }
    async getServiceById(id) {
        const service = await this.prisma.service.findUnique({
            where: { id },
            include: {
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                    },
                },
            },
        });
        if (!service) {
            throw new common_1.NotFoundException('Service not found');
        }
        return service;
    }
    async updateService(id, userId, userRole, updateServiceDto) {
        const service = await this.getServiceById(id);
        if (service.vendorId !== userId && userRole !== client_1.user_role.admin) {
            throw new common_1.ForbiddenException('You can only update your own services');
        }
        const updateData = {};
        if (updateServiceDto.name !== undefined)
            updateData.name = updateServiceDto.name;
        if (updateServiceDto.description !== undefined)
            updateData.description = updateServiceDto.description;
        if (updateServiceDto.price !== undefined)
            updateData.price = updateServiceDto.price;
        if (updateServiceDto.currency !== undefined)
            updateData.currency = updateServiceDto.currency;
        if (updateServiceDto.durationMinutes !== undefined)
            updateData.durationMinutes = updateServiceDto.durationMinutes;
        if (updateServiceDto.imageUrl !== undefined)
            updateData.imageUrl = updateServiceDto.imageUrl;
        if (updateServiceDto.category !== undefined)
            updateData.category = updateServiceDto.category;
        if (updateServiceDto.categoryId !== undefined)
            updateData.categoryId = updateServiceDto.categoryId;
        if (updateServiceDto.subcategoryId !== undefined)
            updateData.subcategoryId = updateServiceDto.subcategoryId;
        if (updateServiceDto.actualServiceId !== undefined)
            updateData.actualServiceId = updateServiceDto.actualServiceId;
        if (updateServiceDto.deliveryMethod !== undefined)
            updateData.deliveryMethod = updateServiceDto.deliveryMethod;
        if (updateServiceDto.metadata !== undefined)
            updateData.metadata = updateServiceDto.metadata;
        if (updateServiceDto.isActive !== undefined)
            updateData.isActive = updateServiceDto.isActive;
        return this.prisma.service.update({
            where: { id },
            data: updateData,
            include: {
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                    },
                },
            },
        });
    }
    async deleteService(id, userId, userRole) {
        const service = await this.getServiceById(id);
        if (service.vendorId !== userId && userRole !== client_1.user_role.admin) {
            throw new common_1.ForbiddenException('You can only delete your own services');
        }
        return this.prisma.service.delete({
            where: { id },
        });
    }
    async getUserServices(userId) {
        const services = await this.prisma.service.findMany({
            where: { vendorId: userId },
            orderBy: { createdAt: 'desc' },
        });
        return services;
    }
    async getServicesByCategory(category) {
        const services = await this.prisma.service.findMany({
            where: {
                category,
                isActive: true,
            },
            include: {
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return services;
    }
    async getServicesByCategoryId(categoryId) {
        const services = await this.prisma.service.findMany({
            where: {
                categoryId,
                isActive: true,
            },
            include: {
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                    },
                },
                serviceCategory: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return services;
    }
    async searchServices(query) {
        const services = await this.prisma.service.findMany({
            where: {
                AND: [
                    { isActive: true },
                    {
                        OR: [
                            { name: { contains: query, mode: 'insensitive' } },
                            { description: { contains: query, mode: 'insensitive' } },
                            { category: { contains: query, mode: 'insensitive' } },
                            { deliveryMethod: { contains: query, mode: 'insensitive' } },
                        ],
                    },
                ],
            },
            include: {
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return services;
    }
    async getServicesByDeliveryMethod(deliveryMethod) {
        const services = await this.prisma.service.findMany({
            where: {
                deliveryMethod,
                isActive: true,
            },
            include: {
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return services;
    }
    async getServicesByPriceRange(minPrice, maxPrice) {
        const services = await this.prisma.service.findMany({
            where: {
                price: {
                    gte: minPrice,
                    lte: maxPrice,
                },
                isActive: true,
            },
            include: {
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                    },
                },
            },
            orderBy: { price: 'asc' },
        });
        return services;
    }
    async getServicesByDuration(maxDurationMinutes) {
        const services = await this.prisma.service.findMany({
            where: {
                durationMinutes: {
                    lte: maxDurationMinutes,
                },
                isActive: true,
            },
            include: {
                vendor: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                    },
                },
            },
            orderBy: { durationMinutes: 'asc' },
        });
        return services;
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServicesService);
//# sourceMappingURL=services.service.js.map