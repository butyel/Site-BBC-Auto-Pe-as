"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Search, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMenuCategory {
  name: string;
  slug: string;
  subcategories?: { name: string; slug: string }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories?: MobileMenuCategory[];
}

const defaultCategories: MobileMenuCategory[] = [
  {
    name: "Motor",
    slug: "motor",
    subcategories: [
      { name: "Pistões e Anéis", slug: "pistoes-aneis" },
      { name: "Bielas", slug: "bielas" },
      { name: "Virabrequim", slug: "virabrequim" },
      { name: "Correia Dentada", slug: "correia-dentada" },
    ],
  },
  { name: "Suspensão", slug: "suspensao" },
  { name: "Freios", slug: "freios" },
  { name: "Elétrica", slug: "eletrica" },
  { name: "Transmissão", slug: "transmissao" },
  { name: "Escapamento", slug: "escapamento" },
  { name: "Arrefecimento", slug: "arrefecimento" },
  { name: "Acessórios", slug: "acessorios" },
];

export default function MobileMenu({
  isOpen,
  onClose,
  categories = defaultCategories,
}: MobileMenuProps) {
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setExpandedCat(null);
      setSearchQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="text-lg font-bold text-red-600">
            BBC AUTO PEÇAS
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <Link
              href="/minhaconta"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors mb-4"
            >
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">U</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Minha Conta
                </p>
                <p className="text-xs text-gray-500">Faça login ou cadastre-se</p>
              </div>
            </Link>

            <nav className="space-y-1">
              {categories.map((cat) => (
                <div key={cat.slug}>
                  {cat.subcategories ? (
                    <>
                      <button
                        onClick={() =>
                          setExpandedCat(
                            expandedCat === cat.slug ? null : cat.slug
                          )
                        }
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors",
                          expandedCat === cat.slug
                            ? "bg-red-50 text-red-600 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        {cat.name}
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedCat === cat.slug && "rotate-90"
                          )}
                        />
                      </button>
                      {expandedCat === cat.slug && (
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-red-200 pl-3">
                          <Link
                            href={`/loja?categoria=${cat.slug}`}
                            onClick={onClose}
                            className="block px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg font-medium"
                          >
                            Ver Tudo
                          </Link>
                          {cat.subcategories.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/loja?categoria=${sub.slug}`}
                              onClick={onClose}
                              className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={`/loja?categoria=${cat.slug}`}
                      onClick={onClose}
                      className="block px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-gray-100 p-4 space-y-2">
          <Link
            href="/carrinho"
            onClick={onClose}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <span>🛒</span>
            <span>Meu Carrinho</span>
          </Link>
          <Link
            href="/minhaconta/favoritos"
            onClick={onClose}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <span>♡</span>
            <span>Meus Favoritos</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
