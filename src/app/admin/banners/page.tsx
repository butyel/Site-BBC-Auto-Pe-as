"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  order: number;
  isActive: boolean;
}

const emptyBanner: Banner = {
  id: "",
  title: "",
  subtitle: "",
  image: "",
  link: "",
  order: 1,
  isActive: true,
};

export default function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner>(emptyBanner);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadBanners() {
    try {
      const res = await fetch("/api/banners?all=true");
      const data = await res.json();
      if (Array.isArray(data)) {
        setBanners(data);
      } else if (data.error) {
        const fallback = await fetch("/api/banners");
        const fb = await fallback.json();
        if (Array.isArray(fb)) setBanners(fb);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBanners();
  }, []);

  function handleOpenNew() {
    setEditingBanner({ ...emptyBanner, order: banners.length + 1 });
    setDialogOpen(true);
  }

  function handleEdit(banner: Banner) {
    setEditingBanner({ ...banner });
    setDialogOpen(true);
  }

  function handleDelete(id: string) {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (!deletingId) return;
    try {
      const res = await fetch(`/api/banners/${deletingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setBanners((prev) => prev.filter((b) => b.id !== deletingId));
        alert("Banner excluído com sucesso!");
      }
    } catch {
      alert("Erro ao excluir banner");
    }
    setDeleteDialogOpen(false);
    setDeletingId(null);
  }

  async function handleSave() {
    try {
      const method = editingBanner.id ? "PUT" : "POST";
      const url = editingBanner.id
        ? `/api/banners/${editingBanner.id}`
        : "/api/banners";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBanner),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert(
          editingBanner.id
            ? "Banner atualizado com sucesso!"
            : "Banner criado com sucesso!"
        );
        setDialogOpen(false);
        loadBanners();
      }
    } catch {
      alert("Erro ao salvar banner");
    }
  }

  async function toggleActive(id: string) {
    const banner = banners.find((b) => b.id === id);
    if (!banner) return;
    try {
      await fetch(`/api/banners/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...banner, isActive: !banner.isActive }),
      });
      loadBanners();
    } catch {
      alert("Erro ao alterar status");
    }
  }

  async function moveUp(id: string) {
    const idx = banners.findIndex((b) => b.id === id);
    if (idx <= 0) return;
    const arr = [...banners];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    const updated = arr.map((b, i) => ({ ...b, order: i + 1 }));
    setBanners(updated);
    try {
      await fetch("/api/banners/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ banners: updated.map((b) => ({ id: b.id, order: b.order })) }),
      });
    } catch {
      loadBanners();
    }
  }

  async function moveDown(id: string) {
    const idx = banners.findIndex((b) => b.id === id);
    if (idx < 0 || idx >= banners.length - 1) return;
    const arr = [...banners];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    const updated = arr.map((b, i) => ({ ...b, order: i + 1 }));
    setBanners(updated);
    try {
      await fetch("/api/banners/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ banners: updated.map((b) => ({ id: b.id, order: b.order })) }),
      });
    } catch {
      loadBanners();
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#DC2626]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">BANNERS</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie os banners da página inicial
          </p>
        </div>
        <Button onClick={handleOpenNew}>
          <Plus className="w-4 h-4 mr-2" />
          NOVO BANNER
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {banners
          .sort((a, b) => a.order - b.order)
          .map((banner) => (
            <Card
              key={banner.id}
              className={`overflow-hidden ${
                !banner.isActive ? "opacity-60" : ""
              }`}
            >
              <div className="relative h-40 bg-gray-100">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  Ordem {banner.order}
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => toggleActive(banner.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      banner.isActive
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {banner.isActive ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {banner.title}
                    </h3>
                    {banner.subtitle && (
                      <p className="text-sm text-muted-foreground truncate mt-0.5">
                        {banner.subtitle}
                      </p>
                    )}
                    {banner.link && (
                      <p className="text-xs text-[#DC2626] truncate mt-1">
                        Link: {banner.link}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={() => moveUp(banner.id)}
                      className="p-1 rounded text-gray-400 hover:text-gray-600"
                      disabled={banner.order === 1}
                    >
                      <EyeOff className="w-4 h-4 rotate-90 hidden" />
                      <span className="text-xs font-bold">&#8593;</span>
                    </button>
                    <button
                      onClick={() => moveDown(banner.id)}
                      className="p-1 rounded text-gray-400 hover:text-gray-600"
                      disabled={banner.order === banners.length}
                    >
                      <span className="text-xs font-bold">&#8595;</span>
                    </button>
                    <button
                      onClick={() => handleEdit(banner)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-[#DC2626] hover:bg-red-50"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingBanner.id ? "Editar Banner" : "Novo Banner"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados do banner abaixo.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={editingBanner.title}
                onChange={(e) =>
                  setEditingBanner((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Título do banner"
              />
            </div>
            <div className="space-y-2">
              <Label>Subtítulo</Label>
              <Input
                value={editingBanner.subtitle}
                onChange={(e) =>
                  setEditingBanner((prev) => ({
                    ...prev,
                    subtitle: e.target.value,
                  }))
                }
                placeholder="Subtítulo do banner"
              />
            </div>
            <div className="space-y-2">
              <Label>URL da Imagem</Label>
              <Input
                value={editingBanner.image}
                onChange={(e) =>
                  setEditingBanner((prev) => ({
                    ...prev,
                    image: e.target.value,
                  }))
                }
                placeholder="https://..."
              />
              {editingBanner.image && (
                <img
                  src={editingBanner.image}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg mt-2"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label>Link</Label>
              <Input
                value={editingBanner.link}
                onChange={(e) =>
                  setEditingBanner((prev) => ({
                    ...prev,
                    link: e.target.value,
                  }))
                }
                placeholder="/loja?category=..."
              />
            </div>
            <div className="space-y-2">
              <Label>Ordem</Label>
              <Input
                type="number"
                value={editingBanner.order}
                onChange={(e) =>
                  setEditingBanner((prev) => ({
                    ...prev,
                    order: parseInt(e.target.value) || 1,
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              {editingBanner.id ? "Atualizar" : "Criar"} Banner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este banner?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
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
