"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  Headphones,
  CreditCard,
  Star,
  ShoppingCart,
  Heart,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";

interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

const fallbackSlides: BannerSlide[] = [
  {
    id: "1",
    title: "PEÇAS ORIGINAIS E DE ALTA QUALIDADE",
    subtitle: "Garanta o melhor desempenho para seu veículo",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&q=80",
    link: "/loja",
  },
  {
    id: "2",
    title: "FRETE GRÁTIS PARA TODO BRASIL",
    subtitle: "Em compras acima de R$ 299,00",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&q=80",
    link: "/loja",
  },
  {
    id: "3",
    title: "ATÉ 40% OFF EM PEÇAS SELECIONADAS",
    subtitle: "Aproveite as promoções imperdíveis",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80",
    link: "/loja",
  },
];

const categories = [
  {
    name: "Motor",
    slug: "motor",
    icon: "⚙️",
    gradient: "from-red-600 to-red-800",
    count: "246 peças",
  },
  {
    name: "Suspensão",
    slug: "suspensao",
    icon: "🔧",
    gradient: "from-graphite to-gray-700",
    count: "189 peças",
  },
  {
    name: "Freios",
    slug: "freios",
    icon: "🛞",
    gradient: "from-red-700 to-black",
    count: "312 peças",
  },
  {
    name: "Elétrica",
    slug: "eletrica",
    icon: "⚡",
    gradient: "from-graphite to-red-800",
    count: "178 peças",
  },
  {
    name: "Transmissão",
    slug: "transmissao",
    icon: "🔩",
    gradient: "from-black to-gray-800",
    count: "95 peças",
  },
  {
    name: "Arrefecimento",
    slug: "arrefecimento",
    icon: "🌡️",
    gradient: "from-red-800 to-graphite",
    count: "67 peças",
  },
];

const brandLogos = [
  "Bosch", "Delphi", "Valeo", "NGK", "SKF", "Mann+Hummel",
  "Continental", "TRW", "Mahle", "Cofap", "Nakata", "Febi",
];

const reviews = [
  {
    id: 1,
    name: "Carlos Mendes",
    rating: 5,
    comment:
      "Excelente loja! Comprei pastilhas de freio para meu Onix e chegou em 2 dias. Super recomendo!",
    date: "Há 2 semanas",
  },
  {
    id: 2,
    name: "Ana Paula Santos",
    rating: 5,
    comment:
      "Preço imbatível e entrega super rápida. As peças são originais e de alta qualidade.",
    date: "Há 1 mês",
  },
  {
    id: 3,
    name: "Roberto Lima",
    rating: 4,
    comment:
      "Ótimo atendimento! Tirei dúvidas pelo WhatsApp e fui muito bem atendido. Produto de qualidade.",
    date: "Há 3 semanas",
  },
  {
    id: 4,
    name: "Juliana Costa",
    rating: 5,
    comment:
      "Primeira compra e já virei cliente fiel. Frete grátis e produto original por um preço justo.",
    date: "Há 2 dias",
  },
];

