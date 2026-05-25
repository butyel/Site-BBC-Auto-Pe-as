"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  Phone,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import SearchBar from "../shared/SearchBar";

const categories = [
  {
    name: "Motor",
    slug: "motor",
    subcategories: [
      { name: "Pistões e Anéis", slug: "pistoes-aneis" },
      { name: "Bielas", slug: "bielas" },
      { name: "Virabrequim", slug: "virabrequim" },
      { name: "Junta do Motor", slug: "junta-motor" },
      { name: "Correia Dentada", slug: "correia-dentada" },
      { name: "Tuchos e Balancins", slug: "tuchos-balancins" },
    ],
  },
  {
    name: "Suspensão",
    slug: "suspensao",
    subcategories: [
      { name: "Amortecedores", slug: "amortecedores" },
      { name: "Molas", slug: "molas" },
      { name: "Buchas", slug: "buchas" },
      { name: "Terminais", slug: "terminais" },
    ],
  },
  {
    name: "Freios",
    slug: "freios",
    subcategories: [
      { name: "Pastilhas de Freio", slug: "pastilhas-freio" },
      { name: "Discos de Freio", slug: "discos-freio" },
      { name: "Cilindro Mestre", slug: "cilindro-mestre" },
    ],
  },
  {
    name: "Elétrica",
    slug: "eletrica",
    subcategories: [
      { name: "Baterias", slug: "baterias" },
      { name: "Alternadores", slug: "alternadores" },
      { name: "Sensores", slug: "sensores" },
    ],
  },
  {
    name: "Transmissão",
    slug: "transmissao",
    subcategories: [
      { name: "Embreagens", slug: "embreagens" },
      { name: "Câmbio", slug: "cambio" },
      { name: "Diferenciais", slug: "diferenciais" },
    ],
  },
  {
    name: "Escapamento",
    slug: "escapamento",
    subcategories: [
      { name: "Catalisadores", slug: "catalisadores" },
      { name: "Silenciosos", slug: "silenciosos" },
    ],
  },
  {
    name: "Arrefecimento",
    slug: "arrefecimento",
    subcategories: [
      { name: "Radiadores", slug: "radiadores" },
      { name: "Ventoinhas", slug: "ventoinhas" },
    ],
  },
  {
    name: "Acessórios",
    slug: "acessorios",
    subcategories: [
      { name: "Óleos e Lubrificantes", slug: "oleos-lubrificantes" },
      { name: "Filtros", slug: "filtros" },
      { name: "Velas de Ignição", slug: "velas-ignicao" },
    ],
  },
];

export default function Header() {
  const { config } = useSiteConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateCounts = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("bbc-cart") || "[]");
        setCartCount(cart.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0));
        const favorites = JSON.parse(localStorage.getItem("bbc-favorites") || "[]");
        setFavoritesCount(favorites.length);
      } catch {
        setCartCount(0);
        setFavoritesCount(0);
      }
    };
    updateCounts();
    window.addEventListener("storage", updateCounts);
    window.addEventListener("cart-updated", updateCounts);
    window.addEventListener("favorites-updated", updateCounts);
    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("cart-updated", updateCounts);
      window.removeEventListener("favorites-updated", updateCounts);
    };
  }, []);

  const handleCategoriesEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    setIsMegaMenuOpen(true);
  };

  const handleCategoriesLeave = () => {
    megaMenuTimeout.current = setTimeout(() => setIsMegaMenuOpen(false), 150);
  };

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-white transition-shadow duration-200",
        isScrolled && "shadow-md"
      )}
    >
      <div className="hidden lg:block bg-graphite text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 h-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href={`tel:+55${config.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-1.5 hover:text-bbc-light transition-colors"
            >
              <Phone className="h-3 w-3" />
              <span>{config.phone}</span>
            </a>
            <a
              href={`https://wa.me/${config.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-bbc-light transition-colors"
            >
              <span className="text-green-400">WhatsApp</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Frete grátis acima de R$ 299</span>
            <Link
              href="/minhaconta"
              className="flex items-center gap-1.5 hover:text-bbc-light transition-colors"
            >
              <User className="h-3 w-3" />
              <span>Minha Conta</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 lg:h-20 flex items-center justify-between gap-4">
            <button
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link href="/" className="flex-shrink-0">
              {config.logo ? (
                <img
                  src={config.logo}
                  alt={config.companyName}
                  className="h-10 lg:h-12 w-auto object-contain"
                />
              ) : (
                <span className="text-xl lg:text-2xl font-bold tracking-tight">
                  <span className="text-bbc">BBC</span>{" "}
                  <span className="text-graphite">AUTO PEÇAS</span>
                </span>
              )}
            </Link>

            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <SearchBar />
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              <Link
                href="/minhaconta/favoritos"
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors hidden lg:block"
              >
                <Heart className="h-5 w-5 text-gray-700" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-bbc text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {favoritesCount > 9 ? "9+" : favoritesCount}
                  </span>
                )}
              </Link>

              <Link
                href="/minhaconta"
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors hidden lg:block"
              >
                <User className="h-5 w-5 text-gray-700" />
              </Link>

              <Link
                href="/carrinho"
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-bbc text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="hidden lg:block bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-11 flex items-center">
          <div
            ref={categoriesRef}
            className="relative"
            onMouseEnter={handleCategoriesEnter}
            onMouseLeave={handleCategoriesLeave}
          >
            <button className="flex items-center gap-1.5 h-11 px-3 text-sm font-medium text-gray-700 hover:text-bbc transition-colors rounded-t-lg hover:bg-gray-50">
              <Menu className="h-4 w-4" />
              <span>Categorias</span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  isMegaMenuOpen && "rotate-180"
                )}
              />
            </button>
            <div
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleCategoriesLeave}
            >
              <MegaMenu
                categories={categories}
                isOpen={isMegaMenuOpen}
                onClose={() => setIsMegaMenuOpen(false)}
              />
            </div>
          </div>

          <div className="flex items-center gap-1 ml-6">
            {[
              { name: "Ofertas", href: "/loja?ofertas=true" },
              { name: "Lançamentos", href: "/loja?lancamentos=true" },
              { name: "Mais Vendidos", href: "/loja?mais-vendidos=true" },
              { name: "Blog", href: "/blog" },
              { name: "Contato", href: "/contato" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="h-11 flex items-center px-3 text-sm text-gray-600 hover:text-bbc transition-colors rounded-lg hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        categories={categories}
      />
    </header>
  );
}
