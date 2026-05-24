'use client'

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { 
  PetStats, 
  ShopItem, 
  PomodoroSession, 
  UserPomodoroData, 
  PomodoroConfig, 
  PetType 
} from '../types'

interface PomodoroContextType {
  // Timer State
  secondsLeft: number
  isActive: boolean
  timerMode: 'foco' | 'pausa' | 'idle'
  
  // Game/User State
  coins: number
  xp: number
  level: number
  inventory: Record<string, number>
  pet: PetStats
  streakDays: number
  totalFocusTime: number
  sessionHistory: PomodoroSession[]
  
  // Config
  config: PomodoroConfig
  
  // Actions
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  updateConfig: (newConfig: Partial<PomodoroConfig>) => void
  setPetDetails: (type: PetType, name: string) => void
  buyItem: (item: ShopItem) => void
  useItem: (itemId: string) => void
  triggerGuidedBreakComplete: () => void
  playEndSound: () => void
  
  // Loaded
  isInitialized: boolean
}

const DEFAULT_PET: PetStats = {
  name: 'Foguinho',
  type: 'gato',
  level: 1,
  xp: 0,
  xpNeeded: 100,
  hunger: 80,
  happiness: 80
}

const DEFAULT_USER_DATA: UserPomodoroData = {
  coins: 50,
  xp: 0,
  level: 1,
  inventory: {
    'racao_basica': 2,
  },
  pet: DEFAULT_PET,
  streakDays: 0,
  lastActiveDate: null,
  totalFocusTime: 0,
  sessionHistory: []
}

const DEFAULT_CONFIG: PomodoroConfig = {
  focusDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  soundEnd: 'sino',
  ambientSound: 'silencio',
  ambientVolume: 0.5,
  isRpgMode: true
}

// Shop items definition
export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'racao_basica',
    name: 'Ração de Mascote',
    type: 'comida',
    cost: 10,
    benefit: 20, // +20 fome
    description: 'Ração nutritiva básica para seu companheiro.',
    icon: 'Bowl'
  },
  {
    id: 'petisco_premium',
    name: 'Petisco de Cristal',
    type: 'comida',
    cost: 25,
    benefit: 50, // +50 fome, +15 felicidade
    description: 'Um doce delicioso que brilha com energia calma.',
    icon: 'Cookie'
  },
  {
    id: 'brinquedo_corda',
    name: 'Brinquedo Antiestresse',
    type: 'brinquedo',
    cost: 40,
    benefit: 40, // +40 felicidade, +10 XP
    description: 'Mantém seu pet alegre e ativo enquanto você foca.',
    icon: 'Dribbble'
  },
  {
    id: 'coroa_real',
    name: 'Coroa de Ouro Medieval',
    type: 'cosmetico',
    cost: 120,
    benefit: 100, // +100 felicidade, +50 XP
    description: 'Uma coroa majestosa digna de um mascote campeão.',
    icon: 'Crown'
  }
]

// Audio synthesized elements
const playTibetanBowl = (volume = 0.5) => {
  if (typeof window === 'undefined') return
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    const oscFundamental = ctx.createOscillator()
    const oscHarmonic1 = ctx.createOscillator()
    const oscHarmonic2 = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    // Tibetan bowls resonance is around 144Hz, 288Hz, 432Hz
    oscFundamental.frequency.setValueAtTime(144, ctx.currentTime)
    oscHarmonic1.frequency.setValueAtTime(288, ctx.currentTime)
    oscHarmonic2.frequency.setValueAtTime(432, ctx.currentTime)
    
    oscFundamental.type = 'sine'
    oscHarmonic1.type = 'sine'
    oscHarmonic2.type = 'sine'
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume * 0.35, ctx.currentTime + 0.1)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5)
    
    oscFundamental.connect(gainNode)
    oscHarmonic1.connect(gainNode)
    oscHarmonic2.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscFundamental.start()
    oscHarmonic1.start()
    oscHarmonic2.start()
    
    oscFundamental.stop(ctx.currentTime + 4.5)
    oscHarmonic1.stop(ctx.currentTime + 4.5)
    oscHarmonic2.stop(ctx.currentTime + 4.5)
  } catch (e) {
    console.error('Falha ao tocar som da tigela tibetana:', e)
  }
}

