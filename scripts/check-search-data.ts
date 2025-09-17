#!/usr/bin/env ts-node

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkSearchData() {
  console.log('🔍 Checking products and services for search...');

  try {
    // Get all products
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        isActive: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    // Get all services
    const services = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        isActive: true,
        serviceCategory: {
          select: {
            name: true,
          },
        },
      },
    });

    console.log(`📦 Found ${products.length} products:`);
    products.forEach(product => {
      console.log(`  - ${product.name} (${product.category?.name || 'No category'}) - $${product.price} - Active: ${product.isActive}`);
    });

    console.log(`\n🔧 Found ${services.length} services:`);
    services.forEach(service => {
      console.log(`  - ${service.name} (${service.serviceCategory?.name || 'No category'}) - $${service.price} - Active: ${service.isActive}`);
    });

    // Check for "hair" related items
    console.log('\n🔍 Searching for "hair" related items:');
    const hairProducts = products.filter(p => 
      p.name.toLowerCase().includes('hair') || 
      p.description?.toLowerCase().includes('hair')
    );
    const hairServices = services.filter(s => 
      s.name.toLowerCase().includes('hair') || 
      s.description?.toLowerCase().includes('hair')
    );

    console.log(`📦 Hair products: ${hairProducts.length}`);
    hairProducts.forEach(product => {
      console.log(`  - ${product.name}`);
    });

    console.log(`🔧 Hair services: ${hairServices.length}`);
    hairServices.forEach(service => {
      console.log(`  - ${service.name}`);
    });

  } catch (error) {
    console.error('❌ Error checking search data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSearchData()
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });

