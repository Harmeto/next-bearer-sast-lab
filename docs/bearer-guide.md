# Guía Completa de Bearer CLI

Una guía detallada para desarrolladores intermedios sobre cómo usar Bearer CLI para análisis de seguridad estático.

## 📖 Tabla de Contenidos

- [Conceptos Fundamentales](#conceptos-fundamentales)
- [Instalación y Configuración](#instalación-y-configuración)
- [Comandos Básicos](#comandos-básicos)
- [Configuración Avanzada](#configuración-avanzada)
- [Tipos de Análisis](#tipos-de-análisis)
- [Formatos de Reporte](#formatos-de-reporte)
- [Integración CI/CD](#integración-cicd)
- [Mejores Prácticas](#mejores-prácticas)
- [Casos de Uso Comunes](#casos-de-uso-comunes)

## 🎯 Conceptos Fundamentales

### ¿Qué es SAST?

**Static Application Security Testing (SAST)** es una metodología de testing de seguridad que analiza el código fuente, bytecode o binarios de una aplicación para identificar vulnerabilidades sin ejecutar el programa.

### Ventajas del SAST

- ✅ **Detección temprana** de vulnerabilidades
- ✅ **Análisis completo** del código fuente
- ✅ **No requiere ejecución** de la aplicación
- ✅ **Integración fácil** en pipelines CI/CD
- ✅ **Escalabilidad** para proyectos grandes

### ¿Por qué Bearer CLI?

| Característica | Bearer CLI | Otras Herramientas |
|----------------|------------|-------------------|
| **Facilidad de uso** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Soporte multi-lenguaje** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Reportes visuales** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Integración CI/CD** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Open Source** | ✅ | ❌/✅ |

## 🚀 Instalación y Configuración

### Método 1: Script de Instalación Automática (Recomendado)

**Para Linux y macOS:**
```bash
# Instalación automática
curl -fsSL https://bearer.com/install.sh | sh

# Verificar instalación
bearer --version

# Configurar PATH si es necesario
echo 'export PATH="$HOME/.bearer/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

**Para Windows (WSL):**
```bash
# Desde WSL Ubuntu
curl -fsSL https://bearer.com/install.sh | sh

# Verificar instalación
bearer --version
```

### Método 2: Docker (Multiplataforma)

**Imagen oficial de Bearer:**
```bash
# Escanear un directorio local
docker run --rm -v "$(pwd):/tmp/scan" bearer/bearer:latest scan /tmp/scan --format html --output /tmp/scan/bearer-report.html

# Escanear con configuración personalizada
docker run --rm -v "$(pwd):/tmp/scan" -v "$(pwd)/bearer.yml:/tmp/scan/bearer.yml" bearer/bearer:latest scan /tmp/scan --config-file /tmp/scan/bearer.yml

# Escanear con diferentes scanners
docker run --rm -v "$(pwd):/tmp/scan" bearer/bearer:latest scan /tmp/scan --scanner sast,secrets --format html --output /tmp/scan/security-report.html
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  bearer-scan:
    image: bearer/bearer:latest
    volumes:
      - .:/tmp/scan
    command: scan /tmp/scan --format html --output /tmp/scan/bearer-report.html
```

**Script de Docker para Windows:**
```powershell
# Crear script bearer-docker.ps1
$projectPath = (Get-Location).Path
$wslPath = $projectPath -replace 'C:', '/mnt/c'
docker run --rm -v "${projectPath}:/tmp/scan" bearer/bearer:latest scan /tmp/scan --format html --output /tmp/scan/bearer-report.html
```

### Método 3: Descarga Manual

**Linux:**
```bash
# Descargar la última versión
wget https://github.com/bearer/bearer/releases/latest/download/bearer_linux_amd64.tar.gz

# Extraer
tar -xzf bearer_linux_amd64.tar.gz

# Mover a PATH
sudo mv bearer /usr/local/bin/
chmod +x /usr/local/bin/bearer
```

**macOS:**
```bash
# Descargar
curl -L https://github.com/bearer/bearer/releases/latest/download/bearer_darwin_amd64.tar.gz -o bearer.tar.gz

# Extraer
tar -xzf bearer.tar.gz

# Mover a PATH
sudo mv bearer /usr/local/bin/
```

**Windows:**
```powershell
# Descargar desde PowerShell
Invoke-WebRequest -Uri "https://github.com/bearer/bearer/releases/latest/download/bearer_windows_amd64.zip" -OutFile "bearer.zip"

# Extraer
Expand-Archive -Path bearer.zip -DestinationPath .

# Agregar al PATH (temporal)
$env:PATH += ";$PWD"
```

### Método 4: Homebrew (macOS)

```bash
brew install bearer/tap/bearer
```

### Método 5: Go Install

```bash
go install github.com/bearer/bearer@latest
```

### Método 6: NPM (Node.js)

```bash
npm install -g @bearer/bearer
```

### Verificación de Instalación

```bash
# Verificar versión
bearer --version

# Ver ayuda
bearer --help

# Verificar configuración
bearer config

# Verificar reglas disponibles
bearer scan --list-rules
```

**Salida esperada:**
```
Bearer CLI v1.51.0
```

## 🛠️ Comandos Básicos

### Estructura General

```bash
bearer [comando] [opciones] [directorio]
```

### Comando de Escaneo

```bash
# Escaneo básico
bearer scan /ruta/al/proyecto

# Escaneo con formato específico
bearer scan /ruta/al/proyecto --format html

# Escaneo con reporte de seguridad
bearer scan /ruta/al/proyecto --report security

# Escaneo con scanners específicos
bearer scan /ruta/al/proyecto --scanner sast,secrets
```

### Opciones de Severidad

```bash
# Solo vulnerabilidades críticas y altas
bearer scan /ruta/al/proyecto --severity critical,high

# Todas las severidades
bearer scan /ruta/al/proyecto --severity critical,high,medium,low,warning
```

### Opciones de Salida

```bash
# Especificar archivo de salida
bearer scan /ruta/al/proyecto --output reporte.html

# Múltiples formatos
bearer scan /ruta/al/proyecto --format html,json --output reporte

# Salida a directorio
bearer scan /ruta/al/proyecto --output /ruta/salida/
```

## ⚙️ Configuración Avanzada

### Archivo bearer.yml

```yaml
# bearer.yml
report:
  format: html
  output: "reports/security-report.html"
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
    - "*.test.js"
    - "*.spec.js"

rules:
  - id: "javascript_express_cookies_secure"
    severity: "warning"
    enabled: true
  - id: "javascript_express_cookies_httponly"
    severity: "high"
    enabled: true
```

### Configuración por Lenguaje

```yaml
# Para proyectos JavaScript/TypeScript
scan:
  languages:
    - javascript
    - typescript
  scanner:
    - sast
    - secrets

# Para proyectos Python
scan:
  languages:
    - python
  scanner:
    - sast
    - secrets
```

### Variables de Entorno

```bash
# Configurar API key (si es necesario)
export BEARER_API_KEY="tu-api-key"

# Configurar timeout
export BEARER_TIMEOUT="300s"

# Configurar verbose mode
export BEARER_VERBOSE="true"
```

## 🔍 Tipos de Análisis

### SAST (Static Application Security Testing)

```bash
# Análisis SAST completo
bearer scan /proyecto --scanner sast

# SAST con reglas específicas
bearer scan /proyecto --scanner sast --only-rule javascript_express_cookies_secure
```

**Detecta:**
- Vulnerabilidades OWASP Top 10
- Inyecciones SQL, XSS, CSRF
- Problemas de autenticación y autorización
- Configuraciones inseguras

### Detección de Secretos

```bash
# Detección de secretos
bearer scan /proyecto --scanner secrets

# Secretos con patrones personalizados
bearer scan /proyecto --scanner secrets --only-rule secrets_aws_access_key
```

**Detecta:**
- API Keys y tokens
- Credenciales de base de datos
- Certificados y claves privadas
- Variables de entorno sensibles

### Análisis de Dependencias

```bash
# Análisis de dependencias vulnerables
bearer scan /proyecto --scanner dependencies

# Con base de datos específica
bearer scan /proyecto --scanner dependencies --db github
```

## 📊 Formatos de Reporte

### HTML (Recomendado para visualización)

```bash
bearer scan /proyecto --format html --output reporte.html
```

**Características:**
- Interfaz visual atractiva
- Navegación fácil entre vulnerabilidades
- Filtros por severidad y tipo
- Enlaces a documentación de remediación

### JSON (Para integración programática)

```bash
bearer scan /proyecto --format json --output reporte.json
```

**Estructura:**
```json
{
  "meta": {
    "bearer_version": "1.51.0",
    "scan_started_at": "2025-09-21T11:00:00Z"
  },
  "findings": [
    {
      "id": "javascript_express_cookies_secure",
      "severity": "warning",
      "message": "Cookie without secure flag",
      "file": "src/app.js",
      "line": 15
    }
  ]
}
```

### SARIF (Para GitHub Security)

```bash
bearer scan /proyecto --format sarif --output reporte.sarif
```

**Ventajas:**
- Integración nativa con GitHub Security
- Estándar OASIS
- Compatible con múltiples herramientas

### YAML (Para configuración)

```bash
bearer scan /proyecto --format yaml --output reporte.yaml
```

## 🔄 Integración CI/CD

### GitHub Actions

```yaml
# .github/workflows/security.yml
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
          sarif_file: security-report.sarif
```

### GitLab CI

```yaml
# .gitlab-ci.yml
security_scan:
  stage: test
  image: bearer/bearer:latest
  script:
    - bearer scan . --format sarif --output security-report.sarif
  artifacts:
    reports:
      sarif: security-report.sarif
```

### Jenkins Pipeline

```groovy
pipeline {
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
}
```

## 🎯 Mejores Prácticas

### 1. Configuración del Proyecto

```yaml
# bearer.yml - Configuración recomendada
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
    - "*.mock.*"
```

### 2. Integración en Workflow

```bash
# Pre-commit hook
#!/bin/bash
bearer scan . --format json --output .bearer/scan.json
if [ $? -ne 0 ]; then
    echo "Security issues found. Please review the report."
    exit 1
fi
```

### 3. Monitoreo Continuo

```bash
# Script de monitoreo diario
#!/bin/bash
DATE=$(date +%Y%m%d)
bearer scan . --format html --output "reports/security-${DATE}.html"

# Enviar notificación si hay vulnerabilidades críticas
CRITICAL_COUNT=$(bearer scan . --format json | jq '.findings[] | select(.severity == "critical") | .id' | wc -l)
if [ $CRITICAL_COUNT -gt 0 ]; then
    echo "ALERT: $CRITICAL_COUNT critical vulnerabilities found!"
fi
```

### 4. Exclusión de Archivos

```yaml
# Excluir archivos específicos
scan:
  skip-path:
    - "**/node_modules/**"
    - "**/dist/**"
    - "**/build/**"
    - "**/*.test.js"
    - "**/*.spec.js"
    - "**/coverage/**"
    - "**/vendor/**"
    - "**/third-party/**"
```

## 🚀 Casos de Uso Comunes

### 1. Auditoría de Código Legacy

```bash
# Escaneo completo de proyecto legacy
bearer scan /proyecto-legacy \
  --format html \
  --output reports/legacy-audit.html \
  --severity critical,high \
  --scanner sast,secrets
```

### 2. Validación Pre-Deploy

```bash
# Script de validación
#!/bin/bash
echo "Running security validation..."

bearer scan . --format json --output .bearer/scan.json

# Verificar vulnerabilidades críticas
CRITICAL=$(jq '.findings[] | select(.severity == "critical") | .id' .bearer/scan.json | wc -l)

if [ $CRITICAL -gt 0 ]; then
    echo "❌ Deploy blocked: $CRITICAL critical vulnerabilities found"
    exit 1
else
    echo "✅ Security validation passed"
fi
```

### 3. Análisis de Dependencias

```bash
# Análisis de dependencias vulnerables
bearer scan . --scanner dependencies --format json --output deps-scan.json

# Filtrar solo vulnerabilidades altas y críticas
jq '.findings[] | select(.severity == "critical" or .severity == "high")' deps-scan.json
```

### 4. Reporte para Stakeholders

```bash
# Generar reporte ejecutivo
bearer scan . \
  --format html \
  --output reports/executive-summary.html \
  --severity critical,high \
  --report security
```

## 🔧 Troubleshooting

### Problemas Comunes

#### Error: "No findings detected"
```bash
# Verificar configuración
bearer config

# Verificar archivos incluidos
bearer scan . --debug

# Verificar reglas habilitadas
bearer scan . --list-rules
```

#### Error: "Permission denied"
```bash
# Verificar permisos
ls -la /usr/local/bin/bearer
chmod +x /usr/local/bin/bearer

# Ejecutar con sudo si es necesario
sudo bearer scan /proyecto
```

#### Error: "Out of memory"
```bash
# Reducir scope del escaneo
bearer scan . --skip-path "node_modules,dist,build"

# Usar configuración específica
bearer scan . --config bearer-minimal.yml
```

### Debugging

```bash
# Modo verbose
bearer scan . --verbose

# Debug completo
BEARER_DEBUG=1 bearer scan .

# Verificar configuración
bearer config --show
```

## 📚 Recursos Adicionales

### Documentación Oficial
- [Bearer CLI Docs](https://docs.bearer.com/)
- [Commands Reference](https://docs.bearer.com/reference/commands/)
- [Configuration Guide](https://docs.bearer.com/reference/config/)

### Comunidad
- [GitHub Repository](https://github.com/bearer/bearer)
- [Discord Community](https://discord.gg/eaHZBJUXRF)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/bearer)

### Tutoriales
- [Getting Started](https://docs.bearer.com/guides/getting-started/)
- [CI/CD Integration](https://docs.bearer.com/guides/github-action/)
- [Custom Rules](https://docs.bearer.com/guides/custom-rules/)

---

**¿Necesitas ayuda?** Consulta la [documentación oficial](https://docs.bearer.com/) o únete a la [comunidad de Discord](https://discord.gg/eaHZBJUXRF).
