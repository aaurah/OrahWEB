import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 px-4 sm:px-6 lg:px-8", className)}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  center = false,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-14", center && "text-center max-w-2xl mx-auto")}>
      {eyebrow && (
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-gray-500 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

interface PageHeroProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({ title, description, children, className }: PageHeroProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-violet-900 text-white",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(124,58,237,0.3),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(37,99,235,0.3),_transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">{title}</h1>
        {description && (
          <p className="mt-6 text-lg sm:text-xl text-blue-100 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
