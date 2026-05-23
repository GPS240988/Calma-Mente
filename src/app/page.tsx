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
      {displayName && (
        <header className="w-full flex items-center justify-between mb-16">
          <div />
          <UserMenu displayName={displayName} />
        </header>
      )}

      <div className={`flex-1 flex flex-col items-center justify-center ${displayName ? "" : "min-h-screen -mt-20"}`}>
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

            {!displayName && (
              <Link href="/auth" className="btn-large btn-secondary text-lg">
                Entrar / Criar conta
              </Link>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
