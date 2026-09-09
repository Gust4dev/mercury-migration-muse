import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = ({ loggedIn }: { loggedIn: boolean }) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) {
      toast({ title: "Não foi possível entrar", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-background text-foreground px-4">
      <Helmet>
        <title>Painel da Loja | Mercury Gestora</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="w-full max-w-sm">
        <h1 className="font-heading text-2xl font-bold text-primary">Painel da Loja</h1>

        {loggedIn ? (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Sua conta não tem permissão de administrador. Peça a um administrador para liberar seu acesso.
            </p>
            <button
              onClick={() => supabase.auth.signOut()}
              className="w-full h-11 rounded border border-border text-sm"
            >
              Entrar com outra conta
            </button>
            <Link to="/loja" className="block text-center text-sm text-muted-foreground hover:text-foreground">
              Voltar para a loja
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-4 space-y-3">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-11 px-3 rounded bg-secondary border border-border text-sm"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-11 px-3 rounded bg-secondary border border-border text-sm"
            />
            <button disabled={busy} className="w-full h-11 rounded bg-primary text-primary-foreground font-bold disabled:opacity-60">
              {busy ? "Entrando..." : "Entrar"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
