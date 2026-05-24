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
        className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/40 backdrop-blur-md hover:bg-white/60 border border-white/60 transition-all shadow-sm active:scale-95"
      >
        <div className="text-right">
          <p className="text-xs text-calm-text/60 leading-tight">Olá,</p>
          <p className="text-sm font-semibold text-calm-text leading-tight">{displayName}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#5E51D9] flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
          {displayName.charAt(0).toUpperCase()}
        </div>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-white/95 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-5 py-4 text-left text-calm-text hover:bg-black/5 transition-colors cursor-pointer"
            >
              <LogOut className="w-5 h-5 text-calm-text/50" />
              <span className="font-medium text-sm">Sair</span>
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
