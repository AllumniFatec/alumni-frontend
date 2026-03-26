import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-slate-50 py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8 animate-fade-in-left">
          <div>
            <h1 className="text-4xl lg:text-6xl font-black leading-tight">
              Conecte-se com a história da{" "}
              <span className="text-red-700">FATEC Sorocaba</span>
            </h1>

            <p className="text-gray-600 text-lg mt-6 max-w-xl">
              Uma plataforma institucional exclusiva para ex-alunos fortalecerem
              sua rede, encontrarem oportunidades e compartilharem conquistas.
            </p>
          </div>

          {/* BOTÕES */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/sign-up"
              className="bg-red-700 text-white text-lg font-bold px-8 py-4 rounded-lg text-center hover:bg-red-800 transition-colors"
            >
              Cadastre-se agora
            </Link>

            <a
              href="#about"
              className="border border-gray-300 text-gray-700 text-lg font-bold px-8 py-4 rounded-lg text-center hover:bg-gray-100 transition-colors"
            >
              Saiba mais
            </a>
          </div>

          {/* USUÁRIOS */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {/* Ajustado para os novos nomes dos arquivos */}
              <Image
                src="/avatar-leo.jpg"
                alt="Egresso 1"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-slate-50"
              />
              <Image
                src="/avatar-nicolas.jpg"
                alt="Egresso 2"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-slate-50"
              />
              <Image
                src="/avatar-bellato.jpg"
                alt="Egresso 3"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-slate-50"
              />
            </div>
            <p className="text-sm text-gray-500 font-medium">
              + de 5.000 egressos já conectados
            </p>
          </div>
        </div>

        <div className="relative w-full h-80 lg:h-[450px] bg-slate-100 rounded-[20px] overflow-hidden shadow-md animate-fade-in-right">
          <Image
            src="/fachada-fatec.png"
            alt="Fachada da FATEC Sorocaba"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
