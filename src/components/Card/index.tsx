import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ title, children, className = "" }: CardProps) => {
  return (
    <div className={cn(`text-center`, className)}>
      <h3 className="font-bold text-xl mb-4 text-gray-800">{title}</h3>
      <div className="text-gray-600 leading-relaxed">{children}</div>
    </div>
  );
};
