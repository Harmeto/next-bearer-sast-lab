"use client";

import AdaptiveScanner from "../components/AdaptiveScanner";

export default function ScannerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🔍 Scanner de Repositorios
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Escanea repositorios públicos de GitHub para detectar vulnerabilidades de seguridad. 
            Funciona tanto localmente con Bearer CLI como en GitHub Pages con simulación.
          </p>
        </div>

        {/* Adaptive Scanner Component */}
        <AdaptiveScanner />
      </div>
    </div>
  );
}
