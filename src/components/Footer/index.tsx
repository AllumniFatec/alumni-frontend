import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Coluna 1: Logo e Redes */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">
                school
              </span>
              <span className="font-display font-bold text-white text-xl uppercase tracking-tighter">
                FATEC Alumni
              </span>
            </div>

            <p className="text-sm leading-relaxed opacity-80">
              A rede oficial de ex-alunos da Faculdade de Tecnologia de Sorocaba
              "José Crespo Gonzales". Desenvolvendo carreiras, conectando
              futuros.
            </p>

            <div className="flex gap-4">
              <Link
                className="w-10 h-10 rounded-[10px] bg-white/5 flex items-center justify-center hover:bg-primary transition-colors"
                href="https://www.instagram.com/fatecsorocaba/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram FATEC Sorocaba"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                className="w-10 h-10 rounded-[10px] bg-white/5 flex items-center justify-center hover:bg-primary transition-colors"
                href="https://www.facebook.com/fatecsorocaba/?locale=pt_BR"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook FATEC Sorocaba"
              >
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Coluna 2: Institucional */}
          <div className="md:justify-self-center">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">
              Institucional
            </h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <Link
                  className="hover:text-white transition-colors"
                  href="https://fatecsorocaba.cps.sp.gov.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FATEC Sorocaba
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-colors"
                  href="https://www.cps.sp.gov.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Centro Paula Souza
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-colors"
                  href="https://fatecsorocaba.cps.sp.gov.br/cursos-fatec/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cursos de Graduação
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-colors"
                  href="https://vestibular.fatec.sp.gov.br/home/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vestibular
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Comunidade */}
          <div className="md:justify-self-center">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">
              Comunidade
            </h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <Link
                  className="hover:text-white transition-colors"
                  href="/members"
                >
                  Membros
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-colors"
                  href="/jobs"
                >
                  Vagas Disponíveis
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition-colors"
                  href="/events"
                >
                  Eventos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* SEÇÃO DE DIREITOS AUTORAIS E CRÉDITOS DA EQUIPE */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 text-xs font-medium">
          <p className="text-slate-400 text-center lg:text-left">
            © 2026 Alumni FATEC Sorocaba - Todos os direitos reservados.
          </p>

          <div className="flex flex-col items-center lg:items-end gap-1.5 text-center lg:text-right">
            <p className="text-slate-400">Feito com orgulho em Sorocaba/SP</p>
            <p className="text-[11px] text-slate-500">
              Desenvolvido por:{" "}
              <Link
                href="https://www.linkedin.com/in/gabriel-silva-bellato/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Gabriel Silva Bellato
              </Link>{" "}
              &bull;{" "}
              <Link
                href="https://www.linkedin.com/in/leonardo-barbosa-da-silva-085858230/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Leonardo Barbosa da Silva
              </Link>{" "}
              &bull;{" "}
              <Link
                href="https://www.linkedin.com/in/nicolas-alexandrino-ferro/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Nicolas Alexandrino Ferro
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
