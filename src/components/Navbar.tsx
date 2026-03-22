import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import mercuryLogo from "@/assets/mercury-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Analisa.PraMim", href: "/analisa-pra-mim" },
  { label: "Vendi.Mais", href: "/vendimais" },
  { label: "Suporte", href: "/suporte" },
  { label: "Mercury Nexus®", href: "https://mercurynexus.com.br", external: true },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border" style={{ backgroundColor: 'hsl(0 0% 4% / 0.97)' }}>
      <div className="container mx-auto flex items-center justify-between h-14 sm:h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={mercuryLogo} alt="Mercury Gestora" className="h-8 sm:h-9 w-auto" />
          <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white">
            Mercury Gestora
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = link.href === location.pathname;
            const isExternal = 'external' in link && link.external;
            const isRoute = link.href.startsWith("/") && !isExternal;
            return (
              <li key={link.label}>
                {isExternal ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-bold rounded-md transition-colors text-primary hover:text-primary/80"
                  >
                    {link.label}
                  </a>
                ) : isRoute ? (
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
          className="md:hidden text-foreground p-2 -mr-2 active:scale-90 transition-transform"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu - fullscreen overlay */}
      <div
        className={`md:hidden fixed inset-0 top-14 transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: 'hsl(0 0% 4%)' }}
      >
        <div className="flex flex-col px-6 pt-6 gap-1">
          {navLinks.map((link, idx) => {
            const isExternal = 'external' in link && link.external;
            const isRoute = link.href.startsWith("/") && !isExternal;
            const isActive = link.href === location.pathname;

            const baseClass = `block py-4 text-lg font-heading font-semibold border-b border-border/30 transition-all duration-300 active:scale-[0.98] ${
              open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`;

            return isExternal ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`${baseClass} text-primary`}
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                {link.label} ↗
              </a>
            ) : isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setOpen(false)}
                className={`${baseClass} ${isActive ? "text-primary" : "text-foreground"}`}
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`${baseClass} text-foreground`}
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
