// Vercel Serverless Function
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { repoUrl, branch = 'master' } = req.body;

    if (!repoUrl || !repoUrl.startsWith('https://github.com/')) {
      return res.status(400).json({ error: 'repoUrl inválido. Usa un URL de GitHub público.' });
    }

    // Crear directorio temporal
    const tempDir = `/tmp/bearer-scan-${Date.now()}`;
    const repoDir = path.join(tempDir, 'repo');
    const outputPath = path.join(repoDir, 'bearer-report.html');

    try {
      // Clonar repositorio
      execSync(`git clone --depth=1 --branch ${branch} ${repoUrl} ${repoDir}`, { stdio: 'pipe' });

      // Ejecutar Bearer CLI
      execSync(`bearer scan ${repoDir} --format html --output ${outputPath}`, { stdio: 'pipe' });

      // Leer el reporte generado
      const html = fs.readFileSync(outputPath, 'utf-8');
      const fileStats = fs.statSync(outputPath);

      return res.status(200).json({
        success: true,
        message: "Escaneo completado exitosamente",
        repoUrl,
        branch,
        reportPath: "bearer-report.html",
        fileSize: `${(fileStats.size / 1024).toFixed(2)} KB`,
        html: html
      });

    } catch (error) {
      // Limpiar directorio temporal
      try {
        execSync(`rm -rf ${tempDir}`, { stdio: 'pipe' });
      } catch (cleanupError) {
        console.error('Error cleaning up temp directory:', cleanupError);
      }
      throw error;
    }

  } catch (err) {
    return res.status(500).json({ 
      error: err?.message ?? "Error al escanear el repositorio." 
    });
  }
}
