# Prompts de execução · mypage

Roteiro de implementação em etapas pequenas. Cada etapa é um prompt independente: abrir uma sessão (ou continuar a atual), colar o bloco da etapa e seguir até a entrega. Não pular etapas; a ordem segue dependências.

🔒 = gate humano. Só seguir para a próxima etapa depois que o Douglas aprovar.

---

## Preâmbulo fixo (vale para todas as etapas)

Todo prompt abaixo herda estas regras. Se uma etapa parecer conflitar com elas, parar e perguntar.

1. **Ler antes de agir:** `CLAUDE.md` e os arquivos de `instructions/` indicados em "Ler antes". Os specs são a fonte da verdade; não editar `instructions/`.
2. **Escopo fechado:** fazer só o que a etapa pede. Não adiantar seções, não refatorar o que já foi aprovado sem pedir.
3. **Git:** **nunca** rodar `git commit`, `git push` ou criar branches. Ao final, devolver uma **sugestão** de mensagem no padrão Conventional Commits (`feat(scope): ...`, `fix`, `chore`, `test`, `docs`, `style`, `refactor`). Se a etapa tiver partes bem separadas, sugerir mais de um commit e quais arquivos vão em cada um.
4. **Nada inventado:** sem números, depoimentos, prazos ou preços que não estejam nos specs ou confirmados pelo Douglas. Se faltar informação, perguntar.
5. **Regras visuais e de copy:** todas as listas "proibido" e "obrigatório" do `CLAUDE.md` valem sempre. Em especial: nenhum travessão (U+2014) em código, JSON ou docs fora de `instructions/` e `CLAUDE.md`.
6. **Strings:** nenhum texto visível hardcoded; tudo em `messages/pt.json` e `messages/en.json`, com as mesmas chaves.
7. **Verificação antes de entregar:** rodar o que existir de `pnpm lint`, `pnpm typecheck`, `pnpm test`. Reportar falhas com a saída real; não declarar pronto sem evidência.
8. **Formato da entrega:** (a) resumo do que foi feito, (b) arquivos criados/alterados, (c) resultado da verificação, (d) pendências ou decisões que ficaram para o Douglas, (e) sugestão de commit.
9. **Log:** ao final, atualizar a tabela "Log de progresso" no fim deste arquivo (status, data, pendências). A coluna de commit fica para o Douglas preencher.

### Fluxo padrão das etapas de seção (05 a 12)

Seguir o "Fluxo por seção" do `CLAUDE.md`:

1. Ler a seção no `LANDING-PAGE-SPEC.md` e as partes indicadas do `DESIGN-GUIDELINES.md`
2. `/impeccable shape` com a seção
3. Implementar usando as chaves de copy já existentes (criadas na Etapa 03). Se faltar chave, adicionar nos dois JSONs e avisar na entrega
4. Rodar Playwright; gerar screenshots em 375, 768 e 1440, PT e EN, e olhar todos
5. `/impeccable critique` + `design-taste-frontend`; ajustar
6. Se houver motion: `review-animations` (e `improve-animations` se necessário)
7. Entregar e aguardar o gate

---

## Etapa 00 · Bootstrap

```
Objetivo: criar o projeto Next.js vazio e configurado, sem nenhuma seção.

Ler antes: CLAUDE.md (Stack, Regras de código, Estrutura de pastas, Comandos).

Pré-requisitos: nenhum.

Escopo · entra:
- Next.js (App Router, versão estável atual) + TypeScript strict + Tailwind CSS + ESLint, com pnpm
- Estrutura de pastas do CLAUDE.md (src/app, src/components/sections, src/components/ui, src/content, src/i18n, src/lib, messages, public/portfolio, scripts, tests), só com o mínimo para compilar
- Scripts no package.json: dev, build, start, lint, typecheck (tsc --noEmit), test (playwright), capture (placeholder que falha com mensagem clara até a Etapa 04)
- .gitignore adequado (sem ignorar .claude/skills/)
- Remover o boilerplate visual do create-next-app (estilos, SVGs, página demo)

Escopo · não entra: tokens, fontes, i18n, shadcn, Playwright instalado, qualquer seção.

Critérios de aceite:
- pnpm build, pnpm lint e pnpm typecheck passam
- tsconfig com "strict": true
- Nenhum arquivo novo na raiz além dos de configuração padrão

Entrega: conforme o preâmbulo. Sugestão de commit no formato chore(setup): ...
```

