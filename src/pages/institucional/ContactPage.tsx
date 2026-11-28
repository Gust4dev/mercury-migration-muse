import { ArrowUpRight, Instagram, Mail, MessageCircle } from "lucide-react";
import SEO from "@/components/SEO";
import InstitutionalLayout from "@/components/institutional/InstitutionalLayout";
import PageHero from "@/components/institutional/PageHero";
import { CONTACT_EMAIL, INSTAGRAM_URL, trackInstitutionalEvent, WHATSAPP_URL } from "@/components/institutional/config";

const ContactPage = () => (
  <>
    <SEO
      title="Contato | Fale com a Mercury Gestora"
      description="Converse com a equipe da Mercury Gestora sobre marketing, tecnologia, inteligência comercial, segmentos e projetos personalizados Creatto."
      canonical="/contato"
      keywords="contato Mercury Gestora, WhatsApp Mercury, orçamento marketing e tecnologia"
    />
    <InstitutionalLayout>
      <PageHero
        eyebrow="CONTATO"
        title="Vamos entender o próximo passo da sua empresa."
        description="Conte o que sua empresa precisa. Nossa equipe está pronta para conversar sobre clientes, atendimento, tecnologia, operação comercial e desenvolvimento de produtos."
      />
      <section className="bg-institutional-white py-16 sm:py-24">
        <div className="institutional-container grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-20">
          <div>
            <p className="institutional-eyebrow text-institutional-muted">CANAIS OFICIAIS</p>
            <h2 className="institutional-title mt-4 text-4xl">Escolha como quer falar com a Mercury.</h2>
            <p className="mt-5 leading-7 text-institutional-muted">Para suporte de uma solução já contratada, utilize também a área de suporte do site.</p>
          </div>
          <div className="border-t border-institutional-line">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackInstitutionalEvent("Contact", "Página de contato — WhatsApp")} className="group flex items-center gap-5 border-b border-institutional-line py-7">
              <MessageCircle className="shrink-0 text-institutional-muted group-hover:text-institutional-black" size={26} />
              <span className="flex-1"><span className="block text-2xl text-institutional-black">WhatsApp comercial</span><span className="mt-1 block text-sm text-institutional-muted">Converse com nossa equipe sobre sua empresa.</span></span>
              <ArrowUpRight size={20} />
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="group flex items-center gap-5 border-b border-institutional-line py-7">
              <Mail className="shrink-0 text-institutional-muted group-hover:text-institutional-black" size={26} />
              <span className="flex-1"><span className="block text-2xl text-institutional-black">E-mail</span><span className="mt-1 block break-all text-sm text-institutional-muted">{CONTACT_EMAIL}</span></span>
              <ArrowUpRight size={20} />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 border-b border-institutional-line py-7">
              <Instagram className="shrink-0 text-institutional-muted group-hover:text-institutional-black" size={26} />
              <span className="flex-1"><span className="block text-2xl text-institutional-black">Instagram</span><span className="mt-1 block text-sm text-institutional-muted">@mercurygestora</span></span>
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
      </section>
    </InstitutionalLayout>
  </>
);

export default ContactPage;
