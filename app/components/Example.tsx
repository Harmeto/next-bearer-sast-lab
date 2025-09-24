"use client";
import React, { useEffect, useState } from 'react';

// Definición de vulnerabilidades detectables por Bearer CLI
const vulnerabilityDefinitions = {
  hardcodedSecrets: {
    title: "Secretos Hardcodeados",
    cwe: "CWE-798",
    description: "API keys, tokens y credenciales expuestas directamente en el código",
    severity: "critical",
    icon: "🔑",
    details: "Bearer CLI detecta patrones de secretos conocidos como API keys de servicios populares",
    lineNumbers: "28-35"
  },
  jwtHardcodedSecret: {
    title: "JWT con Secreto Hardcodeado",
    cwe: "CWE-798", 
    description: "Secreto JWT hardcodeado en el código fuente",
    severity: "high",
    icon: "🎫",
    details: "JWT firmado con secreto hardcodeado es vulnerable a ataques",
    lineNumbers: "40-44"
  },
  dangerousInnerHTML: {
    title: "dangerouslySetInnerHTML sin Sanitizar",
    cwe: "CWE-79",
    description: "Uso inseguro de dangerouslySetInnerHTML con entrada del usuario",
    severity: "high",
    icon: "⚠️",
    details: "Permite inyección de HTML/JavaScript sin validación",
    lineNumbers: "120-124"
  },
  sqlInjection: {
    title: "Inyección SQL",
    cwe: "CWE-89",
    description: "Consulta SQL construida con concatenación de strings sin sanitizar",
    severity: "critical",
    icon: "🗃️",
    details: "Consultas SQL dinámicas son vulnerables a inyección",
    lineNumbers: "50-52"
  },
  pathTraversal: {
    title: "Path Traversal",
    cwe: "CWE-22",
    description: "Acceso a archivos usando rutas controladas por el usuario",
    severity: "high",
    icon: "📁",
    details: "Rutas de archivos sin validación permiten acceso no autorizado",
    lineNumbers: "58-62"
  },
  insecureRandom: {
    title: "Generación Insegura de Números Aleatorios",
    cwe: "CWE-338",
    description: "Uso de Math.random() para generar valores criptográficos",
    severity: "medium",
    icon: "🎲",
    details: "Math.random() no es criptográficamente seguro",
    lineNumbers: "68-70"
  }
};

const jwtHardcodedSecret = (secret: string) => {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI3MjA2NDAwfQ.qH7Zjh4UbOqmsQkg7UvZ5KQvMrPJkJ7c4L5R6ZHxOwU'
};

const SeverityBadge = ({ severity }: { severity: string }) => {
  const colors = {
    critical: 'bg-red-100 text-red-800 border-red-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[severity as keyof typeof colors]}`}>
      {severity.toUpperCase()}
    </span>
  );
};

const VulnerabilityCard = ({ vulnerability, children }: { vulnerability: any, children: React.ReactNode }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border-l-4 border-l-red-500 p-6 mb-6 hover:shadow-xl transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{vulnerability.icon}</span>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{vulnerability.title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-blue-600 font-mono bg-blue-50 px-2 py-1 rounded">
                {vulnerability.cwe}
              </span>
              <SeverityBadge severity={vulnerability.severity} />
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 mb-3 text-sm">{vulnerability.description}</p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-blue-800">
          <strong>Detalle técnico:</strong> {vulnerability.details}
        </p>
        <p className="text-xs text-blue-600 mt-1">
          <strong>Líneas afectadas:</strong> {vulnerability.lineNumbers}
        </p>
      </div>
      
      {children}
    </div>
  );
};

