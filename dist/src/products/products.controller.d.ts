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
    deleteProduct(id: string, req: any): Promise<{
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
    getUserProducts(req: any): Promise<{
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
    }[]>;
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
    updateStockQuantity(id: string, req: any, body: UpdateStockDto): Promise<{
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
    updateQcStatus(id: string, req: any, body: UpdateQcStatusDto): Promise<{
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
}
