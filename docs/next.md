# Next.js - Guia Completo

## 🚀 Principais Features

- **Fast Refresh** - Hot reload inteligente durante desenvolvimento
- **Otimização de Imagens** - Componente `<Image>` com lazy loading e otimização automática
- **Routing** - Sistema de rotas baseado em arquivos (file-based routing)
- **API Routes** - Criar endpoints de API dentro do próprio projeto
- **Next Lint** - ESLint configurado e otimizado para Next.js
- **Múltiplas formas de renderização** - SSG, SSR, CSR e ISR
- **Code Splitting** - Divisão automática do código para melhor performance
- **TypeScript Support** - Suporte nativo ao TypeScript
- **Middleware** - Executar código antes das requisições serem completadas

---

# 📊 Formas de Renderização de Conteúdo

## 1️⃣ SSR (Server-Side Rendering)

### Como Funciona

O servidor gera o HTML completo a cada requisição e envia para o cliente. Depois, o JavaScript é carregado e ocorre a **hidratação** (hydration) - processo onde o React anexa event listeners ao HTML já renderizado.

### ✅ Vantagens

- **SEO Excelente** - Crawlers veem o conteúdo completo
- **Load inicial visual rápido** - Usuário vê conteúdo imediatamente
- **Dados sempre atualizados** - Busca dados frescos a cada requisição
- **Funciona sem JavaScript** - Conteúdo visível mesmo se JS falhar

### ❌ Desvantagens

- **Mais requisições ao servidor** - Cada page load faz request ao servidor
- **Tempo até interatividade (TTI) mais lento** - Precisa esperar hydration
- **Custo de servidor maior** - Processamento a cada requisição
- **Latência** - Depende da velocidade do servidor

### 🎯 Casos de Uso Ideais

- Páginas com dados que mudam frequentemente
- Conteúdo personalizado por usuário
- Dashboards e painéis administrativos
- Páginas que precisam de dados em tempo real

### 💻 Implementação Next.js

```javascript
// Usando getServerSideProps
export async function getServerSideProps(context) {
  const res = await fetch('https://api.exemplo.com/dados');
  const dados = await res.json();

  return {
    props: { dados },
  };
}

export default function Pagina({ dados }) {
  return <div>{dados.titulo}</div>;
}
```

**Referência:** https://medium.com/techbloghotmart/o-que-%C3%A9-server-side-rendering-e-como-usar-na-pr%C3%A1tica-a840d76a6dca

---

## 2️⃣ CSR (Client-Side Rendering)

### Como Funciona

O servidor envia apenas um HTML mínimo com uma div root vazia. Todo o JavaScript é baixado e executado no navegador, que então renderiza o conteúdo. O modelo tradicional das SPAs (Single Page Applications).

### ✅ Vantagens

- **Interações complexas** - Ideal para aplicações ricas e interativas
- **Renderização rápida após load inicial** - Navegação entre páginas é instantânea
- **Menos carga no servidor** - Servidor apenas serve arquivos estáticos
- **Experiência fluida** - Transições suaves entre páginas

### ❌ Desvantagens

- **SEO prejudicado** - Crawlers podem não executar JavaScript
- **Load inicial mais lento** - Precisa baixar, parsear e executar JS antes de mostrar conteúdo
- **Performance em dispositivos lentos** - Depende do poder de processamento do cliente
- **Blank page flash** - Tela branca inicial enquanto JS carrega

### 🎯 Casos de Uso Ideais

- Aplicações web complexas (ex: Figma, Notion)
- Dashboards internos sem necessidade de SEO
- Áreas autenticadas (após login)
- Apps com muita interatividade e estado

### 💻 Implementação Next.js

```javascript
import { useEffect, useState } from 'react';

export default function Pagina() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    fetch('https://api.exemplo.com/dados')
      .then((res) => res.json())
      .then((data) => setDados(data));
  }, []);

  if (!dados) return <div>Carregando...</div>;
  return <div>{dados.titulo}</div>;
}
```

---

## 3️⃣ SSG (Static Site Generation)

### Como Funciona

O HTML é gerado **no momento da build** (yarn build). Os arquivos HTML estáticos são servidos diretamente de um CDN. Extremamente rápido pois não há processamento no servidor.

### ✅ Vantagens

- **Performance máxima** - Arquivos servidos direto do CDN
- **SEO perfeito** - HTML completo desde o início
- **Custo baixíssimo** - Pode hospedar gratuitamente (Vercel, Netlify)
- **Escalabilidade infinita** - Não importa o número de acessos
- **Segurança** - Sem servidor back-end para atacar

### ❌ Desvantagens

- **Não funciona com dados do usuário** - Build time não tem contexto de usuário
- **Rebuild necessário** - Para atualizar conteúdo, precisa rebuildar
- **Build time pode ser longo** - Em sites com muitas páginas
- **Dados podem ficar desatualizados** - Até o próximo build

### 🎯 Casos de Uso Ideais

- Blogs e sites de conteúdo
- Landing pages e sites institucionais
- Documentação
- E-commerce (páginas de produtos)
- Portfolio

### 💻 Implementação Next.js

```javascript
// Usando getStaticProps
export async function getStaticProps() {
  const res = await fetch('https://api.exemplo.com/dados');
  const dados = await res.json();

  return {
    props: { dados },
    revalidate: 60, // ISR: revalida a cada 60 segundos
  };
}

// Para rotas dinâmicas
export async function getStaticPaths() {
  const res = await fetch('https://api.exemplo.com/posts');
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking', // ou false, ou true
  };
}

export default function Pagina({ dados }) {
  return <div>{dados.titulo}</div>;
}
```

