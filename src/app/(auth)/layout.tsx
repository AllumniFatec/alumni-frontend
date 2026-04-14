import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    // O segredo: min-h-screen no flex-col para o Footer sempre ficar no fim
    <div
      className="min-h-screen w-full flex flex-col bg-slate-900 bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('/fachada-fatec.png')",
      }}
    >
      {/* A div principal agora é um container flex normal. 
          Ela vai crescer o quanto o formulário pedir.
      */}
      <main className="flex-1 flex items-center justify-center p-6 py-16 md:py-12">
        <div className="w-full max-w-3xl bg-white rounded-[40px] shadow-2xl p-8 md:p-16 border border-white/10">
          {children}
        </div>
      </main>

      {/* O Footer será renderizado aqui pelo RootLayout, 
          logo abaixo desse main que cresce conforme o conteúdo.
      */}
    </div>
  );
}
