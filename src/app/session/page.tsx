'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { X, Wind, Brain, Footprints, Heart, ArrowRight } from 'lucide-react'
import { AudioPlayer } from '@/components/audio/AudioPlayer'
import {
  getSugestoes,
  type TipoIntervencao,
  type EstadoPosMeditacao,
  type Sugestao,
} from '@/data/sugestoes-pos-crise'

export default function SessionPageWrapper() {
  return (
    <Suspense fallback={
      <main className="flex min-h-screen flex-col items-center justify-center p-6">
        <div className="w-12 h-12 rounded-full border-4 border-calm-primary border-t-transparent animate-spin" />
      </main>
    }>
      <SessionPage />
    </Suspense>
  )
}

const sessionInfo: Record<string, { title: string; subtitle: string; message: string; icon: any }> = {
  respiracao: {
    title: 'Respiração Calmante (~5 min)',
    subtitle: 'Respiração Guiada',
    message: 'Acompanhe o ritmo da respiração e deixe a ansiedade diminuir.',
    icon: Wind,
  },
  desaceleracao: {
    title: 'Desaceleração Mental (~6 min)',
    subtitle: 'Desaceleração Cognitiva',
    message: 'Observe os pensamentos como nuvens e deixe a mente desacelerar.',
    icon: Brain,
  },
  grounding: {
    title: 'Grounding 5-4-3-2-1 (~7 min)',
    subtitle: 'Ancoragem Sensorial',
    message: 'Conecte-se com o presente usando seus sentidos.',
    icon: Footprints,
  },
  relaxamento: {
    title: 'Relaxamento Progressivo (~8 min)',
    subtitle: 'Relaxamento Muscular',
    message: 'Libere a tensão do corpo passo a passo.',
    icon: Heart,
  },
}

const estados: { key: EstadoPosMeditacao; label: string; desc: string }[] = [
  { key: 'muito_melhor', label: 'Muito melhor', desc: 'A ansiedade passou' },
  { key: 'um_pouco_melhor', label: 'Um pouco melhor', desc: 'Mais calmo, mas ainda alerta' },
  { key: 'na_mesma', label: 'Na mesma', desc: 'Preciso de mais tempo' },
]

function SessionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tipo = (searchParams.get('tipo') || 'respiracao') as TipoIntervencao
  const info = sessionInfo[tipo] || sessionInfo.respiracao
  const Icon = info.icon

  const [avaliacaoAberta, setAvaliacaoAberta] = useState(false)
  const [estadoSelecionado, setEstadoSelecionado] = useState<EstadoPosMeditacao | null>(null)
  const [sugestao, setSugestao] = useState<Sugestao | null>(null)

  const audioFiles: Record<string, string> = {
    respiracao: 'https://vaxfjwdcndvchoukvmps.supabase.co/storage/v1/object/public/audios/RespiracaoCalmante.mp3',
    desaceleracao: '/audio/desaceleracao-mental.mp3',
    grounding: '/audio/grounding-5-4-3-2-1.mp3',
    relaxamento: '/audio/relaxamento-progressivo.mp3',
  }

  function handleAvaliar(key: EstadoPosMeditacao) {
    setEstadoSelecionado(key)
    setSugestao(getSugestoes(tipo, key))
  }

  return (
    <main className="flex min-h-screen flex-col bg-calm-bg p-6 sm:p-12 transition-colors duration-1000">
      <div className="w-full flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-calm-primary" strokeWidth={1.5} />
          <span className="text-calm-text/50 font-medium">{info.subtitle}</span>
        </div>
        <Link href="/select" className="p-3 -mr-3 rounded-full active:bg-calm-border/50 transition-colors">
          <X className="w-8 h-8 text-calm-text/50" />
        </Link>
      </div>

      <div className="flex-1 flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-medium text-center text-calm-text leading-snug max-w-sm mx-auto">
          {info.message}
        </h1>

        <div className="w-full">
          <AudioPlayer
            src={audioFiles[tipo] || audioFiles.respiracao}
            onComplete={() => setAvaliacaoAberta(true)}
          />
        </div>

        {!avaliacaoAberta && (
          <button
            onClick={() => setAvaliacaoAberta(true)}
            className="w-full py-5 text-lg font-medium text-calm-primary bg-calm-primary/10 border-2 border-calm-primary/30 rounded-2xl active:scale-[0.98] transition-all hover:bg-calm-primary/20"
          >
            Avaliação Pós-Crise
          </button>
        )}

        {avaliacaoAberta && !sugestao && (
          <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-sm text-calm-text/50 text-center mb-1">Como você se sente agora?</p>
            {estados.map((e) => (
              <button
                key={e.key}
                onClick={() => handleAvaliar(e.key)}
                className="w-full p-4 rounded-2xl bg-calm-card border border-calm-border text-left hover:border-calm-primary/40 active:scale-[0.98] transition-all"
              >
                <span className="text-lg font-medium text-calm-text">{e.label}</span>
                <p className="text-sm text-calm-text/60 mt-0.5">{e.desc}</p>
              </button>
            ))}
          </div>
        )}

        {sugestao && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="text-center">
              <p className="text-sm text-calm-text/50 mb-1">Avaliação Pós-Crise</p>
              <h2 className="text-xl font-semibold text-calm-text">{sugestao.titulo}</h2>
              <p className="text-sm text-calm-text/70 mt-1">{sugestao.descricao}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {estados.map((e) => (
                <button
                  key={e.key}
                  onClick={() => handleAvaliar(e.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    e.key === estadoSelecionado
                      ? 'bg-calm-primary/15 border-calm-primary text-calm-primary'
                      : 'bg-transparent border-calm-border text-calm-text/50 hover:border-calm-text/30'
                  }`}
                >
                  {e.label}
                </button>
              ))}
            </div>

            {sugestao.categorias.map((cat) => (
              <div
                key={cat.titulo}
                className="w-full bg-calm-card border border-calm-border p-5 rounded-2xl text-left flex flex-col gap-3"
              >
                <h3 className="text-xs font-semibold text-calm-primary/80 uppercase tracking-wide">
                  {cat.titulo}
                </h3>
                {cat.acoes.map((acao) => (
                  <div key={acao} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-calm-primary mt-2 flex-shrink-0" />
                    <p className="text-base text-calm-text font-medium">{acao}</p>
                  </div>
                ))}
              </div>
            ))}

            <button
              onClick={() => router.push('/')}
              className="w-full mt-2 py-4 text-base font-medium btn-primary shadow-md flex items-center justify-center gap-2"
            >
              Voltar ao início
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
