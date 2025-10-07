import React from "react";

const SignUpPage = () => {
  return (
    <div className="w-full flex flex-col gap-6 px-4">
      {/* Título */}
      <h1 className="text-primary text-2xl font-bold text-center mb-6 md:text-3xl">
        Criar Conta
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Primeira Coluna */}
        <div className="flex flex-col gap-4">
          {/* Email de acesso */}
          <div>
            <input
              type="email"
              placeholder="E-mail de acesso"
              className="w-full p-4 bg-primary-foreground sm:bg-muted border-0 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Ano de ingresso */}
          <div>
            <input
              type="number"
              placeholder="Ano de ingresso na universidade"
              min="1970"
              max="2030"
              className="w-full p-4 bg-primary-foreground sm:bg-muted border-0 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Criar senha */}
          <div>
            <input
              type="password"
              placeholder="Crie uma senha"
              className="w-full p-4 bg-primary-foreground sm:bg-muted border-0 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Segunda Coluna */}
        <div className="flex flex-col gap-4">
          {/* Nome completo */}
          <div>
            <input
              type="text"
              placeholder="Nome completo"
              className="w-full p-4 bg-primary-foreground sm:bg-muted border-0 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Curso realizado */}
          <div>
            <select className="w-full p-4 bg-primary-foreground sm:bg-muted border-0 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Curso realizado</option>
              <option value="ads">Análise e Desenvolvimento de Sistemas</option>
              <option value="gestao-ti">
                Gestão da Tecnologia da Informação
              </option>
              <option value="logistica">Logística</option>
              <option value="processos-gerenciais">Processos Gerenciais</option>
            </select>
          </div>

          {/* Confirmar senha */}
          <div>
            <input
              type="password"
              placeholder="Confirme a senha"
              className="w-full p-4 bg-primary-foreground sm:bg-muted border-0 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Botões - Um embaixo do outro */}
      <div className="flex flex-col gap-3 mt-4 w-full max-w-sm mx-auto">
        <button className="w-full bg-primary text-primary-foreground p-2 rounded-lg text-lg transition-colors hover:bg-primary/90">
          Realizar Cadastro
        </button>

        <button className="w-full bg-secondary text-secondary-foreground p-2 rounded-lg text-lg transition-colors hover:bg-secondary/90 text-center">
          Cancelar
        </button>
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
