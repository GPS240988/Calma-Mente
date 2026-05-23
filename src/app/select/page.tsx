'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { Wind, Brain, Footprints, Heart, ArrowLeft, Info, X, ClipboardList } from 'lucide-react'
import { getSugestoes, type Sugestao, type EstadoPosMeditacao } from '@/data/sugestoes-pos-crise'

const sessions = [
  {
    id: 'respiracao' as const,
    title: 'Respiração Calmante (~5 min)',
    description: 'Reduzir ansiedade aguda através da respiração diafragmática lenta',
    duration: '5 min',
    icon: Wind,
    mood: 'Ansiedade alta, aceleração',
    justification:
      'A respiração diafragmática profunda alivia rapidamente sintomas de ansiedade, reduzindo a frequência respiratória e permitindo que o corpo acalme mais depressa. Estudos mostram que mesmo exercícios breves de respiração guiada podem diminuir a excitação fisiológica e a ansiedade.',
  },
  {
    id: 'desaceleracao' as const,
    title: 'Desaceleração Mental (~6 min)',
    description: 'Desacelerar pensamentos acelerados e hiperatividade mental via mindfulness',
    duration: '6 min',
    icon: Brain,
    mood: 'Mente acelerada, hiperfoco',
    justification:
      'A prática de atenção plena (mindfulness) tem mostrado melhorar a autorregulação emocional e a capacidade de foco em adultos com TDAH. Técnicas de nomear pensamentos e observá-los (sem julgamento) são eficazes para interromper o ciclo de pensamentos acelerados e reduzir a ansiedade e hiperatividade mental.',
  },
  {
    id: 'grounding' as const,
    title: 'Grounding 5-4-3-2-1 (~7 min)',
    description: 'Reconectar com o presente por ancoragem sensorial (5 sentidos)',
    duration: '7 min',
    icon: Footprints,
    mood: 'Desorientação, desconexão',
    justification:
      'A técnica de grounding 5-4-3-2-1 ativa os cinco sentidos para trazer atenção ao presente e interromper a resposta de medo automática. Na TCC, esse exercício reduz a ansiedade e "puxa o freio de mão" dos pensamentos catastróficos, reativando o sistema nervoso parassimpático de segurança.',
  },
  {
    id: 'relaxamento' as const,
    title: 'Relaxamento Progressivo (~8 min)',
    description: 'Liberar tensão física acumulada através de contração e relaxamento muscular',
    duration: '8 min',
    icon: Heart,
    mood: 'Tensão física, agitação corporal',
    justification:
      'O relaxamento muscular progressivo (Jacobson) ensina o paciente a liberar a tensão inconsciente produzida pela ansiedade. Estudos e guias terapêuticos relatam que essa prática simples reduz a ansiedade, tensão muscular e melhora o estado de relaxamento geral. A alternância de contração e relaxamento aumenta a consciência corporal e ativa o sistema nervoso parassimpático.',
  },
]

type ModalStep =
  | { type: 'info'; sessionId: string }
  | { type: 'avaliacao_estado'; sessionId: string }
  | { type: 'sugestoes'; sessionId: string; estado: EstadoPosMeditacao; sugestao: Sugestao }
  | null

const estados: { key: EstadoPosMeditacao; label: string; desc: string; cor: string }[] = [
  { key: 'muito_melhor', label: 'Muito melhor', desc: 'A ansiedade passou', cor: 'text-calm-primary' },
  { key: 'um_pouco_melhor', label: 'Um pouco melhor', desc: 'Mais calmo, mas ainda alerta', cor: 'text-calm-text' },
  { key: 'na_mesma', label: 'Na mesma', desc: 'Preciso de mais tempo', cor: 'text-calm-text/70' },
]

