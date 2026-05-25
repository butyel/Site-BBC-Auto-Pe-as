export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  technicalDescription: string | null;
  price: number;
  comparePrice: number | null;
  costPrice: number | null;
  sku: string;
  barcode: string | null;
  stock: number;
  stockMin: number;
  images: string[];
  featured: boolean;
  discountPercentage: number | null;
  weight: number | null;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  brandId: string;
  category?: Category;
  brand?: Brand;
  compatibleVehicles?: CompatibleVehicle[];
  reviews?: Review[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  parent?: Category | null;
  children?: Category[];
  products?: Product[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  description: string | null;
  products?: Product[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  cpf: string | null;
  role: "CLIENT" | "ADMIN";
  createdAt: string;
  updatedAt: string;
  addresses?: Address[];
  orders?: Order[];
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  status: "PENDING" | "CONFIRMED" | "PREPARING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentMethod: "PIX" | "CREDIT_CARD" | "DEBIT_CARD" | "BOLETO";
  paymentStatus: string;
  shippingAddressId: string;
  couponId: string | null;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
  shippingAddress?: Address;
  coupon?: Coupon | null;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: "PERCENTAGE" | "FIXED";
  minValue: number | null;
  maxUses: number | null;
  usedCount: number;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  link: string | null;
  isActive: boolean;
  order: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user?: Pick<User, "id" | "name">;
}

export interface CompatibleVehicle {
  id: string;
  brand: string;
  model: string;
  year: number | null;
  engine: string | null;
  productId: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterOptions {
  search?: string;
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  vehicleBrand?: string;
  vehicleModel?: string;
  vehicleYear?: number;
  featured?: boolean;
  sortBy?: "price_asc" | "price_desc" | "name_asc" | "name_desc" | "newest" | "best_selling";
  page?: number;
  limit?: number;
}

export interface PaginationResult {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
