import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";

const ConfirmCodePage = () => {
  return (
    <div className="w-full flex flex-col gap-6 px-4 sm:min-w-lg">
      {/* Título */}
      <h1 className="text-primary text-2xl font-bold text-center mb-6 md:text-3xl">
        Insira o código de confirmação
      </h1>

      {/* Campo Código */}
      <div>
        <Input
          type="text"
          placeholder="Digite o código de confirmação"
          maxLength={6}
        />
      </div>

      {/* Botões */}
      <div className="flex flex-col gap-3 mt-4">
        <Button variant="default" size="lg" className="w-full">
          Confirmar Código
        </Button>
        <Button variant="secondary" size="lg" className="w-full">
          Reenviar Código
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
export default ConfirmCodePage;
