# Douglas Tertuliano · Landing Pages

**Autor:** Douglas Tertuliano
**Data:** 02/10/2026
**Status:** Approved

---

## Overview

Site one-page, bilíngue (PT/EN), que vende o serviço de criação de landing pages do Douglas como freelancer, sob marca pessoal. O próprio site é a principal peça de portfólio: se ele tiver cara de template ou de "feito por IA", ele desmente o que vende.

---

## Problem

### O que está acontecendo?
Douglas já entrega landing pages (Bruna Magalhães, Alando Digital) mas não tem uma vitrine própria para mostrar o trabalho, explicar como funciona e transformar visitantes em conversas no WhatsApp.

### Quem é afetado?
Potenciais clientes que chegam por indicação, LinkedIn ou Instagram e não têm onde ver portfólio, preço e processo antes de chamar.

### Qual o custo de não resolver?
Cada contato vira uma explicação manual do zero, sem prova visual organizada. Clientes desistem antes de chamar por falta de referência de preço e de trabalho anterior.

### Como resolvem hoje?
Mandando links soltos pelo WhatsApp e explicando preço e processo caso a caso.

---

## Goals

- [ ] **Gerar contatos qualificados** → Métrica: cliques no CTA do WhatsApp por mês (meta: 10 em 3 meses)
- [ ] **Converter visita em conversa** → Métrica: taxa de clique no CTA acima de 5% das visitas
- [ ] **Provar qualidade técnica pelo próprio site** → Métrica: Lighthouse 95+ nas 4 categorias, mobile e desktop
- [ ] **Alcançar público internacional no futuro** → Métrica: versão EN completa e indexada (hreflang)

---

## Non-Goals

- ❌ Backend, banco de dados, Supabase ou qualquer API própria (projeto 100% frontend, permanente)
- ❌ Formulário de contato (conversão é sempre via link do WhatsApp)
- ❌ Blog ou CMS
- ❌ Agendamento, pagamento online, área do cliente
- ❌ Dark mode no MVP
- ❌ Depoimentos com conteúdo inventado (seção só aparece com depoimentos reais)

---

## User Stories

### Persona 1: Camila, profissional autônoma

> Psicóloga, 34 anos, atende online e presencial. Divulga pelo Instagram, mas quer uma página profissional para passar credibilidade e receber pacientes pelo WhatsApp. Já tem logo e paleta feitas por uma designer. Medo: pagar caro e receber algo que não tem a cara dela.

- Como Camila, eu quero ver landing pages reais que o Douglas já fez para saber se o estilo dele serve para mim
- Como Camila, eu quero saber que minha identidade visual atual vai ser respeitada para não ter que refazer minha marca
- Como Camila, eu quero ver o preço antes de chamar para não perder tempo se estiver fora do meu orçamento
- Como Camila, eu quero falar direto no WhatsApp para tirar dúvidas do jeito que já estou acostumada

### Persona 2: Rogério, pequeno negócio local

> Dono de uma distribuidora/loja/agência pequena, 45 anos. Não tem site ou tem um muito antigo. Não entende de tecnologia e não quer entender. Quer saber quanto custa, quanto demora e o que precisa mandar.

- Como Rogério, eu quero entender o processo em poucos passos para saber o que vou precisar fazer
- Como Rogério, eu quero saber a diferença entre os pacotes para escolher sem precisar perguntar
- Como Rogério, eu quero entender o que é domínio próprio e quem paga por ele para não ter surpresa
- Como Rogério, eu quero saber que tem uma pessoa real por trás para confiar meu dinheiro

### Persona 3: Larissa, infoprodutora

> Vende um ebook e mentoria pelo Instagram. Precisa de página de vendas rápida, bonita e que carregue rápido no celular.

- Como Larissa, eu quero ver que o Douglas também faz páginas para produto digital para saber que ele atende meu caso
- Como Larissa, eu quero saber o prazo de entrega para planejar meu lançamento

### Persona 4: Cliente internacional (secundária)

