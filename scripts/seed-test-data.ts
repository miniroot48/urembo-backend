import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedTestData() {
  console.log('🌱 Starting test data seeding...');

  try {
    // First, let's get the existing categories
    const productCategories = await prisma.productCategory.findMany({
      include: {
        children: true
      }
    });

    const serviceCategories = await prisma.serviceCategory.findMany({
      include: {
        children: {
          include: {
            services: true
          }
        }
      }
    });

    console.log('📦 Found product categories:', productCategories.length);
    console.log('🎨 Found service categories:', serviceCategories.length);

    // Get test users
    const testVendor = await prisma.profile.findFirst({
      where: { email: 'vendor@test.com' }
    });

    const testRetailer = await prisma.profile.findFirst({
      where: { email: 'retailer@test.com' }
    });

    const testManufacturer = await prisma.profile.findFirst({
      where: { email: 'manufacturer@test.com' }
    });

    if (!testVendor || !testRetailer || !testManufacturer) {
      throw new Error('Test users not found. Please run the main seed script first.');
    }

    console.log('👤 Found test users:', {
      vendor: testVendor.email,
      retailer: testRetailer.email,
      manufacturer: testManufacturer.email
    });

    // Seed 12 services for Test Vendor
    console.log('🎨 Seeding services for Test Vendor...');
    const services = [
      {
        name: 'Hair Cut & Style',
        description: 'Professional haircut and styling service with consultation',
        price: 2500,
        durationMinutes: 60,
        categoryId: serviceCategories.find(c => c.name === 'Hair Services')?.children.find(s => s.name === 'Hair Cutting')?.id,
        vendorId: testVendor.id,
        isActive: true,
        imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['haircut', 'styling', 'consultation']
      },
      {
        name: 'Deep Cleansing Facial',
        description: 'Deep cleansing facial treatment for all skin types with extraction',
        price: 3500,
        durationMinutes: 90,
        categoryId: serviceCategories.find(c => c.name === 'Beauty Services')?.children.find(s => s.name === 'Facial Treatments')?.id,
        vendorId: testVendor.id,
        isActive: true,
        imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['facial', 'skincare', 'treatment']
      },
      {
        name: 'Luxury Manicure & Pedicure',
        description: 'Complete nail care service with polish and nail art options',
        price: 1800,
        durationMinutes: 45,
        categoryId: serviceCategories.find(c => c.name === 'Nail Services')?.children.find(s => s.name === 'Manicure & Pedicure')?.id,
        vendorId: testVendor.id,
        isActive: true,
        imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['manicure', 'pedicure', 'nails']
      },
      {
        name: 'Eyebrow Shaping & Tinting',
        description: 'Professional eyebrow shaping, tinting and styling',
        price: 1200,
        durationMinutes: 30,
        categoryId: serviceCategories.find(c => c.name === 'Beauty Services')?.children.find(s => s.name === 'Eyebrow Services')?.id,
        vendorId: testVendor.id,
        isActive: true,
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['eyebrows', 'shaping', 'tinting']
      },
      {
        name: 'Professional Hair Coloring',
        description: 'Professional hair coloring service with consultation and aftercare',
        price: 4500,
        durationMinutes: 120,
        categoryId: serviceCategories.find(c => c.name === 'Hair Services')?.children.find(s => s.name === 'Hair Coloring')?.id,
        vendorId: testVendor.id,
        isActive: true,
        imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['hair', 'coloring', 'consultation']
      },
      {
        name: 'Bridal Makeup Application',
        description: 'Professional makeup application for special occasions and weddings',
        price: 3000,
        durationMinutes: 75,
        categoryId: serviceCategories.find(c => c.name === 'Beauty Services')?.children.find(s => s.name === 'Makeup Services')?.id,
        vendorId: testVendor.id,
        isActive: true,
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['makeup', 'bridal', 'special occasion']
      },
      {
        name: 'Hair Treatment & Conditioning',
        description: 'Deep conditioning hair treatment for damaged and dry hair',
        price: 2200,
        durationMinutes: 45,
        categoryId: serviceCategories.find(c => c.name === 'Hair Services')?.children.find(s => s.name === 'Hair Treatments')?.id,
        vendorId: testVendor.id,
        isActive: true,
        imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['hair treatment', 'conditioning', 'repair']
      },
      {
        name: 'Anti-Aging Facial',
        description: 'Specialized anti-aging facial treatment with premium products',
        price: 4200,
        durationMinutes: 75,
        categoryId: serviceCategories.find(c => c.name === 'Beauty Services')?.children.find(s => s.name === 'Facial Treatments')?.id,
        vendorId: testVendor.id,
        isActive: true,
        imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5f881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['anti-aging', 'facial', 'premium']
      },
      {
        name: 'Gel Nail Extension',
        description: 'Professional gel nail extension service with nail art',
        price: 2800,
        durationMinutes: 90,
        categoryId: serviceCategories.find(c => c.name === 'Nail Services')?.children.find(s => s.name === 'Nail Art')?.id,
        vendorId: testVendor.id,
        isActive: true,
        imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['gel nails', 'extensions', 'nail art']
      },
      {
        name: 'Hair Highlights & Lowlights',
        description: 'Professional hair highlighting service for dimensional color',
        price: 3800,
        durationMinutes: 100,
        categoryId: serviceCategories.find(c => c.name === 'Hair Services')?.children.find(s => s.name === 'Hair Coloring')?.id,
        vendorId: testVendor.id,
        isActive: true,
        imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['highlights', 'lowlights', 'dimensional']
      },
      {
        name: 'Eyebrow Microblading',
        description: 'Semi-permanent eyebrow microblading for natural-looking brows',
        price: 5500,
        durationMinutes: 120,
        categoryId: serviceCategories.find(c => c.name === 'Beauty Services')?.children.find(s => s.name === 'Eyebrow Services')?.id,
        vendorId: testVendor.id,
        isActive: true,
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['microblading', 'semi-permanent', 'eyebrows']
      },
      {
        name: 'Lash Extension Service',
        description: 'Professional eyelash extension service for fuller, longer lashes',
        price: 3200,
        durationMinutes: 90,
        categoryId: serviceCategories.find(c => c.name === 'Beauty Services')?.children.find(s => s.name === 'Lash Services')?.id,
        vendorId: testVendor.id,
        isActive: true,
        imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['lash extensions', 'eyelashes', 'beauty']
      }
    ];

    for (const serviceData of services) {
      if (serviceData.categoryId) {
        await prisma.service.create({
          data: serviceData
        });
        console.log(`✅ Created service: ${serviceData.name}`);
      } else {
        console.log(`⚠️  Skipped service: ${serviceData.name} (category not found)`);
      }
    }

    // Seed 12 products for Test Retailer
    console.log('🛍️ Seeding products for Test Retailer...');
    const retailerProducts = [
      {
        name: 'Professional Hair Dryer',
        description: 'High-quality hair dryer with multiple heat settings and attachments',
        price: 8500,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Hair Care')?.children.find(s => s.name === 'Hair Tools')?.id,
        retailerId: testRetailer.id,
        manufacturerId: testManufacturer.id,
        sku: 'HD-001',
        stockQuantity: 15,
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['hair dryer', 'tools', 'professional'],
        isActive: true
      },
      {
        name: 'Moisturizing Face Cream',
        description: 'Hydrating face cream for all skin types with SPF protection',
        price: 3200,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Skincare')?.children.find(s => s.name === 'Moisturizers')?.id,
        retailerId: testRetailer.id,
        manufacturerId: testManufacturer.id,
        sku: 'FC-002',
        stockQuantity: 25,
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['moisturizer', 'skincare', 'SPF'],
        isActive: true
      },
      {
        name: 'Nail Polish Set',
        description: 'Professional nail polish set with 12 vibrant colors',
        price: 1800,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Nail Care')?.children.find(s => s.name === 'Nail Polish')?.id,
        retailerId: testRetailer.id,
        manufacturerId: testManufacturer.id,
        sku: 'NP-003',
        stockQuantity: 30,
        imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['nail polish', 'colors', 'set'],
        isActive: true
      },
      {
        name: 'Makeup Brush Set',
        description: 'Complete makeup brush set with 12 professional brushes',
        price: 4200,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Makeup')?.children.find(s => s.name === 'Makeup Tools')?.id,
        retailerId: testRetailer.id,
        manufacturerId: testManufacturer.id,
        sku: 'MB-004',
        stockQuantity: 20,
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['makeup brushes', 'tools', 'professional'],
        isActive: true
      },
      {
        name: 'Hair Shampoo & Conditioner',
        description: 'Sulfate-free shampoo and conditioner set for all hair types',
        price: 2800,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Hair Care')?.children.find(s => s.name === 'Shampoo & Conditioner')?.id,
        retailerId: testRetailer.id,
        manufacturerId: testManufacturer.id,
        sku: 'SC-005',
        stockQuantity: 35,
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['shampoo', 'conditioner', 'sulfate-free'],
        isActive: true
      },
      {
        name: 'Anti-Aging Serum',
        description: 'Advanced anti-aging serum with retinol and vitamin C',
        price: 5500,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Skincare')?.children.find(s => s.name === 'Serums & Treatments')?.id,
        retailerId: testRetailer.id,
        manufacturerId: testManufacturer.id,
        sku: 'AS-006',
        stockQuantity: 18,
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['anti-aging', 'serum', 'retinol'],
        isActive: true
      },
      {
        name: 'Hair Straightener',
        description: 'Ceramic hair straightener with adjustable temperature control',
        price: 12000,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Hair Care')?.children.find(s => s.name === 'Hair Tools')?.id,
        retailerId: testRetailer.id,
        manufacturerId: testManufacturer.id,
        sku: 'HS-007',
        stockQuantity: 12,
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['straightener', 'ceramic', 'professional'],
        isActive: true
      },
      {
        name: 'Vitamin C Brightening Serum',
        description: 'Potent vitamin C serum for brightening and evening skin tone',
        price: 4800,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Skincare')?.children.find(s => s.name === 'Serums & Treatments')?.id,
        retailerId: testRetailer.id,
        manufacturerId: testManufacturer.id,
        sku: 'VC-008',
        stockQuantity: 22,
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['vitamin C', 'brightening', 'serum'],
        isActive: true
      },
      {
        name: 'Gel Nail Polish Kit',
        description: 'Long-lasting gel nail polish kit with LED lamp',
        price: 3500,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Nail Care')?.children.find(s => s.name === 'Nail Polish')?.id,
        retailerId: testRetailer.id,
        manufacturerId: testManufacturer.id,
        sku: 'GN-009',
        stockQuantity: 15,
        imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['gel polish', 'LED lamp', 'long-lasting'],
        isActive: true
      },
      {
        name: 'Foundation Makeup',
        description: 'Full coverage foundation with natural finish for all skin tones',
        price: 3800,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Makeup')?.children.find(s => s.name === 'Face Makeup')?.id,
        retailerId: testRetailer.id,
        manufacturerId: testManufacturer.id,
        sku: 'FM-010',
        stockQuantity: 28,
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['foundation', 'full coverage', 'natural'],
        isActive: true
      },
      {
        name: 'Hair Treatment Mask',
        description: 'Deep conditioning hair treatment mask for damaged hair',
        price: 2200,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Hair Care')?.children.find(s => s.name === 'Hair Treatments')?.id,
        retailerId: testRetailer.id,
        manufacturerId: testManufacturer.id,
        sku: 'HT-011',
        stockQuantity: 40,
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['hair mask', 'treatment', 'conditioning'],
        isActive: true
      },
      {
        name: 'Eyebrow Pencil Set',
        description: 'Professional eyebrow pencil set with 3 shades and sharpener',
        price: 1500,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Makeup')?.children.find(s => s.name === 'Eye Makeup')?.id,
        retailerId: testRetailer.id,
        manufacturerId: testManufacturer.id,
        sku: 'EP-012',
        stockQuantity: 32,
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['eyebrow pencil', 'shades', 'professional'],
        isActive: true
      }
    ];

    for (const productData of retailerProducts) {
      await prisma.product.create({
        data: productData
      });
      console.log(`✅ Created retailer product: ${productData.name}`);
    }

    // Seed 12 products for Test Manufacturer
    console.log('🏭 Seeding products for Test Manufacturer...');
    const manufacturerProducts = [
      {
        name: 'Professional Hair Straightener',
        description: 'Ceramic hair straightener with adjustable temperature control',
        price: 12000,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Hair Care')?.children.find(s => s.name === 'Hair Tools')?.id,
        manufacturerId: testManufacturer.id,
        sku: 'HS-001',
        stockQuantity: 8,
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['straightener', 'ceramic', 'professional'],
        isActive: true
      },
      {
        name: 'Vitamin C Brightening Serum',
        description: 'Potent vitamin C serum for brightening and evening skin tone',
        price: 4800,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Skincare')?.children.find(s => s.name === 'Serums & Treatments')?.id,
        manufacturerId: testManufacturer.id,
        sku: 'VC-002',
        stockQuantity: 22,
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['vitamin C', 'brightening', 'serum'],
        isActive: true
      },
      {
        name: 'Gel Nail Polish Kit',
        description: 'Long-lasting gel nail polish kit with LED lamp',
        price: 3500,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Nail Care')?.children.find(s => s.name === 'Nail Polish')?.id,
        manufacturerId: testManufacturer.id,
        sku: 'GN-003',
        stockQuantity: 15,
        imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['gel polish', 'LED lamp', 'long-lasting'],
        isActive: true
      },
      {
        name: 'Foundation Makeup',
        description: 'Full coverage foundation with natural finish for all skin tones',
        price: 3800,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Makeup')?.children.find(s => s.name === 'Face Makeup')?.id,
        manufacturerId: testManufacturer.id,
        sku: 'FM-004',
        stockQuantity: 28,
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['foundation', 'full coverage', 'natural'],
        isActive: true
      },
      {
        name: 'Hair Treatment Mask',
        description: 'Deep conditioning hair treatment mask for damaged hair',
        price: 2200,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Hair Care')?.children.find(s => s.name === 'Hair Treatments')?.id,
        manufacturerId: testManufacturer.id,
        sku: 'HT-005',
        stockQuantity: 40,
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['hair mask', 'treatment', 'conditioning'],
        isActive: true
      },
      {
        name: 'Eyebrow Pencil Set',
        description: 'Professional eyebrow pencil set with 3 shades and sharpener',
        price: 1500,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Makeup')?.children.find(s => s.name === 'Eye Makeup')?.id,
        manufacturerId: testManufacturer.id,
        sku: 'EP-006',
        stockQuantity: 32,
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['eyebrow pencil', 'shades', 'professional'],
        isActive: true
      },
      {
        name: 'Hyaluronic Acid Moisturizer',
        description: 'Intensive hydrating moisturizer with hyaluronic acid',
        price: 4200,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Skincare')?.children.find(s => s.name === 'Moisturizers')?.id,
        manufacturerId: testManufacturer.id,
        sku: 'HA-007',
        stockQuantity: 25,
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['hyaluronic acid', 'moisturizer', 'hydration'],
        isActive: true
      },
      {
        name: 'Curling Iron Set',
        description: 'Professional curling iron set with multiple barrel sizes',
        price: 9500,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Hair Care')?.children.find(s => s.name === 'Hair Tools')?.id,
        manufacturerId: testManufacturer.id,
        sku: 'CI-008',
        stockQuantity: 10,
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['curling iron', 'tools', 'professional'],
        isActive: true
      },
      {
        name: 'Lipstick Collection',
        description: 'Premium lipstick collection with 8 matte and satin finishes',
        price: 2800,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Makeup')?.children.find(s => s.name === 'Lip Products')?.id,
        manufacturerId: testManufacturer.id,
        sku: 'LC-009',
        stockQuantity: 18,
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['lipstick', 'collection', 'premium'],
        isActive: true
      },
      {
        name: 'Face Cleansing Oil',
        description: 'Gentle face cleansing oil for all skin types',
        price: 2400,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Skincare')?.children.find(s => s.name === 'Cleansers')?.id,
        manufacturerId: testManufacturer.id,
        sku: 'FCO-010',
        stockQuantity: 30,
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['cleansing oil', 'gentle', 'skincare'],
        isActive: true
      },
      {
        name: 'Hair Color Kit',
        description: 'Professional hair color kit with developer and gloves',
        price: 1800,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Hair Care')?.children.find(s => s.name === 'Hair Coloring')?.id,
        manufacturerId: testManufacturer.id,
        sku: 'HCK-011',
        stockQuantity: 35,
        imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['hair color', 'kit', 'professional'],
        isActive: true
      },
      {
        name: 'Eye Shadow Palette',
        description: 'Professional eye shadow palette with 12 matte and shimmer shades',
        price: 3200,
        currency: 'KES',
        // categoryId: productCategories.find(c => c.name === 'Makeup')?.children.find(s => s.name === 'Eye Makeup')?.id,
        manufacturerId: testManufacturer.id,
        sku: 'ESP-012',
        stockQuantity: 20,
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        tags: ['eye shadow', 'palette', 'professional'],
        isActive: true
      }
    ];

    for (const productData of manufacturerProducts) {
      await prisma.product.create({
        data: {
          ...productData,
          retailerId: testRetailer.id // Assign to test retailer for now
        }
      });
      console.log(`✅ Created manufacturer product: ${productData.name}`);
    }

    console.log('🎉 Test data seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Services created: ${services.filter(s => s.categoryId).length}/12`);
    console.log(`   - Retailer products created: ${retailerProducts.length}/12`);
    console.log(`   - Manufacturer products created: ${manufacturerProducts.length}/12`);

  } catch (error) {
    console.error('❌ Error seeding test data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedTestData()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });
