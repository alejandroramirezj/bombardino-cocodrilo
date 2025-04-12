/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  // Comentado para evitar error con rutas dinámicas
  images: {
    unoptimized: true,
  },
  basePath: '/bombardino-cocodrilo',
}

module.exports = nextConfig 