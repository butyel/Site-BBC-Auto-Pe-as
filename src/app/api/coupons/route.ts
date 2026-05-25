import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(coupons);
  } catch (error) {
    console.error("Coupons GET error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.code || !body.discount || !body.discountType) {
      return NextResponse.json(
        { error: "Código, desconto e tipo são obrigatórios" },
        { status: 400 }
      );
    }

    const existingCode = await prisma.coupon.findUnique({
      where: { code: body.code },
    });
    if (existingCode) {
      return NextResponse.json(
        { error: "Este código de cupom já existe" },
        { status: 409 }
      );
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: body.code.toUpperCase(),
        discount: parseFloat(body.discount),
        discountType: body.discountType,
        minValue: body.minValue ? parseFloat(body.minValue) : null,
        maxUses: body.maxUses ? parseInt(body.maxUses) : null,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    });

    return NextResponse.json(coupon, { status: 201 });
  } catch (error) {
    console.error("Coupons POST error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
