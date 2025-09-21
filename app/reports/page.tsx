"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Report {
  id: string;
  filename: string;
  size: number;
  created: string;
  modified: string;
  url: string;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/reports');
      const data = await response.json();
      
      if (data.success) {
        setReports(data.reports);
      } else {
        setError(data.error || 'Error al cargar los reportes');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                📊 Reportes de Seguridad
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Historial de análisis de seguridad generados por Bearer CLI
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Volver al Inicio
              </Link>
              <Link
                href="/scanner"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Nuevo Escaneo
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Cargando Reportes
              </h3>
              <p className="text-gray-600">
                Obteniendo lista de reportes de seguridad...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
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
                <div className="mt-4">
                  <button
                    onClick={fetchReports}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reintentar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports List */}
        {!loading && !error && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{reports.length}</div>
                  <div className="text-sm text-gray-600">Total Reportes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {reports.length > 0 ? formatFileSize(reports[0].size) : '0 KB'}
                  </div>
                  <div className="text-sm text-gray-600">Último Reporte</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {reports.length > 0 ? formatDate(reports[0].modified) : 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">Última Actualización</div>
                </div>
              </div>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report, index) => (
                <div key={report.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">📊</span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Reporte #{index + 1}
                          </h3>
                          <p className="text-sm text-gray-500 font-mono">
                            {report.id.substring(0, 8)}...
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        index === 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {index === 0 ? 'Más Reciente' : 'Anterior'}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Tamaño:</span>
                        <span className="font-medium">{formatFileSize(report.size)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Creado:</span>
                        <span className="font-medium">{formatDate(report.created)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Modificado:</span>
                        <span className="font-medium">{formatDate(report.modified)}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <a
                        href={report.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        👁️ Ver Reporte
                      </a>
                      <a
                        href={report.url}
                        download={`reporte-${report.id}.html`}
                        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        📥
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {reports.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📊</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay reportes disponibles
                </h3>
                <p className="text-gray-600 mb-4">
                  Los reportes se generan automáticamente durante el proceso de despliegue.
                </p>
                <Link
                  href="/scanner"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Generar Nuevo Reporte
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
