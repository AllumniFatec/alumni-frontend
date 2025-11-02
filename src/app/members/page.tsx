"use client";
import { UserApi } from "@/apis/users";
import { Section } from "@/components/Section";
import { Spinner } from "@/components/ui/spinner";
import UserCard from "@/components/UserCard";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Members = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => UserApi.getUsers(),
  });

  return (
    <div className="">
      <Section title="Últimos Usuários">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading &&
            Array.from({ length: 3 }).map((_, idx) => (
              <UserCard key={idx} user={{} as any} isLoading />
            ))}
          {data &&
            data.length > 0 &&
            data.map((user) => <UserCard key={user.id} user={user} />)}
        </div>
      </Section>
      <Section title="Próximos Eventos">
        <div className="flex items-center justify-center text-gray-400 gap-2">
          <Spinner className="size-8" />
          <span>Em breve...</span>
        </div>
      </Section>
      <Section title="Últimas Vagas">
        <div className="flex items-center justify-center text-gray-400 gap-2">
          <Spinner className="size-8" />
          <span>Em breve...</span>
        </div>
      </Section>
    </div>
  );
};

export default Members;
