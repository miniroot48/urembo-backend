import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const beautyCategories = [
  // Level 1 - Main Categories
  {
    name: 'Hair Care',
    description: 'Complete hair care products for all hair types',
    level: 1,
    position: 1,
    isActive: true,
    subcategories: [
      { name: 'Shampoos', description: 'Hair cleansing products', position: 1 },
      { name: 'Conditioners', description: 'Hair conditioning treatments', position: 2 },
      { name: 'Hair Oils', description: 'Nourishing hair oils and serums', position: 3 },
      { name: 'Hair Masks', description: 'Deep conditioning hair masks', position: 4 },
      { name: 'Hair Styling', description: 'Hair styling products and tools', position: 5 },
      { name: 'Hair Treatments', description: 'Specialized hair treatments', position: 6 }
    ]
  },
  {
    name: 'Skincare',
    description: 'Complete skincare routine products',
    level: 1,
    position: 2,
    isActive: true,
    subcategories: [
      { name: 'Cleansers', description: 'Face and body cleansers', position: 1 },
      { name: 'Moisturizers', description: 'Hydrating creams and lotions', position: 2 },
      { name: 'Serums', description: 'Concentrated skincare treatments', position: 3 },
      { name: 'Sunscreen', description: 'UV protection products', position: 4 },
      { name: 'Toners', description: 'Skin toning and balancing products', position: 5 },
      { name: 'Exfoliants', description: 'Skin exfoliating products', position: 6 },
      { name: 'Face Masks', description: 'Treatment face masks', position: 7 }
    ]
  },
  {
    name: 'Makeup',
    description: 'Cosmetic products for enhancing beauty',
    level: 1,
    position: 3,
    isActive: true,
    subcategories: [
      { name: 'Foundation', description: 'Base makeup products', position: 1 },
      { name: 'Lip Products', description: 'Lipsticks, glosses, and balms', position: 2 },
      { name: 'Eye Makeup', description: 'Eyeshadows, eyeliners, and mascaras', position: 3 },
      { name: 'Blush & Bronzer', description: 'Cheek and contouring products', position: 4 },
      { name: 'Concealer', description: 'Coverage and correction products', position: 5 },
      { name: 'Makeup Tools', description: 'Brushes, sponges, and applicators', position: 6 }
    ]
  },
  {
    name: 'Body Care',
    description: 'Products for body care and hygiene',
    level: 1,
    position: 4,
    isActive: true,
    subcategories: [
      { name: 'Body Wash', description: 'Body cleansing products', position: 1 },
      { name: 'Body Lotion', description: 'Body moisturizing products', position: 2 },
      { name: 'Body Scrubs', description: 'Exfoliating body treatments', position: 3 },
      { name: 'Deodorants', description: 'Odor protection products', position: 4 },
      { name: 'Hand Care', description: 'Hand creams and treatments', position: 5 },
      { name: 'Foot Care', description: 'Foot care and treatment products', position: 6 }
    ]
  },
  {
    name: 'Fragrance',
    description: 'Perfumes and scented products',
    level: 1,
    position: 5,
    isActive: true,
    subcategories: [
      { name: 'Perfumes', description: 'Women\'s and men\'s fragrances', position: 1 },
      { name: 'Body Sprays', description: 'Light body fragrances', position: 2 },
      { name: 'Candles', description: 'Scented candles and home fragrances', position: 3 },
      { name: 'Essential Oils', description: 'Pure essential oils', position: 4 }
    ]
  },
  {
    name: 'Nail Care',
    description: 'Nail care and nail art products',
    level: 1,
    position: 6,
    isActive: true,
    subcategories: [
      { name: 'Nail Polish', description: 'Nail color products', position: 1 },
      { name: 'Nail Treatments', description: 'Nail strengthening and care products', position: 2 },
      { name: 'Nail Art', description: 'Nail art supplies and tools', position: 3 },
      { name: 'Manicure Tools', description: 'Nail care tools and accessories', position: 4 }
    ]
  },
  {
    name: 'Men\'s Grooming',
    description: 'Specialized products for men\'s grooming needs',
    level: 1,
    position: 7,
    isActive: true,
    subcategories: [
      { name: 'Shaving', description: 'Shaving creams, gels, and aftershaves', position: 1 },
      { name: 'Beard Care', description: 'Beard oils, balms, and grooming products', position: 2 },
      { name: 'Men\'s Skincare', description: 'Skincare products for men', position: 3 },
      { name: 'Men\'s Hair Care', description: 'Hair care products for men', position: 4 }
    ]
  },
  {
    name: 'Tools & Accessories',
    description: 'Beauty tools and accessories',
    level: 1,
    position: 8,
    isActive: true,
    subcategories: [
      { name: 'Hair Tools', description: 'Hair styling tools and accessories', position: 1 },
      { name: 'Makeup Brushes', description: 'Makeup application brushes', position: 2 },
      { name: 'Skincare Tools', description: 'Skincare application tools', position: 3 },
      { name: 'Storage & Organization', description: 'Beauty product storage solutions', position: 4 }
    ]
  }
];

async function seedBeautyCategories() {
  console.log('🌱 Starting to seed beauty product categories...');

  try {
    // Clear existing categories (optional - remove if you want to keep existing data)
    // await prisma.productCategory.deleteMany({});

    for (const category of beautyCategories) {
      console.log(`📁 Creating category: ${category.name}`);
      
      // Generate slug from name
      const slug = category.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      // Create main category
      const createdCategory = await prisma.productCategory.create({
        data: {
          name: category.name,
          description: category.description,
          slug: slug,
          level: category.level,
          position: category.position,
          isActive: category.isActive,
        },
      });

      console.log(`✅ Created category: ${createdCategory.name} (ID: ${createdCategory.id})`);

      // Create subcategories
      for (const subcategory of category.subcategories) {
        console.log(`  📂 Creating subcategory: ${subcategory.name}`);
        
        // Generate slug for subcategory
        const subSlug = subcategory.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        
        const createdSubcategory = await prisma.productCategory.create({
        data: {
          name: subcategory.name,
          description: subcategory.description,
          slug: subSlug,
          level: 2,
          parentId: createdCategory.id,
          position: subcategory.position,
          isActive: true,
        },
        });

        console.log(`  ✅ Created subcategory: ${createdSubcategory.name} (ID: ${createdSubcategory.id})`);
      }
    }

    console.log('🎉 Successfully seeded all beauty product categories!');
    
    // Display summary
    const totalCategories = await prisma.productCategory.count({
      where: { level: 1 }
    });
    const totalSubcategories = await prisma.productCategory.count({
      where: { level: 2 }
    });
    
    console.log(`📊 Summary:`);
    console.log(`   - Main Categories: ${totalCategories}`);
    console.log(`   - Subcategories: ${totalSubcategories}`);
    console.log(`   - Total Categories: ${totalCategories + totalSubcategories}`);

  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedBeautyCategories()
  .catch((error) => {
    console.error('💥 Seed script failed:', error);
    process.exit(1);
  });
