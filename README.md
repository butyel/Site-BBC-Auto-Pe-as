<p align="center">
  <img src="https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Prisma%207-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma 7" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TailwindCSS%204-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS 4" />
  <img src="https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

---

<h1 align="center">🔧 BBC AUTO PEÇAS</h1>
<h3 align="center">E-commerce Profissional de Autopeças</h3>

<p align="center">
  <a href="#-sobre">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-stack-tecnológica">Stack</a> •
  <a href="#-estrutura-do-projeto">Estrutura</a> •
  <a href="#-instalação">Instalação</a> •
  <a href="#-api-endpoints">API</a> •
  <a href="#-licença">Licença</a>
</p>

---

## 🚀 Sobre

Plataforma **e-commerce completa** para o setor de autopeças, construída com **Next.js 16** e **React 19**. O projeto oferece catálogo avançado de produtos, busca por veículo/modelo/ano, carrinho dinâmico, checkout otimizado com **PIX** e **Cartão de Crédito**, painel administrativo completo, e experiência responsiva com suporte a **modo escuro**.

> ⚡ Performance, SEO e usabilidade são prioridades em cada componente.

---

## ✨ Funcionalidades

| Ícone | Funcionalidade | Descrição |
|:---:|---|---|
| 📦 | **Catálogo Completo** | Navegação por categorias, marcas e produtos com filtros avançados |
| 🔍 | **Busca por Veículo** | Filtro inteligente por marca/modelo/ano do veículo |
| 🛒 | **Carrinho Dinâmico** | Carrinho persistente com atualizações em tempo real |
| 💳 | **Checkout em 3 Etapas** | Fluxo otimizado: endereço → pagamento → confirmação |
| 📱 | **PIX e Cartão de Crédito** | Pagamentos via PIX e integração com Stripe |
| 📊 | **Painel Administrativo** | Gestão de produtos, pedidos, clientes, cupons e banners |
| 🔐 | **Autenticação JWT** | Login seguro com JWT + NextAuth |
| 🏷️ | **Sistema de Cupons** | Cupons de desconto percentual e fixo com validade |
| 🚚 | **Calculadora de Frete** | Consulta automática de frete via CEP |
| 🔗 | **Produtos Relacionados** | Recomendações inteligentes na página do produto |
| 📈 | **SEO Otimizado** | Meta tags, sitemap e estrutura semântica |
| 📱 | **Design Responsivo** | Experiência perfeita em qualquer dispositivo |
| 🌙 | **Modo Escuro** | Tema claro/escuro com `next-themes` |
| 💬 | **Integração WhatsApp** | Contato direto via WhatsApp |
| ⭐ | **Avaliações e Favoritos** | Reviews e lista de desejos dos clientes |
| 📰 | **Newsletter** | Captura de leads com formulário de newsletter |

---

