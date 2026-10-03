# Landing Page Spec · Douglas Tertuliano

> Estrutura apenas. Nenhum texto, headline ou copy aqui. A copy é escrita separadamente com a skill marketing-writer, em PT e EN, e entra em `messages/pt.json` e `messages/en.json`.

---

## Princípios desta página

1. **Um objetivo:** abrir uma conversa no WhatsApp. Todo bloco empurra para isso.
2. **Prova antes de preço:** portfólio e processo vêm antes dos pacotes.
3. **Uma pessoa, não uma fábrica:** nome, rosto e LinkedIn aparecem cedo e com destaque.
4. **Editorial, não SaaS:** a página se parece mais com uma revista ou um portfólio de estúdio do que com landing de startup. Ver DESIGN-GUIDELINES.md.
5. **Ritmo variado:** nenhuma seção repete o layout da anterior. Proibido empilhar "título centralizado + grid de 3 cards" seção após seção.

---

## Mapa da página

```
00 Header (sticky)
01 Hero
02 Portfólio · landing pages        ← destaque principal
03 Como funciona
04 Pacotes
05 Sobre mim
06 Outros projetos                  ← secundário, compacto
07 Depoimentos                      ← desligado até existir conteúdo
08 FAQ
09 CTA final
10 Footer
```

Âncoras do nav (máx. 4): Portfólio, Como funciona, Pacotes, Sobre. FAQ e Outros projetos acessíveis só por rolagem e footer.

---

## 00 · Header

**Objetivo:** identificar quem é e dar acesso ao CTA de qualquer ponto da página.

**Layout:**
- Esquerda: nome "Douglas Tertuliano" como wordmark tipográfico (serifada de display)
- Direita: links âncora, toggle de idioma, botão WhatsApp
- Toggle de idioma: pequeno, texto mono "PT / EN" com o ativo marcado. Não usar bandeiras
- Altura compacta. No topo da página: fundo transparente. Após rolar: fundo papel com borda inferior de 1px, transição suave

**Mobile:**
- Wordmark + toggle de idioma + botão WhatsApp compacto (ícone + rótulo curto)
- Links âncora em menu (sheet) aberto por botão; nada de hambúrguer genérico se o espaço permitir só ícone de WhatsApp e toggle

**Elementos visuais:** nenhum ícone decorativo. Só o ícone do WhatsApp no botão.

---

## 01 · Hero

**Objetivo:** em 5 segundos, comunicar: landing pages, feitas por um dev de verdade, rápido e com a cara da marca do cliente.

**Layout (desktop):** grid assimétrico de 12 colunas
- Colunas 1 a 8: rótulo mono pequeno (categoria/disponibilidade) → headline grande em serifada de display, alinhada à esquerda → subheadline curta → CTA primário (WhatsApp) + link secundário textual (ver portfólio)
- Colunas 9 a 12: elemento visual de prova. Opção recomendada: recorte de uma das landing pages do portfólio dentro de uma moldura de navegador minimalista, levemente deslocado para fora do grid. Alternativa: foto do Douglas em P&B ou tratada com o verde
- Linha inferior do hero (opcional): 3 fatos curtos em mono separados por fio (ex.: anos de experiência, prazo médio, idiomas). Nada de contadores animados

**Mobile:** coluna única; visual abaixo do CTA, menor.

**Elementos visuais:** tipografia é o visual principal. Sem ilustração 3D, sem gradiente, sem blob, sem mockup de celular flutuando.

**Motion:** entrada única e curta dos elementos do hero (fade + leve deslocamento, escalonado). Só no carregamento, nunca em loop.

---

## 02 · Portfólio (landing pages)

**Objetivo:** provar qualidade com trabalho real. É a seção mais importante da página.

**Layout:**
- Cabeçalho da seção à esquerda: rótulo mono numerado + título + uma linha de apoio
- Cards grandes, **não** em grid de 3. Com 2 projetos: cards lado a lado com larguras diferentes (ex.: 7/5 colunas) ou empilhados em largura total alternando lado do texto
- Cada card:
  - "Janela" com barra de navegador mínima (3 pontos neutros + domínio do site em mono)
  - Área de preview com proporção fixa (16:10) contendo o screenshot de página inteira
  - Abaixo da janela: nome do cliente, segmento, tipo de projeto (rótulos mono), link "ver site ↗"
- Quando houver 4+ projetos: grid de 2 colunas com o primeiro em destaque largura total

**Interação (detalhes em DESIGN-GUIDELINES.md › Motion):**
- Desktop com mouse: hover na janela faz o screenshot rolar até o fim da página; ao sair, volta ao topo
- Cursor indica que é clicável; clique abre o site em nova aba
- Foco por teclado: mesmo estado visual do hover (borda/destaque), sem rolagem automática
- Touch e movimento reduzido: screenshot estático do topo

**Elementos visuais:** screenshots reais em `.webp`. Sem sombras pesadas; uma sombra suave e longa na janela é suficiente.

---

## 03 · Como funciona

**Objetivo:** mostrar que é simples e que a identidade do cliente manda.