---

## Etapa 01 · Skills 🔒

```
Objetivo: deixar as skills obrigatórias versionadas em .claude/skills/ e o Impeccable inicializado.

Ler antes: CLAUDE.md (Skills obrigatórias), instructions/BRIEF.md, instructions/DESIGN-GUIDELINES.md.

Pré-requisitos: Etapa 00.

Escopo · entra:
- Listar para o Douglas os comandos de instalação do CLAUDE.md, na ordem, indicando quais são interativos
  (emilkowalski/skills exige selecionar só: emil-design-eng, animate, review-animations,
  improve-animations, find-animation-opportunities, animation-vocabulary, break-ui)
- O Douglas roda os comandos interativos com "! <comando>"; rodar os não interativos
- Playwright: pnpm add -D @playwright/test && pnpm exec playwright install chromium
- Conferir que .claude/skills/ contém o esperado e que nada indesejado foi instalado (animate-expo, write-swift, mobile-native)
- /impeccable init usando BRIEF.md e DESIGN-GUIDELINES.md como contexto

Escopo · não entra: editar arquivos dentro de .claude/skills/.

Critérios de aceite:
- Skills listadas presentes em .claude/skills/
- .claude/skills/ não está no .gitignore
- Saída do /impeccable init revisada pelo Douglas

Gate: Douglas confere a lista de skills e o resultado do init.
Sugestão de commit: chore(skills): ...
```

---

## Etapa 02 · Fundação 🔒

```
Objetivo: construir a base que todas as seções vão usar: tokens, fontes, i18n, conteúdo tipado, WhatsApp e primitivos.

Ler antes: DESIGN-GUIDELINES.md (1 Cores, 2 Tipografia, 3 Espaçamento, 4 Forma, 5 Motion: princípios, 8 shadcn/ui),
PRD.md (RF04 aceite, RF10, Requisitos Não Funcionais), LANDING-PAGE-SPEC.md (Hierarquia de CTAs), CLAUDE.md (Regras de código).

Pré-requisitos: Etapas 00 e 01.

Escopo · entra:
- Tokens como CSS variables (cores, raios, sombra --shadow-window, --ease-out, --ease-in-out) e mapeados no tema do Tailwind.
  Escala tipográfica (display-xl ... label) como utilitários. Proibido cor arbitrária em componente
- Fontes via next/font/google: Instrument Serif (400, 400 itálico), Hanken Grotesk (400/500/600), JetBrains Mono (400/500),
  subset latin, display swap, como --font-display / --font-sans / --font-mono
- next-intl: localePrefix 'as-needed' (PT em /, EN em /en), PT padrão, localeDetection desligado, escolha persistida em cookie
- src/app/[locale]/layout.tsx com <html lang> correto, generateStaticParams, página vazia com <header>/<main>/<footer> semânticos
- messages/pt.json e messages/en.json com a estrutura de chaves de todas as seções (valores provisórios marcados claramente, ex.: "TODO copy"),
  para a Etapa 03 só preencher
- src/content/: projects.ts (tipo com url, domínio, segmento, tipo, width, height, published, categoria landing/saas/ferramenta),
  pricing.ts (Essencial 400, Profissional 550, flag de destaque), testimonials.ts (array vazio, tipado), links.ts (WhatsApp, LinkedIn)
  Dados dos projetos conforme PRD RF02 e RF06 (Poupensa com published: false)
- src/lib/whatsapp.ts: buildWhatsAppUrl({ locale, context }) com contextos default, pricing-essencial, pricing-profissional;
  número 5531991848090; mensagem PT padrão do CLAUDE.md; mensagens vindas dos JSONs
- src/lib/format.ts (ou similar): preço com Intl.NumberFormat em BRL nos dois idiomas
- shadcn/ui inicializado; instalar e restilizar Button (primary, secondary, ghost, on-accent; radius 4px; :active scale 0.97 em 150ms; sem sombra),
  Accordion, Sheet, Separator conforme DESIGN-GUIDELINES 8
- Foco visível global: anel 2px --accent com offset 2px; variante sobre verde em --on-accent
- prefers-reduced-motion: regra global que desliga animações de entrada e mantém transições de cor
- Playwright: playwright.config.ts com Chromium, projetos 375/768/1440, webServer apontando para o build
- tests/i18n.spec.ts: paridade de chaves pt/en e <html lang> correto em / e /en
- Testes unitários simples de buildWhatsAppUrl (pode ser dentro do Playwright como teste sem página)

Escopo · não entra: copy real, qualquer seção visual, analytics, SEO.

Critérios de aceite:
- lint, typecheck, test passando
- Nenhum #000/#FFF, nenhum gradiente, nenhuma fonte proibida
- / renderiza em PT, /en em EN, sem detecção automática

Gate: Douglas revisa tokens, variantes do Button (página temporária de preview ou screenshot) e a estrutura de chaves dos JSONs.
Sugestão de commit: provavelmente dividir em feat(design-system), feat(i18n), feat(content), test(i18n).
```

