export const SignInPage = () => {
  return (
    <div className="items-center gap-8">
      <div>
        <h1 className="text-primary  text-center text-3xl">
          Alumni Fatec Sorocaba
        </h1>
      </div>

      <div className="">
        {/* Campo Email */}
        <div>
          <input
            type="email"
            placeholder="E-mail"
            className="w-full px-4 py-4 bg-card border-0 rounded-lg text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg
              className="w-5 h-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>

        {/* Campo Senha */}
        <div className="relative">
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-4 bg-card border-0 rounded-lg text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg
              className="w-5 h-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
        </div>

        {/* Botão Entrar */}
        <button className="w-full bg-secondary text-secondary-foreground py-4 rounded-lg font-medium text-lg transition-colors hover:bg-secondary/90">
          Entrar
        </button>

        {/* Links */}
        <div className="flex items-center justify-center gap-4 mt-8 text-sm">
          <a
            href="/signUp"
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
    </div>
  );
};

export default SignInPage;
