"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut,
  ShoppingBag,
  Clock,
  ChevronRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";

const recentOrders = [
  {
    id: "20260001",
    date: "2026-05-15",
    status: "DELIVERED" as const,
    total: 259.7,
    items: 3,
  },
  {
    id: "20260002",
    date: "2026-05-10",
    status: "SHIPPED" as const,
    total: 89.9,
    items: 1,
  },
  {
    id: "20260003",
    date: "2026-04-28",
    status: "PREPARING" as const,
    total: 459.9,
    items: 1,
  },
];

const statusConfig = {
  PENDING: { label: "Pendente", color: "bg-yellow-100 text-yellow-700" },
  CONFIRMED: { label: "Confirmado", color: "bg-blue-100 text-blue-700" },
  PREPARING: { label: "Preparando", color: "bg-purple-100 text-purple-700" },
  SHIPPED: { label: "Enviado", color: "bg-cyan-100 text-cyan-700" },
  DELIVERED: { label: "Entregue", color: "bg-green-100 text-green-700" },
  CANCELLED: { label: "Cancelado", color: "bg-red-100 text-red-700" },
};

export default function MinhaContaPage() {
  const [userName] = useState("Raphael");

  const quickLinks = [
    {
      label: "Meus Pedidos",
      href: "/minhaconta/pedidos",
      icon: Package,
      desc: "Acompanhe seus pedidos",
    },
    {
      label: "Endereços",
      href: "/minhaconta/enderecos",
      icon: MapPin,
      desc: "Gerencie endereços",
    },
    {
      label: "Favoritos",
      href: "/minhaconta/favoritos",
      icon: Heart,
      desc: "Produtos salvos",
    },
    {
      label: "Dados Pessoais",
      href: "#",
      icon: Settings,
      desc: "Edite seus dados",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">Minha Conta</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2">
                Olá, {userName}! 👋
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Gerencie sua conta e acompanhe seus pedidos
              </p>
            </div>
            <Button
              variant="outline"
              className="hidden sm:flex items-center gap-2 text-sm border-gray-200"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {quickLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={link.href}
                className="block bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-red-100 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center mb-3 group-hover:bg-red-100 transition-colors">
                  <link.icon className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                  {link.label}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{link.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-100 overflow-hidden"
        >
          <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Últimos Pedidos</h2>
              <p className="text-sm text-gray-500">Seus pedidos recentes</p>
            </div>
            <Link
              href="/minhaconta/pedidos"
              className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
            >
              Ver todos
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {recentOrders.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {recentOrders.map((order) => {
                const status = statusConfig[order.status];
                return (
                  <div
                    key={order.id}
                    className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Pedido #{order.id}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-500">
                            {formatDate(order.date)}
                          </span>
                          <span className="text-gray-300">|</span>
                          <span className="text-xs text-gray-500">
                            {order.items} itens
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatPrice(order.total)}
                      </p>
                      <Badge className={`text-xs mt-1 ${status.color}`}>
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Package className="h-10 w-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Nenhum pedido ainda</p>
              <Link href="/loja">
                <Button className="mt-3 text-sm bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg h-10 px-6">
                  COMPRAR AGORA
                </Button>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
