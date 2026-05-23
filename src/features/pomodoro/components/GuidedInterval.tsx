'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Wind, X, Play, RotateCcw, Volume2 } from 'lucide-react'
import { usePomodoro } from '../context/PomodoroContext'

export const GuidedInterval: React.FC = () => {
  const { timerMode, triggerGuidedBreakComplete } = usePomodoro()
  const [isOpen, setIsOpen] = useState(false)
  const [breathPhase, setBreathPhase] = useState<'inspire' | 'retem' | 'expire'>('inspire')
  const [secondsLeft, setSecondsLeft] = useState(60)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const breathCycleRef = useRef<NodeJS.Timeout | null>(null)

  // Web Audio breathing helper tone
  const playBreathingHarmonic = useCallback((type: 'in' | 'out' | 'hold') => {
    if (typeof window === 'undefined') return
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContextClass) return
      const ctx = new AudioContextClass()
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()

      // High gentle note for inhale, lower grounding note for exhale
      const freq = type === 'in' ? 523.25 : type === 'out' ? 349.23 : 392.00 // C5, F4, G4
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      osc.type = 'sine'

      gainNode.gain.setValueAtTime(0, ctx.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.5)
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0)

      osc.connect(gainNode)
      gainNode.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 3.0)
    } catch (_) {}
  }, [])

  // Breathing loop logic: 4s inhale, 2s hold, 4s exhale
  const runBreathingCycle = useCallback(() => {
    if (!isPlaying) return

    setBreathPhase('inspire')
    playBreathingHarmonic('in')

    breathCycleRef.current = setTimeout(() => {
      setBreathPhase('retem')
      playBreathingHarmonic('hold')

      breathCycleRef.current = setTimeout(() => {
        setBreathPhase('expire')
        playBreathingHarmonic('out')

        breathCycleRef.current = setTimeout(() => {
          // Re-trigger loop recursively
          runBreathingCycle()
        }, 4000)
      }, 2000)
    }, 4000)
  }, [isPlaying, playBreathingHarmonic])

  // Timer countdown hook
  useEffect(() => {
    if (isPlaying && secondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            // Complete!
            setIsPlaying(false)
            triggerGuidedBreakComplete()
            alert('Parabéns! Você concluiu a pausa consciente de respiração e ganhou +5 moedas!')
            setIsOpen(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, secondsLeft, triggerGuidedBreakComplete])

  // Breathing loop runner hook
  useEffect(() => {
    if (isPlaying) {
      runBreathingCycle()
    } else {
      if (breathCycleRef.current) clearTimeout(breathCycleRef.current)
    }

    return () => {
      if (breathCycleRef.current) clearTimeout(breathCycleRef.current)
    }
  }, [isPlaying, runBreathingCycle])

  const handleStart = () => {
    setIsPlaying(true)
  }

  const handleClose = () => {
    setIsPlaying(false)
    setIsOpen(false)
    setSecondsLeft(60)
  }

  // Render only if currently in break/pause active phase
  if (timerMode !== 'pausa') return null

  return (
    <>
      {/* Discrete suggestion banner banner */}
      {!isOpen && (
        <div className="w-full flex items-center justify-between p-4 rounded-2xl bg-calm-primary/10 border border-calm-primary/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-calm-primary/20 text-calm-primary animate-pulse">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-calm-text">Pausa Consciente Recomendada</h4>
              <p className="text-[11px] text-calm-text/60">Respire fundo por 1 minuto e ganhe 🪙 5 moedas bônus.</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-calm-primary text-white hover:bg-calm-primary/95 active:scale-95 transition-all shadow-sm flex items-center gap-1"
          >
            Começar
          </button>
        </div>
      )}

      {/* Guided Breathing Overlay Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          
          <div className="relative w-full max-w-md bg-calm-card/95 border border-calm-border/60 rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-center text-center gap-6 animate-in zoom-in-95 duration-300">
            
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-calm-border/50 text-calm-text/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="flex flex-col gap-1 mt-2">
              <h3 className="font-bold text-lg text-calm-text">Exercício de Respiração Rápido</h3>
              <p className="text-xs text-calm-text/50">Restabeleça o equilíbrio e alivie a tensão mental</p>
            </div>

            {/* Visual breathing expanding circle container */}
            <div className="w-56 h-56 flex items-center justify-center relative select-none">
              
              {/* Animated pulsating circles */}
              <div 
                className={`absolute rounded-full border border-calm-primary/10 transition-all ease-in-out duration-[4000ms] ${
                  !isPlaying ? 'w-48 h-48' :
                  breathPhase === 'inspire' ? 'w-52 h-52 bg-calm-primary/15' :
                  breathPhase === 'retem' ? 'w-52 h-52 bg-calm-primary/25 scale-[1.03]' :
                  'w-36 h-36 bg-calm-primary/5'
                }`} 
              />
              <div 
                className={`absolute rounded-full flex items-center justify-center shadow-lg border border-calm-primary/20 transition-all ease-in-out duration-[4000ms] ${
                  !isPlaying ? 'w-36 h-36 bg-calm-card' :
                  breathPhase === 'inspire' ? 'w-44 h-44 bg-calm-card scale-105' :
                  breathPhase === 'retem' ? 'w-44 h-44 bg-calm-card scale-105 ring-2 ring-calm-primary/30' :
                  'w-28 h-28 bg-calm-card scale-90'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold font-mono text-calm-text">{secondsLeft}s</span>
                  <span className="text-[10px] text-calm-text/40 font-semibold uppercase tracking-wider mt-1">Restantes</span>
                </div>
              </div>

            </div>

            {/* Dynamic breath instruction instruction */}
            <div className="h-10 flex items-center justify-center">
              {!isPlaying ? (
                <p className="text-sm font-semibold text-calm-text/60">Pressione "Iniciar" para guiar a respiração</p>
              ) : (
                <p className="text-xl font-bold text-calm-primary uppercase tracking-wider animate-pulse duration-[2000ms]">
                  {breathPhase === 'inspire' ? '🌬️ Inspire lentamente...' :
                   breathPhase === 'retem' ? '🧘 Segure o ar...' :
                   '💨 Expire suavemente...'}
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="w-full flex flex-col gap-3 mt-2">
              {!isPlaying ? (
                <button
                  onClick={handleStart}
                  className="w-full py-4 text-base font-bold bg-calm-primary text-white rounded-2xl shadow-md hover:bg-calm-primary/95 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-white stroke-none" /> Iniciar Respiração
                </button>
              ) : (
                <button
                  onClick={handleClose}
                  className="w-full py-4 text-base font-medium bg-transparent border-2 border-calm-border text-calm-text/60 hover:text-calm-text rounded-2xl active:bg-calm-border/40 transition-colors"
                >
                  Pular Exercício
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  )
}
