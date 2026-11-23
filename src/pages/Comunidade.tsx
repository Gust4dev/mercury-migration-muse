import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/mercury-logo.png";
import { CheckCircle2, Loader2 } from "lucide-react";

const WA_NUMBER = "556293618627";
const UFS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];
const BANDEIRAS = ["Bandeira Branca (Independente)","Ultragaz","Copa Energia","Nacional Gás","Supergasbras","Consigaz","Outra"];
const VENDAS = ["Até 100 botijões","101 a 300","301 a 500","501 a 1.000","1.001 a 2.000","2.001 a 5.000","Acima de 5.000"];
const UTM_KEYS = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","fbclid"];

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0,2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
};

const schema = z.object({
  revenda: z.string().trim().min(2, "Informe o nome da revenda").max(120),
  whatsapp: z.string().refine((v) => /^[1-9]{2}9?\d{8}$/.test(v.replace(/\D/g, "")) && (v.replace(/\D/g,"").length === 10 || v.replace(/\D/g,"")[2] === "9"), "WhatsApp inválido (inclua o DDD)"),
  cidade: z.string().trim().min(2, "Informe a cidade").max(100),
  estado: z.string().regex(/^[A-Z]{2}$/, "Selecione o estado"),
  bandeira: z.string().min(1, "Selecione a bandeira"),
  outra: z.string().trim().max(80).optional(),
  vendas: z.string().min(1, "Selecione a média de vendas"),
}).refine((d) => d.bandeira !== "Outra" || (d.outra && d.outra.length >= 2), { path: ["outra"], message: "Informe a companhia" });

const track = (ev: string, data?: object) => { try { (window as any).fbq?.("track", ev, data); } catch {} };

