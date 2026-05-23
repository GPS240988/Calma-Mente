# Escopo do MVP: Meditação Guiada para Crises de TDAH/Venvanse

## Resumo Executivo

O objetivo deste MVP é oferecer meditação/intervenção guiada on-demand para desacelerar crises agudas de hiperatividade e ansiedade (estimulante-induced) em pacientes com TDAH e seus cuidadores. Personas-chave incluem um paciente adulto com TDAH e um cuidador/companheiro.

Este produto visa preencher lacunas não atendidas por apps genéricos (Calm, Headspace) e planos de tarefas (Tiimo) atuais, combinando técnicas baseadas em TCC/DBT com monitoramento de humor em tempo real.

Os problemas centrais a resolver são: crise de ansiedade/hiperfoco sem saída de alívio, necessidade de guia passo-a-passo para acalmar e, após estabilização, ajuda na escolha de tarefas tranquilas.

---

## 1) Objetivo do Produto e Personas

**Objetivo:** Prover uma intervenção guiada sob demanda que ajude o usuário a desacelerar o pensamento e a ansiedade durante crises induzidas por TDAH/Venvanse. O app deve entregar meditações curtas, técnicas de respiração e instruções claras para restabelecer o controle mental e, em seguida, sugerir atividades calmas ou produtivas.

**Persona 1 (Paciente):** João, 28 anos, profissional de TI com TDAH. Sente-se frequentemente sobrecarregado e agitado após tomar sua medicação. Precisa de instruções claras passo-a-passo porque fica distraído e nervoso durante as crises.

**Persona 2 (Cuidador/companheiro):** Maria, 45 anos, mãe de João. Deseja uma ferramenta simples que permita a João se acalmar sozinho e que também os ajude a acompanhar seu progresso.

---

## 2) Problemas-chave a Resolver

- **Queda brusca de foco e pânico:** Após algumas horas da medicação, há um "downgrade" mental com ansiedade e sobrecarga de obrigações.
- **Necessidade de orientação imediata:** Na crise, o paciente não consegue decidir ações sozinho. Precisam de um guia passo-a-passo.
- **Agitação motora:** Usuários tentam exercícios em casa mas reclamam de falta de direção clara.
- **Retomada de atividade sem recaída:** Após a calmaria, é difícil escolher uma próxima atividade que não reinicie a ansiedade.

---

## 3) Recursos Indispensáveis (MVP)

| Recurso | Descrição Funcional | Prioridade |
|---------|-------------------|------------|
| Meditação guiada sob demanda | Áudios curtos de relaxamento (respiração diafragmática, visualização) acionados pelo usuário. Conteúdo otimizado para TDAH (simples, passo a passo). Deve funcionar offline. | **Must** |
| Sugestão de atividades pós-crise | Após a meditação, o app sugere atividades calmantes (caminhada leve, alongamento) ou produtivas de baixa carga, baseadas no relatório de humor. | **Must** |
| Perfil de usuário/segurança | Cadastro básico e autenticação (senha/biometria). Dados criptografados. | **Must** |
| Cronômetro de foco/pausa | Temporizador estruturado (Pomodoro) para sessões de foco e intervalos guiados. | Should |
| Detecção de estado/feeling | Pergunta rápida ("como você está agora?") antes e depois da sessão. | Should |
| Alertas e lembretes | Notificações para iniciar sessão em horários programados. | Could |
| Diário de sintomas/medicação | Registro opcional de humor, ansiedade e uso de remédios. | Could |

---

## 4) Fluxos de Usuário Principais

**Estados:** Crise → Regulação → Pós-Regulação

```
Usuário em crise → Abre o app → Inicia meditação/respiração guiada
→ Segue instruções passo-a-passo (áudio) → Estabilização
→ App sugere próxima atividade calma/produtiva → Usuário inicia nova tarefa
```

**Crise:** O app é acionado (auto, lembrete ou manual). Prompt inicial pergunta o nível atual.

**Regulação:** Exibe sequência de áudio breve (2-10 min) de meditação, respiração ou relaxamento muscular progressivo. Conteúdo pré-carregado para uso offline.

**Pós-Regulação:** App analisa o feedback e apresenta opções de atividades seguras (alongamento, caminhada leve, organizar tarefa simples).

---

## 5) Requisitos Não Funcionais

- **Segurança:** HIPAA/GDPR, AES-256, TLS 1.3, autenticação segura
- **Offline:** Intervenções essenciais offline com sincronização posterior
- **Acessibilidade:** WCAG, textos ajustáveis, alto contraste
- **Performance:** Carregamento <3s, áudio em background
- **Internacionalização:** pt-BR inicial, estrutura multi-idioma

---

## 6) Métricas de Sucesso

- DAU (Daily Active Users)
- Taxa de Retomada Pós-Crise
- NPS > 30
- Redução da Ansiedade (escala 0-10, meta: +3 pontos)
- Taxa de Conclusão da Sessão
- Retenção D7/D30 (D7 > 20%)

---

## 7) Stack Técnico (Opção Full-Stack)

- **Frontend:** Next.js (Vercel)
- **Backend/Data:** Supabase (PostgreSQL + Auth + Storage)
- **Armazenamento de Áudio:** Supabase Storage / S3
- **Push:** OneSignal
- **Analytics:** Google Analytics / Firebase
- **Custo inicial:** ~R$0 (planos gratuitos)
- **Tempo de MVP:** ~6-8 semanas
