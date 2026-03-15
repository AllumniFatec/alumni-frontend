import { Post, PostStatus } from "@/models/posts";

export const mockPosts: Post[] = [
  {
    post_id: "1",
    content:
      "Queria compartilhar com a comunidade Alumni que recebi minha primeira proposta de emprego como desenvolvedor full stack. Foram meses de dedicação estudando React, Node.js e banco de dados. Obrigado a todos os professores e colegas que me apoiaram nessa jornada. Não desistam!",
    images: [],
    status: PostStatus.ACTIVE,
    author_id: "1",
    likes: [],
    likes_count: 0,
    comments: [],
    comments_count: 0,
    create_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    post_id: "2",
    content:
      "Passei por mais de 10 processos seletivos nos últimos meses e aprendi bastante. As perguntas mais comuns foram sobre estruturas de dados, algoritmos e projetos práticos. Minha dica principal: mostre como você pensa, não apenas o resultado. Recrutadores valorizam muito o raciocínio.",
    images: [],
    status: PostStatus.ACTIVE,
    author_id: "2",
    likes: [],
    likes_count: 0,
    comments: [],
    comments_count: 0,
    create_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    post_id: "3",
    content:
      "Ao completar 2 anos no mercado de trabalho, olhando para trás percebo o quanto a FATEC me preparou. As disciplinas de banco de dados, estrutura de dados e engenharia de software foram fundamentais. Claro que precisei aprender muito por conta própria, mas a base foi essencial.",
    images: [],
    status: PostStatus.ACTIVE,
    author_id: "3",
    likes: [],
    likes_count: 0,
    comments: [],
    comments_count: 0,
    create_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    post_id: "4",
    content:
      "Montei uma lista dos melhores recursos gratuitos que usei durante minha formação e ainda uso hoje: CS50 de Harvard, roadmap.sh para trilhas de aprendizado, Exercism para praticar algoritmos e a documentação oficial sempre em mãos. Espero ajudar quem está começando!",
    images: [],
    status: PostStatus.ACTIVE,
    author_id: "4",
    likes: [],
    likes_count: 0,
    comments: [],
    comments_count: 0,
    create_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    post_id: "5",
    content:
      "Fui aluno da turma de 2018 e guardo incríveis memórias da faculdade. O networking foi o maior presente que o curso me deu. Muitos colegas viraram sócios, clientes e amigos próximos. Se pudesse dar um conselho: participe de projetos extras, hackathons e eventos. Isso faz toda a diferença.",
    images: [],
    status: PostStatus.ACTIVE,
    author_id: "5",
    likes: [],
    likes_count: 0,
    comments: [],
    comments_count: 0,
    create_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
];
