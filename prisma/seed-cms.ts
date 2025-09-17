import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting CMS seed...');

  // Clear existing CMS data (optional - comment out if you want to keep existing data)
  console.log('🧹 Clearing existing CMS data...');
  await prisma.cmsPages.deleteMany();
  await prisma.cmsPromotionalCard.deleteMany();
  await prisma.cmsCategory.deleteMany();
  await prisma.cmsCategoryBanner.deleteMany();
  await prisma.cmsThemeSetting.deleteMany();
  await prisma.cmsPopup.deleteMany();
  await prisma.cmsPageBanner.deleteMany();
  await prisma.cmsFooterContent.deleteMany();
  await prisma.cmsFeaturedItem.deleteMany();
  await prisma.cmsBanner.deleteMany();
  await prisma.cMSPartnerSection.deleteMany();

  // 1. Insert default footer content
  console.log('📄 Seeding footer content...');
  await prisma.cmsFooterContent.createMany({
    data: [
      {
        sectionKey: 'about',
        title: 'About Urembo Hub',
        content: {
          text: 'Your premier destination for beauty services and products',
          links: []
        },
        position: 1,
        isActive: true,
      },
      {
        sectionKey: 'quick_links',
        title: 'Quick Links',
        content: {
          links: [
            { text: 'Services', url: '/services' },
            { text: 'Products', url: '/shop' },
            { text: 'Browse', url: '/browse' }
          ]
        },
        position: 2,
        isActive: true,
      },
      {
        sectionKey: 'contact',
        title: 'Contact Info',
        content: {
          email: 'info@urembo.hub',
          phone: '+254 700 000 000',
          address: 'Nairobi, Kenya'
        },
        position: 3,
        isActive: true,
      },
      {
        sectionKey: 'social',
        title: 'Follow Us',
        content: {
          links: [
            { platform: 'facebook', url: '#' },
            { platform: 'instagram', url: '#' },
            { platform: 'twitter', url: '#' }
          ]
        },
        position: 4,
        isActive: true,
      },
    ],
  });

  // 2. Insert default theme settings
  console.log('🎨 Seeding theme settings...');
  await prisma.cmsThemeSetting.createMany({
    data: [
      {
        settingKey: 'primary_color',
        settingValue: 'hsl(222.2, 84%, 4.9%)',
        settingType: 'color',
        description: 'Primary brand color',
        isActive: true,
      },
      {
        settingKey: 'secondary_color',
        settingValue: 'hsl(210, 40%, 98%)',
        settingType: 'color',
        description: 'Secondary color',
        isActive: true,
      },
      {
        settingKey: 'accent_color',
        settingValue: 'hsl(222.2, 84%, 4.9%)',
        settingType: 'color',
        description: 'Accent color',
        isActive: true,
      },
      {
        settingKey: 'font_size_base',
        settingValue: '14px',
        settingType: 'font_size',
        description: 'Base font size',
        isActive: true,
      },
      {
        settingKey: 'border_radius',
        settingValue: '0.5rem',
        settingType: 'radius',
        description: 'Default border radius',
        isActive: true,
      },
      {
        settingKey: 'theme_mode',
        settingValue: 'light',
        settingType: 'mode',
        description: 'Default theme mode',
        isActive: true,
      },
      {
        settingKey: 'default_currency',
        settingValue: 'KSH',
        settingType: 'color',
        description: 'Default currency for the platform',
        isActive: true,
      },
      {
        settingKey: 'supported_currencies',
        settingValue: '["KSH"]',
        settingType: 'color',
        description: 'List of supported currencies',
        isActive: true,
      },
    ],
  });

  // 3. Insert sample category banners
  console.log('🏷️ Seeding category banners...');
  await prisma.cmsCategoryBanner.createMany({
    data: [
      {
        categorySlug: 'beauty',
        title: 'Beauty & Wellness Services',
        subtitle: 'Transform your look with professional beauty treatments',
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=400&fit=crop',
        ctaText: 'Book Now',
        ctaUrl: '/services/beauty',
        position: 1,
        isActive: true,
      },
      {
        categorySlug: 'beauty',
        title: 'Premium Spa Experience',
        subtitle: 'Relax and rejuvenate with our luxury spa services',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=400&fit=crop',
        ctaText: 'Explore Services',
        ctaUrl: '/services/beauty',
        position: 2,
        isActive: true,
      },
      {
        categorySlug: 'fitness',
        title: 'Personal Training',
        subtitle: 'Achieve your fitness goals with expert trainers',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop',
        ctaText: 'Start Training',
        ctaUrl: '/services/fitness',
        position: 1,
        isActive: true,
      },
      {
        categorySlug: 'tech',
        title: 'Tech Repair Services',
        subtitle: 'Professional device repair and maintenance',
        imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1200&h=400&fit=crop',
        ctaText: 'Get Quote',
        ctaUrl: '/services/tech',
        position: 1,
        isActive: true,
      },
    ],
  });

  // 4. Insert sample promotional cards
  console.log('🎯 Seeding promotional cards...');
  await prisma.cmsPromotionalCard.createMany({
    data: [
      {
        title: 'New User Special',
        subtitle: 'Welcome to Urembo Hub',
        description: 'Get 20% off your first booking when you sign up today!',
        imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop',
        ctaText: 'Sign Up Now',
        ctaLink: '/auth/signup',
        backgroundColor: '#f8fafc',
        textColor: '#1e293b',
        position: 1,
        isActive: true,
      },
      {
        title: 'Premium Services',
        subtitle: 'Luxury Beauty Experience',
        description: 'Discover our premium beauty and wellness services',
        imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
        ctaText: 'Explore Premium',
        ctaLink: '/services/premium',
        backgroundColor: '#fef3c7',
        textColor: '#92400e',
        position: 2,
        isActive: true,
      },
      {
        title: 'Mobile Services',
        subtitle: 'Beauty at Your Doorstep',
        description: 'Professional beauty services delivered to your home',
        imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop',
        ctaText: 'Book Mobile Service',
        ctaLink: '/services/mobile',
        backgroundColor: '#e0e7ff',
        textColor: '#3730a3',
        position: 3,
        isActive: true,
      },
    ],
  });

  // 5. Insert sample banners
  console.log('🖼️ Seeding banners...');
  await prisma.cmsBanner.createMany({
    data: [
      {
        title: 'Welcome to Urembo Hub',
        subtitle: 'Your Premier Beauty & Wellness Destination',
        imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=600&fit=crop',
        mobileImageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=400&fit=crop',
        ctaText: 'Explore Services',
        ctaLink: '/services',
        position: 1,
        isActive: true,
      },
      {
        title: 'Professional Beauty Services',
        subtitle: 'Expert stylists and therapists at your service',
        imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=600&fit=crop',
        mobileImageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=400&fit=crop',
        ctaText: 'Book Appointment',
        ctaLink: '/appointments',
        position: 2,
        isActive: true,
      },
      {
        title: 'Quality Beauty Products',
        subtitle: 'Premium products from trusted brands',
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=600&fit=crop',
        mobileImageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=400&fit=crop',
        ctaText: 'Shop Now',
        ctaLink: '/shop',
        position: 3,
        isActive: true,
      },
    ],
  });

  // 6. Insert sample page banners
  console.log('📄 Seeding page banners...');
  await prisma.cmsPageBanner.createMany({
    data: [
      {
        pageRoute: '/services',
        title: 'Our Services',
        subtitle: 'Professional beauty and wellness services',
        imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=400&fit=crop',
        mobileImageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=300&fit=crop',
        isActive: true,
      },
      {
        pageRoute: '/shop',
        title: 'Beauty Products',
        subtitle: 'Premium beauty products and accessories',
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=400&fit=crop',
        mobileImageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=300&fit=crop',
        isActive: true,
      },
      {
        pageRoute: '/about',
        title: 'About Us',
        subtitle: 'Learn more about Urembo Hub',
        imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=400&fit=crop',
        mobileImageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=300&fit=crop',
        isActive: true,
      },
    ],
  });

  // 7. Insert sample popups
  console.log('💬 Seeding popups...');
  await prisma.cmsPopup.createMany({
    data: [
      {
        title: 'Welcome to Urembo Hub!',
        content: 'Get 20% off your first booking. Use code WELCOME20 at checkout.',
        popupType: 'promotion',
        targetPages: ['/'],
        maxDisplaysPerSession: 1,
        isActive: true,
      },
      {
        title: 'New Services Available',
        content: 'Check out our latest beauty and wellness services. Book now and save!',
        popupType: 'announcement',
        targetPages: ['/services', '/'],
        maxDisplaysPerSession: 2,
        isActive: true,
      },
    ],
  });

  // 8. Insert sample CMS categories
  console.log('📂 Seeding CMS categories...');
  await prisma.cmsCategory.createMany({
    data: [
      {
        categoryType: 'service',
        imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=200&fit=crop',
        providerCount: 25,
        position: 1,
        isActive: true,
      },
      {
        categoryType: 'product',
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop',
        providerCount: 15,
        position: 2,
        isActive: true,
      },
    ],
  });

  // 9. Insert sample CMS pages
  console.log('📄 Seeding CMS pages...');
  await prisma.cmsPages.createMany({
    data: [
      {
        title: 'About Us',
        slug: 'about-us',
        description: 'Learn more about Urembo Hub and our mission',
        content: `
# About Urembo Hub

Welcome to Urembo Hub, your premier destination for beauty services and products in Kenya.

## Our Mission

We are dedicated to providing high-quality beauty and wellness services to our customers, connecting them with professional service providers and premium products.

## What We Offer

- Professional beauty services
- Quality beauty products
- Expert consultations
- Mobile services
- Premium spa experiences

## Our Values

- Quality
- Professionalism
- Customer satisfaction
- Innovation
- Community

Contact us today to experience the Urembo Hub difference!
        `,
        contentType: 'text',
        isActive: true,
      },
      {
        title: 'Terms of Service',
        slug: 'terms-of-service',
        description: 'Terms and conditions for using Urembo Hub',
        content: `
# Terms of Service

## 1. Acceptance of Terms

By accessing and using Urembo Hub, you accept and agree to be bound by the terms and provision of this agreement.

## 2. Use License

Permission is granted to temporarily download one copy of the materials on Urembo Hub for personal, non-commercial transitory viewing only.

## 3. Disclaimer

The materials on Urembo Hub are provided on an 'as is' basis. Urembo Hub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.

## 4. Limitations

In no event shall Urembo Hub or its suppliers be liable for any damages arising out of the use or inability to use the materials on Urembo Hub.

## 5. Privacy Policy

Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website.

## 6. Contact Information

If you have any questions about these Terms of Service, please contact us at info@urembo.hub.
        `,
        contentType: 'text',
        isActive: true,
      },
      {
        title: 'Privacy Policy',
        slug: 'privacy-policy',
        description: 'How we collect, use, and protect your personal information',
        content: `
# Privacy Policy

## Information We Collect

We collect information you provide directly to us, such as when you create an account, make a booking, or contact us for support.

## How We Use Your Information

We use the information we collect to:
- Provide, maintain, and improve our services
- Process transactions and send related information
- Send technical notices and support messages
- Respond to your comments and questions

## Information Sharing

We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.

## Data Security

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## Your Rights

You have the right to:
- Access your personal information
- Correct inaccurate information
- Delete your personal information
- Object to processing of your information

## Contact Us

If you have any questions about this Privacy Policy, please contact us at privacy@urembo.hub.
        `,
        contentType: 'text',
        isActive: true,
      },
    ],
  });

  // 8. Insert default partner sections
  console.log('🤝 Seeding partner sections...');
  await prisma.cMSPartnerSection.createMany({
    data: [
      {
        title: 'Grow Your Beauty Business Today',
        subtitle: 'Showcase your services or products to a ready audience, increase your visibility and grow your brand all in one place.',
        backgroundImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
        cta1Text: 'Join as a Partner',
        cta1Link: '/auth',
        cta2Text: 'Explore Products',
        cta2Link: '/shop',
        position: 1,
        isActive: true,
      },
      {
        title: 'Discover Amazing Beauty Services',
        subtitle: 'Find the perfect beauty services near you. From hair styling to skincare, connect with professional beauty experts.',
        backgroundImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
        cta1Text: 'Browse Services',
        cta1Link: '/services',
        cta2Text: 'Book Appointment',
        cta2Link: '/appointments',
        position: 2,
        isActive: true,
      },
    ],
  });

  console.log('✅ CMS seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during CMS seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
