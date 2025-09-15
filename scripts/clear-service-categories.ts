#!/usr/bin/env ts-node

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearServiceCategories() {
  console.log('🗑️  Clearing existing service categories...');

  try {
    // Delete all service categories
    const deletedCount = await prisma.serviceCategory.deleteMany({});
    
    console.log(`✅ Deleted ${deletedCount.count} service categories`);
    console.log('🎉 Service categories cleared successfully!');

  } catch (error) {
    console.error('❌ Error clearing service categories:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the clear function
clearServiceCategories()
  .catch((error) => {
    console.error('💥 Clear script failed:', error);
    process.exit(1);
  });
