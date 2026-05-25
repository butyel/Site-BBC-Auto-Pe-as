"use client";

import { motion } from "framer-motion";
import { CreditCard, QrCode, FileText, ShieldCheck, Lock, HelpCircle } from "lucide-react";
import Link from "next/link";

const paymentMethods = [
  {
    icon: CreditCard,
    title: "Cartao de Credito",
    desc: "Aceitamos as principais bandeiras: Visa, Mastercard, Elo, American Express, Hipercard e Diners Club.",
    details: [
      "Parcelamento em ate 12x sem juros",
      "Parcela minima de R$ 50,00",
      "Aprovacao na hora",
      "Compra segura com criptografia SSL",
    ],
  },
  {
    icon: QrCode,
    title: "PIX",
    desc: "Pagamento instantaneo e aprovado na hora. O pedido e processado imediatamente.",
    details: [
      "Aprovacao em segundos",
      "Disponivel 24 horas por dia",
      "Sem taxa adicional",
      "Liberacao rapida do pedido",
    ],
  },
  {
    icon: FileText,
    title: "Boleto Bancario",
    desc: "Pagamento tradicional com compensacao em ate 3 dias uteis.",
    details: [
      "Vencimento em 3 dias uteis",
      "Compensacao em ate 3 dias uteis",
      "Qualquer banco ou casa loterica",
      "Processamento apos confirmacao",
    ],
  },
];

export default function PagamentoPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <CreditCard className="h-16 w-16 text-bbc-light mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Formas de <span className="text-bbc-light">Pagamento</span></h1>
            <p className="text-lg text-gray-300">Confira todas as formas de pagamento disponiveis na BBC AUTO PECAS.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:border-accent transition-all"
              >
                <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mb-4">
                  <method.icon className="h-7 w-7 text-bbc" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{method.desc}</p>
                <ul className="space-y-2">
                  {method.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <ShieldCheck className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Seguranca no Pagamento</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Lock, title: "Criptografia SSL", desc: "Todos os dados sao transmitidos de forma segura com criptografia de 256 bits." },
                { icon: ShieldCheck, title: "Certificado Digital", desc: "Nosso site possui certificado digital para garantir a autenticidade das informacoes." },
                { icon: HelpCircle, title: "Ambiente Seguro", desc: "Utilizamos gateways de pagamento homologados pelo mercado." },
              ].map((item, i) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-accent rounded-xl border border-accent p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Precisa de ajuda com o pagamento?</h2>
            <p className="text-gray-600 mb-4">Nossa equipe esta pronta para ajudar.</p>
            <Link href="/contato" className="inline-flex items-center px-6 py-3 bg-bbc text-white font-semibold rounded-xl hover:bg-bbc-dark transition-colors">
              FALE CONOSCO
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
