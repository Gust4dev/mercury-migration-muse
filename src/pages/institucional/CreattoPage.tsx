import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import InstitutionalLayout from "@/components/institutional/InstitutionalLayout";
import PageHero from "@/components/institutional/PageHero";
import InstitutionalCta from "@/components/institutional/InstitutionalCta";
import Reveal from "@/components/institutional/Reveal";
import InstitutionalMediaGallery from "@/components/institutional/InstitutionalMediaGallery";
import { creattoOfficialLogo, creattoProductionPhotos } from "@/components/institutional/authority";
import creattoTwo from "@/assets/institutional/creatto-2.webp";
import creattoThree from "@/assets/institutional/creatto-3.webp";
import creattoFour from "@/assets/institutional/creatto-4.webp";
import { trackInstitutionalEvent, WHATSAPP_URL } from "@/components/institutional/config";

const products = [
  [creattoTwo, "Placa NFC real para avaliação no Google"],
  [creattoThree, "Placa NFC preta real para avaliação no Google"],
  [creattoFour, "Placa NFC real desenvolvida para clínica"],
];

const CreattoPage = () => (
  <>
    <SEO
      title="Creatto | Fabricação, Impressão 3D e Produtos Personalizados"
      description="Conheça a Creatto, braço de fabricação e impressão 3D da Mercury, e os produtos personalizados comercializados na Mercury Loja."
      canonical="/creatto"
      keywords="Creatto, impressão 3D, produtos personalizados, placas NFC, produtos para empresas, Mercury Loja"
    />
    <InstitutionalLayout>
      <PageHero
        light
        logo={creattoOfficialLogo}
        eyebrow="DESENVOLVIMENTO E FABRICAÇÃO"
        title="Da ideia ao produto. Conheça a Creatto."
        description="A Creatto é o braço de fabricação e impressão 3D da Mercury, dedicado ao desenvolvimento de produtos personalizados, soluções físicas e aplicações que conectam criatividade, tecnologia e funcionalidade."
      >
        <Link to="/loja" onClick={() => trackInstitutionalEvent("ViewContent", "Loja na página Creatto")} className="institutional-button bg-institutional-black text-institutional-white">Conheça nossos produtos <ArrowRight size={17} /></Link>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackInstitutionalEvent("Contact", "Projeto personalizado na página Creatto")} className="institutional-button border-institutional-black/25 text-institutional-black">Solicite um projeto personalizado <ArrowUpRight size={17} /></a>
      </PageHero>

      <section className="bg-institutional-white py-16 sm:py-24">
        <div className="institutional-container">
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <p className="institutional-eyebrow text-institutional-muted">TECNOLOGIA QUE GANHA FORMA</p>
              <h2 className="institutional-title mt-4 text-4xl">Produtos reais, desenvolvidos para necessidades reais.</h2>
            </div>
            <p className="text-lg leading-8 text-institutional-muted">Da criação de produtos para estabelecimentos comerciais às soluções com tecnologia NFC, a Creatto transforma desenvolvimento e fabricação em aplicações úteis para marketing, relacionamento e experiência do cliente.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {products.map(([image, alt]) => (
              <Reveal key={alt}>
                <div className="aspect-square overflow-hidden rounded-sm bg-institutional-light"><img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover" /></div>
              </Reveal>
            ))}
          </div>
          <p className="mt-3 text-xs text-institutional-muted">Fotografias reais dos produtos já cadastrados na Mercury Loja.</p>
          <InstitutionalMediaGallery photos={creattoProductionPhotos} />
        </div>
      </section>

      <section className="bg-institutional-light py-16 sm:py-20">
        <div className="institutional-container grid gap-10 lg:grid-cols-2">
          <h2 className="institutional-title text-4xl">Do desenvolvimento à entrega do produto.</h2>
          <ul className="border-t border-institutional-line">
            {['Impressão 3D', 'Desenvolvimento de produtos personalizados', 'Produtos para estabelecimentos comerciais', 'Soluções físicas para marketing e relacionamento', 'Produtos com tecnologia NFC', 'Projetos personalizados'].map((item, index) => (
              <li key={item} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-institutional-line py-4 text-lg text-institutional-black/75"><span className="text-xs text-institutional-muted">0{index + 1}</span>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <InstitutionalCta title="Tem uma ideia para um produto personalizado?" description="Converse com nossa equipe sobre desenvolvimento, fabricação e impressão 3D pela Creatto." />
    </InstitutionalLayout>
  </>
);

export default CreattoPage;
