import { Section } from "@/components/Section";
import { JobCard } from "@/components/JobCard";
import { Job } from "@/models/job";
import { Status } from "@/models/users";

const mockJobs: Job[] = [
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

export default function JobsPage() {
  return (
    <div>
      <Section title="Vagas">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockJobs.map((job) => (
            <JobCard key={job.job_id} job={job} />
          ))}
        </div>
      </Section>
    </div>
  );
}