export default function Comunidade() {
  const [f, setF] = useState({ revenda: "", whatsapp: "", cidade: "", estado: "", bandeira: "", outra: "", vendas: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<{ protocol: string; url: string } | null>(null);
  const [cities, setCities] = useState<string[]>([]);

  const utm = useMemo(() => {
    const p = new URLSearchParams(window.location.search);
    const o: Record<string, string> = {};
    UTM_KEYS.forEach((k) => { const v = p.get(k); if (v) o[k] = v.slice(0, 200); });
    if (document.referrer) o.referrer = document.referrer.slice(0, 200);
    return o;
  }, []);

  useEffect(() => {
    if (!f.estado) return setCities([]);
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${f.estado}/municipios`)
      .then((r) => r.json()).then((d) => setCities(d.map((m: any) => m.nome))).catch(() => setCities([]));
  }, [f.estado]);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF({ ...f, [k]: k === "whatsapp" ? maskPhone(e.target.value) : e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(f);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      return setErrors(errs);
    }
    setErrors({}); setLoading(true);
    const bandeira = f.bandeira === "Outra" ? `Outra: ${f.outra.trim()}` : f.bandeira;
    const { data, error } = await supabase.rpc("submit_comunidade_lead", {
      _revenda: f.revenda, _whatsapp: f.whatsapp, _cidade: f.cidade, _estado: f.estado,
      _bandeira: bandeira, _vendas: f.vendas, _utm: utm,
    });
    setLoading(false);
    if (error || !data) return setErrors({ form: "Não foi possível salvar seu cadastro. Tente novamente." });
    track("Lead", { content_name: "Comunidade GLP Brasil" });
    const msg = `Olá, Mercury! Quero solicitar minha entrada gratuita na Comunidade GLP Brasil.\n\nRevenda: ${f.revenda.trim()}\nWhatsApp: ${f.whatsapp}\nCidade: ${f.cidade.trim()}\nEstado: ${f.estado}\nBandeira: ${bandeira}\nVendas mensais: ${f.vendas}\nCadastro: ${data}\n\nGostaria de receber o convite para participar da comunidade!`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    setDone({ protocol: data as string, url });
    track("Contact");
    window.location.href = url;
  };

  const input = "w-full h-12 rounded-lg bg-secondary border border-border px-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";
  const Err = ({ k }: { k: string }) => errors[k] ? <p className="text-xs text-destructive mt-1">{errors[k]}</p> : null;

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Questrial', sans-serif" }}>
      <Helmet>
        <title>Comunidade GLP Brasil | Mercury Gestora</title>
        <meta name="description" content="Comunidade gratuita para revendedores de gás de todo o Brasil. Compartilhe experiências, estratégias e novidades do mercado de GLP." />
        <link rel="canonical" href="https://mercurygestora.com.br/comunidade" />
        <meta property="og:title" content="Faça parte da Comunidade GLP Brasil!" />
        <meta property="og:description" content="Conecte-se gratuitamente com revendedores de gás de todo o Brasil." />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Questrial&display=swap" />
      </Helmet>
      <main className="mx-auto max-w-md px-5 py-8">
        <img src={logo} alt="Mercury Gestora" className="h-10 w-auto mx-auto mb-8" />
        <h1 className="text-3xl font-bold text-center leading-tight">Faça parte da <span className="text-primary">Comunidade GLP Brasil!</span></h1>
        <p className="mt-4 text-center text-muted-foreground">Conecte-se gratuitamente com revendedores de gás de todo o Brasil. Compartilhe experiências, estratégias e novidades do mercado de GLP.</p>
        <p className="mt-3 text-center text-sm text-primary">Comunidade exclusiva para profissionais do setor de revenda de gás.</p>

        {done ? (
          <div className="mt-8 rounded-xl border border-primary/40 bg-card p-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-3 text-xl font-bold">Cadastro recebido!</h2>
            <p className="mt-2 text-sm text-muted-foreground">Protocolo <strong className="text-foreground">{done.protocol}</strong>. Agora envie a mensagem no WhatsApp para concluir sua solicitação.</p>
            <a href={done.url} onClick={() => track("Contact")} className="mt-5 flex h-14 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">ABRIR WHATSAPP</a>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-8 space-y-4">
            <div><input className={input} placeholder="Nome da revenda" value={f.revenda} onChange={set("revenda")} maxLength={120} /><Err k="revenda" /></div>
            <div><input className={input} placeholder="WhatsApp com DDD" inputMode="tel" value={f.whatsapp} onChange={set("whatsapp")} /><Err k="whatsapp" /></div>
            <div>
              <select className={input} value={f.estado} onChange={set("estado")}>
                <option value="">Estado de atuação</option>
                {UFS.map((u) => <option key={u} value={u}>{u}</option>)}
              </select><Err k="estado" />
            </div>
            <div>
              <input className={input} placeholder="Cidade de atuação" list="cidades" value={f.cidade} onChange={set("cidade")} maxLength={100} />
              <datalist id="cidades">{cities.map((c) => <option key={c} value={c} />)}</datalist><Err k="cidade" />
            </div>
            <div>
              <select className={input} value={f.bandeira} onChange={set("bandeira")}>
                <option value="">Bandeira / Companhia</option>
                {BANDEIRAS.map((b) => <option key={b}>{b}</option>)}
              </select><Err k="bandeira" />
            </div>
            {f.bandeira === "Outra" && <div><input className={input} placeholder="Qual companhia?" value={f.outra} onChange={set("outra")} maxLength={80} /><Err k="outra" /></div>}
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Quantos botijões sua revenda vende, em média, por mês?</label>
              <select className={input} value={f.vendas} onChange={set("vendas")}>
                <option value="">Selecione</option>
                {VENDAS.map((v) => <option key={v}>{v}</option>)}
              </select><Err k="vendas" />
            </div>
            <Err k="form" />
            <button type="submit" disabled={loading} className="flex h-16 w-full items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground shadow-lg transition active:scale-[0.98] disabled:opacity-70">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "SOLICITAR ENTRADA GRATUITAMENTE"}
            </button>
            <p className="text-xs text-center text-muted-foreground">Participação gratuita e sujeita a aprovação. Seus dados serão usados para analisar a solicitação e administrar a comunidade. <Link to="/privacidade" className="underline">Política de Privacidade</Link>.</p>
          </form>
        )}
      </main>
      <footer className="py-6 text-center text-xs text-muted-foreground border-t border-border">Comunidade GLP Brasil — Uma iniciativa Mercury Gestora.</footer>
    </div>
  );
}
