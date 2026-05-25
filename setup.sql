-- ============================================================
-- SITE BBC AUTO PEÇAS - Complete Database Setup Script
-- PostgreSQL Migration + Seed Data
-- ============================================================

-- Drop existing tables (in reverse dependency order)
DROP TABLE IF EXISTS "Favorite" CASCADE;
DROP TABLE IF EXISTS "Review" CASCADE;
DROP TABLE IF EXISTS "OrderItem" CASCADE;
DROP TABLE IF EXISTS "Order" CASCADE;
DROP TABLE IF EXISTS "CompatibleVehicle" CASCADE;
DROP TABLE IF EXISTS "Product" CASCADE;
DROP TABLE IF EXISTS "Category" CASCADE;
DROP TABLE IF EXISTS "Brand" CASCADE;
DROP TABLE IF EXISTS "Address" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;
DROP TABLE IF EXISTS "Coupon" CASCADE;
DROP TABLE IF EXISTS "Banner" CASCADE;
DROP TABLE IF EXISTS "Newsletter" CASCADE;

DROP TYPE IF EXISTS "Role" CASCADE;
DROP TYPE IF EXISTS "OrderStatus" CASCADE;
DROP TYPE IF EXISTS "PaymentMethod" CASCADE;
DROP TYPE IF EXISTS "DiscountType" CASCADE;

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE "Role" AS ENUM ('CLIENT', 'ADMIN');
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PREPARING', 'SHIPPED', 'DELIVERED', 'CANCELLED');
CREATE TYPE "PaymentMethod" AS ENUM ('PIX', 'CREDIT_CARD', 'DEBIT_CARD', 'BOLETO');
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FIXED');

-- ============================================================
-- TABLES
-- ============================================================

CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "cpf" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technicalDescription" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "comparePrice" DECIMAL(10,2),
    "costPrice" DECIMAL(10,2),
    "sku" TEXT NOT NULL,
    "barcode" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "stockMin" INTEGER NOT NULL DEFAULT 0,
    "images" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "discountPercentage" DECIMAL(5,2),
    "weight" DECIMAL(8,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CompatibleVehicle" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER,
    "engine" TEXT,
    "productId" TEXT NOT NULL,
    CONSTRAINT "CompatibleVehicle_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discount" DECIMAL(10,2) NOT NULL,
    "discountType" "DiscountType" NOT NULL,
    "minValue" DECIMAL(10,2),
    "maxUses" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Banner" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "image" TEXT NOT NULL,
    "link" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "shipping" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" "PaymentMethod" NOT NULL,
    "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "shippingAddressId" TEXT NOT NULL,
    "couponId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Newsletter" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_email_idx" ON "User"("email");
CREATE INDEX "User_cpf_idx" ON "User"("cpf");
CREATE INDEX "Address_userId_idx" ON "Address"("userId");
CREATE UNIQUE INDEX "Brand_slug_key" ON "Brand"("slug");
CREATE INDEX "Brand_slug_idx" ON "Brand"("slug");
CREATE INDEX "Brand_name_idx" ON "Brand"("name");
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
CREATE INDEX "Category_slug_idx" ON "Category"("slug");
CREATE INDEX "Category_parentId_idx" ON "Category"("parentId");
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
CREATE INDEX "Product_slug_idx" ON "Product"("slug");
CREATE INDEX "Product_sku_idx" ON "Product"("sku");
CREATE INDEX "Product_name_idx" ON "Product"("name");
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");
CREATE INDEX "Product_brandId_idx" ON "Product"("brandId");
CREATE INDEX "Product_featured_idx" ON "Product"("featured");
CREATE INDEX "Product_price_idx" ON "Product"("price");
CREATE INDEX "CompatibleVehicle_productId_idx" ON "CompatibleVehicle"("productId");
CREATE INDEX "CompatibleVehicle_brand_idx" ON "CompatibleVehicle"("brand");
CREATE INDEX "CompatibleVehicle_model_idx" ON "CompatibleVehicle"("model");
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");
CREATE INDEX "Coupon_code_idx" ON "Coupon"("code");
CREATE INDEX "Banner_isActive_order_idx" ON "Banner"("isActive", "order");
CREATE INDEX "Order_userId_idx" ON "Order"("userId");
CREATE INDEX "Order_status_idx" ON "Order"("status");
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");
CREATE INDEX "Order_couponId_idx" ON "Order"("couponId");
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");
CREATE UNIQUE INDEX "Newsletter_email_key" ON "Newsletter"("email");
CREATE INDEX "Newsletter_email_idx" ON "Newsletter"("email");
CREATE INDEX "Review_productId_idx" ON "Review"("productId");
CREATE INDEX "Review_userId_idx" ON "Review"("userId");
CREATE INDEX "Favorite_userId_idx" ON "Favorite"("userId");
CREATE INDEX "Favorite_productId_idx" ON "Favorite"("productId");
CREATE UNIQUE INDEX "Favorite_userId_productId_key" ON "Favorite"("userId", "productId");

-- ============================================================
-- FOREIGN KEYS
-- ============================================================

ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "CompatibleVehicle" ADD CONSTRAINT "CompatibleVehicle_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Order" ADD CONSTRAINT "Order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ============================================================
-- SEED DATA
-- ============================================================

-- BRANDS
INSERT INTO "Brand" ("id", "name", "slug", "logo", "description", "createdAt", "updatedAt") VALUES ('brand_vw', 'Volkswagen', 'volkswagen', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAxMjAgNjAiPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSI2IiBmaWxsPSIjMDA1NkEwIi8+PHRleHQgeD0iNjAiIHk9IjM4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIj5WVzwvdGV4dD48L3N2Zz4=', 'Montadora alemã fundada em 1937, uma das maiores fabricantes de automóveis do mundo. Líder de mercado no Brasil com modelos como Gol, Polo e T-Cross.', NOW(), NOW());
INSERT INTO "Brand" ("id", "name", "slug", "logo", "description", "createdAt", "updatedAt") VALUES ('brand_chev', 'Chevrolet', 'chevrolet', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAxMjAgNjAiPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSI2IiBmaWxsPSIjQzgxMDJFIi8+PHRleHQgeD0iNjAiIHk9IjM4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIj5HTTwvdGV4dD48L3N2Zz4=', 'Marca americana fundada em 1911, presente no Brasil desde 1925. Conhecida por modelos como Onix, Cruze e S10.', NOW(), NOW());
INSERT INTO "Brand" ("id", "name", "slug", "logo", "description", "createdAt", "updatedAt") VALUES ('brand_fiat', 'Fiat', 'fiat', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAxMjAgNjAiPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSI2IiBmaWxsPSIjMDAzMzY2Ii8+PHRleHQgeD0iNjAiIHk9IjM4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIj5GSUFUPC90ZXh0Pjwvc3ZnPg==', 'Montadora italiana fundada em 1899, uma das marcas mais populares do Brasil. Famosa pelos modelos Palio, Uno e Strada.', NOW(), NOW());
INSERT INTO "Brand" ("id", "name", "slug", "logo", "description", "createdAt", "updatedAt") VALUES ('brand_ford', 'Ford', 'ford', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAxMjAgNjAiPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSI2IiBmaWxsPSIjMUIzOTZBIi8+PHRleHQgeD0iNjAiIHk9IjM4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIj5GT1JEPC90ZXh0Pjwvc3ZnPg==', 'Montadora americana fundada em 1903, presente no Brasil desde 1919. Conhecida por modelos como Ka, Focus e Ranger.', NOW(), NOW());
INSERT INTO "Brand" ("id", "name", "slug", "logo", "description", "createdAt", "updatedAt") VALUES ('brand_toyota', 'Toyota', 'toyota', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAxMjAgNjAiPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSI2IiBmaWxsPSIjQjIwQjBCIi8+PHRleHQgeD0iNjAiIHk9IjM4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIj5UT1lPVEE8L3RleHQ+PC9zdmc+', 'Montadora japonesa fundada em 1937, líder mundial em produção de veículos. Reconhecida por modelos como Corolla, Hilux e Etios.', NOW(), NOW());
INSERT INTO "Brand" ("id", "name", "slug", "logo", "description", "createdAt", "updatedAt") VALUES ('brand_honda', 'Honda', 'honda', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAxMjAgNjAiPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSI2IiBmaWxsPSIjMDAzRDZCIi8+PHRleHQgeD0iNjAiIHk9IjM4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIj5IT05EQTwvdGV4dD48L3N2Zz4=', 'Montadora japonesa fundada em 1948, conhecida pela confiabilidade e inovação. Modelos populares incluem Civic, HR-V e Accord.', NOW(), NOW());
INSERT INTO "Brand" ("id", "name", "slug", "logo", "description", "createdAt", "updatedAt") VALUES ('brand_hyundai', 'Hyundai', 'hyundai', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAxMjAgNjAiPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSI2IiBmaWxsPSIjMDAyQzVGIi8+PHRleHQgeD0iNjAiIHk9IjM4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIj5IWVVOREFJPC90ZXh0Pjwvc3ZnPg==', 'Montadora sul-coreana fundada em 1967, em rápido crescimento no Brasil. Destaca-se com os modelos HB20, Creta e Tucson.', NOW(), NOW());
INSERT INTO "Brand" ("id", "name", "slug", "logo", "description", "createdAt", "updatedAt") VALUES ('brand_nissan', 'Nissan', 'nissan', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAxMjAgNjAiPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSI2IiBmaWxsPSIjQzMwMDJGIi8+PHRleHQgeD0iNjAiIHk9IjM4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIj5OSVNTQU48L3RleHQ+PC9zdmc+', 'Montadora japonesa fundada em 1933, conhecida por veículos inovadores e robustos. Modelos populares incluem Versa, Kicks e Frontier.', NOW(), NOW());
INSERT INTO "Brand" ("id", "name", "slug", "logo", "description", "createdAt", "updatedAt") VALUES ('brand_renault', 'Renault', 'renault', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAxMjAgNjAiPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSI2IiBmaWxsPSIjRkZDMzAwIi8+PHRleHQgeD0iNjAiIHk9IjM4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIj5SRU5BVUxUPC90ZXh0Pjwvc3ZnPg==', 'Montadora francesa fundada em 1899, com forte presença no Brasil. Conhecida pelos modelos Sandero, Kwid e Duster.', NOW(), NOW());
INSERT INTO "Brand" ("id", "name", "slug", "logo", "description", "createdAt", "updatedAt") VALUES ('brand_jeep', 'Jeep', 'jeep', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAxMjAgNjAiPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSI2IiBmaWxsPSIjMUMxQzFDIi8+PHRleHQgeD0iNjAiIHk9IjM4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIj5KRUVQPC90ZXh0Pjwvc3ZnPg==', 'Marca americana fundada em 1941, sinônimo de veículos off-road. Modelos icônicos incluem Renegade, Compass e Wrangler.', NOW(), NOW());

-- PARENT CATEGORIES
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_freio', 'Freio', 'freio', 'Peças para sistema de frenagem automotiva', 'https://placehold.co/600x400/DC2626/ffffff?text=Freio', NULL, NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_suspensao', 'Suspensão', 'suspensao', 'Peças para sistema de suspensão', 'https://placehold.co/600x400/16A34A/ffffff?text=Suspensao', NULL, NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_motor', 'Motor', 'motor', 'Peças e componentes para motor', 'https://placehold.co/600x400/2563EB/ffffff?text=Motor', NULL, NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_eletrica', 'Elétrica', 'eletrica', 'Peças para sistema elétrico automotivo', 'https://placehold.co/600x400/D97706/ffffff?text=Eletrica', NULL, NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_transmissao', 'Transmissão', 'transmissao', 'Peças para sistema de transmissão', 'https://placehold.co/600x400/7C3AED/ffffff?text=Transmissao', NULL, NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_arrefecimento', 'Arrefecimento', 'arrefecimento', 'Peças para sistema de arrefecimento', 'https://placehold.co/600x400/0891B2/ffffff?text=Arrefecimento', NULL, NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_escape', 'Escape', 'escape', 'Peças para sistema de escape', 'https://placehold.co/600x400/6B7280/ffffff?text=Escape', NULL, NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_direcao', 'Direção', 'direcao', 'Peças para sistema de direção', 'https://placehold.co/600x400/1F2937/ffffff?text=Direcao', NULL, NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_carroceria', 'Carroceria', 'carroceria', 'Peças para carroceria e lataria', 'https://placehold.co/600x400/BE185D/ffffff?text=Carroceria', NULL, NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_acessorios', 'Acessórios', 'acessorios', 'Acessórios automotivos diversos', 'https://placehold.co/600x400/65A30D/ffffff?text=Acessorios', NULL, NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_iluminacao', 'Iluminação', 'iluminacao', 'Peças para iluminação automotiva', 'https://placehold.co/600x400/EAB308/ffffff?text=Iluminacao', NULL, NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_filtros', 'Filtros', 'filtros', 'Filtros automotivos em geral', 'https://placehold.co/600x400/0F766E/ffffff?text=Filtros', NULL, NOW(), NOW());

-- SUBCATEGORIES
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_pastilhas_freio', 'Pastilhas de Freio', 'pastilhas-de-freio', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Pastilhas+de+Freio', 'cat_freio', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_discos_freio', 'Discos de Freio', 'discos-de-freio', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Discos+de+Freio', 'cat_freio', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_tambores', 'Tambores', 'tambores', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Tambores', 'cat_freio', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_amortecedores', 'Amortecedores', 'amortecedores', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Amortecedores', 'cat_suspensao', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_molas', 'Molas', 'molas', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Molas', 'cat_suspensao', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_buchas', 'Buchas', 'buchas', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Buchas', 'cat_suspensao', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_bielas', 'Bielas', 'bielas', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Bielas', 'cat_motor', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_pistoes', 'Pistões', 'pistoes', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Pistões', 'cat_motor', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_valvulas', 'Válvulas', 'valvulas', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Válvulas', 'cat_motor', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_baterias', 'Baterias', 'baterias', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Baterias', 'cat_eletrica', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_alternadores', 'Alternadores', 'alternadores', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Alternadores', 'cat_eletrica', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_motores_partida', 'Motores de Partida', 'motores-de-partida', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Motores+de+Partida', 'cat_eletrica', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_embreagens', 'Embreagens', 'embreagens', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Embreagens', 'cat_transmissao', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_cambios', 'Câmbios', 'cambios', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Câmbios', 'cat_transmissao', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_diferenciais', 'Diferenciais', 'diferenciais', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Diferenciais', 'cat_transmissao', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_radiadores', 'Radiadores', 'radiadores', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Radiadores', 'cat_arrefecimento', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_bombas_dagua', 'Bombas d''Água', 'bombas-dagua', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Bombas+d''Água', 'cat_arrefecimento', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_mangueiras', 'Mangueiras', 'mangueiras', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Mangueiras', 'cat_arrefecimento', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_silenciosos', 'Silenciosos', 'silenciosos', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Silenciosos', 'cat_escape', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_catalisadores', 'Catalisadores', 'catalisadores', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Catalisadores', 'cat_escape', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_tubos', 'Tubos', 'tubos', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Tubos', 'cat_escape', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_caixas_direcao', 'Caixas de Direção', 'caixas-de-direcao', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Caixas+de+Direção', 'cat_direcao', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_barras', 'Barras', 'barras', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Barras', 'cat_direcao', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_terminais', 'Terminais', 'terminais', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Terminais', 'cat_direcao', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_parachoques', 'Para-choques', 'para-choques', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Para-choques', 'cat_carroceria', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_vidros', 'Vidros', 'vidros', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Vidros', 'cat_carroceria', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_retrovisores', 'Retrovisores', 'retrovisores', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Retrovisores', 'cat_carroceria', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_tapetes', 'Tapetes', 'tapetes', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Tapetes', 'cat_acessorios', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_capas', 'Capas', 'capas', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Capas', 'cat_acessorios', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_kits', 'Kits', 'kits', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Kits', 'cat_acessorios', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_farois', 'Faróis', 'farois', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Faróis', 'cat_iluminacao', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_lanternas', 'Lanternas', 'lanternas', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Lanternas', 'cat_iluminacao', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_lampadas', 'Lâmpadas', 'lampadas', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Lâmpadas', 'cat_iluminacao', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_filtros_oleo', 'Filtros de Óleo', 'filtros-de-oleo', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Filtros+de+Óleo', 'cat_filtros', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_filtros_ar', 'Filtros de Ar', 'filtros-de-ar', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Filtros+de+Ar', 'cat_filtros', NOW(), NOW());
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "parentId", "createdAt", "updatedAt") VALUES ('cat_filtros_combustivel', 'Filtros de Combustível', 'filtros-de-combustivel', NULL, 'https://placehold.co/600x400/0F766E/ffffff?text=Filtros+de+Combustível', 'cat_filtros', NOW(), NOW());

-- USERS
INSERT INTO "User" ("id", "name", "email", "password", "phone", "cpf", "role", "createdAt", "updatedAt") VALUES ('user_admin', 'Administrador', 'admin@bbcautopecas.com.br', '$2a$$10$$8K1p/a0dL1LXMIgoEDFrwOfMQkfAjkMBcGmGCXjGHgONKzOqARvGq', '(11) 99999-0001', '111.222.333-44', 'ADMIN', NOW(), NOW());
INSERT INTO "User" ("id", "name", "email", "password", "phone", "cpf", "role", "createdAt", "updatedAt") VALUES ('user_client', 'Cliente Teste', 'cliente@teste.com.br', '$2a$$10$$YoXZ5MRoPqE3PI3Fl.8TZOoN/TgMJuPqHq3YcVnqGMJqXoRKl/OCa', '(11) 99999-0002', '555.666.777-88', 'CLIENT', NOW(), NOW());

-- ADDRESS
INSERT INTO "Address" ("id", "userId", "street", "number", "complement", "neighborhood", "city", "state", "zipCode", "isDefault") VALUES ('addr_001', 'user_client', 'Rua das Autopeças', '123', 'Bloco B, Ap 42', 'Centro', 'São Paulo', 'SP', '01001-000', true);

-- PRODUCTS
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_001', 'Pastilha de Freio Dianteira VW Gol G7', 'pastilha-de-freio-dianteira-vw-gol-g7', 'Pastilha de freio dianteira de alta performance para Volkswagen Gol G7. Fabricada com material cerâmico de primeira linha, garantindo maior durabilidade e poder de frenagem. Ideal para uso urbano e rodoviário, oferece segurança e confiabilidade em qualquer condição.', 'Material: Cerâmico | Comprimento: 156mm | Largura: 56mm | Espessura: 17mm | Temperatura máx: 750°C | Acompanha: pastilhas e clipes', 89.9, 129.9, 45, 'FR-001', '7890000000011', 50, 10, ARRAY['https://placehold.co/600x600/DC2626/ffffff?text=Pastilha+Freio+VW+Gol'], true, 30, 1.2, NOW(), NOW(), 'cat_pastilhas_freio', 'brand_vw');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_002', 'Pastilha de Freio Traseira Chevrolet Onix', 'pastilha-de-freio-traseira-chevrolet-onix', 'Pastilha de freio traseira de alta qualidade para Chevrolet Onix. Desenvolvida com tecnologia de ponta para garantir frenagens seguras e suaves. Resistente ao desgaste e com excelente custo-benefício.', 'Material: Semimetálico | Comprimento: 142mm | Largura: 48mm | Espessura: 15mm | Certificação INMETRO', 79.9, 99.9, 42, 'FR-002', '7890000000028', 80, 10, ARRAY['https://placehold.co/600x600/DC2626/ffffff?text=Pastilha+Freio+Onix+Traseira'], true, 25, 0.9, NOW(), NOW(), 'cat_pastilhas_freio', 'brand_chev');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_003', 'Pastilha de Freio Dianteira Fiat Palio', 'pastilha-de-freio-dianteira-fiat-palio', 'Pastilha de freio dianteira para Fiat Palio fabricada com material semimetálico de alta resistência. Proporciona frenagem progressiva e silenciosa, com longa vida útil.', 'Material: Semimetálico | Comprimento: 160mm | Largura: 52mm | Espessura: 18mm | Aplicação: Palio 1.0/1.4 2011-2018', 74.9, 89.9, 40, 'FR-003', '7890000000035', 65, 10, ARRAY['https://placehold.co/600x600/DC2626/ffffff?text=Pastilha+Freio+Palio'], false, NULL, 1, NOW(), NOW(), 'cat_pastilhas_freio', 'brand_fiat');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_004', 'Disco de Freio Ventilado Chevrolet Onix', 'disco-de-freio-ventilado-chevrolet-onix', 'Disco de freio ventilado de alto desempenho para Chevrolet Onix. Produzido em ferro fundido de alta resistência com tratamento térmico antiferrugem. Design ventilado que proporciona melhor dissipação de calor e evita o superaquecimento do sistema de freios.', 'Diâmetro: 258mm | Espessura: 22mm | Furos: 4 | Material: Ferro Fundido G3000 | Tratamento: Zincado', 159.9, 219.9, 90, 'FR-004', '7890000000042', 30, 5, ARRAY['https://placehold.co/600x600/DC2626/ffffff?text=Disco+Freio+Onix'], true, 25, 4.5, NOW(), NOW(), 'cat_discos_freio', 'brand_chev');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_005', 'Disco de Freio Sólido VW Gol', 'disco-de-freio-solido-vw-gol', 'Disco de freio sólido para Volkswagen Gol, fabricado com ferro fundido de alta qualidade. Projetado para oferecer frenagem consistente e durável para uso diário.', 'Diâmetro: 239mm | Espessura: 12mm | Furos: 4 | Material: Ferro Fundido | Acabamento: Retificado', 119.9, 149.9, 68, 'FR-005', '7890000000059', 35, 5, ARRAY['https://placehold.co/600x600/DC2626/ffffff?text=Disco+Freio+Gol'], false, NULL, 3.2, NOW(), NOW(), 'cat_discos_freio', 'brand_vw');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_006', 'Tambor de Freio Traseiro Fiat Palio', 'tambor-de-freio-traseiro-fiat-palio', 'Tambor de freio traseiro original para Fiat Palio. Fabricado em ferro fundido de alta resistência com usinagem de precisão para garantir funcionamento perfeito.', 'Diâmetro: 230mm | Largura: 45mm | Furos: 4 | Material: Ferro Fundido Cinzento', 89.9, 109.9, 50, 'FR-006', '7890000000066', 40, 5, ARRAY['https://placehold.co/600x600/DC2626/ffffff?text=Tambor+Freio+Palio'], false, NULL, 5, NOW(), NOW(), 'cat_tambores', 'brand_fiat');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_007', 'Amortecedor Dianteiro Fiat Palio', 'amortecedor-dianteiro-fiat-palio', 'Amortecedor dianteiro hidráulico de alta performance para Fiat Palio. Proporciona estabilidade e conforto ao dirigir, absorvendo impactos irregulares do solo. Garante melhor aderência dos pneus e segurança nas curvas.', 'Tipo: Hidráulico Pressurizado | Curso: 180mm | Comprimento: 550mm | Garantia: 12 meses | Óleo: Mineral', 189.9, 259.9, 105, 'SU-001', '7890000000073', 25, 5, ARRAY['https://placehold.co/600x600/16A34A/ffffff?text=Amortecedor+Palio'], true, 20, 3.8, NOW(), NOW(), 'cat_amortecedores', 'brand_fiat');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_008', 'Amortecedor Traseiro Chevrolet Onix', 'amortecedor-traseiro-chevrolet-onix', 'Amortecedor traseiro de alta qualidade para Chevrolet Onix. Sistema pressurizado a gás que garante maior estabilidade e conforto. Resistente a altas temperaturas e condições severas de uso.', 'Tipo: Gás Pressurizado | Curso: 165mm | Comprimento: 520mm | Garantia: 12 meses', 169.9, 219.9, 95, 'SU-002', '7890000000080', 20, 5, ARRAY['https://placehold.co/600x600/16A34A/ffffff?text=Amortecedor+Onix'], false, NULL, 3.5, NOW(), NOW(), 'cat_amortecedores', 'brand_chev');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_009', 'Mola Dianteira VW Gol', 'mola-dianteira-vw-gol', 'Mola helicoidal dianteira para Volkswagen Gol. Fabricada em aço silício-cromo de alta resistência, tratada termicamente para evitar fadiga. Proporciona altura correta do veículo e conforto na dirigibilidade.', 'Material: Aço Silício-Cromo | Diâmetro do fio: 12mm | Diâmetro externo: 155mm | Altura livre: 380mm | Carga: 850kg', 149.9, 189.9, 82, 'SU-003', '7890000000097', 30, 5, ARRAY['https://placehold.co/600x600/16A34A/ffffff?text=Mola+Gol'], false, NULL, 2.8, NOW(), NOW(), 'cat_molas', 'brand_vw');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_010', 'Kit de Buchas de Suspensão Ford Ka', 'kit-de-buchas-de-suspensao-ford-ka', 'Kit completo de buchas de suspensão para Ford Ka. Conjunto com 8 peças em poliuretano de alta densidade, resistente a deformações e intempéries. Recupera a dirigibilidade original do veículo eliminando folgas e ruídos.', 'Material: Poliuretano 90A | Quantidade: 8 peças | Aplicação: Dianteira e Traseira | Cor: Azul', 69.9, 89.9, 35, 'SU-004', '7890000000103', 45, 10, ARRAY['https://placehold.co/600x600/16A34A/ffffff?text=Buchas+Suspensao+Ka'], false, NULL, 0.8, NOW(), NOW(), 'cat_buchas', 'brand_ford');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_011', 'Biela Forjada VW Gol 1.6', 'biela-forjada-vw-gol-1-6', 'Biela forjada de alta resistência para motor Volkswagen AP 1.6. Produzida em aço forjado com tratamento térmico, ideal para veículos originais e preparados. Suporta altas rotações e temperatura elevada do motor.', 'Material: Aço Forjado 4340 | Comprimento: 145mm | Peso: 620g | Diâmetro do pistão: 21mm | Diâmetro da manivela: 45mm', 189.9, 249.9, 110, 'MO-001', '7890000000110', 15, 3, ARRAY['https://placehold.co/600x600/2563EB/ffffff?text=Biela+Forjada+Gol'], false, NULL, 0.6, NOW(), NOW(), 'cat_bielas', 'brand_vw');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_012', 'Jogo de Pistões Fiat 1.0 Fire', 'jogo-de-pistoes-fiat-1-0-fire', 'Jogo de pistões para motor Fiat 1.0 Fire com 4 unidades. Fabricados em liga de alumínio silício de alta resistência, com anéis cromados. Projetados para suportar altas temperaturas e proporcionar vedação perfeita.', 'Material: Liga Al-Si | Quantidade: 4 unidades | Diâmetro: 70.8mm | Altura de compressão: 32mm | Anéis: 3 cromados', 299.9, 399.9, 175, 'MO-002', '7890000000127', 10, 3, ARRAY['https://placehold.co/600x600/2563EB/ffffff?text=Pistoes+Fiat+Fire'], false, NULL, 1.5, NOW(), NOW(), 'cat_pistoes', 'brand_fiat');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_013', 'Jogo de Válvulas Chevrolet Onix 1.0', 'jogo-de-valvulas-chevrolet-onix-1-0', 'Jogo completo de válvulas de admissão e escape para Chevrolet Onix 1.0. Fabricadas em aço inoxidável com tratamento térmico de têmpera. Garantem vedação perfeita e durabilidade prolongada.', 'Material: Aço Inoxidável | Quantidade: 8 válvulas (4 admissão + 4 escape) | Diâmetro haste: 6mm | Comprimento: 98mm', 129.9, 169.9, 72, 'MO-003', '7890000000134', 12, 3, ARRAY['https://placehold.co/600x600/2563EB/ffffff?text=Valvulas+Onix'], false, NULL, 0.7, NOW(), NOW(), 'cat_valvulas', 'brand_chev');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_014', 'Bateria Moura 60AH Chevrolet Onix', 'bateria-moura-60ah-chevrolet-onix', 'Bateria automotiva Moura 60AH de alta performance para Chevrolet Onix. Tecnologia a cálcio que proporciona maior vida útil e partidas mais rápidas. Isenta de manutenção e com garantia do fabricante.', 'Capacidade: 60Ah | Tensão: 12V | CCA (SAE): 520A | Tipo: Estacionária | Peso: 14.5kg | Bivolt', 399.9, 499.9, 250, 'EL-001', '7890000000141', 20, 5, ARRAY['https://placehold.co/600x600/D97706/ffffff?text=Bateria+Moura+60AH'], true, 15, 14.5, NOW(), NOW(), 'cat_baterias', 'brand_chev');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_015', 'Alternador VW Gol 1.0', 'alternador-vw-gol-1-0', 'Alternador original para Volkswagen Gol 1.0 com 90A de potência. Fornece carga estável para a bateria e alimenta todos os sistemas elétricos do veículo. Regulador de tensão integrado e rolamentos de alta durabilidade.', 'Tensão: 12V | Corrente: 90A | Polias: 6 canais | Rotação máxima: 18000 RPM | Peso: 5.2kg', 549.9, 699.9, 320, 'EL-002', '7890000000158', 8, 3, ARRAY['https://placehold.co/600x600/D97706/ffffff?text=Alternador+Gol'], false, NULL, 5.2, NOW(), NOW(), 'cat_alternadores', 'brand_vw');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_016', 'Motor de Partida Fiat Palio 1.0', 'motor-de-partida-fiat-palio-1-0', 'Motor de partida elétrico para Fiat Palio 1.0, 12V com 1.4kW de potência. Proporciona partidas rápidas e confiáveis mesmo em baixas temperaturas. Bobinagem de cobre puro e escovas de longa duração.', 'Tensão: 12V | Potência: 1.4kW | Número de dentes: 9 | Sentido: Horário | Peso: 3.8kg', 329.9, 429.9, 190, 'EL-003', '7890000000165', 12, 3, ARRAY['https://placehold.co/600x600/D97706/ffffff?text=Motor+Partida+Palio'], false, NULL, 3.8, NOW(), NOW(), 'cat_motores_partida', 'brand_fiat');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_017', 'Kit Embreagem Completo Ford Ka 1.0', 'kit-embreagem-completo-ford-ka-1-0', 'Kit embreagem completo para Ford Ka 1.0 contendo platô, disco e rolamento. Fabricado com materiais de alta qualidade para transmissão suave e durável. Ideal para uso urbano com trânsito intenso.', 'Disco: 190mm diâmetro | Platô: Diafragma | Rolamento: Autocompensador | Acompanha: disco, platô e rolamento', 459.9, 699.9, 250, 'TR-001', '7890000000172', 15, 3, ARRAY['https://placehold.co/600x600/7C3AED/ffffff?text=Kit+Embreagem+Ka'], true, 35, 4.2, NOW(), NOW(), 'cat_embreagens', 'brand_ford');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_018', 'Câmbio Manual VW Gol G5', 'cambio-manual-vw-gol-g5', 'Câmbio manual recondicionado 5 marchas para Volkswagen Gol G5. Revisado com peças originais, sincronizadores e rolamentos novos. Relação de marchas original de fábrica, garantindo trocas precisas e suaves.', 'Tipo: Manual 5 marchas + Ré | Relação: 3.818/2.158/1.419/1.029/0.778 | Peso: 35kg | Óleo recomendado: SAE 80W90', 1890, 2490, 1100, 'TR-002', '7890000000189', 5, 2, ARRAY['https://placehold.co/600x600/7C3AED/ffffff?text=Cambio+Gol+G5'], false, NULL, 35, NOW(), NOW(), 'cat_cambios', 'brand_vw');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_019', 'Diferencial Chevrolet Onix 1.4', 'diferencial-chevrolet-onix-1-4', 'Diferencial completo para Chevrolet Onix 1.4. Componente de transmissão responsável pela distribuição de torque entre as rodas. Recondicionado com rolamentos e engrenagens novas, garantindo funcionamento silencioso.', 'Relação: 15x65 (4.333:1) | Peso: 28kg | Aplicação: Onix 1.4 2019-2024 | Torque máx: 180Nm', 1290, 1690, 780, 'TR-003', '7890000000196', 6, 2, ARRAY['https://placehold.co/600x600/7C3AED/ffffff?text=Diferencial+Onix'], false, NULL, 28, NOW(), NOW(), 'cat_diferenciais', 'brand_chev');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_020', 'Radiador Toyota Corolla 2.0', 'radiador-toyota-corolla-2-0', 'Radiador original para Toyota Corolla 2.0 com tanque de alumínio e núcleo de cobre. Alta capacidade de dissipação térmica para manter o motor na temperatura ideal de funcionamento.', 'Material: Alumínio/Cobre | Capacidade: 1.8L | Dimensões: 680x430x32mm | Tipo: Fluxo cruzado | Tampa: 1.1bar', 389.9, 499.9, 220, 'AR-001', '7890000000202', 15, 3, ARRAY['https://placehold.co/600x600/0891B2/ffffff?text=Radiador+Corolla'], false, NULL, 4, NOW(), NOW(), 'cat_radiadores', 'brand_toyota');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_021', 'Bomba d''Água Honda Civic 2.0', 'bomba-dagua-honda-civic-2-0', 'Bomba d''água mecânica para Honda Civic 2.0 com rotor em aço inoxidável. Garante a circulação adequada do líquido de arrefecimento no motor. Rolamento blindado de alta durabilidade com vedação tripla.', 'Tipo: Centrífuga | Rotor: Aço Inoxidável | Polia: 6 canais | Vazão: 180L/min | Peso: 1.2kg', 179.9, 239.9, 100, 'AR-002', '7890000000219', 18, 5, ARRAY['https://placehold.co/600x600/0891B2/ffffff?text=Bomba+Agua+Civic'], false, NULL, 1.2, NOW(), NOW(), 'cat_bombas_dagua', 'brand_honda');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_022', 'Kit Mangueiras Arrefecimento Hyundai HB20', 'kit-mangueiras-arrefecimento-hyundai-hb20', 'Kit completo com 4 mangueiras de arrefecimento para Hyundai HB20. Fabricadas em borracha EPDM de alta resistência térmica. Resistentes a pressão e temperaturas elevadas do sistema de arrefecimento.', 'Material: EPDM | Quantidade: 4 mangueiras | Diâmetros: 32mm, 28mm, 22mm, 16mm | Pressão máx: 2.5bar | Temperatura: -40 a 150°C', 89.9, 119.9, 48, 'AR-003', '7890000000226', 25, 5, ARRAY['https://placehold.co/600x600/0891B2/ffffff?text=Mangueiras+HB20'], false, NULL, 1, NOW(), NOW(), 'cat_mangueiras', 'brand_hyundai');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_023', 'Silencioso Traseiro Nissan Versa', 'silencioso-traseiro-nissan-versa', 'Silencioso traseiro para Nissan Versa, fabricado em aço inoxidável AISI 304. Proporciona redução de ruído do motor sem comprometer o desempenho. Resistente à corrosão e com acabamento escovado.', 'Material: Aço Inox 304 | Comprimento: 900mm | Diâmetro: 120mm | Entrada: 50mm | Saída: 45mm | Peso: 4.5kg', 259.9, 329.9, 148, 'ES-001', '7890000000233', 12, 3, ARRAY['https://placehold.co/600x600/6B7280/ffffff?text=Silencioso+Versa'], false, NULL, 4.5, NOW(), NOW(), 'cat_silenciosos', 'brand_nissan');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_024', 'Catalisador Renault Sandero', 'catalisador-renault-sandero', 'Catalisador automotivo para Renault Sandero, elemento essencial para redução de emissões poluentes. Com substrato cerâmico de alta densidade e revestimento de metais preciosos. Atende às normas CONAMA e PROCONVE.', 'Tipo: Tríplice | Substrato: Cerâmico 400cpsi | Dimensões: 120x100mm | Entrada: 50mm | Saída: 50mm', 589.9, 749.9, 350, 'ES-002', '7890000000240', 8, 2, ARRAY['https://placehold.co/600x600/6B7280/ffffff?text=Catalisador+Sandero'], false, NULL, 3, NOW(), NOW(), 'cat_catalisadores', 'brand_renault');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_025', 'Tubo de Escape VW Gol', 'tubo-de-escape-vw-gol', 'Tubo de escape intermediário para Volkswagen Gol em aço carbono com pintura anticorrosão. Diâmetro original de fábrica para perfeita instalação e fluxo de gases adequado.', 'Material: Aço Carbono | Diâmetro: 45mm | Comprimento: 1200mm | Espessura: 1.5mm | Acabamento: Pintura preta', 129.9, 169.9, 70, 'ES-003', '7890000000257', 20, 5, ARRAY['https://placehold.co/600x600/6B7280/ffffff?text=Tubo+Escape+Gol'], false, NULL, 2.8, NOW(), NOW(), 'cat_tubos', 'brand_vw');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_026', 'Caixa de Direção Jeep Renegade', 'caixa-de-direcao-jeep-renegade', 'Caixa de direção hidráulica recondicionada para Jeep Renegade. Revisada com retentores e vedadores originais, garantindo direção precisa e sem folgas. Testada em bancada de pressão antes da expedição.', 'Tipo: Pinhão e Cremalheira Hidráulica | Curso: 130mm | Pressão: 80bar | Peso: 12kg | Acompanha terminais', 1490, 1990, 890, 'DI-001', '7890000000264', 5, 2, ARRAY['https://placehold.co/600x600/1F2937/ffffff?text=Caixa+Direcao+Renegade'], false, NULL, 12, NOW(), NOW(), 'cat_caixas_direcao', 'brand_jeep');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_027', 'Barra Estabilizadora Dianteira Fiat Palio', 'barra-estabilizadora-dianteira-fiat-palio', 'Barra estabilizadora dianteira para Fiat Palio, fabricada em aço mola temperado. Reduz a rolagem da carroceria em curvas, proporcionando maior estabilidade e segurança. Inclui buchas e suportes de fixação.', 'Material: Aço Mola SAE 5160 | Diâmetro: 22mm | Comprimento: 950mm | Acompanha: 2 buchas + 4 suportes', 89.9, 119.9, 48, 'DI-002', '7890000000271', 22, 5, ARRAY['https://placehold.co/600x600/1F2937/ffffff?text=Barra+Estabilizadora+Palio'], false, NULL, 2.5, NOW(), NOW(), 'cat_barras', 'brand_fiat');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_028', 'Terminal de Direção Ford Ka', 'terminal-de-direcao-ford-ka', 'Terminal de direção externo para Ford Ka, componente essencial para o sistema de direção. Fabricado em aço forjado com rótula de teflon de alta resistência. Garante precisão na dirigibilidade e elimina folgas.', 'Material: Aço Forjado | Rosca: M14x1.5 | Comprimento: 95mm | Peso: 0.4kg | Acompanha porca de fixação', 49.9, 69.9, 25, 'DI-003', '7890000000288', 50, 10, ARRAY['https://placehold.co/600x600/1F2937/ffffff?text=Terminal+Direcao+Ka'], false, NULL, 0.4, NOW(), NOW(), 'cat_terminais', 'brand_ford');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_029', 'Para-choque Dianteiro Hyundai HB20', 'para-choque-dianteiro-hyundai-hb20', 'Para-choque dianteiro original para Hyundai HB20 fabricado em material ABS de alta resistência. Design aerodinâmico e acabamento impecável combinando perfeitamente com o veículo. Inclui grade e molduras dos faróis de neblina.', 'Material: ABS | Cor: Primer (requer pintura) | Dimensões: 1700x500x300mm | Peso: 4.5kg | Acompanha grade', 459.9, 599.9, 280, 'CA-001', '7890000000295', 8, 2, ARRAY['https://placehold.co/600x600/BE185D/ffffff?text=Parachoque+HB20'], true, 15, 4.5, NOW(), NOW(), 'cat_parachoques', 'brand_hyundai');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_030', 'Vidro Para-brisa Toyota Corolla', 'vidro-para-brisa-toyota-corolla', 'Para-brisa laminado original para Toyota Corolla com tecnologia acústica. Vidro de segurança com camada internas de PVB que reduzem o ruído externo. Faixa degradê superior para proteção solar.', 'Tipo: Laminado Acústico | Dimensões: 1450x750mm | Espessura: 5.76mm | Acompanha: moldura e cola PU', 389.9, 499.9, 230, 'CA-002', '7890000000301', 6, 2, ARRAY['https://placehold.co/600x600/BE185D/ffffff?text=Parabrisa+Corolla'], false, NULL, 12, NOW(), NOW(), 'cat_vidros', 'brand_toyota');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_031', 'Retrovisor Elétrico Honda Civic', 'retrovisor-eletrico-honda-civic', 'Retrovisor externo elétrico com seta incorporada para Honda Civic. Acionamento elétrico com função tilt-down na ré. Capa na cor preta, pronta para pintura, com espanto térmico e antiofuscante.', 'Tipo: Elétrico com seta | Acionamento: Motor 12V | Espelho: Convexo térmico | Acompanha: chicote e botão de comando', 259.9, 349.9, 148, 'CA-003', '7890000000318', 10, 3, ARRAY['https://placehold.co/600x600/BE185D/ffffff?text=Retrovisor+Civic'], false, NULL, 1.8, NOW(), NOW(), 'cat_retrovisores', 'brand_honda');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_032', 'Jogo de Tapetes Nissan Versa', 'jogo-de-tapetes-nissan-versa', 'Jogo de tapetes automotivos para Nissan Versa em borracha preta com 4 peças. Antiderrapantes e resistentes à água, perfeitos para proteção do assoalho. Design anatômico com encaixe perfeito nos ganchos originais.', 'Material: Borracha EVA | Quantidade: 4 peças | Cores: Preto | Altura do relevo: 12mm | Antiderrapante: Sim', 89.9, 129.9, 45, 'AC-001', '7890000000325', 35, 10, ARRAY['https://placehold.co/600x600/65A30D/ffffff?text=Tapetes+Versa'], false, NULL, 2, NOW(), NOW(), 'cat_tapetes', 'brand_nissan');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_033', 'Capa de Volante Renault Sandero', 'capa-de-volante-renault-sandero', 'Capa de volante universal em couro sintético perfurado para Renault Sandero. Instalação rápida sem necessidade de costura, com acabamento esportivo. Diâmetro ajustável para volantes de 36 a 40cm.', 'Material: Couro Sintético Perfurado | Diâmetro: 36-40cm | Cor: Preto com costura vermelha | Espessura: 3mm | Instalação: Elástico', 49.9, 69.9, 22, 'AC-002', '7890000000332', 40, 10, ARRAY['https://placehold.co/600x600/65A30D/ffffff?text=Capa+Volante+Sandero'], false, NULL, 0.3, NOW(), NOW(), 'cat_capas', 'brand_renault');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_034', 'Kit de Segurança Automotivo Completo', 'kit-de-seguranca-automotivo-completo', 'Kit de segurança automotivo completo com triângulo, extintor ABC 1kg, macaco tipo tesoura e chave de roda. Atende às exigências do CONTRAN e legislação de trânsito brasileira. Acompanha estojo organizador.', 'Itens: Triângulo refletivo + Extintor ABC 1kg + Macaco tesoura + Chave de roda | Peso total: 3.5kg | Normas: INMETRO/CONTRAN', 39.9, 59.9, 20, 'AC-003', '7890000000349', 60, 15, ARRAY['https://placehold.co/600x600/65A30D/ffffff?text=Kit+Seguranca'], false, NULL, 3.5, NOW(), NOW(), 'cat_kits', 'brand_jeep');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_035', 'Farol Dianteiro Direito Toyota Corolla', 'farol-dianteiro-direito-toyota-corolla', 'Farol dianteiro direito completo para Toyota Corolla com lente em policarbonato. Sistema de iluminação com refletor em LED e projetor de neblina integrado. Lacrado contra umidade e poeira, com regulagem elétrica de altura.', 'Tipo: Full LED | Lente: Policarbonato UV | Tensão: 12V | Potência: 35W | Regulagem: Elétrica | Acompanha: lâmpadas LED e atuador', 589.9, 789.9, 350, 'IL-001', '7890000000356', 6, 2, ARRAY['https://placehold.co/600x600/EAB308/ffffff?text=Farol+Corolla'], true, 20, 3.2, NOW(), NOW(), 'cat_farois', 'brand_toyota');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_036', 'Lanterna Traseira Esquerda Honda Civic', 'lanterna-traseira-esquerda-honda-civic', 'Lanterna traseira esquerda para Honda Civic com lente em policarbonato e LED. Iluminação intensa e moderna com assinatura luminosa característica. Resistente a impactos e intempéries com vedação hermética.', 'Tipo: LED | Lente: Policarbonato | Tensão: 12V | Funções: Freio, seta, ré e lanterna | Peso: 1.5kg', 189.9, 259.9, 105, 'IL-002', '7890000000363', 14, 3, ARRAY['https://placehold.co/600x600/EAB308/ffffff?text=Lanterna+Civic'], false, NULL, 1.5, NOW(), NOW(), 'cat_lanternas', 'brand_honda');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_037', 'Lâmpada LED Farol Alto H7 12V', 'lampada-led-farol-alto-h7-12v', 'Lâmpada LED automotiva soquete H7 para farol alto, 12V com potência equivalente a 100W halógena. Luz branca de 6000K que proporciona visibilidade superior. Sistema de dissipação com cooler para longa vida útil.', 'Soquete: H7 | Tensão: 12V | Potência: 25W (equiv. 100W halógena) | Temperatura: 6000K | Fluxo: 3200 lúmens | Vida útil: 30000h', 49.9, 69.9, 22, 'IL-003', '7890000000370', 100, 20, ARRAY['https://placehold.co/600x600/EAB308/ffffff?text=Lampada+LED+H7'], true, 20, 0.1, NOW(), NOW(), 'cat_lampadas', 'brand_vw');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_038', 'Filtro de Óleo VW Gol 1.0', 'filtro-de-oleo-vw-gol-1-0', 'Filtro de óleo lubrificante para Volkswagen Gol 1.0 com elemento filtrante de alta eficiência. Remove impurezas e partículas do óleo do motor, prolongando sua vida útil. Válvula antirretenção para partidas a seco.', 'Tipo: Rosca M20x1.5 | Diâmetro: 76mm | Altura: 85mm | Vazão: 20L/min | Eficiência: 99% a 20 microns', 35.9, 49.9, 18, 'FI-001', '7890000000387', 100, 20, ARRAY['https://placehold.co/600x600/0F766E/ffffff?text=Filtro+Oleo+Gol'], false, NULL, 0.3, NOW(), NOW(), 'cat_filtros_oleo', 'brand_vw');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_039', 'Filtro de Ar Honda Civic 2.0', 'filtro-de-ar-honda-civic-2-0', 'Filtro de ar do motor para Honda Civic 2.0, elemento de celulose impregnada com resina. Retém partículas de poeira e impurezas garantindo ar limpo para a combustão. Alta capacidade de retenção sem restringir o fluxo de ar.', 'Tipo: Seco | Material: Celulose resinada | Dimensões: 280x200x45mm | Eficiência: 99.5% | Troca recomendada: 10.000km', 49.9, 89.9, 22, 'FI-002', '7890000000394', 40, 10, ARRAY['https://placehold.co/600x600/0F766E/ffffff?text=Filtro+Ar+Civic'], true, 40, 0.4, NOW(), NOW(), 'cat_filtros_ar', 'brand_honda');
INSERT INTO "Product" ("id", "name", "slug", "description", "technicalDescription", "price", "comparePrice", "costPrice", "sku", "barcode", "stock", "stockMin", "images", "featured", "discountPercentage", "weight", "createdAt", "updatedAt", "categoryId", "brandId") VALUES ('prod_040', 'Filtro de Combustível Chevrolet Onix', 'filtro-de-combustivel-chevrolet-onix', 'Filtro de combustível para Chevrolet Onix, montagem externa de fácil substituição. Elemento filtrante de alta capacidade que protege o sistema de injeção contra impurezas. Compatível com gasolina e etanol.', 'Tipo: Montagem externa | Pressão máx: 5bar | Vazão: 120L/h | Conexões: 8mm | Eficiência: 98% a 10 microns', 29.9, 44.9, 14, 'FI-003', '7890000000400', 80, 15, ARRAY['https://placehold.co/600x600/0F766E/ffffff?text=Filtro+Combustivel+Onix'], false, NULL, 0.2, NOW(), NOW(), 'cat_filtros_combustivel', 'brand_chev');

-- COMPATIBLE VEHICLES
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0001', 'Volkswagen', 'Gol', 2013, '1.0', 'prod_001');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0002', 'Volkswagen', 'Gol', 2016, '1.0', 'prod_001');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0003', 'Volkswagen', 'Gol', 2020, '1.0', 'prod_001');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0004', 'Volkswagen', 'Gol', 2013, '1.6', 'prod_001');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0005', 'Volkswagen', 'Gol', 2016, '1.6', 'prod_001');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0006', 'Volkswagen', 'Gol', 2020, '1.6', 'prod_001');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0007', 'Chevrolet', 'Onix', 2019, '1.0', 'prod_002');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0008', 'Chevrolet', 'Onix', 2022, '1.0', 'prod_002');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0009', 'Chevrolet', 'Onix', 2019, '1.4', 'prod_002');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0010', 'Chevrolet', 'Onix', 2022, '1.4', 'prod_002');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0011', 'Fiat', 'Palio', 2011, '1.0', 'prod_003');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0012', 'Fiat', 'Palio', 2015, '1.0', 'prod_003');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0013', 'Fiat', 'Palio', 2018, '1.0', 'prod_003');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0014', 'Fiat', 'Palio', 2011, '1.4', 'prod_003');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0015', 'Fiat', 'Palio', 2015, '1.4', 'prod_003');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0016', 'Fiat', 'Palio', 2018, '1.4', 'prod_003');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0017', 'Chevrolet', 'Onix', 2019, '1.0', 'prod_004');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0018', 'Chevrolet', 'Onix', 2022, '1.0', 'prod_004');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0019', 'Chevrolet', 'Onix', 2019, '1.4', 'prod_004');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0020', 'Chevrolet', 'Onix', 2022, '1.4', 'prod_004');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0021', 'Volkswagen', 'Gol', 2013, '1.0', 'prod_005');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0022', 'Volkswagen', 'Gol', 2016, '1.0', 'prod_005');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0023', 'Volkswagen', 'Gol', 2020, '1.0', 'prod_005');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0024', 'Volkswagen', 'Gol', 2013, '1.6', 'prod_005');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0025', 'Volkswagen', 'Gol', 2016, '1.6', 'prod_005');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0026', 'Volkswagen', 'Gol', 2020, '1.6', 'prod_005');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0027', 'Fiat', 'Palio', 2011, '1.0', 'prod_006');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0028', 'Fiat', 'Palio', 2015, '1.0', 'prod_006');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0029', 'Fiat', 'Palio', 2018, '1.0', 'prod_006');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0030', 'Fiat', 'Palio', 2011, '1.4', 'prod_006');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0031', 'Fiat', 'Palio', 2015, '1.4', 'prod_006');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0032', 'Fiat', 'Palio', 2018, '1.4', 'prod_006');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0033', 'Fiat', 'Palio', 2011, '1.0', 'prod_007');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0034', 'Fiat', 'Palio', 2015, '1.0', 'prod_007');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0035', 'Fiat', 'Palio', 2018, '1.0', 'prod_007');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0036', 'Fiat', 'Palio', 2011, '1.4', 'prod_007');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0037', 'Fiat', 'Palio', 2015, '1.4', 'prod_007');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0038', 'Fiat', 'Palio', 2018, '1.4', 'prod_007');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0039', 'Chevrolet', 'Onix', 2019, '1.0', 'prod_008');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0040', 'Chevrolet', 'Onix', 2022, '1.0', 'prod_008');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0041', 'Chevrolet', 'Onix', 2019, '1.4', 'prod_008');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0042', 'Chevrolet', 'Onix', 2022, '1.4', 'prod_008');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0043', 'Volkswagen', 'Gol', 2013, '1.0', 'prod_009');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0044', 'Volkswagen', 'Gol', 2016, '1.0', 'prod_009');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0045', 'Volkswagen', 'Gol', 2020, '1.0', 'prod_009');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0046', 'Volkswagen', 'Gol', 2013, '1.6', 'prod_009');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0047', 'Volkswagen', 'Gol', 2016, '1.6', 'prod_009');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0048', 'Volkswagen', 'Gol', 2020, '1.6', 'prod_009');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0049', 'Ford', 'Ka', 2014, '1.0', 'prod_010');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0050', 'Ford', 'Ka', 2018, '1.0', 'prod_010');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0051', 'Ford', 'Ka', 2022, '1.0', 'prod_010');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0052', 'Ford', 'Ka', 2014, '1.5', 'prod_010');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0053', 'Ford', 'Ka', 2018, '1.5', 'prod_010');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0054', 'Ford', 'Ka', 2022, '1.5', 'prod_010');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0055', 'Volkswagen', 'Gol', 2013, '1.6', 'prod_011');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0056', 'Volkswagen', 'Gol', 2016, '1.6', 'prod_011');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0057', 'Volkswagen', 'Gol', 2020, '1.6', 'prod_011');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0058', 'Fiat', 'Palio', 2011, '1.0', 'prod_012');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0059', 'Fiat', 'Palio', 2015, '1.0', 'prod_012');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0060', 'Fiat', 'Palio', 2018, '1.0', 'prod_012');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0061', 'Chevrolet', 'Onix', 2019, '1.0', 'prod_013');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0062', 'Chevrolet', 'Onix', 2022, '1.0', 'prod_013');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0063', 'Chevrolet', 'Onix', 2019, '1.0', 'prod_014');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0064', 'Chevrolet', 'Onix', 2022, '1.0', 'prod_014');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0065', 'Chevrolet', 'Onix', 2019, '1.4', 'prod_014');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0066', 'Chevrolet', 'Onix', 2022, '1.4', 'prod_014');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0067', 'Volkswagen', 'Gol', 2013, '1.0', 'prod_015');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0068', 'Volkswagen', 'Gol', 2016, '1.0', 'prod_015');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0069', 'Volkswagen', 'Gol', 2020, '1.0', 'prod_015');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0070', 'Volkswagen', 'Gol', 2013, '1.6', 'prod_015');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0071', 'Volkswagen', 'Gol', 2016, '1.6', 'prod_015');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0072', 'Volkswagen', 'Gol', 2020, '1.6', 'prod_015');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0073', 'Fiat', 'Palio', 2011, '1.0', 'prod_016');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0074', 'Fiat', 'Palio', 2015, '1.0', 'prod_016');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0075', 'Fiat', 'Palio', 2018, '1.0', 'prod_016');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0076', 'Fiat', 'Palio', 2011, '1.4', 'prod_016');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0077', 'Fiat', 'Palio', 2015, '1.4', 'prod_016');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0078', 'Fiat', 'Palio', 2018, '1.4', 'prod_016');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0079', 'Ford', 'Ka', 2014, '1.0', 'prod_017');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0080', 'Ford', 'Ka', 2018, '1.0', 'prod_017');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0081', 'Ford', 'Ka', 2022, '1.0', 'prod_017');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0082', 'Ford', 'Ka', 2014, '1.5', 'prod_017');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0083', 'Ford', 'Ka', 2018, '1.5', 'prod_017');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0084', 'Ford', 'Ka', 2022, '1.5', 'prod_017');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0085', 'Volkswagen', 'Gol', 2013, '1.0', 'prod_018');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0086', 'Volkswagen', 'Gol', 2016, '1.0', 'prod_018');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0087', 'Volkswagen', 'Gol', 2020, '1.0', 'prod_018');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0088', 'Volkswagen', 'Gol', 2013, '1.6', 'prod_018');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0089', 'Volkswagen', 'Gol', 2016, '1.6', 'prod_018');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0090', 'Volkswagen', 'Gol', 2020, '1.6', 'prod_018');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0091', 'Chevrolet', 'Onix', 2019, '1.4', 'prod_019');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0092', 'Chevrolet', 'Onix', 2022, '1.4', 'prod_019');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0093', 'Toyota', 'Corolla', 2020, '2.0', 'prod_020');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0094', 'Toyota', 'Corolla', 2022, '2.0', 'prod_020');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0095', 'Toyota', 'Corolla', 2024, '2.0', 'prod_020');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0096', 'Toyota', 'Corolla', 2020, '1.8', 'prod_020');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0097', 'Toyota', 'Corolla', 2022, '1.8', 'prod_020');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0098', 'Toyota', 'Corolla', 2024, '1.8', 'prod_020');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0099', 'Honda', 'Civic', 2017, '2.0', 'prod_021');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0100', 'Honda', 'Civic', 2021, '2.0', 'prod_021');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0101', 'Honda', 'Civic', 2017, '1.5', 'prod_021');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0102', 'Honda', 'Civic', 2021, '1.5', 'prod_021');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0103', 'Hyundai', 'HB20', 2019, '1.0', 'prod_022');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0104', 'Hyundai', 'HB20', 2023, '1.0', 'prod_022');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0105', 'Hyundai', 'HB20', 2019, '1.6', 'prod_022');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0106', 'Hyundai', 'HB20', 2023, '1.6', 'prod_022');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0107', 'Nissan', 'Versa', 2020, '1.6', 'prod_023');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0108', 'Nissan', 'Versa', 2024, '1.6', 'prod_023');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0109', 'Renault', 'Sandero', 2016, '1.0', 'prod_024');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0110', 'Renault', 'Sandero', 2019, '1.0', 'prod_024');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0111', 'Renault', 'Sandero', 2016, '1.6', 'prod_024');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0112', 'Renault', 'Sandero', 2019, '1.6', 'prod_024');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0113', 'Volkswagen', 'Gol', 2013, '1.0', 'prod_025');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0114', 'Volkswagen', 'Gol', 2016, '1.0', 'prod_025');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0115', 'Volkswagen', 'Gol', 2020, '1.0', 'prod_025');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0116', 'Volkswagen', 'Gol', 2013, '1.6', 'prod_025');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0117', 'Volkswagen', 'Gol', 2016, '1.6', 'prod_025');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0118', 'Volkswagen', 'Gol', 2020, '1.6', 'prod_025');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0119', 'Jeep', 'Renegade', 2018, '1.8', 'prod_026');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0120', 'Jeep', 'Renegade', 2022, '1.8', 'prod_026');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0121', 'Jeep', 'Compass', 2018, '2.0', 'prod_026');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0122', 'Jeep', 'Compass', 2022, '2.0', 'prod_026');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0123', 'Fiat', 'Palio', 2011, '1.0', 'prod_027');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0124', 'Fiat', 'Palio', 2015, '1.0', 'prod_027');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0125', 'Fiat', 'Palio', 2018, '1.0', 'prod_027');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0126', 'Fiat', 'Palio', 2011, '1.4', 'prod_027');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0127', 'Fiat', 'Palio', 2015, '1.4', 'prod_027');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0128', 'Fiat', 'Palio', 2018, '1.4', 'prod_027');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0129', 'Ford', 'Ka', 2014, '1.0', 'prod_028');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0130', 'Ford', 'Ka', 2018, '1.0', 'prod_028');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0131', 'Ford', 'Ka', 2022, '1.0', 'prod_028');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0132', 'Ford', 'Ka', 2014, '1.5', 'prod_028');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0133', 'Ford', 'Ka', 2018, '1.5', 'prod_028');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0134', 'Ford', 'Ka', 2022, '1.5', 'prod_028');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0135', 'Hyundai', 'HB20', 2019, '1.0', 'prod_029');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0136', 'Hyundai', 'HB20', 2023, '1.0', 'prod_029');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0137', 'Hyundai', 'HB20', 2019, '1.6', 'prod_029');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0138', 'Hyundai', 'HB20', 2023, '1.6', 'prod_029');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0139', 'Toyota', 'Corolla', 2020, '2.0', 'prod_030');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0140', 'Toyota', 'Corolla', 2022, '2.0', 'prod_030');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0141', 'Toyota', 'Corolla', 2024, '2.0', 'prod_030');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0142', 'Toyota', 'Corolla', 2020, '1.8', 'prod_030');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0143', 'Toyota', 'Corolla', 2022, '1.8', 'prod_030');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0144', 'Toyota', 'Corolla', 2024, '1.8', 'prod_030');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0145', 'Honda', 'Civic', 2017, '2.0', 'prod_031');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0146', 'Honda', 'Civic', 2021, '2.0', 'prod_031');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0147', 'Honda', 'Civic', 2017, '1.5', 'prod_031');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0148', 'Honda', 'Civic', 2021, '1.5', 'prod_031');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0149', 'Nissan', 'Versa', 2020, '1.6', 'prod_032');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0150', 'Nissan', 'Versa', 2024, '1.6', 'prod_032');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0151', 'Renault', 'Sandero', 2016, '1.0', 'prod_033');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0152', 'Renault', 'Sandero', 2019, '1.0', 'prod_033');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0153', 'Renault', 'Sandero', 2016, '1.6', 'prod_033');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0154', 'Renault', 'Sandero', 2019, '1.6', 'prod_033');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0155', 'Jeep', 'Renegade', 2018, '1.8', 'prod_034');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0156', 'Jeep', 'Renegade', 2022, '1.8', 'prod_034');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0157', 'Jeep', 'Compass', 2018, '2.0', 'prod_034');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0158', 'Jeep', 'Compass', 2022, '2.0', 'prod_034');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0159', 'Toyota', 'Corolla', 2020, '2.0', 'prod_035');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0160', 'Toyota', 'Corolla', 2022, '2.0', 'prod_035');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0161', 'Toyota', 'Corolla', 2024, '2.0', 'prod_035');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0162', 'Toyota', 'Corolla', 2020, '1.8', 'prod_035');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0163', 'Toyota', 'Corolla', 2022, '1.8', 'prod_035');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0164', 'Toyota', 'Corolla', 2024, '1.8', 'prod_035');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0165', 'Honda', 'Civic', 2017, '2.0', 'prod_036');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0166', 'Honda', 'Civic', 2021, '2.0', 'prod_036');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0167', 'Honda', 'Civic', 2017, '1.5', 'prod_036');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0168', 'Honda', 'Civic', 2021, '1.5', 'prod_036');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0169', 'Volkswagen', 'Gol', 2013, '1.0', 'prod_037');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0170', 'Volkswagen', 'Gol', 2016, '1.0', 'prod_037');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0171', 'Volkswagen', 'Gol', 2020, '1.0', 'prod_037');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0172', 'Volkswagen', 'Gol', 2013, '1.6', 'prod_037');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0173', 'Volkswagen', 'Gol', 2016, '1.6', 'prod_037');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0174', 'Volkswagen', 'Gol', 2020, '1.6', 'prod_037');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0175', 'Chevrolet', 'Onix', 2019, '1.0', 'prod_037');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0176', 'Chevrolet', 'Onix', 2022, '1.0', 'prod_037');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0177', 'Chevrolet', 'Onix', 2019, '1.4', 'prod_037');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0178', 'Chevrolet', 'Onix', 2022, '1.4', 'prod_037');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0179', 'Fiat', 'Palio', 2011, '1.0', 'prod_037');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0180', 'Fiat', 'Palio', 2015, '1.0', 'prod_037');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0181', 'Fiat', 'Palio', 2018, '1.0', 'prod_037');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0182', 'Fiat', 'Palio', 2011, '1.4', 'prod_037');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0183', 'Fiat', 'Palio', 2015, '1.4', 'prod_037');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0184', 'Fiat', 'Palio', 2018, '1.4', 'prod_037');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0185', 'Volkswagen', 'Gol', 2013, '1.0', 'prod_038');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0186', 'Volkswagen', 'Gol', 2016, '1.0', 'prod_038');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0187', 'Volkswagen', 'Gol', 2020, '1.0', 'prod_038');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0188', 'Volkswagen', 'Gol', 2013, '1.6', 'prod_038');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0189', 'Volkswagen', 'Gol', 2016, '1.6', 'prod_038');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0190', 'Volkswagen', 'Gol', 2020, '1.6', 'prod_038');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0191', 'Honda', 'Civic', 2017, '2.0', 'prod_039');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0192', 'Honda', 'Civic', 2021, '2.0', 'prod_039');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0193', 'Honda', 'Civic', 2017, '1.5', 'prod_039');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0194', 'Honda', 'Civic', 2021, '1.5', 'prod_039');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0195', 'Chevrolet', 'Onix', 2019, '1.0', 'prod_040');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0196', 'Chevrolet', 'Onix', 2022, '1.0', 'prod_040');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0197', 'Chevrolet', 'Onix', 2019, '1.4', 'prod_040');
INSERT INTO "CompatibleVehicle" ("id", "brand", "model", "year", "engine", "productId") VALUES ('vhcl_0198', 'Chevrolet', 'Onix', 2022, '1.4', 'prod_040');

