-- Migration: Add BlogPost model
-- Run this in Supabase SQL Editor

CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "author" TEXT NOT NULL DEFAULT 'Equipe BBC',
    "category" TEXT NOT NULL DEFAULT 'Dicas',
    "readTime" TEXT NOT NULL DEFAULT '5 min',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "BlogPost_slug_key" UNIQUE ("slug")
);

CREATE INDEX "BlogPost_slug_idx" ON "BlogPost"("slug");
CREATE INDEX "BlogPost_category_idx" ON "BlogPost"("category");
CREATE INDEX "BlogPost_published_idx" ON "BlogPost"("published");
CREATE INDEX "BlogPost_createdAt_idx" ON "BlogPost"("createdAt");
