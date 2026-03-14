"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import { AuthRoutes } from "@/config/routes";
import Link from "next/link";

const PendingApprovalPage = () => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-6 px-4 sm:min-w-lg items-center">
      {/* Ícone */}
      <div className="flex justify-center mb-4">
        <Clock className="w-20 h-20 text-yellow-500" />
      </div>

      {/* Título */}
      <h1 className="text-primary text-2xl font-bold text-center mb-2 md:text-3xl">
        Cadastro em Análise
      </h1>

      {/* Mensagem */}
      <p className="text-gray-600 text-center leading-relaxed max-w-md">
        Seu cadastro está sendo analisado pela equipe da FATEC Sorocaba.
      </p>

      <p className="text-gray-500 text-sm text-center max-w-md">
        Assim que aprovado, você receberá acesso ao sistema. Caso tenha dúvidas,
        entre em contato com a administração.
      </p>

      {/* Botões */}
      <div className="flex flex-col gap-3 mt-6 w-full">
        <Button
          type="button"
          variant="default"
          size="lg"
          className="w-full"
          onClick={() => router.push(AuthRoutes.SignIn)}
        >
          Voltar ao Login
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

export default PendingApprovalPage;
