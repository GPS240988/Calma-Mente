import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CalmaMente',
    short_name: 'CalmaMente',
    description: 'Plataforma de regulação emocional rápida e simples.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F4F2FA',
    theme_color: '#5E51D9',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
