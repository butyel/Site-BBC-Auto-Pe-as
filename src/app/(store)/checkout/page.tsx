"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  CreditCard,
  Banknote,
  Building2,
  User,
  MapPin,
  Lock,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";

const steps = [
  { id: 1, label: "Dados", icon: User },
  { id: 2, label: "Endereço", icon: MapPin },
  { id: 3, label: "Pagamento", icon: CreditCard },
];

export default function CheckoutPage() {
  const { items, getSubtotal, getTotal, discount, coupon } = useCart();

  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 - Personal Data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");

  // Step 2 - Address
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cepLoading, setCepLoading] = useState(false);

  // Step 3 - Payment
  const [paymentMethod, setPaymentMethod] = useState<"PIX" | "CREDIT_CARD" | "BOLETO">("PIX");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardInstallments, setCardInstallments] = useState("1");

  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const subtotal = getSubtotal();
  const total = getTotal();
  const shipping = subtotal > 299 ? 0 : 19.9;
  const finalTotal = total + shipping;

  useEffect(() => {
    if (cep.length === 8) {
      setCepLoading(true);
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            setStreet(data.logradouro || "");
            setNeighborhood(data.bairro || "");
            setCity(data.localidade || "");
            setState(data.uf || "");
          }
        })
        .catch(() => {})
        .finally(() => setCepLoading(false));
    }
  }, [cep]);

  const handleContinue = () => {
    setCurrentStep((prev) => Math.min(3, prev + 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setCompleted(true);
    }, 2000);
  };

  const formatCpf = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatCardExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) {
      return digits.slice(0, 2) + "/" + digits.slice(2);
    }
    return digits;
  };

  if (completed) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="h-10 w-10 text-green-600" />
          </motion.div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Pedido Confirmado!
          </h1>
          <p className="text-gray-500 mt-2">
            Seu pedido foi realizado com sucesso. Você receberá um e-mail com os
            detalhes da compra.
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Número do pedido: #{"2026" + String(Math.floor(Math.random() * 90000) + 10000)}
          </p>
          <div className="mt-6">
            <Link href="/minhaconta/pedidos">
              <Button className="bg-bbc hover:bg-bbc-dark text-white font-semibold px-8 h-12 rounded-xl">
                ACOMPANHAR PEDIDO
              </Button>
            </Link>
          </div>
          <div className="mt-3">
            <Link href="/" className="text-sm text-bbc hover:text-bbc-dark font-medium">
              VOLTAR PARA HOME
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Carrinho vazio</h1>
          <p className="text-gray-500 mt-2">Adicione produtos ao carrinho antes de finalizar.</p>
          <Link href="/loja">
            <Button className="mt-6 bg-bbc hover:bg-bbc-dark text-white font-semibold px-8 h-12 rounded-xl">
              VER PRODUTOS
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-bbc transition-colors">Home</Link>
            <span>/</span>
            <Link href="/carrinho" className="hover:text-bbc transition-colors">Carrinho</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Progress Steps */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-center">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      currentStep > step.id
                        ? "bg-green-500 text-white"
                        : currentStep === step.id
                        ? "bg-bbc text-white shadow-lg shadow-blue-200"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-4 w-4" />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium hidden sm:block ${
                      currentStep >= step.id ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-20 h-0.5 mx-2 rounded ${
                      currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Data */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6"
                >
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Dados Pessoais</h2>
                  <p className="text-sm text-gray-500 mb-5">
                    Informe seus dados para continuar
                  </p>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          placeholder="(11) 99999-9999"
                          value={phone}
                          onChange={(e) => setPhone(formatPhone(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        placeholder="000.000.000-00"
                        value={cpf}
                        onChange={(e) => setCpf(formatCpf(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={handleContinue}
                      className="bg-bbc hover:bg-bbc-dark text-white font-semibold h-11 px-8 rounded-xl"
                    >
                      CONTINUAR
                      <ChevronRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Address */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6"
                >
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Endereço de Entrega</h2>
                  <p className="text-sm text-gray-500 mb-5">
                    Informe o endereço para receber seu pedido
                  </p>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cep">CEP</Label>
                      <div className="relative mt-1">
                        <Input
                          id="cep"
                          placeholder="00000-000"
                          value={cep}
                          onChange={(e) => setCep(e.target.value.replace(/\D/g, "").slice(0, 8))}
                          className="pr-10"
                          maxLength={8}
                        />
                        {cepLoading && (
                          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                      <div className="sm:col-span-4">
                        <Label htmlFor="street">Rua</Label>
                        <Input
                          id="street"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="number">Número</Label>
                        <Input
                          id="number"
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                        className="mt-1"
                        placeholder="Apto, Bloco, etc (opcional)"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input
                          id="neighborhood"
                          value={neighborhood}
                          onChange={(e) => setNeighborhood(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado</Label>
                        <Input
                          id="state"
                          value={state}
                          onChange={(e) => setState(e.target.value.toUpperCase().slice(0, 2))}
                          className="mt-1"
                          maxLength={2}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="h-11 px-6 rounded-xl"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1.5" />
                      VOLTAR
                    </Button>
                    <Button
                      onClick={handleContinue}
                      className="bg-bbc hover:bg-bbc-dark text-white font-semibold h-11 px-8 rounded-xl"
                    >
                      CONTINUAR
                      <ChevronRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6"
                >
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Forma de Pagamento</h2>
                  <p className="text-sm text-gray-500 mb-5">
                    Escolha a melhor opção para você
                  </p>

                  {/* Payment Methods */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {[
                      { id: "PIX" as const, label: "PIX", icon: Banknote, desc: "Pagamento instantâneo" },
                      { id: "CREDIT_CARD" as const, label: "Cartão de Crédito", icon: CreditCard, desc: "Até 12x sem juros" },
                      { id: "BOLETO" as const, label: "Boleto", icon: Building2, desc: "Vencimento em 3 dias" },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          paymentMethod === method.id
                            ? "border-bbc bg-accent"
                            : "border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        <method.icon
                          className={`h-6 w-6 mb-2 ${
                            paymentMethod === method.id ? "text-bbc" : "text-gray-400"
                          }`}
                        />
                        <p className="text-sm font-semibold text-gray-900">{method.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{method.desc}</p>
                      </button>
                    ))}
                  </div>

                  {/* PIX */}
                  {paymentMethod === "PIX" && (
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <div className="w-40 h-40 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <Banknote className="h-10 w-10 text-gray-300 mx-auto" />
                          <p className="text-xs text-gray-400 mt-1">QR Code</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Após confirmar o pedido, o QR Code será gerado para pagamento.
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        O pedido será confirmado automaticamente após o pagamento.
                      </p>
                    </div>
                  )}

                  {/* Credit Card */}
                  {paymentMethod === "CREDIT_CARD" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Número do cartão</Label>
                        <Input
                          id="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          className="mt-1"
                          icon={<CreditCard className="h-4 w-4" />}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Nome no cartão</Label>
                        <Input
                          id="cardName"
                          placeholder="Nome como está no cartão"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry">Validade</Label>
                          <Input
                            id="cardExpiry"
                            placeholder="MM/AA"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(formatCardExpiry(e.target.value))}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvv">CVV</Label>
                          <Input
                            id="cardCvv"
                            placeholder="000"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="installments">Parcelas</Label>
                        <select
                          id="installments"
                          value={cardInstallments}
                          onChange={(e) => setCardInstallments(e.target.value)}
                          className="w-full mt-1 h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-bbc"
                        >
                          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>
                              {n}x de {formatPrice(finalTotal / n)}
                              {n === 1 ? " (à vista)" : n <= 12 ? " sem juros" : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Boleto */}
                  {paymentMethod === "BOLETO" && (
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-600">
                        O boleto bancário será gerado após a confirmação do pedido.
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Vencimento em 3 dias úteis.
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="h-11 px-6 rounded-xl"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1.5" />
                      VOLTAR
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="bg-bbc hover:bg-bbc-dark text-white font-bold h-11 px-8 rounded-xl"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          PROCESSANDO...
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          CONFIRMAR PEDIDO
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Resumo do Pedido
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 flex items-center justify-center text-lg opacity-40">
                      🚗
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">Qtd: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-semibold text-gray-900">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Frete</span>
                  <span>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-bbc">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-2 text-center">
                ou <strong>12x de {formatPrice(finalTotal / 12)}</strong> sem juros
              </p>

              <Separator className="my-4" />

              <div className="space-y-2">
                {[
                  { icon: Lock, text: "Dados protegidos com SSL" },
                  { icon: Check, text: "Produto original garantido" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-xs text-gray-500">
                    <item.icon className="h-3.5 w-3.5 text-green-500" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
