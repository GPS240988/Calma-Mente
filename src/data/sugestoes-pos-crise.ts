export type TipoIntervencao =
  | 'respiracao'
  | 'desaceleracao'
  | 'grounding'
  | 'relaxamento'

export type EstadoPosMeditacao =
  | 'muito_melhor'
  | 'um_pouco_melhor'
  | 'na_mesma'

export interface Sugestao {
  titulo: string
  descricao: string
  categorias: {
    titulo: string
    acoes: string[]
  }[]
}

const sugestoes: Record<TipoIntervencao, Record<EstadoPosMeditacao, Sugestao>> = {
  respiracao: {
    muito_melhor: {
      titulo: 'Seu corpo desacelerou',
      descricao: 'Agora mantenha esse ritmo mais calmo.',
      categorias: [
        {
          titulo: 'Recuperar Corpo',
          acoes: [
            'Beba água lentamente',
            'Faça uma caminhada leve por 5 minutos',
            'Alongue ombros e pescoço',
          ],
        },
        {
          titulo: 'Recuperar Mente',
          acoes: [
            'Ouça uma música calma',
            'Organize apenas uma tarefa simples',
            'Inicie um foco leve de 10 minutos',
          ],
        },
        {
          titulo: 'Recuperar Presença',
          acoes: [
            'Observe o ambiente sem pressa',
            'Respire naturalmente por alguns minutos',
          ],
        },
      ],
    },
    um_pouco_melhor: {
      titulo: 'A ansiedade diminuiu',
      descricao: 'Mas ainda existe tensão no corpo.',
      categorias: [
        {
          titulo: 'Recuperar Corpo',
          acoes: [
            'Repita uma sequência curta de respiração',
            'Reduza luzes e estímulos',
            'Alongue mãos e braços',
          ],
        },
        {
          titulo: 'Recuperar Mente',
          acoes: [
            'Evite decisões importantes agora',
            'Evite multitarefa',
          ],
        },
        {
          titulo: 'Recuperar Presença',
          acoes: [
            'Permaneça em um ambiente silencioso',
            'Mantenha os pés no chão por alguns instantes',
          ],
        },
      ],
    },
    na_mesma: {
      titulo: 'Seu cérebro ainda está acelerado',
      descricao: 'Não force produtividade agora.',
      categorias: [
        {
          titulo: 'Recuperar Corpo',
          acoes: [
            'Repita a intervenção',
            'Faça academia',
            'Vá de bicicleta para lagoa',
          ],
        },
        {
          titulo: 'Recuperar Mente',
          acoes: [
            'Evite telas e notificações',
            'Não tente resolver problemas complexos',
          ],
        },
        {
          titulo: 'Recuperar Presença',
          acoes: [
            'Faça grounding sensorial',
            'Converse com uma pessoa segura',
          ],
        },
      ],
    },
  },

  desaceleracao: {
    muito_melhor: {
      titulo: 'Sua mente desacelerou',
      descricao: 'Proteja esse silêncio mental.',
      categorias: [
        {
          titulo: 'Recuperar Corpo',
          acoes: [
            'Faça uma pausa física curta',
            'Respire longe de telas',
          ],
        },
        {
          titulo: 'Recuperar Mente',
          acoes: [
            'Escreva pensamentos em um bloco',
            'Escolha apenas uma tarefa',
            'Use um pomodoro leve',
          ],
        },
        {
          titulo: 'Recuperar Presença',
          acoes: [
            'Silencie notificações',
            'Observe o ambiente ao redor',
          ],
        },
      ],
    },
    um_pouco_melhor: {
      titulo: 'Os pensamentos diminuíram',
      descricao: 'Mas ainda estão puxando sua atenção.',
      categorias: [
        {
          titulo: 'Recuperar Corpo',
          acoes: [
            'Afaste-se de telas por alguns minutos',
          ],
        },
        {
          titulo: 'Recuperar Mente',
          acoes: [
            'Evite abrir muitas abas',
            'Crie uma lista curta de prioridades',
            'Evite redes sociais',
          ],
        },
        {
          titulo: 'Recuperar Presença',
          acoes: [
            'Escute música instrumental calma',
            'Observe sua respiração sem controlar',
          ],
        },
      ],
    },
    na_mesma: {
      titulo: 'Seu cérebro ainda está hiperativo',
      descricao: 'O excesso de estímulo ainda está presente.',
      categorias: [
        {
          titulo: 'Recuperar Corpo',
          acoes: [
            'Faça uma caminhada sem celular',
          ],
        },
        {
          titulo: 'Recuperar Mente',
          acoes: [
            'Repita o mindfulness',
            'Evite conteúdo rápido ou estimulante',
          ],
        },
        {
          titulo: 'Recuperar Presença',
          acoes: [
            'Faça grounding sensorial',
            'Observe sons do ambiente',
          ],
        },
      ],
    },
  },

  grounding: {
    muito_melhor: {
      titulo: 'Você voltou ao presente',
      descricao: 'Mantenha contato com o ambiente real.',
      categorias: [
        {
          titulo: 'Recuperar Corpo',
          acoes: [
            'Tome banho',
            'Sinta água fria nas mãos',
          ],
        },
        {
          titulo: 'Recuperar Mente',
          acoes: [
            'Faça uma atividade manual simples',
            'Prepare uma refeição leve',
          ],
        },
        {
          titulo: 'Recuperar Presença',
          acoes: [
            'Saia ao sol por alguns minutos',
            'Toque objetos com texturas diferentes',
          ],
        },
      ],
    },
    um_pouco_melhor: {
      titulo: 'Você está retornando aos poucos',
      descricao: 'Vá devagar.',
      categorias: [
        {
          titulo: 'Recuperar Corpo',
          acoes: [
            'Mantenha movimentos leves',
          ],
        },
        {
          titulo: 'Recuperar Mente',
          acoes: [
            'Evite isolamento',
            'Permaneça em ambientes previsíveis',
          ],
        },
        {
          titulo: 'Recuperar Presença',
          acoes: [
            'Continue usando estímulos sensoriais',
            'Observe sons e texturas ao redor',
          ],
        },
      ],
    },
    na_mesma: {
      titulo: 'Seu sistema ainda parece desconectado',
      descricao: 'Priorize segurança e estímulos suaves.',
      categorias: [
        {
          titulo: 'Recuperar Corpo',
          acoes: [
            'Lave o rosto com água fria',
            'Segure um objeto familiar',
          ],
        },
        {
          titulo: 'Recuperar Mente',
          acoes: [
            'Evite telas intensas',
            'Não force foco ou produtividade',
          ],
        },
        {
          titulo: 'Recuperar Presença',
          acoes: [
            'Repita o grounding',
            'Converse com alguém de confiança',
          ],
        },
      ],
    },
  },

  relaxamento: {
    muito_melhor: {
      titulo: 'Seu corpo soltou parte da tensão',
      descricao: 'Continue em um ritmo mais leve.',
      categorias: [
        {
          titulo: 'Recuperar Corpo',
          acoes: [
            'Faça alongamentos leves',
            'Tome banho quente',
            'Beba água',
          ],
        },
        {
          titulo: 'Recuperar Mente',
          acoes: [
            'Descanse alguns minutos antes de voltar às tarefas',
          ],
        },
        {
          titulo: 'Recuperar Presença',
          acoes: [
            'Caminhe lentamente observando o ambiente',
          ],
        },
      ],
    },
    um_pouco_melhor: {
      titulo: 'A tensão diminuiu',
      descricao: 'Mas o corpo ainda está em alerta.',
      categorias: [
        {
          titulo: 'Recuperar Corpo',
          acoes: [
            'Repita relaxamento localizado',
            'Reduza cafeína',
          ],
        },
        {
          titulo: 'Recuperar Mente',
          acoes: [
            'Evite estímulos excessivos',
          ],
        },
        {
          titulo: 'Recuperar Presença',
          acoes: [
            'Permaneça em ambiente silencioso',
            'Faça movimentos lentos',
          ],
        },
      ],
    },
    na_mesma: {
      titulo: 'Seu corpo ainda está carregando tensão',
      descricao: 'Continue priorizando segurança física e calma.',
      categorias: [
        {
          titulo: 'Recuperar Corpo',
          acoes: [
            'Repita exercícios corporais leves',
            'Faça respiração lenta',
          ],
        },
        {
          titulo: 'Recuperar Mente',
          acoes: [
            'Evite esforço mental intenso',
          ],
        },
        {
          titulo: 'Recuperar Presença',
          acoes: [
            'Procure um ambiente seguro',
            'Reduza estímulos sonoros',
          ],
        },
      ],
    },
  },
}

export function getSugestoes(
  tipo: TipoIntervencao,
  estado: EstadoPosMeditacao,
): Sugestao {
  return sugestoes[tipo]?.[estado] ?? sugestoes.respiracao.um_pouco_melhor
}

function normalizarTipo(raw: string): TipoIntervencao {
  const mapa: Record<string, TipoIntervencao> = {
    respiracao: 'respiracao',
    desaceleracao: 'desaceleracao',
    grounding: 'grounding',
    relaxamento: 'relaxamento',
  }
  return mapa[raw] ?? 'respiracao'
}

function normalizarEstado(score: number): EstadoPosMeditacao {
  if (score <= 2) return 'muito_melhor'
  if (score <= 4) return 'um_pouco_melhor'
  return 'na_mesma'
}

export { normalizarTipo, normalizarEstado }
