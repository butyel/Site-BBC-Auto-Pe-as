"use client";

import { useState } from "react";
import { Eye, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice, formatDate } from "@/lib/utils";

type OrderStatus = "PENDENTE" | "CONFIRMADO" | "PREPARANDO" | "ENVIADO" | "ENTREGUE" | "CANCELADO";
type PaymentMethod = "PIX" | "CREDIT_CARD" | "DEBIT_CARD" | "BOLETO";

interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  client: string;
  email: string;
  phone: string;
  date: string;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: string;
  items: OrderItem[];
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

const statusColors: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline" | "success"> = {
  PENDENTE: "secondary",
  CONFIRMADO: "default",
  PREPARANDO: "outline",
  ENVIADO: "default",
  ENTREGUE: "success",
  CANCELADO: "destructive",
};

const paymentLabels: Record<PaymentMethod, string> = {
  PIX: "PIX",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  BOLETO: "Boleto",
};

const tabs = [
  { key: "TODOS", label: "Todos" },
  { key: "PENDENTE", label: "Pendentes" },
  { key: "CONFIRMADO", label: "Confirmados" },
  { key: "PREPARANDO", label: "Preparando" },
  { key: "ENVIADO", label: "Enviados" },
  { key: "ENTREGUE", label: "Entregues" },
  { key: "CANCELADO", label: "Cancelados" },
];

const initialOrders: Order[] = [
  { id: "4523", client: "João Silva", email: "joao@email.com", phone: "(11) 99999-0001", date: "2026-05-20", total: 1250, subtotal: 1000, shipping: 50, discount: 0, status: "ENTREGUE", paymentMethod: "PIX", paymentStatus: "Pago", items: [{ product: "Pastilha de Freio Dianteira", quantity: 2, price: 120 }, { product: "Filtro de Óleo", quantity: 1, price: 30 }], address: { street: "Rua das Flores", number: "123", complement: "Apto 45", neighborhood: "Centro", city: "São Paulo", state: "SP", zipCode: "01001-000" } },
  { id: "4522", client: "Maria Santos", email: "maria@email.com", phone: "(11) 99999-0002", date: "2026-05-19", total: 890, subtotal: 800, shipping: 90, discount: 0, status: "PREPARANDO", paymentMethod: "CREDIT_CARD", paymentStatus: "Pago", items: [{ product: "Amortecedor Original", quantity: 1, price: 300 }], address: { street: "Av. Paulista", number: "1000", complement: "", neighborhood: "Bela Vista", city: "São Paulo", state: "SP", zipCode: "01310-100" } },
  { id: "4521", client: "Carlos Lima", email: "carlos@email.com", phone: "(11) 99999-0003", date: "2026-05-18", total: 2340, subtotal: 2200, shipping: 140, discount: 0, status: "CONFIRMADO", paymentMethod: "BOLETO", paymentStatus: "Aguardando", items: [{ product: "Correia Dentada", quantity: 2, price: 150 }, { product: "Bateria 60Ah", quantity: 1, price: 380 }], address: { street: "Rua Augusta", number: "500", complement: "Casa 2", neighborhood: "Consolação", city: "São Paulo", state: "SP", zipCode: "01304-001" } },
  { id: "4520", client: "Ana Oliveira", email: "ana@email.com", phone: "(11) 99999-0004", date: "2026-05-18", total: 450, subtotal: 400, shipping: 50, discount: 0, status: "ENVIADO", paymentMethod: "PIX", paymentStatus: "Pago", items: [{ product: "Filtro de Óleo", quantity: 3, price: 30 }], address: { street: "Rua Oscar Freire", number: "200", complement: "", neighborhood: "Jardins", city: "São Paulo", state: "SP", zipCode: "01426-001" } },
  { id: "4519", client: "Pedro Costa", email: "pedro@email.com", phone: "(11) 99999-0005", date: "2026-05-17", total: 1670, subtotal: 1500, shipping: 170, discount: 0, status: "PENDENTE", paymentMethod: "CREDIT_CARD", paymentStatus: "Aguardando", items: [{ product: "Pastilha de Freio Dianteira", quantity: 1, price: 120 }], address: { street: "Rua da Consolação", number: "800", complement: "Apto 12", neighborhood: "Consolação", city: "São Paulo", state: "SP", zipCode: "01302-001" } },
  { id: "4518", client: "Lucas Mendes", email: "lucas@email.com", phone: "(11) 99999-0006", date: "2026-05-16", total: 780, subtotal: 700, shipping: 80, discount: 0, status: "CANCELADO", paymentMethod: "BOLETO", paymentStatus: "Cancelado", items: [{ product: "Filtro de Óleo", quantity: 2, price: 30 }], address: { street: "Av. Brasil", number: "1500", complement: "", neighborhood: "Jardins", city: "São Paulo", state: "SP", zipCode: "01430-001" } },
];

