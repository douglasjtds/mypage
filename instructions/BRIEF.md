# Douglas Tertuliano · Landing Pages

**Data:** 02/10/2026
**Autor:** Douglas Tertuliano
**Status:** Especificação aprovada, pronto para implementação

---

## 💡 Problema

**Em uma frase:**
> Pequenos negócios, profissionais autônomos e infoprodutores precisam de uma página profissional que converta, mas ficam presos entre construtores genéricos (Wix, templates, sites "feitos por IA") que deixam todo mundo com a mesma cara, e agências caras e lentas.

**Contexto:**
Quem está começando ou quer profissionalizar a presença online geralmente tem duas opções ruins. A primeira é montar sozinho num construtor de sites e ficar com um resultado genérico, lento e sem estratégia de conversão. A segunda é contratar uma agência, que cobra caro, demora semanas e muitas vezes ignora a identidade visual que o cliente já tem. No meio disso cresceu uma onda de "sites feitos por IA" que são rápidos e baratos, mas todos parecem iguais.

---

## ✅ Solução

**Em uma frase:**
> Landing pages feitas por um desenvolvedor de verdade, que usa IA como acelerador do processo, entregues rápido, com preço transparente e 100% baseadas na identidade visual do cliente.

**Como funciona:**
O cliente chama no WhatsApp, conta o que precisa e envia o material que tiver (logo, paleta, manual de marca, fotos, textos). Se a marca já tem identidade visual, o site é construído inteiramente em cima dela. Quanto mais material, mais a página fica com a cara do cliente. Douglas desenvolve a página com critério humano de design e código, usando IA para acelerar etapas, publica e entrega o link.

---

## 👤 Público-Alvo

**Persona principal:**
> Dono de pequeno negócio ou profissional autônomo (psicóloga, nutricionista, consultor, agência pequena) que precisa de uma página profissional para divulgar seu serviço e receber contatos pelo WhatsApp. Não é técnico, quer resultado bonito, rápido e sem dor de cabeça.

**Também atende:** infoprodutores (página de produto/ebook/curso) e qualquer empresa que precise de uma landing page simples.

**Comunicação:** o site deixa claro que atende qualquer tipo de negócio, mas os exemplos e a linguagem falam principalmente com quem já tem prova no portfólio (autônomos e pequenos negócios).

---

## 🎯 Proposta de Valor

**Por que escolher o Douglas?**
> Um dev fullstack com 8 anos de experiência faz sua página pessoalmente. Você tem a velocidade e o preço de quem usa IA, com o acabamento, o código e o critério de quem sabe o que está fazendo.

**Alternativas atuais:**
- Construtores (Wix, Canva Sites, templates): baratos, mas genéricos, lentos e sem estratégia
- "Sites por IA": rápidos, mas todos com a mesma cara
- Agências: bom resultado, mas caras e demoradas
- Freelancers de marketplace: qualidade imprevisível

**Diferencial:**
- Feito por uma pessoa real, com nome e LinkedIn, não por uma fábrica
- Respeita a identidade visual existente do cliente
- Preço transparente na página ("a partir de")
- Performance e SEO de quem é desenvolvedor, não montador de template

---

## 💰 Modelo de Negócio

**Monetização:** serviço avulso por projeto, preço "a partir de", variando conforme a complexidade.

| Pacote | Preço | O que inclui |
|---|---|---|
| Essencial | a partir de R$ 400 | Landing page one-page, responsiva, publicada em endereço `.vercel.app` |
| Profissional | a partir de R$ 550 | Tudo do Essencial + configuração de domínio próprio (domínio comprado pelo cliente) e SEO básico configurado |

Seções extras, segunda língua e integrações: sob consulta.

---

## 📊 Métricas de Sucesso

**North Star Metric:**
> Contatos qualificados via WhatsApp por mês (pessoas que chegam pelo site e pedem orçamento real).

**Metas iniciais (3 meses após publicar):**
- [ ] 10 contatos via WhatsApp vindos do site
- [ ] 3 projetos fechados vindos do site
- [ ] Taxa de clique no CTA do WhatsApp acima de 5% das visitas
- [ ] Lighthouse 95+ em Performance, Acessibilidade, Boas Práticas e SEO

---

## 🚀 MVP Scope

**Entra:** site one-page bilíngue (PT padrão, EN), hero, portfólio de landing pages com preview animado, como funciona, pacotes com preço, sobre mim, outros projetos, FAQ, CTA final para WhatsApp e LinkedIn.

**Não entra:** blog, formulário, backend ou banco de dados, agendamento, pagamento online, depoimentos (até existirem).

Detalhes em [MVP-SCOPE.md](./MVP-SCOPE.md).

---

## 🛠 Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js (App Router) + TypeScript + Tailwind CSS |
| UI | shadcn/ui apenas como primitivos, sempre restilizados |
| i18n | next-intl (PT em `/`, EN em `/en`) |
| Motion | CSS transitions primeiro, Motion (`motion/react`) só quando necessário |
| Testes | Playwright (e2e, visual, geração de screenshots do portfólio) |
| Backend | Nenhum. Projeto 100% frontend, conversão via link do WhatsApp |
| Deploy | Vercel |

---

## ⏱ Timeline

| Marco | Prazo |
|---|---|
| Setup do repo, regras e skills | 1 dia |
| Copy PT/EN (marketing-writer) | 1 a 2 dias |
| Implementação das seções | 1 semana |
| Revisão de design (Impeccable, Taste, Emil) + testes | 2 a 3 dias |
| Publicação | ~2 semanas a partir do início |

---

## ❓ Hipóteses a Validar

1. [ ] O posicionamento "dev de verdade + IA como acelerador" gera mais confiança e contatos do que um site genérico de freelancer
2. [ ] Mostrar preço "a partir de" filtra curiosos sem afastar clientes bons
3. [ ] O portfólio com preview animado aumenta o clique no CTA

---

## 🔗 Links

- WhatsApp: https://wa.me/5531991848090?text=Ol%C3%A1%2C%20vi%20seu%20site%20e%20gostaria%20de%20falar%20sobre%20a%20constru%C3%A7%C3%A3o%20de%20uma%20Landing%20Page%20pra%20minha%20marca
- LinkedIn: https://www.linkedin.com/in/douglasjtds/
- Repo: a definir
- Produção: a definir (domínio ainda não escolhido)

---

## 📝 Notas

- Marca pessoal: **Douglas Tertuliano**, sem nome de empresa
- Referência de contexto (não copiar): siteporai.com.br
- Depoimentos: ainda não existem, Douglas vai buscar com clientes. Componente fica pronto e escondido
- Domínio: ainda não definido. Recomendação forte de comprar antes de publicar (ver risco em MVP-SCOPE.md)
