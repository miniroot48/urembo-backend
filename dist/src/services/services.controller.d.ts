import { ServicesService, CreateServiceDto, UpdateServiceDto } from './services.service';
export declare class ServicesController {
    private servicesService;
    constructor(servicesService: ServicesService);
    getAllServices(category?: string, isActive?: string): Promise<({
        vendor: {
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
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getServiceById(id: string): Promise<{
        vendor: {
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
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteService(id: string, req: any): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUserServices(req: any): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getServicesByCategory(category: string): Promise<({
        vendor: {
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
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getServicesByCategoryId(categoryId: string): Promise<({
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    searchServices(query: string): Promise<({
        vendor: {
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
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getServicesByDeliveryMethod(deliveryMethod: string): Promise<({
        vendor: {
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
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getServicesByPriceRange(minPrice?: string, maxPrice?: string): Promise<({
        vendor: {
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
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getServicesByDuration(maxDuration: string): Promise<({
        vendor: {
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
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
