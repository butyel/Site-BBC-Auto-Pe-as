import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let config = await prisma.siteConfig.findUnique({
      where: { id: "default" },
    });

    if (!config) {
      config = await prisma.siteConfig.create({ data: { id: "default" } });
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error("SiteConfig GET error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const config = await prisma.siteConfig.upsert({
      where: { id: "default" },
      update: {
        logo: body.logo,
        companyName: body.companyName,
        cnpj: body.cnpj,
        address: body.address,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        phone: body.phone,
        whatsapp: body.whatsapp,
        email: body.email,
        businessHours: body.businessHours,
        saturdayHours: body.saturdayHours,
        facebook: body.facebook,
        instagram: body.instagram,
        blog: body.blog,
      },
      create: {
        id: "default",
        logo: body.logo,
        companyName: body.companyName ?? "BBC AUTO PEÇAS",
        cnpj: body.cnpj ?? "00.319.468/0001-43",
        address: body.address,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        phone: body.phone,
        whatsapp: body.whatsapp,
        email: body.email,
        businessHours: body.businessHours,
        saturdayHours: body.saturdayHours,
        facebook: body.facebook,
        instagram: body.instagram,
        blog: body.blog,
      },
    });

    return NextResponse.json(config);
  } catch (error) {
    console.error("SiteConfig PUT error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
