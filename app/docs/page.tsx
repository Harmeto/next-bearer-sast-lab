import Link from 'next/link';

export default function DocsPage() {
  const docSections = [
    {
      title: "Guía General",
      description: "Introducción completa al proyecto y sus características",
      icon: "📚",
      href: "/docs/guide",
      color: "blue"
    },
    {
      title: "Tutorial Interactivo",
      description: "Aprende Bearer CLI paso a paso con ejemplos prácticos",
      icon: "🎓",
      href: "/tutorial",
      color: "green"
    },
    {
      title: "Referencia de Comandos",
      description: "Documentación completa de todos los comandos disponibles",
      icon: "⚡",
      href: "/docs/commands",
      color: "purple"
    },
    {
      title: "Configuración Avanzada",
      description: "Opciones de configuración y personalización",
      icon: "⚙️",
      href: "/docs/config",
      color: "yellow"
    },
    {
      title: "Integración CI/CD",
      description: "Guías para integrar en diferentes plataformas",
      icon: "🔄",
      href: "/docs/cicd",
      color: "red"
    },
    {
      title: "Mejores Prácticas",
      description: "Consejos y recomendaciones para un uso óptimo",
      icon: "💡",
      href: "/docs/best-practices",
      color: "indigo"
    },
    {
      title: "Troubleshooting",
      description: "Soluciones a problemas comunes de instalación y uso",
      icon: "🔧",
      href: "/troubleshooting",
      color: "red"
    }
  ];

  const externalResources = [
    {
      title: "Documentación Oficial",
      description: "Documentación completa de Bearer CLI",
      url: "https://docs.bearer.com",
      icon: "🌐"
    },
    {
      title: "GitHub Repository",
      description: "Código fuente y issues en GitHub",
      url: "https://github.com/bearer/bearer",
      icon: "🐙"
    },
    {
      title: "Comunidad Discord",
      description: "Únete a la comunidad de desarrolladores",
      url: "https://discord.gg/eaHZBJUXRF",
      icon: "💬"
    },
    {
      title: "Stack Overflow",
      description: "Preguntas y respuestas de la comunidad",
      url: "https://stackoverflow.com/questions/tagged/bearer",
      icon: "❓"
    }
  ];

  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    green: "bg-green-50 border-green-200 text-green-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
    red: "bg-red-50 border-red-200 text-red-800",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-800"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📖 Documentación
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Guías completas, referencias y recursos para dominar Bearer CLI y el análisis de seguridad estático.
          </p>
        </div>

        {/* Documentation Sections */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Guías y Tutoriales
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docSections.map((section, index) => (
              <Link
                key={index}
                href={section.href}
                className="group bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${colorClasses[section.color as keyof typeof colorClasses]}`}>
                    <span className="text-2xl">{section.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {section.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Reference */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Referencia Rápida
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Basic Commands */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Comandos Básicos</h3>
                <div className="space-y-3">
                  <div className="bg-gray-900 rounded-lg p-3">
                    <code className="text-green-400 text-sm">
                      bearer scan . --format html --output report.html
                    </code>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-3">
                    <code className="text-green-400 text-sm">
                      bearer scan . --scanner sast,secrets
                    </code>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-3">
                    <code className="text-green-400 text-sm">
                      bearer scan . --severity critical,high
                    </code>
                  </div>
                </div>
              </div>

              {/* Docker Commands */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Comandos Docker</h3>
                <div className="space-y-3">
                  <div className="bg-gray-900 rounded-lg p-3">
                    <code className="text-green-400 text-sm">
                      docker run --rm -v "$(pwd):/tmp/scan" bearer/bearer:latest scan /tmp/scan
                    </code>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-3">
                    <code className="text-green-400 text-sm">
                      docker run --rm -v "$(pwd):/tmp/scan" bearer/bearer:latest scan /tmp/scan --format html
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* External Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Recursos Externos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {externalResources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{resource.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {resource.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            ¿Nuevo en Bearer CLI?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Comienza con nuestro tutorial interactivo y aprende los conceptos fundamentales del análisis de seguridad estático.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tutorial"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🎓 Comenzar Tutorial
            </Link>
            <Link
              href="/scanner"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🔍 Probar Scanner
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
