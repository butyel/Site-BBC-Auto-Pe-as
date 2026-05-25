import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { code, orderTotal } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: "Código do cupom é obrigatório" },
        { status: 400 }
      );
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon) {
      return NextResponse.json(
        { error: "Cupom não encontrado" },
        { status: 404 }
      );
    }

    if (!coupon.isActive) {
      return NextResponse.json(
        { error: "Este cupom não está mais ativo" },
        { status: 400 }
      );
    }

    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      return NextResponse.json(
        { error: "Este cupom expirou" },
        { status: 400 }
      );
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json(
        { error: "Este cupom atingiu o número máximo de usos" },
        { status: 400 }
      );
    }

    const total = orderTotal ? parseFloat(orderTotal) : 0;

    if (coupon.minValue && total < Number(coupon.minValue)) {
      return NextResponse.json(
        {
          error: `Valor mínimo de R$ ${Number(coupon.minValue).toFixed(2)} não atingido`,
          minValue: Number(coupon.minValue),
        },
        { status: 400 }
      );
    }

    let discountAmount = 0;
    if (coupon.discountType === "PERCENTAGE") {
      discountAmount = total * (Number(coupon.discount) / 100);
    } else {
      discountAmount = Number(coupon.discount);
    }

    return NextResponse.json({
      valid: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        discount: Number(coupon.discount),
        discountType: coupon.discountType,
        minValue: coupon.minValue ? Number(coupon.minValue) : null,
      },
      discountAmount,
      totalWithDiscount: Math.max(0, total - discountAmount),
    });
  } catch (error) {
    console.error("Coupon validate error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