- Como cliente que não fala português, eu quero trocar o site para inglês num botão discreto para entender o serviço

---

## Solution

### Visão Geral

Uma página única, rápida e editorial, construída em Next.js e publicada na Vercel. A ordem das seções constrói valor antes de mostrar o preço: posicionamento, prova (portfólio), processo, preço, pessoa por trás, prova técnica extra, objeções e CTA final.

Toda conversão acontece pelo link do WhatsApp com mensagem pré-preenchida. O LinkedIn aparece como reforço de credibilidade.

O portfólio é o coração visual: cada landing page aparece como uma "janela" com screenshot de página inteira. No desktop, passar o mouse faz o site rolar dentro da janela, mostrando a página completa.

### Features Principais

| Feature | Descrição | Prioridade |
|---|---|---|
| Hero | Posicionamento (dev de verdade + IA como acelerador) + CTA WhatsApp | Must have |
| Portfólio de landing pages | Cards com preview animado no hover (desktop) | Must have |
| Como funciona | Processo em 3 a 4 passos, inclui brand-first e papel da IA | Must have |
| Pacotes | Essencial (a partir de R$400) e Profissional (a partir de R$550) | Must have |
| Sobre mim | Foto, credenciais reais, LinkedIn | Must have |
| CTA final + Footer | WhatsApp, LinkedIn, copyright | Must have |
| i18n PT/EN | Toggle discreto no header, PT padrão | Must have |
| SEO técnico | Meta, OG image, hreflang, sitemap, JSON-LD | Must have |
| Outros projetos | SaaS (Gasolinha) + ferramentas, em formato compacto | Should have |
| FAQ | Objeções: prazo, material, alterações, domínio, pagamento | Should have |
| Depoimentos | Componente pronto, desligado por flag até haver conteúdo real | Could have |
| Analytics de clique | Evento por posição do CTA | Should have |

### User Flow

1. Visitante chega (Instagram, LinkedIn, indicação, Google)
2. Lê o hero e entende em 5 segundos: landing pages, feitas por um dev, rápido e com a cara da marca
3. Rola até o portfólio, passa o mouse nos trabalhos e abre algum em nova aba
4. Lê como funciona e entende que a identidade visual dele será usada
5. Vê os pacotes e o preço "a partir de"
6. Confere quem é o Douglas (sobre mim, LinkedIn)
7. Tira dúvidas no FAQ
8. Clica no CTA e cai no WhatsApp com mensagem pronta

---

## Requisitos Funcionais

### RF01: Header
- Nome "Douglas Tertuliano" como marca (texto, sem logo gráfico no MVP)
- Links âncora para as seções principais (máx. 4)
- Toggle de idioma discreto (PT/EN)
- CTA WhatsApp
- Sticky com transição de fundo ao rolar
- Mobile: menu compacto, toggle de idioma e CTA continuam acessíveis

**Aceite:** âncoras rolam suavemente até a seção (respeitando `prefers-reduced-motion`); o header não cobre o título da seção ao navegar (`scroll-margin-top`).

### RF02: Portfólio de landing pages
- Itens: Bruna Magalhães (`https://bruna-magalhaes.vercel.app/`) e Alando Digital (`https://alandodigital.com.br/`)
- Cada card: screenshot full-page, nome do cliente, tipo de projeto, segmento, link "ver site"
- Desktop (`hover: hover` e `pointer: fine`): no hover, a imagem rola de cima até o fim; ao sair, volta ao topo mais rápido
- Duração da rolagem proporcional à altura da imagem (ver DESIGN-GUIDELINES)
- Touch: imagem estática mostrando o topo; toque abre o site em nova aba
- `prefers-reduced-motion`: sem rolagem automática
- Dados vêm de um arquivo tipado (`src/content/projects.ts`) para adicionar projetos sem mexer em componente
- Screenshots geradas por script Playwright (`pnpm capture`) em `.webp`

**Aceite:** links abrem em nova aba com `rel="noopener noreferrer"`; imagem com `alt` descritivo traduzido; animação roda a 60fps (só `transform`); nenhuma imagem acima de 400KB.

