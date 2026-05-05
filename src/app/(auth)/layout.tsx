import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    // O segredo: min-h-screen no flex-col para o Footer sempre ficar no fim
    <div className="relative flex min-h-screen w-full flex-col bg-slate-900">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/fachada-fatec.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-900/80" />
      </div>
      {/* A div principal agora é um container flex normal. 
          Ela vai crescer o quanto o formulário pedir.
      */}
      <main className="relative z-10 flex flex-1 items-center justify-center p-6 py-16 md:py-12">
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
