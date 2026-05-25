"use client";

import { useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Zap,
  MessageCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  Minus,
  Plus,
  ChevronLeft,
  Check,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useToast } from "@/hooks/useToast";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import type { Product, CompatibleVehicle } from "@/types";

const productImages = [
  null, null, null, null,
];

const compatibleVehicles: CompatibleVehicle[] = [
  { id: "1", brand: "Volkswagen", model: "Gol", year: 2020, engine: "1.0", productId: "1" },
  { id: "2", brand: "Volkswagen", model: "Gol", year: 2021, engine: "1.0", productId: "1" },
  { id: "3", brand: "Fiat", model: "Uno", year: 2020, engine: "1.0", productId: "1" },
  { id: "4", brand: "Chevrolet", model: "Onix", year: 2020, engine: "1.0", productId: "1" },
  { id: "5", brand: "Ford", model: "Ka", year: 2021, engine: "1.0", productId: "1" },
  { id: "6", brand: "Renault", model: "Kwid", year: 2020, engine: "1.0", productId: "1" },
  { id: "7", brand: "Hyundai", model: "HB20", year: 2021, engine: "1.0", productId: "1" },
  { id: "8", brand: "Toyota", model: "Corolla", year: 2022, engine: "2.0", productId: "1" },
];

const relatedProducts = [
  {
    id: "2", name: "Pastilha de Freio Traseira", slug: "pastilha-freio-traseira", price: 79.9,
    comparePrice: 129.9, image: null, brand: "Bosch", installments: 12,
  },
  {
    id: "3", name: "Disco de Freio Ventilado", slug: "disco-freio-ventilado", price: 159.9,
    comparePrice: 219.9, image: null, brand: "TRW", installments: 12,
  },
  {
    id: "4", name: "Cilindro Mestre de Freio", slug: "cilindro-mestre-freio", price: 189.9,
    comparePrice: 259.9, image: null, brand: "TRW", installments: 12,
  },
  {
    id: "5", name: "Fluido de Freio DOT 4", slug: "fluido-freio-dot4", price: 19.9,
    comparePrice: null, image: null, brand: "Bosch", installments: 3,
  },
];

const tabs = [
  { id: "description", label: "Descrição Técnica" },
  { id: "vehicles", label: "Veículos Compatíveis" },
  { id: "reviews", label: "Avaliações" },
];

