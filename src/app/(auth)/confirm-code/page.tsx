import React from "react";

const ConfirmCodePage = () => {
  return (
    <div className="w-full flex flex-col gap-6  sm:min-w-sm">
      {/* Título */}
      <h1 className="text-primary text-2xl font-bold text-center mb-6 md:text-3xl">
        Insira o código de confirmação
      </h1>

      {/* Campo Email */}
      <div>
        <input
          type="email"
          placeholder="Informe seu email envio do código"
          className="w-full p-4 border-0 rounded-lg bg-primary-foreground sm:bg-muted text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Botão Entrar */}
      <button className="w-full  bg-primary text-primary-foreground p-2 rounded-lg font-medium text-md transition-colors hover:bg-primary/90">
        Confirmar código
      </button>
      <button className="w-full bg-secondary text-secondary-foreground p-2 rounded-lg text-lg transition-colors hover:bg-secondary/90 text-center">
        Reenviar código
      </button>

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
