import { NextRequest, NextResponse } from "next/server";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reportId = searchParams.get('id');
    
    if (reportId) {
      // Para GitHub Pages, redirigir al archivo estático
      const reportUrl = `/next-bearer-sast-lab/reports/${reportId}.html`;
      return NextResponse.redirect(new URL(reportUrl, req.url));
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
            url: `/next-bearer-sast-lab/api/reports?id=${reportId}`
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
