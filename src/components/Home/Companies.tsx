export default function Companies() {
  const partners = [
    {
      name: "Huawei",
      url: "https://www.huawei.com/br/",
      logo: "https://cdn.worldvectorlogo.com/logos/huawei.svg",
    },
    {
      name: "TOTVS",
      url: "https://www.totvs.com/",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='48' font-weight='900' fill='%23111'%3ETOTVS%3C/text%3E%3C/svg%3E",
    },
    {
      name: "Microsoft",
      url: "https://www.microsoft.com/pt-br",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    },
    {
      name: "Sebrae",
      url: "https://sebrae.com.br/",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='48' font-weight='900' fill='%23005A9C'%3ESebrae%3C/text%3E%3C/svg%3E",
    },
    {
      name: "Fundação Iochpe",
      url: "https://fiochpe.org.br/",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 350 60'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='36' font-weight='800' fill='%231B365D'%3EFundação Iochpe%3C/text%3E%3C/svg%3E",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-3xl font-bold mb-2">Empresas Parceiras</h2>
          <p className="text-gray-500">
            Organizações que apoiam nossos talentos.
          </p>
        </div>
      </div>

      {/* Container das logos */}
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {/* Alterado para não receber o index, pois não será mais usado */}
        {partners.map((partner) => (
          <a
            /* A key passa a ser o partner.name em vez do index */
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[180px] h-24 bg-white border border-gray-100 shadow-sm rounded-lg flex items-center justify-center p-6 group cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            title={`Visitar site da ${partner.name}`}
          >
            <img
              src={partner.logo}
              alt={`Logo da ${partner.name}`}
              className="max-h-full max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