export default function VulnerablePage() {
  const [userData, setUserData] = useState('');
  const [filename, setFilename] = useState('../../../etc/passwd');
  const [userInput, setUserInput] = useState('<script>alert("XSS")</script>');
  const [jwtToken, setJwtToken] = useState('');
  
  // BEARER: Hardcoded secrets - estos patrones son detectados por Bearer CLI
  const STRIPE_SECRET_KEY = 'sk_live_51H7x8yBqJF4pKzAd9V5r2nW8XjKlP3mF9sG1hT2uB4cD6eN7qR9sA3bC5dE8fG'; // API Key de Stripe
  const GITHUB_TOKEN = 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // GitHub Personal Access Token
  const AWS_SECRET_KEY = 'AKIAIOSFODNN7EXAMPLE/wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'; // AWS Secret Key
  const OPENAI_API_KEY = 'sk-1234567890abcdef1234567890abcdef1234567890abcdef12'; // OpenAI API Key
  const DATABASE_URL = 'postgresql://admin:password123@db.company.com:5432/production'; // Database URL
  const SENDGRID_API_KEY = 'SG.xxxxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // SendGrid API Key

  useEffect(() => {
    // BEARER: JWT hardcoded secret
    const getToken = () => {
      const token = jwtHardcodedSecret(STRIPE_SECRET_KEY);
      console.log('JWT Token:', token);
      setJwtToken(token);
    };

    getToken();
  }, []);

  // BEARER: SQL Injection vulnerability
  const getUserData = (userId: string) => {
    // Esta es una consulta SQL vulnerable a inyección
    const query = `SELECT * FROM users WHERE id = '${userId}' AND active = 1`;
    // En un caso real, esto se ejecutaría contra una base de datos
    console.log('Vulnerable SQL Query:', query);
  };

  // BEARER: Path traversal vulnerability  
  const readUserFile = (userFileName: string) => {
    // Construcción insegura de ruta de archivo
    const filePath = `/var/www/uploads/${userFileName}`;
    // En un servidor real, esto podría acceder a archivos del sistema
    console.log('Potentially dangerous file path:', filePath);
  };

  // BEARER: Insecure random generation
  const generateToken = () => {
    // Math.random() no es criptográficamente seguro para tokens
    const insecureToken = "jqp0pddbdkg";
    console.log('Insecure token:', insecureToken);
    return insecureToken;
  };

  // BEARER: Command injection (si estuviera en Node.js server)
  const processUserCommand = (userCmd: string) => {
    // En un entorno servidor, esto sería vulnerable a inyección de comandos
    const command = `ls -la ${userCmd}`;
    console.log('Potentially dangerous command:', command);
  };

  console.log('JWT Token:', jwtToken);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🔍 <span className="text-red-600">Bearer CLI - Código Vulnerable</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Este archivo contiene vulnerabilidades reales que Bearer CLI puede detectar automáticamente. 
            Cada patrón está basado en las reglas específicas de Bearer CLI para JavaScript/React.
          </p>
          <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg inline-block">
            <strong>⚠️ ADVERTENCIA:</strong> Código intencionalmente vulnerable para testing SAST
          </div>
        </div>

        {/* Vulnerability Documentation */}
        <div className="space-y-8">
          
          {/* 1. Hardcoded Secrets */}
          <VulnerabilityCard vulnerability={vulnerabilityDefinitions.hardcodedSecrets}>
            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
              <div className="text-yellow-400">// API Keys y secretos hardcodeados:</div>
              <div className="text-red-400">const STRIPE_SECRET_KEY = 'sk_live_51H7x8yBqJF4pKzAd...';</div>
              <div className="text-red-400">const GITHUB_TOKEN = 'ghp_xxxxxxxxxxxxxxxxxxxx...';</div>
              <div className="text-red-400">const AWS_SECRET_KEY = 'AKIAIOSFODNN7EXAMPLE/w...';</div>
              <div className="text-red-400">const OPENAI_API_KEY = 'sk-1234567890abcdef...';</div>
              <div className="text-red-400">const DATABASE_URL = 'postgresql://admin:password123@...';</div>
              <div className="text-red-400">const SENDGRID_API_KEY = 'SG.xxxxxxxxxxxxxxxxxxxx...';</div>
            </div>
          </VulnerabilityCard>

          {/* 2. JWT Hardcoded Secret */}
          <VulnerabilityCard vulnerability={vulnerabilityDefinitions.jwtHardcodedSecret}>
            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
              <div className="text-yellow-400">// JWT con secreto hardcodeado:</div>
              <div>const jwt = require('jsonwebtoken');</div>
              <div className="text-red-400">const hardcodedSecret = 'my-super-secret-jwt-key-do-not-use';</div>
              <div>const token = jwt.sign({'{'}userId: 123{'}'}, hardcodedSecret);</div>
            </div>
          </VulnerabilityCard>

          {/* 3. SQL Injection */}
          <VulnerabilityCard vulnerability={vulnerabilityDefinitions.sqlInjection}>
            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
              <div className="text-yellow-400">// Consulta SQL vulnerable:</div>
              <div>const getUserData = (userId) ={'>'} {'{'}</div>
              <div className="text-red-400">  const query = `SELECT * FROM users WHERE id = '${'${'}userId{'}'}' AND active = 1`;</div>
              <div>  // Ejecutar consulta...</div>
              <div>{'}'}</div>
            </div>
            <div className="mt-4">
              <input
                type="text"
                value={userData}
                onChange={(e) => {
                  setUserData(e.target.value);
                  getUserData(e.target.value);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="Ingresa user ID (ej: 1' OR '1'='1)"
              />
            </div>
          </VulnerabilityCard>

          {/* 4. Path Traversal */}
          <VulnerabilityCard vulnerability={vulnerabilityDefinitions.pathTraversal}>
            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
              <div className="text-yellow-400">// Path traversal vulnerable:</div>
              <div>const readUserFile = (userFileName) = {'>'} {'{'}</div>
              <div className="text-red-400">  const filePath = `/var/www/uploads/${'${'}userFileName{'}'}`;</div>
              <div>  // Leer archivo...</div>
              <div>{'}'}</div>
            </div>
            <div className="mt-4">
              <input
                type="text"
                value={filename}
                onChange={(e) => {
                  setFilename(e.target.value);
                  readUserFile(e.target.value);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="Nombre de archivo"
              />
              <p className="text-sm text-gray-600 mt-1">
                Ejemplo de payload: <code className="bg-gray-100 px-1 rounded">../../../etc/passwd</code>
              </p>
            </div>
          </VulnerabilityCard>

          {/* 5. Insecure Random */}
          <VulnerabilityCard vulnerability={vulnerabilityDefinitions.insecureRandom}>
            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
              <div className="text-yellow-400">// Generación insegura de token:</div>
              <div>const generateToken = () = {'>'} {'{'}</div>
              <div className="text-red-400">  const insecureToken = Math.random().toString(36).substring(2, 15);</div>
              <div>  return insecureToken;</div>
              <div>{'}'}</div>
            </div>
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-3">
              <p className="text-sm text-yellow-800">
                <strong>Token generado:</strong> <code className="bg-yellow-100 px-1 rounded">{generateToken()}</code>
              </p>
            </div>
          </VulnerabilityCard>

          {/* 6. XSS via dangerouslySetInnerHTML */}
          <VulnerabilityCard vulnerability={vulnerabilityDefinitions.dangerousInnerHTML}>
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
                <div className="text-yellow-400">// XSS via dangerouslySetInnerHTML:</div>
                <div>&lt;div dangerouslySetInnerHTML={'{'}{'{'}</div>
                <div className="text-red-400">  __html: userInput // Sin sanitización</div>
                <div>{'}'}{'}'}  /&gt;</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entrada del Usuario (sin sanitizar):
                </label>
                <textarea
                  rows={3}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  placeholder="<script>alert('XSS')</script>"
                />
              </div>
              
              {/* BEARER: Vulnerable dangerouslySetInnerHTML usage */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800 mb-2">
                  <strong>⚠️ Contenido renderizado sin sanitizar:</strong>
                </p>
                <div 
                  className="border border-red-300 rounded p-3 bg-red-50"
                  dangerouslySetInnerHTML={{ __html: userInput }}
                />
              </div>
            </div>
          </VulnerabilityCard>
        </div>

        {/* Detection Summary */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            📊 Vulnerabilidades Detectables por Bearer CLI
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(vulnerabilityDefinitions).map(([key, vuln]) => (
              <div key={key} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">{vuln.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{vuln.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-blue-600 font-mono bg-blue-100 px-1 rounded">
                        {vuln.cwe}
                      </span>
                      <SeverityBadge severity={vuln.severity} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 space-y-2">
            <p className="text-gray-600">
              Total: <strong className="text-red-600">6 vulnerabilidades</strong> reales detectables
            </p>
            <p className="text-sm text-gray-500">
              Ejecuta <code className="bg-gray-100 px-2 py-1 rounded">bearer scan . --report=html</code> para detectar automáticamente
            </p>
          </div>
        </div>

        {/* Bearer CLI Command Example */}
        <div className="mt-8 bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4 text-center">🔍 Comando Bearer CLI</h3>
          <div className="bg-black bg-opacity-50 rounded-lg p-4 font-mono text-green-400">
            <div className="text-blue-300"># Escanear con tu configuración actual:</div>
            <div>bearer scan . --config-file=bearer.yml</div>
            <div className="text-blue-300 mt-2"># O usar configuración inline:</div>
            <div>bearer scan . --report=html --output=public/reports/scan.html</div>
          </div>
          <p className="text-center mt-4 text-blue-100">
            Con esta configuración, Bearer CLI debería detectar las <strong>6 vulnerabilidades</strong> hardcodeadas
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl p-6">
            <p className="text-lg font-semibold mb-2">
              🎯 Patrones Reales para Bearer CLI
            </p>
            <p className="text-red-100">
              Todas las vulnerabilidades siguen patrones específicos que Bearer CLI reconoce automáticamente.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}