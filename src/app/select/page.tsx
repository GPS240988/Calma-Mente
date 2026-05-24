'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { Wind, Brain, Footprints, Heart, ArrowLeft, Info, X, ShieldCheck, Clock, Sparkles } from 'lucide-react'
import { PageLayout } from '@/components/PageLayout'

const sessions = [
  {
    id: 'respiracao' as const,
    title: 'Respiração Calmante',
    duration: '5 min',
    icon: Wind,
    description:
      'Técnica de respiração diafragmática 4-4-6 que ativa o sistema nervoso parassimpático, reduzindo batimentos cardíacos e cortisol em poucos minutos.',
    mood: 'Ideal para: coração acelerado, falta de ar, sensação de pânico',
    tags: ['Ansiedade aguda', 'Pânico', 'Pós-medicação'],
    justification: {
      titulo: 'Respiração Diafragmática Lenta (4-4-6)',
      base: 'Terapia Cognitivo-Comportamental (TCC)',
      resumo:
        'A respiração diafragmática profunda é uma das técnicas mais validadas para redução rápida de ansiedade. O padrão 4-4-6 (inspirar 4s, segurar 4s, expirar 6s) prolonga a expiração, estimulando o nervo vago e ativando a resposta de relaxamento.',
      evidencias: [
        'Reduz frequência cardíaca e pressão arterial em 2-3 minutos',
        'Diminui os níveis de cortisol salivar em sessões breves',
        'Eficácia comprovada em estudos com pacientes de ansiedade generalizada',
        'Recomendada por protocolos clínicos de TCC para crises agudas',
      ],
    },
  },
  {
    id: 'desaceleracao' as const,
    title: 'Desaceleração Mental',
    duration: '6 min',
    icon: Brain,
    description:
      'Exercício de mindfulness que ensina a observar pensamentos como nuvens — sem julgamento, sem apego — interrompendo o ciclo de ruminação.',
    mood: 'Ideal para: pensamentos acelerados, hiperfoco destrutivo, ruminação',
    tags: ['Mente acelerada', 'Hiperfoco', 'Ruminação'],
    justification: {
      titulo: 'Observação de Pensamentos (Mindfulness)',
      base: 'Mindfulness-Based Cognitive Therapy (MBCT)',
      resumo:
        'A prática de atenção plena com nomeação de pensamentos ("labeling") desativa o circuito de ruminação no córtex pré-frontal. Em adultos com TDAH, essa técnica melhora a autorregulação emocional e reduz a hiperatividade mental.',
      evidencias: [
        'Melhora significativa na autorregulação em adultos com TDAH',
        'Reduz atividade no Default Mode Network (rede de ruminação)',
        'Aumenta a capacidade de foco sustentado após a prática',
        'Eficaz mesmo em sessões breves de 5-10 minutos',
      ],
    },
  },
  {
    id: 'grounding' as const,
    title: 'Grounding 5-4-3-2-1',
    duration: '7 min',
    icon: Footprints,
    description:
      'Ancoragem sensorial progressiva que reconecta você ao presente usando os 5 sentidos — visão, tato, audição, olfato e paladar.',
    mood: 'Ideal para: dissociação, sensação de irrealidade, "desconexão do corpo"',
    tags: ['Desorientação', 'Dissociação', 'Desconexão'],
    justification: {
      titulo: 'Técnica de Ancoragem Sensorial (5-4-3-2-1)',
      base: 'Terapia Cognitivo-Comportamental (TCC) / DBT',
      resumo:
        'A técnica 5-4-3-2-1 é um exercício de grounding da TCC que interrompe a espiral de ansiedade ao redirecionar a atenção para estímulos sensoriais concretos. Isso "puxa o freio de mão" dos pensamentos catastróficos e reativa o sistema nervoso parassimpático.',
      evidencias: [
        'Interrompe respostas automáticas de medo (amígdala)',
        'Reativa córtex somatossensorial — "volta ao corpo"',
        'Protocolo padrão em emergências psicológicas e TEPT',
        'Eficaz sem necessidade de olhos fechados — acessível em qualquer contexto',
      ],
    },
  },
  {
    id: 'relaxamento' as const,
    title: 'Relaxamento Progressivo',
    duration: '8 min',
    icon: Heart,
    description:
      'Técnica de Jacobson que percorre todo o corpo — mãos, braços, ombros, rosto, peito, pernas — com ciclos de contração e soltura muscular.',
    mood: 'Ideal para: tensão muscular, agitação corporal, inquietação física',
    tags: ['Tensão física', 'Agitação motora', 'Inquietação'],
    justification: {
      titulo: 'Relaxamento Muscular Progressivo (Jacobson)',
      base: 'Terapia Comportamental / Protocolos de Ansiedade',
      resumo:
        'O relaxamento muscular progressivo ensina o paciente a distinguir estados de tensão e relaxamento, liberando a tensão inconsciente acumulada pela ansiedade crônica. A alternância de contração e soltura ativa o sistema nervoso parassimpático de forma profunda.',
      evidencias: [
        'Reduz a ansiedade-estado em 25-40% em uma única sessão',
        'Melhora significativa na qualidade do sono',
        'Aumenta consciência corporal — identifica onde "guarda" tension',
        'Combinável com respiração para efeito potencializado',
      ],
    },
  },
]