const playGongSound = (volume = 0.5) => {
  if (typeof window === 'undefined') return
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    const gainNode = ctx.createGain()
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume * 0.3, ctx.currentTime + 0.05)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 5.0)
    
    const harmonics = [110, 165, 220, 330, 440]
    harmonics.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      osc.connect(gainNode)
      osc.start()
      osc.stop(ctx.currentTime + 5.0)
    })
    
    gainNode.connect(ctx.destination)
  } catch (e) {
    console.error('Falha ao tocar som do gongo:', e)
  }
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined)

export const PomodoroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const supabase = createClient()
  
  // Initialization state
  const [isInitialized, setIsInitialized] = useState(false)
  const [user, setUser] = useState<any>(null)

  // Timer State
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_CONFIG.focusDuration)
  const [isActive, setIsActive] = useState(false)
  const [timerMode, setTimerMode] = useState<'foco' | 'pausa' | 'idle'>('idle')

  // Game and Statistics State
  const [coins, setCoins] = useState(DEFAULT_USER_DATA.coins)
  const [xp, setXp] = useState(DEFAULT_USER_DATA.xp)
  const [level, setLevel] = useState(DEFAULT_USER_DATA.level)
  const [inventory, setInventory] = useState<Record<string, number>>(DEFAULT_USER_DATA.inventory)
  const [pet, setPet] = useState<PetStats>(DEFAULT_USER_DATA.pet)
  const [streakDays, setStreakDays] = useState(DEFAULT_USER_DATA.streakDays)
  const [lastActiveDate, setLastActiveDate] = useState<string | null>(DEFAULT_USER_DATA.lastActiveDate)
  const [totalFocusTime, setTotalFocusTime] = useState(DEFAULT_USER_DATA.totalFocusTime)
  const [sessionHistory, setSessionHistory] = useState<PomodoroSession[]>(DEFAULT_USER_DATA.sessionHistory)

  // Config State
  const [config, setConfig] = useState<PomodoroConfig>(DEFAULT_CONFIG)

  // Ambient sound ref & elements
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null)

  // Handle ambient sound loops
  useEffect(() => {
    if (typeof window === 'undefined') return

    const soundUrls: Record<string, string> = {
      chuva: 'https://assets.mixkit.co/active_storage/sfx/2448/2448-84.wav', // Heavy rain loop or similar online sound
      floresta: 'https://assets.mixkit.co/active_storage/sfx/1233/1233-84.wav', // Forest birds
      lofi: 'https://vaxfjwdcndvchoukvmps.supabase.co/storage/v1/object/public/audios/ambient-lofi-lounge.mp3' // Lofi placeholder or similar calm loop
    }

    if (ambientAudioRef.current) {
      ambientAudioRef.current.pause()
      ambientAudioRef.current = null
    }

    if (config.ambientSound !== 'silencio' && isActive && timerMode === 'foco') {
      const audioUrl = soundUrls[config.ambientSound]
      if (audioUrl) {
        const audio = new Audio(audioUrl)
        audio.loop = true
        audio.volume = config.ambientVolume
        ambientAudioRef.current = audio
        audio.play().catch(err => console.log('Autoplay do áudio ambiente bloqueado até interação:', err))
      }
    }

    return () => {
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause()
      }
    }
  }, [config.ambientSound, config.ambientVolume, isActive, timerMode])

  // Update volume if config changes during play
  useEffect(() => {
    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = config.ambientVolume
    }
  }, [config.ambientVolume])

  // 1. Initial State Loading & Auth Setup
  useEffect(() => {
    let mounted = true

    async function loadData() {
      try {
        // 1.1 Load Config & Local Game Data from localStorage
        let localConfig: string | null = null
        try {
          localConfig = localStorage.getItem('calmamente_pomodoro_config')
        } catch (_) {}

        if (localConfig) {
          try {
            const parsed = JSON.parse(localConfig)
            setConfig(parsed)
            setSecondsLeft(parsed.focusDuration)
          } catch (_) {}
        }

        let localData: string | null = null
        try {
          localData = localStorage.getItem('calmamente_pomodoro_data')
        } catch (_) {}

        let mergedData = { ...DEFAULT_USER_DATA }
        if (localData) {
          try {
            const parsed = JSON.parse(localData)
            mergedData = { ...mergedData, ...parsed }
          } catch (_) {}
        }

        // 1.2 Fetch Auth User from Supabase
        try {
          const { data: { user: authUser } } = await supabase.auth.getUser()
          if (authUser) {
            setUser(authUser)
            console.log('[Init] Usuário logado detectado no mount:', authUser.email)

            // SEGURANÇA CONTRA VIOLAÇÃO DE FK: Certifica que o usuário existe na tabela public.users
            try {
              const { data: userRecord } = await supabase
                .from('users')
                .select('id')
                .eq('id', authUser.id)
                .maybeSingle()

              if (!userRecord) {
                console.log('[Init] Registro em public.users não encontrado. Inicializando registro...')
                await supabase.from('users').insert({
                  id: authUser.id,
                  email: authUser.email,
                  name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'Usuário'
                })
              }
            } catch (fkErr) {
              console.error('[Init] Falha ao verificar/criar registro na tabela public.users:', fkErr)
            }
            
            // Fetch from dedicated pomodoro_profiles table
            let { data: pomProfile, error: pomError } = await supabase
              .from('pomodoro_profiles')
              .select('*')
              .eq('user_id', authUser.id)
              .maybeSingle()

            if (pomError) {
              console.error('[Init] Erro ao buscar perfil pomodoro:', pomError)
            }

            // Se não existir o perfil no banco para o usuário logado, cria um inicial imediatamente
            if (!pomProfile && !pomError) {
              console.log('[Init] Perfil pomodoro não encontrado no Supabase. Criando perfil inicial...')
              const { data: newProfile, error: createError } = await supabase
                .from('pomodoro_profiles')
                .insert({
                  user_id: authUser.id,
                  coins: mergedData.coins,
                  xp: mergedData.xp,
                  level: mergedData.level,
                  pet_name: mergedData.pet.name,
                  pet_type: mergedData.pet.type,
                  pet_level: mergedData.pet.level,
                  pet_xp: mergedData.pet.xp,
                  pet_xp_needed: mergedData.pet.xpNeeded,
                  pet_hunger: mergedData.pet.hunger,
                  pet_happiness: mergedData.pet.happiness,
                  streak_days: mergedData.streakDays,
                  last_active_date: mergedData.lastActiveDate,
                  total_focus_seconds: mergedData.totalFocusTime,
                  inventory: mergedData.inventory,
                })
                .select()
                .maybeSingle()

              if (createError) {
                console.error('[Init] Erro ao criar perfil inicial no banco:', createError)
              } else if (newProfile) {
                console.log('[Init] Perfil inicial criado com sucesso no banco!')
                pomProfile = newProfile
              }
            }

            if (pomProfile) {
              console.log('[Init] Dados do Pomodoro carregados da tabela pomodoro_profiles.')
              mergedData = {
                ...mergedData,
                coins: pomProfile.coins,
                xp: pomProfile.xp,
                level: pomProfile.level,
                streakDays: pomProfile.streak_days,
                lastActiveDate: pomProfile.last_active_date,
                totalFocusTime: pomProfile.total_focus_seconds,
                inventory: pomProfile.inventory || { racao_basica: 2 },
                pet: {
                  name: pomProfile.pet_name,
                  type: pomProfile.pet_type,
                  level: pomProfile.pet_level,
                  xp: pomProfile.pet_xp,
                  xpNeeded: pomProfile.pet_xp_needed,
                  hunger: pomProfile.pet_hunger,
                  happiness: pomProfile.pet_happiness,
                }
              }
            }
          } else {
            console.log('[Init] Nenhum usuário logado detectado no mount, operando offline.')
          }
        } catch (err) {
          console.error('[Init] Erro de carregamento do Supabase, operando no modo local offline:', err)
        }

        if (!mounted) return

        // Apply initial values
        setCoins(mergedData.coins)
        setXp(mergedData.xp)
        setLevel(mergedData.level)
        setInventory(mergedData.inventory)
        setPet(mergedData.pet)
        setStreakDays(mergedData.streakDays)
        setLastActiveDate(mergedData.lastActiveDate)
        setTotalFocusTime(mergedData.totalFocusTime)
        setSessionHistory(mergedData.sessionHistory)
        
        // 1.3 Resume active timer if it was running when unmounted/reloaded
        try {
          const savedActiveTimer = localStorage.getItem('calmamente_active_timer_end')
          if (savedActiveTimer) {
            try {
              const { expectedEndTime, mode, focusDuration: savedFocus, breakDuration: savedBreak } = JSON.parse(savedActiveTimer)
              const now = Date.now()
              const remaining = Math.round((expectedEndTime - now) / 1000)
              
              if (remaining > 0) {
                setTimerMode(mode)
                setSecondsLeft(remaining)
                setIsActive(true)
                console.log(`[Timer] Cronômetro Pomodoro recuperado em progresso: ${remaining}s restantes no modo ${mode}`)
              } else {
                localStorage.removeItem('calmamente_active_timer_end')
                if (mode === 'foco') {
                  setTimeout(() => {
                    completeFocusSession()
                    alert('Excelente! Você completou um ciclo de foco enquanto estava fora e seu mascote cresceu!')
                  }, 500)
                }
              }
            } catch (e) {
              console.error('[Timer] Falha ao recuperar cronômetro salvo:', e)
            }
          }
        } catch (_) {}
      } catch (err) {
        console.error('[Init] Erro crítico durante inicialização:', err)
      } finally {
        if (mounted) {
          setIsInitialized(true)
        }
      }
    }

    loadData()

    return () => { mounted = false }
  }, [])

  // 1.4 Dynamic Auth State Change Listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
      const authUser = session?.user ?? null
      setUser(authUser)
      console.log('[Auth] Estado de autenticação alterado:', event, authUser?.email)

      if (authUser) {
        try {
          // SEGURANÇA CONTRA VIOLAÇÃO DE FK: Certifica que o usuário existe na tabela public.users
          try {
            const { data: userRecord } = await supabase
              .from('users')
              .select('id')
              .eq('id', authUser.id)
              .maybeSingle()

            if (!userRecord) {
              console.log('[Auth] Registro em public.users não encontrado. Inicializando registro pós-login...')
              await supabase.from('users').insert({
                id: authUser.id,
                email: authUser.email,
                name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'Usuário'
              })
            }
          } catch (fkErr) {
            console.error('[Auth] Falha ao verificar/criar registro na tabela public.users:', fkErr)
          }

          let { data: pomProfile, error: pomError } = await supabase
            .from('pomodoro_profiles')
            .select('*')
            .eq('user_id', authUser.id)
            .maybeSingle()

          if (pomError) console.error('[Auth] Erro ao buscar pomodoro_profiles:', pomError)

          // Se não existir o perfil no banco após login bem-sucedido, cria um com os valores locais atuais
          if (!pomProfile && !pomError) {
            console.log('[Auth] Perfil pomodoro não encontrado para o usuário logado, criando perfil inicial...')
            const localData = localStorage.getItem('calmamente_pomodoro_data')
            let currentLocal = { ...DEFAULT_USER_DATA }
            if (localData) {
              try {
                currentLocal = { ...currentLocal, ...JSON.parse(localData) }
              } catch (_) {}
            }

            const { data: newProfile, error: createError } = await supabase
              .from('pomodoro_profiles')
              .insert({
                user_id: authUser.id,
                coins: currentLocal.coins,
                xp: currentLocal.xp,
                level: currentLocal.level,
                pet_name: currentLocal.pet.name,
                pet_type: currentLocal.pet.type,
                pet_level: currentLocal.pet.level,
                pet_xp: currentLocal.pet.xp,
                pet_xp_needed: currentLocal.pet.xpNeeded,
                pet_hunger: currentLocal.pet.hunger,
                pet_happiness: currentLocal.pet.happiness,
                streak_days: currentLocal.streakDays,
                last_active_date: currentLocal.lastActiveDate,
                total_focus_seconds: currentLocal.totalFocusTime,
                inventory: currentLocal.inventory,
              })
              .select()
              .maybeSingle()

            if (createError) {
              console.error('[Auth] Erro ao criar perfil pomodoro no banco pós-login:', createError)
            } else if (newProfile) {
              console.log('[Auth] Perfil inicial criado com sucesso pós-login!')
              pomProfile = newProfile
            }
          }

          if (pomProfile) {
            console.log('[Auth] pomodoro_profiles sincronizado do Supabase.')
            setCoins(pomProfile.coins)
            setXp(pomProfile.xp)
            setLevel(pomProfile.level)
            setStreakDays(pomProfile.streak_days)
            setLastActiveDate(pomProfile.last_active_date)
            setTotalFocusTime(pomProfile.total_focus_seconds)
            setInventory(pomProfile.inventory || { racao_basica: 2 })
            setPet({
              name: pomProfile.pet_name,
              type: pomProfile.pet_type,
              level: pomProfile.pet_level,
              xp: pomProfile.pet_xp,
              xpNeeded: pomProfile.pet_xp_needed,
              hunger: pomProfile.pet_hunger,
              happiness: pomProfile.pet_happiness,
            })
          }
        } catch (err) {
          console.error('[Auth] Falha na sincronização de perfil pós-auth:', err)
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  // 2. State Syncing to localStorage & Supabase pomodoro_profiles
  const saveState = useCallback(async (
    updatedCoins: number,
    updatedXp: number,
    updatedLevel: number,
    updatedInventory: Record<string, number>,
    updatedPet: PetStats,
    updatedStreak: number,
    updatedLastDate: string | null,
    updatedTotalTime: number,
    updatedHistory: PomodoroSession[]
  ) => {
    const dataToSave: UserPomodoroData = {
      coins: updatedCoins,
      xp: updatedXp,
      level: updatedLevel,
      inventory: updatedInventory,
      pet: updatedPet,
      streakDays: updatedStreak,
      lastActiveDate: updatedLastDate,
      totalFocusTime: updatedTotalTime,
      sessionHistory: updatedHistory
    }

    // Always save to localStorage as offline fallback
    localStorage.setItem('calmamente_pomodoro_data', JSON.stringify(dataToSave))

    // Sync to dedicated pomodoro_profiles table when logged in
    if (user) {
      try {
        const { error: upsertError } = await supabase
          .from('pomodoro_profiles')
          .upsert({
            user_id: user.id,
            coins: updatedCoins,
            xp: updatedXp,
            level: updatedLevel,
            pet_name: updatedPet.name,
            pet_type: updatedPet.type,
            pet_level: updatedPet.level,
            pet_xp: updatedPet.xp,
            pet_xp_needed: updatedPet.xpNeeded,
            pet_hunger: updatedPet.hunger,
            pet_happiness: updatedPet.happiness,
            streak_days: updatedStreak,
            last_active_date: updatedLastDate,
            total_focus_seconds: updatedTotalTime,
            inventory: updatedInventory,
          }, { onConflict: 'user_id' })

        if (upsertError) {
          console.error('[Sync] Erro ao salvar pomodoro_profiles no Supabase:', upsertError)
        } else {
          console.log('[Sync] pomodoro_profiles atualizado com sucesso no Supabase.')
        }
      } catch (err) {
        console.error('Falha de sincronização Supabase (salvo localmente):', err)
      }
    }
  }, [user, supabase])

  // Play alarm sound
  const playEndSound = useCallback(() => {
    if (config.soundEnd === 'sino') {
      playTibetanBowl(0.6)
    } else if (config.soundEnd === 'gongo') {
      playGongSound(0.6)
    }
  }, [config.soundEnd])

  // 3. Completing a Pomodoro Focus Session
  const completeFocusSession = useCallback(async () => {
    setIsActive(false)
    localStorage.removeItem('calmamente_active_timer_end')
    playEndSound()

    // 3.1 Award Points & Coins
    const gainedCoins = 15 // Standard reward
    const gainedXp = 25

    let newCoins = coins + gainedCoins
    let newXp = xp + gainedXp
    let newLevel = level
    let newPetXp = pet.xp + gainedXp
    let newPetLevel = pet.level
    let newPetXpNeeded = pet.xpNeeded

    // Handle Pet leveling up
    if (newPetXp >= newPetXpNeeded) {
      newPetXp = newPetXp - newPetXpNeeded
      newPetLevel += 1
      newPetXpNeeded = Math.round(newPetXpNeeded * 1.5)
      newLevel += 1 // sync profile level with pet level
    }

    // Decay Pet status slowly over completed sessions (increases empathy/nurturing game loop)
    const newPetHunger = Math.max(0, pet.hunger - 15)
    const newPetHappiness = Math.max(10, pet.happiness - 10)

    const updatedPet: PetStats = {
      ...pet,
      xp: newPetXp,
      level: newPetLevel,
      xpNeeded: newPetXpNeeded,
      hunger: newPetHunger,
      happiness: newPetHappiness
    }

    // 3.2 Update Streaks
    const todayStr = new Date().toLocaleDateString('en-US') // reliable localized date check
    let newStreak = streakDays
    
    if (lastActiveDate !== todayStr) {
      if (lastActiveDate) {
        const lastDateObj = new Date(lastActiveDate)
        const diffTime = Math.abs(new Date(todayStr).getTime() - lastDateObj.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        if (diffDays <= 1) {
          newStreak += 1
        } else {
          newStreak = 1 // Reset streak if missed days
        }
      } else {
        newStreak = 1 // First time streak
      }
    }

    const newSession: PomodoroSession = {
      id: crypto.randomUUID(),
      durationSeconds: config.focusDuration,
      completed: true,
      createdAt: new Date().toISOString()
    }

    const updatedHistory = [newSession, ...sessionHistory].slice(0, 100) // Keep last 100 sessions
    const newTotalFocusTime = totalFocusTime + config.focusDuration

    // Apply states
    setCoins(newCoins)
    setXp(newXp)
    setLevel(newLevel)
    setPet(updatedPet)
    setStreakDays(newStreak)
    setLastActiveDate(todayStr)
    setSessionHistory(updatedHistory)
    setTotalFocusTime(newTotalFocusTime)

    // Trigger timer screen state swap
    setTimerMode('pausa')
    setSecondsLeft(config.shortBreakDuration)

    // Save states locally and Supabase preferences
    await saveState(
      newCoins,
      newXp,
      newLevel,
      inventory,
      updatedPet,
      newStreak,
      todayStr,
      newTotalFocusTime,
      updatedHistory
    )

    // Sync actual session completed in sessions DB table if auth exists
    if (user) {
      try {
        console.log('[DB] Iniciando inserção da sessão de Pomodoro para:', user.id)
        const { error: insertError } = await supabase.from('sessions').insert({
          user_id: user.id,
          type: 'pomodoro',
          duration_seconds: config.focusDuration,
          completed: true,
          created_at: new Date().toISOString()
        })
        if (insertError) {
          console.error('[DB] ERRO SUPABASE SESSIONS WRITE:', insertError)
        } else {
          console.log('[DB] Sessão de Pomodoro gravada com sucesso na tabela public.sessions.')
        }
      } catch (err) {
        console.error('[DB] Falha de conexão Supabase sessions insert:', err)
      }
    } else {
      console.log('[DB] Sessão gravada apenas localmente (usuário não logado).')
    }
  }, [coins, xp, level, pet, streakDays, lastActiveDate, sessionHistory, totalFocusTime, config, saveState, user, supabase, playEndSound, inventory])

  // 4. Completing a Break Session
  const completeBreakSession = useCallback(async () => {
    setIsActive(false)
    localStorage.removeItem('calmamente_active_timer_end')
    playEndSound()

    setTimerMode('foco')
    setSecondsLeft(config.focusDuration)
  }, [config.focusDuration, playEndSound])

  // 5. Timer Tick Effect & Auto-save active timer to localStorage
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && secondsLeft > 0) {
      // Save expected end time to let user resume if they navigate or reload
      localStorage.setItem('calmamente_active_timer_end', JSON.stringify({
        expectedEndTime: Date.now() + secondsLeft * 1000,
        mode: timerMode,
        focusDuration: config.focusDuration,
        breakDuration: config.shortBreakDuration
      }))

      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1)
      }, 1000)
    } else if (secondsLeft <= 0) {
      localStorage.removeItem('calmamente_active_timer_end')
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, secondsLeft, timerMode, config])

  // 6. Handle Timer Completion
  useEffect(() => {
    if (isActive && secondsLeft <= 0) {
      if (timerMode === 'foco') {
        completeFocusSession()
      } else if (timerMode === 'pausa') {
        completeBreakSession()
      }
    }
  }, [secondsLeft, isActive, timerMode, completeFocusSession, completeBreakSession])

  // 6. Action Functions
  const startTimer = useCallback(() => {
    if (timerMode === 'idle') {
      setTimerMode('foco')
      setSecondsLeft(config.focusDuration)
    }
    setIsActive(true)
  }, [timerMode, config.focusDuration])

  const pauseTimer = useCallback(() => {
    setIsActive(false)
  }, [])

  const resetTimer = useCallback(() => {
    setIsActive(false)
    setTimerMode('idle')
    setSecondsLeft(config.focusDuration)
  }, [config.focusDuration])

  const updateConfig = useCallback((newConfig: Partial<PomodoroConfig>) => {
    setConfig(prev => {
      const merged = { ...prev, ...newConfig }
      localStorage.setItem('calmamente_pomodoro_config', JSON.stringify(merged))
      
      // If timer is not running, update seconds left accordingly
      if (!isActive && timerMode === 'idle') {
        setSecondsLeft(merged.focusDuration)
      } else if (!isActive && timerMode === 'pausa') {
        setSecondsLeft(merged.shortBreakDuration)
      }

      return merged
    })
  }, [isActive, timerMode])

  const setPetDetails = useCallback(async (type: PetType, name: string) => {
    const updatedPet: PetStats = {
      ...pet,
      type,
      name,
      level: 1,
      xp: 0,
      xpNeeded: 100,
      hunger: 100,
      happiness: 100
    }
    setPet(updatedPet)
    await saveState(
      coins,
      xp,
      level,
      inventory,
      updatedPet,
      streakDays,
      lastActiveDate,
      totalFocusTime,
      sessionHistory
    )
  }, [pet, coins, xp, level, inventory, streakDays, lastActiveDate, totalFocusTime, sessionHistory, saveState])

  const buyItem = useCallback(async (item: ShopItem) => {
    if (coins < item.cost) return

    const newCoins = coins - item.cost
    const updatedInventory = {
      ...inventory,
      [item.id]: (inventory[item.id] || 0) + 1
    }

    setCoins(newCoins)
    setInventory(updatedInventory)

    await saveState(
      newCoins,
      xp,
      level,
      updatedInventory,
      pet,
      streakDays,
      lastActiveDate,
      totalFocusTime,
      sessionHistory
    )
  }, [coins, inventory, pet, streakDays, lastActiveDate, totalFocusTime, sessionHistory, saveState])

  const useItem = useCallback(async (itemId: string) => {
    const qty = inventory[itemId] || 0
    if (qty <= 0) return

    const item = SHOP_ITEMS.find(i => i.id === itemId)
    if (!item) return

    // Apply item effect to pet stats
    let newHunger = pet.hunger
    let newHappiness = pet.happiness
    let newXp = pet.xp
    let newLevel = pet.level
    let newXpNeeded = pet.xpNeeded
    let newProfileLevel = level

    if (item.type === 'comida') {
      if (item.id === 'racao_basica') {
        newHunger = Math.min(100, newHunger + 25)
        newHappiness = Math.min(100, newHappiness + 5)
      } else if (item.id === 'petisco_premium') {
        newHunger = Math.min(100, newHunger + 50)
        newHappiness = Math.min(100, newHappiness + 20)
        newXp = newXp + 15
      }
    } else if (item.type === 'brinquedo') {
      newHappiness = Math.min(100, newHappiness + 40)
      newXp = newXp + 20
    } else if (item.type === 'cosmetico') {
      newHappiness = 100
      newXp = newXp + 50
    }

    // Check leveling
    if (newXp >= newXpNeeded) {
      newXp = newXp - newXpNeeded
      newLevel += 1
      newXpNeeded = Math.round(newXpNeeded * 1.5)
      newProfileLevel += 1
    }

    const updatedPet: PetStats = {
      ...pet,
      hunger: newHunger,
      happiness: newHappiness,
      xp: newXp,
      level: newLevel,
      xpNeeded: newXpNeeded
    }

    const updatedInventory = {
      ...inventory,
      [itemId]: qty - 1
    }

    setPet(updatedPet)
    setLevel(newProfileLevel)
    setInventory(updatedInventory)

    await saveState(
      coins,
      xp,
      newProfileLevel,
      updatedInventory,
      updatedPet,
      streakDays,
      lastActiveDate,
      totalFocusTime,
      sessionHistory
    )
  }, [inventory, pet, coins, xp, level, streakDays, lastActiveDate, totalFocusTime, sessionHistory, saveState])

  const triggerGuidedBreakComplete = useCallback(() => {
    // Award 5 bonus coins for completing deep breathing break
    const newCoins = coins + 5
    setCoins(newCoins)
    saveState(
      newCoins,
      xp,
      level,
      inventory,
      pet,
      streakDays,
      lastActiveDate,
      totalFocusTime,
      sessionHistory
    )
  }, [coins, xp, level, inventory, pet, streakDays, lastActiveDate, totalFocusTime, sessionHistory, saveState])

  return (
    <PomodoroContext.Provider
      value={{
        secondsLeft,
        isActive,
        timerMode,
        coins,
        xp,
        level,
        inventory,
        pet,
        streakDays,
        totalFocusTime,
        sessionHistory,
        config,
        startTimer,
        pauseTimer,
        resetTimer,
        updateConfig,
        setPetDetails,
        buyItem,
        useItem,
        triggerGuidedBreakComplete,
        playEndSound,
        isInitialized
      }}
    >
      {children}
    </PomodoroContext.Provider>
  )
}

export const usePomodoro = () => {
  const context = useContext(PomodoroContext)
  if (context === undefined) {
    throw new Error('usePomodoro must be used within a PomodoroProvider')
  }
  return context
}
