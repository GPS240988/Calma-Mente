# Guia de Funcionalidades — CalmaMente

> **Regra fundamental:** Toda funcionalidade do CalmaMente existe para cumprir um único objetivo:
> **"Ajudar o usuário com TDAH/Venvanse a sair de uma crise emocional aguda e retomar o controle da própria mente em menos de 10 minutos."**

---

## 🎯 Objetivo Maior do App

O CalmaMente é uma plataforma mobile-first de **intervenção guiada sob demanda** para crises de hiperatividade, ansiedade e sobrecarga cognitiva causadas por TDAH e/ou uso de estimulantes (Venvanse, Ritalina).

**Não é um app de meditação genérico.** Cada tela, botão, áudio e interação foi projetado para:

1. **Acolher o usuário em crise** — sem exigir esforço cognitivo.
2. **Guiar passo a passo** — instruções claras, simples e lineares.
3. **Estabilizar** — reduzir ansiedade e agitação com técnicas baseadas em TCC/DBT.
4. **Orientar a retomada** — sugerir a próxima ação segura após a calmaria.
5. **Medir progresso** — feedback de evolução que reforça a autoeficácia.

---

## 📐 Premissa para Qualquer Nova Feature

Antes de implementar qualquer funcionalidade, ela deve ser validada contra estas 5 perguntas:

| # | Pergunta de Validação | Resposta obrigatória |
|---|----------------------|---------------------|
| 1 | **Alivia crise?** — Essa feature ajuda diretamente durante uma crise ou imediatamente após? | Sim, direta ou indiretamente |
| 2 | **Baixa carga cognitiva?** — O usuário em crise consegue operar sem pensar muito? | Máximo 3 toques para iniciar |
| 3 | **Não gera sobrecarga?** — Essa feature pode intensificar ansiedade ao invés de aliviar? | Não. Nunca. |
| 4 | **Segue o fluxo?** — Respeita a jornada `Crise → Regulação → Pós-Regulação`? | Sim, se encaixa no pipeline |
| 5 | **Mede impacto?** — Permite verificar se o usuário se sentiu melhor? | Ideal: sim. Aceitável: mensurável indiretamente |

> [!WARNING]
> Se uma feature não passa em pelo menos 3 dessas perguntas, ela **NÃO** pertence ao MVP e deve ser movida para o backlog.

---

## 🗺️ Mapa de Features Atuais

### Feature: Sessões Guiadas On-Demand
- **Tela:** `/select` → `/session?tipo={id}`
- **Objetivo:** Oferecer intervenção imediata durante uma crise
- **Conexão com o objetivo:** É a **feature central**. O usuário em crise abre o app, escolhe a técnica e inicia a sessão guiada em até 3 toques.
- **Técnicas:** Respiração diafragmática, Desaceleração cognitiva (mindfulness), Grounding 5-4-3-2-1, Relaxamento muscular progressivo
- **Base científica:** TCC (Terapia Cognitivo-Comportamental) e DBT (Terapia Dialética Comportamental)

### Feature: Avaliação Pós-Crise
- **Tela:** `/session?tipo={id}` (após o áudio terminar)
- **Objetivo:** Medir a melhoria emocional e orientar o próximo passo
- **Conexão com o objetivo:** Funciona como ponte entre **Regulação → Pós-Regulação**. Pergunta "Como você se sente agora?" e direciona sugestões personalizadas.
- **Fluxo:** Check-in emocional → Sugestões categorizadas → CTA de retomada suave

### Feature: Sugestões Pós-Crise
- **Tela:** Modal dentro de `/session` (acionado pela avaliação)
- **Objetivo:** Prevenir recaída e orientar atividade segura
- **Conexão com o objetivo:** Resolve o problema de "não saber o que fazer depois de se acalmar". Sugere atividades de baixa carga: caminhada, hidratação, alongamento, organizar tarefa simples.

### Feature: Pomodoro Gamificado
- **Tela:** `/pomodoro`
- **Objetivo:** Facilitar a **retomada gradual da produtividade** após regulação
- **Conexão com o objetivo:** É uma feature de **Pós-Regulação**. O usuário que se acalmou pode canalizar a clareza para sessões curtas de foco com recompensa emocional (pet companion, moedas, streak).
- **Princípio:** Produtividade suave, sem pressão. Intervalos guiados com respiração.

### Feature: Autenticação e Perfil
- **Tela:** Header da Home + Supabase Auth
- **Objetivo:** Persistir dados entre dispositivos e proteger informações sensíveis
- **Conexão com o objetivo:** Permite que o usuário tenha continuidade no acompanhamento. Dados de sessões, humor e progresso são sincronizados.

---

## 🚧 Regras de Navegação

| De | Para | Motivação |
|----|------|-----------|
| Home (`/`) | Select (`/select`) | Iniciar intervenção — CTA principal |
| Home (`/`) | Pomodoro (`/pomodoro`) | Retomada de foco — acesso rápido |
| Select (`/select`) | Session (`/session?tipo=X`) | Iniciar sessão guiada |
| Session | Home (`/`) | **Sempre retornar à Home** — nunca para o select |
| Pomodoro | Home (`/`) | **Sempre retornar à Home** |

> [!IMPORTANT]
> O retorno de navegação **sempre prioriza a Home** (`/`). Nenhuma tela secundária deve redirecionar para outra tela secundária.

---

## 🎨 Regras de Estilo

Todas as features devem seguir estritamente o [DESIGN.md](../DESIGN.md) e utilizar os tokens de [theme.ts](../src/styles/theme.ts).

Resumo rápido:
- **Cores:** Paleta `calm-*` (HSL suave, alto contraste, baixo stress visual)
- **Cards:** Glassmorphism premium (`bg-calm-card/45 backdrop-blur-xl`)
- **Botões:** Classes utilitárias `.btn-large`, `.btn-primary`
- **Animações:** Suaves, lentas (4s+), sem gatilhos de ansiedade
- **Layout:** Mobile-first, zonas de toque ≥44px

---

## 📝 Template para Documentar Nova Feature

```markdown
### Feature: [Nome]
- **Tela:** [Rota]
- **Objetivo:** [1 frase]
- **Conexão com o objetivo maior:** [Como essa feature contribui para tirar o usuário da crise]
- **Premissa validada:** [Quais das 5 perguntas foram respondidas "Sim"]
- **Base científica:** [Se aplicável]
- **Dependências:** [Outras features necessárias]
```
