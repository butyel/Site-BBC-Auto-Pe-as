import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

interface CartStore {
  [userId: string]: Array<{ productId: string; quantity: number }>;
}

const carts: CartStore = {};

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ items: [], total: 0 });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ items: [], total: 0 });
    }

    const cartItems = carts[payload.userId] || [];

    if (cartItems.length === 0) {
      return NextResponse.json({ items: [], total: 0 });
    }

    const productIds = cartItems.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { category: true, brand: true },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    const items = cartItems.map((item) => {
      const product = productMap.get(item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        product: product || null,
      };
    });

    const total = items.reduce(
      (acc, item) =>
        acc + (item.product ? Number(item.product.price) * item.quantity : 0),
      0
    );

    return NextResponse.json({ items, total });
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json({ items: [], total: 0 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId || !quantity) {
      return NextResponse.json(
        { error: "productId e quantity são obrigatórios" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    if (!carts[payload.userId]) {
      carts[payload.userId] = [];
    }

    const existingIndex = carts[payload.userId].findIndex(
      (item) => item.productId === productId
    );

    if (existingIndex >= 0) {
      carts[payload.userId][existingIndex].quantity += quantity;
    } else {
      carts[payload.userId].push({ productId, quantity });
    }

    return NextResponse.json(
      { message: "Item adicionado ao carrinho" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Cart POST error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
