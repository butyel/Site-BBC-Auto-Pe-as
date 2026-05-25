"use client";

import { useState } from "react";
import { Search, Filter, Check, X } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

interface StockItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  stockMin: number;
  price: number;
}

const initialStock: StockItem[] = [
  { id: "1", name: "Pastilha de Freio Dianteira", sku: "PFD-001", stock: 45, stockMin: 10, price: 120 },
  { id: "2", name: "Filtro de Óleo", sku: "FO-002", stock: 120, stockMin: 20, price: 30 },
  { id: "3", name: "Amortecedor Original", sku: "AMO-003", stock: 8, stockMin: 10, price: 300 },
  { id: "4", name: "Correia Dentada", sku: "CD-004", stock: 0, stockMin: 10, price: 150 },
  { id: "5", name: "Bateria 60Ah", sku: "BAT-005", stock: 22, stockMin: 5, price: 380 },
  { id: "6", name: "Disco de Freio Ventilado", sku: "DFV-006", stock: 3, stockMin: 8, price: 180 },
  { id: "7", name: "Vela de Ignição", sku: "VI-007", stock: 200, stockMin: 50, price: 25 },
  { id: "8", name: "Radiador Original", sku: "RAD-008", stock: 5, stockMin: 5, price: 450 },
];

type StockStatus = "normal" | "low" | "out";

function getStockStatus(item: StockItem): StockStatus {
  if (item.stock === 0) return "out";
  if (item.stock <= item.stockMin) return "low";
  return "normal";
}

const statusConfig = {
  normal: { label: "Normal", class: "text-green-600 bg-green-50 border-green-200" },
  low: { label: "Baixo", class: "text-yellow-600 bg-yellow-50 border-yellow-200" },
  out: { label: "Esgotado", class: "text-bbc bg-accent border-accent" },
};

export default function AdminEstoque() {
  const [stock, setStock] = useState<StockItem[]>(initialStock);
  const [search, setSearch] = useState("");
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [newStockValue, setNewStockValue] = useState(0);

  const filtered = stock.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = lowStockOnly
      ? getStockStatus(item) !== "normal"
      : true;
    return matchesSearch && matchesFilter;
  });

  function openEdit(item: StockItem) {
    setEditingItem(item);
    setNewStockValue(item.stock);
    setEditDialogOpen(true);
  }

  function handleSaveStock() {
    if (editingItem) {
      setStock((prev) =>
        prev.map((s) =>
          s.id === editingItem.id ? { ...s, stock: newStockValue } : s
        )
      );
    }
    setEditDialogOpen(false);
    setEditingItem(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">ESTOQUE</h2>
        <p className="text-sm text-muted-foreground">
          Gerencie o estoque de produtos
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produto ou SKU..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => setLowStockOnly(!lowStockOnly)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
            lowStockOnly
              ? "bg-yellow-50 border-yellow-300 text-yellow-700"
              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Filter className="w-4 h-4" />
          Estoque Baixo/Esgotado
        </button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Produto</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">SKU</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Estoque Atual</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Estoque Mínimo</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => {
                  const status = getStockStatus(item);
                  const cfg = statusConfig[status];
                  return (
                    <tr
                      key={item.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 ${
                        status === "out"
                          ? "bg-accent/30"
                          : status === "low"
                          ? "bg-yellow-50/30"
                          : ""
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground font-mono text-xs">
                        {item.sku}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`text-lg font-bold ${
                            status === "out"
                              ? "text-bbc"
                              : status === "low"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {item.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-muted-foreground">
                        {item.stockMin}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.class}`}
                        >
                          {cfg.label}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEdit(item)}
                        >
                          Editar Estoque
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      Nenhum produto encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Estoque</DialogTitle>
            <DialogDescription>
              Atualize a quantidade em estoque do produto.
            </DialogDescription>
          </DialogHeader>

          {editingItem && (
            <div className="space-y-4 py-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-1">
                <p className="font-medium">{editingItem.name}</p>
                <p className="text-sm text-muted-foreground">
                  SKU: {editingItem.sku}
                </p>
                <p className="text-sm text-muted-foreground">
                  Estoque mínimo: {editingItem.stockMin}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Nova Quantidade em Estoque</Label>
                <Input
                  type="number"
                  value={newStockValue}
                  onChange={(e) => setNewStockValue(parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span>Status atual:</span>
                {newStockValue === 0 ? (
                  <span className="text-bbc font-medium">Esgotado</span>
                ) : newStockValue <= editingItem.stockMin ? (
                  <span className="text-yellow-600 font-medium">Estoque Baixo</span>
                ) : (
                  <span className="text-green-600 font-medium">Normal</span>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveStock}>
              <Check className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
