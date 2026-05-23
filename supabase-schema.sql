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

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON public.sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mood_checks_user_id ON public.mood_checks(user_id);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

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
