import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Privacidade() {
  return (
    <main className="min-h-screen bg-background text-foreground mx-auto max-w-2xl px-5 py-10 space-y-4">
      <Helmet><title>Política de Privacidade | Mercury Gestora</title><meta name="robots" content="noindex" /></Helmet>
      <h1 className="text-2xl font-bold">Política de Privacidade</h1>
      <p className="text-muted-foreground">A Mercury Gestora (CNPJ 50.884.134/0001-90) coleta os dados informados nos formulários deste site, como nome da revenda, WhatsApp, cidade, estado, bandeira e média de vendas, além de parâmetros de campanha.</p>
      <p className="text-muted-foreground">Esses dados são usados para analisar solicitações, entrar em contato e administrar a Comunidade GLP Brasil, e não ficam acessíveis publicamente.</p>
      <p className="text-muted-foreground">Para corrigir ou excluir seus dados, fale conosco pelo WhatsApp (62) 9361-8627.</p>
      <Link to="/" className="text-primary underline">Voltar ao site</Link>
    </main>
  );
}