export default function AdminPedidos() {
  const [orders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("TODOS");
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusUpdate, setStatusUpdate] = useState<OrderStatus>("PENDENTE");

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.client.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "TODOS" || o.status === activeTab;
    return matchesSearch && matchesTab;
  });

  function openDetails(order: Order) {
    setSelectedOrder(order);
    setStatusUpdate(order.status);
    setDetailDialogOpen(true);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">PEDIDOS</h2>
        <p className="text-sm text-muted-foreground">
          Gerencie todos os pedidos da loja
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-[#DC2626] text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {tab.label}
            {tab.key !== "TODOS" && (
              <span className="ml-2 text-xs opacity-70">
                ({orders.filter((o) => tab.key === "TODOS" || o.status === tab.key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por pedido ou cliente..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Pedido #</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Data</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Total</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Pagamento</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">#{order.id}</td>
                    <td className="py-3 px-4">{order.client}</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {formatDate(order.date)}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={statusColors[order.status]}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span>{paymentLabels[order.paymentMethod]}</span>
                        <span className="text-xs text-muted-foreground">
                          ({order.paymentStatus})
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDetails(order)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        VER DETALHES
                      </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      Nenhum pedido encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pedido #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase font-medium">Cliente</p>
                  <p className="font-medium">{selectedOrder.client}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.email}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase font-medium">Data</p>
                  <p className="font-medium">{formatDate(selectedOrder.date)}</p>
                  <p className="text-xs text-muted-foreground uppercase font-medium mt-2">Status</p>
                  <Badge variant={statusColors[selectedOrder.status]}>
                    {selectedOrder.status}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-xs text-muted-foreground uppercase font-medium mb-2">
                  Endereço de Entrega
                </p>
                <p className="text-sm">
                  {selectedOrder.address.street}, {selectedOrder.address.number}
                  {selectedOrder.address.complement && ` - ${selectedOrder.address.complement}`}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedOrder.address.neighborhood} - {selectedOrder.address.city}/{selectedOrder.address.state}
                </p>
                <p className="text-sm text-muted-foreground">
                  CEP: {selectedOrder.address.zipCode}
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-xs text-muted-foreground uppercase font-medium mb-2">
                  Itens do Pedido
                </p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium">{item.product}</p>
                        <p className="text-xs text-muted-foreground">
                          Qtd: {item.quantity} x {formatPrice(item.price)}
                        </p>
                      </div>
                      <span className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span>{formatPrice(selectedOrder.shipping)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Desconto</span>
                    <span className="text-green-600">-{formatPrice(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base pt-2 border-t">
                  <span>Total</span>
                  <span>{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase font-medium">
                  Pagamento
                </p>
                <p className="text-sm">
                  {paymentLabels[selectedOrder.paymentMethod]} - {selectedOrder.paymentStatus}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase font-medium">
                  Atualizar Status
                </p>
                <div className="flex gap-2">
                  <Select
                    value={statusUpdate}
                    onValueChange={(v) => setStatusUpdate(v as OrderStatus)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(["PENDENTE", "CONFIRMADO", "PREPARANDO", "ENVIADO", "ENTREGUE", "CANCELADO"] as OrderStatus[]).map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button>Atualizar</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
