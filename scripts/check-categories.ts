#!/usr/bin/env ts-node

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkCategories() {
  console.log('🔍 Checking product categories...');

  try {
    // Get all categories
    const categories = await prisma.productCategory.findMany({
      select: {
        id: true,
        name: true,
        level: true,
        isActive: true,
        position: true,
      },
      orderBy: {
        position: 'asc',
      },
    });

    console.log(`📊 Found ${categories.length} categories:`);
    
    categories.forEach((category, index) => {
      console.log(`${index + 1}. ${category.name} - Level: ${category.level}, Active: ${category.isActive}, Position: ${category.position}`);
    });

    // Check for categories with undefined level
    const undefinedLevelCategories = categories.filter(cat => cat.level === null || cat.level === undefined);
    
    if (undefinedLevelCategories.length > 0) {
      console.log(`\n⚠️  Found ${undefinedLevelCategories.length} categories with undefined level:`);
      undefinedLevelCategories.forEach(cat => {
        console.log(`   - ${cat.name} (ID: ${cat.id})`);
      });
      
      console.log('\n💡 These categories need to be updated or re-seeded.');
    } else {
      console.log('\n✅ All categories have proper level values.');
    }

    // Check for main categories (level 1)
    const mainCategories = categories.filter(cat => cat.level === 1 && cat.isActive);
    console.log(`\n📁 Active main categories (level 1): ${mainCategories.length}`);
    mainCategories.forEach(cat => {
      console.log(`   - ${cat.name}`);
    });

  } catch (error) {
    console.error('❌ Error checking categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the check
checkCategories()
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });
