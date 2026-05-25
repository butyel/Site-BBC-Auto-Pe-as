import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.coupon.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Cupom não encontrado" },
        { status: 404 }
      );
    }

    const data: Record<string, unknown> = {};
    const fields = ["code", "discountType", "maxUses", "usedCount", "isActive"];
    for (const field of fields) {
      if (body[field] !== undefined) data[field] = body[field];
    }
    if (body.discount !== undefined) data.discount = parseFloat(body.discount);
    if (body.minValue !== undefined) data.minValue = parseFloat(body.minValue);
    if (body.expiresAt !== undefined) data.expiresAt = new Date(body.expiresAt);
    if (data.code) data.code = String(data.code).toUpperCase();

    const coupon = await prisma.coupon.update({
      where: { id },
      data,
    });

    return NextResponse.json(coupon);
  } catch (error) {
    console.error("Coupon PUT error:", error);
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

    const existing = await prisma.coupon.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Cupom não encontrado" },
        { status: 404 }
      );
    }

    await prisma.coupon.delete({ where: { id } });

    return NextResponse.json({ message: "Cupom excluído com sucesso" });
  } catch (error) {
    console.error("Coupon DELETE error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
