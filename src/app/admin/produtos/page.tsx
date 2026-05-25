"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Image as ImageIcon,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice, slugify } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice: number | null;
  sku: string;
  barcode: string;
  stock: number;
  stockMin: number;
  images: string[];
  featured: boolean;
  discountPercentage: number | null;
  category: string;
  brand: string;
  active: boolean;
}

const initialProducts: Product[] = [
  { id: "1", name: "Pastilha de Freio Dianteira", slug: "pastilha-de-freio-dianteira", description: "Pastilha de freio original para diversos modelos", price: 120, comparePrice: 150, sku: "PFD-001", barcode: "789123456001", stock: 45, stockMin: 10, images: ["https://placehold.co/100x100/DC2626/white?text=Prod"], featured: true, discountPercentage: 20, category: "Freios", brand: "Bosch", active: true },
  { id: "2", name: "Filtro de Óleo", slug: "filtro-de-oleo", description: "Filtro de óleo de alta eficiência", price: 30, comparePrice: null, sku: "FO-002", barcode: "789123456002", stock: 120, stockMin: 20, images: [], featured: false, discountPercentage: null, category: "Filtros", brand: "Mann", active: true },
  { id: "3", name: "Amortecedor Original", slug: "amortecedor-original", description: "Amortecedor dianteiro original", price: 300, comparePrice: 380, sku: "AMO-003", barcode: "789123456003", stock: 8, stockMin: 5, images: [], featured: true, discountPercentage: 21, category: "Suspensão", brand: "Monroe", active: true },
  { id: "4", name: "Correia Dentada", slug: "correia-dentada", description: "Correia dentada com tensor incluso", price: 150, comparePrice: null, sku: "CD-004", barcode: "789123456004", stock: 0, stockMin: 10, images: [], featured: false, discountPercentage: null, category: "Motor", brand: "Gates", active: false },
  { id: "5", name: "Bateria 60Ah", slug: "bateria-60ah", description: "Bateria automotiva 60Ah", price: 380, comparePrice: 420, sku: "BAT-005", barcode: "789123456005", stock: 22, stockMin: 5, images: [], featured: true, discountPercentage: 10, category: "Elétrica", brand: "Moura", active: true },
];

const categoriesList = ["Freios", "Filtros", "Suspensão", "Motor", "Elétrica", "Escapamento", "Arrefecimento", "Transmissão"];
const brandsList = ["Bosch", "Mann", "Monroe", "Gates", "Moura", "NGK", "Continental", "SKF"];

const emptyProduct: Product = {
  id: "", name: "", slug: "", description: "", price: 0, comparePrice: null,
  sku: "", barcode: "", stock: 0, stockMin: 0, images: [], featured: false,
  discountPercentage: null, category: "", brand: "", active: true,
};

export default function AdminProdutos() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product>(emptyProduct);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [imageInput, setImageInput] = useState("");
  const perPage = 5;

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  function handleOpenNew() {
    setEditingProduct(emptyProduct);
    setImageInput("");
    setDialogOpen(true);
  }

  function handleEdit(product: Product) {
    setEditingProduct({ ...product });
    setImageInput("");
    setDialogOpen(true);
  }

  function handleDelete(id: string) {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  }

  function confirmDelete() {
    setProducts((prev) => prev.filter((p) => p.id !== deletingId));
    setDeleteDialogOpen(false);
    setDeletingId(null);
  }

  function handleSave() {
    if (editingProduct.id) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      );
    } else {
      const newProduct = {
        ...editingProduct,
        id: String(Date.now()),
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    setDialogOpen(false);
  }

  function handleToggleActive(id: string) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  }

  function addImage() {
    if (imageInput.trim()) {
      setEditingProduct((prev) => ({
        ...prev,
        images: [...prev.images, imageInput.trim()],
      }));
      setImageInput("");
    }
  }

  function removeImage(index: number) {
    setEditingProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">PRODUTOS</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie todos os produtos da loja
          </p>
        </div>
        <Button onClick={handleOpenNew}>
          <Plus className="w-4 h-4 mr-2" />
          NOVO PRODUTO
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produto por nome ou SKU..."
            className="pl-10"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Imagem</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nome</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">SKU</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Preço</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Estoque</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        {product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{product.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{product.sku}</td>
                    <td className="py-3 px-4">{formatPrice(product.price)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={
                          product.stock === 0
                            ? "text-bbc font-medium"
                            : product.stock <= product.stockMin
                            ? "text-yellow-600 font-medium"
                            : ""
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleActive(product.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          product.active ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            product.active ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-[#DC2626] hover:bg-accent transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-bbc hover:bg-accent transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      Nenhum produto encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                page === i + 1
                  ? "bg-[#DC2626] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct.id ? "Editar Produto" : "Novo Produto"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados do produto abaixo.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome do Produto</Label>
                <Input
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct((prev) => ({
                      ...prev,
                      name: e.target.value,
                      slug: slugify(e.target.value),
                    }))
                  }
                  placeholder="Nome do produto"
                />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input
                  value={editingProduct.slug}
                  onChange={(e) =>
                    setEditingProduct((prev) => ({
                      ...prev,
                      slug: e.target.value,
                    }))
                  }
                  placeholder="slug-do-produto"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <textarea
                className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Descrição do produto"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preço (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct((prev) => ({
                      ...prev,
                      price: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Preço Comparativo (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={editingProduct.comparePrice ?? ""}
                  onChange={(e) =>
                    setEditingProduct((prev) => ({
                      ...prev,
                      comparePrice: e.target.value ? parseFloat(e.target.value) : null,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>SKU</Label>
                <Input
                  value={editingProduct.sku}
                  onChange={(e) =>
                    setEditingProduct((prev) => ({
                      ...prev,
                      sku: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Código de Barras</Label>
                <Input
                  value={editingProduct.barcode}
                  onChange={(e) =>
                    setEditingProduct((prev) => ({
                      ...prev,
                      barcode: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Estoque</Label>
                <Input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) =>
                    setEditingProduct((prev) => ({
                      ...prev,
                      stock: parseInt(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Estoque Mínimo</Label>
                <Input
                  type="number"
                  value={editingProduct.stockMin}
                  onChange={(e) =>
                    setEditingProduct((prev) => ({
                      ...prev,
                      stockMin: parseInt(e.target.value) || 0,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  value={editingProduct.category}
                  onValueChange={(v) =>
                    setEditingProduct((prev) => ({ ...prev, category: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesList.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Marca</Label>
                <Select
                  value={editingProduct.brand}
                  onValueChange={(v) =>
                    setEditingProduct((prev) => ({ ...prev, brand: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {brandsList.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Desconto (%)</Label>
                <Input
                  type="number"
                  value={editingProduct.discountPercentage ?? ""}
                  onChange={(e) =>
                    setEditingProduct((prev) => ({
                      ...prev,
                      discountPercentage: e.target.value ? parseInt(e.target.value) : null,
                    }))
                  }
                />
              </div>
              <div className="flex items-center gap-2 pt-8">
                <Checkbox
                  id="featured"
                  checked={editingProduct.featured}
                  onCheckedChange={(v) =>
                    setEditingProduct((prev) => ({
                      ...prev,
                      featured: v === true,
                    }))
                  }
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Produto em Destaque
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Imagens (URLs)</Label>
              <div className="flex gap-2">
                <Input
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  placeholder="https://..."
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
                />
                <Button type="button" variant="outline" onClick={addImage}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {editingProduct.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {editingProduct.images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={img}
                        alt=""
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-accent0 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Check className="w-4 h-4 mr-2" />
              {editingProduct.id ? "Atualizar" : "Criar"} Produto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
