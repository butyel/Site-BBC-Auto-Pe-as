import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        compatibleVehicles: true,
        reviews: {
          include: {
            user: { select: { id: true, name: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Product GET error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    const data: Record<string, unknown> = {};
    const fields = [
      "name", "slug", "description", "technicalDescription", "sku",
      "barcode", "stock", "stockMin", "images", "featured",
      "categoryId", "brandId",
    ];
    for (const field of fields) {
      if (body[field] !== undefined) data[field] = body[field];
    }
    if (body.price !== undefined) data.price = parseFloat(body.price);
    if (body.comparePrice !== undefined) data.comparePrice = parseFloat(body.comparePrice);
    if (body.costPrice !== undefined) data.costPrice = parseFloat(body.costPrice);
    if (body.discountPercentage !== undefined) data.discountPercentage = parseFloat(body.discountPercentage);
    if (body.weight !== undefined) data.weight = parseFloat(body.weight);

    const product = await prisma.product.update({
      where: { id },
      data,
      include: {
        category: true,
        brand: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Product PUT error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    const orderCount = await prisma.orderItem.count({
      where: { productId: id },
    });
    if (orderCount > 0) {
      return NextResponse.json(
        {
          error: `Não é possível excluir este produto, pois ele está vinculado a ${orderCount} pedido(s)`,
        },
        { status: 409 }
      );
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    console.error("Product DELETE error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
