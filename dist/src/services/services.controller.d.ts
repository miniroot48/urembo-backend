import { ServicesService, CreateServiceDto, UpdateServiceDto } from './services.service';
export declare class ServicesController {
    private servicesService;
    constructor(servicesService: ServicesService);
    getAllServices(page?: string, limit?: string, category?: string, isActive?: string): Promise<{
        services: ({
            vendor: {
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
            imageUrl: string | null;
            category: string | null;
            durationMinutes: number;
            deliveryMethod: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            categoryId: string | null;
            subcategoryId: string | null;
            actualServiceId: string | null;
            vendorId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getServiceById(id: string): Promise<{
        vendor: {
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
        imageUrl: string | null;
        category: string | null;
        durationMinutes: number;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
        vendorId: string;
    }>;
    createService(req: any, createServiceDto: CreateServiceDto): Promise<{
        vendor: {
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
        imageUrl: string | null;
        category: string | null;
        durationMinutes: number;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
        vendorId: string;
    }>;
    updateService(id: string, req: any, updateServiceDto: UpdateServiceDto): Promise<{
        vendor: {
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
        imageUrl: string | null;
        category: string | null;
        durationMinutes: number;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
        vendorId: string;
    }>;
    deleteService(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        imageUrl: string | null;
        category: string | null;
        durationMinutes: number;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
        vendorId: string;
    }>;
    getUserServices(req: any, page?: string, limit?: string): Promise<{
        services: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            isActive: boolean;
            price: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            imageUrl: string | null;
            category: string | null;
            durationMinutes: number;
            deliveryMethod: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            categoryId: string | null;
            subcategoryId: string | null;
            actualServiceId: string | null;
            vendorId: string;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getServicesByCategory(category: string, page?: string, limit?: string): Promise<{
        services: ({
            vendor: {
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
            imageUrl: string | null;
            category: string | null;
            durationMinutes: number;
            deliveryMethod: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            categoryId: string | null;
            subcategoryId: string | null;
            actualServiceId: string | null;
            vendorId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getServicesByCategoryId(categoryId: string, page?: string, limit?: string): Promise<{
        services: ({
            vendor: {
                id: string;
                email: string;
                fullName: string;
                businessName: string;
            };
            serviceCategory: {
                id: string;
                name: string;
                description: string;
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
            imageUrl: string | null;
            category: string | null;
            durationMinutes: number;
            deliveryMethod: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            categoryId: string | null;
            subcategoryId: string | null;
            actualServiceId: string | null;
            vendorId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    searchServices(query: string, page?: string, limit?: string): Promise<{
        services: ({
            vendor: {
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
            imageUrl: string | null;
            category: string | null;
            durationMinutes: number;
            deliveryMethod: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            categoryId: string | null;
            subcategoryId: string | null;
            actualServiceId: string | null;
            vendorId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getServicesByDeliveryMethod(deliveryMethod: string, page?: string, limit?: string): Promise<{
        services: ({
            vendor: {
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
            imageUrl: string | null;
            category: string | null;
            durationMinutes: number;
            deliveryMethod: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            categoryId: string | null;
            subcategoryId: string | null;
            actualServiceId: string | null;
            vendorId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getServicesByPriceRange(minPrice?: string, maxPrice?: string, page?: string, limit?: string): Promise<{
        services: ({
            vendor: {
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
            imageUrl: string | null;
            category: string | null;
            durationMinutes: number;
            deliveryMethod: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            categoryId: string | null;
            subcategoryId: string | null;
            actualServiceId: string | null;
            vendorId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getServicesByDuration(maxDuration: string, page?: string, limit?: string): Promise<{
        services: ({
            vendor: {
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
            imageUrl: string | null;
            category: string | null;
            durationMinutes: number;
            deliveryMethod: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            categoryId: string | null;
            subcategoryId: string | null;
            actualServiceId: string | null;
            vendorId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
}
