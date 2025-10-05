export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header com as cores da FATEC */}
      <header
        className="p-6"
        style={{ backgroundColor: "#AE0C0D", color: "#FFFFFF" }}
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Alumni FATEC Sorocaba</h1>
          <p className="opacity-80 mt-2">
            Sistema de gerenciamento de ex-alunos
          </p>
        </div>
      </header>

      {/* Seção principal */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Cards demonstrando as cores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Card Primário - Vermelho FATEC */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div
              className="w-full h-4 rounded mb-4"
              style={{ backgroundColor: "#AE0C0D" }}
            ></div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#44555D" }}
            >
              Cor Primária
            </h3>
            <p className="text-sm" style={{ color: "#44555D" }}>
              #AE0C0D - Vermelho FATEC
            </p>
            <button
              className="mt-4 px-4 py-2 rounded transition-colors"
              style={{ backgroundColor: "#AE0C0D", color: "#FFFFFF" }}
            >
              Botão Primário
            </button>
          </div>

          {/* Card Secundário - Cinza escuro */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div
              className="w-full h-4 rounded mb-4"
              style={{ backgroundColor: "#44555D" }}
            ></div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#44555D" }}
            >
              Cor Secundária
            </h3>
            <p className="text-sm" style={{ color: "#44555D" }}>
              #44555D - Cinza escuro
            </p>
            <button
              className="mt-4 px-4 py-2 rounded transition-colors"
              style={{ backgroundColor: "#44555D", color: "#F2F2F2" }}
            >
              Botão Secundário
            </button>
          </div>

          {/* Card Terciário - Azul escuro */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div
              className="w-full h-4 rounded mb-4"
              style={{ backgroundColor: "#243E63" }}
            ></div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#44555D" }}
            >
              Cor Terciária
            </h3>
            <p className="text-sm" style={{ color: "#44555D" }}>
              #243E63 - Azul escuro
            </p>
            <button
              className="mt-4 px-4 py-2 rounded transition-colors"
              style={{ backgroundColor: "#243E63", color: "#FFFFFF" }}
            >
              Botão Terciário
            </button>
          </div>

          {/* Card Accent - Ciano */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div
              className="w-full h-4 rounded mb-4"
              style={{ backgroundColor: "#00C1CF" }}
            ></div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#44555D" }}
            >
              Cor Accent
            </h3>
            <p className="text-sm" style={{ color: "#44555D" }}>
              #00C1CF - Ciano
            </p>
            <button
              className="mt-4 px-4 py-2 rounded transition-colors"
              style={{ backgroundColor: "#00C1CF", color: "#FFFFFF" }}
            >
              Botão Accent
            </button>
          </div>

          {/* Card Info - Azul petróleo */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div
              className="w-full h-4 rounded mb-4"
              style={{ backgroundColor: "#005C6D" }}
            ></div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#44555D" }}
            >
              Cor Info
            </h3>
            <p className="text-sm" style={{ color: "#44555D" }}>
              #005C6D - Azul petróleo
            </p>
            <button
              className="mt-4 px-4 py-2 rounded transition-colors"
              style={{ backgroundColor: "#005C6D", color: "#FFFFFF" }}
            >
              Botão Info
            </button>
          </div>

          {/* Card Muted - Cinza claro */}
          <div
            className="border border-gray-200 rounded-lg p-6 shadow-sm"
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <div
              className="w-full h-4 rounded mb-4"
              style={{ backgroundColor: "#44555D" }}
            ></div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#44555D" }}
            >
              Cor Muted
            </h3>
            <p className="text-sm" style={{ color: "#44555D" }}>
              #F2F2F2 - Cinza claro
            </p>
            <button
              className="mt-4 px-4 py-2 rounded transition-colors"
              style={{ backgroundColor: "#44555D", color: "#F2F2F2" }}
            >
              Botão Muted
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
