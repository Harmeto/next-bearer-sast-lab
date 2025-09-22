"use client";

import { useState } from "react";
import CodeBlock from "../components/CodeBlock";

export default function TroubleshootingPage() {
  const [activeSection, setActiveSection] = useState("wsl");

  const sections = [
    {
      id: "wsl",
      title: "Problemas con WSL",
      description: "Errores comunes en la instalación de WSL",
      icon: "🪟"
    },
    {
      id: "bearer",
      title: "Problemas con Bearer CLI",
      description: "Errores en la instalación de Bearer CLI",
      icon: "🔧"
    },
    {
      id: "docker",
      title: "Problemas con Docker",
      description: "Errores al usar Bearer CLI con Docker",
      icon: "🐳"
    },
    {
      id: "scanning",
      title: "Problemas de Escaneo",
      description: "Errores durante el proceso de escaneo",
      icon: "🔍"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔧 Troubleshooting
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluciones a problemas comunes durante la instalación y uso de Bearer CLI
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Secciones de Ayuda
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{section.icon}</span>
                      <div>
                        <div className="font-medium">{section.title}</div>
                        <div className="text-sm text-gray-500">{section.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {activeSection === "wsl" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    🪟 Problemas con WSL (Windows Subsystem for Linux)
                  </h2>
                  
                  <p className="text-gray-700">
                    WSL es necesario para ejecutar Bearer CLI en Windows. Aquí están las soluciones a los problemas más comunes.
                  </p>

                  {/* Error: WSL not found */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-3">
                      ❌ Error: "WSL no está instalado"
                    </h3>
                    <p className="text-red-700 mb-4">
                      <strong>Síntoma:</strong> Al ejecutar <code>wsl</code> obtienes un error de comando no encontrado.
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-medium text-red-800">Solución:</h4>
                      <CodeBlock
                        code={`# Instalar WSL desde PowerShell (como administrador)
wsl --install

# O instalar una distribución específica
wsl --install -d Ubuntu-22.04`}
                        title="Instalación de WSL"
                      />
                      <p className="text-sm text-red-700">
                        <strong>Nota:</strong> Requiere reiniciar el sistema después de la instalación.
                      </p>
                    </div>
                  </div>

                  {/* Error: Failed to attach disk */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-orange-800 mb-3">
                      ⚠️ Error: "Failed to attach disk to WSL2"
                    </h3>
                    <p className="text-orange-700 mb-4">
                      <strong>Síntoma:</strong> Error al iniciar WSL: <code>Failed to attach disk 'C:\Users\...' to WSL2: The system cannot find the path specified.</code>
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-medium text-orange-800">Solución:</h4>
                      <CodeBlock
                        code={`# 1. Reinstalar WSL completamente
wsl --unregister Ubuntu-22.04
wsl --install -d Ubuntu-22.04

# 2. Si persiste el problema, actualizar WSL
wsl --update
wsl --set-default-version 2`}
                        title="Reparación de WSL"
                      />
                      <p className="text-sm text-orange-700">
                        <strong>Alternativa:</strong> Si el problema persiste, desinstala WSL desde "Programas y características" y reinstala.
                      </p>
                    </div>
                  </div>

                  {/* Error: Ubuntu not found */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                      🔍 Error: "Ubuntu no encontrado"
                    </h3>
                    <p className="text-yellow-700 mb-4">
                      <strong>Síntoma:</strong> WSL está instalado pero no encuentra la distribución de Ubuntu.
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-medium text-yellow-800">Solución:</h4>
                      <CodeBlock
                        code={`# Verificar distribuciones instaladas
wsl -l -v

# Instalar Ubuntu desde Microsoft Store o:
wsl --install -d Ubuntu-22.04

# Verificar que esté corriendo
wsl -d Ubuntu-22.04`}
                        title="Verificación e Instalación"
                      />
                    </div>
                  </div>

                  {/* Performance issues */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">
                      🐌 Problemas de Rendimiento
                    </h3>
                    <p className="text-blue-700 mb-4">
                      <strong>Síntoma:</strong> WSL es muy lento o se cuelga frecuentemente.
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-medium text-blue-800">Soluciones:</h4>
                      <CodeBlock
                        code={`# 1. Verificar que esté usando WSL2
wsl -l -v

# 2. Si está en WSL1, convertir a WSL2
wsl --set-version Ubuntu-22.04 2

# 3. Configurar recursos en .wslconfig
# Crear archivo C:\Users\\[usuario]\\.wslconfig
[wsl2]
memory=4GB
processors=2
swap=2GB`}
                        title="Optimización de WSL"
                      />
                    </div>
                  </div>

                  {/* Error: REGDB_E_CLASSNOTREG */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-3">
                      ❌ Error: "Wsl/CallMsi/REGDB_E_CLASSNOTREG"
                    </h3>
                    <p className="text-red-700 mb-4">
                      <strong>Síntoma:</strong> Al ejecutar <code>wsl</code> en PowerShell obtienes el error: <code>Class not registered Error code: Wsl/CallMsi/REGDB_E_CLASSNOTREG</code>
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-medium text-red-800">Solución 1: Cambiar a WSL2</h4>
                      <CodeBlock
                        code={`# Verificar versión actual de WSL
wsl -l -v

# Cambiar a WSL2 como versión por defecto
wsl --set-default-version 2

# Si tienes distribuciones instaladas, convertir a WSL2
wsl --set-version Ubuntu 2`}
                        title="Cambio a WSL2"
                      />
                      
                      <h4 className="font-medium text-red-800">Solución 2: Reinstalación Manual de WSL</h4>
                      <CodeBlock
                        code={`# 1. Descargar e instalar WSL manualmente
# Descargar desde: https://github.com/microsoft/WSL/releases/download/2.3.24/wsl.2.3.24.0.x64.msi

# 2. Ejecutar PowerShell como administrador
# 3. Cambiar a WSL2
wsl --set-default-version 2

# 4. Instalar Ubuntu
wsl --install -d Ubuntu

# 5. Configurar usuario (usar nombre en minúsculas)
# 6. Actualizar paquetes
sudo apt update`}
                        title="Reinstalación Completa"
                      />
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h5 className="font-medium text-yellow-800 mb-2">⚠️ Notas Importantes:</h5>
                        <ul className="text-yellow-700 text-sm space-y-1 list-disc list-inside">
                          <li>Reinicia PowerShell como administrador después de instalar WSL</li>
                          <li>El nombre de usuario debe estar en minúsculas</li>
                          <li>Si tienes Docker Desktop, reinícialo después de la instalación</li>
                          <li>Verifica que todas las características de Windows estén habilitadas</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Best practices */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">
                      ✅ Mejores Prácticas para WSL
                    </h3>
                    <ul className="text-green-700 space-y-2 list-disc list-inside">
                      <li>Usa siempre WSL2 para mejor rendimiento</li>
                      <li>Mantén WSL actualizado con <code>wsl --update</code></li>
                      <li>No ejecutes Bearer CLI en directorios de Windows (usa <code>/mnt/c/</code>)</li>
                      <li>Configura recursos adecuados en <code>.wslconfig</code></li>
                      <li>Usa <code>wsl --shutdown</code> para reiniciar WSL si hay problemas</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeSection === "bearer" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    🔧 Problemas con Bearer CLI
                  </h2>
                  
                  <p className="text-gray-700">
                    Errores comunes durante la instalación y configuración de Bearer CLI.
                  </p>

                  {/* Installation errors */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-3">
                      ❌ Error: "bearer: command not found"
                    </h3>
                    <p className="text-red-700 mb-4">
                      <strong>Síntoma:</strong> Bearer CLI no se encuentra después de la instalación.
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-medium text-red-800">Solución:</h4>
                      <CodeBlock
                        code={`# 1. Verificar instalación
which bearer
bearer --version

# 2. Si no está instalado, instalar Bearer CLI
curl -fsSL https://bearer.com/install.sh | sh

# 3. Agregar al PATH si es necesario
echo 'export PATH="$HOME/.bearer/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc`}
                        title="Instalación de Bearer CLI"
                      />
                    </div>
                  </div>

                  {/* Permission errors */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-orange-800 mb-3">
                      ⚠️ Error: "Permission denied"
                    </h3>
                    <p className="text-orange-700 mb-4">
                      <strong>Síntoma:</strong> Error de permisos al ejecutar Bearer CLI.
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-medium text-orange-800">Solución:</h4>
                      <CodeBlock
                        code={`# 1. Verificar permisos del ejecutable
ls -la /usr/local/bin/bearer
chmod +x /usr/local/bin/bearer

# 2. Si está en ~/.bearer/bin
chmod +x ~/.bearer/bin/bearer

# 3. Ejecutar con sudo si es necesario (no recomendado)
sudo bearer scan .`}
                        title="Corrección de Permisos"
                      />
                    </div>
                  </div>

                  {/* Update issues */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                      🔄 Error: "Cannot update Bearer CLI"
                    </h3>
                    <p className="text-yellow-700 mb-4">
                      <strong>Síntoma:</strong> Problemas al actualizar Bearer CLI a la última versión.
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-medium text-yellow-800">Solución:</h4>
                      <CodeBlock
                        code={`# 1. Verificar versión actual
bearer --version

# 2. Actualizar usando el script de instalación
curl -fsSL https://bearer.com/install.sh | sh

# 3. O actualizar usando apt (si se instaló así)
sudo apt update
sudo apt upgrade bearer`}
                        title="Actualización de Bearer CLI"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "docker" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    🐳 Problemas con Docker
                  </h2>
                  
                  <p className="text-gray-700">
                    Errores comunes al usar Bearer CLI con Docker.
                  </p>

                  {/* Docker not running */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-3">
                      ❌ Error: "Cannot connect to Docker daemon"
                    </h3>
                    <p className="text-red-700 mb-4">
                      <strong>Síntoma:</strong> Docker no está ejecutándose o no está disponible.
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-medium text-red-800">Solución:</h4>
                      <CodeBlock
                        code={`# 1. Verificar estado de Docker
docker --version
docker ps

# 2. Iniciar Docker Desktop (Windows/Mac)
# O iniciar servicio Docker (Linux)
sudo systemctl start docker

# 3. Verificar que Docker esté corriendo
docker run hello-world`}
                        title="Inicio de Docker"
                      />
                    </div>
                  </div>

                  {/* Volume mounting issues */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-orange-800 mb-3">
                      ⚠️ Error: "Volume mount failed"
                    </h3>
                    <p className="text-orange-700 mb-4">
                      <strong>Síntoma:</strong> Error al montar volúmenes en Docker.
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-medium text-orange-800">Solución:</h4>
                      <CodeBlock
                        code={`# 1. Usar ruta absoluta
docker run --rm -v "$(pwd):/tmp/scan" bearer/bearer:latest scan /tmp/scan

# 2. En Windows, usar ruta de Windows
docker run --rm -v "C:\\path\\to\\project:/tmp/scan" bearer/bearer:latest scan /tmp/scan

# 3. Verificar permisos del directorio
ls -la .`}
                        title="Corrección de Volúmenes"
                      />
                    </div>
                  </div>

                  {/* Image not found */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                      🔍 Error: "Image not found"
                    </h3>
                    <p className="text-yellow-700 mb-4">
                      <strong>Síntoma:</strong> Docker no puede encontrar la imagen de Bearer CLI.
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-medium text-yellow-800">Solución:</h4>
                      <CodeBlock
                        code={`# 1. Descargar la imagen
docker pull bearer/bearer:latest

# 2. Verificar imágenes disponibles
docker images | grep bearer

# 3. Usar tag específico si es necesario
docker run --rm bearer/bearer:1.51.0 --version`}
                        title="Descarga de Imagen"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "scanning" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    🔍 Problemas de Escaneo
                  </h2>
                  
                  <p className="text-gray-700">
                    Errores comunes durante el proceso de escaneo de código.
                  </p>

                  {/* No findings */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">
                      ℹ️ "No findings detected"
                    </h3>
                    <p className="text-blue-700 mb-4">
                      <strong>Síntoma:</strong> Bearer CLI no encuentra vulnerabilidades en el código.
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-medium text-blue-800">Posibles Causas:</h4>
                      <ul className="text-blue-700 list-disc list-inside space-y-1">
                        <li>El código realmente no tiene vulnerabilidades</li>
                        <li>Los archivos están siendo excluidos por configuración</li>
                        <li>El directorio no contiene código compatible</li>
                        <li>Las reglas están deshabilitadas</li>
                      </ul>
                      <CodeBlock
                        code={`# Verificar configuración
bearer config

# Listar reglas disponibles
bearer scan . --list-rules

# Escanear con verbose para debug
bearer scan . --verbose`}
                        title="Diagnóstico"
                      />
                    </div>
                  </div>

                  {/* Out of memory */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-3">
                      ❌ Error: "Out of memory"
                    </h3>
                    <p className="text-red-700 mb-4">
                      <strong>Síntoma:</strong> Bearer CLI se queda sin memoria durante el escaneo.
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-medium text-red-800">Solución:</h4>
                      <CodeBlock
                        code={`# 1. Reducir scope del escaneo
bearer scan . --skip-path "node_modules,dist,build"

# 2. Escanear directorios específicos
bearer scan src/ --format html --output report.html

# 3. Usar configuración minimal
bearer scan . --config bearer-minimal.yml`}
                        title="Optimización de Memoria"
                      />
                    </div>
                  </div>

                  {/* Timeout errors */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-orange-800 mb-3">
                      ⏱️ Error: "Scan timeout"
                    </h3>
                    <p className="text-orange-700 mb-4">
                      <strong>Síntoma:</strong> El escaneo se detiene por timeout.
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-medium text-orange-800">Solución:</h4>
                      <CodeBlock
                        code={`# 1. Aumentar timeout
export BEARER_TIMEOUT="600s"
bearer scan . --format html --output report.html

# 2. Escanear en lotes más pequeños
bearer scan src/ --format html --output src-report.html
bearer scan tests/ --format html --output tests-report.html`}
                        title="Configuración de Timeout"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Help Section */}
              <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl p-8 text-white text-center">
                <h3 className="text-xl font-bold mb-4">
                  ¿No encuentras la solución a tu problema?
                </h3>
                <p className="text-blue-100 mb-6">
                  Consulta la documentación oficial o contacta con la comunidad.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://docs.bearer.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    📚 Documentación Oficial
                  </a>
                  <a
                    href="https://discord.gg/eaHZBJUXRF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    💬 Comunidad Discord
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
