import { user_role, onboarding_field_type } from '@prisma/client';
export declare class CreateRequirementDto {
    role: user_role;
    label: string;
    fieldType: onboarding_field_type;
    isMandatory?: boolean;
    description?: string;
    placeholder?: string;
    selectOptions?: any;
    position?: number;
    isActive?: boolean;
    isPaymentRelated?: boolean;
    validationRules?: any;
}
