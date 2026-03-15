"use client";
import { Section } from "@/components/Section";
import { PostCard } from "@/components/Posts";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useMembersController } from "./membersController";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { PostStatus } from "@/models";

export default function Members() {
  const {
    posts,
    latestEvents,
    latestJobs,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useMembersController();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
      {/* ── Coluna esquerda */}
      <div className="space-y-4">
        <Section title="Últimos Posts">
          <div className="bg-white rounded-xl border shadow-sm flex flex-col gap-4 p-4">
            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <PostCard key={i} isLoading />
              ))}

            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={{
                  post_id: post.id,
                  content: post.content,
                  likes_count: post.likes_count,
                  comments_count: post.comments_count,
                  author_id: post.user_id,
                  author: {
                    name: post.user_name,
                    perfil_photo: post.user_perfil_photo,
                  },
                  images: [],
                  status: PostStatus.ACTIVE,
                  likes: [],
                  comments: [],
                  create_date: new Date(post.create_date),
                }}
              />
            ))}

            {!isLoading && posts.length === 0 && (
              <EmptyState
                title="Nenhum post ainda"
                description="Seja o primeiro a compartilhar algo com a rede Alumni."
              />
            )}

            {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="w-full py-3 text-sm text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-2"
              >
                {isFetchingNextPage ? (
                  <Spinner className="size-4" />
                ) : (
                  "Carregar mais"
                )}
              </button>
            )}
          </div>
        </Section>
      </div>

      {/* ── Coluna direita*/}
      <aside className="space-y-6">
        {/* Próximos Eventos */}
        <Section title="Próximos Eventos">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-3 flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}

            {latestEvents.map((event) => (
              <div
                key={event.id}
                className="p-3 flex items-center gap-3 hover:bg-slate-50 transition-colors"
              >
                <div className="bg-slate-100 text-center py-1 px-2 rounded-lg min-w-[40px] shrink-0">
                  <p className="text-[9px] font-bold text-primary uppercase leading-tight">
                    {format(new Date(event.date_start), "MMM", {
                      locale: ptBR,
                    })}
                  </p>
                  <p className="text-base font-black leading-tight">
                    {format(new Date(event.date_start), "dd")}
                  </p>
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    {event.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    {event.local}
                  </p>
                </div>
              </div>
            ))}

            {!isLoading && latestEvents.length === 0 && (
              <EmptyState
                title="Nenhum evento próximo"
                description="Novos eventos serão publicados em breve."
                className="py-8"
              />
            )}

            <Link
              href="/events"
              className="w-full py-2 block text-center text-[10px] font-bold text-slate-500 hover:text-primary uppercase tracking-wider transition-colors bg-slate-50"
            >
              Ver todos
            </Link>
          </div>
        </Section>

        {/* Últimas Vagas */}
        <Section title="Últimas Vagas">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-3 space-y-1">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}

            {latestJobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="block p-3 hover:bg-slate-50 transition-colors"
              >
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {job.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {job.company}
                  {job.city ? ` · ${job.city}` : ""}
                  {job.work_model ? ` · ${job.work_model}` : ""}
                </p>
              </Link>
            ))}

            {!isLoading && latestJobs.length === 0 && (
              <EmptyState
                title="Nenhuma vaga no momento"
                description="Fique de olho — novas oportunidades surgem sempre."
                className="py-8"
              />
            )}

            <Link
              href="/jobs"
              className="w-full py-2 block text-center text-[10px] font-bold text-slate-500 hover:text-primary uppercase tracking-wider transition-colors bg-slate-50"
            >
              Ver todas as vagas
            </Link>
          </div>
        </Section>
      </aside>
    </div>
  );
}
