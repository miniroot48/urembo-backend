#!/usr/bin/env ts-node

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to get service category-specific image URLs
function getServiceCategoryImageUrl(categoryName: string): string {
  const imageMap: { [key: string]: string } = {
    'Hair Services': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'Beauty Services': 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'Nail Services': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'Body Treatments': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkhZ5PKFrpNdSYOED19CyH9J_YBu3WdA8McQ&s',
    'Men\'s Grooming': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'Wellness & Spa': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  };
  
  return imageMap[categoryName] || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
}

const serviceCategories = [
  // Level 1 - Main Service Categories
  {
    name: 'Hair Services',
    description: 'Professional hair care and styling services',
    level: 1,
    position: 1,
    isActive: true,
    subcategories: [
      {
        name: 'Hair Styling',
        description: 'Hair cutting, styling, and design services',
        position: 1,
        actualServices: [
          { name: 'Hair Cut & Style', description: 'Professional haircut and styling', position: 1 },
          { name: 'Hair Coloring', description: 'Hair coloring and highlights', position: 2 },
          { name: 'Hair Perming', description: 'Hair perming and straightening', position: 3 },
          { name: 'Hair Extensions', description: 'Hair extension installation and maintenance', position: 4 },
          { name: 'Hair Updos', description: 'Special occasion hair styling', position: 5 }
        ]
      },
      {
        name: 'Hair Treatments',
        description: 'Therapeutic and restorative hair treatments',
        position: 2,
        actualServices: [
          { name: 'Hair Spa Treatment', description: 'Deep conditioning hair spa', position: 1 },
          { name: 'Hair Repair Treatment', description: 'Damaged hair repair services', position: 2 },
          { name: 'Scalp Treatment', description: 'Scalp care and treatment', position: 3 },
          { name: 'Hair Growth Treatment', description: 'Hair growth stimulation therapy', position: 4 }
        ]
      },
      {
        name: 'Braiding & Weaving',
        description: 'Traditional and modern braiding services',
        position: 3,
        actualServices: [
          { name: 'Box Braids', description: 'Classic box braiding', position: 1 },
          { name: 'Cornrows', description: 'Traditional cornrow braiding', position: 2 },
          { name: 'Ghana Braids', description: 'Ghana weaving styles', position: 3 },
          { name: 'Fulani Braids', description: 'Fulani braiding patterns', position: 4 },
          { name: 'Knotless Braids', description: 'Modern knotless braiding', position: 5 },
          { name: 'Hair Weaving', description: 'Hair weaving and installation', position: 6 }
        ]
      }
    ]
  },
  {
    name: 'Beauty Services',
    description: 'Comprehensive beauty and skincare services',
    level: 1,
    position: 2,
    isActive: true,
    subcategories: [
      {
        name: 'Facial Treatments',
        description: 'Professional facial care services',
        position: 1,
        actualServices: [
          { name: 'Basic Facial', description: 'Cleansing and moisturizing facial', position: 1 },
          { name: 'Deep Cleansing Facial', description: 'Intensive pore cleansing treatment', position: 2 },
          { name: 'Anti-Aging Facial', description: 'Anti-aging and rejuvenation treatment', position: 3 },
          { name: 'Acne Treatment Facial', description: 'Specialized acne treatment', position: 4 },
          { name: 'Hydrating Facial', description: 'Intensive hydration treatment', position: 5 }
        ]
      },
      {
        name: 'Makeup Services',
        description: 'Professional makeup application',
        position: 2,
        actualServices: [
          { name: 'Bridal Makeup', description: 'Wedding day makeup application', position: 1 },
          { name: 'Event Makeup', description: 'Special event makeup', position: 2 },
          { name: 'Photo Shoot Makeup', description: 'Professional photography makeup', position: 3 },
          { name: 'Everyday Makeup', description: 'Natural everyday makeup', position: 4 },
          { name: 'Makeup Lessons', description: 'Personal makeup tutorials', position: 5 }
        ]
      },
      {
        name: 'Eyebrow & Eyelash Services',
        description: 'Eyebrow and eyelash enhancement services',
        position: 3,
        actualServices: [
          { name: 'Eyebrow Shaping', description: 'Professional eyebrow shaping', position: 1 },
          { name: 'Eyebrow Tinting', description: 'Eyebrow color enhancement', position: 2 },
          { name: 'Eyelash Extensions', description: 'Semi-permanent eyelash extensions', position: 3 },
          { name: 'Eyelash Tinting', description: 'Eyelash color enhancement', position: 4 },
          { name: 'Lash Lift', description: 'Eyelash curling treatment', position: 5 }
        ]
      }
    ]
  },
  {
    name: 'Nail Services',
    description: 'Professional nail care and art services',
    level: 1,
    position: 3,
    isActive: true,
    subcategories: [
      {
        name: 'Manicure Services',
        description: 'Hand and nail care services',
        position: 1,
        actualServices: [
          { name: 'Classic Manicure', description: 'Basic nail care and polish', position: 1 },
          { name: 'Gel Manicure', description: 'Long-lasting gel polish application', position: 2 },
          { name: 'French Manicure', description: 'Classic French nail style', position: 3 },
          { name: 'Nail Art', description: 'Creative nail designs and art', position: 4 },
          { name: 'Paraffin Manicure', description: 'Moisturizing paraffin treatment', position: 5 }
        ]
      },
      {
        name: 'Pedicure Services',
        description: 'Foot and toenail care services',
        position: 2,
        actualServices: [
          { name: 'Classic Pedicure', description: 'Basic foot and nail care', position: 1 },
          { name: 'Gel Pedicure', description: 'Long-lasting gel polish for feet', position: 2 },
          { name: 'Spa Pedicure', description: 'Luxury foot spa treatment', position: 3 },
          { name: 'Medical Pedicure', description: 'Therapeutic foot care', position: 4 }
        ]
      },
      {
        name: 'Nail Extensions',
        description: 'Artificial nail enhancement services',
        position: 3,
        actualServices: [
          { name: 'Acrylic Nails', description: 'Acrylic nail extensions', position: 1 },
          { name: 'Gel Extensions', description: 'Gel nail extensions', position: 2 },
          { name: 'Dip Powder Nails', description: 'Dip powder nail enhancement', position: 3 },
          { name: 'Press-on Nails', description: 'Temporary nail extensions', position: 4 }
        ]
      }
    ]
  },
  {
    name: 'Body Treatments',
    description: 'Body care and wellness services',
    level: 1,
    position: 4,
    isActive: true,
    subcategories: [
      {
        name: 'Massage Therapy',
        description: 'Therapeutic massage services',
        position: 1,
        actualServices: [
          { name: 'Swedish Massage', description: 'Classic relaxation massage', position: 1 },
          { name: 'Deep Tissue Massage', description: 'Intensive muscle therapy', position: 2 },
          { name: 'Hot Stone Massage', description: 'Heated stone therapy', position: 3 },
          { name: 'Aromatherapy Massage', description: 'Essential oil massage therapy', position: 4 },
          { name: 'Prenatal Massage', description: 'Pregnancy-safe massage', position: 5 }
        ]
      },
      {
        name: 'Body Scrubs & Wraps',
        description: 'Exfoliating and detoxifying treatments',
        position: 2,
        actualServices: [
          { name: 'Body Scrub', description: 'Exfoliating body treatment', position: 1 },
          { name: 'Body Wrap', description: 'Detoxifying body wrap', position: 2 },
          { name: 'Cellulite Treatment', description: 'Anti-cellulite therapy', position: 3 },
          { name: 'Stretch Mark Treatment', description: 'Stretch mark reduction therapy', position: 4 }
        ]
      },
      {
        name: 'Waxing Services',
        description: 'Hair removal services',
        position: 3,
        actualServices: [
          { name: 'Facial Waxing', description: 'Facial hair removal', position: 1 },
          { name: 'Body Waxing', description: 'Body hair removal', position: 2 },
          { name: 'Bikini Waxing', description: 'Intimate area hair removal', position: 3 },
          { name: 'Brazilian Waxing', description: 'Complete intimate hair removal', position: 4 }
        ]
      }
    ]
  },
  {
    name: 'Men\'s Grooming',
    description: 'Specialized grooming services for men',
    level: 1,
    position: 5,
    isActive: true,
    subcategories: [
      {
        name: 'Hair Services',
        description: 'Men\'s hair care and styling',
        position: 1,
        actualServices: [
          { name: 'Men\'s Haircut', description: 'Professional men\'s haircut', position: 1 },
          { name: 'Beard Trimming', description: 'Beard shaping and trimming', position: 2 },
          { name: 'Hair Styling', description: 'Men\'s hair styling and grooming', position: 3 },
          { name: 'Hair Coloring', description: 'Men\'s hair coloring services', position: 4 }
        ]
      },
      {
        name: 'Facial Services',
        description: 'Men\'s facial care treatments',
        position: 2,
        actualServices: [
          { name: 'Men\'s Facial', description: 'Deep cleansing facial for men', position: 1 },
          { name: 'Beard Treatment', description: 'Beard conditioning and care', position: 2 },
          { name: 'Eyebrow Shaping', description: 'Men\'s eyebrow grooming', position: 3 }
        ]
      },
      {
        name: 'Body Services',
        description: 'Men\'s body care treatments',
        position: 3,
        actualServices: [
          { name: 'Men\'s Massage', description: 'Therapeutic massage for men', position: 1 },
          { name: 'Body Waxing', description: 'Men\'s body hair removal', position: 2 },
          { name: 'Manicure', description: 'Men\'s nail care service', position: 3 }
        ]
      }
    ]
  },
  {
    name: 'Wellness & Spa',
    description: 'Holistic wellness and relaxation services',
    level: 1,
    position: 6,
    isActive: true,
    subcategories: [
      {
        name: 'Aromatherapy',
        description: 'Essential oil therapy services',
        position: 1,
        actualServices: [
          { name: 'Aromatherapy Session', description: 'Essential oil therapy', position: 1 },
          { name: 'Custom Blend Creation', description: 'Personalized essential oil blends', position: 2 },
          { name: 'Aromatherapy Consultation', description: 'Wellness consultation', position: 3 }
        ]
      },
      {
        name: 'Meditation & Mindfulness',
        description: 'Mental wellness and relaxation',
        position: 2,
        actualServices: [
          { name: 'Guided Meditation', description: 'Professional meditation sessions', position: 1 },
          { name: 'Breathing Exercises', description: 'Breathing technique training', position: 2 },
          { name: 'Stress Management', description: 'Stress reduction techniques', position: 3 }
        ]
      },
      {
        name: 'Energy Healing',
        description: 'Alternative healing therapies',
        position: 3,
        actualServices: [
          { name: 'Reiki Session', description: 'Energy healing therapy', position: 1 },
          { name: 'Crystal Therapy', description: 'Crystal healing treatment', position: 2 },
          { name: 'Chakra Balancing', description: 'Chakra alignment therapy', position: 3 }
        ]
      }
    ]
  }
];

