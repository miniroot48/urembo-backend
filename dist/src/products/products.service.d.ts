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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        retailerId: string;
    }>;
    getAllProducts(page?: number, limit?: number, category?: string, isActive?: boolean): Promise<{
        products: ({
            retailer: {
                id: string;
                email: string;
                fullName: string;
                businessName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            isActive: boolean;
            price: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            stockQuantity: number;
            imageUrl: string | null;
            category: string | null;
            subcategory: string | null;
            manufacturerId: string | null;
            sku: string | null;
            tags: string[];
            qcStatus: string | null;
            createdByRole: import(".prisma/client").$Enums.user_role | null;
            retailerId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getProductById(id: string): Promise<{
        retailer: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        retailerId: string;
    }>;
    deleteProduct(id: string, userId: string, userRole: user_role): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        retailerId: string;
    }>;
    getUserProducts(userId: string, page?: number, limit?: number): Promise<{
        products: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            isActive: boolean;
            price: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            stockQuantity: number;
            imageUrl: string | null;
            category: string | null;
            subcategory: string | null;
            manufacturerId: string | null;
            sku: string | null;
            tags: string[];
            qcStatus: string | null;
            createdByRole: import(".prisma/client").$Enums.user_role | null;
            retailerId: string;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getProductsByCategory(category: string, page?: number, limit?: number): Promise<{
        products: ({
            retailer: {
                id: string;
                email: string;
                fullName: string;
                businessName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            isActive: boolean;
            price: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            stockQuantity: number;
            imageUrl: string | null;
            category: string | null;
            subcategory: string | null;
            manufacturerId: string | null;
            sku: string | null;
            tags: string[];
            qcStatus: string | null;
            createdByRole: import(".prisma/client").$Enums.user_role | null;
            retailerId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getProductsByManufacturer(manufacturerId: string, page?: number, limit?: number): Promise<{
        products: ({
            retailer: {
                id: string;
                email: string;
                fullName: string;
                businessName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            isActive: boolean;
            price: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            stockQuantity: number;
            imageUrl: string | null;
            category: string | null;
            subcategory: string | null;
            manufacturerId: string | null;
            sku: string | null;
            tags: string[];
            qcStatus: string | null;
            createdByRole: import(".prisma/client").$Enums.user_role | null;
            retailerId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    searchProducts(query: string, page?: number, limit?: number): Promise<{
        products: ({
            retailer: {
                id: string;
                email: string;
                fullName: string;
                businessName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            isActive: boolean;
            price: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            stockQuantity: number;
            imageUrl: string | null;
            category: string | null;
            subcategory: string | null;
            manufacturerId: string | null;
            sku: string | null;
            tags: string[];
            qcStatus: string | null;
            createdByRole: import(".prisma/client").$Enums.user_role | null;
            retailerId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    updateStockQuantity(id: string, userId: string, userRole: user_role, quantity: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        retailerId: string;
    }>;
    updateQcStatus(id: string, userId: string, userRole: user_role, qcStatus: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        category: string | null;
        subcategory: string | null;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        retailerId: string;
    }>;
    getLowStockProducts(threshold?: number, page?: number, limit?: number): Promise<{
        products: ({
            retailer: {
                id: string;
                email: string;
                fullName: string;
                businessName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            isActive: boolean;
            price: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            stockQuantity: number;
            imageUrl: string | null;
            category: string | null;
            subcategory: string | null;
            manufacturerId: string | null;
            sku: string | null;
            tags: string[];
            qcStatus: string | null;
            createdByRole: import(".prisma/client").$Enums.user_role | null;
            retailerId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
}