export default function SelectPage() {
  const router = useRouter()
  const [modal, setModal] = useState<ModalStep>(null)

  function findSession(id: string) {
    return sessions.find((s) => s.id === id)!
  }

  return (
    <main className="flex min-h-screen flex-col p-6 sm:p-12">
      <div className="w-full flex justify-start mb-8">
        <Link href="/" className="p-2 -ml-2 rounded-full active:bg-calm-border/50 transition-colors">
          <ArrowLeft className="w-8 h-8 text-calm-primary" />
        </Link>
      </div>

      <div className="w-full max-w-lg mx-auto flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-center mb-1">Como você está se sentindo?</h1>
        <p className="text-calm-text/70 text-lg text-center mb-8">Escolha a técnica que mais se adequa ao seu momento.</p>

        <div className="flex flex-col gap-4">
          {sessions.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.id}
                className="w-full rounded-2xl bg-calm-card border border-calm-border shadow-sm transition-all hover:border-calm-primary/40"
              >
                <button
                  onClick={() => router.push(`/session?tipo=${s.id}`)}
                  className="w-full flex items-center gap-5 p-5 text-left active:scale-[0.98] transition-all"
                >
                  <div className="w-14 h-14 rounded-full bg-calm-secondary/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-calm-primary" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-lg font-semibold text-calm-text truncate">{s.title}</h2>
                      <span className="text-sm text-calm-text/50 flex-shrink-0">{s.duration}</span>
                    </div>
                    <p className="text-sm text-calm-text/70 mt-0.5 line-clamp-2">{s.description}</p>
                    <p className="text-xs text-calm-primary/60 mt-1">{s.mood}</p>
                  </div>
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      setModal({ type: 'info', sessionId: s.id })
                    }}
                    className="p-2 rounded-full hover:bg-calm-border/50 transition-colors flex-shrink-0"
                    aria-label="Ver justificativa"
                  >
                    <Info className="w-5 h-5 text-calm-text/40" strokeWidth={1.5} />
                  </span>
                </button>

                <button
                  onClick={() => setModal({ type: 'avaliacao_estado', sessionId: s.id })}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 border-t border-calm-border text-sm text-calm-primary/70 hover:text-calm-primary hover:bg-calm-border/20 rounded-b-2xl transition-colors"
                >
                  <ClipboardList className="w-4 h-4" strokeWidth={1.5} />
                  Avaliação Pós-Crise
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {modal?.type === 'info' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setModal(null)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md bg-calm-card border border-calm-border rounded-3xl shadow-xl p-6 animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-calm-text">Justificativa Científica</h3>
              <button
                onClick={() => setModal(null)}
                className="p-1 rounded-full hover:bg-calm-border/50 transition-colors"
              >
                <X className="w-5 h-5 text-calm-text/50" />
              </button>
            </div>
            <p className="text-sm text-calm-text/80 leading-relaxed">
              {findSession(modal.sessionId).justification}
            </p>
          </div>
        </div>
      )}

      {modal?.type === 'avaliacao_estado' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setModal(null)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md bg-calm-card border border-calm-border rounded-3xl shadow-xl p-6 animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-calm-text">
                Avaliação Pós-Crise
              </h3>
              <button
                onClick={() => setModal(null)}
                className="p-1 rounded-full hover:bg-calm-border/50 transition-colors"
              >
                <X className="w-5 h-5 text-calm-text/50" />
              </button>
            </div>
            <p className="text-sm text-calm-text/70 mb-6">
              Como você se sentiria após {findSession(modal.sessionId).title.toLowerCase()}?
            </p>

            <div className="flex flex-col gap-3">
              {estados.map((e) => (
                <button
                  key={e.key}
                  onClick={() => {
                    const sugestao = getSugestoes(findSession(modal.sessionId).id, e.key)
                    setModal({ type: 'sugestoes', sessionId: modal.sessionId, estado: e.key, sugestao })
                  }}
                  className="w-full p-4 rounded-2xl bg-calm-card border border-calm-border text-left hover:border-calm-primary/40 active:scale-[0.98] transition-all"
                >
                  <span className={`text-lg font-medium ${e.cor}`}>{e.label}</span>
                  <p className="text-sm text-calm-text/60 mt-0.5">{e.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {modal?.type === 'sugestoes' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setModal(null)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md max-h-[85vh] overflow-y-auto bg-calm-card border border-calm-border rounded-3xl shadow-xl p-6 animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-calm-text">{modal.sugestao.titulo}</h3>
                <p className="text-sm text-calm-text/70 mt-1">{modal.sugestao.descricao}</p>
              </div>
              <button
                onClick={() => setModal(null)}
                className="p-1 rounded-full hover:bg-calm-border/50 transition-colors flex-shrink-0 ml-4"
              >
                <X className="w-5 h-5 text-calm-text/50" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-6 mb-4">
              {estados.map((e) => (
                <button
                  key={e.key}
                  onClick={() => {
                    const sugestao = getSugestoes(findSession(modal.sessionId).id, e.key)
                    setModal({ type: 'sugestoes', sessionId: modal.sessionId, estado: e.key, sugestao })
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    e.key === modal.estado
                      ? 'bg-calm-primary/15 border-calm-primary text-calm-primary'
                      : 'bg-transparent border-calm-border text-calm-text/50 hover:border-calm-text/30'
                  }`}
                >
                  {e.label}
                </button>
              ))}
            </div>

            {modal.sugestao.categorias.map((cat) => (
              <div
                key={cat.titulo}
                className="w-full bg-calm-bg border border-calm-border p-4 rounded-2xl text-left flex flex-col gap-3 mb-3"
              >
                <h4 className="text-xs font-semibold text-calm-primary/80 uppercase tracking-wide">
                  {cat.titulo}
                </h4>
                {cat.acoes.map((acao) => (
                  <div key={acao} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-calm-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-calm-text font-medium">{acao}</p>
                  </div>
                ))}
              </div>
            ))}

            <button
              onClick={() => setModal(null)}
              className="w-full mt-2 py-4 text-base font-medium text-calm-text/70 bg-transparent border-2 border-calm-border rounded-2xl active:bg-calm-border/50 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
