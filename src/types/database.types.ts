export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string | null
          email: string
          timezone: string | null
          idioma: string | null
          preferencias: Json | null
          created_at: string
        }
        Insert: {
          id: string
          name?: string | null
          email: string
          timezone?: string | null
          idioma?: string | null
          preferencias?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string
          timezone?: string | null
          idioma?: string | null
          preferencias?: Json | null
          created_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          user_id: string
          type: string
          duration_seconds: number
          completed: boolean
          anxiety_before: number | null
          anxiety_after: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          duration_seconds: number
          completed?: boolean
          anxiety_before?: number | null
          anxiety_after?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          duration_seconds?: number
          completed?: boolean
          anxiety_before?: number | null
          anxiety_after?: number | null
          created_at?: string
        }
      }
      mood_checks: {
        Row: {
          id: string
          user_id: string
          anxiety_score: number
          hyperactivity_score: number
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          anxiety_score: number
          hyperactivity_score: number
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          anxiety_score?: number
          hyperactivity_score?: number
          notes?: string | null
          created_at?: string
        }
      }
      content: {
        Row: {
          id: string
          title: string
          audio_url: string
          category: string
          duration_seconds: number
          offline_available: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          audio_url: string
          category: string
          duration_seconds: number
          offline_available?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          audio_url?: string
          category?: string
          duration_seconds?: number
          offline_available?: boolean
          created_at?: string
        }
      }
    }
  }
}