## 🛠 Stack Tecnológica

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.2.6 | Framework React full-stack |
| [React](https://react.dev/) | 19.2.4 | Biblioteca de UI |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Tipagem estática |
| [Prisma](https://www.prisma.io/) | 7.8.0 | ORM e migrations |
| [PostgreSQL](https://www.postgresql.org/) | — | Banco de dados relacional |
| [TailwindCSS](https://tailwindcss.com/) | ^4 | Estilização utility-first |
| [Stripe](https://stripe.com/) | ^22.1.1 | Gateway de pagamento |
| [NextAuth.js](https://next-auth.js.org/) | ^5.0.0-beta | Autenticação |
| [JWT](https://jwt.io/) | ^9.0.3 | Tokens de autenticação |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | ^3.0.3 | Hash de senhas |
| [Zod](https://zod.dev/) | ^4.4.3 | Validação de schemas |
| [Framer Motion](https://www.framer.com/motion/) | ^12.40.0 | Animações |
| [date-fns](https://date-fns.org/) | ^4.2.1 | Manipulação de datas |
| [Lucide React](https://lucide.dev/) | ^1.16.0 | Ícones |
| [Swiper](https://swiperjs.com/) | ^12.1.4 | Carrosséis e sliders |
| [shadcn/ui](https://ui.shadcn.com/) | — | Componentes acessíveis |
| [Radix UI](https://www.radix-ui.com/) | — | Primitivos de UI |
| [next-themes](https://github.com/pacocoursey/next-themes) | ^0.4.6 | Gerenciamento de temas |
| [Tailwind Merge](https://github.com/dcastil/tailwind-merge) | ^3.6.0 | Merge de classes |

---

## 📁 Estrutura do Projeto

```
bbc-autopecas/
├── prisma/                          # Schema e migrations do banco
│   ├── schema.prisma                # Modelos do banco de dados
│   └── seed.ts                      # Dados de seed
├── public/                          # Arquivos estáticos
│   └── images/                      # Imagens do sistema
├── src/
│   ├── app/                         # App Router (Next.js)
│   │   ├── (store)/                 # Rotas públicas da loja
│   │   │   ├── cadastro/            # Cadastro de cliente
│   │   │   ├── carrinho/            # Carrinho de compras
│   │   │   ├── checkout/            # Checkout em 3 etapas
│   │   │   ├── login/               # Login do cliente
│   │   │   ├── loja/                # Página da loja (catálogo)
│   │   │   ├── minhaconta/          # Área do cliente
│   │   │   │   ├── enderecos/       # Endereços do cliente
│   │   │   │   ├── favoritos/       # Lista de desejos
│   │   │   │   └── pedidos/         # Histórico de pedidos
│   │   │   ├── produto/[slug]/      # Página do produto
│   │   │   └── recuperar-senha/     # Recuperação de senha
│   │   ├── admin/                   # Painel administrativo
│   │   │   ├── banners/             # Gerenciar banners
│   │   │   ├── categorias/          # Gerenciar categorias
│   │   │   ├── clientes/            # Lista de clientes
│   │   │   ├── cupons/              # Gerenciar cupons
│   │   │   ├── estoque/             # Controle de estoque
│   │   │   ├── pedidos/             # Gerenciar pedidos
│   │   │   ├── produtos/            # Gerenciar produtos
│   │   │   ├── relatorios/          # Relatórios e gráficos
│   │   │   └── usuarios/            # Gerenciar usuários
│   │   ├── api/                     # API Routes
│   │   │   ├── addresses/           # Endereços
│   │   │   ├── admin/               # Admin (stats, users)
│   │   │   ├── auth/                # Auth (login, register)
│   │   │   ├── banners/             # Banners
│   │   │   ├── brands/              # Marcas
│   │   │   ├── cart/                # Carrinho
│   │   │   ├── categories/          # Categorias
│   │   │   ├── cep/                 # Consulta CEP
│   │   │   ├── coupons/             # Cupons
│   │   │   ├── favorites/           # Favoritos
│   │   │   ├── newsletter/          # Newsletter
│   │   │   ├── orders/              # Pedidos
│   │   │   ├── products/            # Produtos
│   │   │   └── vehicles/            # Veículos compatíveis
│   │   ├── globals.css              # Estilos globais
│   │   ├── layout.tsx               # Layout raiz
│   │   └── page.tsx                 # Home page (redireciona)
│   ├── components/                  # Componentes React
│   │   ├── cart/                    # Componentes do carrinho
│   │   ├── home/                    # Componentes da home
│   │   ├── layout/                  # Header, Footer, MegaMenu
│   │   ├── product/                 # Componentes de produto
│   │   ├── shared/                  # SearchBar, LoadingSkeleton
│   │   └── ui/                      # shadcn/ui (button, card, etc.)
│   ├── hooks/                       # Custom hooks
│   │   ├── useCart.ts               # Estado do carrinho
│   │   ├── useDebounce.ts           # Debounce para busca
│   │   ├── useFavorites.ts          # Estado de favoritos
│   │   └── useToast.ts              # Notificações toast
│   ├── lib/                         # Utilitários e config
│   │   ├── auth.ts                  # Configuração de autenticação
│   │   ├── prisma.ts                # Instância Prisma Client
│   │   ├── shadcn.ts                # Utilitário shadcn/ui
│   │   ├── utils.ts                 # Funções utilitárias
│   │   └── validations.ts           # Schemas Zod
│   ├── providers/                   # Context providers
│   │   ├── CartProvider.tsx
│   │   ├── FavoritesProvider.tsx
│   │   └── ToastProvider.tsx
│   └── types/                       # Tipos TypeScript
│       └── index.ts
├── .env                             # Variáveis de ambiente
├── next.config.ts                   # Configuração Next.js
├── tailwind.config.ts               # Configuração Tailwind
├── tsconfig.json                    # Configuração TypeScript
└── package.json                     # Dependências e scripts
```

---

## 📋 Pré-requisitos

- **Node.js** 18+ (recomendado 20+)
- **PostgreSQL** 14+
- **npm** ou **yarn**
- **Stripe Account** (para pagamentos)

---

## 🔧 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/bbc-autopecas.git
cd bbc-autopecas
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/bbc_autopecas"
JWT_SECRET="sua-chave-secreta-jwt"
NEXTAUTH_SECRET="sua-chave-nextauth"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Execute as migrations do Prisma

```bash
npx prisma migrate dev --name init
```

### 5. Popule o banco com dados de seed

```bash
npm run seed
```

> O seed cria automaticamente um **admin** e um **cliente de teste**, além de categorias, marcas, produtos e dados de veículos compatíveis.

### 6. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) 🚀

---

## 🌐 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `DATABASE_URL` | String de conexão com PostgreSQL | `postgresql://user:pass@localhost:5432/bbc_autopecas` |
| `JWT_SECRET` | Chave secreta para tokens JWT | `bbc-autopecas-jwt-secret-key-2024` |
| `NEXTAUTH_SECRET` | Chave secreta para NextAuth | `bbc-autopecas-nextauth-secret` |
| `NEXTAUTH_URL` | URL base da aplicação (produção) | `https://seudominio.com` |
| `NEXT_PUBLIC_API_URL` | URL pública da API | `http://localhost:3000/api` |
| `NEXT_PUBLIC_APP_URL` | URL pública da aplicação | `http://localhost:3000` |
| `STRIPE_SECRET_KEY` | Chave secreta do Stripe | `sk_test_...` |
| `STRIPE_PUBLISHABLE_KEY` | Chave publicável do Stripe | `pk_test_...` |
| `NEXT_PUBLIC_WHATSAPP` | Número do WhatsApp | `5511999999999` |

---

## 📝 Comandos Úteis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Compila o projeto para produção |
| `npm run start` | Inicia o servidor em produção |
| `npm run lint` | Executa ESLint em todo o projeto |
| `npm run seed` | Popula o banco com dados iniciais |
| `npx prisma studio` | Abre o Prisma Studio (interface gráfica do banco) |
| `npx prisma migrate dev` | Cria nova migration |
| `npx prisma migrate deploy` | Aplica migrations em produção |
| `npx prisma generate` | Regenera o Prisma Client |

---

## 👤 Credenciais de Teste

### Administrador

| Campo | Valor |
|---|---|
| **E-mail** | `admin@bbcautopecas.com.br` |
| **Senha** | `admin123` |
| **Acesso** | Painel administrativo completo |

### Cliente

| Campo | Valor |
|---|---|
| **E-mail** | `cliente@teste.com.br` |
| **Senha** | `123456` |
| **Acesso** | Área do cliente, compras e favoritos |

---

## 🗄 Estrutura do Banco de Dados

O schema Prisma define **12 modelos** principais:

| Modelo | Descrição | Principais Campos |
|---|---|---|
| `User` | Usuários (clientes e admins) | name, email, password, role, phone, cpf |
| `Address` | Endereços dos usuários | street, number, city, state, zipCode, isDefault |
| `Product` | Produtos do catálogo | name, slug, price, stock, sku, images, featured |
| `Category` | Categorias (hierárquicas) | name, slug, parentId (auto-relacionamento) |
| `Brand` | Marcas dos produtos | name, slug, logo |
| `CompatibleVehicle` | Veículos compatíveis | brand, model, year, engine |
| `Order` | Pedidos realizados | total, status, paymentMethod, shipping |
| `OrderItem` | Itens de cada pedido | productId, quantity, price |
| `Coupon` | Cupons de desconto | code, discount, discountType, expiresAt |
| `Banner` | Banners da home | title, image, link, isActive, order |
| `Review` | Avaliações de produtos | rating (1-5), comment |
| `Favorite` | Favoritos dos clientes | userId, productId (unique compound) |
| `Newsletter` | Inscrições newsletter | email (unique) |

**Relacionamentos principais:**
- `User` 1:N → `Address`, `Order`, `Favorite`, `Review`
- `Product` N:1 → `Category`, `Brand`
- `Product` 1:N → `CompatibleVehicle`, `OrderItem`, `Favorite`, `Review`
- `Category` 1:N → `Category` (auto-relacionamento para subcategorias)
- `Order` N:1 → `User`, `Address` | 1:N → `OrderItem` | N:1 → `Coupon`

---

## 📄 Páginas e Rotas

### Loja (Público)

| Rota | Descrição |
|---|---|
| `/` | Home page com banners, destaques e categorias |
| `/loja` | Catálogo completo com filtros e busca |
| `/loja?categoria=...` | Filtro por categoria |
| `/loja?marca=...` | Filtro por marca |
| `/loja?busca=...` | Busca textual |
| `/loja?veiculo=...` | Filtro por veículo |
| `/produto/[slug]` | Página detalhada do produto |
| `/carrinho` | Carrinho de compras |
| `/checkout` | Finalização do pedido (3 etapas) |
| `/login` | Login do cliente |
| `/cadastro` | Cadastro de novo cliente |
| `/recuperar-senha` | Recuperação de senha |

### Minha Conta (Cliente)

| Rota | Descrição |
|---|---|
| `/minhaconta` | Dashboard do cliente |
| `/minhaconta/pedidos` | Histórico de pedidos |
| `/minhaconta/favoritos` | Lista de desejos |
| `/minhaconta/enderecos` | Endereços de entrega |

### Administrativo

| Rota | Descrição |
|---|---|
| `/admin` | Dashboard administrativo com gráficos e stats |
| `/admin/produtos` | CRUD de produtos |
| `/admin/categorias` | Gerenciamento de categorias |
| `/admin/pedidos` | Gerenciamento de pedidos |
| `/admin/clientes` | Lista de clientes |
| `/admin/usuarios` | Gerenciamento de usuários do sistema |
| `/admin/cupons` | Gerenciamento de cupons |
| `/admin/estoque` | Controle de estoque |
| `/admin/banners` | Gerenciamento de banners |
| `/admin/relatorios` | Relatórios e métricas |

---

## 🔌 API Endpoints

### Autenticação

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/auth/login` | Login do usuário |
| `POST` | `/api/auth/register` | Cadastro de novo usuário |

### Produtos

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/products` | Listar produtos (com filtros) |
| `GET` | `/api/products/[id]` | Detalhes do produto |

### Categorias e Marcas

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/categories` | Listar categorias |
| `GET` | `/api/categories/[id]` | Categoria com produtos |
| `GET` | `/api/brands` | Listar marcas |

### Veículos

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/vehicles` | Listar veículos compatíveis |

### Carrinho e Pedidos

| Método | Rota | Descrição |
|---|---|---|
| `GET/POST` | `/api/cart` | Obter/criar carrinho |
| `GET` | `/api/orders` | Listar pedidos do usuário |
| `GET` | `/api/orders/[id]` | Detalhes do pedido |

### Cupons

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/coupons` | Listar cupons (admin) |
| `POST` | `/api/coupons/validate` | Validar cupom |
| `PUT/DELETE` | `/api/coupons/[id]` | Atualizar/excluir cupom |

### Favoritos

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/favorites` | Listar favoritos |
| `POST` | `/api/favorites` | Adicionar aos favoritos |
| `DELETE` | `/api/favorites` | Remover dos favoritos |

### Banners

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/banners` | Listar banners ativos |
| `POST/PUT/DELETE` | `/api/banners/[id]` | Gerenciar banner (admin) |

### Utilitários

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/cep/[cep]` | Consultar endereço por CEP |
| `POST` | `/api/newsletter` | Inscrição na newsletter |

### Administrativo

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/admin/stats` | Estatísticas do dashboard |
| `GET` | `/api/admin/users` | Listar usuários (admin) |
| `PUT/DELETE` | `/api/admin/users/[id]` | Gerenciar usuário |

---

## 🤝 Contribuição

Contribuições são bem-vindas! Siga o passo a passo:

1. **Fork** o projeto
2. Crie uma **branch** descritiva: `git checkout -b feat/nova-funcionalidade`
3. Faça suas alterações e **commit**: `git commit -m 'feat: adiciona nova funcionalidade'`
4. **Push** para a branch: `git push origin feat/nova-funcionalidade`
5. Abra um **Pull Request**

**Padrão de commits:** seguimos [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `style:` formatação de código
- `refactor:` refatoração
- `perf:` melhoria de performance
- `docs:` documentação

---

## 📜 Licença

Este projeto está licenciado sob a **Licença MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Feito com ❤️ pela <strong>BBC Auto Peças</strong>
  <br />
  <sub>© 2024 BBC AUTO PEÇAS. Todos os direitos reservados.</sub>
</p>
