# Mercury Migration Muse

> **Project Architecture & Deployment Guide**

Este projeto é uma Single Page Application (SPA) reativa construída com **React 18**, **Vite**, **TypeScript** e **Tailwind CSS**. A interface é montada sobre os primitivos acessíveis do **Radix UI** utilizando componentes baseados no padrão **shadcn/ui**.

## 🏗 Arquitetura e Decisões Técnicas

- **Build Tooling:** \`Vite\` oferece HMR instântaneo e builds otimizados usando esbuild/rollup.
- **Tipagem Forte:** \`TypeScript\` estrito para garantia de contratos de dados em toda aplicação.
- **Componentização & UI:** \`Radix UI\` fornece componentes *headless* semânticos e acessíveis, encapsulados com \`Tailwind CSS\` e \`class-variance-authority\` para variações de estado flexíveis.
- **Gerenciamento de Estado de UI e Formulários:** \`react-hook-form\` com validação de schemas em \`Zod\` garante integridade de dados na borda, prevenindo inputs maliciosos antes mesmo da requisição.
- **Data Fetching:** \`@tanstack/react-query\` (React Query) lida com estado do servidor, cacheamento, retries e atualizações otimistas.
- **Testes:** Configuração robusta abrangendo unitários (\`vitest\` + \`@testing-library\`) e E2E (\`@playwright/test\`).

## 🚀 Como Executar o Projeto Localmente

**Pré-requisitos:** Node.js (preferencialmente versão >= 20.x).

1. Clone o repositório e instale as dependências:
   \`\`\`bash
   npm install
   \`\`\`

2. Inicie o servidor de desenvolvimento:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Para executar testes unitários e de cobertura:
   \`\`\`bash
   npm run test
   \`\`\`

## ☁️ Deploy na Vercel

A infraestrutura foi preparada para um deploy instantâneo na **Vercel**. Todo tráfego não reconhecido (\`404\`) é roteado de forma segura para \`index.html\` via **\`vercel.json\`**, delegando o controle de estado e roteamento para o **React Router**.

### Passos de Deploy:

1. \`npm install\` já realizou a instalação das dependências.
2. Na Vercel, importe este repositório.
3. As configurações serão detectadas automaticamente pelo \`Vite\`.
   - **Framework Preset:** Vite
   - **Build Command:** \`npm run build\`
   - **Output Directory:** \`dist\`
   - **Install Command:** \`npm install\`
4. Configure as variáveis de ambiente necessárias (se houver na aplicação raiz).
5. Deploy 🚀

## 🔐 Padrão de Segurança e Carga
Todo componente que manipula dados de usuário valida a tipagem no payload via \`Zod\`. Não utilize coerções silenciosas (\`any\` ou \`as Type\`). Evite \`// @ts-ignore\` em contratos de propriedades vazando risco em runtime.

*(Documentação gerada sob os preceitos de Arquitetura Principal e Mapeamento Profundo).*
