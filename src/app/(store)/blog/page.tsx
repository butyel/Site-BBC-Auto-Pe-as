"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Search, Clock, Tag } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "Como escolher a peça de reposicao ideal para seu veiculo",
    excerpt: "A escolha da peça de reposicao correta e fundamental para garantir a seguranca e o desempenho do seu veiculo. Confira nossas dicas.",
    author: "Equipe BBC",
    date: "15 Mai 2026",
    category: "Dicas",
    readTime: "5 min",
    image: null,
  },
  {
    id: 2,
    title: "Sinais de que sua suspensao precisa de atencao",
    excerpt: "Barulhos estranhos, direcao desalinhada e pneus desgastados podem indicar problemas na suspensao. Saiba identificar.",
    author: "Equipe BBC",
    date: "10 Mai 2026",
    category: "Mecanica",
    readTime: "4 min",
    image: null,
  },
  {
    id: 3,
    title: "Entenda a diferenca entre oleos lubrificantes",
    excerpt: "Sintetico, semissintetico ou mineral? Entenda as diferencas e escolha o oleo certo para o motor do seu carro.",
    author: "Equipe BBC",
    date: "05 Mai 2026",
    category: "Dicas",
    readTime: "6 min",
    image: null,
  },
  {
    id: 4,
    title: "Como aumentar a vida util dos freios do seu carro",
    excerpt: "Pequenos habitos podem fazer grande diferenca na durabilidade do sistema de freios. Veja como cuidar melhor.",
    author: "Equipe BBC",
    date: "28 Abr 2026",
    category: "Manutencao",
    readTime: "4 min",
    image: null,
  },
  {
    id: 5,
    title: "Guia completo de manutencao preventiva automotiva",
    excerpt: "Manter a manutencao em dia e essencial para evitar problemas e gastos inesperados. Confira o checklist completo.",
    author: "Equipe BBC",
    date: "20 Abr 2026",
    category: "Manutencao",
    readTime: "8 min",
    image: null,
  },
  {
    id: 6,
    title: "Pneu careca: riscos e quando trocar",
    excerpt: "Rodar com pneus carecas e extremamente perigoso. Saiba identificar o ponto ideal de troca e garanta sua seguranca.",
    author: "Equipe BBC",
    date: "15 Abr 2026",
    category: "Seguranca",
    readTime: "3 min",
    image: null,
  },
];

const categories = ["Todas", "Dicas", "Mecanica", "Manutencao", "Seguranca"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "Todas" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Blog <span className="text-bbc-light">BBC AUTO PECAS</span>
            </h1>
            <p className="text-lg text-gray-300">
              Dicas, novidades e informacoes sobre o mundo automotivo para ajudar voce a cuidar melhor do seu veiculo.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-bbc text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-bbc focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Nenhum artigo encontrado.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-accent transition-all group"
                >
                  <div className="aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <span className="text-4xl">🔧</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-bbc transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </span>
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center gap-1 text-sm text-bbc hover:text-bbc-dark font-medium"
                      >
                        Ler mais
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
