# Database Seed Scripts

This directory contains seed scripts for populating the database with initial data.

## Available Seed Scripts

### 1. `seed.ts` - Basic Onboarding Requirements
A simple seed script that creates basic onboarding requirements for vendor, retailer, and manufacturer roles.

**Usage:**
```bash
npm run db:seed
```

**What it creates:**
- Basic onboarding requirements for each business role
- Simple validation rules
- Essential fields for business verification

### 2. `seed-onboarding.ts` - Comprehensive Onboarding Requirements
A more detailed seed script with comprehensive onboarding requirements, validation rules, and better organization.

**Usage:**
```bash
npm run db:seed:onboarding
```

**What it creates:**
- Detailed onboarding requirements for each business role
- Comprehensive validation rules (min/max length, patterns, file types)
- Rich select options with multiple choices
- Payment-related field identification
- Better organized and documented requirements

### 3. `seed-admin.ts` - Admin and Test Users
Creates admin user and test users for different roles.

**Usage:**
```bash
npm run db:seed:admin
```

**What it creates:**
- Admin user: `admin@urembohub.com`
- Test vendor: `vendor@test.com`
- Test retailer: `retailer@test.com`
- Test manufacturer: `manufacturer@test.com`
- Test client: `client@test.com`

### 4. `seed-all.ts` - Comprehensive Seed (Recommended)
Combines all seeding operations into one comprehensive script.

**Usage:**
```bash
npm run db:seed:all
```

**What it creates:**
- Admin user and test users
- Comprehensive onboarding requirements
- Complete database setup for development

## Onboarding Requirements by Role

### Vendor Requirements (9 fields)
1. **Business License Number** - Text field with pattern validation
2. **Business Address** - Text field with length validation
3. **Business Description** - Textarea with content validation
4. **Identity Document** - File upload (ID/Passport)
5. **Business Registration Certificate** - File upload
6. **Tax Identification Number** - Text field (Payment-related)
7. **Bank Account Details** - Textarea (Payment-related)
8. **Service Categories** - Multi-select dropdown
9. **Years of Experience** - Single-select dropdown

### Retailer Requirements (9 fields)
1. **Store License Number** - Text field with pattern validation
2. **Store Address** - Text field with length validation
3. **Business Registration Certificate** - File upload
4. **Product Categories** - Multi-select dropdown
5. **Store Photos** - File upload (optional)
6. **Tax Identification Number** - Text field (Payment-related)
7. **Bank Account Details** - Textarea (Payment-related)
8. **Inventory Management System** - Single-select dropdown
9. **Store Size** - Single-select dropdown

### Manufacturer Requirements (11 fields)
1. **Manufacturing License** - Text field with pattern validation
2. **Factory Address** - Text field with length validation
3. **Quality Certifications** - File upload (optional)
4. **Product Categories** - Textarea with content validation
5. **Production Capacity** - Text field (optional)
6. **Factory Photos** - File upload (optional)
7. **Tax Identification Number** - Text field (Payment-related)
8. **Bank Account Details** - Textarea (Payment-related)
9. **Export License** - File upload (optional)
10. **Environmental Compliance** - Single-select dropdown
11. **Manufacturing Standards** - Multi-select dropdown

## Field Types Used

- **text** - Single line text input
- **textarea** - Multi-line text input
- **select** - Dropdown selection (single or multiple)
- **file** - File upload field

## Validation Rules

The comprehensive seed script includes validation rules for:

- **Text fields**: Min/max length, pattern matching
- **File uploads**: Allowed file types, maximum file size
- **Select fields**: Minimum/maximum selections
- **Required fields**: Mandatory field validation

## Payment-Related Fields

Fields marked as `isPaymentRelated: true` are used for:
- Tax identification
- Bank account details
- Payment processing setup

## Admin User Details

### Default Admin User
- **Email**: `admin@urembohub.com`
- **Password**: `admin123`
- **Name**: Urembo Hub Administrator
- **Role**: `admin`
- **Status**: Verified and approved
- **Business**: Urembo Hub

### Test Users
- **Vendor**: `vendor@test.com` / `vendor123` (Pending onboarding)
- **Retailer**: `retailer@test.com` / `retailer123` (Pending onboarding)
- **Manufacturer**: `manufacturer@test.com` / `manufacturer123` (Pending onboarding)
- **Client**: `client@test.com` / `client123` (Approved)

## Running the Seeds

### Prerequisites
1. Database must be set up and migrated
2. Prisma client must be generated
3. Environment variables must be configured

### Commands
```bash
# Generate Prisma client
npx prisma generate

# Run comprehensive seed (recommended)
npm run db:seed:all

# Run individual seeds
npm run db:seed:admin
npm run db:seed:onboarding

# View data in Prisma Studio
npm run db:studio
```

### Quick Setup
```bash
# Complete setup in one go
npx prisma generate
npm run db:seed:all
npm run db:studio
```

## Customization

To customize the requirements:

1. Edit the `onboardingRequirementsData` object in `seed-onboarding.ts`
2. Modify field types, validation rules, or options
3. Add or remove requirements for specific roles
4. Run the seed script again

## Notes

- The seed scripts will clear existing onboarding requirements before creating new ones
- All requirements are created with `isActive: true` by default
- File upload fields support common image and document formats
- Select fields can be configured for single or multiple selections
- Validation rules are stored as JSON for flexible validation logic
