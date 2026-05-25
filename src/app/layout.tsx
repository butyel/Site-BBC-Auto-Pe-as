import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BBC AUTO PEÇAS - E-commerce de Autopeças",
  description:
    "Encontre as melhores peças automotivas para seu veículo. Frete grátis para todo Brasil, qualidade original e garantia.",
  keywords: [
    "autopeças",
    "peças de carro",
    "automotivo",
    "freio",
    "suspensão",
    "motor",
    "filtros",
    "acessórios automotivos",
  ],
  openGraph: {
    title: "BBC AUTO PEÇAS - E-commerce de Autopeças",
    description:
      "Encontre as melhores peças automotivas para seu veículo. Frete grátis para todo Brasil.",
    type: "website",
    locale: "pt_BR",
    siteName: "BBC AUTO PEÇAS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
