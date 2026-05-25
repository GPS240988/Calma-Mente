import Link from "next/link";
import { ChevronRight, Timer as TimerIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { UserMenu } from "@/components/user-menu";
import { PageLayout } from "@/components/PageLayout";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const displayName = user?.user_metadata?.name || user?.email?.split("@")[0] || null;

  const headerElement = (
    <>
      <div />
      {displayName ? (
        <UserMenu displayName={displayName} />
      ) : (
        <Link
          href="/auth"
          className="px-4 py-2 rounded-2xl text-xs font-semibold text-[#5E51D9] bg-white/40 backdrop-blur-md hover:bg-white/60 border border-white/60 transition-all shadow-sm active:scale-95"
        >
          Entrar / Criar conta
        </Link>
      )}
    </>
  );

  return (
    <PageLayout header={headerElement}>
      <div className="flex-1 flex flex-col items-center justify-center -mt-8 sm:-mt-12">
        <div className="w-full max-w-md flex flex-col items-center gap-8 text-center">

          {/* Lotus Meditation Icon */}
          <div className="flex flex-col items-center gap-2 animate-pulse duration-[5000ms]">
            <img src="/logo.png" alt="Logo" className="w-48 h-48 sm:w-56 sm:h-56 object-contain drop-shadow-sm" />
          </div>

          {/* Heading Greetings */}
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1E293B] leading-tight">
              Oi, meu amor. {/* {displayName || 'amor'} */}
            </h1>
            <p className="text-[#64748B] text-lg leading-relaxed">
              Respire. Você está segura.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col items-center gap-4 mt-6">

            {/* Button 1: Quero me acalmar */}
            <Link
              href="/select"
              className="w-full max-w-[340px] rounded-[32px] bg-gradient-to-r from-[#D7F5EC] to-[#E3F6FA] border border-white/60 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all p-3 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-8 h-8 text-[#1E6554]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    {/* Cute Sleeping Face Head Circle */}
                    <circle cx="12" cy="12" r="9" />
                    {/* Left Sleeping Eye */}
                    <path d="M8 11.5 C 8.5 12.5, 9.5 12.5, 10 11.5" />
                    {/* Right Sleeping Eye */}
                    <path d="M14 11.5 C 14.5 12.5, 15.5 12.5, 16 11.5" />
                    {/* Smiling Mouth */}
                    <path d="M10 15 C 11 16.5, 13 16.5, 14 15" />
                  </svg>
                </div>
                <span className="text-lg font-medium text-[#1E6554] tracking-tight">
                  Quero me acalmar
                </span>
              </div>
              <ChevronRight className="w-6 h-6 text-[#1E6554] mr-2 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
            </Link>

            {/* Button 2: Pomodoro / Focar */}
            <Link
              href="/pomodoro"
              className="w-full max-w-[340px] rounded-[32px] bg-gradient-to-r from-[#E3E1F7] to-[#ECE9F8] border border-white/60 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all p-3 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-8 h-8 text-[#5E51D9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    {/* Watch Body */}
                    <circle cx="12" cy="13" r="7.5" />
                    {/* Top horizontal crown bar */}
                    <path d="M9 2.5 H15" />
                    {/* Top neck/stem */}
                    <path d="M12 5.5 V2.5" />
                    {/* Dial hands creating a sector of ~10 minutes slice */}
                    <path d="M12 13 L15.5 9.5" />
                    <path d="M12 13 V8" />
                  </svg>
                </div>
                <span className="text-lg font-medium text-[#5E51D9] tracking-tight">
                  Pomodoro / Focar
                </span>
              </div>
              <ChevronRight className="w-6 h-6 text-[#5E51D9] mr-2 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
            </Link>

          </div>
        </div>
      </div>
    </PageLayout>
  );
}
