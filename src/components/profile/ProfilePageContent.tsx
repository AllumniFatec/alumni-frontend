"use client";

import Image from "next/image";
import type { MyProfile } from "@/models/profile";
import type { UserPublicProfileDetail } from "@/models/userPublic";
import { ProfileSummarySection } from "@/components/profile/ProfileSummarySection";
import { ProfileInformationSection } from "@/components/profile/ProfileInformationSection";
import { ProfileCoursesSection } from "@/components/profile/ProfileCoursesSection";
import { ProfileWorkplaceHistorySection } from "@/components/profile/ProfileWorkplaceHistorySection";
import { ProfileSocialMediaSection } from "@/components/profile/social-media/ProfileSocialMediaSection";
import { ProfileSkillsSection } from "@/components/profile/ProfileSkillsSection";
import { ProfileJobsSection } from "@/components/profile/ProfileJobsSection";
import { ProfileEventsSection } from "@/components/profile/ProfileEventsSection";
import { ProfilePostsSection } from "@/components/profile/ProfilePostsSection";
import { ProfilePhotoEditDialog } from "@/components/profile/ProfilePhotoEditDialog";

export type ProfilePageContentProps = {
  profile: MyProfile | UserPublicProfileDetail;
  viewerUserId: string | undefined;
  isFetching?: boolean;
};

export function ProfilePageContent({
  profile,
  viewerUserId,
  isFetching,
}: ProfilePageContentProps) {
  const isOwnProfile = Boolean(
    viewerUserId && viewerUserId === profile.user_id,
  );
  const photoUrl = profile.perfil_photo?.url ?? null;
  const infoVariant = isOwnProfile ? "full" : "public";

  return (
    <>
      {isFetching && (
        <p className="text-xs text-slate-400 mb-2">Atualizando…</p>
      )}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm text-left">
        <div className="h-32 bg-gradient-to-r from-primary/80 to-primary" />

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10 mb-4">
            <div className="relative">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={profile.name}
                  width={80}
                  height={80}
                  className="size-20 rounded-full border-4 border-white object-cover shadow"
                />
              ) : (
                <div className="size-20 rounded-full border-4 border-white bg-primary/10 flex items-center justify-center text-primary text-3xl font-black shadow">
                  {profile.name?.trim().charAt(0).toUpperCase() || "?"}
                </div>
              )}

              {isOwnProfile && <ProfilePhotoEditDialog />}
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-800">{profile.name}</h2>
          {/*<p className="text-sm text-slate-500 mb-1">{profile.user_type}</p>*/}

          {profile.biography && (
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              {profile.biography}
            </p>
          )}

          <ProfileSummarySection profile={profile} />
          <ProfileInformationSection profile={profile} variant={infoVariant} />
          <ProfileCoursesSection courses={profile.courses} />
          <ProfileWorkplaceHistorySection
            profileUserId={profile.user_id}
            entries={profile.workplace_history}
          />
          <ProfileSocialMediaSection
            profileUserId={profile.user_id}
            socialMedia={profile.social_media}
          />
          <ProfileSkillsSection
            profileUserId={profile.user_id}
            skills={profile.skills}
          />
          <ProfileJobsSection jobs={profile.jobs} />
          <ProfileEventsSection events={profile.events} />
          <ProfilePostsSection
            posts={profile.posts}
            isOwnProfile={isOwnProfile}
          />
        </div>
      </div>
    </>
  );
}
