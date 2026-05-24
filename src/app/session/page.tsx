'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { X, Wind, Brain, Footprints, Heart, ArrowRight } from 'lucide-react'
import { AudioPlayer } from '@/components/audio/AudioPlayer'
import { createClient } from '@/lib/supabase/client'
import { PageLayout } from '@/components/PageLayout'
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
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then((res: any) => {
      const user = res.data?.user
      if (user) {
        setUser(user)
        console.log('[Session] Usuário autenticado:', user.email)
      }
    })
  }, [])

  const audioFiles: Record<string, string> = {
    respiracao: 'https://vaxfjwdcndvchoukvmps.supabase.co/storage/v1/object/public/audios/RespiracaoCalmante.mp3',
    desaceleracao: '/audio/desaceleracao-mental.mp3',
    grounding: '/audio/grounding-5-4-3-2-1.mp3',
    relaxamento: '/audio/relaxamento-progressivo.mp3',
  }

  async function handleAvaliar(key: EstadoPosMeditacao) {
    setEstadoSelecionado(key)
    setSugestao(getSugestoes(tipo, key))

    if (user) {
      const duracoes: Record<string, number> = {
        respiracao: 300,
        desaceleracao: 360,
        grounding: 420,
        relaxamento: 480
      }
      const duracao = duracoes[tipo] || 300

      try {
        console.log('[Session] Gravando sessão de meditação no Supabase para:', user.id)
        
        const anxietyMap: Record<EstadoPosMeditacao, number> = {
          muito_melhor: 2,
          um_pouco_melhor: 5,
          na_mesma: 8
        }

        const { error } = await supabase.from('sessions').insert({
          user_id: user.id,
          type: tipo,
          duration_seconds: duracao,
          completed: true,
          anxiety_after: anxietyMap[key],
          created_at: new Date().toISOString()
        })

        if (error) {
          console.error('[Session] Erro ao gravar no Supabase:', error)
        } else {
          console.log('[Session] Sessão gravada com sucesso!')
        }
      } catch (err) {
        console.error('[Session] Falha ao conectar ao Supabase:', err)
      }
    }
  }

  const headerElement = (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm">
        <Icon className="w-5 h-5 text-[#5E51D9]" strokeWidth={1.5} />
        <span className="text-xs font-semibold text-[#1E293B] leading-tight uppercase tracking-wider">{info.subtitle}</span>
      </div>
      <Link 
        href="/select" 
        className="p-2.5 rounded-full bg-white/40 backdrop-blur-md hover:bg-white/60 border border-white/60 text-[#64748B] transition-all shadow-sm active:scale-95"
        title="Sair da sessão"
      >
        <X className="w-5 h-5" />
      </Link>
    </div>
  )

  return (
    <PageLayout header={headerElement}>
      <div className="flex-1 flex flex-col gap-6 sm:gap-8 justify-center -mt-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-center text-[#1E293B] leading-tight sm:leading-snug max-w-sm mx-auto break-words">
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
            className="w-full sm:w-auto sm:min-w-[280px] py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold bg-white/40 backdrop-blur-md border border-white/60 text-[#5E51D9] hover:bg-white/60 active:scale-[0.98] transition-all shadow-md duration-300 flex items-center justify-center gap-2 cursor-pointer leading-tight"
          >
            📋 Responder Avaliação Pós-Crise
          </button>
        )}

        {avaliacaoAberta && !sugestao && (
          <div className="w-full max-w-md mx-auto p-5 sm:p-6 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-4">
            <div className="text-center mb-1 sm:mb-2">
              <h3 className="text-base sm:text-lg font-bold text-[#1E293B] leading-tight">Avaliação Pós-Crise</h3>
              <p className="text-sm text-[#64748B] mt-1 leading-snug">Como você se sente após este exercício?</p>
            </div>
            
            <div className="flex flex-col gap-3">
              {estados.map((e) => {
                let textCor = 'text-[#1E293B]'
                let borderCor = 'hover:border-[#5E51D9]/40 hover:bg-[#5E51D9]/5'
                if (e.key === 'muito_melhor') {
                  textCor = 'text-[#1E6554] font-semibold'
                  borderCor = 'hover:border-[#1E6554]/60 hover:bg-[#1E6554]/5'
                } else if (e.key === 'um_pouco_melhor') {
                  textCor = 'text-[#5E51D9] font-semibold'
                  borderCor = 'hover:border-[#5E51D9]/60 hover:bg-[#5E51D9]/5'
                } else {
                  textCor = 'text-[#64748B]'
                  borderCor = 'hover:border-black/10 hover:bg-black/5'
                }

                return (
                  <button
                    key={e.key}
                    onClick={() => handleAvaliar(e.key)}
                    className={`w-full p-4 rounded-2xl bg-white/60 border border-white/80 text-left transition-all duration-300 active:scale-[0.98] shadow-sm cursor-pointer ${borderCor}`}
                  >
                    <span className={`text-sm sm:text-base ${textCor} leading-tight`}>{e.label}</span>
                    <p className="text-xs text-[#64748B] mt-0.5 leading-snug">{e.desc}</p>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {sugestao && (
          <div className="w-full max-w-md mx-auto flex flex-col gap-4 sm:gap-5 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="p-5 sm:p-6 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-lg text-center">
              <p className="text-[10px] sm:text-xs font-semibold text-[#5E51D9]/80 uppercase tracking-widest mb-1">Avaliação Concluída</p>
              <h2 className="text-lg sm:text-xl font-bold text-[#1E293B] leading-tight break-words">{sugestao.titulo}</h2>
              <p className="text-sm text-[#475569] mt-1.5 leading-relaxed">{sugestao.descricao}</p>

              <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                {estados.map((e) => (
                  <button
                    key={e.key}
                    onClick={() => handleAvaliar(e.key)}
                    className={`px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium border transition-all duration-300 cursor-pointer ${
                      e.key === estadoSelecionado
                        ? 'bg-[#5E51D9]/15 border-[#5E51D9] text-[#5E51D9] shadow-sm font-semibold'
                        : 'bg-transparent border-white/80 text-calm-text/50 hover:border-calm-text/30'
                    }`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </div>

            {sugestao.categorias.map((cat) => (
              <div
                key={cat.titulo}
                className="w-full bg-white/50 backdrop-blur-xl border border-white/60 shadow-lg p-5 rounded-3xl text-left flex flex-col gap-3.5 transition-all duration-500"
              >
                <h3 className="text-[10px] sm:text-xs font-bold text-[#5E51D9]/80 uppercase tracking-wider border-b border-white/80 pb-2">
                  {cat.titulo}
                </h3>
                <div className="flex flex-col gap-2.5">
                  {cat.acoes.map((acao) => (
                    <div key={acao} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5E51D9] mt-2 flex-shrink-0" />
                      <p className="text-sm text-[#2C283E]/95 font-medium leading-relaxed break-words">{acao}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {(estadoSelecionado === 'muito_melhor' || estadoSelecionado === 'um_pouco_melhor') && (
              <div className="w-full bg-white/50 backdrop-blur-xl border border-white/60 shadow-lg p-5 rounded-3xl text-center flex flex-col items-center gap-3 animate-in fade-in zoom-in-95 duration-300">
                <span className="text-2xl sm:text-3xl animate-bounce">🌱</span>
                <div>
                  <h4 className="text-sm font-bold text-[#1E293B] leading-tight">Sua mente está mais tranquila</h4>
                  <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                    Que tal canalizar essa clareza para a produtividade de forma suave? Comece um Pomodoro gamificado!
                  </p>
                </div>
                <Link
                  href="/pomodoro"
                  className="w-full py-3.5 bg-[#5E51D9] hover:bg-[#5E51D9]/95 text-white font-bold text-xs rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-1.5 active:scale-95 animate-pulse duration-[2500ms] cursor-pointer"
                >
                  ⏱ Outrar Foco com seu Pet
                </Link>
              </div>
            )}

            <button
              onClick={() => router.push('/')}
              className="w-full py-3.5 sm:py-4 text-sm sm:text-base font-semibold bg-white/40 hover:bg-white/60 border border-white/60 rounded-2xl active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-[#1E293B]/80 leading-tight"
            >
              Voltar ao início
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
