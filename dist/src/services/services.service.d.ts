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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        categoryId: string | null;
        subcategoryId: string | null;
        tags: string[];
        category: string | null;
        durationMinutes: number;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
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
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        categoryId: string | null;
        subcategoryId: string | null;
        tags: string[];
        category: string | null;
        durationMinutes: number;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
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
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        categoryId: string | null;
        subcategoryId: string | null;
        tags: string[];
        category: string | null;
        durationMinutes: number;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
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
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        categoryId: string | null;
        subcategoryId: string | null;
        tags: string[];
        category: string | null;
        durationMinutes: number;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        vendorId: string;
    }>;
    deleteService(id: string, userId: string, userRole: user_role): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        categoryId: string | null;
        subcategoryId: string | null;
        tags: string[];
        category: string | null;
        durationMinutes: number;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        vendorId: string;
    }>;
    getUserServices(userId: string): Promise<({
        serviceCategory: {
            id: string;
            name: string;
            description: string;
        };
        serviceSubcategory: {
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
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        categoryId: string | null;
        subcategoryId: string | null;
        tags: string[];
        category: string | null;
        durationMinutes: number;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        vendorId: string;
    })[]>;
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
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        categoryId: string | null;
        subcategoryId: string | null;
        tags: string[];
        category: string | null;
        durationMinutes: number;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
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
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        categoryId: string | null;
        subcategoryId: string | null;
        tags: string[];
        category: string | null;
        durationMinutes: number;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
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
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        categoryId: string | null;
        subcategoryId: string | null;
        tags: string[];
        category: string | null;
        durationMinutes: number;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
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
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        categoryId: string | null;
        subcategoryId: string | null;
        tags: string[];
        category: string | null;
        durationMinutes: number;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
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
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        categoryId: string | null;
        subcategoryId: string | null;
        tags: string[];
        category: string | null;
        durationMinutes: number;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
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
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        categoryId: string | null;
        subcategoryId: string | null;
        tags: string[];
        category: string | null;
        durationMinutes: number;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        vendorId: string;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        imageUrl: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        categoryId: string | null;
        subcategoryId: string | null;
        tags: string[];
        category: string | null;
        durationMinutes: number;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        vendorId: string;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        imageUrl: string | null;
        bio: string | null;
        specialties: string[];
        vendorId: string;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        imageUrl: string | null;
        bio: string | null;
        specialties: string[];
        vendorId: string;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        imageUrl: string | null;
        bio: string | null;
        specialties: string[];
        vendorId: string;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        imageUrl: string | null;
        bio: string | null;
        specialties: string[];
        vendorId: string;
    }>;
    deleteStaff(id: string, userId: string, userRole: user_role): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        imageUrl: string | null;
        bio: string | null;
        specialties: string[];
        vendorId: string;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        imageUrl: string | null;
        bio: string | null;
        specialties: string[];
        vendorId: string;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        imageUrl: string | null;
        bio: string | null;
        specialties: string[];
        vendorId: string;
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
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        imageUrl: string | null;
        bio: string | null;
        specialties: string[];
        vendorId: string;
    })[]>;
}
