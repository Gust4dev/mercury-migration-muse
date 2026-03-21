import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle, Zap, FileText, BarChart3, MessageSquare, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import ticoPhone from "@/assets/tico-phone.png";
import ticoSearch from "@/assets/tico-search.png";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Fernanda Lopes",
    role: "Diretora de RH, empresa de tecnologia B2B",
    text: "A gente gastava dias inteiros só triando currículo. Com o AnalisaPraMim, meu time agora foca 100% na decisão não na peneira. Em 3 meses, reduzimos o tempo de contratação em 47%. Isso muda o jogo.",
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
  "Lê e interpreta requisitos técnicos e comportamentais da vaga (mesmo os implícitos).",
  "Analisa currículos até os bagunçados em PDF, JPG ou print.",
  "Detecta experiências compatíveis, ferramentas usadas, soft skills ocultas e até gaps relevantes.",
  "Rankeia os 5 candidatos com maior aderência.",
  "Gera um relatório que mostra o porquê de cada escolha.",
  "(Se quiser) já entrega uma mensagem pronta pra você chamar os aprovados.",
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
      <section className="bg-white pt-28 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-[hsl(145,70%,35%)] leading-tight mb-6">
              80 currículos ou só os 5 certos?
              <br />
              <span className="text-white bg-[hsl(145,70%,35%)] px-4 py-1 inline-block mt-2 rounded">Você escolhe</span>
            </h1>

            {/* YouTube VSL */}
            <div className="bg-primary rounded-2xl p-4 md:p-6 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[hsl(145,70%,35%)] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">▶</span>
                </div>
                <span className="text-primary-foreground font-heading font-bold text-sm">Análise de currículo para RH com IA- Analisa.PraMim ®</span>
              </div>
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/NAq72W_Vaps?start=45"
                  title="AnalisaPraMim - Demonstração"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <Button
              size="lg"
              className="bg-[hsl(145,70%,35%)] text-white font-heading font-bold text-base px-10 py-6 hover:bg-[hsl(145,70%,30%)] hover:scale-105 transition-all rounded-full"
            >
              VER O Analisa.PraMim®
            </Button>
          </div>
        </div>
      </section>

      {/* Pare de perder tempo */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[hsl(145,70%,35%)] leading-tight mb-6">
                Pare de perder<br />tempo com<br />currículo ruim
              </h2>
              <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                Você não foi contratado pra abrir 80 PDFs.
                <br />Foi contratado pra decidir certo.
                <br />O AnalisaPraMim faz a parte chata por você.
              </p>
              <ul className="space-y-2 text-primary-foreground/80 text-sm mb-8">
                <li>- Analisa vários currículos de uma vez</li>
                <li>- Rankeia os candidatos</li>
                <li>- Explica o motivo da posição do candidato</li>
              </ul>
              <Button
                size="lg"
                className="bg-[hsl(145,70%,35%)] text-white font-heading font-bold text-base px-10 py-6 hover:bg-[hsl(145,70%,30%)] hover:scale-105 transition-all rounded-full"
              >
                ECONOMIZAR MEU TEMPO
              </Button>
            </div>
            <div className="flex justify-center">
              <img
                src={ticoPhone}
                alt="Tico - mascote AnalisaPraMim"
                className="w-full max-w-md rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* O que é */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-3">
              <Zap className="text-primary" size={32} />
              O que é o AnalisaPraMim?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Uma IA treinada exclusivamente para recrutamento técnico.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Ela lê a vaga, analisa currículos (até os mal formatados), cruza os dados e te entrega
              só os 5 candidatos mais aderentes com justificativas técnicas, lógicas e imparciais.
            </p>
            <Button
              size="lg"
              className="bg-gray-900 text-white font-heading font-bold text-base px-10 py-6 hover:bg-gray-800 hover:scale-105 transition-all rounded-full"
            >
              CONHECER PLATAFORMA
            </Button>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-[hsl(145,70%,35%)] py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white/80 font-semibold mb-2">
              {testimonials[currentTestimonial].name}, {testimonials[currentTestimonial].role}
            </p>
            <blockquote className="text-white text-lg md:text-xl leading-relaxed italic mb-8">
              "{testimonials[currentTestimonial].text}"
            </blockquote>
            <div className="flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentTestimonial ? "bg-white scale-125" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                src={ticoSearch}
                alt="Tico analisando currículos"
                className="w-full max-w-sm md:max-w-md"
              />
            </div>
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[hsl(145,70%,35%)] leading-tight mb-8 flex items-center gap-3">
                <Brain className="text-primary" size={32} />
                Como funciona (sem mágica, só inteligência)
              </h2>
              <ul className="space-y-4">
                {howItWorks.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <CheckCircle className="text-[hsl(145,70%,35%)] mt-1 shrink-0" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button
                  size="lg"
                  className="bg-gray-900 text-white font-heading font-bold text-base px-10 py-6 hover:bg-gray-800 hover:scale-105 transition-all rounded-full w-full md:w-auto"
                >
                  ECONOMIZAR MEU TEMPO
                </Button>
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
