"use client";

import { motion } from "framer-motion";
import { RotateCcw, ShieldCheck, AlertTriangle, CheckCircle, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  { icon: RotateCcw, title: "Solicitacao", desc: "Entre em contato conosco informando o numero do pedido e o motivo da troca ou devolucao." },
  { icon: CheckCircle, title: "Autorizacao", desc: "Apos analise, enviaremos a autorizacao para postagem e as instrucoes necessarias." },
  { icon: ShieldCheck, title: "Envio", desc: "Embale o produto na embalagem original e envie para o endereco informado." },
  { icon: CheckCircle, title: "Conclusao", desc: "Apos o recebimento e verificacao, realizaremos a troca ou reembolso." },
];

export default function TrocasPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <RotateCcw className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Trocas e <span className="text-red-500">Devolucoes</span></h1>
            <p className="text-lg text-gray-300">Entenda como funciona nossa politica de trocas e devolucoes.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-sm relative"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <step.icon className="h-6 w-6 text-red-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-gray-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Politica de Troca e Devolucao</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Direito de Arrependimento
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    De acordo com o Codigo de Defesa do Consumidor (Art. 49), o cliente tem o prazo de 7 dias corridos
                    apos o recebimento do produto para desistir da compra, independentemente do motivo.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                    Troca por Defeito
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Caso o produto apresente defeito de fabricacao, o cliente tem ate 30 dias para solicitar a troca.
                    O produto sera analisado em nosso laboratorio para confirmacao do defeito.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    Condicoes para Troca
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    {[
                      "O produto deve estar em sua embalagem original.",
                      "Todos os acessorios e manuais devem ser devolvidos.",
                      "O produto nao pode apresentar sinais de uso ou instalacao.",
                      "A Nota Fiscal deve acompanhar o produto.",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <RotateCcw className="h-5 w-5 text-orange-600" />
                    Custos de Frete
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                      <span><strong>Desistencia:</strong> O frete de devolucao e por conta do cliente.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                      <span><strong>Defeito:</strong> A BBC AUTO PECAS arca com o frete de coleta e reenvio.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-red-50 rounded-xl border border-red-100 p-8 text-center">
              <HelpCircle className="h-10 w-10 text-red-600 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Precisa solicitar uma troca?</h2>
              <p className="text-gray-600 mb-4">Entre em contato conosco para iniciar o processo.</p>
              <Link href="/contato" className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors">
                SOLICITAR TROCA
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
