"use client";

import { useState } from "react";
import { Search, Eye, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice, formatDate } from "@/lib/utils";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  orders: number;
  totalSpent: number;
  since: string;
  city: string;
  state: string;
}

const initialCustomers: Customer[] = [
  { id: "1", name: "João Silva", email: "joao.silva@email.com", phone: "(11) 99999-0001", cpf: "123.456.789-00", orders: 12, totalSpent: 8940, since: "2025-01-15", city: "São Paulo", state: "SP" },
  { id: "2", name: "Maria Santos", email: "maria.santos@email.com", phone: "(11) 99999-0002", cpf: "987.654.321-00", orders: 8, totalSpent: 5320, since: "2025-03-20", city: "Guarulhos", state: "SP" },
  { id: "3", name: "Carlos Lima", email: "carlos.lima@email.com", phone: "(21) 99999-0003", cpf: "456.789.123-00", orders: 5, totalSpent: 3450, since: "2025-06-10", city: "Rio de Janeiro", state: "RJ" },
  { id: "4", name: "Ana Oliveira", email: "ana.oliveira@email.com", phone: "(31) 99999-0004", cpf: "321.654.987-00", orders: 15, totalSpent: 12780, since: "2024-11-05", city: "Belo Horizonte", state: "MG" },
  { id: "5", name: "Pedro Costa", email: "pedro.costa@email.com", phone: "(41) 99999-0005", cpf: "654.321.987-00", orders: 3, totalSpent: 1890, since: "2026-02-28", city: "Curitiba", state: "PR" },
  { id: "6", name: "Lucas Mendes", email: "lucas.mendes@email.com", phone: "(51) 99999-0006", cpf: "789.123.456-00", orders: 7, totalSpent: 4560, since: "2025-08-12", city: "Porto Alegre", state: "RS" },
];

export default function AdminClientes() {
  const [customers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  function openDetails(customer: Customer) {
    setSelectedCustomer(customer);
    setDetailDialogOpen(true);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">CLIENTES</h2>
        <p className="text-sm text-muted-foreground">
          Gerencie os clientes cadastrados
        </p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, email ou telefone..."
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
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nome</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Telefone</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Pedidos</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Total Gasto</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Desde</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#DC2626]/10 flex items-center justify-center text-sm font-bold text-[#DC2626]">
                          {customer.name.charAt(0)}
                        </div>
                        <span className="font-medium">{customer.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{customer.email}</td>
                    <td className="py-3 px-4 text-muted-foreground">{customer.phone}</td>
                    <td className="py-3 px-4 text-center font-medium">{customer.orders}</td>
                    <td className="py-3 px-4 font-medium">
                      {formatPrice(customer.totalSpent)}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {formatDate(customer.since)}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDetails(customer)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        DETALHES
                      </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      Nenhum cliente encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes do Cliente</DialogTitle>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 flex items-center justify-center text-2xl font-bold text-[#DC2626]">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                  <p className="text-sm text-muted-foreground">Cliente desde {formatDate(selectedCustomer.since)}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{selectedCustomer.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Telefone</p>
                    <p className="text-sm font-medium">{selectedCustomer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Localização</p>
                    <p className="text-sm font-medium">
                      {selectedCustomer.city}/{selectedCustomer.state}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">CPF</p>
                  <p className="text-sm font-medium">{selectedCustomer.cpf}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#DC2626]">{selectedCustomer.orders}</p>
                  <p className="text-xs text-muted-foreground">Pedidos Realizados</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#DC2626]">
                    {formatPrice(selectedCustomer.totalSpent)}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Gasto</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
