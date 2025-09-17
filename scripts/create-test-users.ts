import { PrismaClient, user_role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Helper function to get role-specific avatar URLs
function getAvatarUrl(role: string): string {
  const avatarMap: { [key: string]: string } = {
    'vendor': 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'retailer': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'manufacturer': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'admin': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'client': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
  };
  
  return avatarMap[role] || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80';
}

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
        avatarUrl: getAvatarUrl('vendor'),
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
        avatarUrl: getAvatarUrl('retailer'),
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
        avatarUrl: getAvatarUrl('manufacturer'),
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
