import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  dark?: boolean;
  className?: string;
}

const SectionHeading = ({ eyebrow, title, description, dark = false, className = "" }: SectionHeadingProps) => (
  <div className={`max-w-3xl ${className}`}>
    <p className={`institutional-eyebrow ${dark ? "text-institutional-yellow" : "text-institutional-muted"}`}>
      {eyebrow}
    </p>
    <h2 className={`institutional-title mt-4 text-3xl sm:text-4xl lg:text-5xl ${dark ? "text-institutional-white" : "text-institutional-black"}`}>
      {title}
    </h2>
    {description && (
      <p className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg ${dark ? "text-institutional-white/65" : "text-institutional-muted"}`}>
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
