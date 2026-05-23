'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

interface AudioPlayerProps {
  src: string
  onComplete?: () => void
}

export function AudioPlayer({ src, onComplete }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      const current = audio.currentTime
      const duration = audio.duration
      if (duration > 0) {
        setProgress((current / duration) * 100)
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(100)
      if (onComplete) onComplete()
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [onComplete])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const restart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-8">
      <audio ref={audioRef} src={src} preload="auto" />
      
      {/* Progress Circle (Visual feedback minimum) */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            className="stroke-calm-border"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            className="stroke-calm-primary transition-all duration-500 ease-linear"
            strokeWidth="8"
            fill="none"
            strokeDasharray={2 * Math.PI * 88}
            strokeDashoffset={2 * Math.PI * 88 * (1 - progress / 100)}
            strokeLinecap="round"
          />
        </svg>

        {/* Play/Pause Large Button */}
        <button
          onClick={togglePlay}
          className="relative z-10 w-24 h-24 bg-calm-primary text-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
          aria-label={isPlaying ? 'Pausar' : 'Tocar'}
        >
          {isPlaying ? (
            <Pause className="w-10 h-10" />
          ) : (
            <Play className="w-10 h-10 ml-1" />
          )}
        </button>
      </div>

      <button
        onClick={restart}
        className="flex items-center gap-2 text-calm-text/70 p-4 rounded-xl active:bg-calm-border/50 transition-colors"
      >
        <RotateCcw className="w-5 h-5" />
        <span className="text-lg">Recomeçar</span>
      </button>
    </div>
  )
}
