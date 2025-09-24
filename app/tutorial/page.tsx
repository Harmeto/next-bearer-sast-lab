"use client";

import { useState } from "react";
import Link from "next/link";
import TutorialStep from "../components/TutorialStep";
import CodeBlock from "../components/CodeBlock";

export default function TutorialPage() {
  const [activeStep, setActiveStep] = useState(1);

  const tutorialSteps = [
    {
      id: 1,
      title: "Instalación",
      description: "Configura Bearer CLI en tu sistema",
      icon: "🚀"
    },
    {
      id: 2,
      title: "Configuración",
      description: "Personaliza el comportamiento del escaneo",
      icon: "⚙️"
    },
    {
      id: 3,
      title: "Ejecución",
      description: "Ejecuta escaneos de seguridad",
      icon: "🔍"
    },
    {
      id: 4,
      title: "Interpretación",
      description: "Analiza y actúa sobre los resultados",
      icon: "📊"
    },
    {
      id: 5,
      title: "CI/CD",
      description: "Integra en tu pipeline de desarrollo",
      icon: "🔄"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎓 Tutorial de Bearer CLI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprende a usar Bearer CLI paso a paso. Desde la instalación hasta la integración en CI/CD.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contenido del Tutorial
              </h3>
              <nav className="space-y-2">
                {tutorialSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeStep === step.id
                        ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{step.icon}</span>
                      <div>
                        <div className="font-medium">{step.title}</div>
                        <div className="text-sm text-gray-500">{step.description}</div>
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
              {activeStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    🚀 Instalación de Bearer CLI
                  </h2>
                  
                  <p className="text-gray-700">
                    Bearer CLI se puede instalar de múltiples formas. Elige el método que mejor se adapte a tu entorno.
                  </p>
                  
                  {/* Método 1: Script Automático */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">🚀 Método 1: Script Automático (Recomendado)</h4>
                    <CodeBlock
                      code="curl -fsSL https://bearer.com/install.sh | sh"
                      title="Linux/macOS/WSL"
                    />
                    <p className="text-sm text-green-700 mt-2">
                      Funciona en Linux, macOS y Windows (via WSL Ubuntu)
                    </p>
                  </div>

                  {/* Método 2: Docker */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">🐳 Método 2: Docker (Multiplataforma)</h4>
                    <CodeBlock
                      code={`# Escanear con Docker
docker run --rm -v "$(pwd):/tmp/scan" bearer/bearer:latest scan /tmp/scan --format html --output /tmp/scan/bearer-report.html`}
                      title="Docker"
                    />
                    <p className="text-sm text-blue-700 mt-2">
                      No requiere instalación local, funciona en cualquier sistema con Docker
                    </p>
                  </div>

                  {/* Método 3: Descarga Manual */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">📦 Método 3: Descarga Manual</h4>
                    <CodeBlock
                      code={`# Linux
wget https://github.com/bearer/bearer/releases/latest/download/bearer_linux_amd64.tar.gz
tar -xzf bearer_linux_amd64.tar.gz
sudo mv bearer /usr/local/bin/

# macOS
curl -L https://github.com/bearer/bearer/releases/latest/download/bearer_darwin_amd64.tar.gz -o bearer.tar.gz
tar -xzf bearer.tar.gz
sudo mv bearer /usr/local/bin/`}
                      title="Descarga Manual"
                    />
                  </div>

                  {/* Verificación */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">✅ Verificar Instalación</h4>
                    <CodeBlock
                      code="bearer --version"
                      title="Verificar"
                    />
                    <p className="text-sm text-gray-700 mt-2">
                      Deberías ver: <code className="bg-gray-200 px-1 rounded">Bearer CLI v1.51.0</code>
                    </p>
                  </div>

                  {/* Troubleshooting Link */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">🔧 ¿Problemas con la Instalación?</h4>
                    <p className="text-sm text-yellow-700 mb-3">
                      Si encuentras errores durante la instalación, especialmente en WSL, consulta nuestra guía de troubleshooting.
                    </p>
                    <a
                      href="/troubleshooting"
                      className="inline-flex items-center text-sm font-medium text-yellow-800 hover:text-yellow-900"
                    >
                      Ver Soluciones a Problemas Comunes →
                    </a>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    ⚙️ Configuración del Proyecto
                  </h2>
                  
                  <p className="text-gray-700">
                    Crea un archivo <code className="bg-gray-100 px-2 py-1 rounded">bearer.yml</code> en la raíz de tu proyecto 
                    para personalizar el comportamiento del escaneo.
                  </p>
                  
                  {/* Configuración Básica */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">📋 Configuración Básica</h4>
                    <CodeBlock
                      code={`# bearer.yml - Configuración básica
report:
  format: html
  output: "security-reports/"
  severity: "critical,high,medium,low,warning"

scan:
  scanner:
    - sast
    - secrets
  skip-path:
    - node_modules
    - .git
    - dist`}
                      title="bearer.yml básico"
                    />
                  </div>

                  {/* Configuración Avanzada */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">⚙️ Configuración Avanzada</h4>
                    <CodeBlock
                      code={`# bearer.yml - Configuración avanzada
report:
  format: html
  output: "security-reports/"
  report: security
  severity: "critical,high,medium,low,warning"

scan:
  scanner:
    - sast
    - secrets
  skip-path:
    - node_modules
    - .git
    - dist
    - build
    - coverage
    - "*.test.*"
    - "*.spec.*"

rules:
  - id: "javascript_express_cookies_secure"
    severity: "warning"
    enabled: true
  - id: "javascript_express_cookies_httponly"
    severity: "high"
    enabled: true`}
                      title="bearer.yml avanzado"
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>💡 Tip:</strong> El archivo <code>bearer.yml</code> es opcional. Si no existe, Bearer CLI usará configuraciones por defecto.
                    </p>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    🔍 Ejecución de Escaneos
                  </h2>
                  
                  <p className="text-gray-700">
                    Ejecuta Bearer CLI en tu proyecto para detectar vulnerabilidades de seguridad. Tienes múltiples opciones según tu entorno.
                  </p>
                  
                  {/* Escaneo Local */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">💻 Escaneo Local (Instalación Directa)</h4>
                    <CodeBlock
                      code={`# Escaneo básico
bearer scan . --format html --output security-report.html

# Escaneo con configuración personalizada
bearer scan . --config bearer.yml

# Escaneo con scanners específicos
bearer scan . --scanner sast,secrets --format html --output security-report.html`}
                      title="Comandos Locales"
                    />
                  </div>

                  {/* Escaneo con Docker */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">🐳 Escaneo con Docker</h4>
                    <CodeBlock
                      code={`# Escaneo básico con Docker
docker run --rm -v "$(pwd):/tmp/scan" bearer/bearer:latest scan /tmp/scan --format html --output /tmp/scan/security-report.html

# Escaneo con configuración personalizada
docker run --rm -v "$(pwd):/tmp/scan" -v "$(pwd)/bearer.yml:/tmp/scan/bearer.yml" bearer/bearer:latest scan /tmp/scan --config-file /tmp/scan/bearer.yml`}
                      title="Comandos Docker"
                    />
                  </div>

                  {/* Escaneo desde Windows */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">🪟 Escaneo desde Windows (WSL)</h4>
                    <CodeBlock
                      code={`# Desde WSL Ubuntu
wsl bash -c "bearer scan . --format html --output security-report.html"

# O ejecutar directamente en WSL
wsl
cd /mnt/c/ruta/a/tu/proyecto
bearer scan . --format html --output security-report.html`}
                      title="Comandos Windows/WSL"
                    />
                  </div>
                </div>
              )}

              {activeStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    📊 Interpretación de Resultados
                  </h2>
                  
                  <p className="text-gray-700">
                    Los reportes de Bearer CLI incluyen información detallada sobre cada vulnerabilidad. Aprende a interpretarlos correctamente.
                  </p>
                  
                  {/* Niveles de Severidad */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">🚨 Niveles de Severidad</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                        <span><strong>Critical:</strong> Vulnerabilidades críticas que requieren atención inmediata</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                        <span><strong>High:</strong> Vulnerabilidades importantes que deben solucionarse pronto</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span><strong>Medium:</strong> Vulnerabilidades moderadas que deben abordarse</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        <span><strong>Low:</strong> Vulnerabilidades menores que pueden esperar</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
                        <span><strong>Warning:</strong> Advertencias y mejores prácticas</span>
                      </div>
                    </div>
                  </div>

                  {/* Información del Reporte */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">📋 Información del Reporte</h4>
                    <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                      <li><strong>Ubicación:</strong> Archivo y línea exacta del problema</li>
                      <li><strong>Descripción:</strong> Explicación clara de la vulnerabilidad</li>
                      <li><strong>CWE:</strong> Common Weakness Enumeration ID</li>
                      <li><strong>OWASP:</strong> Categoría OWASP Top 10</li>
                      <li><strong>Remediación:</strong> Pasos específicos para solucionar el problema</li>
                      <li><strong>Ejemplo de código:</strong> Código vulnerable y código seguro</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    🔄 Integración CI/CD
                  </h2>
                  
                  <p className="text-gray-700">
                    Integra Bearer CLI en tu pipeline de CI/CD para automatizar el escaneo de seguridad en cada commit y pull request.
                  </p>
                  
                  {/* GitHub Actions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">🐙 GitHub Actions</h4>
                    <CodeBlock
                      code={`# .github/workflows/security.yml
name: Security Scan

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Run Bearer Security Scan
        uses: bearer/bearer-action@v2
        with:
          format: sarif
          output: security-report.sarif
          scanner: sast,secrets
          severity: critical,high,medium,low,warning
      
      - name: Upload SARIF
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: security-report.sarif`}
                      title="GitHub Actions"
                    />
                  </div>

                  {/* GitLab CI */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">🦊 GitLab CI</h4>
                    <CodeBlock
                      code={`# .gitlab-ci.yml
security_scan:
  stage: test
  image: bearer/bearer:latest
  script:
    - bearer scan . --format sarif --output security-report.sarif
  artifacts:
    reports:
      sarif: security-report.sarif`}
                      title="GitLab CI"
                    />
                  </div>

                  {/* Azure DevOps - Ejemplo Simple */}
                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                    <h4 className="font-semibold text-cyan-800 mb-2">☁️ Azure DevOps (Ejemplo Básico)</h4>
                    <p className="text-sm text-cyan-700 mb-3">
                      Ejemplo simple usando Docker para ejecutar Bearer CLI.
                    </p>
                    <CodeBlock
                      code={`# azure-pipelines.yml
trigger:
- main
- develop

pool:
  vmImage: 'ubuntu-latest'

stages:
- stage: Security
  displayName: 'Security Scan'
  jobs:
  - job: BearerScan
    displayName: 'Bearer Security Scan'
    steps:
    - task: DockerInstaller@0
      displayName: 'Install Docker'
      inputs:
        dockerVersion: '20.10.0'
    
    - script: |
        docker run --rm -v $(System.DefaultWorkingDirectory):/tmp/scan bearer/bearer:latest scan /tmp/scan --format sarif --output /tmp/scan/security-report.sarif
      displayName: 'Run Bearer Security Scan'
    
    - task: PublishBuildArtifacts@1
      displayName: 'Publish Security Report'
      inputs:
        pathToPublish: '$(System.DefaultWorkingDirectory)/security-report.sarif'
        artifactName: 'security-report'
        publishLocation: 'Container'`}
                      title="Azure DevOps (Docker)"
                    />
                  </div>

                  {/* Azure DevOps - Pipeline Completo */}
                  <div className="bg-cyan-100 border border-cyan-300 rounded-lg p-4">
                    <h4 className="font-semibold text-cyan-900 mb-2">🔧 Azure DevOps (Pipeline Avanzado)</h4>
                    <p className="text-sm text-cyan-800 mb-3">
                      Pipeline completo con instalación nativa de Bearer CLI, múltiples formatos de salida y gestión avanzada de resultados.
                    </p>
                    <CodeBlock
                      code={`# azure-pipelines.yml
# Docker
# Build a Docker image
# https://docs.microsoft.com/azure/devops/pipelines/languages/docker

trigger: none

resources:
  - repo: self

# Se definen variables, importante considerar las variables de entorno, ya que para los test unitarios se necesitaran
variables:
  tag: '$(Build.BuildId)'
  versionAPP: none # Esta variable se utilizara para rescatar la versión desde el package.json
  
stages:
  - stage: SecurityScan
    displayName: Security Analysis
    jobs:
      - job: BearerScan
        displayName: Bearer Security Scan
        pool:
          name: SAG
        steps:
          # Instalación de Bearer CLI
          - task: CmdLine@2
            displayName: 'Instalar Bearer CLI'
            inputs:
              script: |
                curl -sfL https://raw.githubusercontent.com/Bearer/bearer/main/contrib/install.sh | sh -s -- -b /usr/local/bin
                bearer version
          
          # Ejecutar análisis de seguridad con Bearer
          - task: CmdLine@2
            displayName: 'Ejecutar Bearer Security Scan'
            inputs:
              script: |
                bearer scan . \
                  --format sarif \
                  --output results.sarif \
                  --scanner sast,secrets \
                  --severity critical,high,medium,low,warning \
                  --skip-path node_modules,public,reports,.next,.git \
                  --exit-code 0
                
                # Generar también formato JUnit para Azure DevOps
                bearer scan . \
                  --format junit \
                  --output bearer-junit.xml \
                  --scanner sast,secrets \
                  --severity critical,high,medium,low,warning \
                  --skip-path node_modules,public,reports,.next,.git \
                  --exit-code 0
            continueOnError: true # Continúa aunque encuentre vulnerabilidades
          
          # Publicar resultados de Bearer como Test Results
          - task: PublishTestResults@2
            displayName: 'Publicar Resultados Bearer'
            condition: always()
            inputs:
              testResultsFormat: 'JUnit'
              testResultsFiles: 'bearer-junit.xml'
              testRunTitle: 'Bearer Security Analysis'
              failTaskOnFailedTests: false
          
          # Publicar resultados SARIF para la pestaña Scans (requiere SARIF SAST Scans Tab extension)
          - task: PublishBuildArtifacts@1
            displayName: 'Publicar SARIF para Scans Tab'
            condition: always()
            inputs:
              PathtoPublish: 'results.sarif'
              ArtifactName: 'CodeAnalysisLogs'
          
          # Copiar reportes a artifacts
          - task: CopyFiles@2
            displayName: 'Copiar Reportes Bearer'
            condition: always()
            inputs:
              SourceFolder: '$(System.DefaultWorkingDirectory)'
              Contents: |
                results.sarif
                bearer-junit.xml
              TargetFolder: '$(Build.ArtifactStagingDirectory)/security-reports'
          
          # Publicar artifacts con reportes de seguridad
          - task: PublishBuildArtifacts@1
            displayName: 'Publicar Reportes de Seguridad'
            condition: always()
            inputs:
              PathtoPublish: '$(Build.ArtifactStagingDirectory)/security-reports'
              ArtifactName: 'security-reports'

  - stage: Build
    displayName: Build image
    dependsOn: SecurityScan
    condition: succeeded('SecurityScan') # Solo ejecuta si el scan fue exitoso
    jobs:
      - job: Build
        displayName: Build
        pool:
          name: SAG
          #vmImage: ubuntu-latest
        steps:
          - task: CmdLine@2
            displayName: 'Limpieza de NPM'
            inputs:
              script: npm cache clean --force
            # Se copia el package.json a la carpeta de artifact para extraer la versión en etapas posteriores
            # Con esto se genera la autenticación al repo privado de Azure Devops en el archivo .npmrc
          - task: npmAuthenticate@0
            displayName: 'Autenticacion NPM privado'
            inputs:
              workingFile: '.npmrc'
          #  # Se instalan dependencias del proyecto
          #- task: Npm@1
          #  displayName: 'Instalar dependencias'
          #  inputs:
          #    command: 'install'
          #    workingDir: '$(System.DefaultWorkingDirectory)'
            # Se ejecutan los test unitarios
          # - task: Npm@1
          # displayName: 'Ejecutar pruebas'
          # inputs:
          # command: 'custom'
          # workingDir: '$(System.DefaultWorkingDirectory)'
          # customCommand: 'run test:ci'
          # customRegistry: 'useFeed'
          # customFeed: 'ef63d3aa-e246-4765-bb93-44cc968fdd41'
          # # Se ejecuta el coverage
          # - task: PublishTestResults@2
          # displayName: Publicar Pruebas
          # condition: succeededOrFailed()
          # inputs:
          # testResultsFormat: 'JUnit'
          # testResultsFiles: '$(System.DefaultWorkingDirectory)/junit.xml'
          # # Se publica el coverage
          # - task: PublishCodeCoverageResults@1
          # displayName: 'Publicar Cobertura'
          # inputs:
          # codeCoverageTool: 'Cobertura'
          # summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml'
          # # Se obtiene la versión desde el package.json y se setea en una variable
          - task: CmdLine@2
            displayName: 'Obtencion de version y seteo de variable'
            inputs:
              script: |
                npmVersionString=$(node -p "require('./package.json').version")
                echo $npmVersionString
                echo "##vso[task.setvariable variable=versionAPP]$npmVersionString"
            # Se copia el package.json a la carpeta de artifact para extraer la versión en etapas posteriores
          - task: CopyFiles@1
            displayName: 'Copiar package.json y deploy-openshift.yaml'
            inputs:
              SourceFolder: '$(Build.SourcesDirectory)'
              Contents: |
                package.json
                deploy-openshift.yaml
              TargetFolder: '$(Build.ArtifactStagingDirectory)'
            # Se genera la imagen y se sube al repositorio de Azure
          - task: Docker@2
            displayName: Construir la imagen y subirla a Azure
            inputs:
              containerRegistry: 'ACRMICSRV'
              repository: '$(Build.Repository.Name)'
              command: 'buildAndPush'
              Dockerfile: '**/Dockerfile'
              tags: '$(versionAPP)'
            # Se actualiza el BuildName con la versión del package.json
          - task: PowerShell@2
            displayName: 'Actualización BuildName'
            inputs:
              targetType: 'inline'
              script: |
                $BuildName = '$(Build.BuildNumber)'+'_v'+'$(versionAPP)'
                Write-Host "##vso[build.updatebuildnumber]$BuildName"
            # Se publica el artifact
          - task: PublishBuildArtifacts@1
            displayName: 'Publicar Artifact'
            inputs:
              PathtoPublish: '$(Build.ArtifactStagingDirectory)'
              ArtifactName: 'config'

          #- task: MicrosoftSecurityDevOps@1
          #  inputs:
          #    command: 'run'`}
                      title="Azure DevOps Pipeline Completo"
                    />
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                      <h5 className="font-semibold text-yellow-800 mb-2">⚠️ Requisitos para el Pipeline Avanzado</h5>
                      <div className="text-sm text-yellow-700 space-y-2">
                        <p>
                          <strong>Extensión SARIF SAST Scans Tab:</strong> Para visualizar los resultados SARIF en la pestaña
                          "Scans" de Azure DevOps, instala la extensión desde el
                          <a
                            href="https://marketplace.visualstudio.com/items?itemName=sariftools.scans"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Marketplace de Azure DevOps
                          </a>.
                        </p>
                        <p>
                          <strong>Configuración del Pool:</strong> Ajusta el nombre del pool (en el ejemplo: 'SAG') según tu configuración.
                        </p>
                        <p>
                          <strong>Configuración del Registro:</strong> Configura las credenciales del registro de contenedores (ACRMICSRV).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Jenkins */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">🔧 Jenkins Pipeline</h4>
                    <CodeBlock
                      code={`pipeline {
    agent any
    stages {
        stage('Security Scan') {
            steps {
                sh 'bearer scan . --format html --output security-report.html'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: '.',
                    reportFiles: 'security-report.html',
                    reportName: 'Security Report'
                ])
            }
        }
    }
}`}
                      title="Jenkins Pipeline"
                    />
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                  disabled={activeStep === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Anterior
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(5, activeStep + 1))}
                  disabled={activeStep === 5}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
