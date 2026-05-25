"use client";

import { useState, useEffect } from "react";

export interface SiteConfig {
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

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/site-config")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setConfig(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { config, loading };
}
