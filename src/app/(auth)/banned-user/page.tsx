"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Ban } from "lucide-react";
import { AppRoutes } from "@/config/routes";

const BannedUserPage = () => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-6 px-4 sm:min-w-lg items-center">
      {/* Ícone */}
      <div className="flex justify-center mb-4">
        <Ban className="w-20 h-20 text-red-500" />
      </div>

      {/* Título */}
      <h1 className="text-primary text-2xl font-bold text-center mb-2 md:text-3xl">
        Conta suspensa
      </h1>

      {/* Mensagem */}
      <p className="text-gray-600 text-center leading-relaxed max-w-md">
        Sua conta foi suspensa pela equipe da FATEC Sorocaba.
      </p>

      <p className="text-gray-500 text-sm text-center max-w-md">
        Você recebeu um email com mais informações sobre o motivo da suspensão.
        Caso tenha dúvidas, entre em contato com a administração.
      </p>

      {/* Botões */}
      <div className="flex flex-col gap-3 mt-6 w-full">
        <Button
          type="button"
          variant="default"
          size="lg"
          className="w-full"
          onClick={() => router.push(AppRoutes.Home)}
        >
          Voltar a tela inicial
        </Button>
      </div>
    </div>
  );
};

export default BannedUserPage;
