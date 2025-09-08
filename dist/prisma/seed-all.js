"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function createAdminUser() {
    console.log('👤 Creating admin user...');
    try {
        const existingAdmin = await prisma.profile.findFirst({
            where: { role: client_1.user_role.admin },
        });
        if (existingAdmin) {
            console.log('⚠️ Admin user already exists:', existingAdmin.email);
            return existingAdmin;
        }
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = await prisma.profile.create({
            data: {
                email: 'admin@urembohub.com',
                password: hashedPassword,
                fullName: 'Urembo Hub Administrator',
                role: client_1.user_role.admin,
                businessName: 'Urembo Hub',
                businessDescription: 'Platform administrator for Urembo Hub marketplace',
                isVerified: true,
                onboardingStatus: 'approved',
            },
        });
        console.log('✅ Admin user created successfully!');
        return admin;
    }
    catch (error) {
        console.error('❌ Error creating admin user:', error);
        throw error;
    }
}
async function createTestUsers() {
    console.log('\n🧪 Creating test users...');
    const testUsers = [
        {
            email: 'vendor@test.com',
            password: await bcrypt.hash('vendor123', 10),
            fullName: 'Test Vendor',
            role: client_1.user_role.vendor,
            businessName: 'Test Beauty Services',
            businessDescription: 'Professional beauty and wellness services',
            businessAddress: '123 Beauty Street, Nairobi, Kenya',
            businessPhone: '+254700000001',
            isVerified: false,
            onboardingStatus: 'pending',
        },
        {
            email: 'retailer@test.com',
            password: await bcrypt.hash('retailer123', 10),
            fullName: 'Test Retailer',
            role: client_1.user_role.retailer,
            businessName: 'Test Beauty Store',
            businessDescription: 'Retail store specializing in beauty products',
            businessAddress: '456 Retail Avenue, Nairobi, Kenya',
            businessPhone: '+254700000002',
            isVerified: false,
            onboardingStatus: 'pending',
        },
        {
            email: 'manufacturer@test.com',
            password: await bcrypt.hash('manufacturer123', 10),
            fullName: 'Test Manufacturer',
            role: client_1.user_role.manufacturer,
            businessName: 'Test Beauty Manufacturing',
            businessDescription: 'Manufacturer of high-quality beauty products',
            businessAddress: '789 Factory Road, Nairobi, Kenya',
            businessPhone: '+254700000003',
            isVerified: false,
            onboardingStatus: 'pending',
        },
        {
            email: 'client@test.com',
            password: await bcrypt.hash('client123', 10),
            fullName: 'Test Client',
            role: client_1.user_role.client,
            businessName: null,
            businessDescription: null,
            businessAddress: null,
            businessPhone: null,
            isVerified: true,
            onboardingStatus: 'approved',
        },
    ];
    const createdUsers = [];
    for (const userData of testUsers) {
        try {
            const existingUser = await prisma.profile.findUnique({
                where: { email: userData.email },
            });
            if (existingUser) {
                console.log(`⚠️ User already exists: ${userData.email}`);
                createdUsers.push(existingUser);
                continue;
            }
            const user = await prisma.profile.create({
                data: userData,
            });
            console.log(`✅ Created ${userData.role}: ${user.email}`);
            createdUsers.push(user);
        }
        catch (error) {
            console.error(`❌ Error creating user ${userData.email}:`, error);
        }
    }
    return createdUsers;
}
async function seedOnboardingRequirements() {
    console.log('\n🌱 Seeding onboarding requirements...');
    try {
        await prisma.onboardingRequirement.deleteMany({});
        console.log('🧹 Cleared existing onboarding requirements');
        const onboardingRequirementsData = {
            [client_1.user_role.vendor]: [
                {
                    label: 'Business License Number',
                    fieldType: client_1.onboarding_field_type.text,
                    isMandatory: true,
                    description: 'Provide your business license registration number',
                    placeholder: 'e.g., BL123456789',
                    position: 1,
                    isPaymentRelated: false,
                    validationRules: {
                        minLength: 5,
                        maxLength: 50,
                        pattern: '^[A-Z0-9]+$',
                        required: true
                    }
                },
                {
                    label: 'Business Address',
                    fieldType: client_1.onboarding_field_type.text,
                    isMandatory: true,
                    description: 'Complete business address for verification',
                    placeholder: 'Street, City, Country',
                    position: 2,
                    isPaymentRelated: false,
                    validationRules: {
                        minLength: 10,
                        maxLength: 200,
                        required: true
                    }
                },
                {
                    label: 'Business Description',
                    fieldType: client_1.onboarding_field_type.textarea,
                    isMandatory: true,
                    description: 'Describe your business and services offered',
                    placeholder: 'Tell us about your business...',
                    position: 3,
                    isPaymentRelated: false,
                    validationRules: {
                        minLength: 50,
                        maxLength: 1000,
                        required: true
                    }
                },
                {
                    label: 'Identity Document',
                    fieldType: client_1.onboarding_field_type.file,
                    isMandatory: true,
                    description: 'Upload a copy of your national ID or passport',
                    placeholder: null,
                    position: 4,
                    isPaymentRelated: false,
                    validationRules: {
                        fileTypes: ['image/jpeg', 'image/png', 'application/pdf'],
                        maxSize: '5MB',
                        required: true
                    }
                },
                {
                    label: 'Tax Identification Number',
                    fieldType: client_1.onboarding_field_type.text,
                    isMandatory: true,
                    description: 'Provide your tax identification number',
                    placeholder: 'e.g., TIN123456789',
                    position: 5,
                    isPaymentRelated: true,
                    validationRules: {
                        minLength: 8,
                        maxLength: 20,
                        pattern: '^[A-Z0-9]+$',
                        required: true
                    }
                },
                {
                    label: 'Bank Account Details',
                    fieldType: client_1.onboarding_field_type.textarea,
                    isMandatory: true,
                    description: 'Provide your bank account details for payments',
                    placeholder: 'Bank Name, Account Number, Account Holder Name',
                    position: 6,
                    isPaymentRelated: true,
                    validationRules: {
                        minLength: 20,
                        maxLength: 500,
                        required: true
                    }
                },
            ],
            [client_1.user_role.retailer]: [
                {
                    label: 'Store License Number',
                    fieldType: client_1.onboarding_field_type.text,
                    isMandatory: true,
                    description: 'Provide your retail store license number',
                    placeholder: 'e.g., SL123456789',
                    position: 1,
                    isPaymentRelated: false,
                    validationRules: {
                        minLength: 5,
                        maxLength: 50,
                        pattern: '^[A-Z0-9]+$',
                        required: true
                    }
                },
                {
                    label: 'Store Address',
                    fieldType: client_1.onboarding_field_type.text,
                    isMandatory: true,
                    description: 'Physical store address for verification',
                    placeholder: 'Street, City, Country',
                    position: 2,
                    isPaymentRelated: false,
                    validationRules: {
                        minLength: 10,
                        maxLength: 200,
                        required: true
                    }
                },
                {
                    label: 'Business Registration Certificate',
                    fieldType: client_1.onboarding_field_type.file,
                    isMandatory: true,
                    description: 'Upload business registration certificate',
                    placeholder: null,
                    position: 3,
                    isPaymentRelated: false,
                    validationRules: {
                        fileTypes: ['image/jpeg', 'image/png', 'application/pdf'],
                        maxSize: '10MB',
                        required: true
                    }
                },
                {
                    label: 'Tax Identification Number',
                    fieldType: client_1.onboarding_field_type.text,
                    isMandatory: true,
                    description: 'Provide your tax identification number',
                    placeholder: 'e.g., TIN123456789',
                    position: 4,
                    isPaymentRelated: true,
                    validationRules: {
                        minLength: 8,
                        maxLength: 20,
                        pattern: '^[A-Z0-9]+$',
                        required: true
                    }
                },
                {
                    label: 'Bank Account Details',
                    fieldType: client_1.onboarding_field_type.textarea,
                    isMandatory: true,
                    description: 'Provide your bank account details for payments',
                    placeholder: 'Bank Name, Account Number, Account Holder Name',
                    position: 5,
                    isPaymentRelated: true,
                    validationRules: {
                        minLength: 20,
                        maxLength: 500,
                        required: true
                    }
                },
            ],
            [client_1.user_role.manufacturer]: [
                {
                    label: 'Manufacturing License',
                    fieldType: client_1.onboarding_field_type.text,
                    isMandatory: true,
                    description: 'Manufacturing license registration number',
                    placeholder: 'e.g., ML123456789',
                    position: 1,
                    isPaymentRelated: false,
                    validationRules: {
                        minLength: 5,
                        maxLength: 50,
                        pattern: '^[A-Z0-9]+$',
                        required: true
                    }
                },
                {
                    label: 'Factory Address',
                    fieldType: client_1.onboarding_field_type.text,
                    isMandatory: true,
                    description: 'Complete factory/manufacturing facility address',
                    placeholder: 'Street, City, Country',
                    position: 2,
                    isPaymentRelated: false,
                    validationRules: {
                        minLength: 10,
                        maxLength: 200,
                        required: true
                    }
                },
                {
                    label: 'Product Categories',
                    fieldType: client_1.onboarding_field_type.textarea,
                    isMandatory: true,
                    description: 'List the product categories you manufacture',
                    placeholder: 'Cosmetics, Skincare, etc.',
                    position: 3,
                    isPaymentRelated: false,
                    validationRules: {
                        minLength: 20,
                        maxLength: 500,
                        required: true
                    }
                },
                {
                    label: 'Tax Identification Number',
                    fieldType: client_1.onboarding_field_type.text,
                    isMandatory: true,
                    description: 'Provide your tax identification number',
                    placeholder: 'e.g., TIN123456789',
                    position: 4,
                    isPaymentRelated: true,
                    validationRules: {
                        minLength: 8,
                        maxLength: 20,
                        pattern: '^[A-Z0-9]+$',
                        required: true
                    }
                },
                {
                    label: 'Bank Account Details',
                    fieldType: client_1.onboarding_field_type.textarea,
                    isMandatory: true,
                    description: 'Provide your bank account details for payments',
                    placeholder: 'Bank Name, Account Number, Account Holder Name',
                    position: 5,
                    isPaymentRelated: true,
                    validationRules: {
                        minLength: 20,
                        maxLength: 500,
                        required: true
                    }
                },
            ]
        };
        let totalCreated = 0;
        for (const [role, requirements] of Object.entries(onboardingRequirementsData)) {
            console.log(`📝 Creating requirements for ${role}...`);
            for (const requirement of requirements) {
                await prisma.onboardingRequirement.create({
                    data: {
                        role: role,
                        label: requirement.label,
                        fieldType: requirement.fieldType,
                        isMandatory: requirement.isMandatory,
                        description: requirement.description,
                        placeholder: requirement.placeholder,
                        selectOptions: requirement.selectOptions || null,
                        position: requirement.position,
                        isActive: true,
                        isPaymentRelated: requirement.isPaymentRelated,
                        validationRules: requirement.validationRules,
                    },
                });
                totalCreated++;
            }
            console.log(`✅ Created ${requirements.length} requirements for ${role}`);
        }
        console.log(`\n🎉 Successfully created ${totalCreated} onboarding requirements!`);
    }
    catch (error) {
        console.error('❌ Error seeding onboarding requirements:', error);
        throw error;
    }
}
async function displaySummary() {
    console.log('\n📊 Final Summary:');
    const userCounts = await Promise.all([
        prisma.profile.count({ where: { role: client_1.user_role.admin } }),
        prisma.profile.count({ where: { role: client_1.user_role.vendor } }),
        prisma.profile.count({ where: { role: client_1.user_role.retailer } }),
        prisma.profile.count({ where: { role: client_1.user_role.manufacturer } }),
        prisma.profile.count({ where: { role: client_1.user_role.client } }),
    ]);
    const totalUsers = userCounts.reduce((sum, count) => sum + count, 0);
    console.log('\n👥 Users:');
    console.log(`   Admin users: ${userCounts[0]}`);
    console.log(`   Vendor users: ${userCounts[1]}`);
    console.log(`   Retailer users: ${userCounts[2]}`);
    console.log(`   Manufacturer users: ${userCounts[3]}`);
    console.log(`   Client users: ${userCounts[4]}`);
    console.log(`   Total users: ${totalUsers}`);
    const requirementCounts = await Promise.all([
        prisma.onboardingRequirement.count({ where: { role: client_1.user_role.vendor } }),
        prisma.onboardingRequirement.count({ where: { role: client_1.user_role.retailer } }),
        prisma.onboardingRequirement.count({ where: { role: client_1.user_role.manufacturer } }),
    ]);
    const totalRequirements = requirementCounts.reduce((sum, count) => sum + count, 0);
    console.log('\n📋 Onboarding Requirements:');
    console.log(`   Vendor requirements: ${requirementCounts[0]}`);
    console.log(`   Retailer requirements: ${requirementCounts[1]}`);
    console.log(`   Manufacturer requirements: ${requirementCounts[2]}`);
    console.log(`   Total requirements: ${totalRequirements}`);
    const onboardingStatusCounts = await prisma.profile.groupBy({
        by: ['onboardingStatus'],
        _count: {
            onboardingStatus: true,
        },
    });
    console.log('\n📊 Onboarding Status Summary:');
    onboardingStatusCounts.forEach((status) => {
        console.log(`   ${status.onboardingStatus || 'null'}: ${status._count.onboardingStatus}`);
    });
}
async function main() {
    console.log('🚀 Starting comprehensive seed...');
    console.log('This will create admin user, test users, and onboarding requirements\n');
    try {
        await createAdminUser();
        await createTestUsers();
        await seedOnboardingRequirements();
        await displaySummary();
        console.log('\n🎉 Comprehensive seed completed successfully!');
        console.log('\n📝 Next steps:');
        console.log('   1. Set up your database connection');
        console.log('   2. Run migrations: npm run db:migrate');
        console.log('   3. Start the application: npm run start:dev');
        console.log('   4. Access admin panel with: admin@urembohub.com');
    }
    catch (error) {
        console.error('❌ Comprehensive seed failed:', error);
        throw error;
    }
}
main()
    .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Database connection closed');
});
//# sourceMappingURL=seed-all.js.map