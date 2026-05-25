import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.banner.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Banner não encontrado" },
        { status: 404 }
      );
    }

    const data: Record<string, unknown> = {};
    const fields = ["title", "subtitle", "image", "link", "isActive", "order"];
    for (const field of fields) {
      if (body[field] !== undefined) data[field] = body[field];
    }

    const banner = await prisma.banner.update({
      where: { id },
      data,
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.error("Banner PUT error:", error);
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

    const existing = await prisma.banner.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Banner não encontrado" },
        { status: 404 }
      );
    }

    await prisma.banner.delete({ where: { id } });

    return NextResponse.json({ message: "Banner excluído com sucesso" });
  } catch (error) {
    console.error("Banner DELETE error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
