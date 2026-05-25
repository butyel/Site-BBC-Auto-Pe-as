"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, FolderTree, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  parentId: string | null;
  productCount: number;
}

const initialCategories: Category[] = [
  { id: "1", name: "Freios", description: "Pastilhas, discos, lonas e componentes de freio", image: "", parentId: null, productCount: 45 },
  { id: "2", name: "Filtros", description: "Filtros de óleo, ar, combustível e cabine", image: "", parentId: null, productCount: 32 },
  { id: "3", name: "Suspensão", description: "Amortecedores, molas e componentes", image: "", parentId: null, productCount: 28 },
  { id: "4", name: "Motor", description: "Peças e componentes do motor", image: "", parentId: null, productCount: 56 },
  { id: "5", name: "Pastilhas de Freio", description: "Pastilhas para todos os modelos", image: "", parentId: "1", productCount: 12 },
  { id: "6", name: "Discos de Freio", description: "Discos ventilados e sólidos", image: "", parentId: "1", productCount: 8 },
];

const emptyCategory: Category = {
  id: "", name: "", description: "", image: "", parentId: null, productCount: 0,
};

export default function AdminCategorias() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category>(emptyCategory);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleOpenNew() {
    setEditingCategory(emptyCategory);
    setDialogOpen(true);
  }

  function handleEdit(cat: Category) {
    setEditingCategory({ ...cat });
    setDialogOpen(true);
  }

  function handleDelete(id: string) {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  }

  function confirmDelete() {
    setCategories((prev) => prev.filter((c) => c.id !== deletingId));
    setDeleteDialogOpen(false);
    setDeletingId(null);
  }

  function handleSave() {
    if (editingCategory.id) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? editingCategory : c))
      );
    } else {
      setCategories((prev) => [
        ...prev,
        { ...editingCategory, id: String(Date.now()) },
      ]);
    }
    setDialogOpen(false);
  }

  const rootCategories = categories.filter((c) => !c.parentId);
  const parentOptions = categories.filter((c) => c.id !== editingCategory.id);

  function getChildCount(id: string): number {
    return categories.filter((c) => c.parentId === id).length;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">CATEGORIAS</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie as categorias de produtos
          </p>
        </div>
        <Button onClick={handleOpenNew}>
          <Plus className="w-4 h-4 mr-2" />
          NOVA CATEGORIA
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rootCategories.map((cat) => (
          <Card key={cat.id} className="relative group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#DC2626]/10 flex items-center justify-center">
                    <FolderTree className="w-5 h-5 text-[#DC2626]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {cat.productCount} produtos
                      {getChildCount(cat.id) > 0 &&
                        ` · ${getChildCount(cat.id)} subcategorias`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-[#DC2626] hover:bg-accent"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-bbc hover:bg-accent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {cat.description && (
                <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                  {cat.description}
                </p>
              )}
              {getChildCount(cat.id) > 0 && (
                <div className="mt-3 pl-13 space-y-1">
                  {categories
                    .filter((c) => c.parentId === cat.id)
                    .map((child) => (
                      <div
                        key={child.id}
                        className="flex items-center justify-between text-sm py-1 px-2 rounded-md hover:bg-gray-50"
                      >
                        <span className="text-gray-700">{child.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {child.productCount}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory.id ? "Editar Categoria" : "Nova Categoria"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados da categoria abaixo.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={editingCategory.name}
                onChange={(e) =>
                  setEditingCategory((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Nome da categoria"
              />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <textarea
                className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={editingCategory.description}
                onChange={(e) =>
                  setEditingCategory((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Descrição da categoria"
              />
            </div>
            <div className="space-y-2">
              <Label>URL da Imagem</Label>
              <Input
                value={editingCategory.image}
                onChange={(e) =>
                  setEditingCategory((prev) => ({
                    ...prev,
                    image: e.target.value,
                  }))
                }
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label>Categoria Pai</Label>
              <Select
                value={editingCategory.parentId ?? ""}
                onValueChange={(v) =>
                  setEditingCategory((prev) => ({
                    ...prev,
                    parentId: v || null,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Nenhuma (categoria raiz)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhuma (categoria raiz)</SelectItem>
                  {parentOptions.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Check className="w-4 h-4 mr-2" />
              {editingCategory.id ? "Atualizar" : "Criar"} Categoria
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.
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
