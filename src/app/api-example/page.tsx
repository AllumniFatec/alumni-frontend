"use client";

import { MockPostApi } from "@/apis/mockExampleApi";
import { useQuery } from "@tanstack/react-query";
import { PostCard } from "@/components/Posts";
import React from "react";

/** Exemplo json-server — não é o mesmo contrato que a API Alumni. */
type JsonPlaceholderPost = {
  id: number;
  title?: string;
  body?: string;
};

export default function ApiExamplePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => MockPostApi.getPosts(),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Posts da API</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <PostCard key={`skeleton-${index}`} isLoading={true} />
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-600">
            Nenhum post encontrado
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Posts da API</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Esta página usa dados de mock (json-server), não o modelo `Post` do feed.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(data as JsonPlaceholderPost[]).map((row) => (
          <PostCard
            key={String(row.id)}
            post={{
              id: String(row.id),
              content: row.body ?? row.title ?? "",
              create_date: new Date(),
              user_id: "",
              user_name: "",
              comments_count: 0,
              likes_count: 0,
              comments: [],
              likes: [],
            }}
            isLoading={false}
          />
        ))}
      </div>
    </div>
  );
}
