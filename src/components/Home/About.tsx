export default function About() {
  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-6 py-20 overflow-hidden"
    >
      <div className="bg-white p-10 lg:p-16 rounded-lg border border-gray-100 shadow-sm flex flex-col lg:flex-row items-center gap-12 animate-fade-in-up">
        {/* TEXTO */}
        <div className="lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="material-symbols-outlined text-sm">groups</span>
            Nossa Comunidade
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            O que é o Alumni FATEC?
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            O Alumni FATEC Sorocaba é o ponto de encontro oficial de gerações de
            profissionais formados em nossa instituição. Nosso objetivo é manter
            viva a conexão entre a faculdade e seus egressos.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            Promovemos a troca de experiências, mentorias de carreira e o
            crescimento mútuo em um ambiente profissional seguro e engajado,
            valorizando o diploma e a história de cada aluno.
          </p>
        </div>

        {/* CARDS */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors cursor-default">
            <div className="text-3xl font-black text-red-700 mb-1">20+</div>
            <div className="text-xs text-gray-500 font-bold uppercase">
              Anos de História
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors cursor-default">
            <div className="text-3xl font-black text-red-700 mb-1">15k</div>
            <div className="text-xs text-gray-500 font-bold uppercase">
              Formados
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors cursor-default">
            <div className="text-3xl font-black text-red-700 mb-1">50+</div>
            <div className="text-xs text-gray-500 font-bold uppercase">
              Empresas Parceiras
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors cursor-default">
            <div className="text-3xl font-black text-red-700 mb-1">10</div>
            <div className="text-xs text-gray-500 font-bold uppercase">
              Cursos Superiores
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
