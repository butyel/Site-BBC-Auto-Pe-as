"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package,
  ChevronRight,
  ShoppingBag,
  Clock,
  Search,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatPrice, formatDate } from "@/lib/utils";

interface Order {
  id: string;
  date: string;
  status: "PENDING" | "CONFIRMED" | "PREPARING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  total: number;
  items: number;
  paymentMethod: string;
}

const allOrders: Order[] = [
  { id: "20260001", date: "2026-05-15", status: "DELIVERED", total: 259.7, items: 3, paymentMethod: "PIX" },
  { id: "20260002", date: "2026-05-10", status: "SHIPPED", total: 89.9, items: 1, paymentMethod: "CREDIT_CARD" },
  { id: "20260003", date: "2026-04-28", status: "PREPARING", total: 459.9, items: 1, paymentMethod: "BOLETO" },
  { id: "20260004", date: "2026-04-20", status: "DELIVERED", total: 129.9, items: 2, paymentMethod: "PIX" },
  { id: "20260005", date: "2026-04-15", status: "CANCELLED", total: 89.9, items: 1, paymentMethod: "CREDIT_CARD" },
  { id: "20260006", date: "2026-04-10", status: "DELIVERED", total: 329.9, items: 1, paymentMethod: "PIX" },
  { id: "20260007", date: "2026-04-05", status: "CONFIRMED", total: 199.9, items: 1, paymentMethod: "CREDIT_CARD" },
  { id: "20260008", date: "2026-03-28", status: "DELIVERED", total: 459.9, items: 2, paymentMethod: "PIX" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Pendente", color: "bg-yellow-100 text-yellow-700" },
  CONFIRMED: { label: "Confirmado", color: "bg-blue-100 text-blue-700" },
  PREPARING: { label: "Preparando", color: "bg-purple-100 text-purple-700" },
  SHIPPED: { label: "Enviado", color: "bg-cyan-100 text-cyan-700" },
  DELIVERED: { label: "Entregue", color: "bg-green-100 text-green-700" },
  CANCELLED: { label: "Cancelado", color: "bg-red-100 text-bbc-dark" },
};

const paymentLabels: Record<string, string> = {
  PIX: "PIX",
  CREDIT_CARD: "Cartão de Crédito",
  BOLETO: "Boleto",
  DEBIT_CARD: "Cartão de Débito",
};

const statusFilters = [
  { value: "all", label: "Todos" },
  { value: "DELIVERED", label: "Entregues" },
  { value: "SHIPPED", label: "Enviados" },
  { value: "PREPARING", label: "Preparando" },
  { value: "CONFIRMED", label: "Confirmados" },
  { value: "PENDING", label: "Pendentes" },
  { value: "CANCELLED", label: "Cancelados" },
];

export default function PedidosPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = allOrders.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesSearch =
      !searchTerm || order.id.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-bbc transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/minhaconta"
              className="hover:text-bbc transition-colors"
            >
              Minha Conta
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Pedidos</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2">
            Meus Pedidos
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Acompanhe todos os seus pedidos
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por número do pedido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-10 text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {statusFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    statusFilter === f.value
                      ? "bg-bbc text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-3">
            {filteredOrders.map((order, i) => {
              const status = statusConfig[order.status];
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Pedido #{order.id}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(order.date)}
                          </span>
                          <span className="text-gray-300">|</span>
                          <span className="text-xs text-gray-500">
                            {order.items} {order.items === 1 ? "item" : "itens"}
                          </span>
                          <span className="text-gray-300">|</span>
                          <span className="text-xs text-gray-500">
                            {paymentLabels[order.paymentMethod]}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">
                          {formatPrice(order.total)}
                        </p>
                        <Badge className={`text-xs mt-0.5 ${status.color}`}>
                          {status.label}
                        </Badge>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Nenhum pedido encontrado
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {searchTerm
                ? "Tente buscar por outro número"
                : "Você ainda não tem pedidos com este status"}
            </p>
            <Link href="/loja">
              <Button className="mt-4 bg-bbc hover:bg-bbc-dark text-white font-semibold text-sm h-10 px-6 rounded-lg">
                <ShoppingBag className="h-4 w-4 mr-2" />
                COMPRAR AGORA
              </Button>
            </Link>
          </div>
        )}

        <div className="mt-6">
          <Link
            href="/minhaconta"
            className="inline-flex items-center gap-1.5 text-sm text-bbc hover:text-bbc-dark font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Minha Conta
          </Link>
        </div>
      </div>
    </div>
  );
}