### RF03: Como funciona
- 3 a 4 passos: conversa no WhatsApp → envio de material da marca → desenvolvimento → publicação
- Mensagem obrigatória: se o cliente já tem identidade visual, o site é 100% baseado nela; quanto mais material, mais a página fica com a cara dele
- Mensagem obrigatória: IA é usada como acelerador do processo, com critério e código de um desenvolvedor

### RF04: Pacotes
- Dois pacotes, valores "a partir de", com nota clara de que o valor varia conforme a complexidade
- Profissional como pacote destacado
- Nota explicando que o domínio é comprado pelo cliente (custo anual pago direto ao registrador)
- CTA WhatsApp por pacote, com mensagem pré-preenchida mencionando o pacote

**Aceite:** preços vêm de config única (`src/content/pricing.ts`), formatados com `Intl.NumberFormat` (BRL nas duas línguas).

### RF05: Sobre mim
- Foto real do Douglas
- Credenciais: dev fullstack, ~8 anos, stack, experiência em empresas de grande porte
- Link para LinkedIn (`https://www.linkedin.com/in/douglasjtds/`)

### RF06: Outros projetos
- SaaS: Gasolinha (`https://gasolinha.com.br/`), com rótulo "build-to-learn"
- Ferramentas: Link para WhatsApp (`https://link-to-whatsapp.vercel.app/`), Santo Rosário (`https://santo-rosario-dojotes.vercel.app/`), Gerador de QR Code (`https://douglasjtds.github.io/qr-code-generator/`)
- Poupensa: entra apenas quando publicado (flag no arquivo de dados)
- Formato compacto (lista/linhas), visualmente subordinado ao portfólio principal

### RF07: FAQ
- 5 a 7 perguntas em accordion
- Temas: prazo de entrega, o que o cliente precisa enviar, quantas alterações, como funciona o domínio, forma de pagamento, e se atende qualquer segmento

### RF08: Depoimentos (desligado)
- Componente implementado e testado, renderizado só se `testimonials.length > 0`
- Nunca usar placeholder ou depoimento fictício em produção

### RF09: CTA final e Footer
- CTA final com WhatsApp (primário) e LinkedIn (secundário)
- Footer: nome, ano, links, toggle de idioma

### RF10: Internacionalização
- `next-intl` com `localePrefix: 'as-needed'`: PT em `/`, EN em `/en`
- Toggle troca de idioma mantendo a âncora atual
- Detecção automática de idioma desligada (padrão sempre PT); escolha do usuário persistida em cookie
- Todas as strings em `messages/pt.json` e `messages/en.json`, nenhuma string visível hardcoded
- Mensagem do WhatsApp também traduzida
- `<html lang>` correto por locale, `hreflang` e `x-default` apontando para PT

**Aceite:** teste Playwright garante que as chaves de `pt.json` e `en.json` são idênticas e que a página EN não contém texto em português.

---

## Requisitos Não Funcionais

| Requisito | Critério |
|---|---|
| Performance | Lighthouse 95+ mobile e desktop; LCP < 2s; CLS < 0.05; JS de cliente mínimo (Server Components por padrão) |
| Acessibilidade | WCAG 2.1 AA; navegação completa por teclado; foco visível; contraste AA; `prefers-reduced-motion` respeitado |
| SEO | Title/description por idioma; OG image por idioma; `sitemap.xml`; `robots.txt`; JSON-LD `Person` + `ProfessionalService` |
| Responsividade | Testado em 375px, 768px, 1440px |
| Imagens | `next/image`, `.webp`/`.avif`, dimensões explícitas, lazy abaixo da dobra |
| Fontes | `next/font/google`, subset latin, `display: swap` |
| Qualidade visual | Passar nas revisões de Impeccable, Taste e emil-design-eng (ver CLAUDE.md) |
| Privacidade | Analytics sem cookies (Umami ou Vercel Web Analytics) |

---

## Technical Approach

