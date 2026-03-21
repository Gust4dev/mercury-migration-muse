const Footer = () => {
  return (
    <footer className="bg-mercury-dark border-t border-border py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-heading text-lg font-bold text-white">
              Mercury Gestora
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              CNPJ: 50.884.134/0001-90
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              contato@mercurygestora.com.br
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              © {new Date().getFullYear()} Mercury Gestora. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
