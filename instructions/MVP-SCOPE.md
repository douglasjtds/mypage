# MVP Scope · Douglas Tertuliano Landing Pages

**Data:** 02/10/2026
**Status:** Aprovado

---

## Objetivo do MVP

Publicar uma vitrine one-page, bilíngue e tecnicamente impecável que transforme visitas em conversas no WhatsApp. O MVP está pronto quando um desconhecido consegue, sozinho e em menos de 2 minutos, ver o trabalho, entender o processo, saber o preço e chamar no WhatsApp.

---

## ✅ O que ESTÁ no MVP

### Must have
| Item | Por quê |
|---|---|
| Hero com posicionamento + CTA WhatsApp | É o que segura o visitante nos primeiros 5 segundos |
| Portfólio de landing pages (Bruna Magalhães, Alando Digital) com preview animado | Prova principal; é o que diferencia de "mais um freela" |
| Como funciona (com brand-first e papel da IA) | Remove o medo de "não vai ter a minha cara" |
| Pacotes Essencial e Profissional, preço "a partir de" | Transparência filtra contatos e gera confiança |
| Sobre mim com credenciais e LinkedIn | Sem depoimentos, é a pessoa real que carrega a confiança |
| CTA final + footer | Última chance de conversão |
| i18n PT/EN com toggle discreto, PT padrão | Requisito do projeto desde o início, caro de adicionar depois |
| SEO técnico (meta, OG, hreflang, sitemap, JSON-LD) | Página de serviço precisa ser encontrável |
| Responsivo, acessível, Lighthouse 95+ | O próprio site é a prova de qualidade técnica |
| CLAUDE.md + skills instaladas + testes Playwright | Garante consistência visual e evita cara de IA |

### Should have
| Item | Por quê |
|---|---|
| Outros projetos (Gasolinha + 3 ferramentas) | Prova capacidade técnica além de landing page, sem roubar o foco |
| FAQ (5 a 7 perguntas) | Resolve objeções antes da conversa |
| Analytics com evento de clique no WhatsApp | Sem isso não dá para medir a North Star |

### Could have
| Item | Por quê |
|---|---|
| Componente de depoimentos desligado por flag | Fica pronto para ligar quando os depoimentos chegarem |
| OG image gerada dinamicamente por idioma | Melhora compartilhamento; pode começar com imagem estática |

---

## ❌ O que NÃO está no MVP

| Item | Quando |
|---|---|
| Backend, banco, Supabase | Nunca (decisão do projeto) |
| Formulário de contato | Nunca enquanto o WhatsApp funcionar bem |
| Blog / CMS | Futuro, se SEO de conteúdo virar estratégia |
| Dark mode | Futuro |
| Depoimentos | Assim que houver depoimentos reais |
| Poupensa no portfólio | Quando for publicado |
| Página individual por case (estudo de caso) | v2, quando houver 4+ landing pages |
| Agendamento, pagamento online, área do cliente | Fora do escopo do negócio atual |
| Animações 3D, WebGL, scroll-jacking | Nunca: pesado e com cara de template |

---

## 🧠 Justificativa das decisões

**Sem backend.** A conversão é um link. Tudo que um backend traria (formulário, leads em banco) adiciona manutenção sem aumentar conversão para esse público, que prefere WhatsApp.

**Portfólio pequeno e forte em vez de grande e fraco.** Duas landing pages bem apresentadas valem mais que dez cards genéricos. SaaS e ferramentas ficam numa seção secundária porque provam competência técnica, mas não são o que está à venda.

**Preço depois da prova.** A ordem portfólio → processo → preço faz o visitante ver valor antes de ver número. R$400 sozinho parece barato demais; depois de ver o trabalho, parece justo.

**i18n agora.** Adicionar internacionalização depois obriga a reescrever todos os componentes. Começar com `next-intl` custa pouco no dia 1.

**Depoimentos desligados, não inventados.** Depoimento falso destrói exatamente a confiança que o posicionamento "pessoa real" constrói.

---

## ❓ Hipóteses a validar

1. **Posicionamento:** "dev de verdade que usa IA como acelerador" gera mais contatos do que um discurso genérico de freelancer.
   *Sinal:* clientes mencionam a experiência/código ou o "não parece IA" na conversa.
2. **Preço transparente:** mostrar "a partir de" atrai contatos com orçamento compatível.
   *Sinal:* menos de 30% dos contatos desistem ao ouvir o valor.
3. **Portfólio animado:** o preview no hover aumenta o engajamento.
   *Sinal:* cliques em "ver site" e scroll até pacotes acima de 40% das visitas.

---

## 📊 Métricas de sucesso do MVP

| Métrica | Target (3 meses) |
|---|---|
| Cliques no WhatsApp | 10+ |
| Projetos fechados via site | 3 |
| Taxa de clique no CTA | > 5% |
| Lighthouse (mobile) | 95+ nas 4 categorias |

---

## ⚠️ Riscos de escopo

**Vender domínio próprio num site `.vercel.app`.** É uma contradição visível para o cliente do pacote Profissional. Recomendação: registrar um domínio (ex.: `douglastertuliano.com.br`, custo anual baixo no registro.br) antes de começar a divulgar. Desenvolver em `.vercel.app` é ok; divulgar nele, não.

**Copy genérica.** Se a copy for escrita com frases de efeito vazias, o design não salva. A copy é escrita com a skill marketing-writer e revisada com as regras anti-IA do CLAUDE.md.

**Escopo crescendo para "site completo".** Qualquer seção nova precisa responder: ajuda alguém a decidir chamar no WhatsApp? Se não, vai para o futuro.

---

## ✔️ Definition of Done

- [ ] Todas as seções Must e Should implementadas em PT e EN
- [ ] Testes Playwright passando (navegação, i18n, links, CTAs, visual em 3 breakpoints)
- [ ] Revisões feitas: `/impeccable critique`, `/impeccable audit`, Taste e `review-animations` sem pendências bloqueantes
- [ ] Lighthouse 95+ mobile e desktop nas duas línguas
- [ ] Nenhuma string hardcoded, nenhum travessão (—) na copy
- [ ] Analytics registrando cliques no WhatsApp
- [ ] Publicado na Vercel
