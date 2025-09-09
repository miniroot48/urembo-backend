import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { UpdateQcStatusDto } from './dto/update-qc-status.dto';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    getAllProducts(categoryId?: string, isActive?: string): Promise<({
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        retailerId: string;
    })[]>;
    getProductCategories(): Promise<{
        level: number;
        id: string;
        name: string;
        description: string;
        imageUrl: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        parentId: string;
        position: number;
        parent: {
            id: string;
            name: string;
            slug: string;
        };
        children: {
            level: number;
            id: string;
            name: string;
            slug: string;
            position: number;
        }[];
    }[]>;
    getProductCategoryById(id: string): Promise<{
        level: number;
        id: string;
        name: string;
        description: string;
        imageUrl: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        products: {
            id: string;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            imageUrl: string;
            isActive: boolean;
        }[];
        slug: string;
        parentId: string;
        position: number;
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
            imageUrl: string;
            slug: string;
            position: number;
        }[];
    }>;
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        retailerId: string;
    }>;
    createProduct(req: any, createProductDto: CreateProductDto): Promise<{
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        retailerId: string;
    }>;
    updateProduct(id: string, req: any, updateProductDto: UpdateProductDto): Promise<{
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        retailerId: string;
    }>;
    deleteProduct(id: string, req: any): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        retailerId: string;
    }>;
    getUserProducts(req: any): Promise<({
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        retailerId: string;
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        retailerId: string;
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        retailerId: string;
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        retailerId: string;
    })[]>;
    updateStockQuantity(id: string, req: any, body: UpdateStockDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        retailerId: string;
    }>;
    updateQcStatus(id: string, req: any, body: UpdateQcStatusDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        retailerId: string;
    }>;
    getLowStockProducts(threshold?: string): Promise<({
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        imageUrl: string | null;
        isActive: boolean;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        retailerId: string;
    })[]>;
    bulkUpdateIndividualPrices(req: any, body: {
        updates: {
            productId: string;
            newPrice: number;
        }[];
    }): Promise<{
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
    bulkUpdateIndividualStock(req: any, body: {
        updates: {
            productId: string;
            newStock: number;
        }[];
    }): Promise<{
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
