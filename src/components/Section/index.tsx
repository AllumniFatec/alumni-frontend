import { cn } from "@/lib/utils";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section = ({ title, children, className = "" }: SectionProps) => {
  return (
    <section className={cn(`mb-10`, className)}>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-info text-left mb-2">{title}</h2>
        <div className="flex items-center">
          <div className="h-1 bg-primary w-8 rounded-full"></div>
          <div className="h-px bg-primary flex-1"></div>
        </div>
      </div>
      <div className="text-gray-600 leading-relaxed">{children}</div>
    </section>
  );
};
