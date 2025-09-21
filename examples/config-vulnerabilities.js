// Archivo de configuración con múltiples vulnerabilidades
// Este archivo contiene varios tipos de vulnerabilidades para testing

const crypto = require('crypto');

// VULNERABILIDAD ALTA: Múltiples secretos hardcodeados
const CONFIG = {
  // Secretos de base de datos
  DATABASE_PASSWORD: "root123456",
  DATABASE_USER: "admin",
  DATABASE_URL: "postgresql://admin:root123456@localhost:5432/myapp",
  
  // API Keys hardcodeadas
  STRIPE_SECRET_KEY: "sk_live_1234567890abcdef",
  AWS_SECRET_ACCESS_KEY: "AKIAIOSFODNN7EXAMPLE",
  GITHUB_TOKEN: "ghp_1234567890abcdef",
  
  // JWT y encriptación
  JWT_SECRET: "my-super-secret-jwt-key-2024",
  ENCRYPTION_KEY: "aes-256-cbc-key-here-12345",
  SESSION_SECRET: "express-session-secret-key",
  
  // Configuración de email
  SMTP_PASSWORD: "email-password-123",
  EMAIL_API_KEY: "sendgrid-api-key-here",
  
  // Configuración de Redis
  REDIS_PASSWORD: "redis-password-123",
  REDIS_URL: "redis://:redis-password-123@localhost:6379"
};

// VULNERABILIDAD MEDIA: Función con SQL injection
function buildUserQuery(filters) {
  let query = "SELECT * FROM users WHERE 1=1";
  
  if (filters.name) {
    query += ` AND name = '${filters.name}'`;
  }
  
  if (filters.email) {
    query += ` AND email = '${filters.email}'`;
  }
  
  if (filters.role) {
    query += ` AND role = '${filters.role}'`;
  }
  
  if (filters.status) {
    query += ` AND status = '${filters.status}'`;
  }
  
  return query;
}

// VULNERABILIDAD MEDIA: Command injection
function executeSystemCommand(command) {
  const { exec } = require('child_process');
  
  // Ejecución insegura de comandos del sistema
  exec(`ls -la ${command}`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error ejecutando comando:', error);
      return;
    }
    console.log('Resultado:', stdout);
  });
}

// VULNERABILIDAD WARNING: Logging excesivo
function logSensitiveData(data) {
  console.log('=== INFORMACIÓN SENSIBLE ===');
  console.log('Datos completos:', JSON.stringify(data, null, 2));
  console.log('Contraseñas encontradas:', data.passwords);
  console.log('Tokens de acceso:', data.tokens);
  console.log('Información personal:', data.personalInfo);
  console.log('============================');
}

// VULNERABILIDAD WARNING: Información en headers HTTP
function setResponseHeaders(res, userData) {
  res.setHeader('X-User-ID', userData.id);
  res.setHeader('X-User-Email', userData.email);
  res.setHeader('X-User-Role', userData.role);
  res.setHeader('X-Session-ID', userData.sessionId);
  res.setHeader('X-API-Key', CONFIG.API_KEY);
}

// Función que expone información del sistema
function getSystemInfo() {
  const systemInfo = {
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    memoryUsage: process.memoryUsage(),
    uptime: process.uptime(),
    env: process.env,
    cwd: process.cwd(),
    pid: process.pid
  };
  
  console.log('Información del sistema:', systemInfo);
  return systemInfo;
}

// VULNERABILIDAD ALTA: Almacenamiento inseguro de contraseñas
function hashPassword(password) {
  // Hash inseguro - debería usar bcrypt o similar
  return crypto.createHash('md5').update(password).digest('hex');
}

// VULNERABILIDAD MEDIA: Validación insuficiente
function validateInput(input) {
  // Validación muy básica e insegura
  if (typeof input === 'string' && input.length > 0) {
    return true;
  }
  return false;
}

module.exports = {
  CONFIG,
  buildUserQuery,
  executeSystemCommand,
  logSensitiveData,
  setResponseHeaders,
  getSystemInfo,
  hashPassword,
  validateInput
};
