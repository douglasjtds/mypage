# CLAUDE.md · mypage

Site one-page bilíngue (PT/EN) que vende o serviço de landing pages do **Douglas Tertuliano** como freelancer. O próprio site é a principal peça de portfólio: ele precisa parecer feito por uma pessoa com critério, **nunca** por um gerador de sites com IA.

## Fonte da verdade

Antes de qualquer tarefa, ler os documentos em `instructions/`:

| Arquivo | Para quê |
|---|---|
| `instructions/BRIEF.md` | Posicionamento, público, preços, métricas |
| `instructions/PRD.md` | Requisitos funcionais e não funcionais, edge cases, critérios de aceite |
| `instructions/MVP-SCOPE.md` | O que entra e o que não entra; Definition of Done |
| `instructions/LANDING-PAGE-SPEC.md` | Estrutura e layout de cada seção (sem copy) |
| `instructions/DESIGN-GUIDELINES.md` | Tokens, tipografia, motion, uso de shadcn/ui |

Não editar arquivos de `instructions/` sem pedido explícito do Douglas. Se uma tarefa conflitar com eles, parar e perguntar.

---

## Stack

- Next.js (App Router) + TypeScript (strict) + Tailwind CSS
- shadcn/ui só como primitivos, sempre restilizados com os tokens do projeto
- next-intl (`localePrefix: 'as-needed'`: PT em `/`, EN em `/en`, PT padrão, sem detecção automática)
- Motion: CSS primeiro; `motion/react` só quando CSS não resolver. **Não usar GSAP**
- Playwright para testes e geração de screenshots do portfólio
- Gerenciador de pacotes: **pnpm**
- Deploy: Vercel

**Projeto 100% frontend, permanentemente.** Proibido adicionar Supabase, banco, API routes com lógica, server actions de formulário ou variáveis secretas. A conversão é sempre um link `wa.me`.

---

## Skills obrigatórias

As skills ficam **versionadas no repo** em `.claude/skills/` para que qualquer máquina ou sessão tenha as mesmas regras. Não colocar `.claude/skills/` no `.gitignore`.

### Instalação (uma vez, na raiz do repo)

```bash
# Impeccable: design e revisão
npx impeccable install

# Taste: anti cara de IA (somente a skill principal)
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend" -a claude-code

# Emil Kowalski: motion, layout e acabamento
npx skills@latest add emilkowalski/skills -a claude-code
#   no prompt, selecionar só as skills web: emil-design-eng, animate, review-animations,
#   improve-animations, find-animation-opportunities, animation-vocabulary, break-ui
#   (não instalar animate-expo, write-swift, mobile-native)

# Playwright
pnpm add -D @playwright/test && pnpm exec playwright install chromium
```

Depois da instalação, rodar `/impeccable init` usando `instructions/BRIEF.md` e `instructions/DESIGN-GUIDELINES.md` como contexto do produto.

### Quando usar cada uma

| Momento | Skill / comando |
|---|---|
| Antes de construir uma seção | `/impeccable shape` com a seção do LANDING-PAGE-SPEC |
| Decisões de animação, layout e acabamento visual | **emilkowalski/skills** (`emil-design-eng`, `animate`) é a referência principal |
| Depois de implementar uma seção | `/impeccable critique` + skill Taste (`design-taste-frontend`) |
| Revisão de animações | `review-animations`, depois `improve-animations` se necessário |
| Procurar onde motion ajuda (com parcimônia) | `find-animation-opportunities` |
| Testar robustez da UI (textos longos, EN, estados vazios) | `break-ui` |
| Qualidade técnica (a11y, performance, responsivo) | `/impeccable audit` |
| Acabamento final antes de publicar | `/impeccable polish` |
| Copy (PT e EN) | skill **marketing-writer** (da conta do Douglas), seguindo as regras de copy abaixo |

### Quando as skills discordarem

Ordem de prioridade: `instructions/DESIGN-GUIDELINES.md` → emilkowalski/skills (motion, layout e acabamento) → Impeccable → Taste. Exemplo: Taste traz templates de GSAP; neste projeto, motion segue as regras de Emil e do DESIGN-GUIDELINES, sem GSAP. Ao usar Taste, mirar em variação alta, intensidade de motion baixa e densidade visual baixa.

---

## Regras "sem cara de IA"

### Visual: proibido
- Gradientes (qualquer um), principalmente roxo/azul/rosa
- Glassmorphism, blur de fundo decorativo, glow, neon
- Fundo com grid, pontos, noise ou blobs decorativos
- Grid de 3 cards idênticos com ícone + título + texto
- Hero centralizado com badge "✨ Novo" ou similar
- Ícones como decoração de título ou card; emojis na interface
- Rótulos em CAIXA ALTA espaçada (usar mono minúsculo numerado: `02 / portfólio`)
- `rounded-full` em botões, cantos de 16px+, sombras em tudo
- Inter, Geist, Poppins, Montserrat
- Contadores animados ("+100 clientes"), carrosséis, marquee de logos
- Mais de uma cor de acento; preto `#000` e branco `#FFF` puros
- Animações em loop, parallax, scroll-jacking, 3D
- Repetir a assinatura visual dos clientes do portfólio (fundo creme quente + verde escuro + título serifado)

