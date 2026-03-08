export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
}

export const mockEvents: Event[] = [
  {
    id: 1,
    title: "Workshop de Inteligência Artificial",
    description:
      "Aprofunde seus conhecimentos em IA com foco em aplicações práticas para o mercado de trabalho. Aprenda sobre redes neurais, machine learning e ferramentas modernas.",
    date: "15/03/2026",
    time: "14:00",
    location: "FATEC Sorocaba – Lab. 203",
    category: "Workshop",
  },
  {
    id: 2,
    title: "Alumni Talks: Carreira em Tech",
    description:
      "Ex-alunos da FATEC compartilham suas experiências no mercado de tecnologia. Networking, dicas de carreira e cases reais de sucesso.",
    date: "22/03/2026",
    time: "19:00",
    location: "Auditório Principal – FATEC Sorocaba",
    category: "Palestra",
  },
  {
    id: 3,
    title: "Hackathon Alumni 2026",
    description:
      "48 horas de desenvolvimento intensivo para resolver problemas reais da cidade de Sorocaba. Aberto para alunos e egressos. Prêmios em dinheiro para os três primeiros lugares.",
    date: "05/04/2026",
    time: "08:00",
    location: "FATEC Sorocaba – Bloco D",
    category: "Hackathon",
  },
  {
    id: 4,
    title: "Semana de TI – Edição 2026",
    description:
      "A maior semana de tecnologia da FATEC Sorocaba. Palestras, workshops, competições e muito networking. Professores, profissionais e empresas parceiras presentes.",
    date: "20/04/2026",
    time: "08:00",
    location: "FATEC Sorocaba",
    category: "Semana Acadêmica",
  },
];

export const categoryColors: Record<string, string> = {
  Workshop: "bg-blue-100 text-blue-700",
  Palestra: "bg-green-100 text-green-700",
  Hackathon: "bg-purple-100 text-purple-700",
  "Semana Acadêmica": "bg-orange-100 text-orange-700",
};
