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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        deliveryMethod: string | null;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        deliveryMethod: string | null;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        deliveryMethod: string | null;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        deliveryMethod: string | null;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
        vendorId: string;
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
        deliveryMethod: string | null;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        deliveryMethod: string | null;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        deliveryMethod: string | null;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        deliveryMethod: string | null;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        deliveryMethod: string | null;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        deliveryMethod: string | null;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        deliveryMethod: string | null;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        deliveryMethod: string | null;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
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
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        durationMinutes: number;
        imageUrl: string | null;
        category: string | null;
        deliveryMethod: string | null;
        tags: string[];
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        subcategoryId: string | null;
        actualServiceId: string | null;
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
        name: string;
        imageUrl: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        vendorId: string;
        bio: string | null;
        specialties: string[];
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
        name: string;
        imageUrl: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        vendorId: string;
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
        createdAt: Date;
        updatedAt: Date;
        vendorId: string;
        bio: string | null;
        specialties: string[];
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
        name: string;
        imageUrl: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        vendorId: string;
        bio: string | null;
        specialties: string[];
    }>;
    deleteStaff(id: string, req: any): Promise<{
        id: string;
        name: string;
        imageUrl: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        vendorId: string;
        bio: string | null;
        specialties: string[];
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
        name: string;
        imageUrl: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        vendorId: string;
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
        createdAt: Date;
        updatedAt: Date;
        vendorId: string;
        bio: string | null;
        specialties: string[];
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
        name: string;
        imageUrl: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        vendorId: string;
        bio: string | null;
        specialties: string[];
    })[]>;
}
