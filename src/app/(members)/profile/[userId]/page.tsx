"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { Section } from "@/components/Section";
import { ErrorState } from "@/components/ErrorState";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/AuthContext";
import { useMyProfile } from "@/hooks/useProfile";
import { useUserById } from "@/hooks/useUsers";
import { ProfilePageContent } from "@/components/profile/ProfilePageContent";

export default function ProfileByUserIdPage() {
  const params = useParams();
  const userId = typeof params.userId === "string" ? params.userId : undefined;
  const { user, isLoading: authLoading } = useAuth();

  const isSelf = useMemo(() => {
    if (authLoading) return null;
    if (!userId || !user) return false;
    return user.id === userId;
  }, [authLoading, userId, user]);

  const myProfileQuery = useMyProfile({
    enabled: isSelf === true,
  });

  const otherProfileQuery = useUserById(isSelf === false ? userId : undefined);

  const { data, isLoading, isError, refetch, isFetching } =
    isSelf === true ? myProfileQuery : otherProfileQuery;

  const pageLoading = authLoading || isSelf === null || isLoading;

  if (pageLoading) {
    return (
      <Section title="Perfil">
        <div className="flex justify-center py-16">
          <Spinner className="size-8 text-primary" />
        </div>
      </Section>
    );
  }

  if (!userId) {
    return (
      <Section title="Perfil">
        <p className="text-sm text-slate-500">Usuário inválido.</p>
      </Section>
    );
  }

  if (isError || !data) {
    return (
      <Section title="Perfil">
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
        viewerUserId={user?.id}
        isFetching={isFetching}
      />
    </div>
  );
}
