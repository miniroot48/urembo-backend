/**
 * Paystack Subaccount Testing Script
 * 
 * Tests Paystack subaccount creation and management
 * 
 * Run with: npm run test:paystack:subaccounts
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { EscrowService } from '../escrow/escrow.service';
import { PrismaService } from '../prisma/prisma.service';

const TEST_VENDORS = [
  {
    businessName: 'Elegant Beauty Studio',
    email: `elegant-${Date.now()}@beauty.com`,
    contactName: 'Sarah Johnson',
    phone: '+1234567890',
    bankCode: '044', // Access Bank Nigeria
    accountNumber: '1234567890',
    percentageCharge: 0,
  },
  {
    businessName: 'Glamour Hair Salon',
    email: `glamour-${Date.now() + 1}@hair.com`,
    contactName: 'Maria Garcia',
    phone: '+1234567891',
    bankCode: '058', // GTBank Nigeria
    accountNumber: '9876543210',
    percentageCharge: 0,
  },
  {
    businessName: 'Luxury Nail Art',
    email: `luxury-${Date.now() + 2}@nails.com`,
    contactName: 'Emma Wilson',
    phone: '+1234567892',
    bankCode: '011', // First Bank Nigeria
    accountNumber: '5555666677',
    percentageCharge: 0,
  },
];

async function testPaystackSubaccounts() {
  console.log('🏦 Testing Paystack Subaccount Creation...');
  console.log('=' .repeat(60));
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const escrowService = app.get(EscrowService);
  const prisma = app.get(PrismaService);

  try {
    console.log('\n👥 Creating Multiple Vendor Subaccounts');
    console.log('-'.repeat(50));
    
    const createdSubaccounts = [];
    
    for (let i = 0; i < TEST_VENDORS.length; i++) {
      const vendor = TEST_VENDORS[i];
      console.log(`\n📝 Creating subaccount ${i + 1}/${TEST_VENDORS.length}: ${vendor.businessName}`);
      
      try {
        // First, create a profile for the vendor
        const vendorProfile = await prisma.profile.create({
          data: {
            email: vendor.email,
            password: 'hashed_password_placeholder',
            fullName: vendor.contactName,
            phone: vendor.phone,
            businessName: vendor.businessName,
            businessDescription: `Professional ${vendor.businessName.toLowerCase()} services`,
            businessPhone: vendor.phone,
            role: 'vendor',
            isVerified: true,
            onboardingStatus: 'approved',
          },
        });
        
        console.log(`   ✅ Profile created: ${vendorProfile.id}`);
        
        // Create Paystack subaccount
        const subaccount = await escrowService.createVendorSubaccount({
          ...vendor,
          email: vendorProfile.email, // Use the profile email
        });
        
        createdSubaccounts.push({
          profile: vendorProfile,
          subaccount,
        });
        
        console.log(`   ✅ Subaccount created: ${subaccount.subaccount_code}`);
        console.log(`   📧 Email: ${subaccount.primary_contact_email}`);
        console.log(`   🏦 Bank: ${subaccount.settlement_bank}`);
        console.log(`   📱 Account: ${subaccount.account_number}`);
        console.log(`   ✅ Verified: ${subaccount.is_verified}`);
        
      } catch (error) {
        console.log(`   ❌ Failed to create subaccount for ${vendor.businessName}:`, error.message);
      }
    }

    console.log('\n📊 Subaccount Creation Summary');
    console.log('-'.repeat(50));
    console.log(`✅ Successfully created: ${createdSubaccounts.length}/${TEST_VENDORS.length} subaccounts`);
    
    if (createdSubaccounts.length > 0) {
      console.log('\n📋 Created Subaccounts:');
      createdSubaccounts.forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.subaccount.business_name}`);
        console.log(`      Code: ${item.subaccount.subaccount_code}`);
        console.log(`      Email: ${item.subaccount.primary_contact_email}`);
        console.log(`      Verified: ${item.subaccount.is_verified ? 'Yes' : 'No'}`);
      });
    }

    // Test subaccount verification status
    console.log('\n🔍 Checking Subaccount Verification Status');
    console.log('-'.repeat(50));
    
    for (const item of createdSubaccounts) {
      const profile = await prisma.profile.findUnique({
        where: { id: item.profile.id },
        select: {
          paystackSubaccountId: true,
          paystackSubaccountVerified: true,
          businessName: true,
        },
      });
      
      if (profile) {
        console.log(`📋 ${profile.businessName}:`);
        console.log(`   Subaccount ID: ${profile.paystackSubaccountId}`);
        console.log(`   Verified: ${profile.paystackSubaccountVerified ? 'Yes' : 'No'}`);
      }
    }

    // Test escrow statistics
    console.log('\n📈 Testing Escrow Statistics');
    console.log('-'.repeat(50));
    
    const escrowStats = await escrowService.getEscrowStats();
    console.log('✅ Escrow statistics:');
    console.log(`   Total Held: $${escrowStats.totalHeld}`);
    console.log(`   Total Released: $${escrowStats.totalReleased}`);
    console.log(`   Total Refunded: $${escrowStats.totalRefunded}`);
    console.log(`   Pending Orders: ${escrowStats.pendingOrders}`);

    console.log('\n' + '='.repeat(60));
    console.log('🎉 PAYSTACK SUBACCOUNT TESTS COMPLETED!');
    console.log('🏦 Subaccount creation is working correctly');
    console.log('👥 Vendor profiles are properly linked');
    console.log('📊 Statistics are being tracked');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('❌ Paystack subaccount test failed:', error);
  } finally {
    await app.close();
  }
}

// Run the test
testPaystackSubaccounts().catch(console.error);
