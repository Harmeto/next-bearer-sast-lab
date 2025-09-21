import { NextRequest, NextResponse } from "next/server";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reportId = searchParams.get('id');
    
    if (reportId) {
      // Servir un reporte específico
      const reportPath = join(process.cwd(), 'public', 'reports', `${reportId}.html`);
      
      try {
        const fs = await import('node:fs');
        const html = fs.readFileSync(reportPath, 'utf-8');
        return new NextResponse(html, {
          headers: {
            'Content-Type': 'text/html',
          },
        });
      } catch (error) {
        return NextResponse.json({ 
          error: "Reporte no encontrado" 
        }, { status: 404 });
      }
    }
    
    // Listar todos los reportes disponibles
    const reportsDir = join(process.cwd(), 'public', 'reports');
    
    try {
      const files = readdirSync(reportsDir)
        .filter(file => file.endsWith('.html'))
        .map(file => {
          const filePath = join(reportsDir, file);
          const stats = statSync(filePath);
          const reportId = file.replace('.html', '');
          
          return {
            id: reportId,
            filename: file,
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime,
            url: `/api/reports?id=${reportId}`
          };
        })
        .sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime());
      
      return NextResponse.json({
        success: true,
        reports: files,
        total: files.length
      });
      
    } catch (error) {
      return NextResponse.json({ 
        error: "No se pudieron listar los reportes" 
      }, { status: 500 });
    }

  } catch (err: any) {
    return NextResponse.json({ 
      error: err?.message ?? "Error al obtener los reportes." 
    }, { status: 500 });
  }
}
