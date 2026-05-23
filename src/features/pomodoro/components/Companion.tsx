'use client'

import React, { useMemo } from 'react'
import { Sparkles, Heart, AlertTriangle } from 'lucide-react'
import { usePomodoro } from '../context/PomodoroContext'

export const Companion: React.FC = () => {
  const { pet, coins, level, timerMode, isActive } = usePomodoro()

  // Get dynamic speech bubble text based on pet state
  const speechText = useMemo(() => {
    if (isActive && timerMode === 'foco') {
      return `Shhh... Foco profundo agora! Estou aqui quietinho te fazendo companhia.`
    }
    if (timerMode === 'pausa') {
      return `Excelente trabalho! Que tal fazermos um alongamento ou beber um copo de água agora?`
    }
    if (pet.hunger < 30) {
      return `Minha barriguinha está roncando... Pode me alimentar com uma ração na loja?`
    }
    if (pet.happiness < 40) {
      return `Estou me sentindo um pouco entediado... Vamos brincar com algum brinquedo?`
    }
    if (pet.level > 1 && pet.xp === 0) {
      return `Uau! Subi de nível! Obrigado por me ajudar a crescer focando junto comigo!`
    }
    
    const greetings = [
      `Olá! Estou pronto para focar. O que vamos conquistar hoje?`,
      `Você sabia que fazer pausas ajuda a recarregar o cérebro? Adoro nossas pausas!`,
      `Estou me sentindo ótimo ao seu lado. Vamos começar um ciclo de foco?`,
      `Lembre-se de ajustar a postura dos ombros. Estou te observando e cuidando de você!`
    ]
    
    // Choose greeting based on name length/type so it's deterministic but feels organic
    const idx = (pet.name.length + pet.level) % greetings.length
    return greetings[idx]
  }, [pet, timerMode, isActive])

  // Custom rendered SVG pet avatar for pixel perfect zero-asset scaling
  const renderPetSvg = () => {
    const isSleeping = isActive && timerMode === 'foco'
    
    if (pet.type === 'gato') {
      return (
        <svg className="w-36 h-36 drop-shadow-md select-none" viewBox="0 0 100 100">
          {/* Ears */}
          <polygon points="25,40 15,15 40,30" className="fill-calm-accent/80 stroke-calm-text stroke-[1.5]" />
          <polygon points="75,40 85,15 60,30" className="fill-calm-accent/80 stroke-calm-text stroke-[1.5]" />
          <polygon points="28,37 20,20 38,30" className="fill-calm-secondary/60" />
          <polygon points="72,37 80,20 62,30" className="fill-calm-secondary/60" />
          
          {/* Tail */}
          <path d="M 75 75 C 85 75, 88 55, 83 45 C 80 40, 77 42, 80 47 C 83 55, 80 70, 72 71" className="fill-calm-accent stroke-calm-text stroke-[1.5] animate-wiggle" />

          {/* Body */}
          <ellipse cx="50" cy="70" rx="28" ry="20" className="fill-calm-accent stroke-calm-text stroke-[1.5]" />
          
          {/* Chest white spot */}
          <ellipse cx="50" cy="72" rx="14" ry="10" className="fill-white/80" />

          {/* Head */}
          <circle cx="50" cy="45" r="23" className="fill-calm-accent stroke-calm-text stroke-[1.5] origin-center animate-bob" />

          {/* Face details (eyes, nose, whiskers) */}
          <g className="origin-center animate-bob">
            {isSleeping ? (
              // Sleeping eyes (arcs)
              <>
                <path d="M 38 45 Q 42 49, 44 45" fill="none" className="stroke-calm-text stroke-[2]" strokeLinecap="round" />
                <path d="M 62 45 Q 58 49, 56 45" fill="none" className="stroke-calm-text stroke-[2]" strokeLinecap="round" />
              </>
            ) : (
              // Open happy eyes
              <>
                <circle cx="40" cy="45" r="3.5" className="fill-calm-text" />
                <circle cx="60" cy="45" r="3.5" className="fill-calm-text" />
                <circle cx="39" cy="44" r="1" className="fill-white" />
                <circle cx="59" cy="44" r="1" className="fill-white" />
              </>
            )}

            {/* Nose & Mouth */}
            <polygon points="50,49 48,47 52,47" className="fill-calm-text" />
            <path d="M 48 51 Q 50 53, 50 51 Q 50 53, 52 51" fill="none" className="stroke-calm-text stroke-[1.5]" strokeLinecap="round" />

            {/* Rosy cheeks if happy */}
            {pet.happiness > 50 && (
              <>
                <circle cx="34" cy="49" r="3" className="fill-red-400/40" />
                <circle cx="66" cy="49" r="3" className="fill-red-400/40" />
              </>
            )}

            {/* Whiskers */}
            <line x1="28" y1="49" x2="18" y2="47" className="stroke-calm-text/80 stroke-[1]" />
            <line x1="28" y1="52" x2="16" y2="52" className="stroke-calm-text/80 stroke-[1]" />
            <line x1="72" y1="49" x2="82" y2="47" className="stroke-calm-text/80 stroke-[1]" />
            <line x1="72" y1="52" x2="84" y2="52" className="stroke-calm-text/80 stroke-[1]" />
          </g>
        </svg>
      )
    }

    if (pet.type === 'cachorro') {
      return (
        <svg className="w-36 h-36 drop-shadow-md select-none" viewBox="0 0 100 100">
          {/* Tail */}
          <path d="M 75 72 Q 88 65, 83 50" fill="none" className="stroke-calm-accent stroke-[7]" strokeLinecap="round" />
          <path d="M 75 72 Q 88 65, 83 50" fill="none" className="stroke-calm-text stroke-[1.5]" />

          {/* Body */}
          <ellipse cx="50" cy="70" rx="28" ry="20" className="fill-calm-accent stroke-calm-text stroke-[1.5]" />
          <ellipse cx="48" cy="70" rx="15" ry="12" className="fill-calm-secondary/50" />

          {/* Paws */}
          <circle cx="34" cy="85" r="6" className="fill-calm-accent stroke-calm-text stroke-[1.5]" />
          <circle cx="66" cy="85" r="6" className="fill-calm-accent stroke-calm-text stroke-[1.5]" />

          {/* Head */}
          <circle cx="50" cy="42" r="22" className="fill-calm-accent stroke-calm-text stroke-[1.5] origin-center animate-bob" />

          {/* Ears (floppy dog ears) */}
          <g className="origin-center animate-bob">
            <path d="M 29 35 C 16 35, 14 55, 23 58 C 28 60, 31 46, 31 38" className="fill-calm-secondary stroke-calm-text stroke-[1.5]" />
            <path d="M 71 35 C 84 35, 86 55, 77 58 C 72 60, 69 46, 69 38" className="fill-calm-secondary stroke-calm-text stroke-[1.5]" />
          </g>

          {/* Face details */}
          <g className="origin-center animate-bob">
            {isSleeping ? (
              <>
                <path d="M 38 43 Q 41 46, 43 43" fill="none" className="stroke-calm-text stroke-[2]" strokeLinecap="round" />
                <path d="M 62 43 Q 59 46, 57 43" fill="none" className="stroke-calm-text stroke-[2]" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="40" cy="42" r="3.5" className="fill-calm-text" />
                <circle cx="60" cy="42" r="3.5" className="fill-calm-text" />
                <circle cx="38.5" cy="40.5" r="1" className="fill-white" />
                <circle cx="58.5" cy="40.5" r="1" className="fill-white" />
              </>
            )}

            {/* Muzzle */}
            <ellipse cx="50" cy="49" rx="8" ry="6" className="fill-white stroke-calm-text stroke-[1]" />
            <ellipse cx="50" cy="46" rx="3.5" ry="2.5" className="fill-calm-text" />
            <path d="M 50 48.5 L 50 51 C 50 53, 48 53, 47 52" fill="none" className="stroke-calm-text stroke-[1.5]" strokeLinecap="round" />
            <path d="M 50 51 C 50 53, 52 53, 53 52" fill="none" className="stroke-calm-text stroke-[1.5]" strokeLinecap="round" />

            {/* Tongue out if happy */}
            {pet.happiness > 60 && !isSleeping && (
              <path d="M 48 52 C 48 56, 52 56, 52 52 Z" className="fill-red-400 stroke-calm-text stroke-[1]" />
            )}
          </g>
        </svg>
      )
    }

    // Default 'passaro' (Bird)
    return (
      <svg className="w-36 h-36 drop-shadow-md select-none" viewBox="0 0 100 100">
        {/* Legs */}
        <line x1="42" y1="78" x2="42" y2="90" className="stroke-calm-text stroke-[2]" strokeLinecap="round" />
        <line x1="58" y1="78" x2="58" y2="90" className="stroke-calm-text stroke-[2]" strokeLinecap="round" />
        <polyline points="38,90 42,90 45,88" fill="none" className="stroke-calm-text stroke-[2]" strokeLinecap="round" />
        <polyline points="54,90 58,90 61,88" fill="none" className="stroke-calm-text stroke-[2]" strokeLinecap="round" />

        {/* Wings (flutter animate) */}
        <path d="M 23 58 C 12 58, 8 45, 23 48" fill="none" className="stroke-calm-accent stroke-[8] origin-right animate-wing" strokeLinecap="round" />
        <path d="M 23 58 C 12 58, 8 45, 23 48" fill="none" className="stroke-calm-text stroke-[1.5]" />
        
        <path d="M 77 58 C 88 58, 92 45, 77 48" fill="none" className="stroke-calm-accent stroke-[8] origin-left animate-wing" strokeLinecap="round" />
        <path d="M 77 58 C 88 58, 92 45, 77 48" fill="none" className="stroke-calm-text stroke-[1.5]" />

        {/* Body */}
        <circle cx="50" cy="55" r="27" className="fill-calm-accent stroke-calm-text stroke-[1.5]" />
        <circle cx="50" cy="58" r="16" className="fill-calm-secondary/40" />

        {/* Face details */}
        <g className="origin-center animate-bob">
          {isSleeping ? (
            <>
              <path d="M 37 47 Q 40 50, 42 47" fill="none" className="stroke-calm-text stroke-[2]" strokeLinecap="round" />
              <path d="M 63 47 Q 60 50, 58 47" fill="none" className="stroke-calm-text stroke-[2]" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="39" cy="46" r="3.5" className="fill-calm-text" />
              <circle cx="61" cy="46" r="3.5" className="fill-calm-text" />
              <circle cx="37.5" cy="44.5" r="0.8" className="fill-white" />
              <circle cx="59.5" cy="44.5" r="0.8" className="fill-white" />
            </>
          )}

          {/* Beak */}
          <polygon points="50,46 45,51 55,51" className="fill-amber-400 stroke-calm-text stroke-[1]" />
        </g>
      </svg>
    )
  }

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl bg-calm-card/45 backdrop-blur-xl border border-calm-border/60 shadow-xl relative overflow-hidden transition-all duration-500">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-calm-primary/5 blur-3xl pointer-events-none" />

      {/* Pet Avatar and Speech Section */}
      <div className="flex flex-col items-center gap-4 relative z-10 w-full md:w-1/3">
        {/* Animated Pet SVG */}
        <div className="relative">
          {renderPetSvg()}
          {/* Level Badge badge */}
          <div className="absolute bottom-0 right-2 bg-gradient-to-tr from-amber-500 to-yellow-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-md border-2 border-white">
            {pet.level}
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-calm-text tracking-tight capitalize">
          {pet.name}
        </h2>
      </div>

      {/* Stats and speech text */}
      <div className="flex-1 flex flex-col gap-4 z-10 w-full">
        {/* Speech Bubble */}
        <div className="relative p-4 rounded-2xl bg-calm-secondary/20 border border-calm-border/80 text-sm text-calm-text leading-relaxed font-medium">
          {/* Speech bubble arrow pointer */}
          <div className="absolute left-1/2 md:left-0 top-0 md:top-1/2 -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 -translate-y-full md:-ml-2 w-0 h-0 border-l-8 border-r-8 md:border-r-8 md:border-l-0 border-b-8 md:border-b-8 md:border-t-8 border-transparent border-b-calm-border/80 md:border-r-calm-border/80 md:border-b-transparent" />
          
          <p className="relative z-10">{speechText}</p>
        </div>

        {/* Pet RPG Status bars */}
        <div className="flex flex-col gap-3.5 mt-2">
          {/* XP Progress Bar */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs font-semibold text-calm-text/70">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-pulse" /> Experiência do Pet
              </span>
              <span>{pet.xp} / {pet.xpNeeded} XP</span>
            </div>
            <div className="w-full h-3 rounded-full bg-calm-border/50 overflow-hidden border border-calm-border/40 p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-500 ease-out" 
                style={{ width: `${(pet.xp / pet.xpNeeded) * 100}%` }}
              />
            </div>
          </div>

          {/* Stats Metrics (Fome / Felicidade) */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Hunger status */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs font-semibold text-calm-text/70">
                <span className="flex items-center gap-1 truncate">
                  {pet.hunger < 35 && <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-bounce" />}
                  Nutrição (Fome)
                </span>
                <span>{pet.hunger}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-calm-border/50 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    pet.hunger < 35 ? 'bg-red-400' : 'bg-calm-primary'
                  }`}
                  style={{ width: `${pet.hunger}%` }}
                />
              </div>
            </div>

            {/* Happiness status */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs font-semibold text-calm-text/70">
                <span className="flex items-center gap-1">
                  <Heart className={`w-3.5 h-3.5 ${pet.happiness < 40 ? 'text-red-300' : 'text-red-500 animate-pulse'}`} /> 
                  Felicidade
                </span>
                <span>{pet.happiness}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-calm-border/50 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    pet.happiness < 40 ? 'bg-amber-400' : 'bg-red-400'
                  }`} 
                  style={{ width: `${pet.happiness}%` }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Currency coins display */}
        <div className="flex items-center gap-1.5 self-end text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-3 py-1 rounded-full border border-amber-200/40">
          <span className="text-sm">🪙</span>
          <span>{coins} Moedas</span>
        </div>
      </div>
      
      {/* Dynamic CSS animations inside this component */}
      <style jsx global>{`
        @keyframes bob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(0.5deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes wing {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-10deg) translateY(-2px); }
        }
        .animate-bob {
          animation: bob 4s ease-in-out infinite;
        }
        .animate-wiggle {
          animation: wiggle 3s ease-in-out infinite;
        }
        .animate-wing {
          animation: wing 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