### Copy: proibido
- Travessão (—) em qualquer texto, PT ou EN. Usar vírgula, dois pontos, parênteses ou ponto
- Clichês: "transforme seu negócio", "eleve sua marca", "soluções inovadoras", "no mundo digital de hoje", "leve seu negócio ao próximo nível", "unlock", "elevate", "seamless", "cutting-edge", "game-changer"
- Tríades decorativas ("rápido, moderno e eficiente") e perguntas retóricas em série
- Números ou depoimentos inventados
- Esconder o uso de IA. A regra é ser honesto: IA acelera o processo, o critério e o código são do Douglas

### Copy: obrigatório
- Frases curtas, concretas, em primeira pessoa quando falar do Douglas
- Mensagem de brand-first: se o cliente já tem identidade visual, paleta e guidelines, o site é 100% baseado nelas; quanto mais material ele enviar, mais a página fica com a cara dele
- Atende qualquer tipo de negócio, com exemplos focados em autônomos e pequenos negócios
- Preço sempre como "a partir de", com nota de que varia conforme a complexidade

---

## Regras de código

- **Nenhuma string visível hardcoded.** Todo texto em `messages/pt.json` e `messages/en.json`, com as mesmas chaves
- Conteúdo em arquivos tipados, não em componentes:
  - `src/content/projects.ts` (portfólio e outros projetos, com largura/altura do screenshot e flag `published`)
  - `src/content/pricing.ts` (pacotes e valores)
  - `src/content/testimonials.ts` (vazio até existirem depoimentos reais; seção não renderiza se vazio)
  - `src/content/links.ts` (WhatsApp, LinkedIn)
- Links do WhatsApp gerados só por `buildWhatsAppUrl({ locale, context })` em `src/lib/whatsapp.ts`. Número: `5531991848090`. Mensagem PT padrão: "Olá, vi seu site e gostaria de falar sobre a construção de uma Landing Page pra minha marca"
- LinkedIn: `https://www.linkedin.com/in/douglasjtds/`
- Server Components por padrão; `"use client"` só onde há interação real
- Tokens de cor, fonte, raio e sombra definidos uma vez (CSS variables + tema do Tailwind). Proibido usar cores arbitrárias (`bg-[#...]`) em componentes
- Links externos: `target="_blank" rel="noopener noreferrer"`
- `next/image` com `width`/`height` explícitos; screenshots em `.webp`
- Acessibilidade: semântica correta (`header`, `main`, `section` com `aria-labelledby`, `footer`), foco visível, ordem de tabulação lógica, `alt` traduzido

### Disciplina de arquivos
- Não mover, renomear ou apagar arquivos fora do escopo da tarefa
- Não criar arquivos na raiz além dos de configuração padrão
- Não editar `.claude/skills/` (são dependências versionadas; atualizar só reinstalando)

### Estrutura de pastas

```
mypage/
├── CLAUDE.md
├── instructions/            # specs (fonte da verdade)
├── .claude/skills/          # skills versionadas
├── messages/                # pt.json, en.json
├── public/portfolio/        # screenshots .webp gerados
├── scripts/capture-portfolio.ts
├── src/
│   ├── app/[locale]/        # layout + page
│   ├── components/sections/ # uma pasta/arquivo por seção do spec
│   ├── components/ui/       # primitivos shadcn restilizados
│   ├── content/             # dados tipados
│   ├── i18n/                # config next-intl
│   └── lib/                 # whatsapp, analytics, utils
└── tests/                   # Playwright
```

---

## Testes (Playwright)

Rodar em Chromium nos viewports **375, 768 e 1440**, nas duas línguas.

| Spec | Verifica |
|---|---|
| `i18n.spec.ts` | `pt.json` e `en.json` com as mesmas chaves; `/en` sem texto em PT; `<html lang>` correto; toggle troca idioma mantendo a âncora |
| `cta.spec.ts` | Todo CTA de WhatsApp aponta para `wa.me/5531991848090` com mensagem do idioma certo; LinkedIn correto; externos em nova aba |
| `navigation.spec.ts` | Âncoras do header levam à seção e o título não fica coberto |
| `portfolio.spec.ts` | Imagens carregam; links corretos; com `reducedMotion: 'reduce'` não há transform no hover |
| `visual.spec.ts` | Screenshots de página inteira por viewport e idioma para revisão (comparação com baseline após aprovação) |
| `a11y.spec.ts` | `@axe-core/playwright` sem violações sérias |

Script `pnpm capture`: abre cada site do portfólio em 1440px, fecha popups, captura página inteira e salva `.webp` em `public/portfolio/`, atualizando largura/altura em `projects.ts`.

---

## Fluxo por seção

1. Ler a seção no `LANDING-PAGE-SPEC.md`
2. `/impeccable shape`
3. Implementar (strings nos dois JSONs)
4. Rodar Playwright e olhar os screenshots nos 3 viewports e 2 idiomas
5. `/impeccable critique` + Taste; ajustar
6. Se tiver motion: `review-animations`
7. Só então seguir para a próxima seção

## Checklist antes de cada PR / deploy

- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test` passando
- [ ] Nenhum item da lista "proibido" presente (visual e copy)
- [ ] Busca por `—` no projeto (fora de `instructions/` e `CLAUDE.md`) sem resultados
- [ ] PT e EN revisados visualmente
- [ ] Lighthouse 95+ (mobile) nas 4 categorias
- [ ] `prefers-reduced-motion` testado
- [ ] Nenhum depoimento ou número inventado

## Comandos

```bash
pnpm dev           # desenvolvimento
pnpm build         # build de produção
pnpm lint          # eslint
pnpm typecheck     # tsc --noEmit
pnpm test          # playwright
pnpm capture       # gera screenshots do portfólio
```
