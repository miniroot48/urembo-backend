import { PrismaService } from '../prisma/prisma.service';
import { user_role } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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
        category: {
            id: string;
            name: string;
            description: string;
            slug: string;
        };
        subcategory: {
            id: string;
            name: string;
            description: string;
            slug: string;
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
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
    }>;
    getAllProducts(categoryId?: string, isActive?: boolean): Promise<({
        retailer: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
        category: {
            id: string;
            name: string;
            description: string;
            slug: string;
        };
        subcategory: {
            id: string;
            name: string;
            description: string;
            slug: string;
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
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
    })[]>;
    getProductById(id: string): Promise<{
        retailer: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
        category: {
            id: string;
            name: string;
            description: string;
            slug: string;
        };
        subcategory: {
            id: string;
            name: string;
            description: string;
            slug: string;
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
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
    }>;
    updateProduct(id: string, userId: string, userRole: user_role, updateProductDto: UpdateProductDto): Promise<{
        retailer: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
        category: {
            id: string;
            name: string;
            description: string;
            slug: string;
        };
        subcategory: {
            id: string;
            name: string;
            description: string;
            slug: string;
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
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
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
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
    }>;
    getUserProducts(userId: string): Promise<({
        retailer: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
        category: {
            id: string;
            name: string;
            description: string;
            slug: string;
        };
        subcategory: {
            id: string;
            name: string;
            description: string;
            slug: string;
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
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
    })[]>;
    getProductsByCategory(categoryId: string): Promise<({
        retailer: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
        category: {
            id: string;
            name: string;
            description: string;
            slug: string;
        };
        subcategory: {
            id: string;
            name: string;
            description: string;
            slug: string;
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
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
    })[]>;
    getProductsByManufacturer(manufacturerId: string): Promise<({
        retailer: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
        category: {
            id: string;
            name: string;
            description: string;
            slug: string;
        };
        subcategory: {
            id: string;
            name: string;
            description: string;
            slug: string;
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
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
    })[]>;
    searchProducts(query: string): Promise<({
        retailer: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
        category: {
            id: string;
            name: string;
            description: string;
            slug: string;
        };
        subcategory: {
            id: string;
            name: string;
            description: string;
            slug: string;
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
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
    })[]>;
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
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
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
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
    }>;
    getLowStockProducts(threshold?: number): Promise<({
        retailer: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
        category: {
            id: string;
            name: string;
            description: string;
            slug: string;
        };
        subcategory: {
            id: string;
            name: string;
            description: string;
            slug: string;
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
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
    })[]>;
    getProductCategories(): Promise<{
        level: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        position: number;
        isActive: boolean;
        imageUrl: string;
        slug: string;
        parentId: string;
        parent: {
            id: string;
            name: string;
            slug: string;
        };
        children: {
            level: number;
            id: string;
            name: string;
            position: number;
            slug: string;
        }[];
    }[]>;
    getProductCategoryById(id: string): Promise<{
        level: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        products: {
            id: string;
            name: string;
            isActive: boolean;
            price: import("@prisma/client/runtime/library").Decimal;
            imageUrl: string;
        }[];
        name: string;
        description: string;
        position: number;
        isActive: boolean;
        imageUrl: string;
        slug: string;
        parentId: string;
        parent: {
            id: string;
            name: string;
            description: string;
            slug: string;
        };
        children: {
            level: number;
            id: string;
            name: string;
            description: string;
            position: number;
            imageUrl: string;
            slug: string;
        }[];
    }>;
    bulkUpdateIndividualPrices(userId: string, userRole: user_role, updates: {
        productId: string;
        newPrice: number;
    }[]): Promise<{
        success: boolean;
        message: string;
        results: any[];
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        results: any[];
        message?: undefined;
    }>;
    bulkUpdateIndividualStock(userId: string, userRole: user_role, updates: {
        productId: string;
        newStock: number;
    }[]): Promise<{
        success: boolean;
        message: string;
        results: any[];
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        results: any[];
        message?: undefined;
    }>;
}
