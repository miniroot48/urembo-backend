import { ProductsService, CreateProductDto, UpdateProductDto } from './products.service';
import { UpdateStockDto } from './dto/update-stock.dto';
import { UpdateQcStatusDto } from './dto/update-qc-status.dto';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    getAllProducts(page?: string, limit?: string, category?: string, isActive?: string): Promise<{
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
    createProduct(req: any, createProductDto: CreateProductDto): Promise<{
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
    updateProduct(id: string, req: any, updateProductDto: UpdateProductDto): Promise<{
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
        category: string | null;
        subcategory: string | null;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        retailerId: string;
    }>;
    getUserProducts(req: any, page?: string, limit?: string): Promise<{
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
    getProductsByCategory(category: string, page?: string, limit?: string): Promise<{
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
    getProductsByManufacturer(manufacturerId: string, page?: string, limit?: string): Promise<{
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
    searchProducts(query: string, page?: string, limit?: string): Promise<{
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
        category: string | null;
        subcategory: string | null;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        retailerId: string;
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
        category: string | null;
        subcategory: string | null;
        manufacturerId: string | null;
        sku: string | null;
        tags: string[];
        qcStatus: string | null;
        createdByRole: import(".prisma/client").$Enums.user_role | null;
        retailerId: string;
    }>;
    getLowStockProducts(threshold?: string, page?: string, limit?: string): Promise<{
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
