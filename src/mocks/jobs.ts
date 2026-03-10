import { Job } from "@/models/job";
import { Status } from "@/models/users";

export const mockJobs: Job[] = [
  {
    job_id: "1",
    title: "Desenvolvedor Full Stack",
    company: "TechSorocaba",
    description:
      "Buscamos desenvolvedor full stack com experiência em React e Node.js. Trabalho híbrido, benefícios competitivos e ambiente de crescimento.",
    images: [],
    status: Status.ACTIVE,
    author_id: "1",
    create_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
  },
  {
    job_id: "2",
    title: "Analista de Dados Jr.",
    company: "DataBR",
    description:
      "Vaga para analista de dados com conhecimento em Python, SQL e Power BI. Projeto de longa duração em empresa de tecnologia educacional.",
    images: [],
    status: Status.ACTIVE,
    author_id: "2",
    create_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 dia atrás
  },
  {
    job_id: "3",
    title: "Engenheiro de Software Sênior",
    company: "FinanceTech",
    description:
      "Empresa fintech busca engenheiro sênior para liderar squad de pagamentos. Experiência com microserviços, Java e arquitetura de sistemas distribuídos.",
    images: [],
    status: Status.ACTIVE,
    author_id: "3",
    create_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
  },
  {
    job_id: "4",
    title: "UX/UI Designer",
    company: "Creative Studio",
    description:
      "Procuramos designer criativo com domínio de Figma e experiência em design systems. Foco em produtos SaaS para PMEs.",
    images: [],
    status: Status.ACTIVE,
    author_id: "4",
    create_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 dias atrás
  },
  {
    job_id: "5",
    title: "DevOps / Cloud Engineer",
    company: "CloudBrasil",
    description:
      "Oportunidade para engenheiro de infraestrutura com AWS, Terraform e Kubernetes. Equipe internacional, cultura ágil.",
    images: [],
    status: Status.ACTIVE,
    author_id: "5",
    create_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 semana atrás
  },
  {
    job_id: "6",
    title: "Estágio em Desenvolvimento Web",
    company: "StartupVerde",
    description:
      "Estágio para alunos dos últimos anos de ADS ou SI. Tecnologias: React, TypeScript e Node.js. Ótima oportunidade de crescimento.",
    images: [],
    status: Status.ACTIVE,
    author_id: "6",
    create_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
  },
];

export const mockJobDetail: Job = {
  job_id: "1",
  title: "Desenvolvedor Full Stack Sênior",
  description:
    "Estamos em busca de um Desenvolvedor Full Stack Sênior apaixonado por inovação e excelência técnica para integrar o time de engenharia da TechVanguard.\n\nVocê será responsável por liderar o desenvolvimento de novas funcionalidades, arquitetar soluções escaláveis e mentorar membros juniores da equipe, garantindo a entrega de software de alta qualidade para nossos clientes globais.\n\nResponsabilidades:\n• Projetar e implementar APIs robustas e escaláveis utilizando Node.js e TypeScript\n• Desenvolver interfaces ricas e responsivas com React.js e Next.js\n• Colaborar com designers e product owners para definir requisitos técnicos\n• Implementar testes unitários, de integração e end-to-end\n• Otimizar o desempenho das aplicações e infraestrutura cloud (AWS/GCP)\n\nRequisitos:\n• +5 anos de experiência comprovada\n• Domínio de React, Node.js e Bancos de Dados Relacionais\n• Experiência com TypeScript\n• Conhecimento em Git e metodologias ágeis\n\nDiferenciais:\n• Experiência com GraphQL, Docker e Kubernetes\n• Conhecimento em AWS/GCP\n• Experiência com testes automatizados",
  company: "TechVanguard Solutions",
  images: [
    {
      url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop",
    },
  ],
  status: Status.ACTIVE,
  author_id: "1",
  author: {
    user_id: "1",
    name: "João Silva",
    email: "joao@techvanguard.com",
    password: "",
    gender: undefined as any,
    biography: undefined,
    perfil_photo: undefined,
    receive_notifications: false,
    user_status: Status.ACTIVE,
    user_type: undefined as any,
    social_media: [],
    courses: [],
    workplace_id: undefined,
    create_date: new Date(),
    updated_at: undefined,
    deleted_at: undefined,
    token_password_reset: undefined,
    updated_password: undefined,
  },
  create_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
};
