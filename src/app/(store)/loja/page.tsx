"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Grid3X3,
  List,
  Heart,
  ShoppingCart,
  Star,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";

interface ProductData {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice: number | null;
  image: string | null;
  brand: string;
  category: string;
  rating: number;
  installments: number;
  stock: number;
}

const allProducts: ProductData[] = [
  { id: "1", name: "Pastilha de Freio Dianteira", slug: "pastilha-freio-dianteira", price: 89.9, comparePrice: 149.9, image: null, brand: "Bosch", category: "freios", rating: 5, installments: 12, stock: 45 },
  { id: "2", name: "Amortecedor Dianteiro", slug: "amortecedor-dianteiro", price: 199.9, comparePrice: 299.9, image: null, brand: "Cofap", category: "suspensao", rating: 4, installments: 12, stock: 18 },
  { id: "3", name: "Kit Embreagem Completo", slug: "kit-embreagem-completo", price: 459.9, comparePrice: 659.9, image: null, brand: "Valeo", category: "transmissao", rating: 5, installments: 12, stock: 7 },
  { id: "4", name: "Bateria 60Ah", slug: "bateria-60ah", price: 329.9, comparePrice: null, image: null, brand: "Bosch", category: "eletrica", rating: 4, installments: 12, stock: 22 },
  { id: "5", name: "Filtro de Óleo", slug: "filtro-oleo", price: 29.9, comparePrice: 49.9, image: null, brand: "Mann+Hummel", category: "motor", rating: 5, installments: 6, stock: 100 },
  { id: "6", name: "Correia Dentada", slug: "correia-dentada", price: 89.9, comparePrice: 139.9, image: null, brand: "Gates", category: "motor", rating: 4, installments: 12, stock: 35 },
  { id: "7", name: "Vela de Ignição", slug: "vela-ignicao", price: 19.9, comparePrice: null, image: null, brand: "NGK", category: "eletrica", rating: 4, installments: 3, stock: 200 },
  { id: "8", name: "Disco de Freio Ventilado", slug: "disco-freio-ventilado", price: 159.9, comparePrice: 219.9, image: null, brand: "TRW", category: "freios", rating: 5, installments: 12, stock: 15 },
  { id: "9", name: "Óleo Motor 5W30", slug: "oleo-motor-5w30", price: 49.9, comparePrice: null, image: null, brand: "Shell", category: "motor", rating: 5, installments: 6, stock: 80 },
  { id: "10", name: "Filtro de Ar", slug: "filtro-ar", price: 39.9, comparePrice: 59.9, image: null, brand: "Mann+Hummel", category: "motor", rating: 4, installments: 6, stock: 60 },
  { id: "11", name: "Jogo de Anéis", slug: "jogo-aneis", price: 89.9, comparePrice: null, image: null, brand: "Mahle", category: "motor", rating: 4, installments: 12, stock: 25 },
  { id: "12", name: "Bomba de Combustível", slug: "bomba-combustivel", price: 129.9, comparePrice: 199.9, image: null, brand: "Bosch", category: "motor", rating: 4, installments: 12, stock: 12 },
  { id: "13", name: "Radiador", slug: "radiador", price: 299.9, comparePrice: 449.9, image: null, brand: "Mando", category: "arrefecimento", rating: 5, installments: 12, stock: 9 },
  { id: "14", name: "Cabo de Vela", slug: "cabo-vela", price: 29.9, comparePrice: null, image: null, brand: "NGK", category: "eletrica", rating: 4, installments: 3, stock: 90 },
  { id: "15", name: "Terminal de Direção", slug: "terminal-direcao", price: 49.9, comparePrice: 79.9, image: null, brand: "Nakata", category: "suspensao", rating: 4, installments: 6, stock: 40 },
  { id: "16", name: "Sensor de Rotação", slug: "sensor-rotacao", price: 69.9, comparePrice: null, image: null, brand: "Delphi", category: "eletrica", rating: 4, installments: 12, stock: 30 },
  { id: "17", name: "Cilindro Mestre de Freio", slug: "cilindro-mestre-freio", price: 189.9, comparePrice: 259.9, image: null, brand: "TRW", category: "freios", rating: 5, installments: 12, stock: 8 },
  { id: "18", name: "Mola Dianteira", slug: "mola-dianteira", price: 119.9, comparePrice: 179.9, image: null, brand: "Cofap", category: "suspensao", rating: 4, installments: 12, stock: 14 },
  { id: "19", name: "Bieleta de Suspensão", slug: "bieleta-suspensao", price: 39.9, comparePrice: null, image: null, brand: "Nakata", category: "suspensao", rating: 4, installments: 6, stock: 55 },
  { id: "20", name: "Alternador 120A", slug: "alternador-120a", price: 459.9, comparePrice: 599.9, image: null, brand: "Bosch", category: "eletrica", rating: 5, installments: 12, stock: 6 },
  { id: "21", name: "Filtro de Combustível", slug: "filtro-combustivel", price: 34.9, comparePrice: null, image: null, brand: "Mann+Hummel", category: "motor", rating: 4, installments: 6, stock: 70 },
  { id: "22", name: "Kit Correia Dentada", slug: "kit-correia-dentada", price: 219.9, comparePrice: 329.9, image: null, brand: "Gates", category: "motor", rating: 5, installments: 12, stock: 11 },
  { id: "23", name: "Pastilha de Freio Traseira", slug: "pastilha-freio-traseira", price: 79.9, comparePrice: 129.9, image: null, brand: "Bosch", category: "freios", rating: 4, installments: 12, stock: 38 },
  { id: "24", name: "Amortecedor Traseiro", slug: "amortecedor-traseiro", price: 179.9, comparePrice: 279.9, image: null, brand: "Cofap", category: "suspensao", rating: 4, installments: 12, stock: 16 },
];

