import { ProductsService, CreateProductDto, UpdateProductDto } from './products.service';
import { UpdateStockDto } from './dto/update-stock.dto';
import { UpdateQcStatusDto } from './dto/update-qc-status.dto';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    getAllProducts(category?: string, isActive?: string): Promise<({
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
        retailerId: string;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
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
        retailerId: string;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createProduct(req: any, createProductDto: CreateProductDto): Promise<{
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
        retailerId: string;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProduct(id: string, req: any, updateProductDto: UpdateProductDto): Promise<{
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
        retailerId: string;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteProduct(id: string, req: any): Promise<{
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
        retailerId: string;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUserProducts(req: any): Promise<{
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
        retailerId: string;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
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
        retailerId: string;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
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
        retailerId: string;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
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
        retailerId: string;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    updateStockQuantity(id: string, req: any, body: UpdateStockDto): Promise<{
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
        retailerId: string;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateQcStatus(id: string, req: any, body: UpdateQcStatusDto): Promise<{
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
        retailerId: string;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getLowStockProducts(threshold?: string): Promise<({
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
        retailerId: string;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
