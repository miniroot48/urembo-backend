#!/usr/bin/env ts-node

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function assignServiceCategories() {
  console.log('🔍 Checking services and categories...');

  try {
    // Get all services
    const services = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        categoryId: true,
        category: true,
        description: true,
      },
    });

    // Get all main service categories (level 1)
    const categories = await prisma.serviceCategory.findMany({
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

    console.log(`📊 Found ${services.length} services and ${categories.length} service categories`);

    // Show current state
    console.log('\n📋 Current service categories:');
    services.forEach(service => {
      console.log(`- ${service.name}: ${service.category || 'No category'} (ID: ${service.categoryId || 'null'})`);
    });

    console.log('\n📁 Available service categories:');
    categories.forEach(category => {
      console.log(`- ${category.name} (ID: ${category.id})`);
    });

    // Assign categories based on service names/descriptions
    const categoryAssignments = {
      'Deep Cleansing Facial': 'beauty-services',
      'Bridal Makeup Application': 'beauty-services',
      'Hair Treatment & Conditioning': 'hair-services',
      'Anti-Aging Facial': 'beauty-services',
    };

    console.log('\n🔄 Assigning categories to services...');
    
    for (const [serviceName, categorySlug] of Object.entries(categoryAssignments)) {
      const service = services.find(s => s.name === serviceName);
      const category = categories.find(c => c.slug === categorySlug);
      
      if (service && category) {
        await prisma.service.update({
          where: { id: service.id },
          data: { categoryId: category.id },
        });
        console.log(`✅ Assigned "${serviceName}" to "${category.name}"`);
      } else if (service) {
        console.log(`❌ Could not assign "${serviceName}" - category "${categorySlug}" not found`);
      }
    }

    // For services that don't match our predefined list, assign to a default category
    const defaultCategory = categories.find(c => c.slug === 'beauty-services') || categories[0];
    if (defaultCategory) {
      const unassignedServices = services.filter(s => !s.categoryId);
      for (const service of unassignedServices) {
        await prisma.service.update({
          where: { id: service.id },
          data: { categoryId: defaultCategory.id },
        });
        console.log(`✅ Assigned "${service.name}" to default category "${defaultCategory.name}"`);
      }
    }

    console.log('\n🎉 Service category assignment completed!');

  } catch (error) {
    console.error('❌ Error assigning service categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the assignment
assignServiceCategories()
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });
