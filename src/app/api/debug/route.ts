import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$connect();
    const userCount = await prisma.user.count();
    const users = await prisma.user.findMany({ select: { email: true, role: true } });
    await prisma.$disconnect();
    return NextResponse.json({
      status: "connected",
      userCount,
      users,
      dbUrl: (process.env.DATABASE_URL || "").replace(/:[^:@]+@/, ":****@"),
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : String(error),
      dbUrl: (process.env.DATABASE_URL || "").replace(/:[^:@]+@/, ":****@"),
    });
  }
}