-- COUPONS
INSERT INTO "Coupon" ("id", "code", "discount", "discountType", "minValue", "maxUses", "usedCount", "expiresAt", "isActive", "createdAt") VALUES ('coup_bemvindo10', 'BEMVINDO10', 10, 'PERCENTAGE', 100, 100, 0, NULL, true, NOW());
INSERT INTO "Coupon" ("id", "code", "discount", "discountType", "minValue", "maxUses", "usedCount", "expiresAt", "isActive", "createdAt") VALUES ('coup_fretegratis', 'FRETEGRATIS', 30, 'FIXED', 200, 50, 0, NULL, true, NOW());
INSERT INTO "Coupon" ("id", "code", "discount", "discountType", "minValue", "maxUses", "usedCount", "expiresAt", "isActive", "createdAt") VALUES ('coup_pecas20', 'PECAS20', 20, 'PERCENTAGE', 150, 30, 0, NULL, true, NOW());

-- BANNERS
INSERT INTO "Banner" ("id", "title", "subtitle", "image", "link", "isActive", "order", "createdAt", "updatedAt") VALUES ('bnr_001', 'PEÇAS ORIGINAIS COM GARANTIA', 'Qualidade e procedência que você pode confiar. Todas as peças com garantia de fábrica.', 'https://placehold.co/1920x600/1F2937/ffffff?text=Pecas+Originais+Com+Garantia', '/produtos', true, 1, NOW(), NOW());
INSERT INTO "Banner" ("id", "title", "subtitle", "image", "link", "isActive", "order", "createdAt", "updatedAt") VALUES ('bnr_002', 'FRETE GRÁTIS PARA TODO BRASIL', 'Aproveite o frete grátis em compras acima de R$ 200,00 para todo o território nacional.', 'https://placehold.co/1920x600/003366/ffffff?text=Frete+Gratis+Para+Todo+Brasil', '/ofertas', true, 2, NOW(), NOW());
INSERT INTO "Banner" ("id", "title", "subtitle", "image", "link", "isActive", "order", "createdAt", "updatedAt") VALUES ('bnr_003', 'ATÉ 40% OFF EM PEÇAS DE FREIO', 'Pastilhas, discos e tambores com descontos imperdíveis. Renove seu sistema de freios agora!', 'https://placehold.co/1920x600/DC2626/ffffff?text=40+Off+Pecas+de+Freio', '/categorias/freio', true, 3, NOW(), NOW());