---

## Etapa 03 · Copy PT/EN 🔒

```
Objetivo: escrever toda a copy da página, em PT e EN, numa única passada para manter uma voz só.

Ler antes: BRIEF.md inteiro, PRD.md (User Stories, RF03, RF04, RF07), LANDING-PAGE-SPEC.md inteiro, CLAUDE.md (Regras "sem cara de IA": Copy).

Pré-requisitos: Etapa 02. Respostas do Douglas para:
- prazo padrão de entrega
- forma de pagamento
- quantas rodadas de alteração estão inclusas
Se alguma faltar, perguntar antes de escrever o FAQ.

Escopo · entra:
- Usar a skill marketing-writer
- Preencher todas as chaves de messages/pt.json e messages/en.json: header, hero (rótulo, headline com uma palavra em itálico,
  subheadline, CTAs, fatos curtos), portfólio, como funciona (4 passos, bloco brand-first, bloco IA), pacotes (inclui notas de
  complexidade, domínio e adicionais), sobre mim, outros projetos, depoimentos (só rótulos), FAQ (5 a 7), CTA final, footer,
  alt texts, aria-labels, mensagens do WhatsApp por contexto, metadata (title/description por idioma)
- EN não é tradução literal: mesma mensagem, escrita para quem lê em inglês
- Entregar também uma tabela de revisão: chave · PT · EN, para leitura rápida

Escopo · não entra: componentes, layout.

Critérios de aceite:
- Zero travessão (grep por U+2014 nos JSONs sem resultado)
- Nenhum clichê da lista proibida, nenhuma tríade decorativa, nenhuma pergunta retórica em série
- Mensagem brand-first presente; uso de IA dito com honestidade
- Preço sempre "a partir de" com nota de complexidade
- Nenhum número inventado (anos de experiência = ~8, conforme BRIEF)
- i18n.spec continua passando (paridade de chaves)

Gate: Douglas lê a tabela e aprova ou pede ajustes. Iterar até aprovar.
Sugestão de commit: feat(copy): ...
```

---

## Etapa 04 · Captura do portfólio

```
Objetivo: gerar os screenshots full-page dos sites do portfólio com um script reprodutível.

Ler antes: CLAUDE.md (Testes: script pnpm capture), DESIGN-GUIDELINES.md (6 Imagens), PRD.md (RF02 aceite: imagem até 400KB).

Pré-requisitos: Etapa 02.

Escopo · entra:
- scripts/capture-portfolio.ts rodando com Playwright (Chromium), viewport 1440 de largura
- Para cada projeto de landing page em projects.ts: abrir, esperar carregar (incluindo lazy images: rolar até o fim e voltar),
  fechar popups/cookies, capturar página inteira, converter para .webp qualidade ~80 (sharp), salvar em public/portfolio/<slug>.webp
- Atualizar width/height do projeto em projects.ts automaticamente
- Avisar se algum arquivo passar de 400KB (e sugerir ajuste de qualidade ou altura máxima)
- Script "capture" no package.json funcionando

Escopo · não entra: componentes que exibem as imagens.

Critérios de aceite:
- pnpm capture gera os .webp de Bruna Magalhães e Alando Digital
- Dimensões corretas em projects.ts; arquivos abaixo de 400KB
- Script idempotente (rodar de novo sobrescreve sem duplicar)

Entrega: incluir as imagens geradas para o Douglas conferir (popups fechados, nada cortado).
Sugestão de commit: feat(portfolio): add capture script ... (imagens podem ir num commit separado: chore(portfolio): ...)
```

