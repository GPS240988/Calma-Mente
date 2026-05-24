-- CalmaMentev2 Database Schema
-- Execute este script no SQL Editor do Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL UNIQUE,
  timezone TEXT DEFAULT 'America/Sao_Paulo',
  idioma TEXT DEFAULT 'pt-BR',
  preferencias JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content table
CREATE TABLE IF NOT EXISTS public.content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  category TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL,
  offline_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  duration_seconds INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  anxiety_before INTEGER CHECK (anxiety_before >= 1 AND anxiety_before <= 10),
  anxiety_after INTEGER CHECK (anxiety_after >= 1 AND anxiety_after <= 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mood checks table
CREATE TABLE IF NOT EXISTS public.mood_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  anxiety_score INTEGER NOT NULL CHECK (anxiety_score >= 1 AND anxiety_score <= 10),
  hyperactivity_score INTEGER NOT NULL CHECK (hyperactivity_score >= 1 AND hyperactivity_score <= 10),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pomodoro Profiles table (pet companion progress & gamification data)
-- One row per user, upserted on every completed focus session
CREATE TABLE IF NOT EXISTS public.pomodoro_profiles (
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE PRIMARY KEY,

  -- Moedas e XP do perfil do usuário
  coins INTEGER NOT NULL DEFAULT 50,
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,

  -- Pet companion attributes
  pet_name TEXT NOT NULL DEFAULT 'Foguinho',
  pet_type TEXT NOT NULL DEFAULT 'gato' CHECK (pet_type IN ('gato', 'cachorro', 'passaro')),
  pet_level INTEGER NOT NULL DEFAULT 1,
  pet_xp INTEGER NOT NULL DEFAULT 0,
  pet_xp_needed INTEGER NOT NULL DEFAULT 100,
  pet_hunger INTEGER NOT NULL DEFAULT 80 CHECK (pet_hunger >= 0 AND pet_hunger <= 100),
  pet_happiness INTEGER NOT NULL DEFAULT 80 CHECK (pet_happiness >= 0 AND pet_happiness <= 100),

  -- Statistics
  streak_days INTEGER NOT NULL DEFAULT 0,
  last_active_date TEXT,                  -- 'MM/DD/YYYY' string para comparar com locale
  total_focus_seconds INTEGER NOT NULL DEFAULT 0,

  -- Inventory: item_id -> quantity (JSONB map)
  inventory JSONB NOT NULL DEFAULT '{"racao_basica": 2}',

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_pomodoro_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_pomodoro_profile_updated ON public.pomodoro_profiles;
CREATE TRIGGER on_pomodoro_profile_updated
  BEFORE UPDATE ON public.pomodoro_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_pomodoro_updated_at();

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON public.sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mood_checks_user_id ON public.mood_checks(user_id);
CREATE INDEX IF NOT EXISTS idx_pomodoro_profiles_user_id ON public.pomodoro_profiles(user_id);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pomodoro_profiles ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);



-- Sessions policies
CREATE POLICY "Users can view own sessions" ON public.sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own sessions" ON public.sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON public.sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Mood checks policies
CREATE POLICY "Users can view own mood checks" ON public.mood_checks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own mood checks" ON public.mood_checks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Pomodoro Profiles policies
CREATE POLICY "Users can view own pomodoro profile" ON public.pomodoro_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pomodoro profile" ON public.pomodoro_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pomodoro profile" ON public.pomodoro_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Content policies (public read)
CREATE POLICY "Anyone can view content" ON public.content
  FOR SELECT USING (true);


-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Usuário'),
    NEW.email
  );

  -- Inicializa perfil do Pomodoro padrão para o novo usuário
  INSERT INTO public.pomodoro_profiles (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample content (opcional - para testes)
INSERT INTO public.content (title, audio_url, category, duration_seconds, offline_available)
VALUES
  (
    'Respiração Calmante',
    'https://example.com/audio/respiracao-calmante.mp3',
    'respiracao',
    300,
    true
  ),
  (
    'Desaceleração Mental',
    'https://example.com/audio/desaceleracao-mental.mp3',
    'desaceleracao',
    480,
    true
  ),
  (
    'Grounding 5-4-3-2-1',
    'https://example.com/audio/grounding.mp3',
    'grounding',
    420,
    true
  ),
  (
    'Relaxamento Progressivo',
    'https://example.com/audio/relaxamento-progressivo.mp3',
    'relaxamento_progressivo',
    600,
    true
  )
ON CONFLICT DO NOTHING;