-- REVIEWS
INSERT INTO "Review" ("id", "productId", "userId", "rating", "comment", "createdAt") VALUES ('rev_001', 'prod_001', 'user_client', 5, 'Excelente pastilha de freio! Instalei no meu Gol G7 2018 e o desempenho de frenagem melhorou muito. Superou minhas expectativas, freio macio e progressivo. Recomendo a todos.', NOW());
INSERT INTO "Review" ("id", "productId", "userId", "rating", "comment", "createdAt") VALUES ('rev_002', 'prod_004', 'user_client', 5, 'Disco de freio de altíssima qualidade. Chegou bem embalado e no prazo. Instalei no meu Onix e está funcionando perfeitamente, sem barulhos ou vibrações.', NOW());
INSERT INTO "Review" ("id", "productId", "userId", "rating", "comment", "createdAt") VALUES ('rev_003', 'prod_007', 'user_client', 4, 'Bom produto, entregou o que promete. O carro ficou mais estável nas curvas e o conforto ao dirigir melhorou. Apenas achei a instalação um pouco trabalhosa.', NOW());
INSERT INTO "Review" ("id", "productId", "userId", "rating", "comment", "createdAt") VALUES ('rev_004', 'prod_014', 'user_client', 5, 'Bateria original Moura, funcionando perfeitamente. Instalação fácil e rápida. Partidas mais fortes e sem sinais de fraqueza. Valeu cada centavo.', NOW());
INSERT INTO "Review" ("id", "productId", "userId", "rating", "comment", "createdAt") VALUES ('rev_005', 'prod_035', 'user_client', 4, 'Farol de boa qualidade, encaixe perfeito no Corolla 2022. Iluminação muito superior à original. Apenas demorou um pouco pra chegar, mas veio bem embalado.', NOW());
INSERT INTO "Review" ("id", "productId", "userId", "rating", "comment", "createdAt") VALUES ('rev_006', 'prod_039', 'user_client', 5, 'Filtro de ar original, encaixe perfeito. Preço muito bom comparado à concorrência. Comprei dois para garantir a troca na próxima revisão.', NOW());