---

## Etapa 05 · Header + Footer 🔒

```
Objetivo: implementar header sticky e footer, incluindo o toggle de idioma.

Ler antes: LANDING-PAGE-SPEC.md (00 Header, 10 Footer, Hierarquia de CTAs), PRD.md (RF01, RF09 footer, RF10),
DESIGN-GUIDELINES.md (8: toggle de idioma, Sheet; 7 Iconografia).

Pré-requisitos: Etapas 02 e 03.

Escopo · entra:
- Header: wordmark em serifada, até 4 âncoras (Portfólio, Como funciona, Pacotes, Sobre), toggle "PT / EN" em mono com dois links reais,
  botão WhatsApp (ícone SVG próprio monocromático + rótulo). Transparente no topo; após rolar, fundo --paper com borda 1px, transição suave.
  Client component mínimo só para o estado de rolagem
- Mobile: wordmark + toggle + WhatsApp compacto; âncoras num Sheet
- Toggle mantém a âncora atual ao trocar de idioma; cookie de preferência
- Rolagem suave nas âncoras respeitando prefers-reduced-motion; scroll-margin-top nas seções
- Footer: nome + ano à esquerda; WhatsApp, LinkedIn e toggle à direita; linha opcional em mono
- Seções vazias com ids e títulos provisórios só para testar navegação (serão substituídas)
- tests/navigation.spec.ts: cada âncora leva à seção e o título não fica coberto pelo header, em 375/768/1440, incluindo entrada direta em /en#pacotes
- Ampliar i18n.spec: toggle troca idioma mantendo a âncora

Escopo · não entra: conteúdo das seções.

Critérios de aceite: fluxo padrão de seção (preâmbulo) concluído; testes passando; navegação completa por teclado.
Gate: Douglas revisa screenshots e testa o menu mobile.
Sugestão de commit: feat(header): ... e feat(footer): ...
```

---

## Etapa 06 · Hero 🔒

```
Objetivo: hero que comunica em 5 segundos: landing pages, feitas por um dev de verdade, rápido e com a cara da marca.

Ler antes: LANDING-PAGE-SPEC.md (Princípios, 01 Hero), DESIGN-GUIDELINES.md (2 Tipografia: regras, 3 Grid e assimetria, 5 Motion).

Pré-requisitos: Etapas 03, 04, 05.

Escopo · entra:
- Grid 12 colunas: 1 a 8 com rótulo mono, headline display-xl (ênfase em itálico, não em cor), subheadline, CTA WhatsApp (position: hero)
  + link textual para #portfolio; 9 a 12 com recorte de um screenshot do portfólio em moldura de navegador mínima, levemente deslocado do grid
- Linha opcional de 3 fatos curtos em mono separados por fio, só com fatos reais
- Mobile: coluna única, visual abaixo do CTA e menor
- Entrada única: fade + translateY 8 a 12px escalonado, ease-out, só no carregamento, CSS primeiro; desligada com reduced motion
- Imagem do hero com prioridade (LCP) e dimensões explícitas

Escopo · não entra: o componente completo de preview com rolagem (Etapa 07), mas extrair a moldura de navegador como componente reutilizável.

Critérios de aceite: fluxo padrão de seção; review-animations sem pendência bloqueante; CLS 0 no hero.
Gate: Douglas aprova o hero (é a primeira impressão do site inteiro).
Sugestão de commit: feat(hero): ...
```

---

## Etapa 07 · Portfólio 🔒

