import { NextRequest, NextResponse } from "next/server";
import { execSync } from "node:child_process";
import { mkdtempSync, readFileSync, existsSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { repoUrl, branch = "master" } = await req.json();

    if (typeof repoUrl !== "string" || !repoUrl.startsWith("https://github.com/")) {
      return NextResponse.json({ error: "repoUrl inválido. Usa un URL de GitHub público." }, { status: 400 });
    }

    // Requiere: servidor con Git + Bearer CLI (via WSL)
    const tmp = mkdtempSync(join(tmpdir(), "bearer-scan-api-"));
    const repoDir = join(tmp, "repo");
    execSync(`git clone --depth=1 --branch ${branch} ${repoUrl} ${repoDir}`, { stdio: "pipe" });

    // Usa Bearer CLI via WSL
    const outputPath = join(repoDir, "bearer-report.html");
    const wslRepoDir = repoDir.replace(/\\/g, '/').replace(/^([A-Z]):/, '/mnt/$1').toLowerCase();
    const wslOutputPath = outputPath.replace(/\\/g, '/').replace(/^([A-Z]):/, '/mnt/$1').toLowerCase();
    
    const cmd = [
      'wsl',
      'bash',
      '-c',
      `"bearer scan '${wslRepoDir}' --format html --report security --scanner sast,secrets --severity critical,high,medium,low,warning --output '${wslOutputPath}'"`
    ].join(' ');

    try {
      execSync(cmd, { stdio: "pipe" });
    } catch (error) {
      // Bearer CLI puede salir con código 1 incluso cuando el escaneo es exitoso
      // Verificamos si el archivo de reporte se generó correctamente
      if (!existsSync(outputPath)) {
        throw new Error("No se pudo generar el reporte de seguridad");
      }
    }

    const html = readFileSync(join(repoDir, "bearer-report.html"), "utf-8");
    const fileStats = statSync(join(repoDir, "bearer-report.html"));

    return NextResponse.json({
      success: true,
      message: "Escaneo completado exitosamente",
      repoUrl,
      branch,
      reportPath: "bearer-report.html",
      fileSize: `${(fileStats.size / 1024).toFixed(2)} KB`,
      command: `bearer scan '${wslRepoDir}' --format html --report security --scanner sast,secrets --severity critical,high,medium,low,warning --output '${wslOutputPath}'`,
      html: html
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Error al escanear." }, { status: 500 });
  }
}
