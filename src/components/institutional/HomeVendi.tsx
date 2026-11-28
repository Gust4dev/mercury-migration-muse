import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { trackInstitutionalEvent } from "./config";

const HomeVendi = () => (
  <section className="border-b border-institutional-line bg-institutional-white py-14 sm:py-20">
    <div className="institutional-container">
      <Reveal>
        <div className="grid items-center gap-8 lg:grid-cols-[0.35fr_0.45fr_auto] lg:gap-12">
          <div>
            <p className="institutional-eyebrow text-institutional-muted">SOLUÇÃO COMERCIAL INTEGRADA</p>
            <h2 className="institutional-title mt-3 text-3xl text-institutional-black sm:text-4xl">Vendi.Mais®</h2>
          </div>
          <div>
            <h3 className="text-2xl text-institutional-black">Uma estratégia completa para vender mais.</h3>
            <p className="mt-3 text-base leading-7 text-institutional-muted">
              O Vendi.Mais® combina aquisição de clientes, atendimento, relacionamento e tecnologia em uma operação comercial integrada, estruturada de acordo com as necessidades de cada empresa.
            </p>
          </div>
          <Link
            to="/vendimais"
            onClick={() => trackInstitutionalEvent("ViewContent", "Conhecer Vendi.Mais na Home")}
            className="institutional-button bg-institutional-black text-institutional-white hover:bg-institutional-graphite"
          >
            Conheça o Vendi.Mais® <ArrowRight size={17} />
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

export default HomeVendi;
