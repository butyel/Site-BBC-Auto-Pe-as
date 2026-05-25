"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowLeft,
  Star,
  HeartOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { formatPrice, calculateDiscount } from "@/lib/utils";

export default function FavoritosPage() {
  const { favorites, removeFavorite } = useFavorites();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const handleAddToCart = (product: (typeof favorites)[0]) => {
    addItem(product);
    setAddedIds((prev) => new Set(prev).add(product.id));
    showToast("Adicionado ao carrinho!", product.name, "success");
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 2000);
  };

  const handleRemove = (productId: string) => {
    removeFavorite(productId);
    showToast("Removido dos favoritos", "", "default");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-bbc transition-colors">Home</Link>
            <span>/</span>
            <Link href="/minhaconta" className="hover:text-bbc transition-colors">Minha Conta</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Favoritos</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2">
            Meus Favoritos
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {favorites.length > 0
              ? `${favorites.length} ${favorites.length === 1 ? "produto salvo" : "produtos salvos"}`
              : "Você ainda não tem favoritos"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {favorites.map((product, i) => {
                const discount = calculateDiscount(product.price, product.comparePrice);
                const installmentValue = product.price / 12;
                const isAdded = addedIds.has(product.id);

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: i * 0.03 }}
                    className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-accent transition-all duration-300"
                  >
                    <Link
                      href={`/produto/${product.slug}`}
                      className="relative block"
                    >
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center text-2xl opacity-40 group-hover:scale-110 transition-transform">
                          🚗
                        </div>
                      </div>
                      {discount > 0 && (
                        <Badge className="absolute top-2 left-2 bg-bbc text-white text-xs font-bold px-2 py-1 rounded-md">
                          -{discount}%
                        </Badge>
                      )}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemove(product.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-accent transition-all shadow-sm"
                      >
                        <Trash2 className="h-4 w-4 text-gray-600 hover:text-bbc-light" />
                      </button>
                    </Link>
                    <div className="p-3">
                      <span className="text-[11px] text-gray-500 uppercase tracking-wider">
                        {typeof product.brand === "object" && product.brand ? product.brand.name : String(product.brand || "Marca")}
                      </span>
                      <Link href={`/produto/${product.slug}`}>
                        <h3 className="text-sm font-medium text-gray-900 mt-0.5 line-clamp-2 hover:text-bbc transition-colors leading-snug">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="mt-2">
                        {product.comparePrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {formatPrice(product.comparePrice)}
                          </span>
                        )}
                        <div className="text-lg font-bold text-bbc">
                          {formatPrice(product.price)}
                        </div>
                        <span className="text-xs text-gray-500">
                          12x de {formatPrice(installmentValue)} sem juros
                        </span>
                      </div>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className={`w-full mt-2 h-9 text-xs font-semibold rounded-lg transition-all ${
                          isAdded
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-bbc hover:bg-bbc-dark"
                        } text-white`}
                      >
                        <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                        {isAdded ? "ADICIONADO" : "ADICIONAR AO CARRINHO"}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartOff className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Nenhum favorito ainda
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Salve seus produtos favoritos para encontrá-los facilmente depois.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <Link href="/loja">
                <Button className="bg-bbc hover:bg-bbc-dark text-white font-semibold text-sm h-10 px-6 rounded-lg">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  VER PRODUTOS
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-6">
          <Link
            href="/minhaconta"
            className="inline-flex items-center gap-1.5 text-sm text-bbc hover:text-bbc-dark font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Minha Conta
          </Link>
        </div>
      </div>
    </div>
  );
}
