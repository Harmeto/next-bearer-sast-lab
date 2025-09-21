"use client";

import { useState } from "react";
import Link from "next/link";

export default function SetupPage() {
  const [step, setStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Crear Personal Access Token",
      description: "Necesitas un token de GitHub para activar los workflows",
      content: (
        <div className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Ve a <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub Settings → Personal Access Tokens</a></li>
            <li>Haz clic en "Generate new token (classic)"</li>
            <li>Configura los siguientes permisos:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li><code className="bg-gray-100 px-1 rounded">repo</code> - Full control of private repositories</li>
                <li><code className="bg-gray-100 px-1 rounded">workflow</code> - Update GitHub Action workflows</li>
              </ul>
            </li>
            <li>Copia el token generado (lo necesitarás en el siguiente paso)</li>
          </ol>
        </div>
      )
    },
    {
      id: 2,
      title: "Configurar Secret en el Repositorio",
      description: "Agrega el token como secret en tu repositorio",
      content: (
        <div className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Ve a tu repositorio: <a href="https://github.com/Harmeto/next-bearer-sast-lab" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">next-bearer-sast-lab</a></li>
            <li>Haz clic en "Settings" (en la pestaña del repositorio)</li>
            <li>En el menú lateral, haz clic en "Secrets and variables" → "Actions"</li>
            <li>Haz clic en "New repository secret"</li>
            <li>Nombre: <code className="bg-gray-100 px-1 rounded">GITHUB_TOKEN</code></li>
            <li>Valor: Pega el token que copiaste en el paso anterior</li>
            <li>Haz clic en "Add secret"</li>
          </ol>
        </div>
      )
    },
    {
      id: 3,
      title: "Configurar GitHub Pages",
      description: "Habilita GitHub Pages para el despliegue",
      content: (
        <div className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>En la misma página de Settings del repositorio</li>
            <li>En el menú lateral, haz clic en "Pages"</li>
            <li>En "Source", selecciona "GitHub Actions"</li>
            <li>Guarda los cambios</li>
            <li>Espera a que se complete el despliegue (puede tomar unos minutos)</li>
          </ol>
        </div>
      )
    },
    {
      id: 4,
      title: "Verificar Configuración",
      description: "Prueba que todo esté funcionando correctamente",
      content: (
        <div className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Ve a la pestaña "Actions" de tu repositorio</li>
            <li>Verifica que el workflow "Deploy to GitHub Pages" se haya ejecutado</li>
            <li>Ve a tu sitio web: <a href="https://harmeto.github.io/next-bearer-sast-lab" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://harmeto.github.io/next-bearer-sast-lab</a></li>
            <li>Prueba el scanner con un repositorio de GitHub</li>
            <li>Verifica que se active el workflow "Security Scan"</li>
          </ol>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🔧 Configuración del Scanner
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sigue estos pasos para configurar el scanner y que funcione correctamente en GitHub Pages.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= s.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {s.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > s.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Paso {step}: {steps[step - 1].title}
            </h2>
            <p className="text-gray-600">
              {steps[step - 1].description}
            </p>
          </div>
          
          <div className="prose max-w-none">
            {steps[step - 1].content}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            ← Anterior
          </button>
          
          <div className="flex space-x-4">
            {step < steps.length ? (
              <button
                onClick={() => setStep(Math.min(steps.length, step + 1))}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Siguiente →
              </button>
            ) : (
              <Link
                href="/scanner"
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
              >
                Probar Scanner 🚀
              </Link>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">¿Necesitas Ayuda?</h3>
          <div className="text-sm text-yellow-700 space-y-2">
            <p>Si tienes problemas con la configuración:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Verifica que el token tenga los permisos correctos</li>
              <li>Asegúrate de que el secret esté configurado correctamente</li>
              <li>Revisa los logs en la pestaña "Actions" del repositorio</li>
              <li>Consulta la <Link href="/troubleshooting" className="text-yellow-800 hover:underline">página de troubleshooting</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
