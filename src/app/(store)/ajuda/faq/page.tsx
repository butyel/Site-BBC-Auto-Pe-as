"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, ChevronDown, Search, ShoppingCart, Truck, RotateCcw, CreditCard, User, MessageCircle } from "lucide-react";
import Link from "next/link";

const faqCategories = [
  {
    icon: ShoppingCart,
    title: "Pedidos",
    questions: [
      { q: "Como faco para acompanhar meu pedido?", a: "Apos a confirmacao do pagamento, voce recebera um e-mail com o codigo de rastreamento. Tambem e possivel acompanhar pelo seu painel de cliente em Minha Conta." },
      { q: "Posso alterar meu pedido apos finaliza-lo?", a: "Entre em contato conosco o mais rapido possivel. Se o pedido ainda nao tiver sido processado, podemos realizar a alteracao." },
      { q: "O que fazer se meu pedido chegar errado?", a: "Entre em contato com nosso atendimento imediatamente. Faremos a correcao o mais rapido possivel sem custos adicionais para voce." },
      { q: "Como cancelar um pedido?", a: "Acesse sua conta e solicite o cancelamento. Se o pedido ja tiver sido enviado, aguarde o recebimento e solicite a devolucao." },
    ],
  },
  {
    icon: Truck,
    title: "Entrega e Frete",
    questions: [
      { q: "Qual o prazo de entrega?", a: "O prazo varia conforme o CEP de destino. Em media, entregamos em 3 a 10 dias uteis para capitais e 5 a 15 dias uteis para demais regioes." },
      { q: "O frete e gratuito?", a: "Sim! Oferecemos frete gratis para compras acima de R$ 299,00 para a maioria das regioes do Brasil." },
      { q: "Fazem entregas em todo o Brasil?", a: "Sim, entregamos em todos os estados brasileiros, incluindo regioes remotas." },
      { q: "Posso retirar o produto pessoalmente?", a: "Sim! Voce pode retirar em nossa loja fisica em Sao Paulo, SP. Consulte os enderecos em nosso site." },
    ],
  },
  {
    icon: RotateCcw,
    title: "Trocas e Devolucoes",
    questions: [
      { q: "Qual o prazo para desistir da compra?", a: "Voce tem ate 7 dias corridos apos o recebimento para desistir da compra, conforme o Codigo de Defesa do Consumidor." },
      { q: "Como solicitar uma troca?", a: "Entre em contato conosco pelo e-mail contato@bbcautopecas.com.br ou pelo WhatsApp informando o numero do pedido e o motivo da troca." },
      { q: "Quem paga o frete da troca?", a: "Para troca por desistencia, o frete e por conta do cliente. Para troca por defeito, a BBC AUTO PECAS arca com o frete." },
    ],
  },
  {
    icon: CreditCard,
    title: "Pagamento",
    questions: [
      { q: "Quais formas de pagamento sao aceitas?", a: "Aceitamos cartoes de credito (Visa, Mastercard, Elo, American Express, Hipercard e Diners), boleto bancario e PIX." },
      { q: "O pagamento e seguro?", a: "Sim! Utilizamos criptografia SSL e gateways de pagamento homologados para garantir a seguranca dos seus dados." },
      { q: "Quantas parcelas posso fazer?", a: "Oferecemos parcelamento em ate 12x sem juros, com parcela minima de R$ 50,00." },
      { q: "Quando o pagamento via PIX e confirmado?", a: "O PIX e aprovado em segundos, permitindo que o pedido seja processado imediatamente." },
    ],
  },
  {
    icon: User,
    title: "Minha Conta",
    questions: [
      { q: "Como criar uma conta?", a: "Clique em 'Minha Conta' no topo do site e selecione 'Cadastre-se'. Preencha seus dados e pronto!" },
      { q: "Esqueci minha senha, o que fazer?", a: "Na pagina de login, clique em 'Esqueci minha senha' e siga as instrucoes enviadas para seu e-mail." },
      { q: "Como atualizar meus dados cadastrais?", a: "Acesse sua conta e va em 'Meus Dados' para atualizar suas informacoes pessoais e endereco." },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (index: number) => {
    setOpenItems((prev) => prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]);
  };

  const currentQuestions = faqCategories[activeCategory]?.questions || [];

  const filteredQuestions = currentQuestions.filter(
    (item) => item.q.toLowerCase().includes(searchQuery.toLowerCase()) || item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <HelpCircle className="h-16 w-16 text-bbc-light mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Perguntas <span className="text-bbc-light">Frequentes</span></h1>
            <p className="text-lg text-gray-300">Encontre respostas para as duvidas mais comuns sobre nossos produtos e servicos.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar perguntas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-bbc focus:border-transparent"
            />
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {faqCategories.map((cat, index) => (
              <button
                key={cat.title}
                onClick={() => { setActiveCategory(index); setOpenItems([]); setSearchQuery(""); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === index
                    ? "bg-bbc text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <cat.icon className="h-4 w-4" />
                {cat.title}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400">Nenhuma pergunta encontrada para esta busca.</p>
              </div>
            ) : (
              filteredQuestions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-gray-900 pr-4">{item.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-transform ${
                        openItems.includes(index) ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openItems.includes(index) && (
                    <div className="px-6 pb-4">
                      <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-br from-bbc to-bbc-secondary rounded-2xl p-8 text-white text-center"
          >
            <MessageCircle className="h-10 w-10 mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-2">Nao encontrou o que procura?</h2>
            <p className="text-blue-100 text-sm mb-4">Nosso time de atendimento esta pronto para ajudar.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contato"
                className="px-6 py-3 bg-white text-bbc font-semibold rounded-xl hover:bg-accent transition-colors"
              >
                FALE CONOSCO
              </Link>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
              >
                WHATSAPP
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
