'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { PageLayout } from '@/components/PageLayout'
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
          <div className="w-12 h-12 rounded-full border-4 border-[#5E51D9] border-t-transparent animate-spin" />
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
    <PageLayout>
      <div className="w-full max-w-md mx-auto flex flex-col gap-8 text-center justify-center flex-1 -mt-8">
        {step === 'rating' ? (
          <div className="flex flex-col gap-8 animate-in fade-in zoom-in duration-500 bg-white/50 backdrop-blur-xl border border-white/60 p-6 sm:p-8 rounded-3xl shadow-lg">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#1E293B] leading-tight">
                Como você se sente agora?
              </h1>
              <p className="text-sm text-[#64748B] mt-2">Avalie o seu estado após a atividade.</p>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleRating(1)}
                className="w-full py-6 rounded-2xl bg-white/60 border border-white/80 shadow-sm flex flex-col items-center justify-center gap-1 active:scale-[0.98] transition-all cursor-pointer hover:border-[#1E6554]/60 hover:bg-[#1E6554]/5 group"
              >
                <span className="text-xl font-bold text-[#1E6554]">
                  Muito melhor
                </span>
                <span className="text-xs text-[#64748B] font-normal">
                  A ansiedade passou
                </span>
              </button>

              <button
                onClick={() => handleRating(3)}
                className="w-full py-6 rounded-2xl bg-white/60 border border-white/80 shadow-sm flex flex-col items-center justify-center gap-1 active:scale-[0.98] transition-all cursor-pointer hover:border-[#5E51D9]/60 hover:bg-[#5E51D9]/5 group"
              >
                <span className="text-xl font-bold text-[#5E51D9]">
                  Um pouco melhor
                </span>
                <span className="text-xs text-[#64748B] font-normal">
                  Mais calmo, mas ainda alerta
                </span>
              </button>

              <button
                onClick={() => handleRating(5)}
                className="w-full py-6 rounded-2xl bg-white/40 border border-white/60 shadow-sm flex flex-col items-center justify-center gap-1 active:scale-[0.98] transition-all cursor-pointer hover:border-black/10 hover:bg-black/5 group"
              >
                <span className="text-xl font-bold text-[#64748B]">Na mesma</span>
                <span className="text-xs text-[#64748B] font-normal">
                  Preciso de mais tempo
                </span>
              </button>
            </div>
          </div>
        ) : sugestao ? (
          <div className="flex flex-col gap-6 items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col gap-3 bg-white/50 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-lg w-full">
              <p className="text-[10px] font-semibold text-[#5E51D9]/80 uppercase tracking-widest">Recomendação pós-crise</p>
              <h1 className="text-xl sm:text-2xl font-bold text-[#1E293B] leading-tight">
                {sugestao.titulo}
              </h1>
              <p className="text-sm text-[#475569] leading-relaxed mt-1">
                {sugestao.descricao}
              </p>
            </div>

            {sugestao.categorias.map((cat) => (
              <div
                key={cat.titulo}
                className="w-full bg-white/50 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-lg text-left flex flex-col gap-4"
              >
                <h2 className="text-xs font-bold text-[#5E51D9]/80 uppercase tracking-wider border-b border-white/80 pb-2">
                  {cat.titulo}
                </h2>
                {cat.acoes.map((acao) => (
                  <div key={acao} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5E51D9] mt-2.5 flex-shrink-0" />
                    <p className="text-sm sm:text-base text-[#2C283E] font-medium leading-relaxed">
                      {acao}
                    </p>
                  </div>
                ))}
              </div>
            ))}

            <button
              onClick={() => router.push('/')}
              className="w-full py-4 bg-[#5E51D9] hover:bg-[#5E51D9]/95 text-white font-bold rounded-2xl shadow-md mt-4 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              Voltar ao início
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : null}
      </div>
    </PageLayout>
  )
}
