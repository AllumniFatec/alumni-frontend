export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header com as cores da FATEC */}
      <header className="bg-primary text-primary-foreground p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Alumni FATEC Sorocaba</h1>
          <p className="opacity-80 mt-2">
            Sistema de big monsters bodybuilders da turma 2313 e ex-alunos da
            FATEC Sorocaba
          </p>
        </div>
      </header>

      {/* Seção principal */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Cards demonstrando as cores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Card Primário - Vermelho FATEC */}
          <div className="bg-card border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="w-full h-4 bg-primary rounded mb-4"></div>
            <h3 className="text-lg font-semibold mb-2 text-card-foreground">
              Cor Primária
            </h3>
            <p className="text-sm bg-primary">#AE0C0D - Vermelho FATEC</p>
            <button className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded transition-colors hover:bg-primary/90">
              Botão Primário
            </button>
          </div>

          {/* Card Secundário - Cinza escuro */}
          <div className="bg-card border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="w-full h-4 bg-secondary rounded mb-4"></div>
            <h3 className="text-lg font-semibold mb-2 text-card-foreground">
              Cor Secundária
            </h3>
            <p className="text-sm text-card-foreground">
              #44555D - Cinza escuro
            </p>
            <button className="mt-4 bg-secondary text-secondary-foreground px-4 py-2 rounded transition-colors hover:bg-secondary/90">
              Botão Secundário
            </button>
          </div>

          {/* Card Terciário - Azul escuro */}
          <div className="bg-card border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="w-full h-4 bg-tertiary rounded mb-4"></div>
            <h3 className="text-lg font-semibold mb-2 text-card-foreground">
              Cor Terciária
            </h3>
            <p className="text-sm text-card-foreground">
              #243E63 - Azul escuro
            </p>
            <button className="mt-4 bg-tertiary text-tertiary-foreground px-4 py-2 rounded transition-colors hover:bg-tertiary/90">
              Botão Terciário
            </button>
          </div>

          {/* Card Accent - Ciano */}
          <div className="bg-card border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="w-full h-4 bg-accent rounded mb-4"></div>
            <h3 className="text-lg font-semibold mb-2 text-card-foreground">
              Cor Accent
            </h3>
            <p className="text-sm text-card-foreground">#00C1CF - Ciano</p>
            <button className="mt-4 bg-accent text-accent-foreground px-4 py-2 rounded transition-colors hover:bg-accent/90">
              Botão Accent
            </button>
          </div>

          {/* Card Info - Azul petróleo */}
          <div className="bg-card border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="w-full h-4 bg-info rounded mb-4"></div>
            <h3 className="text-lg font-semibold mb-2 text-card-foreground">
              Cor Info
            </h3>
            <p className="text-sm text-card-foreground">
              #005C6D - Azul petróleo
            </p>
            <button className="mt-4 bg-info text-info-foreground px-4 py-2 rounded transition-colors hover:bg-info/90">
              Botão Info
            </button>
          </div>

          {/* Card Muted - Cinza claro */}
          <div className="bg-muted border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="w-full h-4 bg-muted-foreground rounded mb-4"></div>
            <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
              Cor Muted
            </h3>
            <p className="text-sm text-muted-foreground">
              #F2F2F2 - Cinza claro
            </p>
            <button className="mt-4 bg-muted-foreground text-muted px-4 py-2 rounded transition-colors hover:bg-muted-foreground/90">
              Botão Muted
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
