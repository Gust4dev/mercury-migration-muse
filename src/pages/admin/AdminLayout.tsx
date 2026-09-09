import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { BarChart3, Box, LayoutGrid, LogOut, Menu, Package, Percent, Settings, Store, Tag, X } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/lib/loja/useAuth";
import AdminLogin from "./AdminLogin";

const links = [
  { to: "/admin", label: "Dashboard", icon: BarChart3, end: true },
  { to: "/admin/produtos", label: "Produtos", icon: Box },
  { to: "/admin/categorias", label: "Categorias", icon: LayoutGrid },
  { to: "/admin/segmentos", label: "Segmentos", icon: Tag },
  { to: "/admin/pedidos", label: "Pedidos", icon: Package },
  { to: "/admin/cupons", label: "Cupons", icon: Percent },
  { to: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) {
    return <div className="min-h-screen grid place-items-center bg-background text-muted-foreground">Carregando...</div>;
  }

  if (!user || !isAdmin) return <AdminLogin loggedIn={!!user} />;

  const nav = (
    <nav className="flex flex-col gap-1 p-3">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.end}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
              isActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`
          }
        >
          <l.icon className="h-4 w-4" /> {l.label}
        </NavLink>
      ))}
      <Link to="/loja" className="flex items-center gap-2 px-3 py-2 rounded text-sm text-muted-foreground hover:text-foreground">
        <Store className="h-4 w-4" /> Ver loja
      </Link>
      <button onClick={signOut} className="flex items-center gap-2 px-3 py-2 rounded text-sm text-muted-foreground hover:text-destructive">
        <LogOut className="h-4 w-4" /> Sair
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Helmet>
        <title>Painel da Loja | Mercury Gestora</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-border bg-[hsl(0_0%_6%)]">
        <div className="p-4 font-heading font-bold text-primary">Mercury Loja</div>
        {nav}
      </aside>

      <div className="flex-1 min-w-0">
        <header className="md:hidden flex items-center justify-between h-14 px-4 border-b border-border">
          <span className="font-heading font-bold text-primary">Mercury Loja</span>
          <button onClick={() => setOpen(!open)} aria-label="Menu do painel">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>
        {open && <div className="md:hidden border-b border-border bg-[hsl(0_0%_6%)]">{nav}</div>}

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
