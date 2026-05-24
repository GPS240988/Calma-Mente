'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PageLayout } from '@/components/PageLayout'

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const signIn = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const supabase = createClient()
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

    const supabase = createClient()
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

  const resetPassword = async () => {
    if (!email.trim()) {
      setMessage('Digite seu e-mail primeiro.')
      return
    }
    setLoading(true)
    setMessage('')

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/update-password`,
    })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('E-mail de recuperação enviado! Verifique sua caixa de entrada.')
    }
    setLoading(false)
  }

  const headerElement = (
    <Link 
      href="/" 
      className="p-2.5 rounded-full bg-white/40 backdrop-blur-md hover:bg-white/60 border border-white/60 text-[#5E51D9] transition-all shadow-sm active:scale-95"
      title="Voltar"
    >
      <ArrowLeft className="w-6 h-6" />
    </Link>
  )

  return (
    <PageLayout header={headerElement}>
      <div className="w-full max-w-sm mx-auto flex flex-col gap-6 justify-center flex-1 -mt-8">
        <div className="w-full p-6 sm:p-8 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-xl flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mb-2">Entrar</h1>
            <p className="text-sm text-[#64748B]">Acesse sua conta para salvar seu progresso e preferências.</p>
          </div>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-bold text-[#64748B] uppercase tracking-wider ml-1">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-white/60 focus:border-[#5E51D9] focus:ring-1 focus:ring-[#5E51D9] outline-none bg-white/50 text-[#1E293B] font-medium text-sm transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-bold text-[#64748B] uppercase tracking-wider ml-1">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-white/60 focus:border-[#5E51D9] focus:ring-1 focus:ring-[#5E51D9] outline-none bg-white/50 text-[#1E293B] font-medium text-sm transition-all"
                required
              />
            </div>

            <button
              type="button"
              onClick={resetPassword}
              disabled={loading}
              className="text-xs font-semibold text-[#5E51D9] hover:underline text-right mt-1 self-end transition-colors cursor-pointer"
            >
              Esqueci minha senha
            </button>

            {message && (
              <p className={`text-xs text-center font-medium ${message.includes('erifique') || message.includes('sucesso') || message.includes('recuperação') ? 'text-[#1E6554]' : 'text-red-500'}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              onClick={signIn}
              disabled={loading}
              className="w-full py-3.5 bg-[#5E51D9] hover:bg-[#5E51D9]/95 text-white font-bold text-base rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Aguarde...' : 'Entrar'}
            </button>

            <button
              type="submit"
              onClick={signUp}
              disabled={loading}
              className="w-full py-3.5 bg-white/50 hover:bg-white/70 border border-white/60 text-[#5E51D9] font-bold text-base rounded-2xl shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              Criar conta
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  )
}
