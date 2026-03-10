"use client";

import { Section } from "@/components/Section";
import { InfoCard } from "@/components/InfoCard";
import { Building2, Clock, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { mockJobDetail } from "@/mocks";

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = params;

  // TODO: Buscar job da API usando o ID
  // import { getJobById } from "@/apis/jobs";
  // const job = await getJobById(id);

  // Mock data para demonstração
  const mockJob = { ...mockJobDetail, job_id: id };

  return (
    <div>
      <Section title="Detalhes da Vaga">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para vagas
          </Link>

          {/* Job Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Vaga de Emprego
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
              {mockJob.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5 font-semibold text-primary">
                <Building2 className="w-5 h-5" />
                {mockJob.company}
              </div>
              {mockJob.author && (
                <div className="flex items-center gap-1.5">
                  <User className="w-5 h-5" />
                  {mockJob.author.name}
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Clock className="w-5 h-5" />
                Postado{" "}
                {formatDistanceToNow(new Date(mockJob.create_date), {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </div>
            </div>
          </div>

          {/* Hero Banner */}
          {mockJob.images && mockJob.images.length > 0 && (
            <div className="w-full h-[400px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl shadow-lg mb-8 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={(mockJob.images[0] as any)?.url || ""}
                alt={mockJob.title}
              />
            </div>
          )}

          {/* Content */}
          <div className="space-y-8">
            {/* Company Info Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard
                icon={<Building2 className="w-5 h-5" />}
                label="Empresa"
                title={mockJob.company}
                subtitle="Confira o perfil da empresa"
              />
              {mockJob.author && (
                <InfoCard
                  icon={<User className="w-5 h-5" />}
                  label="Publicado por"
                  title={mockJob.author.name}
                  subtitle={mockJob.author.email}
                />
              )}
            </div>

            {/* Description Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold border-b border-slate-200 dark:border-slate-800 pb-2">
                Sobre a Vaga
              </h3>
              <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {mockJob.description}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
