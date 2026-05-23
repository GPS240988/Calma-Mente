'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.onAuthStateChange((event) => {
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
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-2">Nova senha</h1>
          <p className="text-calm-text/70">Digite sua nova senha.</p>
        </div>

        <form className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Nova senha (mín. 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 rounded-xl border border-calm-border bg-calm-card focus:outline-none focus:ring-2 focus:ring-calm-primary/50 text-lg"
            required
            minLength={6}
          />

          {message && (
            <p className={`text-sm text-center ${message.includes('sucesso') ? 'text-green-600' : 'text-red-500'}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            onClick={handleUpdate}
            disabled={loading}
            className="btn-large btn-primary shadow-md disabled:opacity-50"
          >
            {loading ? 'Aguarde...' : 'Atualizar senha'}
          </button>
        </form>
      </div>
    </main>
  )
}
