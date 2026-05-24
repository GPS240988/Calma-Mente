'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

import { PageLayout } from '@/components/PageLayout'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.onAuthStateChange((event: any) => {
      if (event === 'SIGNED_IN') {
        // Session set from recovery link — ready to update
      }
    })
  }, [])

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (password.length < 6) {
      setMessage('A senha deve ter no mínimo 6 caracteres.')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Senha atualizada com sucesso! Redirecionando...')
      setTimeout(() => router.push('/'), 2000)
    }
    setLoading(false)
  }

  return (
    <PageLayout>
      <div className="w-full max-w-sm mx-auto flex flex-col gap-6 justify-center flex-1 -mt-8">
        <div className="w-full p-6 sm:p-8 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-xl flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mb-2">Nova senha</h1>
            <p className="text-sm text-[#64748B]">Digite sua nova senha.</p>
          </div>

          <form className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Nova senha (mín. 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-white/60 focus:border-[#5E51D9] focus:ring-1 focus:ring-[#5E51D9] outline-none bg-white/50 text-[#1E293B] font-medium text-sm transition-all"
              required
              minLength={6}
            />

            {message && (
              <p className={`text-xs text-center font-medium ${message.includes('sucesso') ? 'text-[#1E6554]' : 'text-red-500'}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              onClick={handleUpdate}
              disabled={loading}
              className="w-full py-3.5 bg-[#5E51D9] hover:bg-[#5E51D9]/95 text-white font-bold text-base rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Aguarde...' : 'Atualizar senha'}
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  )
}
