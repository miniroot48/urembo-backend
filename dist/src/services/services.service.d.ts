import { PrismaService } from '../prisma/prisma.service';
import { user_role } from '@prisma/client';
import { CreateServiceDto, UpdateServiceDto, CreateStaffDto, UpdateStaffDto } from './dto';
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
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
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
        tags: string[];
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
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
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
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteService(id: string, userId: string, userRole: user_role): Promise<{
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
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUserServices(userId: string): Promise<{
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
        tags: string[];
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
        tags: string[];
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
        tags: string[];
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
        tags: string[];
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
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
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
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
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
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getServicesByTags(tags: string[]): Promise<({
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
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    createStaff(userId: string, userRole: user_role, createStaffDto: CreateStaffDto): Promise<{
        vendor: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        name: string;
        imageUrl: string | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
        bio: string | null;
        specialties: string[];
    }>;
    getAllStaff(vendorId?: string, isActive?: boolean): Promise<({
        vendor: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        name: string;
        imageUrl: string | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
        bio: string | null;
        specialties: string[];
    })[]>;
    getStaffById(id: string): Promise<{
        vendor: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        name: string;
        imageUrl: string | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
        bio: string | null;
        specialties: string[];
    }>;
    updateStaff(id: string, userId: string, userRole: user_role, updateStaffDto: UpdateStaffDto): Promise<{
        vendor: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        name: string;
        imageUrl: string | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
        bio: string | null;
        specialties: string[];
    }>;
    deleteStaff(id: string, userId: string, userRole: user_role): Promise<{
        id: string;
        name: string;
        imageUrl: string | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
        bio: string | null;
        specialties: string[];
    }>;
    getStaffByVendorId(vendorId: string, isActive?: boolean): Promise<({
        vendor: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        name: string;
        imageUrl: string | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
        bio: string | null;
        specialties: string[];
    })[]>;
    searchStaff(query: string, vendorId?: string): Promise<({
        vendor: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        name: string;
        imageUrl: string | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
        bio: string | null;
        specialties: string[];
    })[]>;
    getStaffBySpecialties(specialties: string[], vendorId?: string): Promise<({
        vendor: {
            id: string;
            email: string;
            fullName: string;
            businessName: string;
        };
    } & {
        id: string;
        name: string;
        imageUrl: string | null;
        isActive: boolean;
        vendorId: string;
        createdAt: Date;
        updatedAt: Date;
        bio: string | null;
        specialties: string[];
    })[]>;
}
