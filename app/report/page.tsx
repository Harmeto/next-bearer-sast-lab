"use client";

import { useState, useEffect } from "react";

export default function ReportPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular carga del iframe
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🔍 Reporte de Seguridad - Bearer CLI Lab
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Análisis de seguridad del proyecto generado automáticamente
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Volver al Inicio
              </a>
              <a
                href="/scanner"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Nuevo Escaneo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Cargando Reporte de Seguridad
            </h3>
            <p className="text-gray-600">
              El reporte se está cargando automáticamente...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error al Cargar el Reporte
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Iframe Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Reporte de Seguridad Generado por Bearer CLI
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>📅 {new Date().toLocaleDateString()}</span>
                <span>•</span>
                <span>🔄 Actualizado automáticamente</span>
              </div>
            </div>
          </div>
          
          <div className="relative" style={{ height: '80vh' }}>
            <iframe
              src="/project-scan-report.html"
              className="w-full h-full border-0"
              title="Reporte de Seguridad Bearer CLI"
              onLoad={() => setLoading(false)}
              onError={() => {
                setError('No se pudo cargar el reporte de seguridad. El archivo puede no estar disponible.');
                setLoading(false);
              }}
              style={{ minHeight: '600px' }}
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Información del Reporte
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Este reporte ha sido generado automáticamente por Bearer CLI durante el proceso de despliegue. 
                  Incluye análisis SAST (Static Application Security Testing) y detección de secretos.
                </p>
                <p className="mt-2">
                  <strong>Repositorio:</strong> https://github.com/Harmeto/next-bearer-sast-lab<br />
                  <strong>Rama:</strong> main<br />
                  <strong>Herramienta:</strong> Bearer CLI v1.51.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
