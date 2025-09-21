import './globals.css'
import Navigation from './components/Navigation'

export const metadata = {
  title: 'Bearer CLI Lab - Laboratorio de Análisis de Seguridad Estático',
  description: 'Aprende análisis de seguridad estático (SAST) con Bearer CLI. Laboratorio interactivo diseñado para desarrolladores intermedios.',
  keywords: 'SAST, seguridad, Bearer CLI, análisis estático, vulnerabilidades, OWASP, CWE',
  authors: [{ name: 'Bearer CLI Lab' }],
  openGraph: {
    title: 'Bearer CLI Lab',
    description: 'Laboratorio de Análisis de Seguridad Estático con Bearer CLI',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
