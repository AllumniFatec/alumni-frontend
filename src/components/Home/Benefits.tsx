export default function Benefits() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Benefícios Exclusivos
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Vantagens desenhadas para apoiar sua jornada profissional após a
          graduação.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white p-8 rounded-lg shadow hover:-translate-y-2 transition">
          <div className="size-16 bg-red-50 rounded-lg flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-4xl text-red-700">
              hub
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2">Networking Ativo</h3>
          <p className="text-gray-600">
            Acesse o diretório completo e conecte-se com profissionais de
            diversas áreas e anos de formação para novas parcerias.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-8 rounded-lg shadow hover:-translate-y-2 transition">
          <div className="size-16 bg-red-50 rounded-lg flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-4xl text-red-700">
              work
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2">Vagas e Carreira</h3>
          <p className="text-gray-600">
            Painel de empregos exclusivo com oportunidades em empresas que
            valorizam o perfil técnico e analítico dos egressos FATEC.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-8 rounded-lg shadow hover:-translate-y-2 transition">
          <div className="size-16 bg-red-50 rounded-lg flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-4xl text-red-700">
              event
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2">Eventos e Palestras</h3>
          <p className="text-gray-600">
            Convites VIP para workshops, palestras de atualização tecnológica e
            os tradicionais reencontros anuais no campus.
          </p>
        </div>
      </div>
    </section>
  );
}
