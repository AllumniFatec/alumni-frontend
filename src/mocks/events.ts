import { Event } from "@/models/event";
import { Status } from "@/models/users";

export const mockEvents: Event[] = [
  {
    event_id: "1",
    title: "Workshop de Inteligência Artificial",
    description:
      "Aprofunde seus conhecimentos em IA com foco em aplicações práticas para o mercado de trabalho. Aprenda sobre redes neurais, machine learning e ferramentas modernas.",
    local: "FATEC Sorocaba – Lab. 203",
    date_start: new Date("2026-03-15T14:00:00"),
    date_end: new Date("2026-03-15T18:00:00"),
    images: [],
    status: Status.ACTIVE,
    author_id: "1",
    create_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    event_id: "2",
    title: "Alumni Talks: Carreira em Tech",
    description:
      "Ex-alunos da FATEC compartilham suas experiências no mercado de tecnologia. Networking, dicas de carreira e cases reais de sucesso.",
    local: "Auditório Principal – FATEC Sorocaba",
    date_start: new Date("2026-03-22T19:00:00"),
    date_end: new Date("2026-03-22T22:00:00"),
    images: [],
    status: Status.ACTIVE,
    author_id: "2",
    create_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    event_id: "3",
    title: "Hackathon Alumni 2026",
    description:
      "48 horas de desenvolvimento intensivo para resolver problemas reais da cidade de Sorocaba. Aberto para alunos e egressos. Prêmios em dinheiro para os três primeiros lugares.",
    local: "FATEC Sorocaba – Bloco D",
    date_start: new Date("2026-04-05T08:00:00"),
    date_end: new Date("2026-04-07T18:00:00"),
    images: [],
    status: Status.ACTIVE,
    author_id: "3",
    create_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    event_id: "4",
    title: "Semana de TI – Edição 2026",
    description:
      "A maior semana de tecnologia da FATEC Sorocaba. Palestras, workshops, competições e muito networking. Professores, profissionais e empresas parceiras presentes.",
    local: "FATEC Sorocaba",
    date_start: new Date("2026-04-20T08:00:00"),
    date_end: new Date("2026-04-24T22:00:00"),
    images: [],
    status: Status.ACTIVE,
    author_id: "4",
    create_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];

export const categoryColors: Record<string, string> = {
  Workshop: "bg-blue-100 text-blue-700",
  Palestra: "bg-green-100 text-green-700",
  Hackathon: "bg-purple-100 text-purple-700",
  "Semana Acadêmica": "bg-orange-100 text-orange-700",
};
