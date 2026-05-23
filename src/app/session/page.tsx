'use client'

import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { X, Wind, Brain, Footprints, Heart } from 'lucide-react'
import { AudioPlayer } from '@/components/audio/AudioPlayer'

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

function SessionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tipo = searchParams.get('tipo') || 'respiracao'
  const info = sessionInfo[tipo] || sessionInfo.respiracao
  const Icon = info.icon

  const audioFiles: Record<string, string> = {
    respiracao: 'https://vaxfjwdcndvchoukvmps.supabase.co/storage/v1/object/public/audios/RespiracaoCalmante.mp3',
    desaceleracao: '/audio/desaceleracao-mental.mp3',
    grounding: '/audio/grounding-5-4-3-2-1.mp3',
    relaxamento: '/audio/relaxamento-progressivo.mp3',
  }

  const handleSessionComplete = () => {
    setTimeout(() => {
      router.push(`/check-in?tipo=${tipo}`)
    }, 1500)
  }

  const handleFinishEarly = () => {
    router.push(`/check-in?tipo=${tipo}`)
  }

  return (
    <main className="flex min-h-screen flex-col bg-calm-bg p-6 sm:p-12 transition-colors duration-1000">
      <div className="w-full flex justify-between items-center mb-16">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-calm-primary" strokeWidth={1.5} />
          <span className="text-calm-text/50 font-medium">{info.subtitle}</span>
        </div>
        <Link href="/select" className="p-3 -mr-3 rounded-full active:bg-calm-border/50 transition-colors">
          <X className="w-8 h-8 text-calm-text/50" />
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-12">
        <h1 className="text-2xl sm:text-3xl font-medium text-center text-calm-text leading-snug max-w-sm">
          {info.message}
        </h1>

        <div className="w-full py-8">
          <AudioPlayer 
            src={audioFiles[tipo] || audioFiles.respiracao}
            onComplete={handleSessionComplete} 
          />
        </div>
      </div>

      <div className="w-full mt-auto pt-8">
        <button 
          onClick={handleFinishEarly}
          className="w-full py-5 text-lg font-medium text-calm-text/70 bg-transparent border-2 border-calm-border rounded-2xl active:bg-calm-border/50 transition-colors"
        >
          Já me sinto melhor
        </button>
      </div>
    </main>
  )
}
