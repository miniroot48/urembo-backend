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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProduct(userId, userRole, createProductDto) {
        if (userRole !== client_1.user_role.retailer && userRole !== client_1.user_role.manufacturer) {
            throw new common_1.ForbiddenException('Only retailers and manufacturers can create products');
        }
        const productData = {
            name: createProductDto.name,
            description: createProductDto.description,
            price: createProductDto.price,
            currency: createProductDto.currency || 'USD',
            stockQuantity: createProductDto.stockQuantity || 0,
            imageUrl: createProductDto.imageUrl,
            category: createProductDto.category,
            subcategory: createProductDto.subcategory,
            sku: createProductDto.sku,
            tags: createProductDto.tags || [],
            qcStatus: createProductDto.qcStatus,
            retailerId: userId,
            createdByRole: userRole,
        };
        if (createProductDto.manufacturerId && userRole === client_1.user_role.manufacturer) {
            productData.manufacturerId = createProductDto.manufacturerId;
        }
        else if (userRole === client_1.user_role.manufacturer) {
            productData.manufacturerId = userId;
        }
        return this.prisma.product.create({
            data: productData,
            include: {
                retailer: {
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
    async getAllProducts(category, isActive = true) {
        const where = { isActive };
        if (category) {
            where.category = category;
        }
        const products = await this.prisma.product.findMany({
            where,
            include: {
                retailer: {
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
        return products;
    }
    async getProductById(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                retailer: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                    },
                },
            },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async updateProduct(id, userId, userRole, updateProductDto) {
        const product = await this.getProductById(id);
        if (product.retailerId !== userId && userRole !== client_1.user_role.admin) {
            throw new common_1.ForbiddenException('You can only update your own products');
        }
        const updateData = {};
        if (updateProductDto.name !== undefined)
            updateData.name = updateProductDto.name;
        if (updateProductDto.description !== undefined)
            updateData.description = updateProductDto.description;
        if (updateProductDto.price !== undefined)
            updateData.price = updateProductDto.price;
        if (updateProductDto.currency !== undefined)
            updateData.currency = updateProductDto.currency;
        if (updateProductDto.stockQuantity !== undefined)
            updateData.stockQuantity = updateProductDto.stockQuantity;
        if (updateProductDto.imageUrl !== undefined)
            updateData.imageUrl = updateProductDto.imageUrl;
        if (updateProductDto.category !== undefined)
            updateData.category = updateProductDto.category;
        if (updateProductDto.subcategory !== undefined)
            updateData.subcategory = updateProductDto.subcategory;
        if (updateProductDto.sku !== undefined)
            updateData.sku = updateProductDto.sku;
        if (updateProductDto.tags !== undefined)
            updateData.tags = updateProductDto.tags;
        if (updateProductDto.qcStatus !== undefined)
            updateData.qcStatus = updateProductDto.qcStatus;
        if (updateProductDto.manufacturerId !== undefined)
            updateData.manufacturerId = updateProductDto.manufacturerId;
        if (updateProductDto.isActive !== undefined)
            updateData.isActive = updateProductDto.isActive;
        return this.prisma.product.update({
            where: { id },
            data: updateData,
            include: {
                retailer: {
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
    async deleteProduct(id, userId, userRole) {
        const product = await this.getProductById(id);
        if (product.retailerId !== userId && userRole !== client_1.user_role.admin) {
            throw new common_1.ForbiddenException('You can only delete your own products');
        }
        return this.prisma.product.delete({
            where: { id },
        });
    }
    async getUserProducts(userId) {
        const products = await this.prisma.product.findMany({
            where: { retailerId: userId },
            orderBy: { createdAt: 'desc' },
        });
        return products;
    }
    async getProductsByCategory(category) {
        const products = await this.prisma.product.findMany({
            where: {
                category,
                isActive: true,
            },
            include: {
                retailer: {
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
        return products;
    }
    async getProductsByManufacturer(manufacturerId) {
        const products = await this.prisma.product.findMany({
            where: {
                manufacturerId,
                isActive: true,
            },
            include: {
                retailer: {
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
        return products;
    }
    async searchProducts(query) {
        const products = await this.prisma.product.findMany({
            where: {
                AND: [
                    { isActive: true },
                    {
                        OR: [
                            { name: { contains: query, mode: 'insensitive' } },
                            { description: { contains: query, mode: 'insensitive' } },
                            { category: { contains: query, mode: 'insensitive' } },
                            { subcategory: { contains: query, mode: 'insensitive' } },
                            { sku: { contains: query, mode: 'insensitive' } },
                            { tags: { has: query } },
                        ],
                    },
                ],
            },
            include: {
                retailer: {
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
        return products;
    }
    async updateStockQuantity(id, userId, userRole, quantity) {
        const product = await this.getProductById(id);
        if (product.retailerId !== userId && userRole !== client_1.user_role.admin) {
            throw new common_1.ForbiddenException('You can only update stock for your own products');
        }
        return this.prisma.product.update({
            where: { id },
            data: { stockQuantity: quantity },
        });
    }
    async updateQcStatus(id, userId, userRole, qcStatus) {
        const product = await this.getProductById(id);
        if (product.retailerId !== userId && userRole !== client_1.user_role.admin) {
            throw new common_1.ForbiddenException('You can only update QC status for your own products');
        }
        return this.prisma.product.update({
            where: { id },
            data: { qcStatus },
        });
    }
    async getLowStockProducts(threshold = 10) {
        const products = await this.prisma.product.findMany({
            where: {
                stockQuantity: { lte: threshold },
                isActive: true,
            },
            include: {
                retailer: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        businessName: true,
                    },
                },
            },
            orderBy: { stockQuantity: 'asc' },
        });
        return products;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map