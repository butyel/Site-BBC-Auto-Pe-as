"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, User, Clock, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  author: string;
  category: string;
  readTime: string;
  published: boolean;
  createdAt: string;
}

const fallbackPost: BlogPost = {
  id: "1",
  title: "Como escolher a peça de reposição ideal para seu veículo",
  slug: "como-escolher-a-peca-de-reposicao-ideal-para-seu-veiculo",
  excerpt: "A escolha da peça de reposição correta é fundamental para garantir a segurança e o desempenho do seu veículo.",
  content: `A escolha da peça de reposição correta é uma decisão crucial para qualquer proprietário de veículo. Utilizar componentes inadequados pode comprometer não apenas o desempenho, mas também a segurança de todos os ocupantes.

## Por que escolher a peça certa?

Peças de qualidade garantem maior durabilidade e funcionamento adequado do veículo. Optar por componentes originais ou de marcas reconhecidas no mercado é sempre a melhor escolha.

## Dicas para escolher

1. **Verifique o manual do proprietário** - Ele contém todas as especificações técnicas necessárias.
2. **Consulte um profissional** - Mecânicos de confiança podem orientar sobre as melhores opções.
3. **Desconfie de preços muito baixos** - Peças muito baratas podem indicar baixa qualidade.
4. **Prefira marcas reconhecidas** - Marcas como Bosch, Mann, Monroe e NGK têm padrão de qualidade garantido.

## Cuidados ao comprar

Sempre verifique se a peça é compatível com o ano, modelo e versão do seu veículo. Na BBC Auto Peças, todos os nossos produtos passam por rigoroso controle de qualidade para garantir sua satisfação.`,
  image: null,
  author: "Equipe BBC",
  category: "Dicas",
  readTime: "5 min",
  published: true,
  createdAt: "2026-05-15",
};

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const res = await fetch(`/api/blog?search=${params.slug}&limit=1`);
        const data = await res.json();
        if (data.posts?.[0]) {
          setPost(data.posts[0]);
        } else {
          setPost(fallbackPost);
        }
      } catch {
        setPost(fallbackPost);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-gray-200 rounded" />
          <div className="h-4 w-48 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post não encontrado</h1>
          <Link href="/blog">
            <Button>Voltar ao Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Blog
            </Link>
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.createdAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4">
          {post.image && (
            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-10">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-lg max-w-none"
          >
            {post.content.split("\n").map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("1. ") || paragraph.startsWith("2. ") || paragraph.startsWith("3. ") || paragraph.startsWith("4. ")) {
                return null;
              }
              if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                return (
                  <p key={index} className="font-semibold text-gray-900 mb-2">
                    {paragraph.replace(/\*\*/g, "")}
                  </p>
                );
              }
              if (paragraph.trim() === "") return null;
              return (
                <p key={index} className="text-gray-600 leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}

            {post.content.includes("1. ") && (
              <ol className="list-decimal list-inside space-y-3 text-gray-600 mb-6">
                {post.content.split("\n").filter(l => /^\d+\.\s/.test(l)).map((item, i) => (
                  <li key={i}>
                    <strong>{item.match(/\*\*(.*?)\*\*/)?.[1]}</strong>
                    {item.replace(/^\d+\.\s\*\*.*?\*\*\s*-\s*/, " — ")}
                  </li>
                ))}
              </ol>
            )}
          </motion.article>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
