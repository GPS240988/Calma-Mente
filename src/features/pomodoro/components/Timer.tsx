'use client'

import React from 'react'
import { Play, Pause, RotateCcw, Volume2, VolumeX, Music, Settings as SettingsIcon } from 'lucide-react'
import { usePomodoro } from '../context/PomodoroContext'

export const Timer: React.FC = () => {
  const {
    secondsLeft,
    isActive,
    timerMode,
    config,
    startTimer,
    pauseTimer,
    resetTimer,
    updateConfig
  } = usePomodoro()

  // Format time (MM:SS)
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Calculate SVG progress radial values
  const totalDuration = timerMode === 'pausa' ? config.shortBreakDuration : config.focusDuration
  const progressRatio = totalDuration > 0 ? (totalDuration - secondsLeft) / totalDuration : 0
  
  const radius = 90
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - progressRatio * circumference

  // Ambient volume toggle
  const toggleAmbientMute = () => {
    updateConfig({
      ambientVolume: config.ambientVolume > 0 ? 0 : 0.5
    })
  }

  return (
    <div className="w-full flex flex-col items-center gap-6 p-6 rounded-3xl bg-calm-card/45 backdrop-blur-xl border border-calm-border/60 shadow-xl relative overflow-hidden transition-all duration-500">
      
      {/* Background radial soft lights */}
      <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-calm-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-calm-accent/15 blur-3xl pointer-events-none" />

      {/* Mode Tag */}
      <div className="z-10 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-calm-secondary/30 text-calm-primary border border-calm-primary/25">
        {timerMode === 'foco' ? 'Foco Profundo' : timerMode === 'pausa' ? 'Pausa Ativa' : 'Foco Disponível'}
      </div>

      {/* Timer Progress Visual Circle */}
      <div className="relative w-64 h-64 flex items-center justify-center z-10 select-none">
        
        {/* SVG Circle Track and Progress */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r={radius}
            className="stroke-calm-border/40"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="128"
            cy="128"
            r={radius}
            className="stroke-calm-primary transition-all duration-300 ease-linear"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Text countdown inside */}
        <div className="absolute flex flex-col items-center text-center">
          <span className="text-5xl font-bold tracking-tight text-calm-text font-mono">
            {formatTime(secondsLeft)}
          </span>
          <span className="text-xs text-calm-text/50 font-medium uppercase tracking-wider mt-1.5">
            {timerMode === 'pausa' ? 'Relaxar' : 'Concentrar'}
          </span>
        </div>
      </div>

      {/* Primary Actions Controls */}
      <div className="flex items-center gap-5 z-10">
        <button
          onClick={resetTimer}
          className="p-4 rounded-full bg-calm-secondary/25 border border-calm-border hover:bg-calm-secondary/40 text-calm-text/80 active:scale-95 transition-all shadow-sm"
          title="Zerar Timer"
        >
          <RotateCcw className="w-6 h-6" strokeWidth={1.8} />
        </button>

        {isActive ? (
          <button
            onClick={pauseTimer}
            className="p-6 rounded-full bg-calm-primary text-white hover:bg-calm-primary/95 active:scale-95 transition-all shadow-lg scale-110"
            title="Pausar"
          >
            <Pause className="w-7 h-7" fill="white" strokeWidth={0} />
          </button>
        ) : (
          <button
            onClick={startTimer}
            className="p-6 rounded-full bg-calm-primary text-white hover:bg-calm-primary/95 active:scale-95 transition-all shadow-lg scale-110"
            title="Iniciar Foco"
          >
            <Play className="w-7 h-7 ml-1" fill="white" strokeWidth={0} />
          </button>
        )}

        <button
          onClick={toggleAmbientMute}
          className={`p-4 rounded-full border active:scale-95 transition-all shadow-sm ${
            config.ambientVolume > 0 && config.ambientSound !== 'silencio'
              ? 'bg-calm-primary/15 border-calm-primary/30 text-calm-primary hover:bg-calm-primary/25'
              : 'bg-calm-secondary/25 border-calm-border text-calm-text/80 hover:bg-calm-secondary/40'
          }`}
          title="Mutar/Desmutar Áudio Ambiente"
        >
          {config.ambientVolume > 0 ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </button>
      </div>

      {/* Configurações Rápidas de Foco / Sons */}
      <div className="w-full border-t border-calm-border/50 pt-5 mt-2 z-10 flex flex-col gap-4">
        
        {/* Ambient Sound Scenarios */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-calm-text/60 flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5" /> Ambientes de Foco
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'silencio' as const, label: 'Silêncio' },
              { id: 'chuva' as const, label: 'Chuva' },
              { id: 'floresta' as const, label: 'Floresta' },
              { id: 'lofi' as const, label: 'Lofi' }
            ].map(snd => (
              <button
                key={snd.id}
                onClick={() => updateConfig({ ambientSound: snd.id })}
                className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-medium border text-center transition-all leading-tight break-words ${
                  config.ambientSound === snd.id
                    ? 'bg-calm-primary/10 border-calm-primary/40 text-calm-primary font-semibold'
                    : 'bg-transparent border-calm-border/60 text-calm-text/60 hover:border-calm-text/30'
                }`}
              >
                {snd.label}
              </button>
            ))}
          </div>
        </div>

        {/* Focus Timer Presets */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-calm-text/60 flex items-center gap-1.5">
            <SettingsIcon className="w-3.5 h-3.5" /> Ciclo de Tempo
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Curto (15 min)', focus: 15 * 60, break: 3 * 60 },
              { label: 'Clássico (25 min)', focus: 25 * 60, break: 5 * 60 },
              { label: 'Longo (45 min)', focus: 45 * 60, break: 10 * 60 }
            ].map((preset, index) => (
              <button
                key={index}
                disabled={isActive}
                onClick={() => updateConfig({ focusDuration: preset.focus, shortBreakDuration: preset.break })}
                className={`py-2 px-1.5 rounded-xl text-[10px] sm:text-xs font-medium border text-center transition-all leading-tight break-words ${
                  config.focusDuration === preset.focus
                    ? 'bg-calm-primary/10 border-calm-primary/40 text-calm-primary font-semibold'
                    : 'bg-transparent border-calm-border/60 text-calm-text/60 hover:border-calm-text/30'
                } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
