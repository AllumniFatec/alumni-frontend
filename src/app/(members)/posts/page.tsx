import { Section } from "@/components/Section";
import { PostCard } from "@/components/Posts";
import { Post } from "@/models/posts";

const mockPosts: Post[] = [
  {
    userId: 1,
    id: 1,
    title: "Consegui meu primeiro emprego como desenvolvedor!",
    body: "Queria compartilhar com a comunidade Alumni que recebi minha primeira proposta de emprego como desenvolvedor full stack. Foram meses de dedicação estudando React, Node.js e banco de dados. Obrigado a todos os professores e colegas que me apoiaram nessa jornada. Não desistam!",
  },
  {
    userId: 2,
    id: 2,
    title: "Dicas para entrevistas técnicas em empresas de tecnologia",
    body: "Passei por mais de 10 processos seletivos nos últimos meses e aprendi bastante. As perguntas mais comuns foram sobre estruturas de dados, algoritmos e projetos práticos. Minha dica principal: mostre como você pensa, não apenas o resultado. Recrutadores valorizam muito o raciocínio.",
  },
  {
    userId: 3,
    id: 3,
    title: "Como o curso de ADS me preparou para o mercado",
    body: "Ao completar 2 anos no mercado de trabalho, olhando para trás percebo o quanto a FATEC me preparou. As disciplinas de banco de dados, estrutura de dados e engenharia de software foram fundamentais. Claro que precisei aprender muito por conta própria, mas a base foi essencial.",
  },
  {
    userId: 4,
    id: 4,
    title: "Compartilhando recursos gratuitos de estudo para programação",
    body: "Montei uma lista dos melhores recursos gratuitos que usei durante minha formação e ainda uso hoje: CS50 de Harvard, roadmap.sh para trilhas de aprendizado, Exercism para praticar algoritmos e a documentação oficial sempre em mãos. Espero ajudar quem está começando!",
  },
  {
    userId: 5,
    id: 5,
    title: "Reflexão após 5 anos de FATEC Sorocaba",
    body: "Fui aluno da turma de 2018 e guardo incríveis memórias da faculdade. O networking foi o maior presente que o curso me deu. Muitos colegas viraram sócios, clientes e amigos próximos. Se pudesse dar um conselho: participe de projetos extras, hackathons e eventos. Isso faz toda a diferença.",
  },
];

export default function PostsPage() {
  return (
    <div>
      <Section title="Publicações da Rede">
        <div className="flex flex-col gap-4">
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </Section>
    </div>
  );
}
