# Sistema Inteligente de Sugestões Pós-Crise

## Meditação Guiada para Crises de TDAH/Venvanse

---

# Objetivo

O sistema de sugestões pós-crise deve adaptar as recomendações conforme:

1. O tipo de crise/intervenção escolhida
2. O estado emocional após a meditação

O objetivo NÃO é produtividade imediata.

O objetivo é:

* evitar recaída;
* estabilizar o sistema nervoso;
* reduzir estímulos;
* ajudar o usuário a transicionar gradualmente para o cotidiano.

---

# Estrutura de Decisão

## Entrada 1 — Tipo de Intervenção

Tipos disponíveis:

* respiracao_calmante
* desaceleracao_mental
* grounding
* relaxamento_progressivo

---

## Entrada 2 — Estado Pós-Meditação

Estados disponíveis:

* muito_melhor
* um_pouco_melhor
* na_mesma

---

# Estrutura de Dados Recomendada

```json
{
  "tipoIntervencao": "respiracao_calmante",
  "estadoPosMeditacao": "um_pouco_melhor"
}
```

---

# Estrutura de Retorno Recomendada

```json
{
  "titulo": "Seu corpo desacelerou",
  "descricao": "Agora mantenha um ritmo mais leve e previsível.",
  "categorias": [
    {
      "titulo": "Recuperar Corpo",
      "acoes": []
    },
    {
      "titulo": "Recuperar Mente",
      "acoes": []
    },
    {
      "titulo": "Recuperar Presença",
      "acoes": []
    }
  ]
}
```

---

# Lógica Completa de Sugestões

---

# 1. RESPIRAÇÃO CALMANTE

## Contexto

Indicada para:

* ansiedade alta;
* aceleração;
* sensação de alerta;
* coração acelerado;
* tensão emocional.

Objetivo:
reduzir ativação fisiológica.

---

## 1.1 Muito Melhor

```json
{
  "titulo": "Seu corpo desacelerou",
  "descricao": "Agora mantenha esse ritmo mais calmo.",
  "categorias": [
    {
      "titulo": "Recuperar Corpo",
      "acoes": [
        "Beba água lentamente",
        "Faça uma caminhada leve por 5 minutos",
        "Alongue ombros e pescoço"
      ]
    },
    {
      "titulo": "Recuperar Mente",
      "acoes": [
        "Ouça uma música calma",
        "Organize apenas uma tarefa simples",
        "Inicie um foco leve de 10 minutos"
      ]
    },
    {
      "titulo": "Recuperar Presença",
      "acoes": [
        "Observe o ambiente sem pressa",
        "Respire naturalmente por alguns minutos"
      ]
    }
  ]
}
```

---

## 1.2 Um Pouco Melhor

```json
{
  "titulo": "A ansiedade diminuiu",
  "descricao": "Mas ainda existe tensão no corpo.",
  "categorias": [
    {
      "titulo": "Recuperar Corpo",
      "acoes": [
        "Repita uma sequência curta de respiração",
        "Reduza luzes e estímulos",
        "Alongue mãos e braços"
      ]
    },
    {
      "titulo": "Recuperar Mente",
      "acoes": [
        "Evite decisões importantes agora",
        "Evite multitarefa"
      ]
    },
    {
      "titulo": "Recuperar Presença",
      "acoes": [
        "Permaneça em um ambiente silencioso",
        "Mantenha os pés no chão por alguns instantes"
      ]
    }
  ]
}
```

---

## 1.3 Na Mesma

```json
{
  "titulo": "Seu cérebro ainda está acelerado",
  "descricao": "Não force produtividade agora.",
  "categorias": [
    {
      "titulo": "Recuperar Corpo",
      "acoes": [
        "Repita a intervenção",
        "Tente uma técnica corporal diferente"
      ]
    },
    {
      "titulo": "Recuperar Mente",
      "acoes": [
        "Evite telas e notificações",
        "Não tente resolver problemas complexos"
      ]
    },
    {
      "titulo": "Recuperar Presença",
      "acoes": [
        "Faça grounding sensorial",
        "Converse com uma pessoa segura"
      ]
    }
  ]
}
```

---

# 2. DESACELERAÇÃO MENTAL

## Contexto

Indicada para:

