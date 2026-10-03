# Design Guidelines · Douglas Tertuliano

> Direção: **editorial, quente e contida.** Papel, tinta e um único verde escuro. A tipografia é o principal elemento visual. A página deve parecer feita por uma pessoa com critério, não montada a partir de um kit.

Este documento substitui, para este projeto, a referência padrão "Linear / Resend / Vercel" do template. Aquela estética (fundo neutro frio, Inter, gradiente, cards com glow) virou a cara padrão de site gerado por IA, que é exatamente o que este site não pode parecer.

---

## 1. Cores

### Tokens

| Token | Hex | Uso |
|---|---|---|
| `--paper` | `#F5F2EA` | Fundo principal |
| `--surface` | `#EDE8DC` | Faixas alternadas, sobre mim, áreas de destaque sutil |
| `--raised` | `#FBFAF6` | Interior das janelas do portfólio, popovers |
| `--ink` | `#151815` | Texto principal, títulos |
| `--ink-muted` | `#545950` | Texto secundário, descrições |
| `--line` | `#D9D3C4` | Fios, bordas, divisórias |
| `--accent` | `#1E4636` | Verde escuro: CTA primário, pacote destacado, CTA final, links |
| `--accent-hover` | `#163428` | Hover/active do accent |
| `--accent-soft` | `#DCE5DC` | Fundos de destaque claros (bloco brand-first, hover de linhas) |
| `--on-accent` | `#F5F2EA` | Texto sobre verde escuro |
| `--on-accent-muted` | `#B9CBBE` | Texto secundário sobre verde escuro |

### Regras
- **Um acento só.** Nada de segunda cor de destaque, nada de gradiente.
- Verde escuro é escasso: CTA, pacote Profissional, CTA final e detalhes. Se a página parecer "verde", tem verde demais.
- Pretos e brancos puros (`#000`, `#FFF`) são proibidos. Usar `--ink` e `--paper`.
- Texto sobre `--paper` e `--surface` só em `--ink` ou `--ink-muted` (ambos AA).
- Estados de foco: anel de 2px em `--accent` com offset de 2px. Sobre fundo verde, anel em `--on-accent`.
- Ícone do WhatsApp segue a cor do texto do botão. Não usar o verde oficial do WhatsApp.

---

## 2. Tipografia

| Papel | Fonte | Pesos | Uso |
|---|---|---|---|
| Display | **Instrument Serif** (Google Fonts) | 400, 400 itálico | Headlines, preços, wordmark, citações |
| Texto | **Hanken Grotesk** (Google Fonts) | 400, 500, 600 | Corpo, botões, navegação |
| Mono | **JetBrains Mono** (Google Fonts) | 400, 500 | Rótulos de seção, numeração, metadados, toggle de idioma |

Carregar com `next/font/google`, subset `latin` (inclui acentos do PT), `display: swap`, como CSS variables (`--font-display`, `--font-sans`, `--font-mono`).

### Escala

| Token | Tamanho | Line-height | Tracking | Fonte |
|---|---|---|---|---|
| `display-xl` | `clamp(3rem, 7.5vw, 6.5rem)` | 0.95 | -0.02em | Display |
| `display-l` | `clamp(2.25rem, 4.5vw, 3.75rem)` | 1.0 | -0.015em | Display |
| `display-m` | `clamp(1.75rem, 3vw, 2.5rem)` | 1.1 | -0.01em | Display |
| `body-l` | `1.25rem` | 1.5 | 0 | Texto |
| `body` | `1.0625rem` | 1.6 | 0 | Texto |
| `small` | `0.875rem` | 1.5 | 0 | Texto |
| `label` | `0.75rem` | 1.4 | 0.02em | Mono |

### Regras
- Itálico da serifada é a ferramenta de ênfase dentro de headlines (uma palavra ou expressão, não a frase toda). Não usar cor para ênfase em headline.
- Rótulos de seção em mono, **minúsculos**, com numeração: `02 / portfólio`. Não usar rótulos em caixa alta espaçada (padrão saturado).
- Largura de leitura: 60 a 70 caracteres (`max-width: 65ch`) para parágrafos.
- Headlines alinhadas à esquerda. Centralizado só no CTA final, se fizer sentido.
- Números (preços, anos, passos) usam `font-variant-numeric: tabular-nums` quando alinhados.

---

## 3. Espaçamento e grid

