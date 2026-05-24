# Padrão de Design — Tipografia e Espaçamento Responsivo

## Hierarquia Tipográfica

| Elemento | Mobile | Desktop (sm+) | Peso | Leading |
|----------|--------|---------------|------|---------|
| Título principal (h1) | `text-2xl` | `text-3xl` | `font-semibold` ou `font-medium` | `leading-tight` |
| Título secundário (h2) | `text-base` | `text-lg` | `font-semibold` | `leading-tight` |
| Título de card / subtítulo | `text-base` | `text-lg` | `font-bold` ou `font-semibold` | `leading-tight` |
| Título de modal | `text-base` | `text-lg` | `font-bold` | `leading-tight` |
| Parágrafo / descrição | `text-sm` | `text-sm` | `font-normal` | `leading-relaxed` |
| Texto de apoio / mood | `text-xs` | `text-xs` | `font-medium` | `leading-snug` |
| Tags / badges | `text-[10px]` | `text-[10px]` | `font-medium` | — |
| Botão primário | `text-base` | `text-lg` | `font-semibold` | — |
| Botão secundário | `text-sm` | `text-base` | `font-semibold` | — |
| Breadcrumb / metadado | `text-xs` | `text-xs` | `font-medium` | — |

## Padding de Cards

| Elemento | Mobile | Desktop (sm+) |
|----------|--------|---------------|
| Card normal | `p-4` | `p-6` |
| Card de categoria | `p-4` | `p-5` |
| Card de ação (botão) | `p-3` | `p-4` |
| Banner / destaque | `p-4` | `p-6` |

## Tamanho de Ícones

| Contexto | Mobile | Desktop (sm+) |
|----------|--------|---------------|
| Ícone de card (avatar) | `w-12 h-12` (icone `w-6 h-6`) | `w-14 h-14` (icone `w-7 h-7`) |
| Ícone inline / header | `w-5 h-5` | `w-6 h-6` |
| Ícone de ação (fechar/voltar) | `w-7 h-7` | `w-8 h-8` |
| Botão de info | `w-4 h-4` | `w-5 h-5` |

## Gaps / Espaçamento entre Elementos

| Contexto | Mobile | Desktop (sm+) |
|----------|--------|---------------|
| Container principal (flex gap) | `gap-6` | `gap-8` |
| Entre cards | `gap-4` | `gap-4` |
| Entre elementos de header | `gap-2` | `gap-3` |
| Entre conteúdo de card | `gap-4` | `gap-5` |

## Regras Gerais

- **Títulos nunca usam `truncate`** — usar `break-words` + `leading-tight` para permitir quebra natural
- **Todo texto com risco de quebra** deve ter `break-words` e `leading-tight` ou `leading-snug`
- **Botões devem ter `leading-tight`** para evitar espaçamento extra vertical em mobile
- **Padding do `<main>`** é `p-6 sm:p-12` em todas as páginas
- **`text-2xl`** é o tamanho máximo de título em mobile; `text-3xl` só em desktop
- **Textos descritivos** mantêm `text-sm` em mobile e desktop (não escalam)
- **Tags/badges** usam `text-[10px]` fixo (não escalam)
