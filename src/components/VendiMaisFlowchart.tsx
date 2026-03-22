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
  Shield,
  Cpu,
  Handshake,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

/* ─── data ─── */
const auxiliaryBots = [
  { icon: Instagram, label: "Instagram" },
  { icon: MessageSquare, label: "Messenger" },
  { icon: Globe, label: "TikTok" },
  { icon: Send, label: "Telegram" },
  { icon: MessageSquare, label: "Viber" },
];

const botSteps = [
  { icon: Database, label: "Capta dados" },
  { icon: Tags, label: "Variáveis & tags" },
  { icon: Brain, label: "IA atende" },
  { icon: ShoppingBag, label: "Mostra produtos" },
  { icon: ClipboardList, label: "Recebe pedido" },
];

const nexusFeatures = [
  { icon: BarChart3, label: "Campanhas" },
  { icon: MousePointerClick, label: "Cliques" },
  { icon: Users, label: "CRM" },
  { icon: TrendingUp, label: "Resultados" },
];

const techPills = [
  { icon: Shield, label: "API WhatsApp" },
  { icon: Instagram, label: "API Instagram" },
  { icon: Globe, label: "API TikTok" },
  { icon: Cpu, label: "IA Mercury" },
  { icon: Handshake, label: "Consultoria" },
];