type ModalStep = { type: 'info'; sessionId: string } | null

export default function SelectPage() {
  const router = useRouter()
  const [modal, setModal] = useState<ModalStep>(null)

  function findSession(id: string) {
    return sessions.find((s) => s.id === id)!
  }

  const headerElement = (
    <Link 
      href="/" 
      className="p-2.5 rounded-full bg-white/40 backdrop-blur-md hover:bg-white/60 border border-white/60 text-[#5E51D9] transition-all shadow-sm active:scale-95"
      title="Voltar"
    >
      <ArrowLeft className="w-6 h-6" />
    </Link>
  )

  return (
    <PageLayout header={headerElement}>
      <div className="w-full max-w-lg mx-auto flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-1 text-[#1E293B] leading-tight break-words">
          Como você está se sentindo?
        </h1>
        <p className="text-[#64748B] text-base sm:text-lg text-center mb-6 sm:mb-8 leading-snug">
          Escolha a técnica que mais se adequa ao seu momento.
        </p>

        <div className="flex flex-col gap-4">
          {sessions.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.id}
                className="w-full rounded-3xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-lg overflow-hidden transition-all duration-500 hover:border-[#8C7FE6]/50 hover:shadow-xl group"
              >
                <button
                  onClick={() => router.push(`/session?tipo=${s.id}`)}
                  className="w-full flex items-start gap-4 sm:gap-5 p-4 sm:p-5 text-left active:scale-[0.99] transition-all"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#5E51D9]" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start sm:items-center justify-between gap-2">
                      <h2 className="text-base sm:text-lg font-semibold text-[#1E293B] leading-tight break-words">
                        {s.title}
                      </h2>
                      <span className="text-xs text-[#64748B] flex-shrink-0 flex items-center gap-1 mt-0.5 sm:mt-0">
                        <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                        {s.duration}
                      </span>
                    </div>
                    <p className="text-sm text-[#475569] mt-1.5 leading-relaxed">{s.description}</p>
                    <p className="text-xs text-[#5E51D9] mt-2 font-medium leading-snug">{s.mood}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#5E51D9]/10 text-[#5E51D9]/80 border border-[#5E51D9]/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      setModal({ type: 'info', sessionId: s.id })
                    }}
                    className="p-2 rounded-full hover:bg-black/5 transition-colors flex-shrink-0 self-start mt-0.5"
                    aria-label="Ver justificativa científica"
                  >
                    <Info className="w-4 h-4 sm:w-5 sm:h-5 text-calm-text/40" strokeWidth={1.5} />
                  </span>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal de Justificativa Científica — Design Premium */}
      {modal?.type === 'info' && (() => {
        const session = findSession(modal.sessionId)
        const Icon = session.icon
        const j = session.justification
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in"
            onClick={() => setModal(null)}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div
              className="relative w-full max-w-md max-h-[85vh] overflow-y-auto bg-white/95 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header com ícone e gradiente sutil */}
              <div className="relative p-6 pb-4">
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#E3E1F7]/30 to-transparent rounded-t-3xl" />
                <div className="relative flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#5E51D9]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-[#5E51D9]/80 uppercase tracking-widest">Evidência Científica</p>
                      <h3 className="text-base font-bold text-[#1E293B] mt-0.5">{j.titulo}</h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setModal(null)}
                    className="p-1.5 rounded-full hover:bg-black/5 transition-colors"
                  >
                    <X className="w-5 h-5 text-calm-text/40" />
                  </button>
                </div>
              </div>

              {/* Base terapêutica */}
              <div className="px-6 pb-3 relative">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-[#1E6554]" strokeWidth={1.5} />
                  <span className="text-xs font-semibold text-[#1E6554]">{j.base}</span>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed">{j.resumo}</p>
              </div>

              {/* Evidências */}
              <div className="px-6 pb-6 pt-3 relative">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[#5E51D9]/80" strokeWidth={1.5} />
                  <span className="text-xs font-semibold text-[#5E51D9]/80 uppercase tracking-wide">Evidências</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {j.evidencias.map((ev, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/50 border border-white/80 rounded-2xl px-4 py-3 shadow-sm">
                      <div className="w-5 h-5 rounded-full bg-[#5E51D9]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[10px] font-bold text-[#5E51D9]">{i + 1}</span>
                      </div>
                      <p className="text-sm text-[#475569] leading-relaxed">{ev}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 relative">
                <button
                  onClick={() => setModal(null)}
                  className="w-full py-3.5 text-sm font-semibold text-[#64748B] bg-[#F1F5F9]/50 border border-white/80 rounded-2xl hover:bg-[#F1F5F9]/80 active:scale-[0.98] transition-all shadow-sm"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )
      })()}
    </PageLayout>
  )
}

