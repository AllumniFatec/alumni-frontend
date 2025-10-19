"use client";
import { UserApi } from "@/apis/users";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const page = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => UserApi.getUsers(),
  });

  console.warn("os dados dos meu list são:", data);
  console.warn("erro:", error);
  console.warn("loading:", isLoading);

  return <div>pagina inicial</div>;
};

export default page;
