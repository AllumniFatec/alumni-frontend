"use client";

import { useEffect } from "react";
import { Section } from "@/components/Section";
import { ErrorState } from "@/components/ErrorState";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/AuthContext";
import { useMyProfile } from "@/hooks/useProfile";
import { ProfileSummarySection } from "@/components/profile/ProfileSummarySection";
import { ProfileInformationSection } from "@/components/profile/ProfileInformationSection";
import { ProfileCoursesSection } from "@/components/profile/ProfileCoursesSection";
import { ProfileWorkplaceHistorySection } from "@/components/profile/ProfileWorkplaceHistorySection";
import { ProfileSocialSection } from "@/components/profile/ProfileSocialSection";
import { ProfileSkillsSection } from "@/components/profile/ProfileSkillsSection";
import { ProfileJobsSection } from "@/components/profile/ProfileJobsSection";
import { ProfileEventsSection } from "@/components/profile/ProfileEventsSection";
import { ProfilePostsSection } from "@/components/profile/ProfilePostsSection";

export default function ProfilePage() {
  const { user } = useAuth();
  const { data, isLoading, isError, refetch, isFetching } = useMyProfile({
    enabled: !!user,
  });
  console.log(data);

  if (!user) {
    return (
      <Section title="Meu Perfil">
        <p className="text-sm text-slate-500">
          Faça login para ver seu perfil.
        </p>
      </Section>
    );
  }

  if (isLoading) {
    return (
      <Section title="Meu Perfil">
        <div className="flex justify-center py-16">
          <Spinner className="size-8 text-primary" />
        </div>
      </Section>
    );
  }

  if (isError || !data) {
    return (
      <Section title="Meu Perfil">
        <ErrorState
          title="Não foi possível carregar o perfil"
          description="Verifique sua conexão ou tente novamente."
          onRetry={() => refetch()}
        />
      </Section>
    );
  }

  const profile = data;
  const photoUrl = profile.perfil_photo?.url;

  return (
    <div>
      <Section title="Meu Perfil">
        {isFetching && !isLoading && (
          <p className="text-xs text-slate-400 mb-2">Atualizando…</p>
        )}

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm text-left">
          <div className="h-32 bg-gradient-to-r from-primary/80 to-primary" />

          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-10 mb-4">
              {photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoUrl}
                  alt=""
                  className="size-20 rounded-full border-4 border-white object-cover shadow"
                />
              ) : (
                <div className="size-20 rounded-full border-4 border-white bg-primary/10 flex items-center justify-center text-primary text-3xl font-black shadow">
                  {profile.name.charAt(0)}
                </div>
              )}
            </div>

            <h2 className="text-xl font-bold text-slate-800">{profile.name}</h2>
            <p className="text-sm text-slate-500 mb-1">{profile.user_type}</p>

            {profile.biography && (
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                {profile.biography}
              </p>
            )}

            <ProfileSummarySection profile={profile} />
            <ProfileInformationSection profile={profile} />
            <ProfileCoursesSection courses={profile.courses} />
            <ProfileWorkplaceHistorySection entries={profile.workplace_history} />
            <ProfileSocialSection socialMedia={profile.social_media} />
            <ProfileSkillsSection skills={profile.skills} />
            <ProfileJobsSection jobs={profile.jobs} />
            <ProfileEventsSection events={profile.events} />
            <ProfilePostsSection posts={profile.posts} />
          </div>
        </div>
      </Section>
    </div>
  );
}
