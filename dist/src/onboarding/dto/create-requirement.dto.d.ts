export declare class CreateRequirementDto {
    role: 'client' | 'vendor' | 'retailer' | 'admin' | 'manufacturer';
    label: string;
    fieldType: 'text' | 'textarea' | 'select' | 'file' | 'email' | 'phone' | 'url' | 'rich_text';
    isMandatory: boolean;
    description?: string;
    placeholder?: string;
    selectOptions?: string[];
    position: number;
    isActive: boolean;
    isPaymentRelated?: boolean;
    validationRules?: any;
}
