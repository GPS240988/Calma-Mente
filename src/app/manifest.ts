import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CalmaMente',
    short_name: 'CalmaMente',
    description: 'Plataforma de regulação emocional rápida e simples.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8FAF9',
    theme_color: '#52796F',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
