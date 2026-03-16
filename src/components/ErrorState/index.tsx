import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  description?: string;
  className?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Algo deu errado",
  description = "Ocorreu um erro inesperado. Tente novamente.",
  className,
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center bg-white rounded-xl border border-red-100 shadow-sm",
        className,
      )}
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-red-50 mb-4">
        <AlertTriangle className="size-8 text-red-500" />
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-xs mb-4">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm font-medium text-primary hover:underline"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