**Base 4px.** Escala: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160`.

| Contexto | Valor |
|---|---|
| Padding vertical de seção | `clamp(96px, 12vw, 160px)` |
| Gutter lateral | 16px mobile, 24px tablet, 32px desktop |
| Largura máxima do conteúdo | 1280px |
| Grid | 12 colunas desktop, 4 colunas mobile, gap 24px |
| Distância título → conteúdo da seção | 48 a 64px |

**Regra de assimetria:** pelo menos metade das seções usa layout assimétrico (ex.: 5/7, 4/8, texto deslocado do eixo). Simetria perfeita em todas as seções é o primeiro sinal de template.

---

## 4. Forma

| Token | Valor | Uso |
|---|---|---|
| `--radius-xs` | 2px | Tags, rótulos |
| `--radius-sm` | 4px | Botões, toggle, inputs |
| `--radius-md` | 8px | Janelas do portfólio, blocos de pacote |

Nada de `rounded-full` em botões nem cantos de 16px+. Foto do "sobre mim" com `--radius-xs` ou sem raio.

### Sombras
Uma única sombra no sistema, usada apenas nas janelas do portfólio:

```css
--shadow-window: 0 1px 0 var(--line), 0 24px 48px -24px rgb(21 24 21 / 0.18);
```

Separação de elementos é feita por fios (`1px solid var(--line)`) e mudança de fundo, não por sombra.

---

## 5. Motion

Seguir as skills de Emil Kowalski (`emil-design-eng`, `animate`, `review-animations`). Resumo das regras do projeto:

### Princípios
- Animar apenas `transform` e `opacity`.
- **Entradas e respostas a interação usam ease-out.** Nunca `ease-in` para algo que aparece.
- Curva padrão: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`.
- Curva para movimentos contínuos (rolagem do portfólio): `--ease-in-out: cubic-bezier(0.45, 0, 0.55, 1)`.
- Durações de UI: 150 a 250ms. Nada de interface acima de 400ms, exceto a rolagem do portfólio.
- Botões: `:active` com `scale(0.97)` em 150ms.
- Animações de entrada na viewport: no máximo uma vez, sutis (opacity + translateY de 8 a 12px), só onde ajudam a leitura. Não animar tudo.
- `prefers-reduced-motion: reduce` desliga rolagem do portfólio e animações de entrada; mantém transições de cor.

### Preview do portfólio (especificação)

Estrutura: moldura com `aspect-ratio: 16 / 10`, `overflow: hidden`, `container-type: size`; dentro, a imagem full-page com `width: 100%` e `height: auto`.

```css
.preview-img {
  transform: translateY(0);
  transition: transform 700ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .preview:hover .preview-img {
    /* desce até mostrar o rodapé do site */
    transform: translateY(calc(-100% + 100cqh));
    transition: transform var(--scroll-duration) var(--ease-in-out) 150ms;
  }
}
```

- `--scroll-duration` é calculado a partir da altura do screenshot: **aprox. 1s a cada 700px de rolagem, mínimo 3s, máximo 9s.** Definido inline pelo componente com base nas dimensões conhecidas da imagem (vindas de `projects.ts`).
- Delay de 150ms no hover evita disparo ao só passar o mouse por cima.
- Ao sair, volta em 700ms com ease-out (mais rápido que a ida).
- Touch e movimento reduzido: imagem parada no topo.

---

## 6. Imagens

- Screenshots do portfólio: gerados por Playwright em viewport 1440px de largura, página inteira, exportados em `.webp` qualidade ~80, sem barra de cookies/popups (fechar antes de capturar).
- Foto do Douglas: real, luz natural, fundo neutro. Tratamento consistente (pode ter leve dessaturação para casar com a paleta). Nada de foto de banco de imagens.
- Proibido: ilustrações genéricas, imagens geradas por IA, ícones 3D, mockups de celular flutuando.

---

## 7. Iconografia

- Biblioteca: **Lucide**, traço 1.5px, tamanho 16 a 20px, só onde comunica algo (WhatsApp, seta externa ↗, +/× do accordion, menu).
- Ícone nunca é decoração de título nem de card.
- WhatsApp e LinkedIn: SVGs próprios monocromáticos.

---

## 8. shadcn/ui: o que usar e como

shadcn/ui é base de **comportamento e acessibilidade**, não de visual. Todo componente instalado é restilizado com os tokens acima antes de ser usado.

| Componente | Uso | Ajustes obrigatórios |
|---|---|---|
| `Button` | CTAs | Radius 4px, variantes `primary` (accent), `secondary` (borda line), `ghost`, `on-accent`; sem sombra |
| `Accordion` | FAQ | Sem caixa/fundo; fios entre itens; ícone + que gira 45° |
| `Sheet` | Menu mobile | Fundo `--paper`, entrada pelo topo ou direita com ease-out 250ms |
| `Separator` | Fios | Cor `--line` |

**Não usar:** `Card` com visual padrão, `Badge` padrão, `Carousel`, `Tabs` para conteúdo de marketing, `DropdownMenu` para idioma.

**Toggle de idioma:** dois links reais (`<a href="/">PT</a> / <a href="/en">EN</a>`) em mono, o ativo em `--ink` com sublinhado, o inativo em `--ink-muted`. Links (não botões) para serem rastreáveis por buscadores.

---

## 9. Referências visuais

Observar o **tom**, não copiar layout.

| Referência | O que observar |
|---|---|
| press.stripe.com | Serifada editorial, tons de papel, contenção |
| are.na | Listas e fios como estrutura, interface que não grita |
| klim.co.nz | Tipografia como elemento visual principal |
| emilkowal.ski | Detalhes de motion e microinteração |
| rauno.me | Craft de interação, sutileza |

**Anti-referências** (o que não fazer): landing de SaaS com gradiente roxo/azul, grid de 3 cards com ícone, hero centralizado com badge "✨ Novo", glassmorphism, fundo com grid/pontos decorativos, siteporai.com.br (contexto de negócio, não visual).

---

## 10. Checklist visual rápido

- [ ] Só um acento (verde escuro) na página inteira?
- [ ] Alguma seção repete o layout da anterior?
- [ ] Algum ícone está ali só para decorar?
- [ ] Headlines à esquerda, em serifada, com ênfase em itálico (não em cor)?
- [ ] Rótulos em mono minúsculo com numeração?
- [ ] Contraste AA em todo texto?
- [ ] Hover, focus e active definidos em todo elemento interativo?
- [ ] Movimento reduzido testado?
- [ ] Página funciona e fica bonita em PT **e** em EN?
