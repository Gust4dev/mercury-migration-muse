import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import SEO from "@/components/SEO";
import InstitutionalLayout from "@/components/institutional/InstitutionalLayout";
import PageHero from "@/components/institutional/PageHero";
import InstitutionalCta from "@/components/institutional/InstitutionalCta";
import Reveal from "@/components/institutional/Reveal";
import { getSolution, solutionDetails } from "@/components/institutional/data";
import { trackInstitutionalEvent, WHATSAPP_URL } from "@/components/institutional/config";

const SolutionDetailPage = () => {
  const { slug } = useParams();
  const solution = getSolution(slug);
  if (!solution) return <Navigate to="/solucoes" replace />;

  return (
    <>
      <SEO
        title={`${solution.name} | Mercury Gestora`}
        description={solution.description}
        canonical={`/solucoes/${solution.slug}`}
        keywords={`${solution.name}, ${solution.services.join(", ")}, Mercury Gestora`}
      />
      <InstitutionalLayout>
        <PageHero eyebrow="SOLUÇÕES MERCURY" title={solution.title} description={solution.description}>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackInstitutionalEvent("Contact", `Interesse em ${solution.name}`)} className="institutional-button bg-institutional-yellow text-institutional-black">
            Fale com nossa equipe <ArrowUpRight size={17} />
          </a>
          <Link to="/solucoes" className="institutional-button border-institutional-white/25 text-institutional-white">Todas as soluções</Link>
        </PageHero>

        <section className="bg-institutional-white py-16 sm:py-24">
          <div className="institutional-container grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div>
                <p className="institutional-eyebrow text-institutional-muted">COMO PODEMOS AJUDAR</p>
                <h2 className="institutional-title mt-4 text-3xl sm:text-4xl">Uma atuação conectada à sua operação.</h2>
                <p className="mt-5 text-lg leading-8 text-institutional-muted">{solution.introduction}</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ul className="border-t border-institutional-line">
                {solution.services.map((service, index) => (
                  <li key={service} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-institutional-line py-4 text-lg text-institutional-black/80">
                    <span className="text-xs text-institutional-muted">{String(index + 1).padStart(2, "0")}</span>{service}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="bg-institutional-light py-16 sm:py-20">
          <div className="institutional-container">
            <h2 className="text-3xl text-institutional-black">Como o trabalho é construído</h2>
            <div className="mt-10 grid border-t border-institutional-line md:grid-cols-3">
              {solution.approach.map((step, index) => (
                <article key={step.title} className="border-b border-institutional-line py-7 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                  <p className="text-sm text-institutional-muted">0{index + 1}</p>
                  <h3 className="mt-3 text-2xl text-institutional-black">{step.title}</h3>
                  <p className="mt-3 leading-7 text-institutional-muted">{step.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 border-t border-institutional-line pt-8">
              <h2 className="text-2xl text-institutional-black">Objetivos da solução</h2>
              <ul className="mt-5 grid gap-4 md:grid-cols-3">
                {solution.benefits.map((benefit) => <li key={benefit} className="border-l-2 border-institutional-yellow pl-4 text-institutional-black/75">{benefit}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-institutional-white py-12">
          <div className="institutional-container flex flex-wrap items-center gap-x-8 gap-y-4">
            <p className="mr-4 text-sm text-institutional-muted">Explore também:</p>
            {solutionDetails.filter((item) => item.slug !== solution.slug).map((item) => (
              <Link key={item.slug} to={`/solucoes/${item.slug}`} className="inline-flex items-center gap-2 text-institutional-black hover:text-institutional-muted">{item.name}<ArrowRight size={14} /></Link>
            ))}
          </div>
        </section>
        <InstitutionalCta title={`Vamos conversar sobre ${solution.name.toLowerCase()}?`} description="Conte para nossa equipe como sua empresa trabalha hoje e quais desafios você precisa resolver." />
      </InstitutionalLayout>
    </>
  );
};

export default SolutionDetailPage;
