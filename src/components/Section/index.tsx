import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Section = ({ title, children, className = "" }: SectionProps) => {
  return (
    <section className={cn(`mb-12`, className)}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-info text-left mb-4">{title}</h2>
        <div className="flex items-center">
          <div className="h-4 bg-red-600 w-40 rounded-full"></div>
          <div className="h-1 bg-red-600 flex-1"></div>
        </div>
      </div>
      <div className="text-center text-gray-600 leading-relaxed">
        {children}
      </div>
    </section>
  );
};
