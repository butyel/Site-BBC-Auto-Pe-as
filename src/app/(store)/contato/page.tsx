"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail, MapPin, Send, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const contactInfo = [
  { icon: Phone, label: "Telefone", value: "(11) 9999-9999", href: "tel:+5511999999999" },
  { icon: MessageCircle, label: "WhatsApp", value: "(11) 99999-9999", href: "https://wa.me/5511999999999" },
  { icon: Mail, label: "E-mail", value: "contato@bbcautopecas.com.br", href: "mailto:contato@bbcautopecas.com.br" },
  { icon: MapPin, label: "Endereco", value: "Rua das Oficinas, 123 - Sao Paulo, SP", href: "#" },
  { icon: Clock, label: "Horario de Atendimento", value: "Seg a Sex: 8h as 18h | Sab: 8h as 13h", href: "#" },
];

const faqItems = [
  { question: "Qual o prazo de entrega?", answer: "O prazo varia conforme o CEP de destino. Em media, entregamos em 3 a 10 dias uteis para capitais e 5 a 15 dias uteis para demais regioes." },
  { question: "Como faço para trocar um produto?", answer: "Entre em contato conosco em ate 7 dias corridos apos o recebimento. A troca pode ser feita por desistencia ou por defeito." },
  { question: "Quais as formas de pagamento?", answer: "Aceitamos cartoes de credito (Visa, Mastercard, Elo, American Express), boleto bancario e PIX." },
];

export default function ContatoPage() {
  const [formData, setFormData] = useState({ nome: "", email: "", assunto: "", mensagem: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <Mail className="h-16 w-16 text-bbc-light mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Fale <span className="text-bbc-light">Conosco</span></h1>
            <p className="text-lg text-gray-300">Estamos prontos para atender voce. Escolha o canal de sua preferencia.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-accent transition-all group"
              >
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4 group-hover:bg-bbc transition-colors">
                  <item.icon className="h-6 w-6 text-bbc group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.value}</p>
              </motion.a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Envie sua <span className="text-bbc">Mensagem</span></h2>
                <p className="text-sm text-gray-500 mb-6">Responderemos em ate 24 horas uteis.</p>

                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Mensagem Enviada!</h3>
                    <p className="text-gray-500">Recebemos sua mensagem com sucesso. Entraremos em contato em breve.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nome">Nome</Label>
                        <Input id="nome" placeholder="Seu nome" value={formData.nome} onChange={handleChange} className="mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} className="mt-1" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="assunto">Assunto</Label>
                      <select
                        id="assunto"
                        value={formData.assunto}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-bbc focus:border-transparent bg-white"
                        required
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="duvida">Duvida sobre produtos</option>
                        <option value="pedido">Pedido e entrega</option>
                        <option value="troca">Troca e devolucao</option>
                        <option value="orcamento">Orcamento</option>
                        <option value="sugestao">Sugestao ou reclamacao</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="mensagem">Mensagem</Label>
                      <textarea
                        id="mensagem"
                        placeholder="Digite sua mensagem..."
                        value={formData.mensagem}
                        onChange={handleChange}
                        rows={5}
                        className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-bbc focus:border-transparent resize-none"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-bbc hover:bg-bbc-dark text-white font-bold rounded-xl"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ENVIANDO...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          ENVIAR MENSAGEM
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Perguntas <span className="text-bbc">Frequentes</span></h2>
                <div className="space-y-4">
                  {faqItems.map((item) => (
                    <details key={item.question} className="group">
                      <summary className="flex items-center justify-between cursor-pointer list-none py-3 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <span className="text-sm font-medium text-gray-900">{item.question}</span>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-open:rotate-90 transition-transform" />
                      </summary>
                      <p className="mt-2 px-4 pb-3 text-sm text-gray-500 leading-relaxed">{item.answer}</p>
                    </details>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link href="/ajuda/faq" className="text-sm text-bbc hover:text-bbc-dark font-medium">
                    Ver todas as perguntas frequentes
                  </Link>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-br from-bbc to-bbc-secondary rounded-2xl p-8 text-white text-center">
                <MessageCircle className="h-10 w-10 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">Atendimento via WhatsApp</h3>
                <p className="text-blue-100 text-sm mb-4">Nosso canal mais rapido de atendimento.</p>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-bbc px-6 py-3 rounded-xl font-semibold hover:bg-accent transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  FALAR NO WHATSAPP
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