* hiperfoco;
* pensamentos acelerados;
* excesso cognitivo;
* hiperatividade mental.

Objetivo:
reduzir ruído mental.

---

## 2.1 Muito Melhor

```json
{
  "titulo": "Sua mente desacelerou",
  "descricao": "Proteja esse silêncio mental.",
  "categorias": [
    {
      "titulo": "Recuperar Corpo",
      "acoes": [
        "Faça uma pausa física curta",
        "Respire longe de telas"
      ]
    },
    {
      "titulo": "Recuperar Mente",
      "acoes": [
        "Escreva pensamentos em um bloco",
        "Escolha apenas uma tarefa",
        "Use um pomodoro leve"
      ]
    },
    {
      "titulo": "Recuperar Presença",
      "acoes": [
        "Silencie notificações",
        "Observe o ambiente ao redor"
      ]
    }
  ]
}
```

---

## 2.2 Um Pouco Melhor

```json
{
  "titulo": "Os pensamentos diminuíram",
  "descricao": "Mas ainda estão puxando sua atenção.",
  "categorias": [
    {
      "titulo": "Recuperar Corpo",
      "acoes": [
        "Afaste-se de telas por alguns minutos"
      ]
    },
    {
      "titulo": "Recuperar Mente",
      "acoes": [
        "Evite abrir muitas abas",
        "Crie uma lista curta de prioridades",
        "Evite redes sociais"
      ]
    },
    {
      "titulo": "Recuperar Presença",
      "acoes": [
        "Escute música instrumental calma",
        "Observe sua respiração sem controlar"
      ]
    }
  ]
}
```

---

## 2.3 Na Mesma

```json
{
  "titulo": "Seu cérebro ainda está hiperativo",
  "descricao": "O excesso de estímulo ainda está presente.",
  "categorias": [
    {
      "titulo": "Recuperar Corpo",
      "acoes": [
        "Faça uma caminhada sem celular"
      ]
    },
    {
      "titulo": "Recuperar Mente",
      "acoes": [
        "Repita o mindfulness",
        "Evite conteúdo rápido ou estimulante"
      ]
    },
    {
      "titulo": "Recuperar Presença",
      "acoes": [
        "Faça grounding sensorial",
        "Observe sons do ambiente"
      ]
    }
  ]
}
```

---

# 3. GROUNDING 5-4-3-2-1

## Contexto

Indicada para:

* dissociação;
* desconexão;
* sensação de irrealidade;
* sobrecarga sensorial.

Objetivo:
reconectar ao presente.

---

## 3.1 Muito Melhor

```json
{
  "titulo": "Você voltou ao presente",
  "descricao": "Mantenha contato com o ambiente real.",
  "categorias": [
    {
      "titulo": "Recuperar Corpo",
      "acoes": [
        "Tome banho",
        "Sinta água fria nas mãos"
      ]
    },
    {
      "titulo": "Recuperar Mente",
      "acoes": [
        "Faça uma atividade manual simples",
        "Prepare uma refeição leve"
      ]
    },
    {
      "titulo": "Recuperar Presença",
      "acoes": [
        "Saia ao sol por alguns minutos",
        "Toque objetos com texturas diferentes"
      ]
    }
  ]
}
```

---

## 3.2 Um Pouco Melhor

```json
{
  "titulo": "Você está retornando aos poucos",
  "descricao": "Vá devagar.",
  "categorias": [
    {
      "titulo": "Recuperar Corpo",
      "acoes": [
        "Mantenha movimentos leves"
      ]
    },
    {
      "titulo": "Recuperar Mente",
      "acoes": [
        "Evite isolamento",
        "Permaneça em ambientes previsíveis"
      ]
    },
    {
      "titulo": "Recuperar Presença",
      "acoes": [
        "Continue usando estímulos sensoriais",
        "Observe sons e texturas ao redor"
      ]
    }
  ]
}
```

---

## 3.3 Na Mesma