const reviews = [
  { id: 1, name: "Carlos M.", rating: 5, comment: "Produto original, entrega rápida. Recomendo!", date: "10/05/2026" },
  { id: 2, name: "Ana S.", rating: 4, comment: "Bom produto, mas demorou um pouco para chegar.", date: "28/04/2026" },
  { id: 3, name: "Pedro A.", rating: 5, comment: "Exatamente como descrito. Vou comprar mais vezes.", date: "15/04/2026" },
];

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [addedToCart, setAddedToCart] = useState(false);

  const product: Product = {
    id: "1",
    name: "Pastilha de Freio Dianteira",
    slug,
    description:
      "Pastilha de freio dianteira de alta performance, fabricada com material semi-metálico de qualidade superior. Proporciona frenagem eficiente e segura, com baixo nível de ruído e desgaste reduzido. Ideal para uso urbano e rodoviário.",
    technicalDescription:
      "Material: Semi-metálico\nTemperatura de trabalho: -40°C a 500°C\nCoeficiente de atrito: 0.38-0.42\nDureza: 70-90 Shore D\nNormas: ISO/TS 16949, R90\nAplicação: Dianteira\nGarantia: 12 meses contra defeitos de fabricação",
    price: 89.9,
    comparePrice: 149.9,
    costPrice: 45.0,
    sku: "PFD-BOSCH-001",
    barcode: "7891234567890",
    stock: 45,
    stockMin: 5,
    images: [],
    featured: true,
    discountPercentage: 40,
    weight: 1.2,
    createdAt: "2026-01-15",
    updatedAt: "2026-05-20",
    categoryId: "freios",
    brandId: "bosch",
  };

  const discount = calculateDiscount(product.price, product.comparePrice);
  const installmentValue = product.price / 12;
  const isFav = isFavorite(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    showToast("Adicionado ao carrinho!", `${product.name} - ${quantity}x`, "success");
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    window.location.href = "/checkout";
  };

  const handleWhatsApp = () => {
    const text = `Olá! Tenho interesse em: ${product.name} (SKU: ${product.sku}) - ${formatPrice(product.price)}`;
    window.open(
      `https://wa.me/5511999999999?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/loja" className="hover:text-red-600 transition-colors">Loja</Link>
            <span>/</span>
            <Link href="/loja?categoria=freios" className="hover:text-red-600 transition-colors">Freios</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Product Main Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Image Gallery */}
            <div>
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-white/80 flex items-center justify-center text-6xl opacity-40">
                    🚗
                  </div>
                </div>
                <div className="absolute inset-0 group-hover:bg-black/5 transition-colors" />
                {discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-lg">
                    -{discount}%
                  </Badge>
                )}
                <button
                  onClick={() => toggleFavorite(product)}
                  className="absolute top-4 right-4 p-2.5 bg-white/90 rounded-full hover:bg-white shadow-sm transition-all"
                >
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isFav ? "fill-red-500 text-red-500" : "text-gray-600"
                    )}
                  />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {productImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "w-16 h-16 flex-shrink-0 rounded-xl border-2 transition-all overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200",
                      selectedImage === i
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className="w-full h-full flex items-center justify-center text-lg opacity-30">
                      🚗
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs font-medium">
                  Bosch
                </Badge>
                <span className="text-xs text-gray-400">SKU: {product.sku}</span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(12 avaliações)</span>
              </div>

              {/* Price */}
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                {product.comparePrice && (
                  <span className="text-base text-gray-400 line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl lg:text-4xl font-bold text-red-600">
                    {formatPrice(product.price)}
                  </span>
                  {discount > 0 && (
                    <Badge className="bg-green-500 text-white text-sm font-bold px-2.5 py-0.5 rounded-md">
                      Economize {formatPrice(product.comparePrice! - product.price)}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  ou <strong>12x de {formatPrice(installmentValue)}</strong> sem juros
                </p>
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 mt-4">
                {product.stock > 10 ? (
                  <span className="flex items-center gap-1.5 text-sm text-green-600">
                    <Check className="h-4 w-4" />
                    Em estoque ({product.stock} unidades)
                  </span>
                ) : product.stock > 0 ? (
                  <span className="flex items-center gap-1.5 text-sm text-amber-600">
                    <Zap className="h-4 w-4" />
                    Apenas {product.stock} unidades restantes
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm text-red-600">
                    Fora de estoque
                  </span>
                )}
              </div>

              <Separator className="my-4" />

              {/* Quantity + Buttons */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Quantidade:</span>
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 hover:bg-gray-50 transition-colors rounded-l-lg"
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-12 text-center text-sm font-medium border-x border-gray-200 py-2 focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="p-2 hover:bg-gray-50 transition-colors rounded-r-lg"
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleAddToCart}
                    className={cn(
                      "h-12 text-sm font-bold rounded-xl transition-all",
                      addedToCart
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    )}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        ADICIONADO
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        ADICIONAR AO CARRINHO
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    className="h-12 text-sm font-bold rounded-xl bg-graphite hover:bg-black text-white"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    COMPRAR AGORA
                  </Button>
                </div>

                <Button
                  onClick={handleWhatsApp}
                  variant="outline"
                  className="w-full h-12 text-sm font-semibold rounded-xl border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  COMPRAR PELO WHATSAPP
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-3 mt-6 p-4 bg-gray-50 rounded-xl">
                {[
                  { icon: Truck, label: "Frete Grátis", desc: "Acima de R$ 299" },
                  { icon: ShieldCheck, label: "Produto Original", desc: "Garantia inclusa" },
                  { icon: RotateCcw, label: "Troca Fácil", desc: "30 dias" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <item.icon className="h-5 w-5 mx-auto text-red-500" />
                    <p className="text-xs font-semibold text-gray-900 mt-1">{item.label}</p>
                    <p className="text-[10px] text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 sm:px-6 py-3.5 text-sm font-medium transition-colors relative",
                    activeTab === tab.id
                      ? "text-red-600"
                      : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === "description" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="prose prose-sm max-w-none"
              >
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                <h4 className="text-sm font-semibold text-gray-900 mt-4 mb-2">Especificações Técnicas</h4>
                <div className="bg-gray-50 rounded-xl p-4">
                  {product.technicalDescription?.split("\n").map((line, i) => (
                    <div key={i} className="flex items-start gap-2 py-1.5 text-sm border-b border-gray-100 last:border-0">
                      {line.includes(":") ? (
                        <>
                          <span className="font-medium text-gray-900 min-w-[180px]">
                            {line.split(":")[0]}:
                          </span>
                          <span className="text-gray-600">{line.split(":").slice(1).join(":")}</span>
                        </>
                      ) : (
                        <span className="text-gray-600">{line}</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "vehicles" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-sm text-gray-500 mb-4">
                  Este produto é compatível com os seguintes veículos:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {compatibleVehicles.map((v) => (
                    <div
                      key={v.id}
                      className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm"
                    >
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-600">
                        {v.brand[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {v.brand} {v.model}
                        </p>
                        <p className="text-xs text-gray-500">
                          {v.year} {v.engine ? `- ${v.engine}` : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-xs font-bold">
                              {review.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                              <p className="text-xs text-gray-400">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-3.5 w-3.5",
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-8">
                    Nenhuma avaliação ainda. Seja o primeiro a avaliar!
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-10">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">
            Produtos Relacionados
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relProduct) => {
              const relDiscount = calculateDiscount(relProduct.price, relProduct.comparePrice);
              const relInstallment = relProduct.price / relProduct.installments;

              return (
                <motion.div
                  key={relProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-red-100 transition-all duration-300"
                >
                  <Link href={`/produto/${relProduct.slug}`} className="relative block">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center text-2xl opacity-40 group-hover:scale-110 transition-transform">
                        🚗
                      </div>
                    </div>
                    {relDiscount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold">
                        -{relDiscount}%
                      </Badge>
                    )}
                  </Link>
                  <div className="p-3">
                    <span className="text-[11px] text-gray-500 uppercase tracking-wider">{relProduct.brand}</span>
                    <Link href={`/produto/${relProduct.slug}`}>
                      <h3 className="text-sm font-medium text-gray-900 mt-0.5 line-clamp-2 hover:text-red-600 transition-colors">
                        {relProduct.name}
                      </h3>
                    </Link>
                    <div className="mt-2">
                      {relProduct.comparePrice && (
                        <span className="text-xs text-gray-400 line-through">{formatPrice(relProduct.comparePrice)}</span>
                      )}
                      <div className="text-base font-bold text-red-600">{formatPrice(relProduct.price)}</div>
                      <span className="text-xs text-gray-500">
                        {relProduct.installments}x de {formatPrice(relInstallment)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
