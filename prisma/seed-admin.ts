// import { PrismaClient, user_role } from '@prisma/client';
// import * as bcrypt from 'bcryptjs';

// const prisma = new PrismaClient();

// async function createAdminUser() {
//   console.log('👤 Creating admin user...');

//   try {
//     // Check if admin user already exists
//     const existingAdmin = await prisma.profile.findFirst({
//       where: {
//         role: user_role.admin,
//       },
//     });

//     if (existingAdmin) {
//       console.log('⚠️ Admin user already exists:', existingAdmin.email);
//       return existingAdmin;
//     }

//     // Create admin user
//     const adminData = {
//       email: 'admin@urembohub.com',
//       fullName: 'Urembo Hub Administrator',
//       role: user_role.admin,
//       businessName: 'Urembo Hub',
//       businessDescription: 'Platform administrator for Urembo Hub marketplace',
//       isVerified: true,
//       onboardingStatus: 'approved' as any, // Admin is auto-approved
//     };

//     const admin = await prisma.profile.create({
//       data: adminData,
//     });

//     console.log('✅ Admin user created successfully!');
//     console.log('📧 Email:', admin.email);
//     console.log('👤 Name:', admin.fullName);
//     console.log('🔑 Role:', admin.role);
//     console.log('✅ Verified:', admin.isVerified);
//     console.log('📋 Onboarding Status:', admin.onboardingStatus);

//     return admin;

//   } catch (error) {
//     console.error('❌ Error creating admin user:', error);
//     throw error;
//   }
// }

// async function createTestUsers() {
//   console.log('\n🧪 Creating test users...');

//   const testUsers = [
//     {
//       email: 'vendor@test.com',
//       fullName: 'Test Vendor',
//       role: user_role.vendor,
//       businessName: 'Test Beauty Services',
//       businessDescription: 'Professional beauty and wellness services',
//       businessAddress: '123 Beauty Street, Nairobi, Kenya',
//       businessPhone: '+254700000001',
//       isVerified: false,
//       onboardingStatus: 'pending' as any,
//     },
//     {
//       email: 'retailer@test.com',
//       fullName: 'Test Retailer',
//       role: user_role.retailer,
//       businessName: 'Test Beauty Store',
//       businessDescription: 'Retail store specializing in beauty products',
//       businessAddress: '456 Retail Avenue, Nairobi, Kenya',
//       businessPhone: '+254700000002',
//       isVerified: false,
//       onboardingStatus: 'pending' as any,
//     },
//     {
//       email: 'manufacturer@test.com',
//       fullName: 'Test Manufacturer',
//       role: user_role.manufacturer,
//       businessName: 'Test Beauty Manufacturing',
//       businessDescription: 'Manufacturer of high-quality beauty products',
//       businessAddress: '789 Factory Road, Nairobi, Kenya',
//       businessPhone: '+254700000003',
//       isVerified: false,
//       onboardingStatus: 'pending' as any,
//     },
//     {
//       email: 'client@test.com',
//       fullName: 'Test Client',
//       role: user_role.client,
//       businessName: null,
//       businessDescription: null,
//       businessAddress: null,
//       businessPhone: null,
//       isVerified: true,
//       onboardingStatus: 'approved' as any, // Clients are auto-approved
//     },
//   ];

//   const createdUsers = [];

//   for (const userData of testUsers) {
//     try {
//       // Check if user already exists
//       const existingUser = await prisma.profile.findUnique({
//         where: { email: userData.email },
//       });

//       if (existingUser) {
//         console.log(`⚠️ User already exists: ${userData.email}`);
//         createdUsers.push(existingUser);
//         continue;
//       }

//       const user = await prisma.profile.create({
//         data: userData,
//       });

//       console.log(`✅ Created ${userData.role}: ${user.email}`);
//       createdUsers.push(user);

//     } catch (error) {
//       console.error(`❌ Error creating user ${userData.email}:`, error);
//     }
//   }

//   return createdUsers;
// }

// async function displayUserSummary() {
//   console.log('\n📊 User Summary:');

//   const userCounts = await Promise.all([
//     prisma.profile.count({ where: { role: user_role.admin } }),
//     prisma.profile.count({ where: { role: user_role.vendor } }),
//     prisma.profile.count({ where: { role: user_role.retailer } }),
//     prisma.profile.count({ where: { role: user_role.manufacturer } }),
//     prisma.profile.count({ where: { role: user_role.client } }),
//   ]);

//   const totalUsers = userCounts.reduce((sum, count) => sum + count, 0);

//   console.log(`   Admin users: ${userCounts[0]}`);
//   console.log(`   Vendor users: ${userCounts[1]}`);
//   console.log(`   Retailer users: ${userCounts[2]}`);
//   console.log(`   Manufacturer users: ${userCounts[3]}`);
//   console.log(`   Client users: ${userCounts[4]}`);
//   console.log(`   Total users: ${totalUsers}`);

//   // Show onboarding status summary
//   const onboardingStatusCounts = await prisma.profile.groupBy({
//     by: ['onboardingStatus'],
//     _count: {
//       onboardingStatus: true,
//     },
//   });

//   console.log('\n📋 Onboarding Status Summary:');
//   onboardingStatusCounts.forEach((status) => {
//     console.log(`   ${status.onboardingStatus || 'null'}: ${status._count.onboardingStatus}`);
//   });
// }

// // Main execution
// async function main() {
//   console.log('🌱 Starting admin and test users seed...');

//   try {
//     // Create admin user
//     await createAdminUser();

//     // Create test users
//     await createTestUsers();

//     // Display summary
//     await displayUserSummary();

//     console.log('\n🎉 Seed completed successfully!');

//   } catch (error) {
//     console.error('❌ Seed failed:', error);
//     throw error;
//   }
// }

// main()
//   .catch((e) => {
//     console.error('❌ Seed failed:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//     console.log('🔌 Database connection closed');
//   });
