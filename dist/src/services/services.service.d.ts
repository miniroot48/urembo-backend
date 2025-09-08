import { PrismaService } from '../prisma/prisma.service';
import { user_role } from '@prisma/client';
export interface CreateServiceDto {
    name: string;
    description?: string;
    price: number;
    currency?: string;
    durationMinutes: number;
    imageUrl?: string;
    category?: string;
    categoryId?: string;
    subcategoryId?: string;
    actualServiceId?: string;
    deliveryMethod?: string;
    metadata?: any;
}
export interface UpdateServiceDto {
    name?: string;
    description?: string;
    price?: number;
    currency?: string;
    durationMinutes?: number;
    imageUrl?: string;
    category?: string;
    categoryId?: string;
    subcategoryId?: string;
    actualServiceId?: string;
    deliveryMethod?: string;
    metadata?: any;
    isActive?: boolean;
}
export declare class ServicesService {
    private prisma;
    constructor(prisma: PrismaService);
    createService(userId: string, userRole: user_role, createServiceDto: CreateServiceDto): Promise<{
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
    getAllServices(page?: number, limit?: number, category?: string, isActive?: boolean): Promise<{
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
    updateService(id: string, userId: string, userRole: user_role, updateServiceDto: UpdateServiceDto): Promise<{
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
    deleteService(id: string, userId: string, userRole: user_role): Promise<{
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
    getUserServices(userId: string, page?: number, limit?: number): Promise<{
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
    getServicesByCategory(category: string, page?: number, limit?: number): Promise<{
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
    getServicesByCategoryId(categoryId: string, page?: number, limit?: number): Promise<{
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
    searchServices(query: string, page?: number, limit?: number): Promise<{
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
    getServicesByDeliveryMethod(deliveryMethod: string, page?: number, limit?: number): Promise<{
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
    getServicesByPriceRange(minPrice: number, maxPrice: number, page?: number, limit?: number): Promise<{
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
    getServicesByDuration(maxDurationMinutes: number, page?: number, limit?: number): Promise<{
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