```
Objetivo: a seção mais importante: dois cases reais com preview que rola no hover.

Ler antes: LANDING-PAGE-SPEC.md (02 Portfólio), DESIGN-GUIDELINES.md (4 Sombras, 5 Motion: Preview do portfólio, 6 Imagens), PRD.md (RF02, Edge Cases).

Pré-requisitos: Etapas 04 e 06.

Escopo · entra:
- Cabeçalho à esquerda: rótulo "02 / portfólio" em mono + título + linha de apoio. Fundo surface conforme Ritmo visual
- Dois cards com larguras diferentes (ex.: 7/5), não grid de 3; layout preparado para 4+ projetos (primeiro em largura total)
- Card: janela com barra mínima (3 pontos neutros + domínio em mono), preview 16:10 com container-type size, screenshot full-page,
  rótulos mono (cliente, segmento, tipo), link "ver site ↗" em nova aba com rel noopener noreferrer
- Rolagem no hover exatamente como no CSS do DESIGN-GUIDELINES: só em (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference),
  delay 150ms, --scroll-duration inline calculado da altura (1s a cada 700px, mín 3s, máx 9s), volta em 700ms ease-out
- Foco por teclado: mesmo destaque visual do hover, sem rolagem
- Só transform; imagens lazy abaixo da dobra; alt traduzido
- tests/portfolio.spec.ts: imagens carregam, links corretos e externos, com reducedMotion: 'reduce' não há transform no hover

Critérios de aceite: fluxo padrão de seção; review-animations e, se fizer sentido, improve-animations; 60fps (só transform).
Gate: Douglas testa o hover em desktop e o comportamento em touch.
Sugestão de commit: feat(portfolio): ...
```

---

## Etapa 08 · Como funciona 🔒

```
Objetivo: mostrar que o processo é simples e que a identidade do cliente manda.

Ler antes: LANDING-PAGE-SPEC.md (03 Como funciona), PRD.md (RF03), DESIGN-GUIDELINES.md (1 accent-soft, 3 assimetria).

Pré-requisitos: Etapa 07.

Escopo · entra:
- Lista vertical numerada 01 a 04 com fios horizontais, número em mono grande à esquerda, título + descrição à direita (índice de revista, não cards)
- Bloco brand-first em destaque (fundo --accent-soft ou borda verde à esquerda)
- Bloco curto e separado sobre IA, sem ícone
- Motion opcional: fios "desenhando" uma vez ao entrar na viewport (scaleX), só se ajudar a leitura; senão, nenhum

Critérios de aceite: fluxo padrão de seção; layout diferente do portfólio e dos pacotes.
Gate: Douglas aprova.
Sugestão de commit: feat(process): ...
```

---

## Etapa 09 · Pacotes 🔒

```
Objetivo: dar referência de preço e facilitar a escolha.

Ler antes: LANDING-PAGE-SPEC.md (04 Pacotes, Hierarquia de CTAs), PRD.md (RF04), BRIEF.md (Modelo de Negócio).

Pré-requisitos: Etapa 08.

Escopo · entra:
- Dois blocos lado a lado (desktop), empilhados (mobile). Profissional em --accent com texto --on-accent; Essencial em papel com borda
- Ordem no bloco: nome → "a partir de" pequeno → preço display (maior elemento, tabular-nums) → lista com fios → CTA WhatsApp com mensagem do pacote
  (positions pricing-essencial / pricing-profissional)
- Notas abaixo em small: varia com a complexidade; domínio comprado pelo cliente; adicionais sob consulta
- Dados só de src/content/pricing.ts; formatação com Intl.NumberFormat BRL
- tests/cta.spec.ts: todo CTA de WhatsApp aponta para wa.me/5531991848090 com a mensagem do idioma e contexto certos; LinkedIn correto; externos em nova aba

Escopo · não entra: badge "mais popular", tabela de comparação, preço riscado.

Critérios de aceite: fluxo padrão de seção; contraste AA no bloco verde; foco em --on-accent sobre verde.
Gate: Douglas aprova.
Sugestão de commit: feat(pricing): ... e test(cta): ...
```

---

## Etapa 10 · Sobre mim 🔒

```
Objetivo: a pessoa real por trás, carregando a confiança enquanto não há depoimentos.

Ler antes: LANDING-PAGE-SPEC.md (05 Sobre mim), PRD.md (RF05), DESIGN-GUIDELINES.md (4 Forma, 6 Imagens).

Pré-requisitos: Etapa 09. Foto real do Douglas (se ainda não houver, implementar com um slot neutro em --surface na proporção retrato
e deixar a pendência registrada no log; nunca usar foto de banco ou gerada por IA).

Escopo · entra:
- Fundo surface. Foto retrato à esquerda (radius-xs ou sem raio), texto curto em primeira pessoa à direita, credenciais em mono, link LinkedIn
- Mobile: foto acima
- Linha honesta opcional sobre IA

Critérios de aceite: fluxo padrão de seção; foto via next/image com width/height e alt traduzido.
Gate: Douglas aprova (e fornece a foto, se faltar).
Sugestão de commit: feat(about): ...
```

