import { execSync } from "node:child_process";
import { mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = process.cwd();
const reportsDir = resolve(projectRoot, "public", "reports");
if (!existsSync(reportsDir)) mkdirSync(reportsDir, { recursive: true });

console.log("Generando reporte inicial (HTML) del proyecto local con Bearer CLI (via WSL)...");
const outputPath = resolve(projectRoot, "public", "reports", "initial.html");
const wslProjectRoot = projectRoot.replace(/\\/g, '/').replace(/^([A-Z]):/, '/mnt/$1').toLowerCase();
const wslOutputPath = outputPath.replace(/\\/g, '/').replace(/^([A-Z]):/, '/mnt/$1').toLowerCase();

const cmd = [
  'wsl',
  'bash',
  '-c',
  `"bearer scan '${wslProjectRoot}' --format html --report security --scanner sast,secrets --severity critical,high,medium,low,warning --output '${wslOutputPath}'"`
].join(' ');

try {
  execSync(cmd, { stdio: "inherit" });
} catch (error) {
  // Bearer CLI puede salir con código 1 incluso cuando el escaneo es exitoso
  // Verificamos si el archivo de reporte se generó correctamente
  if (!existsSync(outputPath)) {
    console.error("Error: No se pudo generar el reporte inicial");
    process.exit(1);
  }
  console.log("Escaneo completado (Bearer CLI salió con código de advertencia)");
}
console.log("OK -> public/reports/initial.html");
