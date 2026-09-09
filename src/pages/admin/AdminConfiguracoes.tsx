const AdminConfiguracoes = () => {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Configurações</h1>

      <section className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground space-y-1">
        <h2 className="font-semibold text-foreground">Entrega</h2>
        <p>Não trabalhamos com retirada no local.</p>
        <p>Em Anápolis/GO a entrega é grátis e aparece como opção no checkout.</p>
        <p>Para as demais cidades o cliente informa o CEP e recebe a estimativa de frete.</p>
      </section>

      <section className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground space-y-1">
        <h2 className="font-semibold text-foreground">Pagamentos e frete</h2>
        <p>A estrutura está pronta: os pedidos já registram método de pagamento, status e valores de frete.</p>
        <p>A cobrança real e a cotação oficial de transportadora serão ativadas quando as integrações forem conectadas.</p>
      </section>
    </div>
  );
};

export default AdminConfiguracoes;
