'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const signIn = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage(error.message)
    } else {
      router.push('/')
      router.refresh()
    }
    setLoading(false)
  }

  const signUp = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Conta criada! Verifique seu e-mail para confirmar.')
    }
    setLoading(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 sm:p-12">
      <div className="w-full flex justify-start mb-12">
        <Link href="/" className="p-2 -ml-2 rounded-full active:bg-calm-border/50 transition-colors">
          <ArrowLeft className="w-8 h-8 text-calm-primary" />
        </Link>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-2">Entrar</h1>
          <p className="text-calm-text/70">Acesse sua conta para salvar seu progresso e preferências.</p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium ml-1">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="p-4 rounded-xl border border-calm-border bg-calm-card focus:outline-none focus:ring-2 focus:ring-calm-primary/50 text-lg"
              required
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="password" className="font-medium ml-1">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="p-4 rounded-xl border border-calm-border bg-calm-card focus:outline-none focus:ring-2 focus:ring-calm-primary/50 text-lg"
              required
            />
          </div>

          {message && (
            <p className={`text-sm text-center ${message.includes('erifique') || message.includes('sucesso') ? 'text-green-600' : 'text-red-500'}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            onClick={signIn}
            disabled={loading}
            className="btn-large btn-primary shadow-md disabled:opacity-50"
          >
            {loading ? 'Aguarde...' : 'Entrar'}
          </button>

          <button
            type="submit"
            onClick={signUp}
            disabled={loading}
            className="btn-large btn-secondary mt-2 disabled:opacity-50"
          >
            Criar conta
          </button>
        </form>
      </div>
    </main>
  )
}
