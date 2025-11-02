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
        `bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow `,
        className
      )}
    >
      <div className="min-h-20 flex flex-col justify-center">
        {/* Título do post */}
        <p className="text-2xl font-semibold text-info mb-2 ">{user.name}</p>

        {/* Corpo do post */}
      </div>
      <p className="text-foreground text-sm ">{user.userType}</p>
      <div className="mt-3 pt-2 border-t border-gray-100 justify-end">
        <p className="text-destructive text-md ">{user?.course}</p>
        <p className="text-destructive text-md ">
          Ano de matricula: {user?.enrollmentYear}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
