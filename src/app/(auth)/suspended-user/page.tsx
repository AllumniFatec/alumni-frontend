"use client";

import { Button } from "@/components/ui/button";
import { AuthRoutes } from "@/config/routes";
import { useReactivateAccount } from "@/hooks/useUsers";
import { UserRoundX } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const SuspendedUserContent = () => {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") ?? "usuário";
  const deletedAt = searchParams.get("deleted_at");

  const formattedDeletedAt = deletedAt
    ? new Date(deletedAt).toLocaleString("pt-BR")
    : "uma data não informada";

  const reactivateAccountMutation = useReactivateAccount();

  return (
    <div className="w-full flex flex-col gap-6 px-4 sm:min-w-lg items-center">
      {/* Ícone */}
      <div className="flex justify-center mb-4">
        <UserRoundX className="w-20 h-20 text-red-500" />
      </div>

      {/* Título */}
      <h1 className="text-primary text-2xl font-bold text-center mb-2 md:text-3xl">
        Conta Suspensa
      </h1>

      {/* Mensagem */}
      <p className="text-gray-600 text-center leading-relaxed max-w-md">
        Olá, {name}! Identificamos que em {formattedDeletedAt} você suspendeu
        sua conta.
      </p>

      <p className="text-gray-500 text-sm text-center max-w-md">
        Caso queira reutilizar nosso sistema, você poderá reativar sua conta no
        botão abaixo.
      </p>

      {/* Botões */}
      <div className="flex flex-col gap-3 mt-6 w-full">
        <Button
          type="button"
          variant="default"
          size="lg"
          className="w-full"
          disabled={reactivateAccountMutation.isPending}
          onClick={() => reactivateAccountMutation.mutate()}
        >
          {reactivateAccountMutation.isPending
            ? "Reativando conta..."
            : "Reativar Conta"}
        </Button>
      </div>

      {/* Links */}
      <div className="flex items-center justify-center gap-4 text-sm mt-4">
        <Link
          href={AuthRoutes.SignUp}
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Criar outra conta
        </Link>
        <span className="text-muted-foreground">|</span>
        <Link
          href={AuthRoutes.ForgotPassword}
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Esqueci a Senha
        </Link>
      </div>
    </div>
  );
};

const SuspendedUserPage = () => {
  return (
    <Suspense fallback={null}>
      <SuspendedUserContent />
    </Suspense>
  );
};

export default SuspendedUserPage;
