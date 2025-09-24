"use client";

import { useState, useEffect } from "react";
import listJson from "../../public/reports-list.json";
import Link from "next/link";

interface Report {
  id: string;
  filename: string;
  size: string;
  url: string;
  displayName: string;
}

const baseUrl = process.env.NODE_ENV === 'production' ? 'next-bearer-sast-lab' : '';

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    // Lista estática de reportes (excluyendo los que cambian con deploy)
    const staticReports: Report[] = listJson.reports.map((report) => ({
      id: report.id,
      filename: report.filename,
      size: report.size.toString(),
      url: baseUrl === '' ? `${report.id}.html` : `/${baseUrl}/reports/${report.id}.html`,
      displayName: report.id,
    }));

    setReports(staticReports);
    setLoading(false);
  };

  const openReport = (report: Report) => {
    window.open(report.url, '_blank');
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

        {/* Reports List */}
        {!loading && (
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
                    {reports.length > 0 ? reports[0].size : '0 KB'}
                  </div>
                  <div className="text-sm text-gray-600">Último Reporte</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    Bearer CLI
                  </div>
                  <div className="text-sm text-gray-600">Herramienta de Análisis</div>
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
                            {report.displayName.substring(0, 8)}
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
                        <span className="font-medium">{report.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Archivo:</span>
                        <span className="font-medium font-mono text-xs">{report.filename}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estado:</span>
                        <span className="font-medium text-green-600">Disponible</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => openReport(report)}
                        className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        👁️ Ver Reporte
                      </button>
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

            {/* Empty State */}
            {reports.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay reportes disponibles
                </h3>
                <p className="text-gray-600 mb-6">
                  Ejecuta un escaneo para generar tu primer reporte de seguridad.
                </p>
                <Link
                  href="/scanner"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                >
                  🔍 Ejecutar Escaneo
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
