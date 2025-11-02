"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Hero Section */}
      <header className="relative">
        {/* Top Navigation Bar */}
        <nav className="bg-white shadow-sm px-6 py-4 mb-2">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="/basic-name-logo.png"
                alt="FATEC Sorocaba"
                className="h-8"
              />
            </div>
            <Button variant="destructive">
              <Link href="/sign-in">Acessar Sistema</Link>
            </Button>
          </div>
        </nav>

        <div className="relative">
          <div className="h-96 relative overflow-hidden">
            <img
              src="/fatec-entrance.png"
              alt="FATEC Sorocaba Entrance"
              className="w-full h-full object-contain  inset-0"
            />
            <div className="absolute inset-0 bg-opacity-50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-5xl mb-4 drop-shadow-lg">Bem-vindo</h1>
                  <h2 className="text-4xl  drop-shadow-lg">de volta!</h2>
                </div>
              </div>
            </div>
            s
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Sobre o Alumni Section */}
        <Section title="Sobre o Alumni">
          <div className="grid md:grid-cols-3 gap-8">
            <Card title="Conectar">
              <p>
                Encontre colegas e relembre histórias que marcaram a sua vida na
                FATEC Sorocaba, veja o que cada pessoa tem feito e mantenha
                contato.
              </p>
            </Card>
            <Card title="Contribuir">
              <p>
                Apresente pessoas, empregue e ofereça-se para atuar na mentoria
                de estudantes.
              </p>
            </Card>
            <Card title="Expandir">
              <p>
                Amplie seu network profissional, restabeleça contatos e conheça
                novas pessoas.
              </p>
            </Card>
          </div>
        </Section>

        {/* Empresa Parceira Section */}
        <Section title="Empresa Parceira">
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-600 leading-relaxed mb-8">
              Ao se tornar uma empresa parceira da Fatec Sorocaba, sua empresa
              tem acesso aos melhores professores e alunos dedicados de Sorocaba
              e Região
            </p>
            <Button variant="destructive">
              <Link href="/empresa-parceira">Seja um Parceiro!</Link>
            </Button>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <h3 className="text-3xl font-bold mb-4">Alumni Fatec</h3>

            <div className="mb-6">
              <h4 className="font-bold text-lg mb-3">Sobre o Portal</h4>
              <p className="text-gray-300 leading-relaxed">
                Esse Portal foi desenvolvido como trabalho de conclusão de curso
                dos alunos da Fatec Sorocaba. Desenvolvido com o objetivo de
                permanecer contribuindo na trajetória dos alunos da Unesp após
                sua formação. Com um ambiente exclusivo, propicia conexão,
                oportunidades e aprendizado.
              </p>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 pt-8 border-t border-gray-700">
            <div className="flex space-x-4"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
