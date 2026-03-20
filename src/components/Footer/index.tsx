export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
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
              <a
                className="w-10 h-10 rounded-[10px] bg-white/5 flex items-center justify-center hover:bg-primary transition-colors"
                href="https://fatecsorocaba.cps.sp.gov.br/"
                target="_blank"
                rel="noopener noreferrer"
                title="Site Institucional"
              >
                <span className="material-symbols-outlined text-xl">
                  language
                </span>
              </a>
              <a
                className="w-10 h-10 rounded-[10px] bg-white/5 flex items-center justify-center hover:bg-primary transition-colors"
                href="https://fatecsorocaba.cps.sp.gov.br/fale-conosco/"
                target="_blank"
                rel="noopener noreferrer"
                title="Fale Conosco"
              >
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">
              Institucional
            </h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a
                  className="hover:text-white transition-colors"
                  href="https://fatecsorocaba.cps.sp.gov.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FATEC Sorocaba
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors"
                  href="https://www.cps.sp.gov.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Centro Paula Souza
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors"
                  href="https://fatecsorocaba.cps.sp.gov.br/cursos-fatec/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cursos de Graduação
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors"
                  href="https://vestibular.fatec.sp.gov.br/home/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vestibular
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">
              Comunidade
            </h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Membros
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Vagas Disponíveis
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Eventos
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Mentoria
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">
              Suporte
            </h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Privacidade
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Contato
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <p>© 2026 Alumni FATEC Sorocaba - Todos os direitos reservados.</p>
          <p>Feito com orgulho em Sorocaba/SP</p>
        </div>
      </div>
    </footer>
  );
}