/* ─── small reusable pieces ─── */
const Connector = ({ delay = 0, visible }: { delay?: number; visible: boolean }) => (
  <div
    className={`flex flex-col items-center gap-0 py-1 transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="w-px h-6 bg-gradient-to-b from-primary/60 to-primary/20" />
    <ChevronDown className="text-primary -mt-1" size={18} />
  </div>
);

const NodeCard = ({
  children,
  className = "",
  glow = false,
  delay = 0,
  visible,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  delay?: number;
  visible: boolean;
}) => (
  <div
    className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div
      className={`relative rounded-2xl border bg-card/80 backdrop-blur-sm p-5 md:p-6 ${
        glow
          ? "border-primary/40 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.15)]"
          : "border-border/60"
      }`}
    >
      {children}
    </div>
  </div>
);

const IconBubble = ({
  Icon,
  size = "md",
}: {
  Icon: LucideIcon;
  size?: "sm" | "md" | "lg";
}) => {
  const dims = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12" };
  const iconSize = { sm: 14, md: 18, lg: 22 };
  return (
    <div
      className={`${dims[size]} rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0`}
    >
      <Icon className="text-primary" size={iconSize[size]} />
    </div>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-primary/80 bg-primary/5 border border-primary/10 rounded-full px-3 py-1 mb-3">
    {children}
  </span>
);

/* ─── main ─── */
const VendiMaisFlowchart = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-background py-20 overflow-hidden" ref={ref}>
      {/* background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            Fluxo Completo
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Como o <span className="text-primary">Vendi.Mais®</span> funciona
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Você assina. A Mercury faz tudo. Do tráfego ao pedido — automático, integrado e mensurável.
          </p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* ── 1. Tráfego ── */}
          <NodeCard visible={visible} delay={100} glow>
            <div className="flex flex-col items-center text-center">
              <IconBubble Icon={Megaphone} size="lg" />
              <h3 className="font-heading font-bold text-foreground text-base mt-3 mb-1">
                Tráfego Pago
              </h3>
              <p className="text-muted-foreground text-xs">
                Facebook · Google · TikTok Ads
              </p>
            </div>
          </NodeCard>

          <Connector delay={200} visible={visible} />

          {/* ── 2. Bots Auxiliares ── */}
          <NodeCard visible={visible} delay={250} className="w-full">
            <div className="text-center mb-4">
              <SectionLabel>Captação Multicanal</SectionLabel>
              <p className="text-muted-foreground text-xs">
                Leads de outros canais são redirecionados ao Bot Central
              </p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {auxiliaryBots.map((bot, i) => (
                <div
                  key={bot.label}
                  className={`group flex flex-col items-center gap-1.5 rounded-xl border border-border/40 bg-secondary/40 p-3 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 ${
                    visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <bot.icon className="text-muted-foreground group-hover:text-primary transition-colors" size={18} />
                  <span className="text-[10px] text-muted-foreground group-hover:text-foreground font-medium transition-colors">
                    {bot.label}
                  </span>
                </div>
              ))}
            </div>
          </NodeCard>

          <Connector delay={500} visible={visible} />

          {/* ── 3. Bot Central ── */}
          <NodeCard visible={visible} delay={550} glow className="w-full">
            <div className="text-center mb-5">
              <SectionLabel>Núcleo do Sistema</SectionLabel>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Bot className="text-primary" size={22} />
                <h3 className="font-heading font-bold text-foreground text-lg">
                  Bot Central WhatsApp
                </h3>
              </div>
              <p className="text-muted-foreground text-xs mt-1">
                IA Mercury · 24h · Entende áudio · Atendimento completo
              </p>
            </div>

            {/* pipeline steps */}
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              {botSteps.map((step, idx) => (
                <div
                  key={step.label}
                  className={`flex-1 relative flex flex-col items-center text-center rounded-xl bg-primary/[0.04] border border-primary/10 p-3 transition-all duration-500 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${650 + idx * 100}ms` }}
                >
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <step.icon className="text-primary mt-1" size={18} />
                  <span className="text-[10px] font-medium text-foreground mt-1.5 leading-tight">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </NodeCard>

          <Connector delay={900} visible={visible} />

          {/* ── 4. Destinos ── */}
          <div
            className={`w-full grid grid-cols-1 md:grid-cols-5 gap-3 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "950ms" }}
          >
            {/* Portaria */}
            <div className="md:col-span-2 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-5 flex items-center gap-4">
              <IconBubble Icon={Building2} />
              <div>
                <h4 className="font-heading font-bold text-foreground text-sm">
                  Portaria / Atendente
                </h4>
                <p className="text-muted-foreground text-[11px]">
                  Pedido chega direto no WhatsApp
                </p>
              </div>
            </div>

            {/* Nexus */}
            <div className="md:col-span-3 rounded-2xl border border-primary/30 bg-card/80 backdrop-blur-sm p-5 shadow-[0_0_25px_-5px_hsl(var(--primary)/0.1)]">
              <div className="flex items-center gap-2 mb-3">
                <IconBubble Icon={LayoutDashboard} size="sm" />
                <h4 className="font-heading font-bold text-foreground text-sm">
                  Mercury Nexus®
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {nexusFeatures.map((f) => (
                  <div key={f.label} className="flex items-center gap-2 rounded-lg bg-primary/[0.04] px-2.5 py-1.5">
                    <f.icon className="text-primary shrink-0" size={13} />
                    <span className="text-[11px] text-muted-foreground font-medium">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Connector delay={1050} visible={visible} />

          {/* ── 5. Remarketing Loop ── */}
          <NodeCard visible={visible} delay={1100} className="w-full">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <RefreshCw className="text-primary animate-[spin_6s_linear_infinite]" size={20} />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h4 className="font-heading font-bold text-foreground text-sm mb-0.5">
                  Remarketing Automático
                </h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Disparos oficiais e automáticos para leads do CRM.
                  Aumenta conversão no médio/longo prazo — leads voltam ao Bot Central.
                </p>
              </div>
              <div className="flex items-center gap-1 text-primary/40 shrink-0">
                <span className="text-[10px] font-heading font-bold text-primary/60 uppercase tracking-wider">Loop</span>
                <RefreshCw size={14} className="text-primary/60" />
              </div>
            </div>
          </NodeCard>

          {/* ── 6. Tech Stack ── */}
          <div
            className={`mt-10 w-full transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "1200ms" }}
          >
            <div className="text-center mb-4">
              <SectionLabel>Tecnologia — Tudo incluso</SectionLabel>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {techPills.map((t, i) => (
                <div
                  key={t.label}
                  className={`flex items-center gap-2 rounded-full border border-border/40 bg-card/60 px-4 py-2 transition-all duration-500 hover:border-primary/30 ${
                    visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                  style={{ transitionDelay: `${1250 + i * 60}ms` }}
                >
                  <t.icon className="text-primary" size={13} />
                  <span className="text-[11px] text-foreground/80 font-medium">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendiMaisFlowchart;
