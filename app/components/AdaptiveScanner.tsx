"use client";

import { useState, useEffect } from "react";
import CodeBlock from "./CodeBlock";

interface ScanResult {
  success: boolean;
  message: string;
  reportUrl?: string;
  command?: string;
  isLocal?: boolean;
}

export default function AdaptiveScanner() {
  const [repoUrl, setRepoUrl] = useState("https://github.com/Harmeto/menv_auth");
  const [branch, setBranch] = useState("master");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    // Detectar si estamos en un entorno local
    setIsLocal(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  }, []);

  const handleScan = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (isLocal) {
        // Usar la API local para escaneo real
        const response = await fetch('/api/scan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            repoUrl,
            branch,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error al escanear el repositorio');
        }

        setResult({
          success: true,
          message: "Escaneo completado exitosamente",
          reportUrl: data.html ? `data:text/html;base64,${btoa(data.html)}` : undefined,
          command: data.command,
          isLocal: true
        });
      } else {
        // Simular escaneo para GitHub Pages
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simular tiempo de escaneo
        
        setResult({
          success: true,
          message: "Simulación de escaneo completada (GitHub Pages)",
          reportUrl: "https://docs.bearer.com/guides/reports/",
          command: `bearer scan ${repoUrl} --format html --output security-report.html`,
          isLocal: false
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (result?.reportUrl) {
      if (result.isLocal) {
        // Para entorno local, descargar el HTML generado
        const link = document.createElement('a');
        link.href = result.reportUrl;
        link.download = 'bearer-report.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Para GitHub Pages, abrir documentación
        window.open(result.reportUrl, '_blank');
      }
    }
  };

  const viewReport = () => {
    if (result?.reportUrl) {
      if (result.isLocal) {
        // Para entorno local, mostrar el reporte generado
        const newWindow = window.open('', '_blank');
        if (newWindow) {
          newWindow.document.write(atob(result.reportUrl.split(',')[1]));
          newWindow.document.close();
        }
      } else {
        // Para GitHub Pages, abrir documentación
        window.open(result.reportUrl, '_blank');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Environment Indicator */}
      <div className={`p-4 rounded-lg border ${
        isLocal 
          ? 'bg-green-50 border-green-200 text-green-800' 
          : 'bg-blue-50 border-blue-200 text-blue-800'
      }`}>
        <div className="flex items-center">
          <span className="text-2xl mr-3">
            {isLocal ? '🏠' : '☁️'}
          </span>
          <div>
            <h3 className="font-semibold">
              {isLocal ? 'Modo Local' : 'Modo GitHub Pages'}
            </h3>
            <p className="text-sm">
              {isLocal 
                ? 'Ejecutando escaneo real con Bearer CLI via WSL'
                : 'Mostrando simulación de escaneo (Bearer CLI no disponible en GitHub Pages)'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Scanner Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Configuración del Escaneo
        </h2>

        <div className="space-y-6">
          {/* Repository URL */}
          <div>
            <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700 mb-2">
              URL del Repositorio
            </label>
            <input
              type="url"
              id="repoUrl"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/usuario/repositorio"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              Ingresa la URL completa del repositorio de GitHub
            </p>
          </div>

          {/* Branch */}
          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
              Rama
            </label>
            <input
              type="text"
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="master"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              Rama específica a escanear (por defecto: master)
            </p>
          </div>

          {/* Scan Button */}
          <button
            onClick={handleScan}
            disabled={loading || !repoUrl}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isLocal ? 'Escaneando...' : 'Simulando escaneo...'}
              </>
            ) : (
              <>
                🔍 {isLocal ? 'Iniciar Escaneo' : 'Simular Escaneo'}
              </>
            )}
          </button>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">💡 Consejos</h3>
          <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
            <li>
              {isLocal 
                ? 'El escaneo real puede tomar de 30 segundos a varios minutos'
                : 'Esta es una simulación para demostrar la funcionalidad'
              }
            </li>
            <li>
              {isLocal 
                ? 'Los repositorios grandes pueden requerir más tiempo'
                : 'Para escaneo real, ejecuta el proyecto localmente'
              }
            </li>
            <li>
              {isLocal 
                ? 'El reporte se generará en formato HTML'
                : 'Consulta la documentación de Bearer CLI para reportes reales'
              }
            </li>
            <li>
              {isLocal 
                ? 'Puedes descargar el reporte una vez completado'
                : 'Usa el tutorial para aprender a implementar Bearer CLI'
              }
            </li>
          </ul>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Resultados del Escaneo
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    {result.isLocal ? 'Escaneo Completado' : 'Simulación Completada'}
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    {result.message}
                  </div>
                </div>
              </div>
            </div>

            {/* Report Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Información del Reporte</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Repositorio:</span>
                  <span className="font-medium">{repoUrl}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rama:</span>
                  <span className="font-medium">{branch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo:</span>
                  <span className="font-medium">
                    {result.isLocal ? 'Reporte Real' : 'Simulación'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={viewReport}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              >
                👁️ {result.isLocal ? 'Ver Reporte' : 'Ver Documentación'}
              </button>
              <button
                onClick={downloadReport}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
              >
                📥 {result.isLocal ? 'Descargar Reporte' : 'Abrir Documentación'}
              </button>
            </div>

            {/* Command Used */}
            {result.command && (
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Comando Ejecutado</h4>
                <CodeBlock
                  code={result.command}
                  title="Comando"
                />
              </div>
            )}

            {/* GitHub Pages Notice */}
            {!result.isLocal && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-yellow-800 mb-2">ℹ️ Nota sobre GitHub Pages</h4>
                <p className="text-sm text-yellow-700">
                  Este es un entorno de demostración. Para escaneo real con Bearer CLI, 
                  clona el repositorio y ejecuta el proyecto localmente con WSL.
                </p>
              </div>
            )}
          </div>
        )}

        {!result && !error && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Listo para Escanear</h3>
            <p className="text-gray-600">
              Configura los parámetros del escaneo y haz clic en el botón correspondiente
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
