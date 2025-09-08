import { PrismaService } from '../prisma/prisma.service';
import { user_role } from '@prisma/client';
export interface CreateProductDto {
    name: string;
    description?: string;
    price: number;
    currency?: string;
    stockQuantity?: number;
    imageUrl?: string;
    category?: string;
    subcategory?: string;
    sku?: string;
    tags?: string[];
    qcStatus?: string;
    manufacturerId?: string;
}
export interface UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    currency?: string;
    stockQuantity?: number;
    imageUrl?: string;
    category?: string;
    subcategory?: string;
    sku?: string;
    tags?: string[];
    qcStatus?: string;
    manufacturerId?: string;
    isActive?: boolean;
}
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    createProduct(userId: string, userRole: user_role, createProductDto: CreateProductDto): Promise<{
        retailer: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        retailerId: string;
    }>;
    getAllProducts(category?: string, isActive?: boolean): Promise<({
        retailer: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        retailerId: string;
    })[]>;
    getProductById(id: string): Promise<{
        retailer: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        retailerId: string;
    }>;
    updateProduct(id: string, userId: string, userRole: user_role, updateProductDto: UpdateProductDto): Promise<{
        retailer: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        retailerId: string;
    }>;
    deleteProduct(id: string, userId: string, userRole: user_role): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        retailerId: string;
    }>;
    getUserProducts(userId: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        retailerId: string;
    }[]>;
    getProductsByCategory(category: string): Promise<({
        retailer: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        retailerId: string;
    })[]>;
    getProductsByManufacturer(manufacturerId: string): Promise<({
        retailer: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        retailerId: string;
    })[]>;
    searchProducts(query: string): Promise<({
        retailer: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        retailerId: string;
    })[]>;
    updateStockQuantity(id: string, userId: string, userRole: user_role, quantity: number): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        retailerId: string;
    }>;
    updateQcStatus(id: string, userId: string, userRole: user_role, qcStatus: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        retailerId: string;
    }>;
    getLowStockProducts(threshold?: number): Promise<({
        retailer: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        retailerId: string;
    })[]>;
}