---

## 4️⃣ ISR (Incremental Static Regeneration) 🌟

### Como Funciona

Combina o melhor de SSG e SSR. Páginas são geradas estaticamente, mas podem ser **regeneradas em background** após um tempo específico, sem precisar rebuild completo.

### ✅ Vantagens

- **Performance de SSG** - Páginas servidas estaticamente
- **Conteúdo atualizado** - Regenera automaticamente
- **Escalável** - Não precisa rebuildar todo site
- **On-demand revalidation** - Pode forçar atualização via API

### 💻 Implementação

```javascript
export async function getStaticProps() {
  const dados = await fetchDados();

  return {
    props: { dados },
    revalidate: 10, // Revalida a cada 10 segundos
  };
}
```

---

# 📈 Comparação Direta

| Aspecto                       | SSG                      | SSR        | CSR        |
| ----------------------------- | ------------------------ | ---------- | ---------- |
| **Performance**               | ⭐⭐⭐⭐⭐               | ⭐⭐⭐     | ⭐⭐       |
| **SEO**                       | ⭐⭐⭐⭐⭐               | ⭐⭐⭐⭐⭐ | ⭐         |
| **Dados Atualizados**         | ⭐⭐ (com ISR: ⭐⭐⭐⭐) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **TTI (Time to Interactive)** | ⭐⭐⭐⭐                 | ⭐⭐⭐     | ⭐⭐       |
| **Custo de Servidor**         | ⭐⭐⭐⭐⭐               | ⭐⭐       | ⭐⭐⭐⭐   |
| **Complexidade**              | ⭐⭐⭐                   | ⭐⭐⭐⭐   | ⭐⭐       |
| **Escalabilidade**            | ⭐⭐⭐⭐⭐               | ⭐⭐       | ⭐⭐⭐⭐   |

---

# 🎯 O Poder do Next.js

## Escolha por Página

No Next.js, você pode **escolher qual estratégia usar em cada página** diferente:

```
/pages
  /index.js          → SSG (landing page)
  /blog/[slug].js    → SSG com ISR (posts)
  /dashboard.js      → CSR (área autenticada)
  /produto/[id].js   → SSR (preços em tempo real)
```

## Pre-rendering

Por padrão, o Next.js tenta fazer **pre-rendering** sempre que possível, gerando HTML no servidor ou em build time para melhorar performance e SEO.

---

# 🔑 Conceitos Importantes

## Hydration (Hidratação)

Processo onde o React "anexa" interatividade ao HTML já renderizado. O HTML vem pronto do servidor, depois o JavaScript carrega e torna a página interativa.

## Fallback Pages

Em SSG com rotas dinâmicas, você pode optar por:

- `fallback: false` - Retorna 404 para rotas não geradas
- `fallback: true` - Mostra fallback, gera página em background
- `fallback: 'blocking'` - Aguarda gerar página no primeiro acesso

## Modo de Produção

```bash
yarn build    # Gera build otimizado
yarn start    # Inicia servidor de produção
```

---

# 🌐 Estratégia Híbrida Recomendada

Para a maioria dos sites, a melhor abordagem é **combinar múltiplas estratégias**:

1. **Landing pages e marketing** → SSG
2. **Blog e conteúdo** → SSG + ISR
3. **Páginas de produtos** → SSG + ISR ou SSR
4. **Área autenticada** → CSR
5. **Checkout e carrinhos** → SSR
6. **Dashboards administrativos** → SSR ou CSR

Isso garante o melhor de cada mundo: performance, SEO, dados atualizados e ótima experiência do usuário! 🚀

---

<a id="form-html-vs-form-do-nextjs"></a>

## Form HTML vs `<Form>` do Next.js (`next/form`)

### `<form>` HTML (e no React)

- É o elemento **nativo** do navegador.
- Com **`method="get"`** e **`action`**, o envio costuma ser **navegação completa** (nova requisição de página), salvo se você interceptar com JavaScript (`preventDefault`) e tratar como SPA (fetch, estado, etc.).
- Com **`method="post"`** no modelo clássico (sem JS), o fluxo também segue o comportamento tradicional do servidor.
- No React, o padrão é **`onSubmit`**, validação (ex.: Zod) e envio com **`fetch`**, **React Query** ou **Server Actions** — o comportamento depende do que você implementou.

### `<Form>` do Next.js (`import Form from "next/form"`)

- É um **wrapper em cima do `<form>`**; não substitui a semântica de formulário nem resolve validação/estado sozinho.
- Integra melhor o formulário com o **App Router**: em cenários como **GET com query string** (busca, filtros), pode usar **navegação client-side** em vez de recarregar a página inteira “no modo clássico”, com **prefetch** onde fizer sentido.
- Continua acessível como um `<form>`; a diferença está na **navegação e na integração com o Next**, não em “outro tipo de formulário” para validação (isso continua com React Hook Form, Zod, Server Actions, etc.).

### Quando usar o quê

- **Login, cadastro, esqueci senha, modais com RHF + Zod:** em geral um **`<form>`** normal + `onSubmit` ou Server Action é suficiente.
- **Filtros/busca que mudam a URL (GET):** o **`<Form>`** do Next pode ajudar na experiência de rota.

Documentação oficial: [Form Component (Next.js)](https://nextjs.org/docs/app/api-reference/components/form).
