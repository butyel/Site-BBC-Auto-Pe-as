import { prisma } from '../src/lib/prisma'
import { Role, OrderStatus, PaymentMethod, DiscountType } from '@prisma/client'
import bcrypt from 'bcryptjs'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .replace(/-+/g, '-')
}

function svgLogo(letters: string, bg: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60">
    <rect width="120" height="60" rx="6" fill="${bg}"/>
    <text x="60" y="38" text-anchor="middle" fill="white" font-size="22" font-weight="bold" font-family="Arial,sans-serif">${letters}</text>
  </svg>`
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

function imgUrl(color: string, text: string, w = 600, h = 600): string {
  const t = text.replace(/ /g, '+')
  return `https://placehold.co/${w}x${h}/${color}/ffffff?text=${t}`
}

async function main() {
  console.log('🧹 Limpando banco de dados...')
  await prisma.favorite.deleteMany()
  await prisma.review.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.compatibleVehicle.deleteMany()
  await prisma.product.deleteMany()
  await prisma.address.deleteMany()
  await prisma.category.deleteMany()
  await prisma.brand.deleteMany()
  await prisma.coupon.deleteMany()
  await prisma.banner.deleteMany()
  await prisma.newsletter.deleteMany()
  await prisma.user.deleteMany()

  // ─── 1. BRANDS ────────────────────────────────────────────────
  console.log('🏭 Criando marcas...')
  const brandsData = [
    { name: 'Volkswagen', slug: 'volkswagen', logo: svgLogo('VW', '#0056A0'), description: 'Montadora alemã fundada em 1937, uma das maiores fabricantes de automóveis do mundo. Líder de mercado no Brasil com modelos como Gol, Polo e T-Cross.' },
    { name: 'Chevrolet', slug: 'chevrolet', logo: svgLogo('GM', '#C8102E'), description: 'Marca americana fundada em 1911, presente no Brasil desde 1925. Conhecida por modelos como Onix, Cruze e S10.' },
    { name: 'Fiat', slug: 'fiat', logo: svgLogo('FIAT', '#003366'), description: 'Montadora italiana fundada em 1899, uma das marcas mais populares do Brasil. Famosa pelos modelos Palio, Uno e Strada.' },
    { name: 'Ford', slug: 'ford', logo: svgLogo('FORD', '#1B396A'), description: 'Montadora americana fundada em 1903, presente no Brasil desde 1919. Conhecida por modelos como Ka, Focus e Ranger.' },
    { name: 'Toyota', slug: 'toyota', logo: svgLogo('TOYOTA', '#B20B0B'), description: 'Montadora japonesa fundada em 1937, líder mundial em produção de veículos. Reconhecida por modelos como Corolla, Hilux e Etios.' },
    { name: 'Honda', slug: 'honda', logo: svgLogo('HONDA', '#003D6B'), description: 'Montadora japonesa fundada em 1948, conhecida pela confiabilidade e inovação. Modelos populares incluem Civic, HR-V e Accord.' },
    { name: 'Hyundai', slug: 'hyundai', logo: svgLogo('HYUNDAI', '#002C5F'), description: 'Montadora sul-coreana fundada em 1967, em rápido crescimento no Brasil. Destaca-se com os modelos HB20, Creta e Tucson.' },
    { name: 'Nissan', slug: 'nissan', logo: svgLogo('NISSAN', '#C3002F'), description: 'Montadora japonesa fundada em 1933, conhecida por veículos inovadores e robustos. Modelos populares incluem Versa, Kicks e Frontier.' },
    { name: 'Renault', slug: 'renault', logo: svgLogo('RENAULT', '#FFC300'), description: 'Montadora francesa fundada em 1899, com forte presença no Brasil. Conhecida pelos modelos Sandero, Kwid e Duster.' },
    { name: 'Jeep', slug: 'jeep', logo: svgLogo('JEEP', '#1C1C1C'), description: 'Marca americana fundada em 1941, sinônimo de veículos off-road. Modelos icônicos incluem Renegade, Compass e Wrangler.' },
  ]
  const brands = await Promise.all(
    brandsData.map((b) => prisma.brand.create({ data: b }))
  )
  const brandMap = Object.fromEntries(brands.map((b) => [b.slug, b.id]))

  // ─── 2. CATEGORIES ────────────────────────────────────────────
  console.log('📂 Criando categorias...')
  const parentCategories = [
    { name: 'Freio', slug: 'freio', description: 'Peças para sistema de frenagem automotiva', image: imgUrl('DC2626', 'Freio', 600, 400) },
    { name: 'Suspensão', slug: 'suspensao', description: 'Peças para sistema de suspensão', image: imgUrl('16A34A', 'Suspensao', 600, 400) },
    { name: 'Motor', slug: 'motor', description: 'Peças e componentes para motor', image: imgUrl('2563EB', 'Motor', 600, 400) },
    { name: 'Elétrica', slug: 'eletrica', description: 'Peças para sistema elétrico automotivo', image: imgUrl('D97706', 'Eletrica', 600, 400) },
    { name: 'Transmissão', slug: 'transmissao', description: 'Peças para sistema de transmissão', image: imgUrl('7C3AED', 'Transmissao', 600, 400) },
    { name: 'Arrefecimento', slug: 'arrefecimento', description: 'Peças para sistema de arrefecimento', image: imgUrl('0891B2', 'Arrefecimento', 600, 400) },
    { name: 'Escape', slug: 'escape', description: 'Peças para sistema de escape', image: imgUrl('6B7280', 'Escape', 600, 400) },
    { name: 'Direção', slug: 'direcao', description: 'Peças para sistema de direção', image: imgUrl('1F2937', 'Direcao', 600, 400) },
    { name: 'Carroceria', slug: 'carroceria', description: 'Peças para carroceria e lataria', image: imgUrl('BE185D', 'Carroceria', 600, 400) },
    { name: 'Acessórios', slug: 'acessorios', description: 'Acessórios automotivos diversos', image: imgUrl('65A30D', 'Acessorios', 600, 400) },
    { name: 'Iluminação', slug: 'iluminacao', description: 'Peças para iluminação automotiva', image: imgUrl('EAB308', 'Iluminacao', 600, 400) },
    { name: 'Filtros', slug: 'filtros', description: 'Filtros automotivos em geral', image: imgUrl('0F766E', 'Filtros', 600, 400) },
  ]

  const createdParents = await Promise.all(
    parentCategories.map((c) => prisma.category.create({ data: c }))
  )
  const catMap = Object.fromEntries(createdParents.map((c) => [c.slug, c.id]))

  const subcategoriesData = [
    { name: 'Pastilhas de Freio', slug: 'pastilhas-de-freio', parentSlug: 'freio' },
    { name: 'Discos de Freio', slug: 'discos-de-freio', parentSlug: 'freio' },
    { name: 'Tambores', slug: 'tambores', parentSlug: 'freio' },
    { name: 'Amortecedores', slug: 'amortecedores', parentSlug: 'suspensao' },
    { name: 'Molas', slug: 'molas', parentSlug: 'suspensao' },
    { name: 'Buchas', slug: 'buchas', parentSlug: 'suspensao' },
    { name: 'Bielas', slug: 'bielas', parentSlug: 'motor' },
    { name: 'Pistões', slug: 'pistoes', parentSlug: 'motor' },
    { name: 'Válvulas', slug: 'valvulas', parentSlug: 'motor' },
    { name: 'Baterias', slug: 'baterias', parentSlug: 'eletrica' },
    { name: 'Alternadores', slug: 'alternadores', parentSlug: 'eletrica' },
    { name: 'Motores de Partida', slug: 'motores-de-partida', parentSlug: 'eletrica' },
    { name: 'Embreagens', slug: 'embreagens', parentSlug: 'transmissao' },
    { name: 'Câmbios', slug: 'cambios', parentSlug: 'transmissao' },
    { name: 'Diferenciais', slug: 'diferenciais', parentSlug: 'transmissao' },
    { name: 'Radiadores', slug: 'radiadores', parentSlug: 'arrefecimento' },
    { name: 'Bombas d\'Água', slug: 'bombas-dagua', parentSlug: 'arrefecimento' },
    { name: 'Mangueiras', slug: 'mangueiras', parentSlug: 'arrefecimento' },
    { name: 'Silenciosos', slug: 'silenciosos', parentSlug: 'escape' },
    { name: 'Catalisadores', slug: 'catalisadores', parentSlug: 'escape' },
    { name: 'Tubos', slug: 'tubos', parentSlug: 'escape' },
    { name: 'Caixas de Direção', slug: 'caixas-de-direcao', parentSlug: 'direcao' },
    { name: 'Barras', slug: 'barras', parentSlug: 'direcao' },
    { name: 'Terminais', slug: 'terminais', parentSlug: 'direcao' },
    { name: 'Para-choques', slug: 'para-choques', parentSlug: 'carroceria' },
    { name: 'Vidros', slug: 'vidros', parentSlug: 'carroceria' },
    { name: 'Retrovisores', slug: 'retrovisores', parentSlug: 'carroceria' },
    { name: 'Tapetes', slug: 'tapetes', parentSlug: 'acessorios' },
    { name: 'Capas', slug: 'capas', parentSlug: 'acessorios' },
    { name: 'Kits', slug: 'kits', parentSlug: 'acessorios' },
    { name: 'Faróis', slug: 'farois', parentSlug: 'iluminacao' },
    { name: 'Lanternas', slug: 'lanternas', parentSlug: 'iluminacao' },
    { name: 'Lâmpadas', slug: 'lampadas', parentSlug: 'iluminacao' },
    { name: 'Filtros de Óleo', slug: 'filtros-de-oleo', parentSlug: 'filtros' },
    { name: 'Filtros de Ar', slug: 'filtros-de-ar', parentSlug: 'filtros' },
    { name: 'Filtros de Combustível', slug: 'filtros-de-combustivel', parentSlug: 'filtros' },
  ]

  const subcategories = await Promise.all(
    subcategoriesData.map((sc) =>
      prisma.category.create({
        data: {
          name: sc.name,
          slug: sc.slug,
          parentId: catMap[sc.parentSlug],
          image: imgUrl(catMap[sc.parentSlug] === catMap['freio'] ? 'DC2626' : '0F766E', sc.name, 600, 400),
        },
      })
    )
  )
  const subcatMap = Object.fromEntries(subcategories.map((c) => [c.slug, c.id]))

  // ─── 3. VEHICLES ──────────────────────────────────────────────
  const vehicleTemplates = [
    { brand: 'Volkswagen', model: 'Gol', engine: '1.0' },
    { brand: 'Volkswagen', model: 'Gol', engine: '1.6' },
    { brand: 'Chevrolet', model: 'Onix', engine: '1.0' },
    { brand: 'Chevrolet', model: 'Onix', engine: '1.4' },
    { brand: 'Fiat', model: 'Palio', engine: '1.0' },
    { brand: 'Fiat', model: 'Palio', engine: '1.4' },
    { brand: 'Ford', model: 'Ka', engine: '1.0' },
    { brand: 'Ford', model: 'Ka', engine: '1.5' },
    { brand: 'Toyota', model: 'Corolla', engine: '2.0' },
    { brand: 'Toyota', model: 'Corolla', engine: '1.8' },
    { brand: 'Honda', model: 'Civic', engine: '2.0' },
    { brand: 'Honda', model: 'Civic', engine: '1.5' },
    { brand: 'Hyundai', model: 'HB20', engine: '1.0' },
    { brand: 'Hyundai', model: 'HB20', engine: '1.6' },
    { brand: 'Nissan', model: 'Versa', engine: '1.6' },
    { brand: 'Renault', model: 'Sandero', engine: '1.0' },
    { brand: 'Renault', model: 'Sandero', engine: '1.6' },
    { brand: 'Jeep', model: 'Renegade', engine: '1.8' },
    { brand: 'Jeep', model: 'Compass', engine: '2.0' },
  ]

  // ─── 4. USERS ─────────────────────────────────────────────────
  console.log('👤 Criando usuários...')
  const adminPassword = await bcrypt.hash('admin123', 10)
  const clientPassword = await bcrypt.hash('123456', 10)

  const admin = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@bbcautopecas.com.br',
      password: adminPassword,
      phone: '(11) 99999-0001',
      cpf: '111.222.333-44',
      role: Role.ADMIN,
    },
  })

  const client = await prisma.user.create({
    data: {
      name: 'Cliente Teste',
      email: 'cliente@teste.com.br',
      password: clientPassword,
      phone: '(11) 99999-0002',
      cpf: '555.666.777-88',
      role: Role.CLIENT,
    },
  })

  const address = await prisma.address.create({
    data: {
      userId: client.id,
      street: 'Rua das Autopeças',
      number: '123',
      complement: 'Bloco B, Ap 42',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01001-000',
      isDefault: true,
    },
  })

  // ─── 5. PRODUCTS ──────────────────────────────────────────────
  console.log('📦 Criando produtos...')
  const productsData = [
    {
      name: 'Pastilha de Freio Dianteira VW Gol G7',
      slug: 'pastilha-de-freio-dianteira-vw-gol-g7',
      description: 'Pastilha de freio dianteira de alta performance para Volkswagen Gol G7. Fabricada com material cerâmico de primeira linha, garantindo maior durabilidade e poder de frenagem. Ideal para uso urbano e rodoviário, oferece segurança e confiabilidade em qualquer condição.',
      technicalDescription: 'Material: Cerâmico | Comprimento: 156mm | Largura: 56mm | Espessura: 17mm | Temperatura máx: 750°C | Acompanha: pastilhas e clipes',
      price: 89.90,
      comparePrice: 129.90,
      sku: 'FR-001',
      barcode: '7890000000011',
      stock: 50,
      stockMin: 10,
      weight: 1.2,
      images: [imgUrl('DC2626', 'Pastilha+Freio+VW+Gol')],
      featured: true,
      discountPercentage: 30,
      categorySlug: 'pastilhas-de-freio',
      brandSlug: 'volkswagen',
      vehicleIndices: [0, 1],
      costPrice: 45.00,
    },
    {
      name: 'Pastilha de Freio Traseira Chevrolet Onix',
      slug: 'pastilha-de-freio-traseira-chevrolet-onix',
      description: 'Pastilha de freio traseira de alta qualidade para Chevrolet Onix. Desenvolvida com tecnologia de ponta para garantir frenagens seguras e suaves. Resistente ao desgaste e com excelente custo-benefício.',
      technicalDescription: 'Material: Semimetálico | Comprimento: 142mm | Largura: 48mm | Espessura: 15mm | Certificação INMETRO',
      price: 79.90,
      comparePrice: 99.90,
      sku: 'FR-002',
      barcode: '7890000000028',
      stock: 80,
      stockMin: 10,
      weight: 0.9,
      images: [imgUrl('DC2626', 'Pastilha+Freio+Onix+Traseira')],
      featured: true,
      discountPercentage: 25,
      categorySlug: 'pastilhas-de-freio',
      brandSlug: 'chevrolet',
      vehicleIndices: [2, 3],
      costPrice: 42.00,
    },
    {
      name: 'Pastilha de Freio Dianteira Fiat Palio',
      slug: 'pastilha-de-freio-dianteira-fiat-palio',
      description: 'Pastilha de freio dianteira para Fiat Palio fabricada com material semimetálico de alta resistência. Proporciona frenagem progressiva e silenciosa, com longa vida útil.',
      technicalDescription: 'Material: Semimetálico | Comprimento: 160mm | Largura: 52mm | Espessura: 18mm | Aplicação: Palio 1.0/1.4 2011-2018',
      price: 74.90,
      comparePrice: 89.90,
      sku: 'FR-003',
      barcode: '7890000000035',
      stock: 65,
      stockMin: 10,
      weight: 1.0,
      images: [imgUrl('DC2626', 'Pastilha+Freio+Palio')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'pastilhas-de-freio',
      brandSlug: 'fiat',
      vehicleIndices: [4, 5],
      costPrice: 40.00,
    },
    {
      name: 'Disco de Freio Ventilado Chevrolet Onix',
      slug: 'disco-de-freio-ventilado-chevrolet-onix',
      description: 'Disco de freio ventilado de alto desempenho para Chevrolet Onix. Produzido em ferro fundido de alta resistência com tratamento térmico antiferrugem. Design ventilado que proporciona melhor dissipação de calor e evita o superaquecimento do sistema de freios.',
      technicalDescription: 'Diâmetro: 258mm | Espessura: 22mm | Furos: 4 | Material: Ferro Fundido G3000 | Tratamento: Zincado',
      price: 159.90,
      comparePrice: 219.90,
      sku: 'FR-004',
      barcode: '7890000000042',
      stock: 30,
      stockMin: 5,
      weight: 4.5,
      images: [imgUrl('DC2626', 'Disco+Freio+Onix')],
      featured: true,
      discountPercentage: 25,
      categorySlug: 'discos-de-freio',
      brandSlug: 'chevrolet',
      vehicleIndices: [2, 3],
      costPrice: 90.00,
    },
    {
      name: 'Disco de Freio Sólido VW Gol',
      slug: 'disco-de-freio-solido-vw-gol',
      description: 'Disco de freio sólido para Volkswagen Gol, fabricado com ferro fundido de alta qualidade. Projetado para oferecer frenagem consistente e durável para uso diário.',
      technicalDescription: 'Diâmetro: 239mm | Espessura: 12mm | Furos: 4 | Material: Ferro Fundido | Acabamento: Retificado',
      price: 119.90,
      comparePrice: 149.90,
      sku: 'FR-005',
      barcode: '7890000000059',
      stock: 35,
      stockMin: 5,
      weight: 3.2,
      images: [imgUrl('DC2626', 'Disco+Freio+Gol')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'discos-de-freio',
      brandSlug: 'volkswagen',
      vehicleIndices: [0, 1],
      costPrice: 68.00,
    },
    {
      name: 'Tambor de Freio Traseiro Fiat Palio',
      slug: 'tambor-de-freio-traseiro-fiat-palio',
      description: 'Tambor de freio traseiro original para Fiat Palio. Fabricado em ferro fundido de alta resistência com usinagem de precisão para garantir funcionamento perfeito.',
      technicalDescription: 'Diâmetro: 230mm | Largura: 45mm | Furos: 4 | Material: Ferro Fundido Cinzento',
      price: 89.90,
      comparePrice: 109.90,
      sku: 'FR-006',
      barcode: '7890000000066',
      stock: 40,
      stockMin: 5,
      weight: 5.0,
      images: [imgUrl('DC2626', 'Tambor+Freio+Palio')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'tambores',
      brandSlug: 'fiat',
      vehicleIndices: [4, 5],
      costPrice: 50.00,
    },
    {
      name: 'Amortecedor Dianteiro Fiat Palio',
      slug: 'amortecedor-dianteiro-fiat-palio',
      description: 'Amortecedor dianteiro hidráulico de alta performance para Fiat Palio. Proporciona estabilidade e conforto ao dirigir, absorvendo impactos irregulares do solo. Garante melhor aderência dos pneus e segurança nas curvas.',
      technicalDescription: 'Tipo: Hidráulico Pressurizado | Curso: 180mm | Comprimento: 550mm | Garantia: 12 meses | Óleo: Mineral',
      price: 189.90,
      comparePrice: 259.90,
      sku: 'SU-001',
      barcode: '7890000000073',
      stock: 25,
      stockMin: 5,
      weight: 3.8,
      images: [imgUrl('16A34A', 'Amortecedor+Palio')],
      featured: true,
      discountPercentage: 20,
      categorySlug: 'amortecedores',
      brandSlug: 'fiat',
      vehicleIndices: [4, 5],
      costPrice: 105.00,
    },
    {
      name: 'Amortecedor Traseiro Chevrolet Onix',
      slug: 'amortecedor-traseiro-chevrolet-onix',
      description: 'Amortecedor traseiro de alta qualidade para Chevrolet Onix. Sistema pressurizado a gás que garante maior estabilidade e conforto. Resistente a altas temperaturas e condições severas de uso.',
      technicalDescription: 'Tipo: Gás Pressurizado | Curso: 165mm | Comprimento: 520mm | Garantia: 12 meses',
      price: 169.90,
      comparePrice: 219.90,
      sku: 'SU-002',
      barcode: '7890000000080',
      stock: 20,
      stockMin: 5,
      weight: 3.5,
      images: [imgUrl('16A34A', 'Amortecedor+Onix')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'amortecedores',
      brandSlug: 'chevrolet',
      vehicleIndices: [2, 3],
      costPrice: 95.00,
    },
    {
      name: 'Mola Dianteira VW Gol',
      slug: 'mola-dianteira-vw-gol',
      description: 'Mola helicoidal dianteira para Volkswagen Gol. Fabricada em aço silício-cromo de alta resistência, tratada termicamente para evitar fadiga. Proporciona altura correta do veículo e conforto na dirigibilidade.',
      technicalDescription: 'Material: Aço Silício-Cromo | Diâmetro do fio: 12mm | Diâmetro externo: 155mm | Altura livre: 380mm | Carga: 850kg',
      price: 149.90,
      comparePrice: 189.90,
      sku: 'SU-003',
      barcode: '7890000000097',
      stock: 30,
      stockMin: 5,
      weight: 2.8,
      images: [imgUrl('16A34A', 'Mola+Gol')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'molas',
      brandSlug: 'volkswagen',
      vehicleIndices: [0, 1],
      costPrice: 82.00,
    },
    {
      name: 'Kit de Buchas de Suspensão Ford Ka',
      slug: 'kit-de-buchas-de-suspensao-ford-ka',
      description: 'Kit completo de buchas de suspensão para Ford Ka. Conjunto com 8 peças em poliuretano de alta densidade, resistente a deformações e intempéries. Recupera a dirigibilidade original do veículo eliminando folgas e ruídos.',
      technicalDescription: 'Material: Poliuretano 90A | Quantidade: 8 peças | Aplicação: Dianteira e Traseira | Cor: Azul',
      price: 69.90,
      comparePrice: 89.90,
      sku: 'SU-004',
      barcode: '7890000000103',
      stock: 45,
      stockMin: 10,
      weight: 0.8,
      images: [imgUrl('16A34A', 'Buchas+Suspensao+Ka')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'buchas',
      brandSlug: 'ford',
      vehicleIndices: [6, 7],
      costPrice: 35.00,
    },
    {
      name: 'Biela Forjada VW Gol 1.6',
      slug: 'biela-forjada-vw-gol-1-6',
      description: 'Biela forjada de alta resistência para motor Volkswagen AP 1.6. Produzida em aço forjado com tratamento térmico, ideal para veículos originais e preparados. Suporta altas rotações e temperatura elevada do motor.',
      technicalDescription: 'Material: Aço Forjado 4340 | Comprimento: 145mm | Peso: 620g | Diâmetro do pistão: 21mm | Diâmetro da manivela: 45mm',
      price: 189.90,
      comparePrice: 249.90,
      sku: 'MO-001',
      barcode: '7890000000110',
      stock: 15,
      stockMin: 3,
      weight: 0.6,
      images: [imgUrl('2563EB', 'Biela+Forjada+Gol')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'bielas',
      brandSlug: 'volkswagen',
      vehicleIndices: [1],
      costPrice: 110.00,
    },
    {
      name: 'Jogo de Pistões Fiat 1.0 Fire',
      slug: 'jogo-de-pistoes-fiat-1-0-fire',
      description: 'Jogo de pistões para motor Fiat 1.0 Fire com 4 unidades. Fabricados em liga de alumínio silício de alta resistência, com anéis cromados. Projetados para suportar altas temperaturas e proporcionar vedação perfeita.',
      technicalDescription: 'Material: Liga Al-Si | Quantidade: 4 unidades | Diâmetro: 70.8mm | Altura de compressão: 32mm | Anéis: 3 cromados',
      price: 299.90,
      comparePrice: 399.90,
      sku: 'MO-002',
      barcode: '7890000000127',
      stock: 10,
      stockMin: 3,
      weight: 1.5,
      images: [imgUrl('2563EB', 'Pistoes+Fiat+Fire')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'pistoes',
      brandSlug: 'fiat',
      vehicleIndices: [4],
      costPrice: 175.00,
    },
    {
      name: 'Jogo de Válvulas Chevrolet Onix 1.0',
      slug: 'jogo-de-valvulas-chevrolet-onix-1-0',
      description: 'Jogo completo de válvulas de admissão e escape para Chevrolet Onix 1.0. Fabricadas em aço inoxidável com tratamento térmico de têmpera. Garantem vedação perfeita e durabilidade prolongada.',
      technicalDescription: 'Material: Aço Inoxidável | Quantidade: 8 válvulas (4 admissão + 4 escape) | Diâmetro haste: 6mm | Comprimento: 98mm',
      price: 129.90,
      comparePrice: 169.90,
      sku: 'MO-003',
      barcode: '7890000000134',
      stock: 12,
      stockMin: 3,
      weight: 0.7,
      images: [imgUrl('2563EB', 'Valvulas+Onix')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'valvulas',
      brandSlug: 'chevrolet',
      vehicleIndices: [2],
      costPrice: 72.00,
    },
    {
      name: 'Bateria Moura 60AH Chevrolet Onix',
      slug: 'bateria-moura-60ah-chevrolet-onix',
      description: 'Bateria automotiva Moura 60AH de alta performance para Chevrolet Onix. Tecnologia a cálcio que proporciona maior vida útil e partidas mais rápidas. Isenta de manutenção e com garantia do fabricante.',
      technicalDescription: 'Capacidade: 60Ah | Tensão: 12V | CCA (SAE): 520A | Tipo: Estacionária | Peso: 14.5kg | Bivolt',
      price: 399.90,
      comparePrice: 499.90,
      sku: 'EL-001',
      barcode: '7890000000141',
      stock: 20,
      stockMin: 5,
      weight: 14.5,
      images: [imgUrl('D97706', 'Bateria+Moura+60AH')],
      featured: true,
      discountPercentage: 15,
      categorySlug: 'baterias',
      brandSlug: 'chevrolet',
      vehicleIndices: [2, 3],
      costPrice: 250.00,
    },
    {
      name: 'Alternador VW Gol 1.0',
      slug: 'alternador-vw-gol-1-0',
      description: 'Alternador original para Volkswagen Gol 1.0 com 90A de potência. Fornece carga estável para a bateria e alimenta todos os sistemas elétricos do veículo. Regulador de tensão integrado e rolamentos de alta durabilidade.',
      technicalDescription: 'Tensão: 12V | Corrente: 90A | Polias: 6 canais | Rotação máxima: 18000 RPM | Peso: 5.2kg',
      price: 549.90,
      comparePrice: 699.90,
      sku: 'EL-002',
      barcode: '7890000000158',
      stock: 8,
      stockMin: 3,
      weight: 5.2,
      images: [imgUrl('D97706', 'Alternador+Gol')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'alternadores',
      brandSlug: 'volkswagen',
      vehicleIndices: [0, 1],
      costPrice: 320.00,
    },
    {
      name: 'Motor de Partida Fiat Palio 1.0',
      slug: 'motor-de-partida-fiat-palio-1-0',
      description: 'Motor de partida elétrico para Fiat Palio 1.0, 12V com 1.4kW de potência. Proporciona partidas rápidas e confiáveis mesmo em baixas temperaturas. Bobinagem de cobre puro e escovas de longa duração.',
      technicalDescription: 'Tensão: 12V | Potência: 1.4kW | Número de dentes: 9 | Sentido: Horário | Peso: 3.8kg',
      price: 329.90,
      comparePrice: 429.90,
      sku: 'EL-003',
      barcode: '7890000000165',
      stock: 12,
      stockMin: 3,
      weight: 3.8,
      images: [imgUrl('D97706', 'Motor+Partida+Palio')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'motores-de-partida',
      brandSlug: 'fiat',
      vehicleIndices: [4, 5],
      costPrice: 190.00,
    },
    {
      name: 'Kit Embreagem Completo Ford Ka 1.0',
      slug: 'kit-embreagem-completo-ford-ka-1-0',
      description: 'Kit embreagem completo para Ford Ka 1.0 contendo platô, disco e rolamento. Fabricado com materiais de alta qualidade para transmissão suave e durável. Ideal para uso urbano com trânsito intenso.',
      technicalDescription: 'Disco: 190mm diâmetro | Platô: Diafragma | Rolamento: Autocompensador | Acompanha: disco, platô e rolamento',
      price: 459.90,
      comparePrice: 699.90,
      sku: 'TR-001',
      barcode: '7890000000172',
      stock: 15,
      stockMin: 3,
      weight: 4.2,
      images: [imgUrl('7C3AED', 'Kit+Embreagem+Ka')],
      featured: true,
      discountPercentage: 35,
      categorySlug: 'embreagens',
      brandSlug: 'ford',
      vehicleIndices: [6, 7],
      costPrice: 250.00,
    },
    {
      name: 'Câmbio Manual VW Gol G5',
      slug: 'cambio-manual-vw-gol-g5',
      description: 'Câmbio manual recondicionado 5 marchas para Volkswagen Gol G5. Revisado com peças originais, sincronizadores e rolamentos novos. Relação de marchas original de fábrica, garantindo trocas precisas e suaves.',
      technicalDescription: 'Tipo: Manual 5 marchas + Ré | Relação: 3.818/2.158/1.419/1.029/0.778 | Peso: 35kg | Óleo recomendado: SAE 80W90',
      price: 1890.00,
      comparePrice: 2490.00,
      sku: 'TR-002',
      barcode: '7890000000189',
      stock: 5,
      stockMin: 2,
      weight: 35,
      images: [imgUrl('7C3AED', 'Cambio+Gol+G5')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'cambios',
      brandSlug: 'volkswagen',
      vehicleIndices: [0, 1],
      costPrice: 1100.00,
    },
    {
      name: 'Diferencial Chevrolet Onix 1.4',
      slug: 'diferencial-chevrolet-onix-1-4',
      description: 'Diferencial completo para Chevrolet Onix 1.4. Componente de transmissão responsável pela distribuição de torque entre as rodas. Recondicionado com rolamentos e engrenagens novas, garantindo funcionamento silencioso.',
      technicalDescription: 'Relação: 15x65 (4.333:1) | Peso: 28kg | Aplicação: Onix 1.4 2019-2024 | Torque máx: 180Nm',
      price: 1290.00,
      comparePrice: 1690.00,
      sku: 'TR-003',
      barcode: '7890000000196',
      stock: 6,
      stockMin: 2,
      weight: 28,
      images: [imgUrl('7C3AED', 'Diferencial+Onix')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'diferenciais',
      brandSlug: 'chevrolet',
      vehicleIndices: [3],
      costPrice: 780.00,
    },
    {
      name: 'Radiador Toyota Corolla 2.0',
      slug: 'radiador-toyota-corolla-2-0',
      description: 'Radiador original para Toyota Corolla 2.0 com tanque de alumínio e núcleo de cobre. Alta capacidade de dissipação térmica para manter o motor na temperatura ideal de funcionamento.',
      technicalDescription: 'Material: Alumínio/Cobre | Capacidade: 1.8L | Dimensões: 680x430x32mm | Tipo: Fluxo cruzado | Tampa: 1.1bar',
      price: 389.90,
      comparePrice: 499.90,
      sku: 'AR-001',
      barcode: '7890000000202',
      stock: 15,
      stockMin: 3,
      weight: 4.0,
      images: [imgUrl('0891B2', 'Radiador+Corolla')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'radiadores',
      brandSlug: 'toyota',
      vehicleIndices: [8, 9],
      costPrice: 220.00,
    },
    {
      name: 'Bomba d\'Água Honda Civic 2.0',
      slug: 'bomba-dagua-honda-civic-2-0',
      description: 'Bomba d\'água mecânica para Honda Civic 2.0 com rotor em aço inoxidável. Garante a circulação adequada do líquido de arrefecimento no motor. Rolamento blindado de alta durabilidade com vedação tripla.',
      technicalDescription: 'Tipo: Centrífuga | Rotor: Aço Inoxidável | Polia: 6 canais | Vazão: 180L/min | Peso: 1.2kg',
      price: 179.90,
      comparePrice: 239.90,
      sku: 'AR-002',
      barcode: '7890000000219',
      stock: 18,
      stockMin: 5,
      weight: 1.2,
      images: [imgUrl('0891B2', 'Bomba+Agua+Civic')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'bombas-dagua',
      brandSlug: 'honda',
      vehicleIndices: [10, 11],
      costPrice: 100.00,
    },
    {
      name: 'Kit Mangueiras Arrefecimento Hyundai HB20',
      slug: 'kit-mangueiras-arrefecimento-hyundai-hb20',
      description: 'Kit completo com 4 mangueiras de arrefecimento para Hyundai HB20. Fabricadas em borracha EPDM de alta resistência térmica. Resistentes a pressão e temperaturas elevadas do sistema de arrefecimento.',
      technicalDescription: 'Material: EPDM | Quantidade: 4 mangueiras | Diâmetros: 32mm, 28mm, 22mm, 16mm | Pressão máx: 2.5bar | Temperatura: -40 a 150°C',
      price: 89.90,
      comparePrice: 119.90,
      sku: 'AR-003',
      barcode: '7890000000226',
      stock: 25,
      stockMin: 5,
      weight: 1.0,
      images: [imgUrl('0891B2', 'Mangueiras+HB20')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'mangueiras',
      brandSlug: 'hyundai',
      vehicleIndices: [12, 13],
      costPrice: 48.00,
    },
    {
      name: 'Silencioso Traseiro Nissan Versa',
      slug: 'silencioso-traseiro-nissan-versa',
      description: 'Silencioso traseiro para Nissan Versa, fabricado em aço inoxidável AISI 304. Proporciona redução de ruído do motor sem comprometer o desempenho. Resistente à corrosão e com acabamento escovado.',
      technicalDescription: 'Material: Aço Inox 304 | Comprimento: 900mm | Diâmetro: 120mm | Entrada: 50mm | Saída: 45mm | Peso: 4.5kg',
      price: 259.90,
      comparePrice: 329.90,
      sku: 'ES-001',
      barcode: '7890000000233',
      stock: 12,
      stockMin: 3,
      weight: 4.5,
      images: [imgUrl('6B7280', 'Silencioso+Versa')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'silenciosos',
      brandSlug: 'nissan',
      vehicleIndices: [14],
      costPrice: 148.00,
    },
    {
      name: 'Catalisador Renault Sandero',
      slug: 'catalisador-renault-sandero',
      description: 'Catalisador automotivo para Renault Sandero, elemento essencial para redução de emissões poluentes. Com substrato cerâmico de alta densidade e revestimento de metais preciosos. Atende às normas CONAMA e PROCONVE.',
      technicalDescription: 'Tipo: Tríplice | Substrato: Cerâmico 400cpsi | Dimensões: 120x100mm | Entrada: 50mm | Saída: 50mm',
      price: 589.90,
      comparePrice: 749.90,
      sku: 'ES-002',
      barcode: '7890000000240',
      stock: 8,
      stockMin: 2,
      weight: 3.0,
      images: [imgUrl('6B7280', 'Catalisador+Sandero')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'catalisadores',
      brandSlug: 'renault',
      vehicleIndices: [15, 16],
      costPrice: 350.00,
    },
    {
      name: 'Tubo de Escape VW Gol',
      slug: 'tubo-de-escape-vw-gol',
      description: 'Tubo de escape intermediário para Volkswagen Gol em aço carbono com pintura抗corrosão. Diâmetro original de fábrica para perfeita instalação e fluxo de gases adequado.',
      technicalDescription: 'Material: Aço Carbono | Diâmetro: 45mm | Comprimento: 1200mm | Espessura: 1.5mm | Acabamento: Pintura preta',
      price: 129.90,
      comparePrice: 169.90,
      sku: 'ES-003',
      barcode: '7890000000257',
      stock: 20,
      stockMin: 5,
      weight: 2.8,
      images: [imgUrl('6B7280', 'Tubo+Escape+Gol')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'tubos',
      brandSlug: 'volkswagen',
      vehicleIndices: [0, 1],
      costPrice: 70.00,
    },
    {
      name: 'Caixa de Direção Jeep Renegade',
      slug: 'caixa-de-direcao-jeep-renegade',
      description: 'Caixa de direção hidráulica recondicionada para Jeep Renegade. Revisada com retentores e vedadores originais, garantindo direção precisa e sem folgas. Testada em bancada de pressão antes da expedição.',
      technicalDescription: 'Tipo: Pinhão e Cremalheira Hidráulica | Curso: 130mm | Pressão: 80bar | Peso: 12kg | Acompanha terminais',
      price: 1490.00,
      comparePrice: 1990.00,
      sku: 'DI-001',
      barcode: '7890000000264',
      stock: 5,
      stockMin: 2,
      weight: 12,
      images: [imgUrl('1F2937', 'Caixa+Direcao+Renegade')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'caixas-de-direcao',
      brandSlug: 'jeep',
      vehicleIndices: [17, 18],
      costPrice: 890.00,
    },
    {
      name: 'Barra Estabilizadora Dianteira Fiat Palio',
      slug: 'barra-estabilizadora-dianteira-fiat-palio',
      description: 'Barra estabilizadora dianteira para Fiat Palio, fabricada em aço mola temperado. Reduz a rolagem da carroceria em curvas, proporcionando maior estabilidade e segurança. Inclui buchas e suportes de fixação.',
      technicalDescription: 'Material: Aço Mola SAE 5160 | Diâmetro: 22mm | Comprimento: 950mm | Acompanha: 2 buchas + 4 suportes',
      price: 89.90,
      comparePrice: 119.90,
      sku: 'DI-002',
      barcode: '7890000000271',
      stock: 22,
      stockMin: 5,
      weight: 2.5,
      images: [imgUrl('1F2937', 'Barra+Estabilizadora+Palio')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'barras',
      brandSlug: 'fiat',
      vehicleIndices: [4, 5],
      costPrice: 48.00,
    },
    {
      name: 'Terminal de Direção Ford Ka',
      slug: 'terminal-de-direcao-ford-ka',
      description: 'Terminal de direção externo para Ford Ka, componente essencial para o sistema de direção. Fabricado em aço forjado com rótula de teflon de alta resistência. Garante precisão na dirigibilidade e elimina folgas.',
      technicalDescription: 'Material: Aço Forjado | Rosca: M14x1.5 | Comprimento: 95mm | Peso: 0.4kg | Acompanha porca de fixação',
      price: 49.90,
      comparePrice: 69.90,
      sku: 'DI-003',
      barcode: '7890000000288',
      stock: 50,
      stockMin: 10,
      weight: 0.4,
      images: [imgUrl('1F2937', 'Terminal+Direcao+Ka')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'terminais',
      brandSlug: 'ford',
      vehicleIndices: [6, 7],
      costPrice: 25.00,
    },
    {
      name: 'Para-choque Dianteiro Hyundai HB20',
      slug: 'para-choque-dianteiro-hyundai-hb20',
      description: 'Para-choque dianteiro original para Hyundai HB20 fabricado em material ABS de alta resistência. Design aerodinâmico e acabamento impecável combinando perfeitamente com o veículo. Inclui grade e molduras dos faróis de neblina.',
      technicalDescription: 'Material: ABS | Cor: Primer (requer pintura) | Dimensões: 1700x500x300mm | Peso: 4.5kg | Acompanha grade',
      price: 459.90,
      comparePrice: 599.90,
      sku: 'CA-001',
      barcode: '7890000000295',
      stock: 8,
      stockMin: 2,
      weight: 4.5,
      images: [imgUrl('BE185D', 'Parachoque+HB20')],
      featured: true,
      discountPercentage: 15,
      categorySlug: 'para-choques',
      brandSlug: 'hyundai',
      vehicleIndices: [12, 13],
      costPrice: 280.00,
    },
    {
      name: 'Vidro Para-brisa Toyota Corolla',
      slug: 'vidro-para-brisa-toyota-corolla',
      description: 'Para-brisa laminado original para Toyota Corolla com tecnologia acústica. Vidro de segurança com camada internas de PVB que reduzem o ruído externo. Faixa degradê superior para proteção solar.',
      technicalDescription: 'Tipo: Laminado Acústico | Dimensões: 1450x750mm | Espessura: 5.76mm | Acompanha: moldura e cola PU',
      price: 389.90,
      comparePrice: 499.90,
      sku: 'CA-002',
      barcode: '7890000000301',
      stock: 6,
      stockMin: 2,
      weight: 12,
      images: [imgUrl('BE185D', 'Parabrisa+Corolla')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'vidros',
      brandSlug: 'toyota',
      vehicleIndices: [8, 9],
      costPrice: 230.00,
    },
    {
      name: 'Retrovisor Elétrico Honda Civic',
      slug: 'retrovisor-eletrico-honda-civic',
      description: 'Retrovisor externo elétrico com seta incorporada para Honda Civic. Acionamento elétrico com função tilt-down na ré. Capa na cor preta, pronta para pintura, com espanto térmico e antiofuscante.',
      technicalDescription: 'Tipo: Elétrico com seta | Acionamento: Motor 12V | Espelho: Convexo térmico | Acompanha: chicote e botão de comando',
      price: 259.90,
      comparePrice: 349.90,
      sku: 'CA-003',
      barcode: '7890000000318',
      stock: 10,
      stockMin: 3,
      weight: 1.8,
      images: [imgUrl('BE185D', 'Retrovisor+Civic')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'retrovisores',
      brandSlug: 'honda',
      vehicleIndices: [10, 11],
      costPrice: 148.00,
    },
    {
      name: 'Jogo de Tapetes Nissan Versa',
      slug: 'jogo-de-tapetes-nissan-versa',
      description: 'Jogo de tapetes automotivos para Nissan Versa em borracha preta com 4 peças. Antiderrapantes e resistentes à água, perfeitos para proteção do assoalho. Design anatômico com encaixe perfeito nos ganchos originais.',
      technicalDescription: 'Material: Borracha EVA | Quantidade: 4 peças | Cores: Preto | Altura do relevo: 12mm | Antiderrapante: Sim',
      price: 89.90,
      comparePrice: 129.90,
      sku: 'AC-001',
      barcode: '7890000000325',
      stock: 35,
      stockMin: 10,
      weight: 2.0,
      images: [imgUrl('65A30D', 'Tapetes+Versa')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'tapetes',
      brandSlug: 'nissan',
      vehicleIndices: [14],
      costPrice: 45.00,
    },
    {
      name: 'Capa de Volante Renault Sandero',
      slug: 'capa-de-volante-renault-sandero',
      description: 'Capa de volante universal em couro sintético perfurado para Renault Sandero. Instalação rápida sem necessidade de costura, com acabamento esportivo. Diâmetro ajustável para volantes de 36 a 40cm.',
      technicalDescription: 'Material: Couro Sintético Perfurado | Diâmetro: 36-40cm | Cor: Preto com costura vermelha | Espessura: 3mm | Instalação: Elástico',
      price: 49.90,
      comparePrice: 69.90,
      sku: 'AC-002',
      barcode: '7890000000332',
      stock: 40,
      stockMin: 10,
      weight: 0.3,
      images: [imgUrl('65A30D', 'Capa+Volante+Sandero')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'capas',
      brandSlug: 'renault',
      vehicleIndices: [15, 16],
      costPrice: 22.00,
    },
    {
      name: 'Kit de Segurança Automotivo Completo',
      slug: 'kit-de-seguranca-automotivo-completo',
      description: 'Kit de segurança automotivo completo com triângulo, extintor ABC 1kg, macaco tipo tesoura e chave de roda. Atende às exigências do CONTRAN e legislação de trânsito brasileira. Acompanha estojo organizador.',
      technicalDescription: 'Itens: Triângulo refletivo + Extintor ABC 1kg + Macaco tesoura + Chave de roda | Peso total: 3.5kg | Normas: INMETRO/CONTRAN',
      price: 39.90,
      comparePrice: 59.90,
      sku: 'AC-003',
      barcode: '7890000000349',
      stock: 60,
      stockMin: 15,
      weight: 3.5,
      images: [imgUrl('65A30D', 'Kit+Seguranca')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'kits',
      brandSlug: 'jeep',
      vehicleIndices: [17, 18],
      costPrice: 20.00,
    },
    {
      name: 'Farol Dianteiro Direito Toyota Corolla',
      slug: 'farol-dianteiro-direito-toyota-corolla',
      description: 'Farol dianteiro direito completo para Toyota Corolla com lente em policarbonato. Sistema de iluminação com refletor em LED e projetor de neblina integrado. Lacrado contra umidade e poeira, com regulagem elétrica de altura.',
      technicalDescription: 'Tipo: Full LED | Lente: Policarbonato UV | Tensão: 12V | Potência: 35W | Regulagem: Elétrica | Acompanha: lâmpadas LED e atuador',
      price: 589.90,
      comparePrice: 789.90,
      sku: 'IL-001',
      barcode: '7890000000356',
      stock: 6,
      stockMin: 2,
      weight: 3.2,
      images: [imgUrl('EAB308', 'Farol+Corolla')],
      featured: true,
      discountPercentage: 20,
      categorySlug: 'farois',
      brandSlug: 'toyota',
      vehicleIndices: [8, 9],
      costPrice: 350.00,
    },
    {
      name: 'Lanterna Traseira Esquerda Honda Civic',
      slug: 'lanterna-traseira-esquerda-honda-civic',
      description: 'Lanterna traseira esquerda para Honda Civic com lente em policarbonato e LED. Iluminação intensa e moderna com assinatura luminosa característica. Resistente a impactos e intempéries com vedação hermética.',
      technicalDescription: 'Tipo: LED | Lente: Policarbonato | Tensão: 12V | Funções: Freio, seta, ré e lanterna | Peso: 1.5kg',
      price: 189.90,
      comparePrice: 259.90,
      sku: 'IL-002',
      barcode: '7890000000363',
      stock: 14,
      stockMin: 3,
      weight: 1.5,
      images: [imgUrl('EAB308', 'Lanterna+Civic')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'lanternas',
      brandSlug: 'honda',
      vehicleIndices: [10, 11],
      costPrice: 105.00,
    },
    {
      name: 'Lâmpada LED Farol Alto H7 12V',
      slug: 'lampada-led-farol-alto-h7-12v',
      description: 'Lâmpada LED automotiva soquete H7 para farol alto, 12V com potência equivalente a 100W halógena. Luz branca de 6000K que proporciona visibilidade superior. Sistema de dissipação com cooler para longa vida útil.',
      technicalDescription: 'Soquete: H7 | Tensão: 12V | Potência: 25W (equiv. 100W halógena) | Temperatura: 6000K | Fluxo: 3200 lúmens | Vida útil: 30000h',
      price: 49.90,
      comparePrice: 69.90,
      sku: 'IL-003',
      barcode: '7890000000370',
      stock: 100,
      stockMin: 20,
      weight: 0.1,
      images: [imgUrl('EAB308', 'Lampada+LED+H7')],
      featured: true,
      discountPercentage: 20,
      categorySlug: 'lampadas',
      brandSlug: 'volkswagen',
      vehicleIndices: [0, 1, 2, 3, 4, 5],
      costPrice: 22.00,
    },
    {
      name: 'Filtro de Óleo VW Gol 1.0',
      slug: 'filtro-de-oleo-vw-gol-1-0',
      description: 'Filtro de óleo lubrificante para Volkswagen Gol 1.0 com elemento filtrante de alta eficiência. Remove impurezas e partículas do óleo do motor, prolongando sua vida útil. Válvula antirretenção para partidas a seco.',
      technicalDescription: 'Tipo: Rosca M20x1.5 | Diâmetro: 76mm | Altura: 85mm | Vazão: 20L/min | Eficiência: 99% a 20 microns',
      price: 35.90,
      comparePrice: 49.90,
      sku: 'FI-001',
      barcode: '7890000000387',
      stock: 100,
      stockMin: 20,
      weight: 0.3,
      images: [imgUrl('0F766E', 'Filtro+Oleo+Gol')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'filtros-de-oleo',
      brandSlug: 'volkswagen',
      vehicleIndices: [0, 1],
      costPrice: 18.00,
    },
    {
      name: 'Filtro de Ar Honda Civic 2.0',
      slug: 'filtro-de-ar-honda-civic-2-0',
      description: 'Filtro de ar do motor para Honda Civic 2.0, elemento de celulose impregnada com resina. Retém partículas de poeira e impurezas garantindo ar limpo para a combustão. Alta capacidade de retenção sem restringir o fluxo de ar.',
      technicalDescription: 'Tipo: Seco | Material: Celulose resinada | Dimensões: 280x200x45mm | Eficiência: 99.5% | Troca recomendada: 10.000km',
      price: 49.90,
      comparePrice: 89.90,
      sku: 'FI-002',
      barcode: '7890000000394',
      stock: 40,
      stockMin: 10,
      weight: 0.4,
      images: [imgUrl('0F766E', 'Filtro+Ar+Civic')],
      featured: true,
      discountPercentage: 40,
      categorySlug: 'filtros-de-ar',
      brandSlug: 'honda',
      vehicleIndices: [10, 11],
      costPrice: 22.00,
    },
    {
      name: 'Filtro de Combustível Chevrolet Onix',
      slug: 'filtro-de-combustivel-chevrolet-onix',
      description: 'Filtro de combustível para Chevrolet Onix, montagem externa de fácil substituição. Elemento filtrante de alta capacidade que protege o sistema de injeção contra impurezas. Compatível com gasolina e etanol.',
      technicalDescription: 'Tipo: Montagem externa | Pressão máx: 5bar | Vazão: 120L/h | Conexões: 8mm | Eficiência: 98% a 10 microns',
      price: 29.90,
      comparePrice: 44.90,
      sku: 'FI-003',
      barcode: '7890000000400',
      stock: 80,
      stockMin: 15,
      weight: 0.2,
      images: [imgUrl('0F766E', 'Filtro+Combustivel+Onix')],
      featured: false,
      discountPercentage: null,
      categorySlug: 'filtros-de-combustivel',
      brandSlug: 'chevrolet',
      vehicleIndices: [2, 3],
      costPrice: 14.00,
    },
  ]

  const createdProducts = await Promise.all(
    productsData.map((p) =>
      prisma.product.create({
        data: {
          name: p.name,
          slug: p.slug,
          description: p.description,
          technicalDescription: p.technicalDescription,
          price: p.price,
          comparePrice: p.comparePrice ?? p.price,
          costPrice: p.costPrice ?? 0,
          sku: p.sku,
          barcode: p.barcode,
          stock: p.stock,
          stockMin: p.stockMin ?? 0,
          weight: p.weight ?? null,
          images: p.images,
          featured: p.featured,
          discountPercentage: p.discountPercentage ?? null,
          categoryId: subcatMap[p.categorySlug],
          brandId: brandMap[p.brandSlug],
        },
      })
    )
  )

  // ─── 6. COMPATIBLE VEHICLES ──────────────────────────────────
  console.log('🚗 Criando veículos compatíveis...')
  const vehicleRecords = vehicleTemplates.map((v) => ({
    brand: v.brand,
    model: v.model,
    engine: v.engine,
  }))

  const compatibleVehiclesData: { brand: string; model: string; year: number; engine: string; productId: string }[] = []
  for (let pi = 0; pi < productsData.length; pi++) {
    const product = createdProducts[pi]
    const prodDef = productsData[pi]
    const vIndices = prodDef.vehicleIndices
    for (const vi of vIndices) {
      const vt = vehicleTemplates[vi]
      const years = vt.brand === 'Volkswagen' ? [2013, 2016, 2020]
        : vt.brand === 'Chevrolet' ? [2019, 2022]
        : vt.brand === 'Fiat' ? [2011, 2015, 2018]
        : vt.brand === 'Ford' ? [2014, 2018, 2022]
        : vt.brand === 'Toyota' ? [2020, 2022, 2024]
        : vt.brand === 'Honda' ? [2017, 2021]
        : vt.brand === 'Hyundai' ? [2019, 2023]
        : vt.brand === 'Nissan' ? [2020, 2024]
        : vt.brand === 'Renault' ? [2016, 2019]
        : [2018, 2022]
      for (const year of years) {
        compatibleVehiclesData.push({
          brand: vt.brand,
          model: vt.model,
          year,
          engine: vt.engine,
          productId: product.id,
        })
      }
    }
  }
  await prisma.compatibleVehicle.createMany({ data: compatibleVehiclesData })

  // ─── 7. COUPONS ──────────────────────────────────────────────
  console.log('🎫 Criando cupons...')
  const couponsData = [
    { code: 'BEMVINDO10', discount: 10, discountType: DiscountType.PERCENTAGE, minValue: 100, maxUses: 100 },
    { code: 'FRETEGRATIS', discount: 30, discountType: DiscountType.FIXED, minValue: 200, maxUses: 50 },
    { code: 'PECAS20', discount: 20, discountType: DiscountType.PERCENTAGE, minValue: 150, maxUses: 30 },
  ]
  const coupons = await Promise.all(
    couponsData.map((c) => prisma.coupon.create({ data: c }))
  )
  const couponMap = Object.fromEntries(coupons.map((c) => [c.code, c.id]))

  // ─── 8. BANNERS ──────────────────────────────────────────────
  console.log('📺 Criando banners...')
  await prisma.banner.createMany({
    data: [
      {
        title: 'PEÇAS ORIGINAIS COM GARANTIA',
        subtitle: 'Qualidade e procedência que você pode confiar. Todas as peças com garantia de fábrica.',
        image: 'https://placehold.co/1920x600/1F2937/ffffff?text= Pecas+Originais+Com+Garantia',
        link: '/produtos',
        order: 1,
        isActive: true,
      },
      {
        title: 'FRETE GRÁTIS PARA TODO BRASIL',
        subtitle: 'Aproveite o frete grátis em compras acima de R$ 200,00 para todo o território nacional.',
        image: 'https://placehold.co/1920x600/003366/ffffff?text= Frete+Gratis+Para+Todo+Brasil',
        link: '/ofertas',
        order: 2,
        isActive: true,
      },
      {
        title: 'ATÉ 40% OFF EM PEÇAS DE FREIO',
        subtitle: 'Pastilhas, discos e tambores com descontos imperdíveis. Renove seu sistema de freios agora!',
        image: 'https://placehold.co/1920x600/DC2626/ffffff?text= 40+Off+Pecas+de+Freio',
        link: '/categorias/freio',
        order: 3,
        isActive: true,
      },
    ],
  })

  // ─── 9. ORDERS ───────────────────────────────────────────────
  console.log('🧾 Criando pedidos...')
  const prodIndexBySku = Object.fromEntries(createdProducts.map((p, i) => [p.sku, i]))

  // Order 1 - CONFIRMED (via PIX, paid)
  const order1Items = [
    { sku: 'FR-001', qty: 2 },
    { sku: 'FI-001', qty: 1 },
    { sku: 'FR-002', qty: 1 },
  ]
  const order1Subtotal = order1Items.reduce((sum, item) => {
    const p = createdProducts[prodIndexBySku[item.sku]]
    return sum + Number(p.price) * item.qty
  }, 0)
  const order1Shipping = 20.00
  const order1Total = order1Subtotal + order1Shipping

  const order1 = await prisma.order.create({
    data: {
      userId: client.id,
      subtotal: order1Subtotal,
      shipping: order1Shipping,
      discount: 0,
      total: order1Total,
      status: OrderStatus.CONFIRMED,
      paymentMethod: PaymentMethod.PIX,
      paymentStatus: 'PAID',
      shippingAddressId: address.id,
      items: {
        create: order1Items.map((item) => ({
          productId: createdProducts[prodIndexBySku[item.sku]].id,
          quantity: item.qty,
          price: createdProducts[prodIndexBySku[item.sku]].price,
        })),
      },
    },
  })

  // Order 2 - PREPARING (via CREDIT_CARD, paid, with BEMVINDO10)
  const order2Items = [
    { sku: 'FR-004', qty: 2 },
    { sku: 'FR-002', qty: 1 },
  ]
  const order2Subtotal = order2Items.reduce((sum, item) => {
    const p = createdProducts[prodIndexBySku[item.sku]]
    return sum + Number(p.price) * item.qty
  }, 0)
  const order2Discount = order2Subtotal * 0.10 // 10% off
  const order2Shipping = 20.00
  const order2Total = order2Subtotal + order2Shipping - order2Discount

  await prisma.order.create({
    data: {
      userId: client.id,
      subtotal: order2Subtotal,
      shipping: order2Shipping,
      discount: order2Discount,
      total: order2Total,
      status: OrderStatus.PREPARING,
      paymentMethod: PaymentMethod.CREDIT_CARD,
      paymentStatus: 'PAID',
      shippingAddressId: address.id,
      couponId: couponMap['BEMVINDO10'],
      items: {
        create: order2Items.map((item) => ({
          productId: createdProducts[prodIndexBySku[item.sku]].id,
          quantity: item.qty,
          price: createdProducts[prodIndexBySku[item.sku]].price,
        })),
      },
    },
  })

  // Order 3 - DELIVERED (via BOLETO, paid, with FRETEGRATIS)
  const order3Items = [
    { sku: 'SU-001', qty: 1 },
    { sku: 'SU-002', qty: 2 },
  ]
  const order3Subtotal = order3Items.reduce((sum, item) => {
    const p = createdProducts[prodIndexBySku[item.sku]]
    return sum + Number(p.price) * item.qty
  }, 0)
  const order3Discount = 30.00 // FRETEGRATIS = R$30 off
  const order3Shipping = 15.00
  const order3Total = order3Subtotal + order3Shipping - order3Discount

  await prisma.order.create({
    data: {
      userId: client.id,
      subtotal: order3Subtotal,
      shipping: order3Shipping,
      discount: order3Discount,
      total: order3Total,
      status: OrderStatus.DELIVERED,
      paymentMethod: PaymentMethod.BOLETO,
      paymentStatus: 'PAID',
      shippingAddressId: address.id,
      couponId: couponMap['FRETEGRATIS'],
      items: {
        create: order3Items.map((item) => ({
          productId: createdProducts[prodIndexBySku[item.sku]].id,
          quantity: item.qty,
          price: createdProducts[prodIndexBySku[item.sku]].price,
        })),
      },
    },
  })

  // ─── 10. REVIEWS ─────────────────────────────────────────────
  console.log('⭐ Criando avaliações...')
  const topProducts = createdProducts.filter((p) => ['FR-001', 'FR-004', 'SU-001', 'EL-001', 'IL-001', 'FI-002'].includes(p.sku))
  const reviewsData = [
    { rating: 5, comment: 'Excelente pastilha de freio! Instalei no meu Gol G7 2018 e o desempenho de frenagem melhorou muito. Superou minhas expectativas, freio macio e progressivo. Recomendo a todos.', productSku: 'FR-001' },
    { rating: 5, comment: 'Disco de freio de altíssima qualidade. Chegou bem embalado e no prazo. Instalei no meu Onix e está funcionando perfeitamente, sem barulhos ou vibrações.', productSku: 'FR-004' },
    { rating: 4, comment: 'Bom produto, entregou o que promete. O carro ficou mais estável nas curvas e o conforto ao dirigir melhorou. Apenas achei a instalação um pouco trabalhosa.', productSku: 'SU-001' },
    { rating: 5, comment: 'Bateria original Moura, funcionando perfeitamente. Instalação fácil e rápida. Partidas mais fortes e sem sinais de fraqueza. Valeu cada centavo.', productSku: 'EL-001' },
    { rating: 4, comment: 'Farol de boa qualidade, encaixe perfeito no Corolla 2022. Iluminação muito superior à original. Apenas demorou um pouco pra chegar, mas veio bem embalado.', productSku: 'IL-001' },
    { rating: 5, comment: 'Filtro de ar original, encaixe perfeito. Preço muito bom comparado à concorrência. Comprei dois para garantir a troca na próxima revisão.', productSku: 'FI-002' },
  ]
  await prisma.review.createMany({
    data: reviewsData.map((r) => ({
      productId: createdProducts[prodIndexBySku[r.productSku]].id,
      userId: client.id,
      rating: r.rating,
      comment: r.comment,
    })),
  })

  console.log('✅ Seed concluído com sucesso!')
  console.log(`   ${brands.length} marcas criadas`)
  console.log(`   ${parentCategories.length + subcategories.length} categorias criadas`)
  console.log(`   ${createdProducts.length} produtos criados`)
  console.log(`   ${compatibleVehiclesData.length} veículos compatíveis criados`)
  console.log(`   Pedidos: CONFIRMED, PREPARING, DELIVERED`)
  console.log(`   Avaliações: ${reviewsData.length}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Erro no seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
