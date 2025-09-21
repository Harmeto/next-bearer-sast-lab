# Ejemplos de Vulnerabilidades para Testing

Este directorio contiene archivos con vulnerabilidades intencionales para demostrar las capacidades de detección de Bearer CLI.

## ⚠️ ADVERTENCIA

**ESTOS ARCHIVOS CONTIENEN VULNERABILIDADES INTENCIONALES**
**NO USAR EN PRODUCCIÓN**

## Tipos de Vulnerabilidades Incluidas

### 🔴 Críticas (2)
- **Command Injection** - `api/scan-repo.js:25`
- **OS Command Injection** - `api/scan-repo.js:25`

### 🟠 Altas (4)
- **Hardcoded Passwords** - `examples/high-vulnerability.js`
- **Hardcoded API Keys** - `examples/config-vulnerabilities.js`
- **Hardcoded JWT Secrets** - `examples/config-vulnerabilities.js`
- **Insecure Password Hashing** - `examples/config-vulnerabilities.js`

### 🟡 Medias (3)
- **SQL Injection** - `examples/medium-vulnerability.js`
- **SQL Injection** - `examples/config-vulnerabilities.js`
- **Command Injection** - `examples/config-vulnerabilities.js`

### 🟢 Warnings (8)
- **Information Leakage in Logs** - `examples/warning-vulnerability.js`
- **Information Leakage in Logs** - `examples/config-vulnerabilities.js`
- **Excessive Logging** - `examples/config-vulnerabilities.js`
- **Sensitive Data in Headers** - `examples/config-vulnerabilities.js`
- **System Information Exposure** - `examples/config-vulnerabilities.js`

## Archivos de Ejemplo

### `high-vulnerability.js`
Contiene contraseñas y secretos hardcodeados:
- Contraseñas de base de datos
- API keys
- JWT secrets

### `medium-vulnerability.js`
Contiene vulnerabilidades de inyección SQL:
- Construcción insegura de queries
- Parámetros no sanitizados
- Queries dinámicas vulnerables

### `warning-vulnerability.js`
Contiene problemas de logging:
- Logging de información sensible
- Exposición de datos personales
- Logging excesivo de errores

### `config-vulnerabilities.js`
Contiene múltiples tipos de vulnerabilidades:
- Secretos hardcodeados
- SQL injection
- Command injection
- Logging inseguro
- Validación insuficiente

## Cómo Usar

Estos archivos son escaneados automáticamente por Bearer CLI durante el proceso de despliegue. Los resultados aparecen en el reporte de seguridad generado.

## Detección Esperada

Bearer CLI debería detectar:
- **2 vulnerabilidades críticas** (command injection)
- **4 vulnerabilidades altas** (hardcoded secrets)
- **3 vulnerabilidades medias** (SQL injection)
- **8 vulnerabilidades de warning** (information leakage)

Total: **17 vulnerabilidades** para demostrar las capacidades del scanner.