---

## Etapa 11 · Outros projetos + Depoimentos (desligado)

```
Objetivo: prova técnica extra, subordinada ao portfólio; e componente de depoimentos pronto, porém invisível.

Ler antes: LANDING-PAGE-SPEC.md (06 Outros projetos, 07 Depoimentos), PRD.md (RF06, RF08).

Pré-requisitos: Etapa 10.

Escopo · entra:
- Outros projetos: lista em linhas estilo tabela editorial (nome · tipo · descrição · ↗), linha inteira clicável, hover sutil
  (fundo --accent-soft ou deslocamento da seta), Gasolinha com rótulo build-to-learn, sem screenshots; só itens com published: true
- Depoimentos: componente com citação grande + até 2 menores; renderiza só se testimonials.length > 0; sem conteúdo, não existe no DOM nem no nav
- Teste: com o array vazio, a seção não está no DOM. Validar o layout ligado só localmente (fixture de teste, nunca em produção)

Critérios de aceite: fluxo padrão de seção para Outros projetos; nenhum depoimento fictício no código de produção.
Sugestão de commit: feat(projects): ... e feat(testimonials): ...
```

---

## Etapa 12 · FAQ + CTA final 🔒

```
Objetivo: eliminar objeções e oferecer a última chance de conversão.

Ler antes: LANDING-PAGE-SPEC.md (08 FAQ, 09 CTA final, Ritmo visual), PRD.md (RF07, RF09), DESIGN-GUIDELINES.md (8 Accordion).

Pré-requisitos: Etapa 11.

Escopo · entra:
- FAQ: duas colunas no desktop, título sticky à esquerda dentro da seção, Accordion à direita com fios, + que gira 45° para ×, sem caixas
- CTA final: bloco largura total em --accent, headline serifada à esquerda, botão WhatsApp claro (variante on-accent, position: final) + LinkedIn como link
- Ampliar cta.spec com os CTAs novos

Critérios de aceite: fluxo padrão de seção; accordion acessível por teclado; review-animations no accordion.
Gate: Douglas aprova.
Sugestão de commit: feat(faq): ... e feat(final-cta): ...
```

---

## Etapa 13 · SEO + Analytics

```
Objetivo: deixar a página encontrável e medir a North Star.

Ler antes: PRD.md (Requisitos Não Funcionais: SEO e Privacidade, Integrações, Success Metrics), LANDING-PAGE-SPEC.md (Hierarquia de CTAs: evento).

Pré-requisitos: Etapa 12. Decisões do Douglas: domínio (ou URL .vercel.app provisória via variável pública) e Umami vs. Vercel Web Analytics.

Escopo · entra:
- generateMetadata por idioma (title, description, canonical, alternates com hreflang pt, en e x-default → PT)
- OG image por idioma (estática ou gerada com next/og; sem gradiente)
- sitemap.ts e robots.ts
- JSON-LD Person + ProfessionalService
- src/lib/analytics.ts: track('whatsapp_click', { position }) sem cookies; todos os CTAs de WhatsApp disparam com a position correta
  (header, hero, pricing-essencial, pricing-profissional, final)
- Garantir que tudo continua funcionando com JS desligado (links e preços visíveis)

Escopo · não entra: variáveis secretas (proibido), backend.

Critérios de aceite: metadata conferida no HTML gerado das duas rotas; JSON-LD válido; evento disparando (log local).
Sugestão de commit: feat(seo): ... e feat(analytics): ...
```

---

## Etapa 14 · Revisão da página inteira 🔒