const featuredProducts = [
  {
    id: "1",
    name: "Pastilha de Freio Dianteira",
    slug: "pastilha-freio-dianteira",
    price: 89.9,
    comparePrice: 149.9,
    image: null,
    brand: "Bosch",
    installments: 12,
  },
  {
    id: "2",
    name: "Amortecedor Dianteiro",
    slug: "amortecedor-dianteiro",
    price: 199.9,
    comparePrice: 299.9,
    image: null,
    brand: "Cofap",
    installments: 12,
  },
  {
    id: "3",
    name: "Kit Embreagem Completo",
    slug: "kit-embreagem-completo",
    price: 459.9,
    comparePrice: 659.9,
    image: null,
    brand: "Valeo",
    installments: 12,
  },
  {
    id: "4",
    name: "Bateria 60Ah",
    slug: "bateria-60ah",
    price: 329.9,
    comparePrice: null,
    image: null,
    brand: "Bosch",
    installments: 12,
  },
  {
    id: "5",
    name: "Filtro de Óleo",
    slug: "filtro-oleo",
    price: 29.9,
    comparePrice: 49.9,
    image: null,
    brand: "Mann+Hummel",
    installments: 6,
  },
  {
    id: "6",
    name: "Correia Dentada",
    slug: "correia-dentada",
    price: 89.9,
    comparePrice: 139.9,
    image: null,
    brand: "Gates",
    installments: 12,
  },
  {
    id: "7",
    name: "Vela de Ignição",
    slug: "vela-ignicao",
    price: 19.9,
    comparePrice: null,
    image: null,
    brand: "NGK",
    installments: 3,
  },
  {
    id: "8",
    name: "Disco de Freio Ventilado",
    slug: "disco-freio-ventilado",
    price: 159.9,
    comparePrice: 219.9,
    image: null,
    brand: "TRW",
    installments: 12,
  },
];

const bestSellers = [
  {
    id: "9",
    name: "Óleo Motor 5W30",
    slug: "oleo-motor-5w30",
    price: 49.9,
    comparePrice: null,
    image: null,
    brand: "Shell",
    installments: 6,
  },
  {
    id: "10",
    name: "Filtro de Ar",
    slug: "filtro-ar",
    price: 39.9,
    comparePrice: 59.9,
    image: null,
    brand: "Mann+Hummel",
    installments: 6,
  },
  {
    id: "11",
    name: "Jogo de Anéis",
    slug: "jogo-aneis",
    price: 89.9,
    comparePrice: null,
    image: null,
    brand: "Mahle",
    installments: 12,
  },
  {
    id: "12",
    name: "Bomba de Combustível",
    slug: "bomba-combustivel",
    price: 129.9,
    comparePrice: 199.9,
    image: null,
    brand: "Bosch",
    installments: 12,
  },
  {
    id: "13",
    name: "Radiador",
    slug: "radiador",
    price: 299.9,
    comparePrice: 449.9,
    image: null,
    brand: "Mando",
    installments: 12,
  },
  {
    id: "14",
    name: "Cabo de Vela",
    slug: "cabo-vela",
    price: 29.9,
    comparePrice: null,
    image: null,
    brand: "NGK",
    installments: 3,
  },
  {
    id: "15",
    name: "Terminal de Direção",
    slug: "terminal-direcao",
    price: 49.9,
    comparePrice: 79.9,
    image: null,
    brand: "Nakata",
    installments: 6,
  },
  {
    id: "16",
    name: "Sensor de Rotação",
    slug: "sensor-rotacao",
    price: 69.9,
    comparePrice: null,
    image: null,
    brand: "Delphi",
    installments: 12,
  },
];

