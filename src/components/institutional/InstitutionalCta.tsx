import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { trackInstitutionalEvent, WHATSAPP_URL } from "./config";

interface InstitutionalCtaProps {
  title?: string;
  description?: string;
}

const InstitutionalCta = ({
  title = "Qual é o próximo passo da sua empresa?",
  description = "Converse com nossa equipe e descubra como a Mercury pode ajudar seu negócio a conquistar clientes, melhorar processos e crescer.",
}: InstitutionalCtaProps) => (
  <section className="bg-institutional-yellow py-16 text-institutional-black sm:py-20">
    <div className="institutional-container grid items-end gap-8 lg:grid-cols-[1fr_auto]">
      <div className="max-w-3xl">
        <p className="institutional-eyebrow text-institutional-black/60">VAMOS CONVERSAR</p>
        <h2 className="institutional-title mt-4 text-4xl sm:text-5xl">{title}</h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-institutional-black/70 sm:text-lg">{description}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackInstitutionalEvent("Contact", "CTA institucional")}
          className="institutional-button bg-institutional-black text-institutional-white hover:bg-institutional-graphite"
        >
          Fale com nossa equipe <ArrowUpRight size={17} />
        </a>
        <Link
          to="/solucoes"
          onClick={() => trackInstitutionalEvent("ViewContent", "CTA conhecer soluções")}
          className="institutional-button border-institutional-black/30 text-institutional-black hover:bg-institutional-black/5"
        >
          Conheça nossas soluções <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  </section>
);

export default InstitutionalCta;
