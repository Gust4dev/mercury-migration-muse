import { useEffect, useRef, useState } from "react";
import {
  Megaphone,
  Instagram,
  MessageSquare,
  Send,
  Globe,
  Bot,
  Database,
  Tags,
  Brain,
  ShoppingBag,
  ClipboardList,
  Building2,
  LayoutDashboard,
  BarChart3,
  Users,
  MousePointerClick,
  TrendingUp,
  RefreshCw,
  Mail,
  Shield,
  Cpu,
  Handshake,
  ArrowDown,
  ArrowRight,
} from "lucide-react";

const VendiMaisFlowchart = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const auxiliaryBots = [
    { icon: Instagram, label: "Bot Instagram Direct" },
    { icon: MessageSquare, label: "Bot Messenger" },
    { icon: Globe, label: "Bot TikTok" },
    { icon: Send, label: "Bot Telegram" },
    { icon: MessageSquare, label: "Bot Viber" },
  ];

  const botCentralSteps = [
    { icon: Database, label: "Capta dados do lead" },
    { icon: Tags, label: "Adiciona variáveis e tags" },
    { icon: Brain, label: "Atendimento inteligente com IA" },
    { icon: ShoppingBag, label: "Mostra produtos e catálogo" },
    { icon: ClipboardList, label: "Recebe pedidos" },
  ];

  const nexusFeatures = [
    { icon: BarChart3, label: "Controle de campanhas" },
    { icon: MousePointerClick, label: "Monitoramento de cliques" },
    { icon: Users, label: "CRM de contatos" },
    { icon: TrendingUp, label: "Resultados e métricas" },
  ];

  const techStack = [
    { icon: Shield, label: "API Oficial WhatsApp" },
    { icon: Instagram, label: "API Oficial Instagram" },
    { icon: Globe, label: "API Oficial TikTok" },
    { icon: Cpu, label: "IA Própria Mercury" },
    { icon: Handshake, label: "Consultoria Mercury" },
  ];

  return (
    <section className="bg-secondary py-20 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            Como funciona
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            A estrutura completa do{" "}
            <span className="text-primary">Vendi.Mais®</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Você assina com a Mercury e a Mercury faz tudo isso. Captação,
            automação, remarketing e controle — tudo integrado.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {/* 1 — Tráfego Pago */}
          <div
            className={`transition-all duration-700 delay-100 ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="rounded-xl border border-primary/30 bg-background/60 backdrop-blur p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Megaphone className="text-primary" size={24} />
                <h3 className="font-heading font-bold text-lg text-foreground">
                  Tráfego Pago
                </h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Facebook Ads · Google Ads · TikTok Ads
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="text-primary animate-bounce" size={28} />
          </div>

          {/* 2 — Bots Auxiliares */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="rounded-xl border border-border bg-background/40 backdrop-blur p-6">
              <p className="text-primary font-heading font-semibold text-xs uppercase tracking-[0.2em] mb-4 text-center">
                Bots Auxiliares — Captação Multicanal
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {auxiliaryBots.map((bot) => (
                  <div
                    key={bot.label}
                    className="flex flex-col items-center gap-2 rounded-lg border border-border bg-secondary/50 p-3 text-center"
                  >
                    <bot.icon className="text-primary" size={20} />
                    <span className="text-xs text-foreground font-medium leading-tight">
                      {bot.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="text-primary animate-bounce" size={28} />
          </div>

          {/* 3 — Bot Central WhatsApp */}
          <div
            className={`transition-all duration-700 delay-300 ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="rounded-xl border-2 border-primary/50 bg-background/60 backdrop-blur p-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Bot className="text-primary" size={24} />
                <h3 className="font-heading font-bold text-lg text-foreground">
                  Bot Central WhatsApp — IA Mercury
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                {botCentralSteps.map((step, idx) => (
                  <div key={step.label} className="flex items-center gap-2">
                    <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 w-full">
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-primary text-xs font-bold">
                          {idx + 1}
                        </span>
                      </div>
                      <span className="text-xs text-foreground font-medium leading-tight">
                        {step.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-12">
            <ArrowDown className="text-primary animate-bounce" size={28} />
          </div>

          {/* 4 — Destinos: Portaria + Nexus */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-700 delay-[400ms] ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="rounded-xl border border-border bg-background/40 backdrop-blur p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Building2 className="text-primary" size={22} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-foreground text-sm">
                  Portaria / Atendente
                </h4>
                <p className="text-muted-foreground text-xs">
                  Pedido chega direto no WhatsApp
                </p>
              </div>
            </div>

            <div className="rounded-xl border-2 border-primary/40 bg-background/60 backdrop-blur p-5">
              <div className="flex items-center gap-3 mb-3">
                <LayoutDashboard className="text-primary" size={22} />
                <h4 className="font-heading font-bold text-foreground text-sm">
                  Mercury Nexus® — Painel de Controle
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {nexusFeatures.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <f.icon className="text-primary shrink-0" size={14} />
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5 — Remarketing Loop */}
          <div
            className={`transition-all duration-700 delay-500 ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <RefreshCw className="text-primary" size={22} />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-heading font-bold text-foreground text-sm mb-1">
                  Remarketing Automático
                </h4>
                <p className="text-muted-foreground text-xs">
                  Disparos oficiais e automáticos para leads do CRM — aumenta
                  conversão no médio e longo prazo. Os leads voltam para o Bot
                  Central.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Mail className="text-primary" size={18} />
                <ArrowRight className="text-primary" size={18} />
                <Bot className="text-primary" size={18} />
              </div>
            </div>
          </div>

          {/* 6 — Tecnologia */}
          <div
            className={`transition-all duration-700 delay-[600ms] ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="rounded-xl border border-border bg-background/30 backdrop-blur p-5">
              <p className="text-primary font-heading font-semibold text-xs uppercase tracking-[0.2em] mb-3 text-center">
                Tecnologia Mercury — Tudo incluso na assinatura
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {techStack.map((t) => (
                  <div
                    key={t.label}
                    className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2"
                  >
                    <t.icon className="text-primary" size={14} />
                    <span className="text-xs text-foreground font-medium">
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendiMaisFlowchart;