async function seedServiceCategories() {
  console.log('🌱 Starting to seed service categories...');

  try {
    // Check if service categories already exist
    const existingCategories = await prisma.serviceCategory.count({
      where: { level: 1 }
    });

    if (existingCategories > 0) {
      console.log(`⚠️  Found ${existingCategories} existing main service categories. Skipping seed to avoid duplicates.`);
      console.log('💡 To re-seed, first clear existing categories or modify this script.');
      return;
    }

    for (const category of serviceCategories) {
      console.log(`📁 Creating service category: ${category.name}`);
      
      // Generate slug from name
      const slug = category.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      // Create main category
      const createdCategory = await prisma.serviceCategory.create({
        data: {
          name: category.name,
          description: category.description,
          slug: slug,
          level: category.level,
          position: category.position,
          isActive: category.isActive,
          imageUrl: getServiceCategoryImageUrl(category.name),
        },
      });

      console.log(`✅ Created service category: ${createdCategory.name} (ID: ${createdCategory.id})`);

      // Create subcategories
      for (const subcategory of category.subcategories) {
        console.log(`  📂 Creating subcategory: ${subcategory.name}`);
        
        // Generate slug for subcategory
        let subSlug = subcategory.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        
        // Add category prefix to avoid conflicts
        subSlug = `${slug}-${subSlug}`;

        const createdSubcategory = await prisma.serviceCategory.create({
          data: {
            name: subcategory.name,
            description: subcategory.description,
            slug: subSlug,
            level: 2,
            parentId: createdCategory.id,
            position: subcategory.position,
            isActive: true,
            imageUrl: getServiceCategoryImageUrl(category.name), // Use parent category image
          },
        });

        console.log(`  ✅ Created subcategory: ${createdSubcategory.name} (ID: ${createdSubcategory.id})`);

        // Create actual services (Level 3)
        for (const actualService of subcategory.actualServices) {
          console.log(`    🔧 Creating actual service: ${actualService.name}`);
          
          // Generate slug for actual service
          let serviceSlug = actualService.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
          
          // Add subcategory prefix to avoid conflicts
          serviceSlug = `${subSlug}-${serviceSlug}`;

          const createdActualService = await prisma.serviceCategory.create({
            data: {
              name: actualService.name,
              description: actualService.description,
              slug: serviceSlug,
              level: 3,
              parentId: createdSubcategory.id,
              position: actualService.position,
              isActive: true,
              imageUrl: getServiceCategoryImageUrl(category.name), // Use parent category image
            },
          });

          console.log(`    ✅ Created actual service: ${createdActualService.name} (ID: ${createdActualService.id})`);
        }
      }
    }

    console.log('🎉 Successfully seeded all service categories!');
    
    // Display summary
    const totalCategories = await prisma.serviceCategory.count({
      where: { level: 1 }
    });
    const totalSubcategories = await prisma.serviceCategory.count({
      where: { level: 2 }
    });
    const totalActualServices = await prisma.serviceCategory.count({
      where: { level: 3 }
    });
    
    console.log(`📊 Summary:`);
    console.log(`   - Main Categories: ${totalCategories}`);
    console.log(`   - Subcategories: ${totalSubcategories}`);
    console.log(`   - Actual Services: ${totalActualServices}`);
    console.log(`   - Total Categories: ${totalCategories + totalSubcategories + totalActualServices}`);

  } catch (error) {
    console.error('❌ Error seeding service categories:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedServiceCategories()
  .catch((error) => {
    console.error('💥 Service categories seed script failed:', error);
    process.exit(1);
  });
