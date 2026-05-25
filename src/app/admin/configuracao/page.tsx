"use client";

import { useState, useEffect } from "react";
import { Save, Image, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


interface SiteConfig {
  logo: string;
  companyName: string;
  cnpj: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  businessHours: string;
  saturdayHours: string;
  facebook: string;
  instagram: string;
  blog: string;
}

const defaultConfig: SiteConfig = {
  logo: "",
  companyName: "BBC AUTO PEÇAS",
  cnpj: "00.319.468/0001-43",
  address: "Avenida Presidente Vargas, 4405 - Centro",
  city: "Presidente Epitácio",
  state: "SP",
  zipCode: "19470-041",
  phone: "(18) 3281-5297",
  whatsapp: "5518997538799",
  email: "contato@bbcautopecas.com.br",
  businessHours: "Segunda a Sexta 08:00 até 18:00",
  saturdayHours: "Sábado 08:00 às 12:00",
  facebook: "https://facebook.com/bbcautopecas",
  instagram: "https://instagram.com/bbcautopecas",
  blog: "https://blog.bbcautopecas.com.br",
};

export default function AdminConfiguracao() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) setConfig(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setConfig(data);
        alert("Configurações salvas com sucesso!");
      }
    } catch {
      alert("Erro ao salvar configurações");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#DC2626]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">CONFIGURAÇÕES</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie as informações da empresa
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          SALVAR
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Logo e Identidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Logo (URL da imagem)</Label>
            <Input
              value={config.logo}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, logo: e.target.value }))
              }
              placeholder="https://..."
            />
            {config.logo && (
              <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                <img
                  src={config.logo}
                  alt="Logo preview"
                  className="max-h-20 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label>Nome da Empresa</Label>
            <Input
              value={config.companyName}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  companyName: e.target.value,
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dados da Empresa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>CNPJ</Label>
              <Input
                value={config.cnpj}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, cnpj: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input
                value={config.phone}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp (somente números)</Label>
              <Input
                value={config.whatsapp}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, whatsapp: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>E-mail</Label>
              <Input
                value={config.email}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Endereço</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Endereço</Label>
            <Input
              value={config.address}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Cidade</Label>
              <Input
                value={config.city}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, city: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <Input
                value={config.state}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, state: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>CEP</Label>
              <Input
                value={config.zipCode}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, zipCode: e.target.value }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Horários</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Dias Úteis</Label>
              <Input
                value={config.businessHours}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    businessHours: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Sábado</Label>
              <Input
                value={config.saturdayHours}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    saturdayHours: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Redes Sociais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Facebook</Label>
              <Input
                value={config.facebook}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, facebook: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Instagram</Label>
              <Input
                value={config.instagram}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, instagram: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Blog</Label>
              <Input
                value={config.blog}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, blog: e.target.value }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
