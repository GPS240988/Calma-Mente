# PRD — MVP Plataforma de Regulação Emocional para Crises de TDAH/Venvanse

## Visão Geral do Produto

**Nome Provisório:** CalmaMente

### Problema

Usuários com TDAH, especialmente em uso de estimulantes como Venvanse, enfrentam episódios agudos de ansiedade, hiperatividade mental, hiperfoco destrutivo e dificuldade de autorregulação emocional. Durante essas crises, há perda da capacidade de decidir racionalmente os próximos passos, aumentando sofrimento emocional e improdutividade.

Aplicativos genéricos de meditação não atendem adequadamente esse contexto porque:
- Exigem alto esforço cognitivo
- Possuem excesso de opções
- Não são desenhados para momentos de crise
- Não trabalham recuperação pós-crise
- Não possuem foco específico em TDAH e uso de estimulantes

---

## Objetivo do MVP

Criar uma plataforma mobile-first que:
1. Ofereça intervenção guiada imediata durante crises
2. Reduza ansiedade e hiperatividade mental em menos de 10 minutos
3. Ajude o usuário a retornar a um estado funcional
4. Sugira próximas ações seguras após estabilização
5. Funcione offline
6. Seja extremamente simples cognitivamente

---

## Público-Alvo

### Persona Primária — Usuário TDAH
João, 28 anos, desenvolvedor:
- Usa estimulantes (Venvanse/Ritalina)
- Tem crises de hiperatividade mental
- Sofre com ansiedade pós-medicação
- Fica incapaz de decidir o que fazer durante crises
- Busca soluções rápidas e simples

### Persona Secundária — Cuidador/Familiar
Maria, 45 anos, mãe/cuidadora:
- Acompanhar evolução emocional
- Garantir segurança
- Receber sinais indiretos de estabilidade
- Ajudar o usuário sem precisar intervir constantemente

---

## Escopo do MVP

### Funcionalidades Must Have

#### 1. Sessões Guiadas On-Demand
Áudios curtos de: respiração, desaceleração cognitiva, grounding, relaxamento progressivo.
- Offline
- Início em até 3 toques
- Duração entre 2–10 minutos
- Interface minimalista

#### 2. Sugestões Pós-Crise
Após a sessão: app pergunta como o usuário está e sugere próximas ações seguras.
Exemplos: alongamento, caminhada, hidratação, organizar tarefa simples, ouvir som ambiente, pausa cognitiva.

#### 3. Perfil e Segurança
Cadastro, login, biometria, criptografia, preferências pessoais.
Dados: humor, histórico de sessões, padrões básicos de crise.

#### 4. Funcionalidade Offline
Áudios pré-baixados, sessões funcionais sem internet, sincronização posterior.

### Funcionalidades Should Have
- **Check-in Emocional:** Escala de ansiedade, agitação, clareza mental (antes/depois)
- **Pomodoro / Retorno ao Foco:** Temporizador leve para retorno gradual à produtividade

### Funcionalidades Could Have
- **Diário de Sintomas:** Registro opcional de humor, ansiedade, medicação, gatilhos
- **Alertas Inteligentes:** Notificações pós-medicação, recorrência histórica, pausa programada

---

## Jornada do Usuário

1. **Crise** → Usuário percebe ansiedade, hiperatividade, sobrecarga
2. **Abrir aplicativo** → Home extremamente simples: "Preciso me acalmar"
3. **Sessão guiada** → App inicia imediatamente: áudio, respiração, instruções passo a passo
4. **Estabilização** → Check-in rápido: "Você se sente melhor?"
5. **Pós-regulação** → Sugestão de atividade segura, foco leve, autocuidado
6. **Retorno gradual** → Usuário volta ao funcionamento normal

---

## UX/UI Requirements

### Princípios
- Zero sobrecarga cognitiva
- Grandes áreas clicáveis
- Pouco texto
- Alto contraste
- Áudio como elemento principal
- Navegação linear
- Interface calmante

### Diretrizes Visuais
- Tons suaves
- Feedback visual mínimo
- Ícones claros
- Tipografia grande
- Animações lentas e discretas

---

## Stack Recomendada (MVP)

- **Frontend:** Next.js PWA
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Storage:** Supabase Storage / S3
- **Push Notifications:** OneSignal
- **Analytics:** Firebase Analytics
- **Deploy:** Vercel
- **Autenticação:** Supabase Auth
- **Monitoramento:** Sentry

---

## Métricas de Produto

### KPIs Primários
- DAU
- Retenção D7/D30
- Taxa de conclusão
- Sessões por usuário
- Redução média de ansiedade

### KPIs Secundários
- Tempo médio por sessão
- Reabertura após crise
- NPS (meta ≥ 30)
- Churn

---

## Critérios de Aceitação do MVP

### Produto
- Usuário inicia sessão em ≤3 toques
- Sessão funciona offline
- Áudio inicia em ≤2s
- Login seguro
- Sincronização funcional

### Negócio
- NPS ≥ 30
- D7 ≥ 20%
- Pelo menos 20% completam uma sessão

---

## Roadmap

### Fase 1 — MVP (8 semanas)
Sessões guiadas, offline, autenticação, pós-crise, analytics básicos.

### Fase 2 — Beta Público
Pomodoro, lembretes, calendário, dashboard de métricas.

### Fase 3 — 1.0
Multi-idioma, auditoria segurança, lançamento App Store/Google Play, personalização avançada.

---

## Visão Final

O MVP deve ser: extremamente simples, rápido, emocionalmente seguro, funcional offline, cognitivamente leve.

O principal indicador de sucesso não é "tempo no app", mas:
**"Quantas pessoas conseguem sair de uma crise e voltar ao controle usando a plataforma."**
