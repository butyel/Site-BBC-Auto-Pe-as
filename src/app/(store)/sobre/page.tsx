"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Headphones, Award, Users, Target } from "lucide-react";
import Link from "next/link";

const values = [
  { icon: ShieldCheck, title: "Qualidade Garantida", description: "Todas as nossas peças passam por rigoroso controle de qualidade e oferecem garantia original de fábrica." },
  { icon: Truck, title: "Entrega Rápida", description: "Entregamos para todo o Brasil com prazos competitivos e frete grátis para compras acima de R$ 299." },
  { icon: Headphones, title: "Suporte Especializado", description: "Nossa equipe técnica está pronta para ajudar na escolha da peça certa para seu veículo." },
  { icon: Award, title: "Preço Justo", description: "Trabalhamos com preços competitivos e condições especiais de pagamento para nossos clientes." },
];

const timeline = [
  { year: "2010", title: "Fundação", description: "A BBC AUTO PEÇAS nasceu da paixão por automóveis e do desejo de oferecer peças de qualidade." },
  { year: "2014", title: "Expansão", description: "Abrimos nossa primeira filial e ampliamos nosso catálogo para mais de 10 mil produtos." },
  { year: "2018", title: "E-commerce", description: "Lançamos nossa loja virtual para atender clientes de todo o Brasil." },
  { year: "2022", title: "Liderança", description: "Nos tornamos referência nacional em autopeças com milhares de clientes satisfeitos." },
];

export default function SobrePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Sobre a <span className="text-red-500">BBC AUTO PEÇAS</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Há mais de 15 anos oferecendo as melhores peças automotivas para motoristas, mecânicas e oficinas de todo o Brasil. Nossa missão é manter seu veículo rodando com segurança e qualidade.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Nossa <span className="text-red-600">História</span></h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Fundada em 2010, a BBC AUTO PEÇAS começou como uma pequena loja de bairro especializada em peças de motor. Com o passar dos anos, fomos crescendo e expandindo nosso catálogo para atender todas as necessidades dos nossos clientes.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Hoje, somos uma das maiores referências em autopeças do Brasil, com milhares de produtos em estoque e uma equipe altamente capacitada para oferecer o melhor atendimento.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Nosso compromisso é com a qualidade, procedência e satisfação dos nossos clientes. Cada peça vendida passa por um rigoroso processo de seleção para garantir que você receba exatamente o que há de melhor no mercado.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-red-600 to-red-800">
                <div className="w-full h-full flex items-center justify-center">
                  <Users className="h-24 w-24 text-white/30" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 hidden lg:block">
                <div className="text-3xl font-bold text-red-600">15+</div>
                <div className="text-sm text-gray-500">Anos de experiência</div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-red-100 transition-all group"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                  <value.icon className="h-6 w-6 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">Nossa <span className="text-red-600">Trajetória</span></h2>
            <div className="space-y-8 lg:space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-start gap-4 md:gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                      <span className="text-sm font-bold text-red-600">{item.year}</span>
                      <h3 className="text-lg font-semibold text-gray-900 mt-1">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-2">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-8 h-8 bg-red-600 rounded-full items-center justify-center flex-shrink-0 relative z-10">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Target className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Missão, Visão & Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Missão</h3>
                <p className="text-gray-500 leading-relaxed">Oferecer peças automotivas de qualidade com excelência em atendimento, contribuindo para a segurança e satisfação dos nossos clientes.</p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Visão</h3>
                <p className="text-gray-500 leading-relaxed">Ser referência nacional em autopeças, reconhecida pela qualidade dos produtos, inovação no atendimento e responsabilidade com o cliente.</p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Valores</h3>
                <p className="text-gray-500 leading-relaxed">Qualidade, transparência, compromisso com o cliente, responsabilidade social e ambiental, inovação constante e trabalho em equipe.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Vamos <span className="text-red-600">Trabalhar Juntos?</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto mb-8">
              Entre em contato conosco para saber mais sobre nossos produtos, serviços e condições especiais para mecânicas e oficinas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contato"
                className="px-8 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
              >
                FALE CONOSCO
              </Link>
              <Link
                href="/loja"
                className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
              >
                VER PRODUTOS
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
