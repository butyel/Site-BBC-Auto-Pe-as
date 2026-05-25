"use client";

import { motion } from "framer-motion";
import { FileText, ShoppingCart, RotateCcw, CreditCard, Truck, AlertTriangle } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    icon: FileText,
    title: "Aceitação dos Termos",
    content: "Ao acessar ou utilizar o site da BBC AUTO PEÇAS, voce concorda em cumprir e estar vinculado a estes Termos e Condicoes de Uso. Se voce nao concordar com qualquer parte destes termos, nao devera utilizar nossos servicos.",
  },
  {
    icon: ShoppingCart,
    title: "Produtos e Precos",
    content: [
      "Nos esforcamos para apresentar as descricoes, imagens e precos dos produtos com a maior precisao possivel. Entretanto, erros podem ocorrer.",
      "Os precos exibidos estao sujeitos a alteracao sem aviso previo. O preco valido e o que consta no momento da finalizacao da compra.",
      "A BBC AUTO PECAS se reserva o direito de corrigir eventuais erros de precificacao e cancelar pedidos afetados.",
    ],
  },
  {
    icon: CreditCard,
    title: "Formas de Pagamento",
    content: [
      "Aceitamos as seguintes formas de pagamento: cartao de credito (Visa, Mastercard, Elo, American Express, Hipercard, Diners), boleto bancario e PIX.",
      "O parcelamento minimo e de R$ 50,00 por parcela. As condicoes de parcelamento podem variar conforme a bandeira do cartao.",
      "O pagamento via boleto bancario tem compensacao em ate 3 dias uteis. O pedido sera processado apos a confirmacao do pagamento.",
    ],
  },
  {
    icon: Truck,
    title: "Entrega e Frete",
    content: [
      "O prazo de entrega e calculado com base no CEP de destino e comeca a contar a partir da confirmacao do pagamento.",
      "O frete gratis e valido para compras acima de R$ 299,00, exceto para regioes especiais (Norte e Nordeste) onde podem haver restricoes.",
      "A BBC AUTO PECAS nao se responsabiliza por atrasos decorrentes de greve dos correios, feriados regionais, ou endereco incorreto informado pelo cliente.",
    ],
  },
  {
    icon: RotateCcw,
    title: "Trocas e Devolucoes",
    content: [
      "O cliente tem ate 7 dias corridos apos o recebimento para desistir da compra, conforme o Codigo de Defesa do Consumidor.",
      "Para trocas por defeito, o prazo e de 30 dias para produtos com garantia. O produto sera analisado em nosso laboratorio.",
      "O custo do frete para troca por desistencia e de responsabilidade do cliente. Para trocas por defeito, a BBC AUTO PECAS arca com o frete.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Obrigacoes e Responsabilidades",
    content: [
      "O cliente se responsabiliza pela veracidade dos dados informados no cadastro e pela atualizacao dos mesmos.",
      "A BBC AUTO PECAS nao se responsabiliza por danos causados por instalacao incorreta das pecas ou por uso inadequado dos produtos.",
      "E proibida a reproducao total ou parcial do conteudo do site sem autorizacao expressa da BBC AUTO PECAS.",
    ],
  },
];

export default function TermosPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <FileText className="h-16 w-16 text-bbc-light mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Termos e <span className="text-bbc-light">Condicoes</span></h1>
            <p className="text-lg text-gray-300">
              Estes Termos e Condicoes gerais de uso e venda se aplicam a todas as compras e utilizacoes do site da BBC AUTO PECAS.
            </p>
            <p className="text-sm text-gray-400 mt-4">Ultima atualizacao: Maio de 2026</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <section.icon className="h-6 w-6 text-bbc" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                {Array.isArray(section.content) ? (
                  <ul className="space-y-3 ml-16">
                    {section.content.map((text, i) => (
                      <li key={i} className="text-gray-600 leading-relaxed flex items-start gap-2">
                        <span className="text-bbc mt-1.5 flex-shrink-0">{i + 1}.</span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 leading-relaxed ml-16">{section.content}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
