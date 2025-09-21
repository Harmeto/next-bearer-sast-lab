import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";

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

    if (!existsSync(reportPath)) {
      return NextResponse.json({ 
        error: "Reporte no encontrado. El escaneo puede estar en progreso o no se ha ejecutado aún." 
      }, { status: 404 });
    }

    const html = readFileSync(reportPath, 'utf-8');
    let scanInfo = null;
    
    if (existsSync(infoPath)) {
      try {
        scanInfo = JSON.parse(readFileSync(infoPath, 'utf-8'));
      } catch (error) {
        console.error('Error parsing scan info:', error);
      }
    }

    return NextResponse.json({
      success: true,
      html: html,
      scanInfo: scanInfo,
      reportPath: reportPath
    });

  } catch (err: any) {
    return NextResponse.json({ 
      error: err?.message ?? "Error al obtener el reporte." 
    }, { status: 500 });
  }
}
