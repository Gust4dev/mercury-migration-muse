import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import ticoPhone from "@/assets/tico-phone.png";
import ticoSearch from "@/assets/tico-search.png";
import { useState, useEffect } from "react";

const SITE_LINK = "https://analisapramim.com.br";

const testimonials = [
  {
    name: "Fernanda Lopes",
    role: "Diretora de RH, empresa de tecnologia B2B",
    text: "A gente gastava dias inteiros só triando currículo. Com o AnalisaPraMim, meu time agora foca 100% na decisão não na peneira. Em 3 meses, reduzimos o tempo de contratação em 47%.",
  },
  {
    name: "Ricardo Mendes",
    role: "CEO, startup de SaaS",
    text: "Antes a gente perdia candidatos bons porque demorava demais pra responder. Agora em minutos já sabemos quem chamar. O AnalisaPraMim virou parte essencial do nosso processo.",
  },
  {
    name: "Camila Torres",
    role: "Gerente de Pessoas, indústria",
    text: "A qualidade dos candidatos que chegam na entrevista melhorou absurdamente. O ranking é certeiro e as justificativas me dão segurança pra decidir rápido.",
  },
];

const howItWorks = [
  "Lê e interpreta requisitos técnicos e comportamentais da vaga.",
  "Analisa currículos até os bagunçados em PDF, JPG ou print.",
  "Detecta experiências compatíveis, soft skills ocultas e gaps.",
  "Rankeia os 5 candidatos com maior aderência.",
  "Gera um relatório que mostra o porquê de cada escolha.",
  "(Se quiser) entrega uma mensagem pronta pra chamar os aprovados.",
];

const AnalisaPraMim = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-white pt-20 sm:pt-28 pb-10 sm:pb-16">
        <div className="container mx-auto px-5 sm:px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-[22px] leading-[1.2] sm:text-3xl md:text-5xl font-bold text-[hsl(145,70%,35%)] mb-4 sm:mb-6 px-1">
              80 currículos ou só os 5 certos?
              <br />
              <span className="text-white bg-[hsl(145,70%,35%)] px-3 sm:px-4 py-1 inline-block mt-2 rounded text-[20px] sm:text-3xl md:text-5xl">Você escolhe</span>
            </h1>

            {/* YouTube VSL */}
            <div className="bg-primary rounded-xl sm:rounded-2xl p-2.5 sm:p-6 mb-5 sm:mb-8 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[hsl(145,70%,35%)] flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px] sm:text-xs font-bold">▶</span>
                </div>
                <span className="text-primary-foreground font-heading font-bold text-[10px] sm:text-sm truncate">Análise de currículo para RH com IA</span>
              </div>
              <div className="aspect-video w-full rounded-lg sm:rounded-xl overflow-hidden bg-black">
                <iframe
                  className="w-full h-full pointer-events-none"
                  src="https://www.youtube.com/embed/NAq72W_Vaps?start=45&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=1"
                  title="AnalisaPraMim - Demonstração"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <a href={SITE_LINK} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-[hsl(145,70%,35%)] text-white font-heading font-bold text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 hover:bg-[hsl(145,70%,30%)] hover:scale-105 transition-all rounded-full w-full sm:w-auto active:scale-95"
              >
                VER O Analisa.PraMim®
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Pare de perder tempo */}
      <section className="bg-primary py-10 sm:py-20">
        <div className="container mx-auto px-5 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 items-center">
            <div className="text-center md:text-left order-2 md:order-1">
              <h2 className="font-heading text-xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-3 sm:mb-6">
                Pare de perder<br />tempo com<br />currículo ruim
              </h2>
              <p className="text-primary-foreground/90 mb-3 sm:mb-6 leading-relaxed text-xs sm:text-base">
                Você não foi contratado pra abrir 80 PDFs.
                <br />Foi contratado pra decidir certo.
                <br />O AnalisaPraMim faz a parte chata por você.
              </p>
              <ul className="space-y-1.5 sm:space-y-2 text-primary-foreground/80 text-xs sm:text-sm mb-5 sm:mb-8">
                <li>- Analisa vários currículos de uma vez</li>
                <li>- Rankeia os candidatos</li>
                <li>- Explica o motivo da posição do candidato</li>
              </ul>
              <a href={SITE_LINK} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-[hsl(145,70%,35%)] text-white font-heading font-bold text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 hover:bg-[hsl(145,70%,30%)] hover:scale-105 transition-all rounded-full w-full sm:w-auto active:scale-95"
                >
                  ECONOMIZAR MEU TEMPO
                </Button>
              </a>
            </div>
            <div className="flex justify-center order-1 md:order-2">
              <img
                src={ticoPhone}
                alt="Tico - mascote AnalisaPraMim"
                className="w-full max-w-[200px] sm:max-w-md rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* O que é */}
      <section className="bg-white py-10 sm:py-20">
        <div className="container mx-auto px-5 sm:px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-6 flex items-center justify-center gap-2 sm:gap-3">
              <Zap className="text-primary shrink-0" size={22} />
              O que é o AnalisaPraMim?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-2 sm:mb-4 text-xs sm:text-base px-1">
              Uma IA treinada exclusivamente para recrutamento técnico.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5 sm:mb-8 text-xs sm:text-base px-1">
              Ela lê a vaga, analisa currículos (até os mal formatados), cruza os dados e te entrega
              só os 5 candidatos mais aderentes com justificativas técnicas, lógicas e imparciais.
            </p>
            <a href={SITE_LINK} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-gray-900 text-white font-heading font-bold text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 hover:bg-gray-800 hover:scale-105 transition-all rounded-full w-full sm:w-auto active:scale-95"
              >
                CONHECER PLATAFORMA
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-[hsl(145,70%,35%)] py-10 sm:py-16">
        <div className="container mx-auto px-5 sm:px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white/80 font-semibold mb-2 text-xs sm:text-base">
              {testimonials[currentTestimonial].name}, {testimonials[currentTestimonial].role}
            </p>
            <blockquote className="text-white text-sm sm:text-lg md:text-xl leading-relaxed italic mb-5 sm:mb-8 px-1">
              "{testimonials[currentTestimonial].text}"
            </blockquote>
            <div className="flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all active:scale-90 ${
                    i === currentTestimonial ? "bg-white scale-125" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="bg-white py-10 sm:py-16">
        <div className="container mx-auto px-5 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="flex justify-center">
              <img
                src={ticoSearch}
                alt="Tico analisando currículos"
                className="w-full max-w-[180px] sm:max-w-sm md:max-w-md"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="font-heading text-xl sm:text-3xl md:text-4xl font-bold text-[hsl(145,70%,35%)] leading-tight mb-5 sm:mb-8 flex items-center justify-center md:justify-start gap-2 sm:gap-3">
                <Brain className="text-primary shrink-0" size={22} />
                <span>Como funciona</span>
              </h2>
              <ul className="space-y-2.5 sm:space-y-4">
                {howItWorks.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-gray-700 leading-relaxed text-xs sm:text-base">
                    <CheckCircle className="text-[hsl(145,70%,35%)] mt-0.5 shrink-0" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 sm:mt-10">
                <a href={SITE_LINK} target="_blank" rel="noopener noreferrer" className="inline-block w-full md:w-auto">
                  <Button
                    size="lg"
                    className="bg-gray-900 text-white font-heading font-bold text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 hover:bg-gray-800 hover:scale-105 transition-all rounded-full w-full md:w-auto active:scale-95"
                  >
                    ECONOMIZAR MEU TEMPO
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AnalisaPraMim;
