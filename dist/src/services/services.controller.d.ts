import { ServicesService } from './services.service';
import { CreateServiceDto, UpdateServiceDto, CreateStaffDto, UpdateStaffDto } from './dto';
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
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        imageUrl: string | null;
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
    getUserServices(req: any): Promise<({
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
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        imageUrl: string | null;
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
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        imageUrl: string | null;
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
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        imageUrl: string | null;
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
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        imageUrl: string | null;
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
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        imageUrl: string | null;
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
    getServicesByPriceRange(minPrice?: string, maxPrice?: string): Promise<({
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
        tags: string[];
        category: string | null;
        durationMinutes: number;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        vendorId: string;
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
        tags: string[];
        category: string | null;
        durationMinutes: number;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        vendorId: string;
    })[]>;
    getServicesByTags(tags: string): Promise<({
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
        tags: string[];
        category: string | null;
        durationMinutes: number;
        actualServiceId: string | null;
        deliveryMethod: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        vendorId: string;
    })[]>;
    createStaff(createStaffDto: CreateStaffDto, req: any): Promise<{
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
    getAllStaff(vendorId?: string, isActive?: string): Promise<({
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
    updateStaff(id: string, updateStaffDto: UpdateStaffDto, req: any): Promise<{
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
    deleteStaff(id: string, req: any): Promise<{
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
    getStaffByVendorId(vendorId: string, isActive?: string): Promise<({
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
    getStaffBySpecialties(specialties: string, vendorId?: string): Promise<({
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
