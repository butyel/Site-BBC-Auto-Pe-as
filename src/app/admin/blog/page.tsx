"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  Clock,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { slugify } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  readTime: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
}

const initialPosts: BlogPost[] = [
  {
    id: "1",
    title: "Como escolher a peça de reposição ideal para seu veículo",
    slug: "como-escolher-a-peca-de-reposicao-ideal",
    excerpt: "A escolha da peça de reposição correta é fundamental para garantir a segurança e o desempenho do seu veículo. Confira nossas dicas.",
    content: "Conteúdo completo do artigo sobre como escolher peças de reposição...",
    image: "",
    author: "Equipe BBC",
    category: "Dicas",
    readTime: "5 min",
    published: true,
    featured: true,
    createdAt: "2026-05-15",
  },
  {
    id: "2",
    title: "Sinais de que sua suspensão precisa de atenção",
    slug: "sinais-de-que-sua-suspensao-precisa-de-atencao",
    excerpt: "Barulhos estranhos, direção desalinhada e pneus desgastados podem indicar problemas na suspensão. Saiba identificar.",
    content: "Conteúdo completo sobre suspensão automotiva...",
    image: "",
    author: "Equipe BBC",
    category: "Mecânica",
    readTime: "4 min",
    published: true,
    featured: false,
    createdAt: "2026-05-10",
  },
  {
    id: "3",
    title: "Entenda a diferença entre óleos lubrificantes",
    slug: "entenda-a-diferenca-entre-oleos-lubrificantes",
    excerpt: "Sintético, semissintético ou mineral? Entenda as diferenças e escolha o óleo certo para o motor do seu carro.",
    content: "Conteúdo completo sobre óleos lubrificantes...",
    image: "",
    author: "Equipe BBC",
    category: "Dicas",
    readTime: "6 min",
    published: true,
    featured: false,
    createdAt: "2026-05-05",
  },
  {
    id: "4",
    title: "Guia completo de manutenção preventiva automotiva",
    slug: "guia-completo-de-manutencao-preventiva-automotiva",
    excerpt: "Manter a manutenção em dia é essencial para evitar problemas e gastos inesperados. Confira o checklist completo.",
    content: "Conteúdo completo sobre manutenção preventiva...",
    image: "",
    author: "Equipe BBC",
    category: "Manutenção",
    readTime: "8 min",
    published: true,
    featured: true,
    createdAt: "2026-04-20",
  },
];

const categoriesList = ["Dicas", "Mecânica", "Manutenção", "Segurança", "Novidades"];

const emptyPost: BlogPost = {
  id: "", title: "", slug: "", excerpt: "", content: "",
  image: "", author: "Equipe BBC", category: "Dicas",
  readTime: "5 min", published: false, featured: false, createdAt: "",
};

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost>(emptyPost);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  function handleOpenNew() {
    setEditingPost(emptyPost);
    setDialogOpen(true);
  }

  function handleEdit(post: BlogPost) {
    setEditingPost({ ...post });
    setDialogOpen(true);
  }

  function handleDelete(id: string) {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  }

  function confirmDelete() {
    setPosts((prev) => prev.filter((p) => p.id !== deletingId));
    setDeleteDialogOpen(false);
    setDeletingId(null);
  }

  function handleSave() {
    if (editingPost.id) {
      setPosts((prev) =>
        prev.map((p) => (p.id === editingPost.id ? editingPost : p))
      );
    } else {
      const newPost = {
        ...editingPost,
        id: String(Date.now()),
        createdAt: new Date().toISOString().split("T")[0],
      };
      setPosts((prev) => [...prev, newPost]);
    }
    setDialogOpen(false);
  }

  function handleTogglePublished(id: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, published: !p.published } : p
      )
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">BLOG</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie os artigos do blog
          </p>
        </div>
        <Button onClick={handleOpenNew}>
          <Plus className="w-4 h-4 mr-2" />
          NOVO POST
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar posts por título..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Título</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Categoria</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Autor</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Data</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Destaque</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((post) => (
                  <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium max-w-[250px] truncate">
                      {post.title}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{post.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{post.author}</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.createdAt}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleTogglePublished(post.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          post.published ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            post.published ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      {post.featured ? (
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          Destaque
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-[#DC2626] hover:bg-accent transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-bbc hover:bg-accent transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      Nenhum post encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPost.id ? "Editar Post" : "Novo Post"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados do artigo abaixo.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost((prev) => ({
                      ...prev,
                      title: e.target.value,
                      slug: slugify(e.target.value),
                    }))
                  }
                  placeholder="Título do artigo"
                />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input
                  value={editingPost.slug}
                  onChange={(e) =>
                    setEditingPost((prev) => ({
                      ...prev,
                      slug: e.target.value,
                    }))
                  }
                  placeholder="slug-do-artigo"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Resumo</Label>
              <textarea
                className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={editingPost.excerpt}
                onChange={(e) =>
                  setEditingPost((prev) => ({
                    ...prev,
                    excerpt: e.target.value,
                  }))
                }
                placeholder="Resumo do artigo"
              />
            </div>

            <div className="space-y-2">
              <Label>Conteúdo</Label>
              <textarea
                className="flex min-h-[200px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={editingPost.content}
                onChange={(e) =>
                  setEditingPost((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                placeholder="Conteúdo completo do artigo"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  value={editingPost.category}
                  onValueChange={(v) =>
                    setEditingPost((prev) => ({ ...prev, category: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesList.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tempo de Leitura</Label>
                <Input
                  value={editingPost.readTime}
                  onChange={(e) =>
                    setEditingPost((prev) => ({
                      ...prev,
                      readTime: e.target.value,
                    }))
                  }
                  placeholder="5 min"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Autor</Label>
                <Input
                  value={editingPost.author}
                  onChange={(e) =>
                    setEditingPost((prev) => ({
                      ...prev,
                      author: e.target.value,
                    }))
                  }
                  placeholder="Equipe BBC"
                />
              </div>
              <div className="space-y-2">
                <Label>URL da Imagem</Label>
                <Input
                  value={editingPost.image}
                  onChange={(e) =>
                    setEditingPost((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="published"
                  checked={editingPost.published}
                  onCheckedChange={(v) =>
                    setEditingPost((prev) => ({
                      ...prev,
                      published: v === true,
                    }))
                  }
                />
                <Label htmlFor="published" className="cursor-pointer">
                  Publicado
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="featured"
                  checked={editingPost.featured}
                  onCheckedChange={(v) =>
                    setEditingPost((prev) => ({
                      ...prev,
                      featured: v === true,
                    }))
                  }
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Em Destaque
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Check className="w-4 h-4 mr-2" />
              {editingPost.id ? "Atualizar" : "Criar"} Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
