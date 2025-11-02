import { cn } from "@/lib/utils";
import { User } from "@/models/users";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export interface UserCardProps {
  user: User;
  isLoading?: boolean;
  className?: string;
}

const UserCard = ({ user, className, isLoading = false }: UserCardProps) => {
  if (isLoading) {
    return (
      <div
        className={cn(
          `bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow`,
          className
        )}
      >
        {/* Nome */}
        <Skeleton className="h-6 w-2/3 mb-3 rounded" />
        {/* Descrição */}
        <Skeleton className="h-4 w-full mb-2 rounded" />
        <Skeleton className="h-4 w-5/6 mb-2 rounded" />
        <Skeleton className="h-4 w-4/6 mb-4 rounded" />
        {/* Infos */}
        <div className="mt-3 pt-2 border-t border-gray-100">
          <Skeleton className="h-4 w-1/2 mb-2 rounded" />
          <Skeleton className="h-4 w-1/3 rounded" />
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        `bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow `,
        className
      )}
    >
      {/* Título do post */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {user.name}
      </h3>

      {/* Corpo do post */}
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
        {user.description}
      </p>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <p>{user?.localWorkplace}</p>
        <p>{user?.course}</p>
      </div>
    </div>
  );
};

export default UserCard;
