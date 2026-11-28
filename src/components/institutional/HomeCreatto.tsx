import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import creattoOne from "@/assets/institutional/creatto-4.webp";
import creattoTwo from "@/assets/institutional/creatto-2.webp";
import creattoThree from "@/assets/institutional/creatto-3.webp";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import InstitutionalMediaGallery from "./InstitutionalMediaGallery";
import { creattoOfficialLogo, creattoProductionPhotos } from "./authority";
import { trackInstitutionalEvent, WHATSAPP_URL } from "./config";

const products = [
  { image: creattoOne, alt: "Placa NFC real desenvolvida para clínica" },
  { image: creattoTwo, alt: "Placa NFC real para avaliações no Google" },
  { image: creattoThree, alt: "Placa NFC preta real para avaliações no Google" },
];

const HomeCreatto = () => (
  <section id="creatto" className="bg-institutional-white py-16 sm:py-24">
    <div className="institutional-container grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      <Reveal>
        <div>
          {creattoOfficialLogo && <img src={creattoOfficialLogo} alt="Logotipo oficial Creatto" className="mb-6 h-20 w-auto" loading="lazy" />}
          <SectionHeading
            eyebrow="DESENVOLVIMENTO E FABRICAÇÃO"
            title="Da ideia ao produto. Conheça a Creatto."
            description="A Creatto é o braço de fabricação e impressão 3D da Mercury, dedicado ao desenvolvimento de produtos personalizados, soluções físicas e aplicações que conectam criatividade, tecnologia e funcionalidade."
          />
          <ul className="mt-6 grid grid-cols-2 gap-x-5 border-t border-institutional-line pt-4 text-sm text-institutional-black/70">
            {['Impressão 3D', 'Produtos personalizados', 'Produtos para empresas', 'Soluções para marketing', 'Tecnologia NFC', 'Projetos personalizados'].map((item) => (
              <li key={item} className="border-b border-institutional-line/70 py-3">{item}</li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/loja"
              onClick={() => trackInstitutionalEvent("ViewContent", "Acesso à loja pela Creatto")}
              className="institutional-button bg-institutional-yellow text-institutional-black hover:bg-institutional-yellow/85"
            >
              Conheça nossos produtos <ArrowRight size={17} />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackInstitutionalEvent("Contact", "Projeto personalizado Creatto")}
              className="institutional-button border-institutional-black/25 text-institutional-black hover:bg-institutional-black/5"
            >
              Solicite um projeto <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          {products.map((product, index) => (
            <figure key={product.alt} className={index === 0 ? "row-span-2" : ""}>
              <div className={`${index === 0 ? "h-full min-h-[360px]" : "aspect-square"} overflow-hidden rounded-sm bg-institutional-light`}>
                <img src={product.image} alt={product.alt} loading="lazy" className="h-full w-full object-cover" />
              </div>
            </figure>
          ))}
        </div>
        <p className="mt-3 text-xs text-institutional-muted">Fotografias reais de produtos comercializados na Mercury Loja.</p>
        <InstitutionalMediaGallery photos={creattoProductionPhotos} />
      </Reveal>
    </div>
  </section>
);

export default HomeCreatto;
