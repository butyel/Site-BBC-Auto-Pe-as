"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, Camera, Globe, Video } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";

export default function Footer() {
  const { config } = useSiteConfig();

  return (
    <footer className="bg-bbc-menu text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-5">
              INSTITUCIONAL
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Sobre Nos", href: "/sobre" },
                { name: "Politica de Privacidade", href: "/privacidade" },
                { name: "Politica de Garantia", href: "/termos" },
                { name: "Termos de Uso", href: "/termos" },
                { name: "Politica de Frete", href: "/ajuda/frete" },
                { name: "Politica de Pagamento", href: "/ajuda/pagamento" },
                { name: "Trocas e Devolucao", href: "/ajuda/trocas" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-5">
              SAiba Mais
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Fale Conosco", href: "/contato" },
                { name: "Sobre Nos", href: "/sobre" },
                { name: "Blog", href: "/blog" },
                { name: "Trabalhe Conosco", href: "/trabalhe-conosco" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-5 mt-8">
              BBC AUTO PECAS LTDA nas redes
            </h3>
            <div className="flex items-center gap-3">
              <a
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700/50 text-gray-400 hover:bg-bbc hover:text-white transition-all"
              >
                <Camera className="h-4 w-4" />
              </a>
              <a
                href={config.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700/50 text-gray-400 hover:bg-bbc hover:text-white transition-all"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700/50 text-gray-400 hover:bg-bbc hover:text-white transition-all"
              >
                <Video className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${config.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700/50 text-gray-400 hover:bg-bbc hover:text-white transition-all"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-5">
              FALE CONOSCO
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-bbc-light" />
                <span>
                  {config.address}
                  <br />
                  {config.city} - {config.state}, CEP: {config.zipCode}
                </span>
              </li>
              <li>
                <a
                  href={`tel:+55${config.phone.replace(/\D/g, "")}`}
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-bbc-light" />
                  <span>{config.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${config.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <MessageCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-bbc-light" />
                  <span>{config.whatsapp}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config.email}`}
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-bbc-light" />
                  <span>{config.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-bbc-light" />
                <span>
                  Segunda a Sexta 08:00 ate 18:00<br />
                  Sabado 08:00 as 12:00
                </span>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-3">
                FORMAS DE PAGAMENTO
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Visa", "Mastercard", "Elo", "American Express", "Hipercard", "Diners", "Boleto", "PIX"].map((method) => (
                  <span
                    key={method}
                    className="px-2.5 py-1 bg-gray-700/50 rounded text-[11px] text-gray-300 font-medium"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            {config.companyName} {new Date().getFullYear()} | CNPJ: {config.cnpj} | Criado por VAAPT
          </p>
        </div>
      </div>
    </footer>
  );
}