**Layout:**
- Lista vertical numerada (01, 02, 03, 04) em linhas separadas por fios horizontais, número em mono grande à esquerda, título + descrição à direita. Estilo índice de revista, não cards
- Bloco lateral ou de destaque (fundo verde-claro ou borda verde à esquerda) com a mensagem de brand-first: "se você já tem identidade visual, o site é 100% baseado nela; quanto mais material, mais com a sua cara"
- Bloco curto separado sobre o uso de IA: acelerador de processo, critério humano. Tom honesto, sem ícone de "sparkles" ou robô

**Passos (conteúdo, não copy):** conversa no WhatsApp → envio do material da marca → desenvolvimento e ajustes → publicação.

**Motion:** nenhuma animação obrigatória. No máximo os fios horizontais "desenhando" ao entrar na viewport, uma vez.

---

## 04 · Pacotes

**Objetivo:** dar referência de preço e facilitar a escolha.

**Layout:**
- Dois blocos lado a lado (desktop), empilhados no mobile
- Profissional destacado por fundo verde escuro com texto claro; Essencial em fundo papel com borda
- Cada bloco: nome do pacote → preço com "a partir de" em tamanho menor acima → lista curta do que inclui (fios, não checkmarks coloridos) → CTA WhatsApp com mensagem específica do pacote
- Abaixo dos blocos, em texto pequeno: nota de que o valor varia com a complexidade; nota de que o domínio é comprado pelo cliente; adicionais sob consulta

**Hierarquia:** preço é o maior elemento do bloco, em serifada de display.

**Evitar:** badge "Mais popular" com gradiente, tabela de comparação, preço riscado.

---

## 05 · Sobre mim

**Objetivo:** mostrar a pessoa real por trás e carregar a confiança enquanto não há depoimentos.

**Layout:**
- Foto real do Douglas à esquerda (proporção retrato, tratamento consistente, sem moldura arredondada de avatar)
- À direita: texto curto em primeira pessoa, lista de credenciais em mono (anos de experiência, stack, tipo de empresa onde trabalha), link para LinkedIn
- Pode incluir uma linha honesta sobre como a IA entra no processo

**Mobile:** foto acima, texto abaixo.

---

## 06 · Outros projetos

**Objetivo:** provar capacidade técnica além de landing pages sem competir com o portfólio.

**Layout:**
- Lista em linhas (estilo tabela editorial): nome · tipo (SaaS / Ferramenta) · uma linha de descrição · seta ↗
- Linha inteira clicável, hover sutil (fundo verde-claro ou deslocamento da seta)
- Gasolinha com rótulo "build-to-learn"
- Sem screenshots aqui, para manter a hierarquia abaixo do portfólio

---

## 07 · Depoimentos (desligado)

**Objetivo:** prova social de clientes reais.

**Regra:** só renderiza se houver depoimentos reais em `src/content/testimonials.ts`. Sem conteúdo, a seção não existe no DOM e não aparece no nav.

**Layout quando ligado:** uma citação grande em serifada de display (o melhor depoimento) + no máximo 2 menores. Nome, negócio e link para o site do cliente. Nada de carrossel.

---

## 08 · FAQ

**Objetivo:** eliminar objeções antes da conversa.

**Layout:**
- Duas colunas no desktop: título da seção fixo à esquerda (sticky dentro da seção), accordion à direita
- Accordion com fios horizontais, ícone de + que gira para ×, sem caixas com fundo

**Temas:** prazo, material necessário, alterações inclusas, domínio, pagamento, segmentos atendidos.

---

## 09 · CTA final

**Objetivo:** última chance de conversão.

**Layout:**
- Bloco de largura total em verde escuro, texto claro
- Headline grande em serifada à esquerda; CTA WhatsApp (primário, botão claro) + LinkedIn (secundário, link) à direita ou abaixo
- Pode repetir uma frase curta sobre resposta rápida no WhatsApp

---

## 10 · Footer

**Objetivo:** fechamento e links úteis.

**Layout:** linha simples em fundo papel: nome + ano à esquerda; WhatsApp, LinkedIn e toggle de idioma à direita. Uma linha opcional em mono: "feito à mão com Next.js" ou similar (definir na copy).

---

## Hierarquia de CTAs

| Nível | CTA | Onde |
|---|---|---|
| Primário | WhatsApp (mensagem padrão) | Header, Hero, CTA final |
| Primário contextual | WhatsApp (mensagem por pacote) | Pacotes |
| Secundário | Ver portfólio (âncora) | Hero |
| Secundário | LinkedIn | Sobre mim, CTA final, Footer |
| Terciário | Ver site ↗ | Cards do portfólio, Outros projetos |

Todos os links do WhatsApp são gerados por uma função única `buildWhatsAppUrl({ locale, context })` com a mensagem traduzida. Todos disparam o evento `whatsapp_click` com `position` (header, hero, pricing-essencial, pricing-profissional, final).

---

## Ritmo visual (alternância de fundos)

```
Header      papel (transparente no topo)
Hero        papel
Portfólio   papel com faixa sutil (surface)
Como func.  papel
Pacotes     papel + 1 bloco verde
Sobre       surface
Outros      papel
FAQ         papel
CTA final   verde escuro
Footer      papel
```