const categories = [
  { id: "motor", name: "Motor" },
  { id: "suspensao", name: "Suspensão" },
  { id: "freios", name: "Freios" },
  { id: "eletrica", name: "Elétrica" },
  { id: "transmissao", name: "Transmissão" },
  { id: "arrefecimento", name: "Arrefecimento" },
  { id: "escapamento", name: "Escapamento" },
  { id: "acessorios", name: "Acessórios" },
];

const brands = ["Bosch", "Cofap", "Valeo", "NGK", "SKF", "Mann+Hummel", "Gates", "TRW", "Mahle", "Nakata", "Delphi", "Shell", "Mando"];

const ITEMS_PER_PAGE = 12;

function ProductCard({ product }: { product: ProductData }) {
  const discount = calculateDiscount(product.price, product.comparePrice);
  const installmentValue = product.price / product.installments;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-red-100 transition-all duration-300 flex flex-col"
    >
      <Link href={`/produto/${product.slug}`} className="relative">
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center text-2xl opacity-40 group-hover:scale-110 transition-transform">
            🚗
          </div>
        </div>
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{discount}%
          </Badge>
        )}
        <button className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50">
          <Heart className="h-4 w-4 text-gray-600 hover:text-red-600" />
        </button>
        <div className="absolute bottom-2 right-2 bg-white/90 rounded-full px-1.5 py-0.5 text-[10px] font-medium text-gray-500 flex items-center gap-0.5">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          {product.rating}
        </div>
      </Link>
      <div className="p-3 flex flex-col flex-1">
        <span className="text-[11px] text-gray-500 uppercase tracking-wider">{product.brand}</span>
        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-sm font-medium text-gray-900 mt-0.5 line-clamp-2 hover:text-red-600 transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto pt-2">
          {product.comparePrice && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>
          )}
          <div className="text-lg font-bold text-red-600">{formatPrice(product.price)}</div>
          <span className="text-xs text-gray-500">
            ou {product.installments}x de {formatPrice(installmentValue)} sem juros
          </span>
          {product.stock <= 10 && product.stock > 0 && (
            <p className="text-[11px] text-amber-600 mt-1">Apenas {product.stock} unidades</p>
          )}
          <Button className="w-full mt-2 h-9 text-xs bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg">
            <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
            ADICIONAR
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function ProductCardRow({ product }: { product: ProductData }) {
  const discount = calculateDiscount(product.price, product.comparePrice);
  const installmentValue = product.price / product.installments;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex gap-4 bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md transition-shadow"
    >
      <Link href={`/produto/${product.slug}`} className="relative w-28 h-28 flex-shrink-0">
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-xl opacity-40">🚗</div>
        </div>
        {discount > 0 && (
          <Badge className="absolute top-1 left-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded">-{discount}%</Badge>
        )}
      </Link>
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <span className="text-[11px] text-gray-500 uppercase tracking-wider">{product.brand}</span>
          <Link href={`/produto/${product.slug}`}>
            <h3 className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors">{product.name}</h3>
          </Link>
          <div className="flex items-center gap-1 mt-0.5">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-500">{product.rating}</span>
          </div>
        </div>
        <div className="flex items-end justify-between mt-2">
          <div>
            {product.comparePrice && (
              <span className="text-xs text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>
            )}
            <div className="text-lg font-bold text-red-600">{formatPrice(product.price)}</div>
            <span className="text-xs text-gray-500">
              {product.installments}x de {formatPrice(installmentValue)}
            </span>
          </div>
          <Button className="h-9 text-xs px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg">
            <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
            ADICIONAR
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function LojaPage() {
  const searchParams = useSearchParams();
  const querySearch = searchParams.get("search") || "";
  const queryOfertas = searchParams.get("ofertas") === "true";

  const [searchTerm, setSearchTerm] = useState(querySearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

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

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (queryOfertas) {
      result = result.filter((p) => p.comparePrice !== null && p.comparePrice > p.price);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (priceMin) {
      result = result.filter((p) => p.price >= parseFloat(priceMin));
    }
    if (priceMax) {
      result = result.filter((p) => p.price <= parseFloat(priceMax));
    }

    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name_asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "best_selling":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [searchTerm, selectedCategories, selectedBrands, priceMin, priceMax, sortBy, queryOfertas]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceMin("");
    setPriceMax("");
    setVehicleBrand("");
    setVehicleModel("");
    setVehicleYear("");
    setSearchTerm(querySearch);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    priceMin ||
    priceMax ||
    vehicleBrand ||
    searchTerm !== querySearch;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Busca */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Buscar</h4>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 h-10 text-sm"
          />
        </div>
      </div>

      <Separator />

      {/* Categorias */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Categorias</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() => toggleCategory(cat.id)}
                className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Marcas */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Marcas</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
                className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Preço */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Faixa de Preço</h4>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => {
              setPriceMin(e.target.value);
              setCurrentPage(1);
            }}
            className="h-9 text-sm"
          />
          <span className="text-gray-400">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => {
              setPriceMax(e.target.value);
              setCurrentPage(1);
            }}
            className="h-9 text-sm"
          />
        </div>
      </div>

      <Separator />

      {/* Compatibilidade */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Veículo</h4>
        <div className="space-y-2">
          <select
            value={vehicleBrand}
            onChange={(e) => {
              setVehicleBrand(e.target.value);
              setVehicleModel("");
              setVehicleYear("");
            }}
            className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Marca</option>
            {marcas.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select
            value={vehicleModel}
            onChange={(e) => { setVehicleModel(e.target.value); setVehicleYear(""); }}
            disabled={!vehicleBrand}
            className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
          >
            <option value="">Modelo</option>
            {vehicleBrand && modelos[vehicleBrand]?.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select
            value={vehicleYear}
            onChange={(e) => setVehicleYear(e.target.value)}
            disabled={!vehicleModel}
            className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
          >
            <option value="">Ano</option>
            {anos.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full text-sm border-red-200 text-red-600 hover:bg-red-50"
        >
          <X className="h-4 w-4 mr-1.5" />
          Limpar Filtros
        </Button>
      )}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header interno */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Loja</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1">
            {queryOfertas ? "Ofertas" : "Loja"}
          </h1>
          {querySearch && (
            <p className="text-sm text-gray-500 mt-1">
              Resultados para: &ldquo;{querySearch}&rdquo;
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-xl border border-gray-100 p-4">
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="bg-white rounded-xl border border-gray-100 p-3 mb-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-900">{filteredProducts.length}</span>{" "}
                    produto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
                  </p>

                  {/* Filtros ativos */}
                  <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
                    {selectedCategories.map((cat) => (
                      <Badge key={cat} variant="secondary" className="text-xs gap-1 cursor-pointer hover:bg-red-50 hover:text-red-600" onClick={() => toggleCategory(cat)}>
                        {categories.find((c) => c.id === cat)?.name}
                        <X className="h-3 w-3" />
                      </Badge>
                    ))}
                    {selectedBrands.map((b) => (
                      <Badge key={b} variant="secondary" className="text-xs gap-1 cursor-pointer hover:bg-red-50 hover:text-red-600" onClick={() => toggleBrand(b)}>
                        {b}
                        <X className="h-3 w-3" />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mobile filter */}
                  <Dialog open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden text-sm">
                        <Filter className="h-4 w-4 mr-1.5" />
                        Filtros
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Filtros</DialogTitle>
                      </DialogHeader>
                      <FilterContent />
                    </DialogContent>
                  </Dialog>

                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4 text-gray-400 hidden sm:block" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="h-9 px-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="newest">Mais recentes</option>
                      <option value="price_asc">Menor preço</option>
                      <option value="price_desc">Maior preço</option>
                      <option value="name_asc">A-Z</option>
                      <option value="name_desc">Z-A</option>
                      <option value="best_selling">Mais vendidos</option>
                    </select>
                  </div>

                  {/* View mode */}
                  <div className="hidden sm:flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={cn("p-2 rounded-l-lg transition-colors", viewMode === "grid" ? "bg-red-50 text-red-600" : "text-gray-400 hover:text-gray-600")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={cn("p-2 rounded-r-lg transition-colors", viewMode === "list" ? "bg-red-50 text-red-600" : "text-gray-400 hover:text-gray-600")}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
              viewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence mode="popLayout">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {paginatedProducts.map((product) => (
                      <ProductCardRow key={product.id} product={product} />
                    ))}
                  </AnimatePresence>
                </div>
              )
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900">Nenhum produto encontrado</h3>
                <p className="text-sm text-gray-500 mt-1">Tente ajustar os filtros ou buscar por outro termo.</p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-4 text-sm border-red-200 text-red-600 hover:bg-red-50"
                >
                  Limpar Filtros
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="text-sm"
                >
                  Anterior
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "text-sm min-w-[36px]",
                      page === currentPage && "bg-red-600 hover:bg-red-700"
                    )}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="text-sm"
                >
                  Próximo
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LojaPageFallback() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 h-96 bg-gray-100 animate-pulse rounded-lg" />
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="h-80 bg-gray-100 animate-pulse rounded-lg" />
          <div className="h-80 bg-gray-100 animate-pulse rounded-lg" />
          <div className="h-80 bg-gray-100 animate-pulse rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function LojaPageWrapper() {
  return (
    <Suspense fallback={<LojaPageFallback />}>
      <LojaPage />
    </Suspense>
  );
}
