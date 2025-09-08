-- CreateEnum
CREATE TYPE "public"."user_role" AS ENUM ('client', 'vendor', 'retailer', 'admin', 'manufacturer');

-- CreateEnum
CREATE TYPE "public"."order_status" AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'pending_confirmation', 'confirmed');

-- CreateEnum
CREATE TYPE "public"."order_status_enhanced" AS ENUM ('pending', 'paid', 'processing', 'shipped', 'delivered', 'completed', 'cancelled', 'refunded', 'disputed');

-- CreateEnum
CREATE TYPE "public"."order_status_new" AS ENUM ('pending', 'paid', 'processing', 'fulfilled', 'cancelled');

-- CreateEnum
CREATE TYPE "public"."payment_status" AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded');

-- CreateEnum
CREATE TYPE "public"."payment_provider" AS ENUM ('stripe', 'paystack', 'mpesa');

-- CreateEnum
CREATE TYPE "public"."booking_status" AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'rejected');

-- CreateEnum
CREATE TYPE "public"."appointment_status_enhanced" AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'client_confirmed', 'cancelled', 'no_show', 'disputed');

-- CreateEnum
CREATE TYPE "public"."shipment_status" AS ENUM ('pending', 'dispatched', 'in_transit', 'out_for_delivery', 'delivered', 'failed_delivery', 'returned');

-- CreateEnum
CREATE TYPE "public"."commission_source" AS ENUM ('product', 'service');

-- CreateEnum
CREATE TYPE "public"."onboarding_status" AS ENUM ('pending', 'in_progress', 'submitted', 'approved', 'rejected', 'revision_requested');

-- CreateEnum
CREATE TYPE "public"."onboarding_field_type" AS ENUM ('text', 'textarea', 'select', 'file', 'email', 'phone', 'url', 'rich_text');

