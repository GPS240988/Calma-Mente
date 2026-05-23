/**
 * CalmaMente Visual Design System Tokens
 * Reusable Tailwind CSS visual components and theme tokens.
 * Use these constants to ensure strict visual consistency across the entire application.
 */

export const theme = {
  colors: {
    bg: 'bg-calm-bg',
    text: 'text-calm-text',
    primary: 'text-calm-primary',
    secondary: 'text-calm-secondary',
    accent: 'text-calm-accent',
    card: 'bg-calm-card',
    border: 'border-calm-border'
  },
  
  glass: {
    // Standard glassmorphic container
    card: 'bg-calm-card/45 backdrop-blur-xl border border-calm-border/60 shadow-xl relative overflow-hidden transition-all duration-500',
    // Clickable glassmorphic container with micro-interactions
    cardInteractive: 'bg-calm-card/45 backdrop-blur-xl border border-calm-border/60 shadow-xl relative overflow-hidden hover:border-calm-primary/40 active:scale-[0.98] transition-all duration-500'
  },
  
  rpg: {
    // Shiny gold badge for levels, medals, and high scores
    goldBadge: 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-white shadow-md border-2 border-white',
    // Gold highlighted currency and streaks
    goldHighlight: 'text-amber-600 font-bold bg-amber-50 dark:bg-amber-950/20 px-3 py-1 rounded-full border border-amber-200/40'
  },
  
  buttons: {
    // Main action buttons (e.g. "Preciso me acalmar")
    primary: 'btn-large btn-primary shadow-lg',
    // Secondary focus button (e.g. "Focar / Pomodoro")
    secondary: 'btn-large bg-calm-accent text-white hover:bg-calm-accent/90 shadow-md',
    // Round circular player controls
    control: 'p-6 rounded-full bg-calm-primary text-white hover:bg-calm-primary/95 active:scale-95 transition-all shadow-lg scale-110',
    // Smaller helper control links
    small: 'p-4 rounded-xl border border-calm-border hover:bg-calm-secondary/20 transition-all active:scale-95 shadow-sm'
  },
  
  animations: {
    bob: 'animate-bob',
    wiggle: 'animate-wiggle',
    wing: 'animate-wing'
  }
}
