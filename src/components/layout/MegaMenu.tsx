"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SubCategory {
  name: string;
  slug: string;
}

interface MegaMenuCategory {
  name: string;
  slug: string;
  image?: string;
  subcategories: SubCategory[];
}

interface MegaMenuProps {
  categories: MegaMenuCategory[];
  isOpen: boolean;
  onClose: () => void;
}

const defaultCategories: MegaMenuCategory[] = [
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
      { name: "Bandas Elásticas", slug: "bandas-elasticas" },
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
      { name: "Fluido de Freio", slug: "fluido-freio" },
    ],
  },
  {
    name: "Elétrica",
    slug: "eletrica",
    subcategories: [
      { name: "Baterias", slug: "baterias" },
      { name: "Alternadores", slug: "alternadores" },
      { name: "Motores de Partida", slug: "motores-partida" },
      { name: "Sensores", slug: "sensores" },
      { name: "Faróis e Lanternas", slug: "faris-lanternas" },
    ],
  },
  {
    name: "Transmissão",
    slug: "transmissao",
    subcategories: [
      { name: "Embreagens", slug: "embreagens" },
      { name: "Câmbio", slug: "cambio" },
      { name: "Diferenciais", slug: "diferenciais" },
      { name: "Semieixos", slug: "semieixos" },
    ],
  },
  {
    name: "Escapamento",
    slug: "escapamento",
    subcategories: [
      { name: "Catalisadores", slug: "catalisadores" },
      { name: "Silenciosos", slug: "silenciosos" },
      { name: "Tubos de Escape", slug: "tubos-escape" },
    ],
  },
  {
    name: "Arrefecimento",
    slug: "arrefecimento",
    subcategories: [
      { name: "Radiadores", slug: "radiadores" },
      { name: "Ventoinhas", slug: "ventoinhas" },
      { name: "Válvula Termostática", slug: "valvula-termostatica" },
      { name: "Mangueiras", slug: "mangueiras" },
    ],
  },
  {
    name: "Acessórios",
    slug: "acessorios",
    subcategories: [
      { name: "Óleos e Lubrificantes", slug: "oleos-lubrificantes" },
      { name: "Filtros", slug: "filtros" },
      { name: "Velas de Ignição", slug: "velas-ignicao" },
      { name: "Palhetas", slug: "palhetas" },
    ],
  },
];

export default function MegaMenu({
  categories = defaultCategories,
  isOpen,
  onClose,
}: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute left-0 right-0 top-full z-50 bg-white border-t border-gray-200 shadow-xl"
      onMouseLeave={() => setActiveCategory(null)}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3 border-r border-gray-100">
            <nav className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onMouseEnter={() => setActiveCategory(cat.slug)}
                  onClick={() => {
                    onClose();
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    activeCategory === cat.slug
                      ? "bg-red-50 text-red-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Link href={`/loja?categoria=${cat.slug}`} className="block">
                    {cat.name}
                  </Link>
                </button>
              ))}
            </nav>
          </div>

          <div className="col-span-6">
            {activeCategory ? (
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {categories
                  .find((c) => c.slug === activeCategory)
                  ?.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/loja?categoria=${sub.slug}`}
                      onClick={onClose}
                      className="text-sm text-gray-600 hover:text-red-600 transition-colors py-1"
                    >
                      {sub.name}
                    </Link>
                  ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-gray-400">
                  Passe o mouse sobre uma categoria
                </p>
              </div>
            )}
          </div>

          <div className="col-span-3 bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              Mais Vendidos
            </h4>
            <ul className="space-y-2">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/loja?categoria=${cat.slug}`}
                    onClick={onClose}
                    className="text-sm text-red-600 hover:text-red-700 transition-colors"
                  >
                    Ver {cat.name} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
