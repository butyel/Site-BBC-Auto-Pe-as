"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Shield, Check, X } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

type UserRole = "ADMIN" | "EDITOR";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastAccess: string;
  isActive: boolean;
}

const initialUsers: AdminUser[] = [
  { id: "1", name: "Administrador", email: "admin@bbcautopecas.com", role: "ADMIN", lastAccess: "2026-05-22T10:30:00", isActive: true },
  { id: "2", name: "João Editor", email: "joao@bbcautopecas.com", role: "EDITOR", lastAccess: "2026-05-21T15:45:00", isActive: true },
  { id: "3", name: "Maria Editora", email: "maria@bbcautopecas.com", role: "EDITOR", lastAccess: "2026-05-20T09:00:00", isActive: true },
  { id: "4", name: "Carlos Gerente", email: "carlos@bbcautopecas.com", role: "ADMIN", lastAccess: "2026-05-19T14:20:00", isActive: false },
];

const emptyUser: AdminUser = {
  id: "", name: "", email: "", role: "EDITOR", lastAccess: "", isActive: true,
};

export default function AdminUsuarios() {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser>(emptyUser);
  const [password, setPassword] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleOpenNew() {
    setEditingUser(emptyUser);
    setPassword("");
    setDialogOpen(true);
  }

  function handleEdit(user: AdminUser) {
    setEditingUser({ ...user });
    setPassword("");
    setDialogOpen(true);
  }

  function handleDelete(id: string) {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  }

  function confirmDelete() {
    setUsers((prev) => prev.filter((u) => u.id !== deletingId));
    setDeleteDialogOpen(false);
    setDeletingId(null);
  }

  function handleSave() {
    if (editingUser.id) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? editingUser : u))
      );
    } else {
      setUsers((prev) => [
        ...prev,
        { ...editingUser, id: String(Date.now()), lastAccess: "" },
      ]);
    }
    setDialogOpen(false);
  }

  function toggleActive(id: string) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  }

  function formatLastAccess(date: string): string {
    if (!date) return "Nunca acessou";
    const d = new Date(date);
    return `${formatDate(d)} ${d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">USUÁRIOS</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie os usuários administrativos
          </p>
        </div>
        <Button onClick={handleOpenNew}>
          <Plus className="w-4 h-4 mr-2" />
          NOVO USUÁRIO
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nome</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cargo</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Último Acesso</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#DC2626]/10 flex items-center justify-center text-sm font-bold text-[#DC2626]">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={user.role === "ADMIN" ? "default" : "secondary"}
                        className="gap-1"
                      >
                        <Shield className="w-3 h-3" />
                        {user.role === "ADMIN" ? "Admin" : "Editor"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-sm">
                      {formatLastAccess(user.lastAccess)}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleActive(user.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          user.isActive ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            user.isActive ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-[#DC2626] hover:bg-accent transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-bbc hover:bg-accent transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUser.id ? "Editar Usuário" : "Novo Usuário"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados do usuário administrativo.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Nome completo"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                placeholder="email@exemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Senha {editingUser.id ? "(deixe em branco para manter)" : ""}</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={editingUser.id ? "Nova senha" : "Senha"}
              />
            </div>
            <div className="space-y-2">
              <Label>Cargo</Label>
              <Select
                value={editingUser.role}
                onValueChange={(v) =>
                  setEditingUser((prev) => ({
                    ...prev,
                    role: v as UserRole,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Administrador</SelectItem>
                  <SelectItem value="EDITOR">Editor</SelectItem>
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
              {editingUser.id ? "Atualizar" : "Criar"} Usuário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
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
