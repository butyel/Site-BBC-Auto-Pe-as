"use client";

import { motion } from "framer-motion";
import { Truck, Package, Clock, MapPin, CheckCircle, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function FretePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <Truck className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Frete e Prazo de <span className="text-red-500">Entrega</span></h1>
            <p className="text-lg text-gray-300">Confira as informacoes sobre prazos e custos de entrega para todo o Brasil.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Package, title: "Embalagem Segura", desc: "Todos os produtos sao embalados com cuidado para garantir que cheguem em perfeito estado." },
              { icon: Clock, title: "Prazos viaveis", desc: "Trabalhamos com as principais transportadoras para oferecer os melhores prazos de entrega." },
              { icon: CheckCircle, title: "Rastreamento", desc: "Apos a postagem, voce recebera o codigo de rastreamento para acompanhar sua entrega." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-sm"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Prazos de Entrega</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Regiao</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Prazo Estimado</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Frete Gratis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { regiao: "Sudeste", prazo: "2 a 5 dias uteis", gratis: "Acima de R$ 199" },
                      { regiao: "Sul", prazo: "3 a 7 dias uteis", gratis: "Acima de R$ 199" },
                      { regiao: "Centro-Oeste", prazo: "4 a 8 dias uteis", gratis: "Acima de R$ 299" },
                      { regiao: "Nordeste", prazo: "5 a 12 dias uteis", gratis: "Acima de R$ 399" },
                      { regiao: "Norte", prazo: "7 a 15 dias uteis", gratis: "Acima de R$ 499" },
                    ].map((row) => (
                      <tr key={row.regiao} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-700">{row.regiao}</td>
                        <td className="py-3 px-4 text-gray-700">{row.prazo}</td>
                        <td className="py-3 px-4 text-green-600 font-medium">{row.gratis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Informacoes Importantes</h2>
              <ul className="space-y-3">
                {[
                  "O prazo de entrega comeca a contar a partir da confirmacao do pagamento.",
                  "Para pagamentos via boleto bancario, o prazo e contado apos a compensacao (ate 3 dias uteis).",
                  "O frete gratis e valido apenas para entregas em regioes atendidas pelas nossas transportadoras parceiras.",
                  "Entregas em areas de risco ou de dificil acesso podem ter prazos diferenciados.",
                  "A BBC AUTO PECAS nao se responsabiliza por atrasos decorrentes de eventos externos, como greves ou condicoes climaticas adversas.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <Truck className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-red-50 rounded-xl border border-red-100 p-8 text-center">
              <HelpCircle className="h-10 w-10 text-red-600 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Ainda tem duvidas?</h2>
              <p className="text-gray-600 mb-4">Entre em contato com nossa equipe de atendimento.</p>
              <Link href="/contato" className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors">
                FALE CONOSCO
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
