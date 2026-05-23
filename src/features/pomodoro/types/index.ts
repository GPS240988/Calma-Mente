export type PetType = 'gato' | 'cachorro' | 'passaro'

export interface PetStats {
  name: string
  type: PetType
  level: number
  xp: number
  xpNeeded: number
  hunger: number // 0-100 (100 = full)
  happiness: number // 0-100 (100 = happy)
  lastFed?: string
}

export type ItemType = 'comida' | 'brinquedo' | 'cosmetico'

export interface ShopItem {
  id: string
  name: string
  type: ItemType
  cost: number
  benefit: number // XP or satisfaction points
  description: string
  icon: string
}

export interface PomodoroSession {
  id: string
  durationSeconds: number
  completed: boolean
  createdAt: string
}

export interface UserPomodoroData {
  coins: number
  xp: number
  level: number
  inventory: Record<string, number> // item_id -> quantity
  pet: PetStats
  streakDays: number
  lastActiveDate: string | null
  totalFocusTime: number // in seconds
  sessionHistory: PomodoroSession[]
}

export interface PomodoroConfig {
  focusDuration: number // in seconds
  shortBreakDuration: number // in seconds
  soundEnd: 'sino' | 'gongo' | 'silencio'
  ambientSound: 'chuva' | 'floresta' | 'lofi' | 'silencio'
  ambientVolume: number // 0 - 1
  isRpgMode: boolean
}
