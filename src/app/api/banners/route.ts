import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";

    const where = all ? {} : { isActive: true };

    const banners = await prisma.banner.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return NextResponse.json(banners);
  } catch (error) {
    console.error("Banners GET error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.image) {
      return NextResponse.json(
        { error: "Título e imagem são obrigatórios" },
        { status: 400 }
      );
    }

    const maxOrder = await prisma.banner.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const banner = await prisma.banner.create({
      data: {
        title: body.title,
        subtitle: body.subtitle,
        image: body.image,
        link: body.link,
        isActive: body.isActive !== undefined ? body.isActive : true,
        order: body.order ?? (maxOrder ? maxOrder.order + 1 : 0),
      },
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    console.error("Banners POST error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