function ProductCard({
  product,
}: {
  product: (typeof featuredProducts)[0];
}) {
  const discount = calculateDiscount(product.price, product.comparePrice);
  const installmentValue = product.price / product.installments;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-red-100 transition-all duration-300 flex flex-col"
    >
      <Link href={`/produto/${product.slug}`} className="relative">
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center text-3xl opacity-50 group-hover:scale-110 transition-transform">
            🚗
          </div>
        </div>
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{discount}%
          </div>
        )}
        <button className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50">
          <Heart className="h-4 w-4 text-gray-600 hover:text-red-600" />
        </button>
      </Link>
      <div className="p-3 flex flex-col flex-1">
        <span className="text-[11px] text-gray-500 uppercase tracking-wider">
          {product.brand}
        </span>
        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-sm font-medium text-gray-900 mt-0.5 line-clamp-2 hover:text-red-600 transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto pt-2">
          {product.comparePrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
          <div className="text-lg font-bold text-red-600">
            {formatPrice(product.price)}
          </div>
          <span className="text-xs text-gray-500">
            ou {product.installments}x de{" "}
            {formatPrice(installmentValue)} sem juros
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          )}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [slides, setSlides] = useState<BannerSlide[]>(fallbackSlides);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/api/banners")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSlides(
            data.map((b: BannerSlide) => ({
              id: b.id,
              title: b.title,
              subtitle: b.subtitle,
              image: b.image,
              link: b.link || "/loja",
            }))
          );
        }
      })
      .catch(console.error);
  }, []);

  const [selectedMarca, setSelectedMarca] = useState("");
  const [selectedModelo, setSelectedModelo] = useState("");
  const [selectedAno, setSelectedAno] = useState("");

  const marcas = ["Volkswagen", "Fiat", "Chevrolet", "Ford", "Honda", "Toyota", "Renault", "Hyundai"];
  const modelos: Record<string, string[]> = {
    Volkswagen: ["Gol", "Polo", "T-Cross", "Nivus", "Virtus"],
    Fiat: ["Uno", "Mobi", "Strada", "Toro", "Cronos"],
    Chevrolet: ["Onix", "Prisma", "Tracker", "Cruze", "S10"],
    Ford: ["Ka", "EcoSport", "Ranger", "Mustang", "Territory"],
    Honda: ["Civic", "Fit", "HR-V", "City", "CR-V"],
    Toyota: ["Corolla", "Hilux", "Yaris", "SW4", "Etios"],
    Renault: ["Kwid", "Sandero", "Captur", "Duster", "Logan"],
    Hyundai: ["HB20", "Creta", "Tucson", "Santa Fe", "Azera"],
  };
  const anos = Array.from({ length: 26 }, (_, i) => String(2026 - i));

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setNewsletterSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div>
      {/* HERO BANNER */}
      <section className="relative h-[60vh] min-h-[420px] max-h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-opacity duration-700",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-red-900/70" />
            <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -60 }}
                animate={
                  index === currentSlide
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -60 }
                }
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-2xl"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {slide.title}
                </h1>
                <p className="mt-4 text-base sm:text-lg text-gray-200">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <Link href={slide.link || "/loja"}>
                    <Button className="bg-white text-red-600 hover:bg-gray-100 font-bold text-sm px-6 h-11 rounded-lg">
                      COMPRAR AGORA
                    </Button>
                  </Link>
                  <Link href="/loja">
                    <Button
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white/10 font-bold text-sm px-6 h-11 rounded-lg"
                    >
                      VER CATÁLOGO
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      </section>

      {/* BENEFITS BAR */}
      <section className="bg-[#0a0a0a] border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Frete Grátis", desc: "Acima de R$ 299" },
              { icon: ShieldCheck, label: "Produto Original", desc: "100% garantido" },
              { icon: Headphones, label: "Suporte", desc: "Especializado" },
              { icon: CreditCard, label: "Parcele", desc: "Em até 12x" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 text-white"
              >
                <item.icon className="h-6 w-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSCA POR VEÍCULO */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6">
              Encontre peças para seu veículo
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <select
                value={selectedMarca}
                onChange={(e) => {
                  setSelectedMarca(e.target.value);
                  setSelectedModelo("");
                  setSelectedAno("");
                }}
                className="h-11 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Marca</option>
                {marcas.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={selectedModelo}
                onChange={(e) => {
                  setSelectedModelo(e.target.value);
                  setSelectedAno("");
                }}
                disabled={!selectedMarca}
                className="h-11 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              >
                <option value="">Modelo</option>
                {selectedMarca &&
                  modelos[selectedMarca]?.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
              </select>
              <select
                value={selectedAno}
                onChange={(e) => setSelectedAno(e.target.value)}
                disabled={!selectedModelo}
                className="h-11 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              >
                <option value="">Ano</option>
                {anos.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              <Link href={`/loja?veiculo=${selectedMarca}+${selectedModelo}+${selectedAno}`}>
                <Button className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-lg">
                  BUSCAR PEÇAS
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIAS EM DESTAQUE */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Categorias em Destaque
            </h2>
            <p className="text-gray-500 mt-2">
              Navegue pelas nossas categorias de peças
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={`/loja?categoria=${cat.slug}`}
                  className="group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={cn(
                      "h-28 flex items-center justify-center bg-gradient-to-br",
                      cat.gradient
                    )}
                  >
                    <span className="text-4xl group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </span>
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">{cat.count}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUTOS EM OFERTA */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Produtos em Oferta
              </h2>
              <p className="text-gray-500 mt-1">
        Aproveite os melhores descontos
              </p>
            </div>
            <Link
              href="/loja?ofertas=true"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700"
            >
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <div className="overflow-x-auto -mx-4 px-4 pb-2 scrollbar-hide">
            <div className="flex gap-4 min-w-max">
              {featuredProducts.map((product) => (
                <div key={product.id} className="w-[220px] flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 text-center sm:hidden">
            <Link
              href="/loja?ofertas=true"
              className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700"
            >
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROMOÇÃO BANNER */}
      <section className="relative bg-gradient-to-r from-red-700 to-red-900 py-14 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full bg-repeat"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-white/20 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
              PROMOÇÃO ESPECIAL
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              PEÇAS COM ATÉ <span className="text-yellow-300">40% OFF</span>
            </h2>
            <p className="text-lg text-red-100 mt-3 max-w-xl mx-auto">
              Aproveite descontos imperdíveis em peças originais. Estoque
              limitado!
            </p>
            <div className="flex justify-center gap-3 mt-8">
              <Link href="/loja?ofertas=true">
                <Button className="bg-white text-red-700 hover:bg-gray-100 font-bold text-sm px-8 h-12 rounded-lg">
                  VER OFERTAS
                </Button>
              </Link>
              <Link href="/loja">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 font-bold text-sm px-8 h-12 rounded-lg"
                >
                  VER CATÁLOGO
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIS VENDIDOS */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Mais Vendidos
              </h2>
              <p className="text-gray-500 mt-1">
                Os favoritos dos nossos clientes
              </p>
            </div>
            <Link
              href="/loja?mais-vendidos=true"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700"
            >
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/loja?mais-vendidos=true"
              className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700"
            >
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* MARCAS PARCEIRAS */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Marcas Parceiras
            </h2>
            <p className="text-gray-500 mt-1">
              Trabalhamos com as melhores marcas do mercado
            </p>
          </motion.div>
          <div className="overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-6 min-w-max items-center justify-center">
              {brandLogos.map((brand, i) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex-shrink-0 w-32 h-16 bg-white rounded-xl border border-gray-100 flex items-center justify-center hover:shadow-md hover:border-red-100 transition-all cursor-default"
                >
                  <span className="text-sm font-bold text-gray-700">
                    {brand}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AVALIAÇÕES */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              O que nossos clientes dizem
            </h2>
            <p className="text-gray-500 mt-1">
              Avaliações reais de quem comprou conosco
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
              >
                <StarRating rating={review.rating} />
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-50">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-xs font-bold">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {review.name}
                    </p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-[#0a0a0a] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              Cadastre-se e ganhe{" "}
              <span className="text-red-500">10% OFF</span>
            </h2>
            <p className="text-gray-400 mt-3">
              Receba promoções exclusivas, novidades e ofertas especiais no seu
              e-mail.
            </p>
            {newsletterSubmitted ? (
              <div className="mt-6 p-4 bg-green-900/30 border border-green-800 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <Check className="h-5 w-5" />
                  <span className="font-medium">
                    Cadastro realizado com sucesso!
                  </span>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 px-4 rounded-lg border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:ring-red-500"
                />
                <Button
                  type="submit"
                  className="h-12 px-8 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg whitespace-nowrap"
                >
                  CADASTRE-SE
                </Button>
              </form>
            )}
            <p className="text-xs text-gray-500 mt-3">
              Ao se cadastrar, você concorda com nossa Política de Privacidade.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
