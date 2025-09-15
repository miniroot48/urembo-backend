import { PrismaClient, user_role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createTestUsers() {
  console.log('👥 Creating test users...');

  try {
    // Check if test users already exist
    const existingVendor = await prisma.profile.findUnique({
      where: { email: 'testvendor@urembohub.com' }
    });
    const existingRetailer = await prisma.profile.findUnique({
      where: { email: 'testretailer@urembohub.com' }
    });
    const existingManufacturer = await prisma.profile.findUnique({
      where: { email: 'testmanufacturer@urembohub.com' }
    });

    if (existingVendor && existingRetailer && existingManufacturer) {
      console.log('✅ Test users already exist');
      return { existingVendor, existingRetailer, existingManufacturer };
    }

    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create Test Vendor
    const testVendor = await prisma.profile.upsert({
      where: { email: 'testvendor@urembohub.com' },
      update: {},
      create: {
        email: 'testvendor@urembohub.com',
        password: hashedPassword,
        fullName: 'Test Vendor',
        role: user_role.vendor,
        businessName: 'Test Beauty Services',
        businessDescription: 'Professional beauty services for testing',
        isVerified: true,
        onboardingStatus: 'approved' as any,
      }
    });

    // Create Test Retailer
    const testRetailer = await prisma.profile.upsert({
      where: { email: 'testretailer@urembohub.com' },
      update: {},
      create: {
        email: 'testretailer@urembohub.com',
        password: hashedPassword,
        fullName: 'Test Retailer',
        role: user_role.retailer,
        businessName: 'Test Beauty Store',
        businessDescription: 'Beauty products retail store for testing',
        isVerified: true,
        onboardingStatus: 'approved' as any,
      }
    });

    // Create Test Manufacturer
    const testManufacturer = await prisma.profile.upsert({
      where: { email: 'testmanufacturer@urembohub.com' },
      update: {},
      create: {
        email: 'testmanufacturer@urembohub.com',
        password: hashedPassword,
        fullName: 'Test Manufacturer',
        role: user_role.manufacturer,
        businessName: 'Test Beauty Manufacturing',
        businessDescription: 'Beauty products manufacturing for testing',
        isVerified: true,
        onboardingStatus: 'approved' as any,
      }
    });

    console.log('✅ Test users created successfully!');
    console.log('👤 Vendor:', testVendor.email);
    console.log('🏪 Retailer:', testRetailer.email);
    console.log('🏭 Manufacturer:', testManufacturer.email);

    return { testVendor, testRetailer, testManufacturer };

  } catch (error) {
    console.error('❌ Error creating test users:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  createTestUsers()
    .then(() => {
      console.log('🎉 Test users creation completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed failed:', error);
      process.exit(1);
    });
}

export { createTestUsers };
