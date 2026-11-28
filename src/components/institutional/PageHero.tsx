import { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  squareImage?: boolean;
  light?: boolean;
}

const PageHero = ({ eyebrow, title, description, children, image, imageAlt, imageCaption, squareImage = false, light = false }: PageHeroProps) => (
  <section className={`${light ? "bg-institutional-light text-institutional-black" : "bg-institutional-black text-institutional-white"} pb-16 pt-32 sm:pb-20 sm:pt-40`}>
    <div className={`institutional-container grid items-center gap-10 ${image ? "lg:grid-cols-2 lg:gap-16" : ""}`}>
      <div className={image ? "" : "max-w-4xl"}>
        <p className={`institutional-eyebrow ${light ? "text-institutional-muted" : "text-institutional-yellow"}`}>{eyebrow}</p>
        <h1 className="institutional-display mt-5 text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
        <p className={`mt-6 max-w-2xl text-lg leading-8 ${light ? "text-institutional-muted" : "text-institutional-white/65"}`}>{description}</p>
        {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
      </div>
      {image && (
        <figure>
          <div className={`${squareImage ? "aspect-square rounded-2xl" : "aspect-[4/3] rounded-sm"} overflow-hidden`}>
            <img src={image} alt={imageAlt ?? ""} className="institutional-photo h-full w-full object-cover" />
          </div>
          {imageCaption && <figcaption className={`mt-2 text-xs ${light ? "text-institutional-muted" : "text-institutional-white/45"}`}>{imageCaption}</figcaption>}
        </figure>
      )}
    </div>
  </section>
);

export default PageHero;
