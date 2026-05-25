"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  Tag,
  Truck,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  ShoppingBag,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { formatPrice, calculateDiscount } from "@/lib/utils";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    getSubtotal,
    getTotal,
    discount,
    coupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [cep, setCep] = useState("");
  const [shipping, setShipping] = useState<number | null>(null);
  const [shippingLoading, setShippingLoading] = useState(false);

  const subtotal = getSubtotal();
  const total = getTotal();
  const shippingCost = shipping ?? 0;
  const finalTotal = total + shippingCost;
  const installmentValue = finalTotal / 12;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError("Digite um cupom");
      return;
    }
    if (couponCode.toUpperCase() === "BEMVINDO10") {
      applyCoupon({
        id: "1",
        code: "BEMVINDO10",
        discount: 10,
        discountType: "PERCENTAGE",
        minValue: null,
        maxUses: null,
        usedCount: 0,
        expiresAt: null,
        isActive: true,
        createdAt: "2026-01-01",
      });
      setCouponError("");
      setCouponCode("");
    } else if (couponCode.toUpperCase() === "FRETEGRATIS") {
      applyCoupon({
        id: "2",
        code: "FRETEGRATIS",
        discount: shippingCost,
        discountType: "FIXED",
        minValue: null,
        maxUses: null,
        usedCount: 0,
        expiresAt: null,
        isActive: true,
        createdAt: "2026-01-01",
      });
      setCouponError("");
      setCouponCode("");
    } else {
      setCouponError("Cupom inválido");
    }
  };

  const handleCalcShipping = () => {
    const cepClean = cep.replace(/\D/g, "");
    if (cepClean.length !== 8) {
      return;
    }
    setShippingLoading(true);
    setTimeout(() => {
      const value = subtotal > 299 ? 0 : 19.9;
      setShipping(value);
      setShippingLoading(false);
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Seu carrinho está vazio</h1>
            <p className="text-gray-500 mt-2">
              Adicione produtos ao carrinho para realizar sua compra.
            </p>
            <Link href="/loja">
              <Button className="mt-6 bg-bbc hover:bg-bbc-dark text-white font-semibold px-8 h-12 rounded-xl">
                <ArrowLeft className="h-4 w-4 mr-2" />
                VOLTAR AS COMPRAS
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-bbc transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Carrinho</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1">
            Carrinho de Compras
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {items.reduce((acc, item) => acc + item.quantity, 0)} itens no carrinho
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {items.map((item) => {
                const discount = calculateDiscount(item.product.price, item.product.comparePrice);

                return (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-white rounded-xl border border-gray-100 p-4"
                  >
                    <div className="flex gap-4">
                      <Link
                        href={`/produto/${item.product.slug}`}
                        className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                      >
                        <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-xl opacity-40">
                          🚗
                        </div>
                      </Link>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link
                              href={`/produto/${item.product.slug}`}
                              className="text-sm sm:text-base font-medium text-gray-900 hover:text-bbc transition-colors line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-xs text-gray-500 mt-0.5">
                              SKU: {item.product.sku}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-1.5 hover:bg-accent rounded-lg transition-colors flex-shrink-0 ml-2"
                          >
                            <Trash2 className="h-4 w-4 text-gray-400 hover:text-bbc-light" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="p-1.5 hover:bg-gray-50 transition-colors rounded-l-lg"
                            >
                              <Minus className="h-3.5 w-3.5 text-gray-600" />
                            </button>
                            <span className="w-10 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="p-1.5 hover:bg-gray-50 transition-colors rounded-r-lg"
                            >
                              <Plus className="h-3.5 w-3.5 text-gray-600" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-base font-bold text-bbc">
                              {formatPrice(item.product.price * item.quantity)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-xs text-gray-400">
                                {formatPrice(item.product.price)} cada
                              </div>
                            )}
                          </div>
                        </div>

                        {discount > 0 && (
                          <p className="text-xs text-green-600 mt-1">
                            Economia de{" "}
                            {formatPrice(
                              (item.product.comparePrice! - item.product.price) * item.quantity
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <Link
              href="/loja"
              className="inline-flex items-center gap-1.5 text-sm text-bbc hover:text-bbc-dark font-medium mt-2"
            >
              <ArrowLeft className="h-4 w-4" />
              CONTINUAR COMPRANDO
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Resumo do Pedido
              </h3>

              {/* Coupon */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Cupom de desconto
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite o cupom"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError("");
                    }}
                    className="h-10 text-sm flex-1"
                  />
                  <Button
                    onClick={handleApplyCoupon}
                    variant="outline"
                    className="h-10 text-sm border-accent text-bbc hover:bg-accent"
                  >
                    <Percent className="h-4 w-4 mr-1" />
                    APLICAR
                  </Button>
                </div>
                {couponError && (
                  <p className="text-xs text-bbc-light mt-1">{couponError}</p>
                )}
                {coupon && (
                  <div className="flex items-center justify-between mt-2 p-2 bg-green-50 rounded-lg">
                    <span className="text-xs font-medium text-green-700">
                      Cupom {coupon.code} aplicado!
                    </span>
                    <button onClick={removeCoupon}>
                      <Trash2 className="h-3.5 w-3.5 text-green-600" />
                    </button>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              {/* Shipping */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Calcular frete
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value.replace(/\D/g, "").slice(0, 8))}
                    className="h-10 text-sm flex-1"
                    maxLength={8}
                  />
                  <Button
                    onClick={handleCalcShipping}
                    variant="outline"
                    disabled={shippingLoading}
                    className="h-10 text-sm border-gray-300"
                  >
                    <Truck className="h-4 w-4 mr-1" />
                    CALCULAR
                  </Button>
                </div>
                {shipping !== null && (
                  <p className="text-xs text-gray-600 mt-1">
                    {shipping === 0
                      ? "Frete grátis para este CEP!"
                      : `Frete: ${formatPrice(shipping)}`}
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                {shipping !== null && (
                  <div className="flex justify-between text-gray-600">
                    <span>Frete</span>
                    <span>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-bbc">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-2 text-center">
                ou <strong>12x de {formatPrice(installmentValue)}</strong> sem juros
              </p>

              <Link href="/checkout">
                <Button className="w-full mt-4 h-12 bg-bbc hover:bg-bbc-dark text-white font-bold text-sm rounded-xl">
                  FINALIZAR PEDIDO
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>

              <div className="mt-4 space-y-2">
                {[
                  { icon: ShieldCheck, text: "Compra segura" },
                  { icon: CreditCard, text: "Pagamento facilitado" },
                  { icon: Truck, text: "Entrega em todo Brasil" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-xs text-gray-500">
                    <item.icon className="h-3.5 w-3.5 text-green-500" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
