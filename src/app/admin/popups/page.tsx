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


interface Popup {
  id: string;
  title: string;
  image: string;
  link: string;
  isActive: boolean;
  expiresAt: string | null;
}

const emptyPopup: Popup = {
  id: "",
  title: "",
  image: "",
  link: "",
  isActive: true,
  expiresAt: null,
};

export default function AdminPopups() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingPopup, setEditingPopup] = useState<Popup>(emptyPopup);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadPopups() {
    try {
      const res = await fetch("/api/popups");
      const data = await res.json();
      if (Array.isArray(data)) setPopups(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPopups();
  }, []);

  function handleOpenNew() {
    setEditingPopup({ ...emptyPopup });
    setDialogOpen(true);
  }

  function handleEdit(popup: Popup) {
    setEditingPopup({ ...popup });
    setDialogOpen(true);
  }

  function handleDelete(id: string) {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (!deletingId) return;
    try {
      const res = await fetch(`/api/popups/${deletingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setPopups((prev) => prev.filter((p) => p.id !== deletingId));
        alert("Popup excluído com sucesso!");
      }
    } catch {
      alert("Erro ao excluir popup");
    }
    setDeleteDialogOpen(false);
    setDeletingId(null);
  }

  async function handleSave() {
    const method = editingPopup.id ? "PUT" : "POST";
    const url = editingPopup.id ? "/api/popups" : "/api/popups";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPopup),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert(
          editingPopup.id
            ? "Popup atualizado com sucesso!"
            : "Popup criado com sucesso!"
        );
        setDialogOpen(false);
        loadPopups();
      }
    } catch {
      alert("Erro ao salvar popup");
    }
  }

  async function toggleActive(id: string) {
    const popup = popups.find((p) => p.id === id);
    if (!popup) return;
    try {
      await fetch("/api/popups", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...popup, isActive: !popup.isActive }),
      });
      loadPopups();
    } catch {
      alert("Erro ao alterar status");
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
          <h2 className="text-2xl font-bold text-gray-900">POPUPS</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie os popups do site
          </p>
        </div>
        <Button onClick={handleOpenNew}>
          <Plus className="w-4 h-4 mr-2" />
          NOVO POPUP
        </Button>
      </div>

      {popups.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Nenhum popup cadastrado ainda.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {popups.map((popup) => (
            <Card
              key={popup.id}
              className={`overflow-hidden ${
                !popup.isActive ? "opacity-60" : ""
              }`}
            >
              <div className="relative h-48 bg-gray-100">
                <img
                  src={popup.image}
                  alt={popup.title || "Popup"}
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => toggleActive(popup.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      popup.isActive
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {popup.isActive ? (
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
                      {popup.title || "Sem título"}
                    </h3>
                    {popup.link && (
                      <p className="text-xs text-[#DC2626] truncate mt-1">
                        Link: {popup.link}
                      </p>
                    )}
                    {popup.expiresAt && (
                      <p className="text-xs text-gray-400 mt-1">
                        Expira: {new Date(popup.expiresAt).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={() => handleEdit(popup)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-[#DC2626] hover:bg-red-50"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(popup.id)}
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
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingPopup.id ? "Editar Popup" : "Novo Popup"}
            </DialogTitle>
            <DialogDescription>
              O popup será exibido como imagem sobreposta no site.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Título (opcional)</Label>
              <Input
                value={editingPopup.title}
                onChange={(e) =>
                  setEditingPopup((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Título interno"
              />
            </div>
            <div className="space-y-2">
              <Label>URL da Imagem *</Label>
              <Input
                value={editingPopup.image}
                onChange={(e) =>
                  setEditingPopup((prev) => ({
                    ...prev,
                    image: e.target.value,
                  }))
                }
                placeholder="https://..."
              />
              {editingPopup.image && (
                <img
                  src={editingPopup.image}
                  alt="Preview"
                  className="w-full h-40 object-contain rounded-lg mt-2 bg-gray-50 border"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label>Link (opcional)</Label>
              <Input
                value={editingPopup.link}
                onChange={(e) =>
                  setEditingPopup((prev) => ({
                    ...prev,
                    link: e.target.value,
                  }))
                }
                placeholder="/loja?category=..."
              />
            </div>
            <div className="space-y-2">
              <Label>Expira em (opcional)</Label>
              <Input
                type="date"
                value={
                  editingPopup.expiresAt
                    ? editingPopup.expiresAt.slice(0, 10)
                    : ""
                }
                onChange={(e) =>
                  setEditingPopup((prev) => ({
                    ...prev,
                    expiresAt: e.target.value
                      ? new Date(e.target.value).toISOString()
                      : null,
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
              {editingPopup.id ? "Atualizar" : "Criar"} Popup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este popup?
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