-- ORDERS
INSERT INTO "Order" ("id", "userId", "total", "subtotal", "shipping", "discount", "status", "paymentMethod", "paymentStatus", "shippingAddressId", "couponId", "createdAt", "updatedAt") VALUES ('ord_001', 'user_client', 315.60, 295.60, 20.00, 0, 'CONFIRMED', 'PIX', 'PAID', 'addr_001', NULL, NOW(), NOW());
INSERT INTO "OrderItem" ("id", "orderId", "productId", "quantity", "price") VALUES ('oi_001', 'ord_001', 'prod_001', 2, 89.90);
INSERT INTO "OrderItem" ("id", "orderId", "productId", "quantity", "price") VALUES ('oi_002', 'ord_001', 'prod_038', 1, 35.90);
INSERT INTO "OrderItem" ("id", "orderId", "productId", "quantity", "price") VALUES ('oi_003', 'ord_001', 'prod_002', 1, 79.90);
INSERT INTO "Order" ("id", "userId", "total", "subtotal", "shipping", "discount", "status", "paymentMethod", "paymentStatus", "shippingAddressId", "couponId", "createdAt", "updatedAt") VALUES ('ord_002', 'user_client', 379.73, 399.70, 20.00, 39.97, 'PREPARING', 'CREDIT_CARD', 'PAID', 'addr_001', 'coup_bemvindo10', NOW(), NOW());
INSERT INTO "OrderItem" ("id", "orderId", "productId", "quantity", "price") VALUES ('oi_004', 'ord_002', 'prod_004', 2, 159.90);
INSERT INTO "OrderItem" ("id", "orderId", "productId", "quantity", "price") VALUES ('oi_005', 'ord_002', 'prod_002', 1, 79.90);
INSERT INTO "Order" ("id", "userId", "total", "subtotal", "shipping", "discount", "status", "paymentMethod", "paymentStatus", "shippingAddressId", "couponId", "createdAt", "updatedAt") VALUES ('ord_003', 'user_client', 514.70, 529.70, 15.00, 30.00, 'DELIVERED', 'BOLETO', 'PAID', 'addr_001', 'coup_fretegratis', NOW(), NOW());
INSERT INTO "OrderItem" ("id", "orderId", "productId", "quantity", "price") VALUES ('oi_006', 'ord_003', 'prod_007', 1, 189.90);
INSERT INTO "OrderItem" ("id", "orderId", "productId", "quantity", "price") VALUES ('oi_007', 'ord_003', 'prod_008', 2, 169.90);

-- ============================================================
-- END OF SCRIPT
-- ============================================================
