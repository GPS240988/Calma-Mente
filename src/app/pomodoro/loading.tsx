export default function PomodoroLoading() {
  return (
    <main className="flex min-h-screen flex-col bg-calm-bg p-6 sm:p-12 transition-all duration-700">
      <div className="flex-1 flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-calm-primary border-t-transparent animate-spin" />
          <p className="text-calm-text/50 text-sm">Preparando seu foco...</p>
        </div>
      </div>
    </main>
  )
}
