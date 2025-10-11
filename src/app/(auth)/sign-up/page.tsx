import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="w-full flex flex-col gap-6 px-4 border border-fuchsia-950">
      {/* Título */}
      <h1 className="text-primary text-2xl font-bold text-center mb-6 md:text-3xl">
        Criar Conta
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Primeira Coluna */}
        <div className="flex flex-col gap-4">
          {/* Email de acesso */}
          <div>
            <Input type="email" placeholder="E-mail de acesso" />
          </div>

          {/* Ano de ingresso */}
          <div>
            <Input
              type="number"
              placeholder="Ano de ingresso na universidade"
            />
          </div>

          {/* Criar senha */}
          <div>
            <Input type="password" placeholder="Crie uma senha" />
          </div>
        </div>

        {/* Segunda Coluna */}
        <div className="flex flex-col gap-4">
          {/* Nome completo */}
          <div>
            <Input type="text" placeholder="Nome completo" />
          </div>

          {/* Curso realizado */}
          <div>
            <Select>
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Curso realizado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ads">
                  Análise e Desenvolvimento de Sistemas
                </SelectItem>
                <SelectItem value="gestao-ti">
                  Gestão da Tecnologia da Informação
                </SelectItem>
                <SelectItem value="logistica">Logística</SelectItem>
                <SelectItem value="processos-gerenciais">
                  Processos Gerenciais
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Confirmar senha */}
          <div>
            <Input type="password" placeholder="Confirme a senha" />
          </div>
        </div>
      </div>

      {/* Botões - Um embaixo do outro */}
      <div className="flex flex-col gap-3 mt-4 w-full max-w-sm mx-auto">
        <Button variant="default" size="lg" className="w-full">
          Realizar Cadastro
        </Button>

        <Button variant="secondary" size="lg" className="w-full">
          Cancelar
        </Button>
      </div>

      <div className="flex items-center justify-center gap-4 text-sm">
        <a href="/sign-in" className="text-primary hover:text-primary ">
          Login
        </a>
        <span className="text-muted-foreground">|</span>
        <a href="/forgot-password" className="text-primary hover:text-primary">
          Esqueci a Senha
        </a>
      </div>
    </div>
  );
};

export default SignUpPage;
