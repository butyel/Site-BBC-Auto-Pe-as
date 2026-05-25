"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Heart, TrendingUp, Send, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const benefits = [
  { icon: Heart, title: "Plano de Saude", description: "Assistencia medica e odontologica para voce e sua familia." },
  { icon: TrendingUp, title: "Crescimento Profissional", description: "Oportunidades reais de desenvolvimento e promocao interna." },
  { icon: Users, title: "Ambiente Colaborativo", description: "Cultura organizacional baseada em respeito e trabalho em equipe." },
  { icon: Briefcase, title: "Vale Alimentacao", description: "Vale alimentacao ou refeicao para o seu dia a dia." },
];

const openPositions = [
  { title: "Vendedor(a) Interno", department: "Vendas", type: "Efetivo - CLT", location: "Sao Paulo, SP" },
  { title: "Mecanico(a) de Bancada", department: "Oficina", type: "Efetivo - CLT", location: "Sao Paulo, SP" },
  { title: "Analista de Logistica", department: "Operacoes", type: "Efetivo - CLT", location: "Sao Paulo, SP" },
  { title: "Atendente de Loja", department: "Vendas", type: "Efetivo - CLT", location: "Sao Paulo, SP" },
];

export default function TrabalheConoscoPage() {
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "", cargo: "", mensagem: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            <Briefcase className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Trabalhe <span className="text-red-500">Conosco</span></h1>
            <p className="text-lg text-gray-300">
              Faça parte do time BBC AUTO PEÇAS. Buscamos profissionais apaixonados por automóveis e comprometidos com a excelência.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Por que trabalhar <span className="text-red-600">conosco?</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mb-3">
                      <benefit.icon className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-500">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Vagas <span className="text-red-600">Abertas</span></h2>
              <div className="space-y-4">
                {openPositions.map((position) => (
                  <motion.div
                    key={position.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:border-red-200 transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{position.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{position.department} - {position.type}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{position.location}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm sticky top-28">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Candidate-se</h2>
                <p className="text-sm text-gray-500 mb-6">Preencha o formulario abaixo e envie seu curriculo.</p>

                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Candidatura Enviada!</h3>
                    <p className="text-gray-500">Recebemos sua candidatura com sucesso. Entraremos em contato em breve.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input id="nome" placeholder="Seu nome completo" value={formData.nome} onChange={handleChange} className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" placeholder="(11) 99999-9999" value={formData.telefone} onChange={handleChange} className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="cargo">Cargo de Interesse</Label>
                      <Input id="cargo" placeholder="Ex: Vendedor(a)" value={formData.cargo} onChange={handleChange} className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="mensagem">Mensagem</Label>
                      <textarea
                        id="mensagem"
                        placeholder="Conte um pouco sobre voce e sua experiencia..."
                        value={formData.mensagem}
                        onChange={handleChange}
                        rows={4}
                        className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ENVIANDO...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          ENVIAR CANDIDATURA
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
