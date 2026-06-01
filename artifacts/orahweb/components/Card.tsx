import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

export function Card({ className, children, hover = false, padding = "md" }: CardProps) {
  const paddingStyles = { sm: "p-4", md: "p-6", lg: "p-8" };

  return (
    <div
      className={cn(
        "glass-card rounded-2xl relative overflow-hidden",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function CardHeader({ title, description, icon, className }: CardHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-white/60 backdrop-blur border border-white/70 flex items-center justify-center text-green-600 shadow-sm">
          {icon}
        </div>
      )}
      <div>
        <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
