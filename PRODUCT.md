# Product

<!-- impeccable:product-schema 1 -->

> Fonte da verdade: `instructions/` (BRIEF, PRD, MVP-SCOPE, LANDING-PAGE-SPEC, DESIGN-GUIDELINES) e `CLAUDE.md`. Este arquivo resume o contexto de produto para o Impeccable. Em caso de conflito, `instructions/` prevalece; ler o spec correspondente antes de qualquer decisão.

## Platform

web

## Users

Primário: dono de pequeno negócio ou profissional autônomo (psicóloga, nutricionista, consultor, agência pequena) que precisa de uma página profissional para divulgar o serviço e receber contatos pelo WhatsApp. Não é técnico; quer resultado bonito, rápido e sem dor de cabeça.

Também atendidos: infoprodutores (página de produto, ebook, curso) e qualquer empresa que precise de uma landing page simples. A página diz que atende qualquer negócio, mas exemplos e linguagem falam com autônomos e pequenos negócios, onde já existe prova no portfólio.

## Product Purpose

Site one-page bilíngue (PT padrão em `/`, EN em `/en`) que vende o serviço de landing pages do Douglas Tertuliano como freelancer. O próprio site é a principal peça de portfólio: precisa provar critério de design e código.

North Star: contatos qualificados via WhatsApp por mês. Metas para os 3 primeiros meses após publicar: 10 contatos vindos do site, 3 projetos fechados, clique no CTA do WhatsApp acima de 5% das visitas, Lighthouse 95+ nas 4 categorias.

## Positioning

Landing pages feitas pessoalmente por um dev fullstack com ~8 anos de experiência, que usa IA como acelerador do processo e diz isso com honestidade: a velocidade e o preço de quem usa IA, com o acabamento, o código e o critério de quem sabe o que está fazendo.

Brand-first: se o cliente já tem identidade visual, paleta e guidelines, o site é 100% baseado nelas; quanto mais material ele enviar, mais a página fica com a cara dele.

Contra as alternativas: construtores (genéricos, sem estratégia), "sites por IA" (todos com a mesma cara), agências (caras e lentas) e freelancers de marketplace (qualidade imprevisível). Diferenciais: pessoa real com nome e LinkedIn, respeito à identidade existente, preço transparente na página, performance e SEO de desenvolvedor.

## Operating Context

Fluxo do cliente: chama no WhatsApp, conta o que precisa e envia o material que tiver (logo, paleta, manual de marca, fotos, textos); Douglas desenvolve, publica e entrega o link.

Conversão é sempre um link `wa.me` (número 5531991848090) com mensagem pré-preenchida por idioma e contexto (padrão, pacote Essencial, pacote Profissional). LinkedIn: https://www.linkedin.com/in/douglasjtds/. Cliques no WhatsApp são medidos por posição (header, hero, pricing-essencial, pricing-profissional, final), sem cookies.

## Capabilities and Constraints

- Projeto 100% frontend, permanentemente: sem backend, banco, API routes com lógica, server actions de formulário, formulário de contato ou variáveis secretas.
- Seções do MVP: header, hero, portfólio com preview que rola no hover, como funciona, pacotes, sobre mim, outros projetos, depoimentos (desligado), FAQ, CTA final, footer.
- Fora do MVP: blog, formulário, agendamento, pagamento online.
- Pacotes: Essencial a partir de R$ 400 (one-page responsiva publicada em `.vercel.app`); Profissional a partir de R$ 550 (Essencial + domínio próprio comprado pelo cliente + SEO básico). Seções extras, segunda língua e integrações sob consulta. Preço sempre "a partir de", com nota de que varia conforme a complexidade. Valores vêm de `src/content/pricing.ts`.
- i18n: PT e EN com as mesmas chaves; EN escrito para quem lê em inglês, não tradução literal; sem detecção automática de idioma.
- Funciona com JS desligado (links e preços visíveis).
- Indefinidos: prazo padrão de entrega, forma de pagamento, rodadas de alteração inclusas, domínio do site, ferramenta de analytics (Umami ou Vercel Web Analytics). Não preencher sem confirmação do Douglas.

## Brand Commitments

- Marca pessoal: **Douglas Tertuliano**, sem nome de empresa.
- Voz: frases curtas e concretas, primeira pessoa quando fala do Douglas. Honesta sobre o uso de IA (IA acelera; critério e código são do Douglas).
- Proibido na copy: travessão (U+2014) em qualquer texto; clichês ("transforme seu negócio", "eleve sua marca", "soluções inovadoras", "leve seu negócio ao próximo nível", "unlock", "elevate", "seamless", "cutting-edge", "game-changer"); tríades decorativas; perguntas retóricas em série; números ou depoimentos inventados.
- O site nunca pode parecer feito por um gerador de sites com IA. Direção visual e listas de proibições ficam em `instructions/DESIGN-GUIDELINES.md` e `CLAUDE.md`.
- Direção visual: "papel técnico". Branco-acinzentado frio, tinta quase preta, um único acento vermelhão usado com escassez, Schibsted Grotesk para títulos e texto e JetBrains Mono na estrutura. O site é a moldura e os sites dos clientes são o conteúdo, então a moldura contrasta com a fórmula visual dos cases do portfólio.

## Evidence on Hand

- Portfólio de landing pages (clientes reais): Bruna Magalhães (https://bruna-magalhaes.vercel.app/) e Alando Digital (https://alandodigital.com.br/). Screenshots gerados por `pnpm capture` em `public/portfolio/`.
- Outros projetos: Gasolinha (SaaS, https://gasolinha.com.br/, rótulo build-to-learn); ferramentas Link para WhatsApp (https://link-to-whatsapp.vercel.app/), Santo Rosário (https://santo-rosario-dojotes.vercel.app/) e Gerador de QR Code (https://douglasjtds.github.io/qr-code-generator/). Poupensa só quando publicado.
- Credenciais: dev fullstack, ~8 anos de experiência, experiência em empresas de grande porte (nomes não definidos; não citar sem confirmação).
- Ausentes, nunca fabricar: depoimentos (componente pronto e escondido até existirem reais), foto profissional do Douglas (pendente; nunca usar foto de banco ou gerada por IA), números de clientes ou projetos, logos de clientes.

## Product Principles

1. Prova antes de promessa: o portfólio real e o próprio site carregam a confiança; nada inventado.
2. A marca do cliente manda: brand-first é argumento de venda e regra de trabalho.
3. Honestidade sobre IA: acelera o processo, não substitui o critério.
4. Um caminho de conversão: tudo leva ao WhatsApp, com preço transparente para filtrar curiosos sem afastar bons clientes.
5. Feito por uma pessoa: cada detalhe deve parecer escolhido, não montado de kit.

## Accessibility & Inclusion

WCAG 2.1 AA: navegação completa por teclado, foco visível, contraste AA em todo texto, semântica correta, `alt` traduzido, `prefers-reduced-motion` respeitado. Lighthouse 95+ mobile nas 4 categorias.
