import { user_role } from '@prisma/client';
export declare class RegisterDto {
    email: string;
    password: string;
    fullName?: string;
    role?: user_role;
    businessName?: string;
    businessDescription?: string;
    businessAddress?: string;
    businessPhone?: string;
}
