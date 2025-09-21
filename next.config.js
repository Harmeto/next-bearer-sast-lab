/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configuración para GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '/next-bearer-sast-lab' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/next-bearer-sast-lab' : '',
  // Deshabilitar la API de escaneo en producción (GitHub Pages)
  experimental: {
    outputFileTracingRoot: undefined,
  },
}

module.exports = nextConfig