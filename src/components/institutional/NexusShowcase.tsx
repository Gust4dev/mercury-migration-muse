import { useState } from "react";
import { Button } from "@/components/ui/button";
import { nexusCaptures } from "./authority";

const NexusShowcase = ({ compact = false }: { compact?: boolean }) => {
  const [index, setIndex] = useState(0);
  const capture = nexusCaptures[index];
  if (!capture) return null;
  return (
    <figure className={`nexus-showcase ${compact ? "nexus-showcase-compact" : ""}`}>
      <img src={capture.image} alt={capture.alt} width={1055} height={486} loading={compact ? "eager" : "lazy"} className="block w-full rounded-lg" />
      {!compact && <div className="mt-5 flex flex-wrap gap-2" aria-label="Funcionalidades da Mercury Nexus">
        {nexusCaptures.map((item, itemIndex) => <Button key={item.title} variant="ghost" onClick={() => setIndex(itemIndex)} aria-pressed={index === itemIndex} className={`nexus-view-button ${index === itemIndex ? "is-active" : ""}`}>{item.title}</Button>)}
      </div>}
      <figcaption className="mt-3 text-sm text-institutional-white/70">{compact ? "Mercury Nexus® — tecnologia proprietária" : "Capturas reais da plataforma. Dados pessoais e comerciais ocultos."}</figcaption>
    </figure>
  );
};

export default NexusShowcase;