"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  Home,
  Building,
  Star,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Address } from "@/types";

const initialAddresses: Address[] = [
  {
    id: "1",
    userId: "1",
    street: "Rua das Flores",
    number: "123",
    complement: "Apto 42",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zipCode: "01000-000",
    isDefault: true,
  },
  {
    id: "2",
    userId: "1",
    street: "Avenida Paulista",
    number: "1000",
    complement: null,
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    zipCode: "01310-000",
    isDefault: false,
  },
];

export default function EnderecosPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Form state
  const [formStreet, setFormStreet] = useState("");
  const [formNumber, setFormNumber] = useState("");
  const [formComplement, setFormComplement] = useState("");
  const [formNeighborhood, setFormNeighborhood] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formState, setFormState] = useState("");
  const [formZipCode, setFormZipCode] = useState("");
  const [formDefault, setFormDefault] = useState(false);

  const openNewAddress = () => {
    setEditingAddress(null);
    setFormStreet("");
    setFormNumber("");
    setFormComplement("");
    setFormNeighborhood("");
    setFormCity("");
    setFormState("");
    setFormZipCode("");
    setFormDefault(false);
    setDialogOpen(true);
  };

  const openEditAddress = (addr: Address) => {
    setEditingAddress(addr);
    setFormStreet(addr.street);
    setFormNumber(addr.number);
    setFormComplement(addr.complement || "");
    setFormNeighborhood(addr.neighborhood);
    setFormCity(addr.city);
    setFormState(addr.state);
    setFormZipCode(addr.zipCode);
    setFormDefault(addr.isDefault);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formStreet || !formNumber || !formNeighborhood || !formCity || !formState || !formZipCode) return;

    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingAddress.id
            ? {
                ...a,
                street: formStreet,
                number: formNumber,
                complement: formComplement || null,
                neighborhood: formNeighborhood,
                city: formCity,
                state: formState,
                zipCode: formZipCode,
                isDefault: formDefault,
              }
            : { ...a, isDefault: formDefault ? false : a.isDefault }
        )
      );
    } else {
      const newAddr: Address = {
        id: String(Date.now()),
        userId: "1",
        street: formStreet,
        number: formNumber,
        complement: formComplement || null,
        neighborhood: formNeighborhood,
        city: formCity,
        state: formState,
        zipCode: formZipCode,
        isDefault: formDefault,
      };
      setAddresses((prev) =>
        formDefault
          ? prev.map((a) => ({ ...a, isDefault: false })).concat(newAddr)
          : [...prev, newAddr]
      );
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-bbc transition-colors">Home</Link>
            <span>/</span>
            <Link href="/minhaconta" className="hover:text-bbc transition-colors">Minha Conta</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Endereços</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Meus Endereços
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Gerencie seus endereços de entrega
              </p>
            </div>
            <Button
              onClick={openNewAddress}
              className="bg-bbc hover:bg-bbc-dark text-white font-semibold text-sm h-10 px-4 rounded-lg"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              NOVO ENDEREÇO
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {addresses.map((addr, i) => (
                <motion.div
                  key={addr.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-white rounded-xl border-2 p-5 transition-all ${
                    addr.isDefault ? "border-bbc" : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          addr.isDefault ? "bg-accent" : "bg-gray-100"
                        }`}
                      >
                        <Home
                          className={`h-5 w-5 ${
                            addr.isDefault ? "text-bbc" : "text-gray-500"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900">
                            {addr.street}, {addr.number}
                          </p>
                          {addr.isDefault && (
                            <Badge className="bg-red-100 text-bbc-dark text-[10px] font-medium px-2 py-0.5 rounded-full">
                              Principal
                            </Badge>
                          )}
                        </div>
                        {addr.complement && (
                          <p className="text-sm text-gray-500">{addr.complement}</p>
                        )}
                        <p className="text-sm text-gray-500">
                          {addr.neighborhood} - {addr.city}/{addr.state}
                        </p>
                        <p className="text-sm text-gray-500">{addr.zipCode}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                    {!addr.isDefault && (
                      <button
                        onClick={() => handleSetDefault(addr.id)}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-bbc transition-colors font-medium"
                      >
                        <Star className="h-3.5 w-3.5" />
                        Definir como principal
                      </button>
                    )}
                    <button
                      onClick={() => openEditAddress(addr)}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors font-medium ml-auto"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(addr.id)}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-bbc transition-colors font-medium"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Excluir
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Nenhum endereço cadastrado
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Adicione um endereço de entrega
            </p>
            <Button
              onClick={openNewAddress}
              className="mt-4 bg-bbc hover:bg-bbc-dark text-white font-semibold text-sm h-10 px-6 rounded-lg"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              ADICIONAR ENDEREÇO
            </Button>
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

      {/* Address Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? "Editar Endereço" : "Novo Endereço"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <Label>Rua</Label>
                <Input
                  value={formStreet}
                  onChange={(e) => setFormStreet(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Número</Label>
                <Input
                  value={formNumber}
                  onChange={(e) => setFormNumber(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label>Complemento</Label>
              <Input
                value={formComplement}
                onChange={(e) => setFormComplement(e.target.value)}
                className="mt-1"
                placeholder="Apto, Bloco, etc (opcional)"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Bairro</Label>
                <Input
                  value={formNeighborhood}
                  onChange={(e) => setFormNeighborhood(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Cidade</Label>
                <Input
                  value={formCity}
                  onChange={(e) => setFormCity(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Estado</Label>
                <Input
                  value={formState}
                  onChange={(e) => setFormState(e.target.value.toUpperCase().slice(0, 2))}
                  className="mt-1"
                  maxLength={2}
                />
              </div>
              <div>
                <Label>CEP</Label>
                <Input
                  value={formZipCode}
                  onChange={(e) => setFormZipCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
                  className="mt-1"
                  maxLength={8}
                />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formDefault}
                onChange={(e) => setFormDefault(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-bbc focus:ring-bbc"
              />
              <span className="text-sm text-gray-700">
                Definir como endereço principal
              </span>
            </label>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)} className="text-sm">
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                className="bg-bbc hover:bg-bbc-dark text-white font-semibold text-sm"
              >
                {editingAddress ? "SALVAR ALTERAÇÕES" : "SALVAR ENDEREÇO"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
