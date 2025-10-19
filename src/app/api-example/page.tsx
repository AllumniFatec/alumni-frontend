"use client";
import { MockPostApi } from "@/apis/mockExampleApi";
import { useQuery } from "@tanstack/react-query";
import { PostCard } from "@/components/Posts";
import React from "react";
import { Post } from "@/models/posts";

const ApiExamplePage = () => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((post: Post) => (
          <PostCard key={post.id} post={post} isLoading={false} />
        ))}
      </div>
    </div>
  );
};

export default ApiExamplePage;
