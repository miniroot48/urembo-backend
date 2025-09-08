import { user_role } from '@prisma/client';
export declare class CreateUserDto {
    email: string;
    fullName?: string;
    phone?: string;
    role?: user_role;
    businessName?: string;
    businessDescription?: string;
    businessAddress?: string;
    businessPhone?: string;
}
