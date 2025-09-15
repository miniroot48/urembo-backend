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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
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
        slug: string;
        imageUrl: string;
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
        parentId: string;
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
            imageUrl: string;
            price: import("@prisma/client/runtime/library").Decimal;
        }[];
        name: string;
        description: string;
        position: number;
        isActive: boolean;
        slug: string;
        imageUrl: string;
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
            slug: string;
            imageUrl: string;
        }[];
        parentId: string;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
    }>;
    deleteProduct(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
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
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
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
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
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
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
    })[]>;
    updateStockQuantity(id: string, req: any, body: UpdateStockDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
    }>;
    updateQcStatus(id: string, req: any, body: UpdateQcStatusDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        stockQuantity: number;
        categoryId: string | null;
        subcategoryId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        manufacturerId: string | null;
        retailerId: string;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
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
