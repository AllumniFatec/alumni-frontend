import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";

const ForgotPasswordPage = () => {
  return (
    <div className="w-full flex flex-col gap-6 px-4 sm:min-w-lg">
      {/* Título */}
      <h1 className="text-primary text-2xl font-bold text-center mb-6 md:text-3xl">
        Recuperar senha
      </h1>

      {/* Campo Email */}
      <div>
        <Input
          type="email"
          placeholder="Informe seu email para recuperar a senha"
        />
      </div>

      {/* Botões */}
      <div className="flex flex-col gap-3 mt-4">
        <Button variant="default" size="lg" className="w-full">
          Enviar E-mail de Recuperação
        </Button>
        <Button variant="secondary" size="lg" className="w-full">
          Cancelar
        </Button>
      </div>

      {/* Links */}
      <div className="flex items-center justify-center gap-4 text-sm">
        <a
          href="/sign-up"
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Criar Conta
        </a>
        <span className="text-muted-foreground">|</span>
        <a
          href="/forgot-password"
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Esqueci a Senha
        </a>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
