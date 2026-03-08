import React from "react";
import { SignInForm } from "./SignInForm";

const SignInPage = () => {
  return (
    <div className="w-full flex flex-col gap-6 px-4 sm:min-w-lg">
      <h1 className="text-primary text-2xl font-bold text-center mb-6 md:text-3xl">
        Alumni Fatec Sorocaba
      </h1>

      <SignInForm />

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

export default SignInPage;
