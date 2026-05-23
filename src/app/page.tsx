import Link from "next/link";
import { Wind } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { UserMenu } from "@/components/user-menu";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const displayName = user?.user_metadata?.name || user?.email?.split("@")[0] || null;

  return (
    <main className="flex min-h-screen flex-col p-6 sm:p-12">
      <header className="w-full flex items-center justify-between mb-16">
        <div />
        {displayName ? (
          <UserMenu displayName={displayName} />
        ) : (
          <Link 
            href="/auth" 
            className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-calm-primary bg-calm-primary/10 hover:bg-calm-primary/15 border border-calm-primary/20 transition-all shadow-sm active:scale-95"
          >
            Entrar / Criar conta
          </Link>
        )}
      </header>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md flex flex-col items-center gap-12 text-center">
          
          <div className="flex flex-col items-center gap-4 animate-pulse duration-[3000ms]">
            <div className="bg-calm-secondary/30 p-6 rounded-full">
              <Wind className="w-16 h-16 text-calm-primary" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">CalmaMente</h1>
            <p className="text-calm-text/70 text-lg">Regulação emocional rápida</p>
          </div>

          <div className="w-full mt-8 flex flex-col gap-3">
            <Link href="/select" className="btn-large btn-primary text-2xl shadow-lg">
              Preciso me acalmar
            </Link>

            <Link href="/pomodoro" className="btn-large bg-calm-accent text-white hover:bg-calm-accent/90 text-xl shadow-md">
              ⏱️ Focar / Pomodoro
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
