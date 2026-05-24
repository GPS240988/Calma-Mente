'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Compass, ToggleLeft, ToggleRight, Sparkles, UserCheck } from 'lucide-react'
import { PomodoroProvider, usePomodoro } from '@/features/pomodoro/context/PomodoroContext'
import { Timer } from '@/features/pomodoro/components/Timer'
import { Companion } from '@/features/pomodoro/components/Companion'
import { Shop } from '@/features/pomodoro/components/Shop'
import { Stats } from '@/features/pomodoro/components/Stats'
import { GuidedInterval } from '@/features/pomodoro/components/GuidedInterval'
import { PageLayout } from '@/components/PageLayout'
import type { PetType } from '@/features/pomodoro/types'

// Setup inner view that consumes context safely
const PomodoroMainContent: React.FC = () => {
  const { config, updateConfig, pet, setPetDetails, isInitialized } = usePomodoro()
  
  // Adoption/onboarding state
  const [petName, setPetName] = useState('')
  const [selectedType, setSelectedType] = useState<PetType>('gato')
  const [isAdopting, setIsAdopting] = useState(false)

  // Loading spinner
  if (!isInitialized) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[70vh]">
        <div className="w-12 h-12 rounded-full border-4 border-[#5E51D9] border-t-transparent animate-spin" />
      </div>
    )
  }

  // Check if pet companion needs to be configured (un-named pet first launch)
  const isPetConfigured = pet.name && pet.name !== 'Foguinho' || isAdopting
  
  const handleAdopt = (e: React.FormEvent) => {
    e.preventDefault()
    if (!petName.trim()) return
    setPetDetails(selectedType, petName.trim())
    setIsAdopting(true)
  }

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      
      {/* Top Header controls */}
      <div className="w-full flex items-center justify-between mt-2 mb-4">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="p-2.5 rounded-full bg-white/40 backdrop-blur-md hover:bg-white/60 border border-white/60 text-[#5E51D9] transition-all shadow-sm active:scale-95"
          title="Voltar"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>

        {/* Dual Mode Basic/RPG toggle */}
        <div className="flex items-center gap-3 select-none">
          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
            {config.isRpgMode ? 'Modo RPG Ativado' : 'Modo Timer Básico'}
          </span>
          <button
            onClick={() => updateConfig({ isRpgMode: !config.isRpgMode })}
            className="p-1 rounded-full text-[#5E51D9] hover:text-[#5E51D9]/80 transition-colors cursor-pointer"
            title="Alternar modo de foco"
          >
            {config.isRpgMode ? (
              <ToggleRight className="w-10 h-10 text-[#5E51D9]" strokeWidth={1.5} />
            ) : (
              <ToggleLeft className="w-10 h-10 text-slate-300" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Onboarding: Pet Adoption Flow */}
      {!isPetConfigured && config.isRpgMode ? (
        <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-xl flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500">
          
          <div className="text-center flex flex-col gap-2">
            <div className="w-14 h-14 rounded-full bg-[#5E51D9]/10 text-[#5E51D9] flex items-center justify-center mx-auto animate-bounce">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-[#1E293B]">Adote seu Companheiro!</h2>
            <p className="text-sm text-[#64748B]">
              Escolha seu pet para caminhar ao seu lado nas jornadas de foco profundo.
            </p>
          </div>

          <form onSubmit={handleAdopt} className="flex flex-col gap-5">
            {/* Pet Type Select Cards */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Tipo de Mascote</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: 'gato' as const, emoji: '🐱', label: 'Gato' },
                  { type: 'cachorro' as const, emoji: '🐶', label: 'Cachorro' },
                  { type: 'passaro' as const, emoji: '🐦', label: 'Pássaro' }
                ].map(item => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setSelectedType(item.type)}
                    className={`py-4 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      selectedType === item.type
                        ? 'bg-white border-[#5E51D9] text-[#5E51D9] font-bold shadow-sm'
                        : 'bg-transparent border-white/60 hover:border-[#5E51D9]/50 text-[#64748B]'
                    }`}
                  >
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pet Name input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider" htmlFor="pet-name">
                Nome do Companheiro
              </label>
              <input
                id="pet-name"
                type="text"
                placeholder="Ex: Paçoca, Cleo..."
                value={petName}
                onChange={e => setPetName(e.target.value)}
                maxLength={15}
                required
                className="w-full px-4 py-3 rounded-2xl border border-white/60 focus:border-[#5E51D9] focus:ring-1 focus:ring-[#5E51D9] outline-none bg-white/50 text-[#1E293B] font-medium text-sm transition-all"
              />
            </div>

            {/* Submit btn */}
            <button
              type="submit"
              className="w-full py-4 bg-[#5E51D9] hover:bg-[#5E51D9]/95 text-white font-bold text-base rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <UserCheck className="w-5 h-5" /> Adotar e Começar Foco
            </button>
          </form>
        </div>
      ) : (
        /* Actual timer view (Basic or RPG grid) */
        <div className="w-full flex flex-col gap-6 animate-in fade-in duration-500">
          
          {/* Breathing helper interval banner if break phase */}
          <GuidedInterval />

          {/* Dynamic Grid Layout */}
          {!config.isRpgMode ? (
            /* Basic minimal Layout: Timer in center */
            <div className="w-full max-w-md mx-auto py-8">
              <Timer />
            </div>
          ) : (
            /* RPG rich Layout: Grid dashboard */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Timer & Streaks/Stats */}
              <div className="lg:col-span-1 flex flex-col gap-6 order-1">
                <Timer />
                <Stats />
              </div>

              {/* Right Column: Pet stats and Shop */}
              <div className="lg:col-span-2 flex flex-col gap-6 order-2">
                <Companion />
                <Shop />
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  )
}

// Export default page
export default function PomodoroPage() {
  return (
    <PageLayout>
      <PomodoroMainContent />
    </PageLayout>
  )
}
