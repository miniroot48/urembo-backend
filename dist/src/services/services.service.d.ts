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
        categoryId: string | null;
        subcategoryId: string | null;
        category: string | null;
        durationMinutes: number;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actualServiceId: string | null;
        vendorId: string;
    }>;
    getAllServices(category?: string, isActive?: boolean): Promise<({
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
        categoryId: string | null;
        subcategoryId: string | null;
        category: string | null;
        durationMinutes: number;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actualServiceId: string | null;
        vendorId: string;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        imageUrl: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        category: string | null;
        durationMinutes: number;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
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
        categoryId: string | null;
        subcategoryId: string | null;
        category: string | null;
        durationMinutes: number;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
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
        categoryId: string | null;
        subcategoryId: string | null;
        category: string | null;
        durationMinutes: number;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actualServiceId: string | null;
        vendorId: string;
    }>;
    getUserServices(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        imageUrl: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        category: string | null;
        durationMinutes: number;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actualServiceId: string | null;
        vendorId: string;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        imageUrl: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        category: string | null;
        durationMinutes: number;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actualServiceId: string | null;
        vendorId: string;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        imageUrl: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        category: string | null;
        durationMinutes: number;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actualServiceId: string | null;
        vendorId: string;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        imageUrl: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        category: string | null;
        durationMinutes: number;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actualServiceId: string | null;
        vendorId: string;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        imageUrl: string | null;
        categoryId: string | null;
        subcategoryId: string | null;
        category: string | null;
        durationMinutes: number;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actualServiceId: string | null;
        vendorId: string;
    })[]>;
    getServicesByPriceRange(minPrice: number, maxPrice: number): Promise<({
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
        categoryId: string | null;
        subcategoryId: string | null;
        category: string | null;
        durationMinutes: number;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actualServiceId: string | null;
        vendorId: string;
    })[]>;
    getServicesByDuration(maxDurationMinutes: number): Promise<({
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
        categoryId: string | null;
        subcategoryId: string | null;
        category: string | null;
        durationMinutes: number;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actualServiceId: string | null;
        vendorId: string;
    })[]>;
}