```json
{
  "titulo": "Seu sistema ainda parece desconectado",
  "descricao": "Priorize segurança e estímulos suaves.",
  "categorias": [
    {
      "titulo": "Recuperar Corpo",
      "acoes": [
        "Lave o rosto com água fria",
        "Segure um objeto familiar"
      ]
    },
    {
      "titulo": "Recuperar Mente",
      "acoes": [
        "Evite telas intensas",
        "Não force foco ou produtividade"
      ]
    },
    {
      "titulo": "Recuperar Presença",
      "acoes": [
        "Repita o grounding",
        "Converse com alguém de confiança"
      ]
    }
  ]
}
```

---

# 4. RELAXAMENTO PROGRESSIVO

## Contexto

Indicada para:

* tensão física;
* agitação corporal;
* inquietação muscular;
* corpo em alerta.

Objetivo:
liberar tensão muscular.

---

## 4.1 Muito Melhor

```json
{
  "titulo": "Seu corpo soltou parte da tensão",
  "descricao": "Continue em um ritmo mais leve.",
  "categorias": [
    {
      "titulo": "Recuperar Corpo",
      "acoes": [
        "Faça alongamentos leves",
        "Tome banho quente",
        "Beba água"
      ]
    },
    {
      "titulo": "Recuperar Mente",
      "acoes": [
        "Descanse alguns minutos antes de voltar às tarefas"
      ]
    },
    {
      "titulo": "Recuperar Presença",
      "acoes": [
        "Caminhe lentamente observando o ambiente"
      ]
    }
  ]
}
```

---

## 4.2 Um Pouco Melhor

```json
{
  "titulo": "A tensão diminuiu",
  "descricao": "Mas o corpo ainda está em alerta.",
  "categorias": [
    {
      "titulo": "Recuperar Corpo",
      "acoes": [
        "Repita relaxamento localizado",
        "Reduza cafeína"
      ]
    },
    {
      "titulo": "Recuperar Mente",
      "acoes": [
        "Evite estímulos excessivos"
      ]
    },
    {
      "titulo": "Recuperar Presença",
      "acoes": [
        "Permaneça em ambiente silencioso",
        "Faça movimentos lentos"
      ]
    }
  ]
}
```

---

## 4.3 Na Mesma

```json
{
  "titulo": "Seu corpo ainda está carregando tensão",
  "descricao": "Continue priorizando segurança física e calma.",
  "categorias": [
    {
      "titulo": "Recuperar Corpo",
      "acoes": [
        "Repita exercícios corporais leves",
        "Faça respiração lenta"
      ]
    },
    {
      "titulo": "Recuperar Mente",
      "acoes": [
        "Evite esforço mental intenso"
      ]
    },
    {
      "titulo": "Recuperar Presença",
      "acoes": [
        "Procure um ambiente seguro",
        "Reduza estímulos sonoros"
      ]
    }
  ]
}
```

---

# Regras Gerais do Sistema

## O sistema NÃO deve:

* incentivar produtividade agressiva;
* sugerir multitarefa;
* estimular redes sociais;
* recomendar excesso de informação;
* usar linguagem de cobrança;
* usar tom coach/motivacional excessivo.

---

# O sistema DEVE:

* transmitir segurança;
* reduzir carga cognitiva;
* evitar recaída;
* sugerir transição gradual;
* usar linguagem acolhedora;
* oferecer autonomia ao usuário.

---

# Recomendação de UX

## Exibir no máximo:

* 2 ou 3 categorias;
* até 3 ações por categoria.

Evitar:

* listas longas;
* excesso visual;
* muitas decisões simultâneas.

---

# Sugestão Técnica de Implementação

## Estrutura recomendada

```ts
type TipoIntervencao =
  | "respiracao_calmante"
  | "desaceleracao_mental"
  | "grounding"
  | "relaxamento_progressivo";

type EstadoPosMeditacao =
  | "muito_melhor"
  | "um_pouco_melhor"
  | "na_mesma";
```

---

# Sugestões Futuras

Adicionar:

* personalização por horário;
* histórico de eficácia;
* sugestões favoritas;
* detecção de padrão de recaída;
* integração com intensidade emocional;
* sugestões adaptadas ao nível de energia.

---

# Resultado Esperado

O usuário deve sentir:

* acolhimento;
* redução de sobrecarga;
* continuidade do cuidado;
* sensação de estabilidade;
* segurança emocional;
* clareza sobre o próximo passo.

O pós-crise deve parecer:
“uma transição segura”.

Nunca:
“volte imediatamente à performance”.
