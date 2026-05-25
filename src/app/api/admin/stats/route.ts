import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();

    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const [
      totalProducts,
      totalOrders,
      totalCustomers,
      revenueResult,
      ordersByMonth,
      topProductsRaw,
      recentOrders,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.user.count({ where: { role: "CLIENT" } }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: { not: "CANCELLED" } },
      }),
      prisma.order.findMany({
        where: { createdAt: { gte: sixMonthsAgo } },
        select: { total: true, createdAt: true, status: true },
        orderBy: { createdAt: "asc" },
      }),
      prisma.orderItem.groupBy({
        by: ["productId"],
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: "desc" } },
        take: 10,
      }),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, name: true, email: true } },
          items: { include: { product: { select: { name: true } } } },
        },
      }),
    ]);

    const topProductIds = topProductsRaw.map((item) => item.productId);
    const topProductsData = await prisma.product.findMany({
      where: { id: { in: topProductIds } },
      select: { id: true, name: true, price: true },
    });

    const topProductMap = new Map(topProductsData.map((p) => [p.id, p]));

    const topProducts = topProductsRaw
      .map((item) => {
        const product = topProductMap.get(item.productId);
        return product
          ? {
              productId: item.productId,
              name: product.name,
              price: Number(product.price),
              totalSold: item._sum.quantity || 0,
            }
          : null;
      })
      .filter(Boolean);

    const monthlyMap = new Map<string, { count: number; revenue: number }>();

    for (let i = 0; i < 6; i++) {
      const d = new Date(sixMonthsAgo.getFullYear(), sixMonthsAgo.getMonth() + i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      monthlyMap.set(key, { count: 0, revenue: 0 });
    }

    for (const order of ordersByMonth) {
      if (order.status === "CANCELLED") continue;
      const key = `${order.createdAt.getFullYear()}-${String(order.createdAt.getMonth() + 1).padStart(2, "0")}`;
      const existing = monthlyMap.get(key);
      if (existing) {
        existing.count += 1;
        existing.revenue += Number(order.total);
      }
    }

    const ordersByMonthResult = Array.from(monthlyMap.entries()).map(
      ([month, data]) => ({
        month,
        orders: data.count,
        revenue: data.revenue,
      })
    );

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalRevenue: Number(revenueResult._sum.total || 0),
      totalCustomers,
      ordersByMonth: ordersByMonthResult,
      topProducts,
      recentOrders,
    });
  } catch (error) {
    console.error("Admin stats GET error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
