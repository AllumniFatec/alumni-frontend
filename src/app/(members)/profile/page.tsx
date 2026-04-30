"use client";

import { Section } from "@/components/Section";
import { ErrorState } from "@/components/ErrorState";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/AuthContext";
import { useMyProfile } from "@/hooks/useProfile";
import { ProfilePageContent } from "@/components/profile/ProfilePageContent";

export default function ProfilePage() {
  const { user } = useAuth();
  const { data, isLoading, isError, refetch, isFetching } = useMyProfile({
    enabled: !!user,
  });

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

  return (
    <div>
      <ProfilePageContent
        profile={data}
        viewerUserId={user.id}
        isFetching={isFetching}
      />
    </div>
  );
}
