import { Section } from "@/components/Section";
import { Building2, Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
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

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <div>
      <Section title="Detalhes da Vaga">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para vagas
          </Link>

          {/* Job Header */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-lg bg-primary/5 flex items-center justify-center p-3">
                {mockJob.images && mockJob.images.length > 0 ? (
                  <img
                    className="w-full h-full object-contain"
                    src={mockJob.images[0] as string}
                    alt={mockJob.company}
                  />
                ) : (
                  <span className="text-2xl font-bold text-primary/40">
                    {mockJob.company.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {mockJob.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {mockJob.company}
                  </span>
                  {mockJob.author && (
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {mockJob.author.name}
                    </span>
                  )}
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Publicado em {formatDate(mockJob.create_date)}
                  </span>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-6 mt-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                Descrição da Vaga
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {mockJob.description}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-6 mt-6">
              <button className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                Candidatar-se
              </button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