### Stack
- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS
- **UI:** shadcn/ui como base de primitivos (Accordion, Button, Sheet, Separator), restilizados. Toggle de idioma são dois links reais, não dropdown
- **i18n:** next-intl
- **Motion:** CSS transitions; `motion/react` apenas quando CSS não resolver
- **Testes:** Playwright
- **Infra:** Vercel
- **Backend:** nenhum

### Arquitetura

```
[Visitante] → [Vercel CDN] → [Next.js SSG: / e /en]
                                   ↓
                        [Link wa.me com mensagem]
```

### Integrações
- [x] WhatsApp (link `wa.me`, sem API)
- [x] LinkedIn (link)
- [ ] Analytics (Umami Cloud ou Vercel Web Analytics, decidir no setup)

### Constraints
- Zero backend, zero banco, zero variáveis secretas
- Páginas geradas estaticamente

---

## Edge Cases

| Caso | Comportamento esperado |
|---|---|
| Desktop sem WhatsApp instalado | `wa.me` abre o WhatsApp Web; link sempre em nova aba |
| Site do portfólio fora do ar | Card continua útil porque o preview é screenshot local; link externo é secundário |
| Tela touch grande (iPad, notebook touch) | Usar media query `(hover: hover) and (pointer: fine)` em vez de largura de tela |
| Texto EN mais longo que PT | Layout testado nos dois idiomas; nada de largura fixa em botões |
| Usuário com movimento reduzido | Sem rolagem automática, sem animações de entrada |
| JavaScript desligado | Conteúdo, links e preços visíveis (SSG); só perde animações |
| Screenshot muito alta (página longa) | Duração da rolagem limitada a um teto (ver DESIGN-GUIDELINES) |
| Ninguém tem depoimento ainda | Seção não renderiza, sem buraco no layout nem link no nav |
| Visitante entra direto em `/en#pacotes` | Âncora funciona e o header não cobre o título |

---

## Success Metrics

| Métrica | Baseline | Target (3 meses) | Como medir |
|---|---|---|---|
| Cliques no CTA WhatsApp | 0 | 10+ | Evento de analytics `whatsapp_click` com propriedade `position` |
| Taxa de clique no CTA | n/a | > 5% das visitas | Cliques / visitas únicas |
| Projetos fechados via site | 0 | 3 | Pergunta "como me achou?" no WhatsApp |
| Lighthouse | n/a | 95+ x4 | Lighthouse CI ou PageSpeed |

---

## Risks & Assumptions

### Assumptions
- Clientes desse público preferem WhatsApp a formulário
- Mostrar preço aumenta a qualidade dos contatos
- Dois cases de landing page são suficientes para começar

### Risks
| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Site com cara de template/IA | Média | Alto | Regras e revisões obrigatórias no CLAUDE.md |
| Vender "domínio próprio" num site `.vercel.app` | Alta | Médio | Comprar domínio próprio antes de divulgar |
| Portfólio pequeno (2 landing pages) | Alta | Médio | Outros projetos como prova técnica; adicionar cada novo cliente |
| Sem depoimentos no lançamento | Alta | Médio | Sobre mim forte; buscar depoimentos com clientes atuais |
| Preço baixo atraindo só caçador de preço | Média | Médio | Preço aparece depois do portfólio e processo; "a partir de" |

---

## Open Questions

- [ ] Qual domínio usar? (sugestão: `douglastertuliano.com.br` ou `.dev`)
- [ ] Umami ou Vercel Web Analytics?
- [ ] Prazo padrão de entrega para comunicar no FAQ
- [ ] Forma de pagamento (Pix, entrada + restante?)
- [ ] Quantas rodadas de alteração estão inclusas
- [ ] Foto profissional para o "sobre mim"

---

## Appendix

### Referências
- Contexto do mercado (não copiar): https://siteporai.com.br/siteporai/
- Ver DESIGN-GUIDELINES.md para referências visuais

### Competitors
- Sites "feitos por IA" (ex.: siteporai)
- Construtores: Wix, Canva Sites
- Freelancers em marketplaces (Workana, 99Freelas)
