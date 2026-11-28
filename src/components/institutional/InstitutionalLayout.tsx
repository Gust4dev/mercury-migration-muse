import { ReactNode } from "react";
import InstitutionalNavbar from "./InstitutionalNavbar";
import InstitutionalFooter from "./InstitutionalFooter";
import "./institutional.css";

const InstitutionalLayout = ({ children }: { children: ReactNode }) => (
  <div className="institutional-site min-h-screen bg-institutional-white font-institutional text-institutional-black">
    <a
      href="#conteudo-institucional"
      className="institutional-skip-link bg-institutional-yellow px-4 py-3 text-institutional-black"
    >
      Ir para o conteúdo
    </a>
    <InstitutionalNavbar />
    <main id="conteudo-institucional">{children}</main>
    <InstitutionalFooter />
  </div>
);

export default InstitutionalLayout;
