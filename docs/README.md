# Next.js + Bearer CLI SAST Lab

Un laboratorio interactivo para aprender análisis de seguridad estático (SAST) con Bearer CLI en aplicaciones Next.js.

## 📋 Tabla de Contenidos

- [Introducción](#introducción)
- [¿Qué es Bearer CLI?](#qué-es-bearer-cli)
- [Características del Proyecto](#características-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Uso del Laboratorio](#uso-del-laboratorio)
- [Comandos Disponibles](#comandos-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Troubleshooting](#troubleshooting)
- [Recursos Adicionales](#recursos-adicionales)

## 🚀 Introducción

Este proyecto es un laboratorio práctico diseñado para desarrolladores intermedios que quieren aprender sobre análisis de seguridad estático (SAST) usando Bearer CLI. Combina una interfaz web moderna con herramientas de línea de comandos para proporcionar una experiencia de aprendizaje completa.

## 🔍 ¿Qué es Bearer CLI?

Bearer CLI es una herramienta de análisis de seguridad estático (SAST) que:

- **Detecta vulnerabilidades de seguridad** en el código fuente
- **Identifica secretos y credenciales** expuestas
- **Analiza patrones de OWASP** y CWE (Common Weakness Enumeration)
- **Genera reportes** en múltiples formatos (HTML, JSON, YAML, SARIF)
- **Se integra fácilmente** con CI/CD y GitHub Actions

### ¿Por qué usar Bearer CLI?

1. **Fácil de usar**: Comando simple con configuración mínima
2. **Múltiples lenguajes**: Soporta JavaScript, TypeScript, Python, Ruby, Java, Go, PHP
3. **Reportes detallados**: Visualizaciones claras de vulnerabilidades
4. **Integración CI/CD**: Funciona perfectamente en pipelines automatizados
5. **Open Source**: Completamente gratuito y de código abierto

## ✨ Características del Proyecto

### 🎯 Interfaz Web Interactiva
- **Escaneo en tiempo real** de repositorios públicos
- **Visualización de reportes** HTML embebidos
- **Tutorial interactivo** paso a paso
- **Interfaz moderna** y responsive

### 🛠️ Herramientas de Línea de Comandos
- **Scripts automatizados** para escaneo local
- **Generación de reportes** iniciales del proyecto
- **Integración con WSL** para entornos Windows

### 📊 Reportes Detallados
- **Análisis de seguridad** completo
- **Detección de secretos** y credenciales
- **Clasificación por severidad** (Critical, High, Medium, Low, Warning)
- **Recomendaciones de remediación**

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js 18+**
- **Git**
- **Bearer CLI** instalado en WSL Ubuntu
- **WSL** (para usuarios de Windows)

### Instalación de Bearer CLI

```bash
# En WSL Ubuntu
curl -fsSL https://bearer.com/install.sh | sh

# Verificar instalación
bearer --version
```

### Configuración del Proyecto

```bash
# Clonar y configurar
git clone <tu-repo>
cd next-bearer-sast-lab

# Instalar dependencias
npm install

# Generar reporte inicial
npm run scan:init

# Iniciar servidor de desarrollo
npm run dev
```

## 🎮 Uso del Laboratorio

### Interfaz Web

1. **Accede a** `http://localhost:3000`
2. **Explora el tutorial** interactivo
3. **Escanea repositorios** públicos
4. **Visualiza reportes** de seguridad

### Línea de Comandos

```bash
# Escanear un repositorio específico
npm run scan:example

# O usar directamente
node scripts/scan-repo.mjs https://github.com/owner/repo branch-name

# Generar reporte del proyecto actual
npm run scan:init
```

## 📝 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run start` | Inicia el servidor de producción |
| `npm run scan:init` | Genera reporte inicial del proyecto |
| `npm run scan:example` | Escanea el repositorio de ejemplo |

## 📁 Estructura del Proyecto

```
next-bearer-sast-lab/
├── app/                    # Aplicación Next.js
│   ├── api/scan/          # API endpoint para escaneo
│   ├── page.tsx           # Página principal
│   └── layout.tsx         # Layout de la aplicación
├── docs/                  # Documentación
│   ├── README.md          # Este archivo
│   ├── bearer-guide.md    # Guía completa de Bearer CLI
│   └── tutorial.md        # Tutorial paso a paso
├── public/
│   └── reports/           # Reportes generados
├── scripts/               # Scripts de automatización
│   ├── scan-repo.mjs      # Escaneo de repositorios
│   └── generate-initial-report.mjs
├── .github/workflows/     # GitHub Actions
└── bearer.yml            # Configuración de Bearer
```

## 🔧 Troubleshooting

### Problemas Comunes

#### Error: "bearer command not found"
```bash
# Verificar instalación en WSL
wsl bash -c "which bearer"
wsl bash -c "bearer --version"
```

#### Error: "Command failed" en escaneo
- Bearer CLI puede salir con código 1 incluso cuando el escaneo es exitoso
- El proyecto maneja esto automáticamente
- Verifica que el reporte se generó en `public/reports/`

#### Problemas de permisos en WSL
```bash
# Asegurar permisos correctos
wsl bash -c "chmod +x /usr/bin/bearer"
```

### Logs y Debugging

```bash
# Ver logs detallados
DEBUG=1 node scripts/scan-repo.mjs <repo-url>

# Verificar archivos generados
ls -la public/reports/
```

## 📚 Recursos Adicionales

### Documentación Oficial
- [Bearer CLI Documentation](https://docs.bearer.com/)
- [Commands Reference](https://docs.bearer.com/reference/commands/)
- [Configuration Guide](https://docs.bearer.com/reference/config/)

### OWASP y Seguridad
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Database](https://cwe.mitre.org/)
- [SAST Tools Comparison](https://owasp.org/www-community/Source_Code_Analysis_Tools)

### Integración CI/CD
- [GitHub Actions](https://docs.bearer.com/guides/github-action/)
- [GitLab CI](https://docs.bearer.com/guides/gitlab-ci/)
- [Jenkins Integration](https://docs.bearer.com/guides/jenkins/)

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Bearer Security](https://bearer.com/) por la excelente herramienta
- [OWASP](https://owasp.org/) por los estándares de seguridad
- Comunidad de desarrolladores por el feedback y contribuciones
