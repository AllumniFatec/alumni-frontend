"use client";

import { useRouter } from "next/navigation";
import { Section } from "@/components/Section";
import { JobForm, JobFormValues } from "@/components/JobForm";
import { useCreateJob } from "@/hooks/useJobs";
import { toast } from "sonner";

export default function JobNewPage() {
  const router = useRouter();
  const { mutateAsync: createJob, isPending: isCreatingJob } = useCreateJob();

  async function handleSubmit(data: JobFormValues) {
    try {
      await createJob(data);
      toast.success("Vaga publicada com sucesso!");
      router.push("/jobs");
    } catch {
      toast.error("Erro ao publicar a vaga", {
        description: "Verifique os dados e tente novamente.",
      });
    }
  }

  return (
    <div>
      <Section title="Publicar Vaga">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <JobForm
            onSubmit={handleSubmit}
            isLoading={isCreatingJob}
            submitLabel="Publicar Vaga"
          />
        </div>
      </Section>
    </div>
  );
}
