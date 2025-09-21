import Link from 'next/link';
import StatsCard from './components/StatsCard';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Laboratorio Interactivo Disponible
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text">
            <div className="flex justify-center items-center">
            <span className="mr-2">🔍</span>
            <p className="text-8xl font-bold text-gray-200">Bearer CLI Lab</p>
            </div>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Laboratorio interactivo para aprender análisis de seguridad estático (SAST) con Bearer CLI. 
              Diseñado para desarrolladores que quieren escribir código más seguro.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/tutorial"
                className="group inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-blue-600 bg-white hover:bg-gray-50 shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="mr-2">🎓</span>
                Comenzar Tutorial
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="/scanner"
                className="group inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-xl text-white hover:bg-white hover:text-blue-600 shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="mr-2">🔍</span>
                Escanear Ahora
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {/* External Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-blue-200">
              <span>También disponible en:</span>
              <div className="flex gap-4">
                <a
                  href="https://bearer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
                >
                  <span className="mr-2">🌐</span>
                  Página Oficial
                </a>
                <a
                  href="https://github.com/bearer/bearer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
                >
                  <span className="mr-2">🐙</span>
                  GitHub
                </a>
              <a
                href="https://docs.bearer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
              >
                <span className="mr-2">📚</span>
                Documentación
              </a>
              <Link
                href="/comparison"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
              >
                <span className="mr-2">⚖️</span>
                vs SonarQube
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ¿Por qué elegir Bearer CLI?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Una herramienta moderna y potente para análisis de seguridad estático, diseñada para desarrolladores que quieren escribir código más seguro.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <StatsCard
            title="Lenguajes Soportados"
            value="7+"
            description="JavaScript, TypeScript, Python, Ruby, Java, Go, PHP"
            icon="🌐"
            color="blue"
          />
          <StatsCard
            title="Reglas de Seguridad"
            value="200+"
            description="Patrones OWASP y CWE detectados"
            icon="🛡️"
            color="green"
          />
          <StatsCard
            title="Formatos de Reporte"
            value="4"
            description="HTML, JSON, YAML, SARIF"
            icon="📊"
            color="purple"
          />
          <StatsCard
            title="Tiempo de Escaneo"
            value="< 30s"
            description="Promedio para proyectos medianos"
            icon="⚡"
            color="yellow"
          />
        </div>

        {/* Quick Start Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              🚀 Inicio Rápido
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comienza a usar Bearer CLI en minutos con nuestra guía paso a paso
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-3xl w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Instalar</h4>
              <p className="text-gray-600 mb-4">
                Instala Bearer CLI usando Docker, WSL, o descarga directa
              </p>
              <Link
                href="/tutorial"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group-hover:translate-x-1 transition-transform duration-200"
              >
                Ver tutorial →
              </Link>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-3xl w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Configurar</h4>
              <p className="text-gray-600 mb-4">
                Crea un archivo bearer.yml para personalizar el comportamiento
              </p>
              <Link
                href="/tutorial"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group-hover:translate-x-1 transition-transform duration-200"
              >
                Ver configuración →
              </Link>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-3xl w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Escanear</h4>
              <p className="text-gray-600 mb-4">
                Ejecuta el escaneo y analiza los resultados de seguridad
              </p>
              <Link
                href="/scanner"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group-hover:translate-x-1 transition-transform duration-200"
              >
                Comenzar escaneo →
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 rounded-2xl shadow-2xl p-12 text-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para comenzar tu viaje hacia un código más seguro?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Explora nuestro tutorial interactivo, escanea tu código y únete a la comunidad de desarrolladores que priorizan la seguridad.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/tutorial"
                className="group inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-gray-900 bg-white hover:bg-gray-100 shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="mr-2">🎓</span>
                Explorar Tutorial
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="/scanner"
                className="group inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-xl text-white hover:bg-white hover:text-gray-900 shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="mr-2">🔍</span>
                Escanear Código
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <span className="text-2xl mr-3">🔍</span>
              <span className="text-2xl font-bold text-gray-900">Bearer CLI Lab</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Desarrollado con ❤️ para la comunidad de desarrolladores que priorizan la seguridad en el código.
            </p>
            <div className="flex justify-center space-x-8">
              <a
                href="https://bearer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">🌐</span>
                Página Oficial
              </a>
              <a
                href="https://github.com/bearer/bearer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">🐙</span>
                GitHub
              </a>
              <a
                href="https://docs.bearer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">📚</span>
                Documentación
              </a>
              <a
                href="https://discord.gg/eaHZBJUXRF"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-600 transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">💬</span>
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}