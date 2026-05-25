"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, Database, Cookie, Mail } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    icon: ShieldCheck,
    title: "Coleta de Informações",
    content: [
      "Ao navegar em nosso site, podemos coletar informações pessoais como nome, e-mail, telefone, CPF, endereço e dados de navegação.",
      "Estas informações são fornecidas voluntariamente por você ao realizar compras, cadastrar-se em nossa newsletter, ou entrar em contato conosco.",
      "Utilizamos cookies e tecnologias similares para melhorar sua experiência de navegação e personalizar conteúdo.",
    ],
  },
  {
    icon: Lock,
    title: "Uso das Informações",
    content: [
      "Suas informações são utilizadas para processar pedidos, entregar produtos, enviar comunicações sobre sua compra e melhorar nossos serviços.",
      "Podemos enviar e-mails marketing com ofertas e novidades, mas você pode cancelar o recebimento a qualquer momento.",
      "Seus dados nunca serão vendidos ou compartilhados com terceiros para fins não relacionados às operações da BBC AUTO PEÇAS.",
    ],
  },
  {
    icon: Eye,
    title: "Proteção de Dados",
    content: [
      "Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.",
      "Utilizamos criptografia SSL (Secure Socket Layer) para garantir que seus dados sejam transmitidos de forma segura.",
      "Nossos sistemas são monitorados 24 horas por dia para detectar e prevenir atividades suspeitas.",
    ],
  },
  {
    icon: Database,
    title: "Armazenamento e Retenção",
    content: [
      "Seus dados são armazenados em servidores seguros, com acesso restrito a profissionais autorizados.",
      "Mantemos suas informações apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletadas, ou conforme exigido por lei.",
      "Ao final do período de retenção, seus dados serão deletados ou anonimizados de forma segura.",
    ],
  },
  {
    icon: Cookie,
    title: "Cookies",
    content: [
      "Utilizamos cookies essenciais para o funcionamento do site, cookies de desempenho para analisar o uso, e cookies de funcionalidade para lembrar suas preferências.",
      "Você pode configurar seu navegador para recusar cookies, mas isso pode afetar a funcionalidade de algumas áreas do site.",
      "Cookies de terceiros podem ser utilizados para análises de tráfego e campanhas de marketing.",
    ],
  },
  {
    icon: Mail,
    title: "Seus Direitos",
    content: [
      "Você tem direito a acessar, corrigir, atualizar ou solicitar a exclusão de seus dados pessoais a qualquer momento.",
      "Para exercer seus direitos, entre em contato conosco através do e-mail contato@bbcautopecas.com.br.",
      "Você pode optar por não receber comunicações de marketing a qualquer momento, clicando no link de descadastro presente em nossos e-mails.",
    ],
  },
];

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <ShieldCheck className="h-16 w-16 text-bbc-light mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Política de <span className="text-bbc-light">Privacidade</span></h1>
            <p className="text-lg text-gray-300">
              A BBC AUTO PEÇAS se compromete a proteger sua privacidade. Esta política descreve como coletamos, usamos e protegemos suas informações pessoais.
            </p>
            <p className="text-sm text-gray-400 mt-4">Última atualização: Maio de 2026</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-10">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <section.icon className="h-6 w-6 text-bbc" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                </div>
                <ul className="space-y-3 ml-16">
                  {section.content.map((text, i) => (
                    <li key={i} className="text-gray-600 leading-relaxed flex items-start gap-2">
                      <span className="text-bbc mt-1.5 flex-shrink-0">•</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-accent rounded-xl border border-accent p-8 text-center"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-3">Entre em Contato</h2>
            <p className="text-gray-600 mb-4">
              Se você tiver dúvidas sobre esta política de privacidade ou sobre como tratamos seus dados, entre em contato conosco.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center px-6 py-3 bg-bbc text-white font-semibold rounded-xl hover:bg-bbc-dark transition-colors"
            >
              FALE CONOSCO
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
