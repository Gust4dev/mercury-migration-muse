import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import LojaLayout from "@/components/loja/LojaLayout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/loja/useAuth";
import { brl } from "@/lib/loja/pricing";

const ContaPage = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const { toast } = useToast();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [orders, setOrders] = useState<
    { id: string; order_number: string; status: string; total: number; created_at: string }[]
  >([]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("orders")
      .select("id,order_number,status,total,created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => setOrders(data ?? []));
  }, [user]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: `${window.location.origin}/loja/conta`, data: { full_name: name } },
        });
        if (error) throw error;
        toast({ title: "Confira seu e-mail", description: "Enviamos um link para confirmar sua conta." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        toast({ title: "Bem-vindo de volta!" });
      }
    } catch (err) {
      toast({
        title: "Não foi possível continuar",
        description: err instanceof Error ? err.message : "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  const input = "w-full h-11 px-3 rounded bg-secondary border border-border text-sm";

  return (
    <LojaLayout>
      <SEO title="Minha conta | Mercury Loja" description="Acesse sua conta para acompanhar pedidos da Mercury Loja." canonical="/loja/conta" noindex />

      <div className="container mx-auto px-4 lg:px-8 py-10 max-w-md">
        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : user ? (
          <div className="space-y-5">
            <div>
              <h1 className="font-heading text-2xl font-bold">Minha conta</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            {isAdmin && (
              <Link to="/admin" className="block h-11 leading-[2.75rem] text-center rounded bg-primary text-primary-foreground font-bold">
                Abrir painel administrativo
              </Link>
            )}

            <div className="rounded-lg border border-border bg-card p-4">
              <div className="font-semibold text-sm mb-2">Meus pedidos</div>
              {orders.length === 0 ? (
                <p className="text-sm text-muted-foreground">Você ainda não tem pedidos.</p>
              ) : (
                orders.map((o) => (
                  <Link
                    key={o.id}
                    to={`/loja/pedido?numero=${o.order_number}&email=${encodeURIComponent(user.email ?? "")}`}
                    className="flex justify-between text-sm py-2 border-b border-border/50 last:border-0 hover:text-primary"
                  >
                    <span>{o.order_number}</span>
                    <span>{brl(Number(o.total))}</span>
                  </Link>
                ))
              )}
            </div>

            <button onClick={signOut} className="w-full h-11 rounded border border-border text-sm">
              Sair
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <h1 className="font-heading text-2xl font-bold">{mode === "login" ? "Entrar" : "Criar conta"}</h1>
            <p className="text-sm text-muted-foreground">
              A conta é opcional — você pode comprar sem cadastro. Ela serve para acompanhar seus pedidos.
            </p>
            {mode === "signup" && (
              <input className={input} placeholder="Nome completo" value={name} onChange={(e) => setName(e.target.value)} />
            )}
            <input className={input} type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className={input} type="password" placeholder="Senha" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button disabled={busy} className="w-full h-11 rounded bg-primary text-primary-foreground font-bold disabled:opacity-60">
              {busy ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta"}
            </button>
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="w-full text-sm text-muted-foreground hover:text-foreground"
            >
              {mode === "login" ? "Não tenho conta" : "Já tenho conta"}
            </button>
          </form>
        )}
      </div>
    </LojaLayout>
  );
};

export default ContaPage;
