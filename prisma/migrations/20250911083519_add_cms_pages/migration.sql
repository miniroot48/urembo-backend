-- CreateTable
CREATE TABLE "public"."cms_banners" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "image_url" TEXT NOT NULL,
    "mobile_image_url" TEXT,
    "cta_text" TEXT,
    "cta_link" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cms_banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cms_featured_items" (
    "id" TEXT NOT NULL,
    "item_type" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cms_featured_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cms_footer_content" (
    "id" TEXT NOT NULL,
    "section_key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB NOT NULL DEFAULT '{}',
    "position" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cms_footer_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cms_page_banners" (
    "id" TEXT NOT NULL,
    "page_route" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "image_url" TEXT NOT NULL,
    "mobile_image_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cms_page_banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cms_popups" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "popup_type" TEXT NOT NULL,
    "target_pages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "max_displays_per_session" INTEGER NOT NULL DEFAULT 1,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cms_popups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cms_theme_settings" (
    "id" TEXT NOT NULL,
    "setting_key" TEXT NOT NULL,
    "setting_value" TEXT NOT NULL,
    "setting_type" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cms_theme_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cms_category_banners" (
    "id" TEXT NOT NULL,
    "category_slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "image_url" TEXT NOT NULL,
    "mobile_image_url" TEXT,
    "cta_text" TEXT,
    "cta_url" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cms_category_banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cms_categories" (
    "id" TEXT NOT NULL,
    "category_type" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "provider_count" INTEGER NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "category_id" TEXT,
    "subcategory_id" TEXT,
    "product_category_id" TEXT,
    "product_subcategory_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cms_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cms_promotional_cards" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "image_url" TEXT NOT NULL,
    "cta_text" TEXT,
    "cta_link" TEXT,
    "background_color" TEXT NOT NULL DEFAULT '#ffffff',
    "text_color" TEXT NOT NULL DEFAULT '#000000',
    "position" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cms_promotional_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cms_pages" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "content_type" TEXT NOT NULL DEFAULT 'text',
    "pdf_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cms_pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cms_featured_items_item_type_item_id_key" ON "public"."cms_featured_items"("item_type", "item_id");

-- CreateIndex
CREATE UNIQUE INDEX "cms_footer_content_section_key_key" ON "public"."cms_footer_content"("section_key");

-- CreateIndex
CREATE UNIQUE INDEX "cms_page_banners_page_route_key" ON "public"."cms_page_banners"("page_route");

-- CreateIndex
CREATE UNIQUE INDEX "cms_theme_settings_setting_key_key" ON "public"."cms_theme_settings"("setting_key");

-- CreateIndex
CREATE UNIQUE INDEX "cms_pages_slug_key" ON "public"."cms_pages"("slug");
