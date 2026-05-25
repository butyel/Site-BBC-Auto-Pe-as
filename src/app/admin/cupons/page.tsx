"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Check, X } from "lucide-react";
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
import { formatPrice, formatDate } from "@/lib/utils";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: "PERCENTAGE" | "FIXED";
  minValue: number | null;
  maxUses: number | null;
  usedCount: number;
  expiresAt: string | null;
  isActive: boolean;
}

const initialCoupons: Coupon[] = [
  { id: "1", code: "BEMVINDO10", discount: 10, discountType: "PERCENTAGE", minValue: 100, maxUses: 100, usedCount: 45, expiresAt: "2026-12-31", isActive: true },
  { id: "2", code: "FRETEGRATIS", discount: 50, discountType: "FIXED", minValue: 200, maxUses: 50, usedCount: 12, expiresAt: "2026-06-30", isActive: true },
  { id: "3", code: "BLACKFRIDAY", discount: 20, discountType: "PERCENTAGE", minValue: null, maxUses: null, usedCount: 0, expiresAt: "2026-11-30", isActive: true },
  { id: "4", code: "PECA20", discount: 20, discountType: "PERCENTAGE", minValue: 150, maxUses: 200, usedCount: 78, expiresAt: "2026-08-15", isActive: false },
  { id: "5", code: "DESCONTO30", discount: 30, discountType: "FIXED", minValue: 300, maxUses: 30, usedCount: 30, expiresAt: "2026-05-01", isActive: false },
];

const emptyCoupon: Coupon = {
  id: "", code: "", discount: 0, discountType: "PERCENTAGE", minValue: null,
  maxUses: null, usedCount: 0, expiresAt: null, isActive: true,
};

export default function AdminCupons() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon>(emptyCoupon);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleOpenNew() {
    setEditingCoupon(emptyCoupon);
    setDialogOpen(true);
  }

  function handleEdit(coupon: Coupon) {
    setEditingCoupon({ ...coupon });
    setDialogOpen(true);
  }

  function handleDelete(id: string) {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  }

  function confirmDelete() {
    setCoupons((prev) => prev.filter((c) => c.id !== deletingId));
    setDeleteDialogOpen(false);
    setDeletingId(null);
  }

  function handleSave() {
    if (editingCoupon.id) {
      setCoupons((prev) =>
        prev.map((c) => (c.id === editingCoupon.id ? editingCoupon : c))
      );
    } else {
      setCoupons((prev) => [
        ...prev,
        { ...editingCoupon, id: String(Date.now()), usedCount: 0 },
      ]);
    }
    setDialogOpen(false);
  }

  function toggleActive(id: string) {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">CUPONS</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie os cupons de desconto
          </p>
        </div>
        <Button onClick={handleOpenNew}>
          <Plus className="w-4 h-4 mr-2" />
          NOVO CUPOM
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Código</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Desconto</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tipo</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Valor Mínimo</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Usos/Máximo</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Validade</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-sm bg-gray-100 px-2 py-1 rounded">
                        {coupon.code}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {coupon.discountType === "PERCENTAGE"
                        ? `${coupon.discount}%`
                        : formatPrice(coupon.discount)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={coupon.discountType === "PERCENTAGE" ? "default" : "secondary"}>
                        {coupon.discountType === "PERCENTAGE" ? "%" : "R$"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {coupon.minValue ? formatPrice(coupon.minValue) : "---"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-medium">{coupon.usedCount}</span>
                      <span className="text-muted-foreground">
                        {coupon.maxUses ? ` / ${coupon.maxUses}` : " / ∞"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {coupon.expiresAt ? formatDate(coupon.expiresAt) : "---"}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleActive(coupon.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          coupon.isActive ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            coupon.isActive ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(coupon)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-[#DC2626] hover:bg-accent transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(coupon.id)}
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
              {editingCoupon.id ? "Editar Cupom" : "Novo Cupom"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados do cupom de desconto.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Código do Cupom</Label>
              <Input
                value={editingCoupon.code}
                onChange={(e) =>
                  setEditingCoupon((prev) => ({
                    ...prev,
                    code: e.target.value.toUpperCase(),
                  }))
                }
                placeholder="Ex: PROMO20"
                className="font-mono uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Valor do Desconto</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={editingCoupon.discount}
                  onChange={(e) =>
                    setEditingCoupon((prev) => ({
                      ...prev,
                      discount: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Desconto</Label>
                <Select
                  value={editingCoupon.discountType}
                  onValueChange={(v) =>
                    setEditingCoupon((prev) => ({
                      ...prev,
                      discountType: v as "PERCENTAGE" | "FIXED",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERCENTAGE">Porcentagem (%)</SelectItem>
                    <SelectItem value="FIXED">Valor Fixo (R$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Valor Mínimo (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={editingCoupon.minValue ?? ""}
                  onChange={(e) =>
                    setEditingCoupon((prev) => ({
                      ...prev,
                      minValue: e.target.value ? parseFloat(e.target.value) : null,
                    }))
                  }
                  placeholder="Opcional"
                />
              </div>
              <div className="space-y-2">
                <Label>Usos Máximos</Label>
                <Input
                  type="number"
                  value={editingCoupon.maxUses ?? ""}
                  onChange={(e) =>
                    setEditingCoupon((prev) => ({
                      ...prev,
                      maxUses: e.target.value ? parseInt(e.target.value) : null,
                    }))
                  }
                  placeholder="Opcional"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Data de Expiração</Label>
              <Input
                type="date"
                value={editingCoupon.expiresAt ?? ""}
                onChange={(e) =>
                  setEditingCoupon((prev) => ({
                    ...prev,
                    expiresAt: e.target.value || null,
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
              <Check className="w-4 h-4 mr-2" />
              {editingCoupon.id ? "Atualizar" : "Criar"} Cupom
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este cupom?
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