-- CreateTable
CREATE TABLE "public"."profiles" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT,
    "phone" TEXT,
    "avatar_url" TEXT,
    "role" "public"."user_role" NOT NULL DEFAULT 'client',
    "business_name" TEXT,
    "business_description" TEXT,
    "business_address" TEXT,
    "business_phone" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_suspended" BOOLEAN NOT NULL DEFAULT false,
    "suspended_at" TIMESTAMP(3),
    "suspended_by" TEXT,
    "suspension_reason" TEXT,
    "onboarding_status" "public"."onboarding_status",
    "payment_account_details" JSONB,
    "payment_account_type" TEXT,
    "payment_details_verified" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "stock_quantity" INTEGER NOT NULL DEFAULT 0,
    "image_url" TEXT,
    "category" TEXT,
    "subcategory" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "retailer_id" TEXT NOT NULL,
    "manufacturer_id" TEXT,
    "sku" TEXT,
    "tags" TEXT[],
    "qc_status" TEXT,
    "created_by_role" "public"."user_role",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "duration_minutes" INTEGER NOT NULL,
    "image_url" TEXT,
    "category" TEXT,
    "category_id" TEXT,
    "subcategory_id" TEXT,
    "actual_service_id" TEXT,
    "delivery_method" TEXT,
    "metadata" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "vendor_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."orders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "client_id" TEXT,
    "vendor_id" TEXT,
    "retailer_id" TEXT,
    "manufacturer_id" TEXT,
    "service_id" TEXT,
    "service_type" TEXT,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" "public"."order_status" NOT NULL DEFAULT 'pending',
    "status_enhanced" "public"."order_status_enhanced",
    "customer_email" TEXT NOT NULL,
    "customer_phone" TEXT,
    "shipping_address" JSONB,
    "notes" TEXT,
    "escrow_amount" DECIMAL(10,2),
    "escrow_status" TEXT,
    "commission_amount" DECIMAL(10,2),
    "commission_rate" DECIMAL(5,2),
    "confirmed_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "completion_confirmed_at" TIMESTAMP(3),
    "disputed_at" TIMESTAMP(3),
    "auto_release_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order_items" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,
    "currency" TEXT DEFAULT 'USD',
    "title" TEXT,
    "type" TEXT,
    "ref_id" TEXT,
    "subtotal" DECIMAL(10,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."appointments" (
    "id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "staff_id" TEXT,
    "appointment_date" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "duration_minutes" INTEGER NOT NULL,
    "status" "public"."booking_status" NOT NULL DEFAULT 'pending',
    "status_enhanced" "public"."appointment_status_enhanced",
    "price" DECIMAL(10,2),
    "total_amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "escrow_amount" DECIMAL(10,2),
    "escrow_status" TEXT,
    "commission_amount" DECIMAL(10,2),
    "commission_rate" DECIMAL(5,2),
    "completion_confirmed_at" TIMESTAMP(3),
    "auto_release_at" TIMESTAMP(3),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."service_appointments" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "staff_id" TEXT,
    "appointment_date" TIMESTAMP(3) NOT NULL,
    "duration_minutes" INTEGER NOT NULL,
    "service_price" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."commission_settings" (
    "id" TEXT NOT NULL,
    "role" "public"."user_role" NOT NULL,
    "commission_rate" DECIMAL(5,2) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "commission_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."commission_transactions" (
    "id" TEXT NOT NULL,
    "business_user_id" TEXT NOT NULL,
    "business_role" "public"."user_role" NOT NULL,
    "transaction_type" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "transaction_amount" DECIMAL(10,2) NOT NULL,
    "commission_rate" DECIMAL(5,2) NOT NULL,
    "commission_amount" DECIMAL(10,2) NOT NULL,
    "payment_status" TEXT NOT NULL DEFAULT 'pending',
    "payment_method_id" TEXT,
    "stripe_payment_intent_id" TEXT,
    "processed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "commission_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment_methods" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "stripe_payment_method_id" TEXT NOT NULL,
    "card_brand" TEXT NOT NULL,
    "card_last4" TEXT NOT NULL,
    "card_exp_month" INTEGER NOT NULL,
    "card_exp_year" INTEGER NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment_provider_settings" (
    "id" TEXT NOT NULL,
    "provider" "public"."payment_provider" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "supported_currencies" TEXT[],
    "configuration" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_provider_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."vendor_schedule_slots" (
    "id" TEXT NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "slot_date" DATE NOT NULL,
    "slot_time" TIME NOT NULL,
    "is_blocked" BOOLEAN NOT NULL DEFAULT false,
    "appointment_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_schedule_slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cms_settings" (
    "id" TEXT NOT NULL,
    "setting_key" TEXT NOT NULL,
    "setting_value" TEXT NOT NULL,
    "setting_type" TEXT NOT NULL DEFAULT 'string',
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cms_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."admin_currency_settings" (
    "id" TEXT NOT NULL,
    "currency_code" TEXT NOT NULL,
    "currency_name" TEXT NOT NULL,
    "currency_symbol" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "exchange_rate" DECIMAL(10,4),
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_currency_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ticket_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "icon" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ticket_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tickets" (
    "id" TEXT NOT NULL,
    "ticket_number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category_id" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'medium',
    "status" TEXT NOT NULL DEFAULT 'open',
    "created_by" TEXT NOT NULL,
    "assigned_to" TEXT,
    "client_id" TEXT,
    "order_id" TEXT,
    "appointment_id" TEXT,
    "tags" TEXT[],
    "metadata" JSONB,
    "resolved_at" TIMESTAMP(3),
    "closed_at" TIMESTAMP(3),
    "last_activity_at" TIMESTAMP(3),
    "escalated_at" TIMESTAMP(3),
    "due_date" TIMESTAMP(3),
    "satisfaction_rating" INTEGER,
    "feedback" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ticket_responses" (
    "id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "is_internal" BOOLEAN NOT NULL DEFAULT false,
    "attachments" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ticket_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."staff_assignments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "permissions" JSONB NOT NULL,
    "assigned_by" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staff_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."role_audit_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "oldData" JSONB,
    "newData" JSONB,
    "changed_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."shipments" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "shipment_number" TEXT NOT NULL,
    "delivery_partner" TEXT NOT NULL,
    "tracking_number" TEXT,
    "estimated_delivery_date" TIMESTAMP(3),
    "actual_delivery_date" TIMESTAMP(3),
    "delivery_address" JSONB,
    "delivery_notes" TEXT,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."shipment_status_updates" (
    "id" TEXT NOT NULL,
    "shipment_id" TEXT NOT NULL,
    "status" "public"."shipment_status" NOT NULL,
    "previous_status" "public"."shipment_status",
    "notes" TEXT,
    "location" TEXT,
    "updated_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "shipment_status_updates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ticket_audit_logs" (
    "id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "action_type" TEXT NOT NULL,
    "previous_value" TEXT,
    "new_value" TEXT,
    "performed_by" TEXT NOT NULL,
    "performed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "ticket_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ticket_conversations" (
    "id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "attachments" JSONB,
    "is_internal" BOOLEAN NOT NULL DEFAULT false,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ticket_conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payments" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "provider" "public"."payment_provider" NOT NULL,
    "status" "public"."payment_status" NOT NULL DEFAULT 'pending',
    "provider_transaction_id" TEXT,
    "provider_response" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'info',
    "read" BOOLEAN NOT NULL DEFAULT false,
    "action_url" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."wishlist" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "item_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."service_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "image_url" TEXT,
    "level" INTEGER NOT NULL,
    "parent_id" TEXT,
    "position" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."product_categories_new" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "image_url" TEXT,
    "level" INTEGER NOT NULL,
    "parent_id" TEXT,
    "position" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_categories_new_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."staff" (
    "id" TEXT NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "image_url" TEXT,
    "specialties" TEXT[],
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."service_reviews" (
    "id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "appointment_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "staff_id" TEXT,
    "rating" INTEGER NOT NULL,
    "review_text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."onboarding_requirements" (
    "id" TEXT NOT NULL,
    "role" "public"."user_role" NOT NULL,
    "label" TEXT NOT NULL,
    "field_type" "public"."onboarding_field_type" NOT NULL,
    "is_mandatory" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "placeholder" TEXT,
    "select_options" JSONB,
    "position" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_payment_related" BOOLEAN DEFAULT false,
    "validation_rules" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "onboarding_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."onboarding_submissions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "requirement_id" TEXT NOT NULL,
    "value" TEXT,
    "file_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "onboarding_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."onboarding_reviews" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "status" "public"."onboarding_status" NOT NULL,
    "notes" TEXT,
    "rejection_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "onboarding_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "public"."profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "commission_settings_role_key" ON "public"."commission_settings"("role");

-- CreateIndex
CREATE UNIQUE INDEX "payment_provider_settings_provider_key" ON "public"."payment_provider_settings"("provider");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_schedule_slots_vendor_id_slot_date_slot_time_key" ON "public"."vendor_schedule_slots"("vendor_id", "slot_date", "slot_time");

-- CreateIndex
CREATE UNIQUE INDEX "cms_settings_setting_key_key" ON "public"."cms_settings"("setting_key");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_ticket_number_key" ON "public"."tickets"("ticket_number");

-- CreateIndex
CREATE UNIQUE INDEX "staff_assignments_user_id_role_key" ON "public"."staff_assignments"("user_id", "role");

-- CreateIndex
CREATE UNIQUE INDEX "shipments_shipment_number_key" ON "public"."shipments"("shipment_number");

-- CreateIndex
CREATE UNIQUE INDEX "service_categories_slug_key" ON "public"."service_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "product_categories_new_slug_key" ON "public"."product_categories_new"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "onboarding_submissions_user_id_requirement_id_key" ON "public"."onboarding_submissions"("user_id", "requirement_id");

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_retailer_id_fkey" FOREIGN KEY ("retailer_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."services" ADD CONSTRAINT "services_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."services" ADD CONSTRAINT "services_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."service_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."services" ADD CONSTRAINT "services_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "public"."service_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."services" ADD CONSTRAINT "services_actual_service_id_fkey" FOREIGN KEY ("actual_service_id") REFERENCES "public"."service_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."appointments" ADD CONSTRAINT "appointments_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."appointments" ADD CONSTRAINT "appointments_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."appointments" ADD CONSTRAINT "appointments_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_appointments" ADD CONSTRAINT "service_appointments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_appointments" ADD CONSTRAINT "service_appointments_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_appointments" ADD CONSTRAINT "service_appointments_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."commission_transactions" ADD CONSTRAINT "commission_transactions_business_user_id_fkey" FOREIGN KEY ("business_user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payment_methods" ADD CONSTRAINT "payment_methods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tickets" ADD CONSTRAINT "tickets_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."ticket_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tickets" ADD CONSTRAINT "tickets_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tickets" ADD CONSTRAINT "tickets_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tickets" ADD CONSTRAINT "tickets_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "public"."appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ticket_responses" ADD CONSTRAINT "ticket_responses_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "public"."tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ticket_responses" ADD CONSTRAINT "ticket_responses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."staff_assignments" ADD CONSTRAINT "staff_assignments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_audit_logs" ADD CONSTRAINT "role_audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shipments" ADD CONSTRAINT "shipments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shipments" ADD CONSTRAINT "shipments_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shipment_status_updates" ADD CONSTRAINT "shipment_status_updates_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "public"."shipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ticket_audit_logs" ADD CONSTRAINT "ticket_audit_logs_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "public"."tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ticket_audit_logs" ADD CONSTRAINT "ticket_audit_logs_performed_by_fkey" FOREIGN KEY ("performed_by") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ticket_conversations" ADD CONSTRAINT "ticket_conversations_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "public"."tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ticket_conversations" ADD CONSTRAINT "ticket_conversations_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."wishlist" ADD CONSTRAINT "wishlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_categories" ADD CONSTRAINT "service_categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."service_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product_categories_new" ADD CONSTRAINT "product_categories_new_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."product_categories_new"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."staff" ADD CONSTRAINT "staff_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_reviews" ADD CONSTRAINT "service_reviews_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_reviews" ADD CONSTRAINT "service_reviews_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "public"."appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_reviews" ADD CONSTRAINT "service_reviews_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_reviews" ADD CONSTRAINT "service_reviews_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."onboarding_submissions" ADD CONSTRAINT "onboarding_submissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."onboarding_submissions" ADD CONSTRAINT "onboarding_submissions_requirement_id_fkey" FOREIGN KEY ("requirement_id") REFERENCES "public"."onboarding_requirements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."onboarding_reviews" ADD CONSTRAINT "onboarding_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."onboarding_reviews" ADD CONSTRAINT "onboarding_reviews_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
