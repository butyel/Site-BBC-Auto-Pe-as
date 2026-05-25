"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Camera,
  Globe,
  Video,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const footerLinks = {
  institucional: {
    title: "Institucional",
    links: [
      { name: "Sobre Nós", href: "/sobre" },
      { name: "Política de Privacidade", href: "/privacidade" },
      { name: "Termos e Condições", href: "/termos" },
      { name: "Trabalhe Conosco", href: "/trabalhe-conosco" },
    ],
  },
  ajuda: {
    title: "Ajuda",
    links: [
      { name: "Frete e Prazo de Entrega", href: "/ajuda/frete" },
      { name: "Trocas e Devoluções", href: "/ajuda/trocas" },
      { name: "Formas de Pagamento", href: "/ajuda/pagamento" },
      { name: "Fale Conosco", href: "/contato" },
      { name: "FAQ", href: "/ajuda/faq" },
    ],
  },
  categorias: {
    title: "Categorias",
    links: [
      { name: "Motor", href: "/loja?categoria=motor" },
      { name: "Suspensão", href: "/loja?categoria=suspensao" },
      { name: "Freios", href: "/loja?categoria=freios" },
      { name: "Elétrica", href: "/loja?categoria=eletrica" },
      { name: "Transmissão", href: "/loja?categoria=transmissao" },
      { name: "Acessórios", href: "/loja?categoria=acessorios" },
    ],
  },
};

export default function Footer() {
  const { config } = useSiteConfig();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1"
                    >
                      <ChevronRight className="h-3 w-3 flex-shrink-0" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Contato
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://wa.me/${config.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-400" />
                  <span>{config.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:+55${config.phone.replace(/\D/g, "")}`}
                  className="flex items-start gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{config.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config.email}`}
                  className="flex items-start gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{config.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    {config.address}
                    <br />
                    {config.city} - {config.state}, {config.zipCode}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">
                Formas de Pagamento
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Visa", icon: "💳" },
                  { name: "Mastercard", icon: "💳" },
                  { name: "Elo", icon: "💳" },
                  { name: "Boleto", icon: "📄" },
                  { name: "Pix", icon: "⚡" },
                  { name: "American Express", icon: "💳" },
                  { name: "Hipercard", icon: "💳" },
                  { name: "Diners", icon: "💳" },
                ].map((method) => (
                  <div
                    key={method.name}
                    className="flex items-center gap-1.5 bg-gray-800 px-3 py-1.5 rounded text-xs text-gray-300"
                  >
                    <span>{method.icon}</span>
                    <span>{method.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">
                Segurança
              </h4>
              <div className="flex flex-wrap gap-3">
                {["SSL", "Protegido", "Rastreável"].map((badge) => (
                  <div
                    key={badge}
                    className="bg-gray-800 px-3 py-1.5 rounded text-xs text-gray-300"
                  >
                    🔒 {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-md">
              <h4 className="text-sm font-semibold text-white mb-2">
                Receba Nossas Ofertas
              </h4>
              <p className="text-xs text-gray-400 mb-3">
                Cadastre-se e receba promoções exclusivas e novidades.
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex gap-2"
              >
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                >
                  Cadastrar
                </button>
              </form>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                Redes Sociais
              </h4>
              <div className="flex items-center gap-3">
                {[
                  { icon: Camera, href: config.instagram, label: "Instagram" },
                  { icon: Globe, href: config.facebook, label: "Facebook" },
                  { icon: Video, href: "https://youtube.com", label: "YouTube" },
                  { icon: MessageCircle, href: `https://wa.me/${config.whatsapp}`, label: "WhatsApp" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-red-600 hover:text-white transition-all"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} {config.companyName}. Todos os direitos
            reservados. | CNPJ: {config.cnpj}
          </p>
        </div>
      </div>
    </footer>
  );
}
