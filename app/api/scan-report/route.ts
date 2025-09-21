import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'project';
    
    let reportPath: string;
    let infoPath: string;
    
    if (type === 'project') {
      reportPath = join(process.cwd(), 'public', 'project-scan-report.html');
      infoPath = join(process.cwd(), 'public', 'scan-info.json');
    } else {
      reportPath = join(process.cwd(), 'public', 'scan-report.html');
      infoPath = join(process.cwd(), 'public', 'scan-info.json');
    }

    // Siempre devolver algo, incluso si el archivo no existe
    let html = '';
    let scanInfo = null;
    
    if (existsSync(reportPath)) {
      html = readFileSync(reportPath, 'utf-8');
    } else {
      // Crear un reporte temporal si no existe
      html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reporte de Seguridad - En Progreso</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; text-align: center; }
                .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                .status { background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 5px; margin: 20px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🔍 Reporte de Seguridad</h1>
                <div class="status">
                    <h3>⏳ Generando Reporte</h3>
                    <p>El reporte de seguridad se está generando automáticamente. Por favor, espera unos minutos y recarga la página.</p>
                </div>
            </div>
        </body>
        </html>
      `;
    }
    
    if (existsSync(infoPath)) {
      try {
        scanInfo = JSON.parse(readFileSync(infoPath, 'utf-8'));
      } catch (error) {
        console.error('Error parsing scan info:', error);
        scanInfo = {
          repoUrl: "https://github.com/Harmeto/next-bearer-sast-lab",
          branch: "main",
          scanDate: new Date().toISOString(),
          status: "pending",
          type: "project"
        };
      }
    } else {
      scanInfo = {
        repoUrl: "https://github.com/Harmeto/next-bearer-sast-lab",
        branch: "main",
        scanDate: new Date().toISOString(),
        status: "pending",
        type: "project"
      };
    }

    return NextResponse.json({
      success: true,
      html: html,
      scanInfo: scanInfo,
      reportPath: reportPath,
      exists: existsSync(reportPath)
    });

  } catch (err: any) {
    console.error('Error in scan-report API:', err);
    return NextResponse.json({ 
      error: err?.message ?? "Error al obtener el reporte." 
    }, { status: 500 });
  }
}