```
Objetivo: olhar a página como um todo e fechar o Definition of Done.

Ler antes: MVP-SCOPE.md (Definition of Done), CLAUDE.md (Checklist antes de cada PR / deploy), DESIGN-GUIDELINES.md (10 Checklist visual), LANDING-PAGE-SPEC.md (Ritmo visual).

Pré-requisitos: Etapas 00 a 13.

Escopo · entra:
- break-ui: textos longos, EN, larguras extremas
- /impeccable audit (a11y, performance, responsivo) e corrigir
- tests/a11y.spec.ts com @axe-core/playwright sem violações sérias
- tests/visual.spec.ts: screenshots de página inteira por viewport e idioma (baseline após aprovação do Douglas)
- Lighthouse mobile e desktop, PT e EN: 95+ nas 4 categorias; LCP < 2s; CLS < 0.05
- Busca por U+2014 fora de instructions/ e CLAUDE.md sem resultado
- Varredura da lista "proibido" (visual e copy) e do checklist visual
- Conferir ritmo de fundos e que nenhuma seção repete o layout da anterior
- /impeccable polish por último

Entrega: relatório com cada item do DoD marcado (com evidência) e o que ficou pendente.
Gate: Douglas aprova a página inteira em PT e EN.
Sugestão de commit: provavelmente vários: test(a11y), test(visual), fix(...), style(polish).
```

---

## Etapa 15 · Deploy 🔒

```
Objetivo: publicar na Vercel.

Ler antes: MVP-SCOPE.md (Riscos de escopo: domínio), PRD.md (Constraints).

Pré-requisitos: Etapa 14 aprovada.

Escopo · entra:
- Guiar o Douglas na conexão do repo com a Vercel (ações na conta dele são feitas por ele)
- Conferir build de produção, rotas / e /en estáticas, sitemap/robots/hreflang com a URL final
- Se houver domínio: configurar e atualizar metadataBase; se não houver, lembrar o risco de divulgar em .vercel.app
- Lighthouse na URL publicada
- Ativar o analytics escolhido e confirmar o evento em produção

Entrega: URL publicada, resultados do Lighthouse em produção, pendências.
```

---

## Pendências abertas (decisões do Douglas)

| Pendência | Bloqueia | Status |
|---|---|---|
| Prazo padrão de entrega | Etapa 03 (FAQ) | aberto |
| Forma de pagamento | Etapa 03 (FAQ) | aberto |
| Rodadas de alteração inclusas | Etapa 03 (FAQ) | aberto |
| Foto profissional | Etapa 10 | aberto |
| Umami ou Vercel Web Analytics | Etapa 13 | aberto |
| Domínio | Etapas 13 e 15 | aberto |

---

## Log de progresso

| Etapa | Status | Data | Commit | Pendências |
|---|---|---|---|---|
| 00 Bootstrap | concluída | 2026-10-03 | | Next 16.3.8, pnpm 12.8.1 (brew). `pnpm test` só funciona após a Etapa 01 (Playwright). `pnpm-workspace.yaml` bloqueia build do sharp; rever na Etapa 04 |
| 01 Skills | concluída | 2026-10-03 | | Instalação via flags não interativas (impeccable `--project --providers=claude`; skills CLI `--copy`). Playwright 1.63.0. PRODUCT.md completo na raiz (exceção à regra de raiz, aprovada). `.claude/**` fora do ESLint. `skills-lock.json` versionado. Hooks do impeccable só locais (`settings.local.json`). Instalação global acidental removida. Pendente: confirmar se o binário do impeccable (14MB) vai para o `.gitignore` |
| 02 Fundação | aguardando gate | 2026-10-03 | | next-intl 4.14.9, shadcn (radix) com clsx + tailwind-merge no lugar do pacote `cn` e sem `tw-animate-css` (keyframes próprios). Paleta padrão do Tailwind apagada (`--color-*: initial`). Cookie `NEXT_LOCALE` gravado sem redirecionar. `@parcel/watcher` e `@swc/core` com build bloqueado no `pnpm-workspace.yaml`. Pendente: apagar `src/app/[locale]/preview/` e as chaves `preview` após o gate; `height` dos screenshots vem na Etapa 04; URL do Poupensa |
| 03 Copy PT/EN | a fazer | | | |
| 04 Captura do portfólio | a fazer | | | |
| 05 Header + Footer | a fazer | | | |
| 06 Hero | a fazer | | | |
| 07 Portfólio | a fazer | | | |
| 08 Como funciona | a fazer | | | |
| 09 Pacotes | a fazer | | | |
| 10 Sobre mim | a fazer | | | |
| 11 Outros projetos + Depoimentos | a fazer | | | |
| 12 FAQ + CTA final | a fazer | | | |
| 13 SEO + Analytics | a fazer | | | |
| 14 Revisão da página inteira | a fazer | | | |
| 15 Deploy | a fazer | | | |
