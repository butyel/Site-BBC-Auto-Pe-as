"use client";

import { useState } from "react";
import {
  BarChart3,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Download,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

const monthlyData = [
  { month: "Dez", revenue: 32000, orders: 89 },
  { month: "Jan", revenue: 28000, orders: 72 },
  { month: "Fev", revenue: 35000, orders: 95 },
  { month: "Mar", revenue: 42000, orders: 110 },
  { month: "Abr", revenue: 38000, orders: 103 },
  { month: "Mai", revenue: 48320, orders: 156 },
];

const topProducts = [
  { name: "Pastilha de Freio Dianteira", sold: 234, revenue: 28080, category: "Freios" },
  { name: "Filtro de Óleo", sold: 189, revenue: 5670, category: "Filtros" },
  { name: "Amortecedor Original", sold: 156, revenue: 46800, category: "Suspensão" },
  { name: "Correia Dentada", sold: 134, revenue: 20100, category: "Motor" },
  { name: "Bateria 60Ah", sold: 112, revenue: 42560, category: "Elétrica" },
  { name: "Disco de Freio Ventilado", sold: 98, revenue: 17640, category: "Freios" },
  { name: "Kit Embreagem", sold: 87, revenue: 43500, category: "Transmissão" },
  { name: "Radiador Original", sold: 76, revenue: 34200, category: "Arrefecimento" },
];

export default function AdminRelatorios() {
  const [dateStart, setDateStart] = useState("2026-01-01");
  const [dateEnd, setDateEnd] = useState("2026-05-22");

  const totalRevenue = monthlyData.reduce((a, b) => a + b.revenue, 0);
  const totalOrders = monthlyData.reduce((a, b) => a + b.orders, 0);
  const avgTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const totalProductsSold = topProducts.reduce((a, b) => a + b.sold, 0);

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">RELATÓRIOS</h2>
          <p className="text-sm text-muted-foreground">
            Análise de vendas e desempenho
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-2">
          <Label className="text-sm whitespace-nowrap">De:</Label>
          <Input
            type="date"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            className="w-40"
          />
        </div>
        <div className="flex items-center gap-2">
          <Label className="text-sm whitespace-nowrap">Até:</Label>
          <Input
            type="date"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            className="w-40"
          />
        </div>
        <Button size="sm">Filtrar</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Faturamento Total</p>
                <p className="text-2xl font-bold">{formatPrice(totalRevenue)}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Pedidos</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <ShoppingBag className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Ticket Médio</p>
                <p className="text-2xl font-bold">{formatPrice(avgTicket)}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Produtos Vendidos</p>
                <p className="text-2xl font-bold">{totalProductsSold}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Faturamento Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-64">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    R$ {(data.revenue / 1000).toFixed(0)}k
                  </span>
                  <div
                    className="w-full rounded-md bg-[#DC2626] transition-all hover:bg-[#DC2626]/80"
                    style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resumo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-muted-foreground">Mês com maior venda</span>
                <span className="text-sm font-medium">Mai - {formatPrice(48320)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-muted-foreground">Média mensal</span>
                <span className="text-sm font-medium">
                  {formatPrice(totalRevenue / monthlyData.length)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-muted-foreground">Total de pedidos</span>
                <span className="text-sm font-medium">{totalOrders}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Produto top</span>
                <span className="text-sm font-medium text-right max-w-[180px]">
                  {topProducts[0].name}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Produtos Mais Vendidos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">#</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Produto</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Categoria</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Vendidos</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Receita</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, i) => (
                  <tr key={product.name} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                        {i + 1}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{product.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{product.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-center font-medium">{product.sold}</td>
                    <td className="py-3 px-4 font-medium">
                      {formatPrice(product.revenue)}
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
