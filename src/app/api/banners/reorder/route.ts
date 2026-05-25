import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { banners } = body;

    if (!Array.isArray(banners)) {
      return NextResponse.json(
        { error: "Formato inválido" },
        { status: 400 }
      );
    }

    await prisma.$transaction(
      banners.map((b: { id: string; order: number }) =>
        prisma.banner.update({
          where: { id: b.id },
          data: { order: b.order },
        })
      )
    );

    return NextResponse.json({ message: "Ordem atualizada com sucesso" });
  } catch (error) {
    console.error("Banners reorder error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
