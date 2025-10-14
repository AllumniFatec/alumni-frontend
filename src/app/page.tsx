"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { config } from "@/config/env";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header com as cores da FATEC */}
      <header className="bg-primary text-primary-foreground p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Alumni FATEC Sorocaba</h1>
          <p className="opacity-80 mt-2">
            Sistema de big monsters bodybuilders da turma 2313 e ex-alunos da
            FATEC Sorocaba
          </p>
        </div>
      </header>

      {/* Seção principal */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Teste da API */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">🧪 Teste de Configuração</h2>
          <div className="bg-muted p-4 rounded-lg">
            <p>
              <strong>API Base URL:</strong> {config.api.baseUrl}
            </p>
            <p>
              <strong>App Name:</strong> {config.app.name}
            </p>
            <p>
              <strong>Version:</strong> {config.app.version}
            </p>
            <p>
              <strong>Environment:</strong> {config.app.environment}
            </p>
          </div>
        </section>

        {/* Cards demonstrando as cores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Card Primário - Vermelho FATEC */}
          <div className="bg-card border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="w-full h-4 bg-primary rounded mb-4"></div>
            <h3 className="text-lg font-semibold mb-2 text-card-foreground">
              Cor Primária
            </h3>
            <p className="text-sm bg-primary">#AE0C0D - Vermelho FATEC</p>
            <button className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded transition-colors hover:bg-primary/90">
              Botão Primário
            </button>
          </div>

          {/* Card Secundário - Cinza escuro */}
          <div className="bg-card border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="w-full h-4 bg-secondary rounded mb-4"></div>
            <h3 className="text-lg font-semibold mb-2 text-card-foreground">
              Cor Secundária
            </h3>
            <p className="text-sm text-card-foreground">
              #44555D - Cinza escuro
            </p>
            <button className="mt-4 bg-secondary text-secondary-foreground px-4 py-2 rounded transition-colors hover:bg-secondary/90">
              Botão Secundário
            </button>
          </div>

          {/* Card Terciário - Azul escuro */}
          <div className="bg-card border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="w-full h-4 bg-tertiary rounded mb-4"></div>
            <h3 className="text-lg font-semibold mb-2 text-card-foreground">
              Cor Terciária
            </h3>
            <p className="text-sm text-card-foreground">
              #243E63 - Azul escuro
            </p>
            <button className="mt-4 bg-tertiary text-tertiary-foreground px-4 py-2 rounded transition-colors hover:bg-tertiary/90">
              Botão Terciário
            </button>
          </div>

          {/* Card Accent - Ciano */}
          <div className="bg-card border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="w-full h-4 bg-accent rounded mb-4"></div>
            <h3 className="text-lg font-semibold mb-2 text-card-foreground">
              Cor Accent
            </h3>
            <p className="text-sm text-card-foreground">#00C1CF - Ciano</p>
            <button className="mt-4 bg-accent text-accent-foreground px-4 py-2 rounded transition-colors hover:bg-accent/90">
              Botão Accent
            </button>
          </div>

          {/* Card Info - Azul petróleo */}
          <div className="bg-card border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="w-full h-4 bg-info rounded mb-4"></div>
            <h3 className="text-lg font-semibold mb-2 text-card-foreground">
              Cor Info
            </h3>
            <p className="text-sm text-card-foreground">
              #005C6D - Azul petróleo
            </p>
            <button className="mt-4 bg-info text-info-foreground px-4 py-2 rounded transition-colors hover:bg-info/90">
              Botão Info
            </button>
          </div>

          {/* Card Muted - Cinza claro */}
          <div className="bg-muted border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="w-full h-4 bg-muted-foreground rounded mb-4"></div>
            <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
              Cor Muted
            </h3>
            <p className="text-sm text-muted-foreground">
              #F2F2F2 - Cinza claro
            </p>
            <button className="mt-4 bg-muted-foreground text-muted px-4 py-2 rounded transition-colors hover:bg-muted-foreground/90">
              Botão Muted
            </button>
          </div>
        </div>

        {/* Seção de Demonstração de Botões */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Demonstração de Botões shadcn/ui
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Botões Variantes */}
            <div className="bg-card border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-card-foreground">
                Variantes
              </h3>
              <div className="space-y-3">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Botões Tamanhos */}
            <div className="bg-card border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-card-foreground">
                Tamanhos
              </h3>
              <div className="space-y-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">🎯</Button>
              </div>
            </div>

            {/* Botões Estados */}
            <div className="bg-card border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-card-foreground">
                Estados
              </h3>
              <div className="space-y-3">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button variant="outline">Hover me!</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Demonstração de Select */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Demonstração de Select shadcn/ui
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Select Básico */}
            <div className="bg-card border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-card-foreground">
                Select Básico
              </h3>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Escolha uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opcao1">Opção 1</SelectItem>
                  <SelectItem value="opcao2">Opção 2</SelectItem>
                  <SelectItem value="opcao3">Opção 3</SelectItem>
                </SelectContent>
              </Select>

              <p className="text-sm text-muted-foreground mt-2">
                <strong>SelectTrigger:</strong> O botão clicável
                <br />
                <strong>SelectValue:</strong> Mostra o selecionado
                <br />
                <strong>SelectContent:</strong> O dropdown
                <br />
                <strong>SelectItem:</strong> Cada opção
              </p>
            </div>

            {/* Select Cursos FATEC */}
            <div className="bg-card border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-card-foreground">
                Cursos FATEC (Exemplo Real)
              </h3>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione seu curso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ads">
                    Análise e Desenvolvimento de Sistemas
                  </SelectItem>
                  <SelectItem value="gestao-ti">
                    Gestão da Tecnologia da Informação
                  </SelectItem>
                  <SelectItem value="logistica">Logística</SelectItem>
                  <SelectItem value="processos-gerenciais">
                    Processos Gerenciais
                  </SelectItem>
                </SelectContent>
              </Select>

              <p className="text-sm text-muted-foreground mt-2">
                ✅ Acessível (keyboard navigation)
                <br />
                ✅ Searchable (digite para filtrar)
                <br />
                ✅ Customizável (cores, tamanhos)
                <br />✅ Mobile-friendly
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
