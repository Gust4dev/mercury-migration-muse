import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Analisa.PraMim", href: "/analisa-pra-mim" },
  { label: "Vendi.Mais", href: "/vendimais" },
  { label: "Suporte", href: "#suporte" },
  { label: "Login", href: "#login" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="font-heading text-xl font-bold tracking-tight">
          <span className="text-white">Mercury</span> <span className="text-white">Gestora</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = link.href === location.pathname;
            const isRoute = link.href.startsWith("/");
            return (
              <li key={link.label}>
                {isRoute ? (
                  <Link
                    to={link.href}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium rounded-md transition-colors text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-t border-border px-4 pb-4">
          {navLinks.map((link) => {
            const isRoute = link.href.startsWith("/");
            return isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setOpen(false)}
                className={`block py-3 text-sm font-medium border-b border-border last:border-0 ${
                  link.href === location.pathname ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium border-b border-border last:border-0 text-muted-foreground"
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
