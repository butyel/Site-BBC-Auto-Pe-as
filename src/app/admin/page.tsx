"use client";

import {
  Package,
  ShoppingBag,
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  icon: React.ReactNode;
}

function StatCard({ title, value, change, changeType, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <div className="flex items-center gap-1 text-xs">
              {changeType === "up" ? (
                <TrendingUp className="w-3 h-3 text-green-600" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-600" />
              )}
              <span
                className={
                  changeType === "up" ? "text-green-600" : "text-red-600"
                }
              >
                {change}
              </span>
              <span className="text-muted-foreground">vs mês anterior</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-[#DC2626]/10 flex items-center justify-center text-[#DC2626]">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const monthlySales = [
  { month: "Dez", value: 32000 },
  { month: "Jan", value: 28000 },
  { month: "Fev", value: 35000 },
  { month: "Mar", value: 42000 },
  { month: "Abr", value: 38000 },
  { month: "Mai", value: 48000 },
];

const recentOrders = [
  { id: "#4523", client: "João Silva", date: "2026-05-20", total: 1250, status: "ENTREGUE" as const },
  { id: "#4522", client: "Maria Santos", date: "2026-05-19", total: 890, status: "PREPARANDO" as const },
  { id: "#4521", client: "Carlos Lima", date: "2026-05-18", total: 2340, status: "CONFIRMADO" as const },
  { id: "#4520", client: "Ana Oliveira", date: "2026-05-18", total: 450, status: "ENVIADO" as const },
  { id: "#4519", client: "Pedro Costa", date: "2026-05-17", total: 1670, status: "PENDENTE" as const },
];

const topProducts = [
  { name: "Pastilha de Freio Dianteira", sold: 234, revenue: 28080 },
  { name: "Filtro de Óleo", sold: 189, revenue: 5670 },
  { name: "Amortecedor Original", sold: 156, revenue: 46800 },
  { name: "Correia Dentada", sold: 134, revenue: 20100 },
  { name: "Bateria 60Ah", sold: 112, revenue: 42560 },
];

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline" | "success"> = {
  PENDENTE: "secondary",
  CONFIRMADO: "default",
  PREPARANDO: "outline",
  ENVIADO: "default",
  ENTREGUE: "success",
  CANCELADO: "destructive",
};

export default function AdminDashboard() {
  const maxSale = Math.max(...monthlySales.map((s) => s.value));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Visão geral do negócio
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total de Produtos"
          value="1.234"
          change="+12%"
          changeType="up"
          icon={<Package className="w-6 h-6" />}
        />
        <StatCard
          title="Pedidos do Mês"
          value="156"
          change="+8%"
          changeType="up"
          icon={<ShoppingBag className="w-6 h-6" />}
        />
        <StatCard
          title="Receita Total"
          value="R$ 48.320"
          change="+15%"
          changeType="up"
          icon={<DollarSign className="w-6 h-6" />}
        />
        <StatCard
          title="Clientes Cadastrados"
          value="2.847"
          change="+5%"
          changeType="up"
          icon={<Users className="w-6 h-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Gráfico de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-48">
              {monthlySales.map((sale) => (
                <div key={sale.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    R$ {(sale.value / 1000).toFixed(0)}k
                  </span>
                  <div
                    className="w-full rounded-md bg-[#DC2626] transition-all hover:bg-[#DC2626]/80"
                    style={{
                      height: `${(sale.value / maxSale) * 100}%`,
                    }}
                  />
                  <span className="text-xs text-muted-foreground">{sale.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Produtos Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={product.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.sold} vendidos
                    </p>
                  </div>
                  <span className="text-sm font-semibold">
                    {formatPrice(product.revenue)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pedidos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Pedido</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Data</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Total</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{order.id}</td>
                    <td className="py-3 px-2">{order.client}</td>
                    <td className="py-3 px-2">{formatDate(order.date)}</td>
                    <td className="py-3 px-2">{formatPrice(order.total)}</td>
                    <td className="py-3 px-2">
                      <Badge variant={statusColors[order.status] || "default"}>
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
