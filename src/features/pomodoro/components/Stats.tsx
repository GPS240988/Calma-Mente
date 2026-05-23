'use client'

import React, { useMemo } from 'react'
import { Flame, Clock, Award, Calendar } from 'lucide-react'
import { usePomodoro } from '../context/PomodoroContext'

export const Stats: React.FC = () => {
  const { streakDays, totalFocusTime, sessionHistory } = usePomodoro()

  // Format focus time to visual display
  const formattedTime = useMemo(() => {
    const hours = Math.floor(totalFocusTime / 3600)
    const minutes = Math.floor((totalFocusTime % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes} min`
  }, [totalFocusTime])

  // Get total completed session count
  const completedCount = useMemo(() => {
    return sessionHistory.filter(s => s.completed).length
  }, [sessionHistory])

  // Generate last 7 days activity heatmap values
  const weeklyActivity = useMemo(() => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    const result = days.map((dayLabel, index) => {
      // Find matches for this weekday index (current week only)
      const today = new Date()
      const currentDayOfWeek = today.getDay()
      const targetDay = new Date()
      targetDay.setDate(today.getDate() - (currentDayOfWeek - index))
      
      const targetDateStr = targetDay.toDateString()

      const sessionsOnDay = sessionHistory.filter(session => {
        const sessionDate = new Date(session.createdAt)
        return sessionDate.toDateString() === targetDateStr && session.completed
      })

      return {
        label: dayLabel,
        count: sessionsOnDay.length,
        isToday: index === currentDayOfWeek
      }
    })
    return result
  }, [sessionHistory])

  return (
    <div className="w-full flex flex-col gap-6 p-6 rounded-3xl bg-calm-card/45 backdrop-blur-xl border border-calm-border/60 shadow-xl relative overflow-hidden transition-all duration-500">
      
      {/* Background radial highlight */}
      <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-calm-accent/5 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2 border-b border-calm-border/50 pb-4">
        <div className="p-2 rounded-xl bg-calm-primary/15 text-calm-primary">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-calm-text">Suas Estatísticas</h3>
          <p className="text-xs text-calm-text/50">Monitore sua jornada de foco e consistência</p>
        </div>
      </div>

      {/* Stats Cards Dashboard */}
      <div className="grid grid-cols-3 gap-3">
        
        {/* Streak card */}
        <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-calm-bg/50 border border-calm-border/60">
          <div className="p-2 rounded-full bg-amber-50 dark:bg-amber-950/20 text-amber-500 mb-1.5 animate-pulse">
            <Flame className="w-5 h-5 fill-amber-500" strokeWidth={1.5} />
          </div>
          <span className="text-lg font-extrabold text-calm-text">{streakDays}d</span>
          <span className="text-[10px] text-calm-text/50 font-semibold uppercase tracking-wider mt-0.5">Sequência</span>
        </div>

        {/* Focus time card */}
        <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-calm-bg/50 border border-calm-border/60">
          <div className="p-2 rounded-full bg-calm-primary/10 text-calm-primary mb-1.5">
            <Clock className="w-5 h-5" strokeWidth={1.8} />
          </div>
          <span className="text-sm sm:text-base font-extrabold text-calm-text truncate w-full px-0.5">{formattedTime}</span>
          <span className="text-[10px] text-calm-text/50 font-semibold uppercase tracking-wider mt-0.5">Tempo Foco</span>
        </div>

        {/* Sessions card */}
        <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-calm-bg/50 border border-calm-border/60">
          <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-950/20 text-blue-500 mb-1.5">
            <Award className="w-5 h-5" strokeWidth={1.8} />
          </div>
          <span className="text-lg font-extrabold text-calm-text">{completedCount}</span>
          <span className="text-[10px] text-calm-text/50 font-semibold uppercase tracking-wider mt-0.5">Sessões</span>
        </div>

      </div>

      {/* Weekly Heatmap Activity Graph */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-calm-text/60 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" /> Consistência Semanal
        </label>
        
        <div className="flex items-end justify-between p-4 rounded-2xl bg-calm-bg/30 border border-calm-border/50">
          {weeklyActivity.map((day, idx) => {
            // Determine heatmap color density based on sessions completed that day
            let densityClass = 'bg-calm-border/40 hover:bg-calm-border/60'
            if (day.count > 0 && day.count <= 1) {
              densityClass = 'bg-calm-primary/30 hover:bg-calm-primary/45 text-calm-primary'
            } else if (day.count > 1 && day.count <= 3) {
              densityClass = 'bg-calm-primary/60 hover:bg-calm-primary/75 text-white'
            } else if (day.count > 3) {
              densityClass = 'bg-calm-primary hover:bg-calm-primary/95 text-white'
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                {/* Bar/Dot for count representation */}
                <div 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold shadow-sm transition-all duration-300 relative ${densityClass} ${
                    day.isToday ? 'ring-2 ring-calm-accent/80' : ''
                  }`}
                  title={`${day.count} sessões concluídas`}
                >
                  {day.count > 0 && <span>{day.count}</span>}
                  
                  {/* Small point indicator for current day */}
                  {day.isToday && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-calm-accent border-2 border-white shadow-sm" />
                  )}
                </div>
                
                {/* Weekday Label */}
                <span className={`text-[10px] font-bold ${
                  day.isToday ? 'text-calm-accent font-extrabold' : 'text-calm-text/50'
                }`}>
                  {day.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
