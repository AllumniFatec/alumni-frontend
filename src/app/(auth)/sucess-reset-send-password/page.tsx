"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

const SuccessResetSendPasswordPage = () => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-6 px-4 sm:min-w-lg items-center">
      {/* Ícone de Sucesso */}
      <div className="flex justify-center mb-4">
        <CheckCircle2 className="w-20 h-20 text-green-500" />
      </div>

      {/* Título */}
      <h1 className="text-primary text-2xl font-bold text-center mb-2 md:text-3xl">
        E-mail Enviado com Sucesso!
      </h1>

      {/* Mensagem */}
      <p className="text-gray-600 text-center leading-relaxed max-w-md">
        Você receberá em seu e-mail um link para redefinir sua senha.
      </p>

      <p className="text-gray-500 text-sm text-center max-w-md">
        Verifique sua caixa de entrada e também a pasta de spam. O link expira
        em 10 minutos.
      </p>

      {/* Botão Voltar ao Login */}
      <div className="flex flex-col gap-3 mt-6 w-full">
        <Button
          type="button"
          variant="default"
          size="lg"
          className="w-full"
          onClick={() => router.push("/sign-in")}
        >
          Voltar ao Login
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={() => router.push("/forgot-password")}
        >
          Reenviar E-mail
        </Button>
      </div>

      {/* Links */}
      <div className="flex items-center justify-center gap-4 text-sm mt-4">
        <a
          href="/sign-up"
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Criar Conta
        </a>
        <span className="text-muted-foreground">|</span>
        <a
          href="/sign-in"
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default SuccessResetSendPasswordPage;
