'use client'

import { useState, useRef, useEffect } from 'react'
import { LogOut } from 'lucide-react'

export function UserMenu({ displayName }: { displayName: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 p-2 -mr-2 rounded-2xl active:bg-calm-border/50 transition-colors"
      >
        <div className="text-right">
          <p className="text-sm text-calm-text/60 leading-tight">Olá,</p>
          <p className="text-base font-semibold text-calm-text leading-tight">{displayName}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-calm-primary flex items-center justify-center text-white text-lg font-semibold flex-shrink-0">
          {displayName.charAt(0).toUpperCase()}
        </div>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-calm-card border border-calm-border rounded-2xl shadow-lg overflow-hidden z-50">
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-5 py-4 text-left text-calm-text hover:bg-calm-secondary/20 transition-colors"
            >
              <LogOut className="w-5 h-5 text-calm-text/50" />
              <span className="font-medium">Sair</span>
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
