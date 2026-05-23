# CalmaMente Design System & Workspace Rules

Este arquivo define o **sistema de design visual** e as **regras de estilo obrigatórias** para o projeto CalmaMente. Toda e qualquer modificação, criação ou refatoração visual do frontend deve respeitar estritamente estas diretrizes.

---

## 🎨 1. Paleta de Cores (Tailwind v4 / HSL)

A interface deve utilizar cores suaves, com alto contraste e baixo estresse visual (ideal para TDAH).

### Variáveis CSS Ativas (`globals.css`)
- **Fundo (`--calm-bg`):** `#F8FAF9` (Claro) | `#1A211F` (Escuro)
- **Texto Principal (`--calm-text`):** `#2C3E38` (Claro) | `#E5EBE8` (Escuro)
- **Cor Primária (`--calm-primary`):** `#52796F` (Claro) | `#84A98C` (Escuro)
- **Cor Secundária (`--calm-secondary`):** `#CAD2C5` (Claro) | `#354F52` (Escuro)
- **Cor de Destaque (`--calm-accent`):** `#84A98C` (Claro) | `#52796F` (Escuro)
- **Cor dos Cards (`--calm-card`):** `#FFFFFF` (Claro) | `#222B29` (Escuro)
- **Bordas (`--calm-border`):** `#E2E8E4` (Claro) | `#2C3E38` (Escuro)

---

## 🫧 2. Estilo Glassmorphism Premium

Os cartões da aplicação (Cards de Meditação, Timer, Pet Companion, Loja e Estatísticas) devem usar o efeito de vidro fosco com brilho interno suave e bordas finas para um visual sofisticado e premium.

### Classe Recomendada para Cards:
`"bg-calm-card/45 backdrop-blur-xl border border-calm-border/60 shadow-xl relative overflow-hidden transition-all duration-500"`

### Detalhes Medievais e Dourados:
Para badges, moedas ou recompensas especiais (RPG), utilize um gradiente dourado suave para transmitir valor e sensação de conquista:
- **Badge Dourado:** `"bg-gradient-to-tr from-amber-500 to-yellow-400 text-white shadow-md border-2 border-white"`
- **Borda de Foco Dourada (Streak):** `"ring-2 ring-calm-accent/80 hover:ring-amber-400/50"`

---

## 🔘 3. Botões e Ações (Padrões de Interação)

Os botões interativos devem usar a classe utilitária `.btn-large` combinada com o estado de clique ativo reduzido (micro-interações) para maior satisfação táctil.

### Padrões de Botões:
- **Botão Primário Grande:** `"btn-large btn-primary shadow-lg"`
- **Botão Secundário / Alternativo:** `"btn-large bg-calm-accent text-white hover:bg-calm-accent/90 shadow-md"`
- **Botão de Controle (Play/Pause):** `"p-6 rounded-full bg-calm-primary text-white hover:bg-calm-primary/95 active:scale-95 transition-all shadow-lg scale-110"`
- **Ação Rápida Quadrada/Redonda:** `"p-4 rounded-xl border border-calm-border hover:bg-calm-secondary/20 transition-all active:scale-95 shadow-sm"`

---

## ⚡ 4. Animações Calmas e Suaves

Toda transição ou feedback deve ter um tempo de resposta suave para não desencadear ansiedade.

- **Bobbing (Mascote Flutuando):** Animação `bob` lenta de 4 segundos.
- **Tail Wiggling (Rabo do Mascote):** Animação `wiggle` de 3 segundos com rotação suave.
- **Pulsing (Respiração):** Animação `pulse` de 3 segundos para elementos meditativos.
- **Entrada Suave:** Utilizar Tailwind animate utilities como `"animate-in fade-in zoom-in-95 duration-500"` ou `"slide-in-from-bottom-4"`.

---

## 📏 5. Layout e Grade Responsiva

- **Espaçamento Central:** Páginas devem ser estruturadas dentro de `<main className="flex min-h-screen flex-col bg-calm-bg p-6 sm:p-12 transition-all">`.
- **Grades:** Para o painel Pomodoro, usar `"grid grid-cols-1 lg:grid-cols-3 gap-6"`.
- **Zonas de Toque:** Elementos interativos de clique devem ter altura/largura mínimas de `44px` para fácil toque mobile.
