import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getBasePath() {
  return process.env.NODE_ENV === 'production' ? '/next-bearer-sast-lab' : '';
}

function generateReportsList() {
  try {
    const projectRoot = join(__dirname, '..');
    const reportsDir = join(projectRoot, 'public', 'reports');
    const outputFile = join(projectRoot, 'public', 'reports-list.json');
    
    console.log('📊 Generando lista de reportes...');
    console.log('📁 Directorio de reportes:', reportsDir);
    
    // Leer archivos de reportes
    const files = readdirSync(reportsDir)
      .filter(file => file.endsWith('.html'))
      .map(file => {
        const filePath = join(reportsDir, file);
        const stats = statSync(filePath);
        const reportId = file.replace('.html', '');
        const basePath = getBasePath();
        
        return {
          id: reportId,
          filename: file,
          size: stats.size,
          created: stats.birthtime.toISOString(),
          modified: stats.mtime.toISOString(),
          url: `${basePath}/reports/${reportId}.html`
        };
      })
      .sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime());
    
    // Crear objeto de respuesta compatible con la API
    const reportsData = {
      success: true,
      reports: files,
      total: files.length,
      generated: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    };
    
    // Escribir archivo JSON
    writeFileSync(outputFile, JSON.stringify(reportsData, null, 2));
    
    console.log(`✅ Lista generada exitosamente: ${files.length} reportes encontrados`);
    console.log(`📄 Archivo creado: ${outputFile}`);
    
    // Mostrar resumen
    if (files.length > 0) {
      console.log('\n📋 Reportes encontrados:');
      files.forEach((report, index) => {
        console.log(`  ${index + 1}. ${report.id} (${formatFileSize(report.size)})`);
      });
    }
    
    return reportsData;
    
  } catch (error) {
    console.error('❌ Error generando lista de reportes:', error.message);
    
    // Crear archivo de error
    const errorData = {
      success: false,
      error: "No se pudieron listar los reportes",
      reports: [],
      total: 0,
      generated: new Date().toISOString()
    };
    
    const outputFile = join(__dirname, '..', 'public', 'reports-list.json');
    writeFileSync(outputFile, JSON.stringify(errorData, null, 2));
    
    throw error;
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Ejecutar si se llama directamente
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateReportsList();
}

export { generateReportsList };
