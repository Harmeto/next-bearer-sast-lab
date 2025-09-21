"use client";

import { useState } from "react";
import Link from "next/link";

interface ComparisonFeatureProps {
  title: string;
  bearer: string | boolean;
  sonarqube: string | boolean;
  description?: string;
  bearerAdvantage?: boolean;
}

const ComparisonFeature: React.FC<ComparisonFeatureProps> = ({ 
  title, 
  bearer, 
  sonarqube, 
  description, 
  bearerAdvantage = false 
}) => {
  const getValueDisplay = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="text-green-600 font-semibold">✅ Sí</span>
      ) : (
        <span className="text-red-600 font-semibold">❌ No</span>
      );
    }
    return <span className="font-medium">{value}</span>;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-3 rounded-lg ${bearerAdvantage ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">🔍</span>
            <span className="font-medium text-gray-900">Bearer CLI</span>
          </div>
          <div className="text-sm">{getValueDisplay(bearer)}</div>
        </div>
        <div className={`p-3 rounded-lg ${!bearerAdvantage ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">🔧</span>
            <span className="font-medium text-gray-900">SonarQube</span>
          </div>
          <div className="text-sm">{getValueDisplay(sonarqube)}</div>
        </div>
      </div>
    </div>
  );
};

export default function ComparisonPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const comparisonFeatures = [
    {
      title: "Detección de Vulnerabilidades de Seguridad",
      bearer: "Especializado en SAST y detección de secretos",
      sonarqube: "Enfoque general en calidad de código",
      description: "Bearer CLI está específicamente diseñado para detectar vulnerabilidades de seguridad, mientras que SonarQube se enfoca más en la calidad general del código.",
      bearerAdvantage: true
    },
    {
      title: "Detección de Secretos y Credenciales",
      bearer: true,
      sonarqube: "Limitado",
      description: "Bearer CLI tiene capacidades avanzadas para detectar API keys, tokens, contraseñas y otros secretos expuestos en el código.",
      bearerAdvantage: true
    },
    {
      title: "Análisis de Duplicación de Código",
      bearer: false,
      sonarqube: true,
      description: "SonarQube es superior en la detección y análisis de código duplicado.",
      bearerAdvantage: false
    },
    {
      title: "Complejidad Ciclomática",
      bearer: false,
      sonarqube: true,
      description: "SonarQube proporciona métricas detalladas de complejidad del código.",
      bearerAdvantage: false
    },
    {
      title: "Cobertura de Pruebas",
      bearer: false,
      sonarqube: true,
      description: "SonarQube integra análisis de cobertura de pruebas y métricas de testing.",
      bearerAdvantage: false
    },
    {
      title: "Reglas OWASP Top 10",
      bearer: true,
      sonarqube: "Parcial",
      description: "Bearer CLI tiene cobertura completa y actualizada de las vulnerabilidades OWASP Top 10.",
      bearerAdvantage: true
    },
    {
      title: "Facilidad de Instalación",
      bearer: "Muy fácil (un comando)",
      sonarqube: "Compleja (servidor, base de datos, configuración)",
      description: "Bearer CLI se instala con un simple comando, mientras que SonarQube requiere configuración de servidor.",
      bearerAdvantage: true
    },
    {
      title: "Integración CI/CD",
      bearer: "Excelente",
      sonarqube: "Excelente",
      description: "Ambas herramientas se integran bien con pipelines de CI/CD.",
      bearerAdvantage: false
    },
    {
      title: "Reportes HTML Interactivos",
      bearer: true,
      sonarqube: "Básicos",
      description: "Bearer CLI genera reportes HTML más interactivos y fáciles de interpretar.",
      bearerAdvantage: true
    },
    {
      title: "Análisis de Dependencias",
      bearer: "Limitado",
      sonarqube: true,
      description: "SonarQube tiene capacidades avanzadas para analizar vulnerabilidades en dependencias.",
      bearerAdvantage: false
    },
    {
      title: "Costo de Licencia",
      bearer: "Gratuito (Open Source)",
      sonarqube: "Freemium (funcionalidades limitadas en versión gratuita)",
      description: "Bearer CLI es completamente gratuito, mientras que SonarQube tiene limitaciones en su versión gratuita.",
      bearerAdvantage: true
    },
    {
      title: "Tiempo de Escaneo",
      bearer: "Muy rápido (< 30s promedio)",
      sonarqube: "Lento (minutos para proyectos grandes)",
      description: "Bearer CLI es significativamente más rápido en el análisis de código.",
      bearerAdvantage: true
    }
  ];

  const useCases = [
    {
      title: "Usar Bearer CLI cuando:",
      icon: "🔍",
      color: "green",
      scenarios: [
        "Priorizas la seguridad del código sobre la calidad general",
        "Necesitas detectar secretos y credenciales expuestas",
        "Quieres análisis rápido y fácil de implementar",
        "Trabajas con equipos pequeños o startups",
        "Necesitas reportes de seguridad específicos para auditorías",
        "Quieres una herramienta sin costo de licencia"
      ]
    },
    {
      title: "Usar SonarQube cuando:",
      icon: "🔧",
      color: "blue",
      scenarios: [
        "Necesitas análisis completo de calidad de código",
        "Quieres métricas de duplicación y complejidad",
        "Tienes un equipo grande con recursos para configuración",
        "Necesitas análisis de cobertura de pruebas",
        "Quieres integración con múltiples lenguajes y frameworks",
        "Tienes presupuesto para licencias empresariales"
      ]
    },
    {
      title: "Usar ambos cuando:",
      icon: "🤝",
      color: "purple",
      scenarios: [
        "Quieres cobertura completa de seguridad Y calidad",
        "Tienes recursos para mantener ambas herramientas",
        "Trabajas en un entorno empresarial con múltiples equipos",
        "Necesitas cumplir con estándares de seguridad y calidad",
        "Quieres redundancia en la detección de problemas",
        "Tienes diferentes equipos con diferentes necesidades"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🔍 vs 🔧 <span className="text-blue-600">Bearer CLI vs SonarQube</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Comparación detallada entre Bearer CLI y SonarQube para ayudarte a elegir la herramienta 
            correcta para tu proyecto o decidir si necesitas ambas.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 mr-2 mb-2 ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
            }`}
          >
            📊 Comparación General
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 mr-2 mb-2 ${
              activeTab === 'features'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
            }`}
          >
            ⚡ Características Detalladas
          </button>
          <button
            onClick={() => setActiveTab('usecases')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 mr-2 mb-2 ${
              activeTab === 'usecases'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
            }`}
          >
            🎯 Casos de Uso
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 mr-2 mb-2 ${
              activeTab === 'recommendations'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
            }`}
          >
            💡 Recomendaciones
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Bearer CLI Overview */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-500">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🔍</div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Bearer CLI</h2>
                  <p className="text-lg text-gray-600">Especialista en Seguridad</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✅</span>
                    <span>Análisis de Seguridad Estático (SAST)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✅</span>
                    <span>Detección de Secretos y Credenciales</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✅</span>
                    <span>Reglas OWASP Top 10</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✅</span>
                    <span>Instalación Súper Fácil</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✅</span>
                    <span>Completamente Gratuito</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✅</span>
                    <span>Análisis Rápido (&lt; 30s)</span>
                  </div>
                </div>
              </div>

              {/* SonarQube Overview */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-500">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🔧</div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">SonarQube</h2>
                  <p className="text-lg text-gray-600">Plataforma de Calidad de Código</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-3">✅</span>
                    <span>Análisis Completo de Calidad</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-3">✅</span>
                    <span>Detección de Código Duplicado</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-3">✅</span>
                    <span>Métricas de Complejidad</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-3">✅</span>
                    <span>Análisis de Dependencias</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-3">✅</span>
                    <span>Cobertura de Pruebas</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-3">✅</span>
                    <span>Dashboard Empresarial</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Comparison Table */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Comparación Rápida</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Característica</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">Bearer CLI</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">SonarQube</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-900">Enfoque Principal</td>
                      <td className="py-3 px-4 text-center text-green-600">Seguridad</td>
                      <td className="py-3 px-4 text-center text-blue-600">Calidad</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-900">Costo</td>
                      <td className="py-3 px-4 text-center text-green-600">Gratuito</td>
                      <td className="py-3 px-4 text-center text-yellow-600">Freemium</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-900">Instalación</td>
                      <td className="py-3 px-4 text-center text-green-600">Muy Fácil</td>
                      <td className="py-3 px-4 text-center text-red-600">Compleja</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-900">Velocidad</td>
                      <td className="py-3 px-4 text-center text-green-600">Muy Rápido</td>
                      <td className="py-3 px-4 text-center text-yellow-600">Lento</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-900">Detección de Secretos</td>
                      <td className="py-3 px-4 text-center text-green-600">Excelente</td>
                      <td className="py-3 px-4 text-center text-yellow-600">Limitado</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-900">Código Duplicado</td>
                      <td className="py-3 px-4 text-center text-red-600">No</td>
                      <td className="py-3 px-4 text-center text-green-600">Excelente</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="space-y-6">
            <div className="grid gap-6">
              {comparisonFeatures.map((feature, index) => (
                <ComparisonFeature key={index} {...feature} />
              ))}
            </div>
          </div>
        )}

        {/* Use Cases Tab */}
        {activeTab === 'usecases' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className={`bg-white rounded-2xl shadow-xl p-8 border-t-4 border-${useCase.color}-500`}>
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">{useCase.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900">{useCase.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {useCase.scenarios.map((scenario, scenarioIndex) => (
                      <li key={scenarioIndex} className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">•</span>
                        <span className="text-gray-700">{scenario}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div className="space-y-8">
            {/* Recommendation Matrix */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Matriz de Recomendaciones</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-green-800 mb-4">🚀 Startups / Equipos Pequeños</h4>
                  <p className="text-green-700 mb-4">
                    <strong>Recomendación:</strong> Comienza con Bearer CLI
                  </p>
                  <ul className="text-sm text-green-600 space-y-2">
                    <li>• Instalación rápida y sin costo</li>
                    <li>• Enfoque en seguridad (crítico para startups)</li>
                    <li>• Fácil integración CI/CD</li>
                    <li>• Reportes claros para inversores</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-blue-800 mb-4">🏢 Empresas Grandes</h4>
                  <p className="text-blue-700 mb-4">
                    <strong>Recomendación:</strong> Usa ambos
                  </p>
                  <ul className="text-sm text-blue-600 space-y-2">
                    <li>• Bearer CLI para seguridad</li>
                    <li>• SonarQube para calidad general</li>
                    <li>• Recursos para mantener ambas</li>
                    <li>• Cumplimiento de estándares</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-purple-800 mb-4">🔒 Sectores Regulados</h4>
                  <p className="text-purple-700 mb-4">
                    <strong>Recomendación:</strong> Bearer CLI + SonarQube Enterprise
                  </p>
                  <ul className="text-sm text-purple-600 space-y-2">
                    <li>• Auditorías de seguridad estrictas</li>
                    <li>• Reportes detallados para compliance</li>
                    <li>• Análisis de dependencias crítico</li>
                    <li>• Integración con herramientas empresariales</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-yellow-800 mb-4">💰 Presupuesto Limitado</h4>
                  <p className="text-yellow-700 mb-4">
                    <strong>Recomendación:</strong> Bearer CLI + SonarQube Community
                  </p>
                  <ul className="text-sm text-yellow-600 space-y-2">
                    <li>• Ambas herramientas gratuitas</li>
                    <li>• Cobertura completa sin costo</li>
                    <li>• Configuración más compleja</li>
                    <li>• Funcionalidades limitadas en SonarQube</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-red-800 mb-4">⚡ Desarrollo Rápido</h4>
                  <p className="text-red-700 mb-4">
                    <strong>Recomendación:</strong> Solo Bearer CLI
                  </p>
                  <ul className="text-sm text-red-600 space-y-2">
                    <li>• Implementación inmediata</li>
                    <li>• Análisis rápido en cada commit</li>
                    <li>• Enfoque en vulnerabilidades críticas</li>
                    <li>• Menos overhead de configuración</li>
                  </ul>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-indigo-800 mb-4">📊 Equipos de QA</h4>
                  <p className="text-indigo-700 mb-4">
                    <strong>Recomendación:</strong> SonarQube + Bearer CLI
                  </p>
                  <ul className="text-sm text-indigo-600 space-y-2">
                    <li>• SonarQube para métricas de calidad</li>
                    <li>• Bearer CLI para auditorías de seguridad</li>
                    <li>• Reportes complementarios</li>
                    <li>• Cobertura completa del pipeline</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Implementation Strategy */}
            <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 rounded-2xl shadow-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6 text-center">Estrategia de Implementación</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold mb-4 text-green-300">Fase 1: Seguridad (Bearer CLI)</h4>
                  <ol className="space-y-2 text-gray-300">
                    <li>1. Instalar Bearer CLI en el pipeline</li>
                    <li>2. Configurar escaneos automáticos</li>
                    <li>3. Establecer umbrales de seguridad</li>
                    <li>4. Entrenar al equipo en interpretación</li>
                  </ol>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-4 text-blue-300">Fase 2: Calidad (SonarQube)</h4>
                  <ol className="space-y-2 text-gray-300">
                    <li>1. Configurar servidor SonarQube</li>
                    <li>2. Integrar con repositorios</li>
                    <li>3. Definir reglas de calidad</li>
                    <li>4. Establecer métricas y dashboards</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Listo para implementar Bearer CLI en tu organización?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Comienza con nuestro tutorial interactivo y descubre cómo Bearer CLI puede mejorar 
            la seguridad de tu código en minutos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/tutorial"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🎓 Comenzar Tutorial
            </Link>
            <Link
              href="/scanner"
              className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-lg font-medium rounded-xl text-blue-600 bg-white hover:bg-blue-50 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🔍 Probar Scanner
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
