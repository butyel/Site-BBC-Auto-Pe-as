import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export const registerSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
    phone: z.string().optional(),
    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

export const productSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  slug: z.string().optional(),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  technicalDescription: z.string().optional(),
  price: z.string().or(z.number()).refine(
    (val) => Number(val) > 0,
    "Preço deve ser maior que zero"
  ),
  comparePrice: z.string().or(z.number()).optional(),
  costPrice: z.string().or(z.number()).optional(),
  sku: z.string().min(1, "SKU é obrigatório"),
  barcode: z.string().optional(),
  stock: z.string().or(z.number()).optional(),
  stockMin: z.string().or(z.number()).optional(),
  images: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  weight: z.string().or(z.number()).optional(),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  brandId: z.string().min(1, "Marca é obrigatória"),
});

export const categorySchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  slug: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().optional(),
});

export const addressSchema = z.object({
  street: z.string().min(3, "Rua deve ter no mínimo 3 caracteres"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(3, "Bairro deve ter no mínimo 3 caracteres"),
  city: z.string().min(3, "Cidade deve ter no mínimo 3 caracteres"),
  state: z
    .string()
    .length(2, "Estado deve ter 2 caracteres")
    .transform((val) => val.toUpperCase()),
  zipCode: z
    .string()
    .regex(/^\d{5}-\d{3}$/, "CEP inválido"),
  isDefault: z.boolean().optional(),
});

export const checkoutSchema = z.object({
  shippingAddressId: z.string().min(1, "Endereço de entrega é obrigatório"),
  paymentMethod: z.enum(["PIX", "CREDIT_CARD", "DEBIT_CARD", "BOLETO"]),
  couponCode: z.string().optional(),
});

export const couponSchema = z.object({
  code: z.string().min(3, "Código deve ter no mínimo 3 caracteres"),
  discount: z.string().or(z.number()).refine(
    (val) => Number(val) > 0,
    "Desconto deve ser maior que zero"
  ),
  discountType: z.enum(["PERCENTAGE", "FIXED"]),
  minValue: z.string().or(z.number()).optional(),
  maxUses: z.number().int().positive().optional(),
  expiresAt: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const reviewSchema = z.object({
  productId: z.string().min(1, "Produto é obrigatório"),
  rating: z
    .number()
    .int()
    .min(1, "Avaliação mínima é 1")
    .max(5, "Avaliação máxima é 5"),
  comment: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type CouponInput = z.infer<typeof couponSchema>;
export const blogPostSchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  slug: z.string().optional(),
  excerpt: z.string().min(10, "Resumo deve ter no mínimo 10 caracteres"),
  content: z.string().min(10, "Conteúdo deve ter no mínimo 10 caracteres"),
  image: z.string().optional(),
  author: z.string().optional(),
  category: z.string().min(1, "Categoria é obrigatória"),
  readTime: z.string().optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
export type BlogPostInput = z.infer<typeof blogPostSchema>;
