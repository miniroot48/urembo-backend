import { PrismaClient, user_role, onboarding_field_type } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting onboarding requirements seed...');

  // Clear existing onboarding requirements
  await prisma.onboardingRequirement.deleteMany({});
  console.log('🧹 Cleared existing onboarding requirements');

  // Vendor Requirements
  const vendorRequirements = [
    {
      role: user_role.vendor,
      label: 'Business License Number',
      fieldType: onboarding_field_type.text,
      isMandatory: true,
      description: 'Provide your business license registration number',
      placeholder: 'e.g., BL123456789',
      position: 1,
      isActive: true,
      isPaymentRelated: false,
    },
    {
      role: user_role.vendor,
      label: 'Business Address',
      fieldType: onboarding_field_type.text,
      isMandatory: true,
      description: 'Complete business address for verification',
      placeholder: 'Street, City, Country',
      position: 2,
      isActive: true,
      isPaymentRelated: false,
    },
    {
      role: user_role.vendor,
      label: 'Business Description',
      fieldType: onboarding_field_type.textarea,
      isMandatory: true,
      description: 'Describe your business and services offered',
      placeholder: 'Tell us about your business...',
      position: 3,
      isActive: true,
      isPaymentRelated: false,
    },
    {
      role: user_role.vendor,
      label: 'Identity Document',
      fieldType: onboarding_field_type.file,
      isMandatory: true,
      description: 'Upload a copy of your national ID or passport',
      placeholder: null,
      position: 4,
      isActive: true,
      isPaymentRelated: false,
    },
    {
      role: user_role.vendor,
      label: 'Business Registration Certificate',
      fieldType: onboarding_field_type.file,
      isMandatory: true,
      description: 'Upload your business registration certificate',
      placeholder: null,
      position: 5,
      isActive: true,
      isPaymentRelated: false,
    },
    {
      role: user_role.vendor,
      label: 'Tax Identification Number',
      fieldType: onboarding_field_type.text,
      isMandatory: true,
      description: 'Provide your tax identification number',
      placeholder: 'e.g., TIN123456789',
      position: 6,
      isActive: true,
      isPaymentRelated: true,
    },
    {
      role: user_role.vendor,
      label: 'Bank Account Details',
      fieldType: onboarding_field_type.textarea,
      isMandatory: true,
      description: 'Provide your bank account details for payments',
      placeholder: 'Bank Name, Account Number, Account Holder Name',
      position: 7,
      isActive: true,
      isPaymentRelated: true,
    },
    {
      role: user_role.vendor,
      label: 'Service Categories',
      fieldType: onboarding_field_type.select,
      isMandatory: false,
      description: 'Select the main service categories you offer',
      placeholder: null,
      selectOptions: {
        options: [
          'Beauty & Cosmetics',
          'Skincare',
          'Hair Care',
          'Body Care',
          'Health & Wellness',
          'Fashion Accessories',
          'Nail Art',
          'Makeup Services',
          'Spa Services',
          'Other'
        ],
        multiple: true
      },
      position: 8,
      isActive: true,
      isPaymentRelated: false,
    },
  ];

  // Retailer Requirements
  const retailerRequirements = [
    {
      role: user_role.retailer,
      label: 'Store License Number',
      fieldType: onboarding_field_type.text,
      isMandatory: true,
      description: 'Provide your retail store license number',
      placeholder: 'e.g., SL123456789',
      position: 1,
      isActive: true,
      isPaymentRelated: false,
    },
    {
      role: user_role.retailer,
      label: 'Store Address',
      fieldType: onboarding_field_type.text,
      isMandatory: true,
      description: 'Physical store address for verification',
      placeholder: 'Street, City, Country',
      position: 2,
      isActive: true,
      isPaymentRelated: false,
    },
    {
      role: user_role.retailer,
      label: 'Business Registration Certificate',
      fieldType: onboarding_field_type.file,
      isMandatory: true,
      description: 'Upload business registration certificate',
      placeholder: null,
      position: 3,
      isActive: true,
      isPaymentRelated: false,
    },
    {
      role: user_role.retailer,
      label: 'Product Categories',
      fieldType: onboarding_field_type.select,
      isMandatory: false,
      description: 'Main product categories you will sell',
      placeholder: null,
      selectOptions: {
        options: [
          'Beauty & Cosmetics',
          'Skincare',
          'Hair Care',
          'Body Care',
          'Health & Wellness',
          'Fashion Accessories',
          'Fragrances',
          'Tools & Accessories',
          'Other'
        ],
        multiple: true
      },
      position: 4,
      isActive: true,
      isPaymentRelated: false,
    },
    {
      role: user_role.retailer,
      label: 'Store Photos',
      fieldType: onboarding_field_type.file,
      isMandatory: false,
      description: 'Upload photos of your retail store (optional)',
      placeholder: null,
      position: 5,
      isActive: true,
      isPaymentRelated: false,
    },
    {
      role: user_role.retailer,
      label: 'Tax Identification Number',
      fieldType: onboarding_field_type.text,
      isMandatory: true,
      description: 'Provide your tax identification number',
      placeholder: 'e.g., TIN123456789',
      position: 6,
      isActive: true,
      isPaymentRelated: true,
    },
    {
      role: user_role.retailer,
      label: 'Bank Account Details',
      fieldType: onboarding_field_type.textarea,
      isMandatory: true,
      description: 'Provide your bank account details for payments',
      placeholder: 'Bank Name, Account Number, Account Holder Name',
      position: 7,
      isActive: true,
      isPaymentRelated: true,
    },
    {
      role: user_role.retailer,
      label: 'Inventory Management System',
      fieldType: onboarding_field_type.select,
      isMandatory: false,
      description: 'Do you have an inventory management system?',
      placeholder: null,
      selectOptions: {
        options: [
          'Yes, I have a system',
          'No, I manage manually',
          'Planning to implement one'
        ],
        multiple: false
      },
      position: 8,
      isActive: true,
      isPaymentRelated: false,
    },
  ];

  // Manufacturer Requirements
  const manufacturerRequirements = [
    {
      role: user_role.manufacturer,
      label: 'Manufacturing License',
      fieldType: onboarding_field_type.text,
      isMandatory: true,
      description: 'Manufacturing license registration number',
      placeholder: 'e.g., ML123456789',
      position: 1,
      isActive: true,
      isPaymentRelated: false,
    },
    {
      role: user_role.manufacturer,
      label: 'Factory Address',
      fieldType: onboarding_field_type.text,
      isMandatory: true,
      description: 'Complete factory/manufacturing facility address',
      placeholder: 'Street, City, Country',
      position: 2,
      isActive: true,
      isPaymentRelated: false,
    },
    {
      role: user_role.manufacturer,
      label: 'Quality Certifications',
      fieldType: onboarding_field_type.file,
      isMandatory: false,
      description: 'Upload quality management certificates (ISO, etc.)',
      placeholder: null,
      position: 3,
      isActive: true,
      isPaymentRelated: false,
    },
    {
      role: user_role.manufacturer,
      label: 'Product Categories',
      fieldType: onboarding_field_type.textarea,
      isMandatory: true,
      description: 'List the product categories you manufacture',
      placeholder: 'Cosmetics, Skincare, etc.',
      position: 4,
      isActive: true,
      isPaymentRelated: false,
    },
    {
      role: user_role.manufacturer,
      label: 'Production Capacity',
      fieldType: onboarding_field_type.text,
      isMandatory: false,
      description: 'What is your monthly production capacity?',
      placeholder: 'e.g., 10,000 units per month',
      position: 5,
      isActive: true,
      isPaymentRelated: false,
    },
    {
      role: user_role.manufacturer,
      label: 'Factory Photos',
      fieldType: onboarding_field_type.file,
      isMandatory: false,
      description: 'Upload photos of your manufacturing facility (optional)',
      placeholder: null,
      position: 6,
      isActive: true,
      isPaymentRelated: false,
    },
    {
      role: user_role.manufacturer,
      label: 'Tax Identification Number',
      fieldType: onboarding_field_type.text,
      isMandatory: true,
      description: 'Provide your tax identification number',
      placeholder: 'e.g., TIN123456789',
      position: 7,
      isActive: true,
      isPaymentRelated: true,
    },
    {
      role: user_role.manufacturer,
      label: 'Bank Account Details',
      fieldType: onboarding_field_type.textarea,
      isMandatory: true,
      description: 'Provide your bank account details for payments',
      placeholder: 'Bank Name, Account Number, Account Holder Name',
      position: 8,
      isActive: true,
      isPaymentRelated: true,
    },
    {
      role: user_role.manufacturer,
      label: 'Export License',
      fieldType: onboarding_field_type.file,
      isMandatory: false,
      description: 'Upload export license if you export products (optional)',
      placeholder: null,
      position: 9,
      isActive: true,
      isPaymentRelated: false,
    },
    {
      role: user_role.manufacturer,
      label: 'Environmental Compliance',
      fieldType: onboarding_field_type.select,
      isMandatory: false,
      description: 'Do you have environmental compliance certificates?',
      placeholder: null,
      selectOptions: {
        options: [
          'Yes, I have certificates',
          'No, but I follow regulations',
          'In the process of obtaining'
        ],
        multiple: false
      },
      position: 10,
      isActive: true,
      isPaymentRelated: false,
    },
  ];

  // Insert all requirements
  const allRequirements = [
    ...vendorRequirements,
    ...retailerRequirements,
    ...manufacturerRequirements,
  ];

  console.log(`📝 Creating ${allRequirements.length} onboarding requirements...`);

  for (const requirement of allRequirements) {
    await prisma.onboardingRequirement.create({
      data: requirement,
    });
  }

  console.log('✅ Onboarding requirements created successfully!');

  // Display summary
  const vendorCount = await prisma.onboardingRequirement.count({
    where: { role: user_role.vendor },
  });
  const retailerCount = await prisma.onboardingRequirement.count({
    where: { role: user_role.retailer },
  });
  const manufacturerCount = await prisma.onboardingRequirement.count({
    where: { role: user_role.manufacturer },
  });

  console.log('\n📊 Summary:');
  console.log(`   Vendor requirements: ${vendorCount}`);
  console.log(`   Retailer requirements: ${retailerCount}`);
  console.log(`   Manufacturer requirements: ${manufacturerCount}`);
  console.log(`   Total requirements: ${vendorCount + retailerCount + manufacturerCount}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding onboarding requirements:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Database connection closed');
  });
