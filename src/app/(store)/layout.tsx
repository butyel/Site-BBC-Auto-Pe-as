import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PopupBanner from "@/components/shared/PopupBanner";
import { CartProvider } from "@/providers/CartProvider";
import { FavoritesProvider } from "@/providers/FavoritesProvider";
import { ToastProvider } from "@/providers/ToastProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BBC AUTO PEÇAS - Peças Automotivas de Qualidade",
  description:
    "Encontre peças originais e de alta qualidade para seu veículo. Frete grátis para todo Brasil. BBC AUTO PEÇAS.",
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
      <CartProvider>
        <FavoritesProvider>
          <ToastProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <PopupBanner />
          </ToastProvider>
        </FavoritesProvider>
      </CartProvider>
    </div>
  );
}
