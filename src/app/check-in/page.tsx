'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import {
  getSugestoes,
  normalizarTipo,
  normalizarEstado,
  type Sugestao,
} from '@/data/sugestoes-pos-crise'

export default function CheckInPageWrapper() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-calm-bg">
          <div className="w-12 h-12 rounded-full border-4 border-calm-primary border-t-transparent animate-spin" />
        </main>
      }
    >
      <CheckInPage />
    </Suspense>
  )
}

function CheckInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tipoRaw = searchParams.get('tipo') || 'respiracao'
  const tipo = normalizarTipo(tipoRaw)

  const [step, setStep] = useState<'rating' | 'suggestion'>('rating')
  const [sugestao, setSugestao] = useState<Sugestao | null>(null)

  const handleRating = (score: number) => {
    const estado = normalizarEstado(score)
    setSugestao(getSugestoes(tipo, estado))
    setStep('suggestion')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 bg-calm-bg transition-all duration-500">
      <div className="w-full max-w-md flex flex-col gap-8 text-center">
        {step === 'rating' ? (
          <div className="flex flex-col gap-10 animate-in fade-in zoom-in duration-500">
            <h1 className="text-3xl font-semibold text-calm-text">
              Como você se sente agora?
            </h1>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleRating(1)}
                className="btn-large bg-calm-card border border-calm-border shadow-sm flex flex-col gap-1 py-6"
              >
                <span className="text-2xl font-medium text-calm-primary">
                  Muito melhor
                </span>
                <span className="text-sm text-calm-text/60 font-normal">
                  A ansiedade passou
                </span>
              </button>

              <button
                onClick={() => handleRating(3)}
                className="btn-large bg-calm-card border border-calm-border shadow-sm flex flex-col gap-1 py-6"
              >
                <span className="text-2xl font-medium text-calm-text">
                  Um pouco melhor
                </span>
                <span className="text-sm text-calm-text/60 font-normal">
                  Mais calmo, mas ainda alerta
                </span>
              </button>

              <button
                onClick={() => handleRating(5)}
                className="btn-large bg-transparent border border-calm-text/20 text-calm-text/70 flex flex-col gap-1 py-6"
              >
                <span className="text-xl font-medium">Na mesma</span>
                <span className="text-sm font-normal">
                  Preciso de mais tempo
                </span>
              </button>
            </div>
          </div>
        ) : sugestao ? (
          <div className="flex flex-col gap-8 items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-semibold text-calm-text">
                {sugestao.titulo}
              </h1>
              <p className="text-calm-text/70 text-lg">
                {sugestao.descricao}
              </p>
            </div>

            {sugestao.categorias.map((cat) => (
              <div
                key={cat.titulo}
                className="w-full bg-calm-card border border-calm-border p-6 rounded-2xl shadow-sm text-left flex flex-col gap-4"
              >
                <h2 className="text-sm font-semibold text-calm-primary/80 uppercase tracking-wide">
                  {cat.titulo}
                </h2>
                {cat.acoes.map((acao) => (
                  <div key={acao} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-calm-primary mt-2 flex-shrink-0" />
                    <p className="text-lg text-calm-text font-medium">
                      {acao}
                    </p>
                  </div>
                ))}
              </div>
            ))}

            <button
              onClick={() => router.push('/')}
              className="btn-large btn-primary shadow-md mt-6 flex items-center gap-2"
            >
              Voltar ao início
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        ) : null}
      </div>
    </main>
  )
}
