import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const categoryId = searchParams.get("categoryId");
    const brandId = searchParams.get("brandId");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const vehicleBrand = searchParams.get("vehicleBrand");
    const vehicleModel = searchParams.get("vehicleModel");
    const vehicleYear = searchParams.get("vehicleYear");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    const where: Prisma.ProductWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { sku: { contains: search, mode: "insensitive" } },
      ];
    }

    if (categoryId) where.categoryId = categoryId;
    if (brandId) where.brandId = brandId;

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (vehicleBrand || vehicleModel || vehicleYear) {
      const vehicleFilter: Prisma.CompatibleVehicleWhereInput = {};
      if (vehicleBrand) vehicleFilter.brand = vehicleBrand;
      if (vehicleModel) vehicleFilter.model = vehicleModel;
      if (vehicleYear) vehicleFilter.year = parseInt(vehicleYear);
      where.compatibleVehicles = { some: vehicleFilter };
    }

    const skip = (page - 1) * limit;

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
    if (sortBy === "price") {
      orderBy = { price: sortOrder as Prisma.SortOrder };
    } else if (sortBy === "name") {
      orderBy = { name: sortOrder as Prisma.SortOrder };
    } else if (sortBy === "createdAt") {
      orderBy = { createdAt: sortOrder as Prisma.SortOrder };
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          brand: true,
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    let slug = body.slug;
    if (!slug) {
      slug = slugify(body.name);
    }

    const existingSlug = await prisma.product.findUnique({ where: { slug } });
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug,
        description: body.description,
        technicalDescription: body.technicalDescription,
        price: parseFloat(body.price),
        comparePrice: body.comparePrice ? parseFloat(body.comparePrice) : null,
        costPrice: body.costPrice ? parseFloat(body.costPrice) : null,
        sku: body.sku,
        barcode: body.barcode,
        stock: parseInt(body.stock) || 0,
        stockMin: parseInt(body.stockMin) || 0,
        images: body.images || [],
        featured: body.featured || false,
        discountPercentage: body.discountPercentage ? parseFloat(body.discountPercentage) : null,
        weight: body.weight ? parseFloat(body.weight) : null,
        categoryId: body.categoryId,
        brandId: body.brandId,
      },
      include: {
        category: true,
        brand: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Products POST error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
