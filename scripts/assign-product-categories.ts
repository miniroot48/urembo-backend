#!/usr/bin/env ts-node

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function assignProductCategories() {
  console.log('🔍 Checking products and categories...');

  try {
    // Get all products
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        categoryId: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Get all main categories (level 1)
    const categories = await prisma.productCategory.findMany({
      where: {
        level: 1,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    console.log(`📊 Found ${products.length} products and ${categories.length} categories`);

    // Show current state
    console.log('\n📋 Current product categories:');
    products.forEach(product => {
      console.log(`- ${product.name}: ${product.category?.name || 'No category'} (ID: ${product.categoryId || 'null'})`);
    });

    console.log('\n📁 Available categories:');
    categories.forEach(category => {
      console.log(`- ${category.name} (ID: ${category.id})`);
    });

    // Assign categories based on product names
    const categoryAssignments = {
      'Hair Treatment Mask': 'hair-care',
      'Foundation Makeup': 'makeup',
      'Gel Nail Polish Kit': 'nail-care',
      'Vitamin C Brightening Serum': 'skincare',
      'Hair Straightener': 'hair-care',
      'Anti-Aging Serum': 'skincare',
      'Hair Shampoo & Conditioner': 'hair-care',
      'Makeup Brush Set': 'makeup',
      'Nail Polish Set': 'nail-care',
      'Moisturizing Face Cream': 'skincare',
      'Professional Hair Dryer': 'hair-care',
    };

    console.log('\n🔄 Assigning categories to products...');
    
    for (const [productName, categorySlug] of Object.entries(categoryAssignments)) {
      const product = products.find(p => p.name === productName);
      const category = categories.find(c => c.slug === categorySlug);
      
      if (product && category) {
        await prisma.product.update({
          where: { id: product.id },
          data: { categoryId: category.id },
        });
        console.log(`✅ Assigned "${productName}" to "${category.name}"`);
      } else {
        console.log(`❌ Could not assign "${productName}" - product or category not found`);
      }
    }

    console.log('\n🎉 Product category assignment completed!');

  } catch (error) {
    console.error('❌ Error assigning product categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the assignment
assignProductCategories()
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });
