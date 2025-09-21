import { execSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const [,, repoUrlArg, branchArg] = process.argv;
if (!repoUrlArg) {
  console.error("Uso: node scripts/scan-repo.mjs <repoUrl> [branch]");
  process.exit(1);
}
const branch = branchArg || "master";
const tmp = mkdtempSync(join(tmpdir(), "bearer-scan-"));
const repoDir = join(tmp, "repo");

console.log(`Clonando ${repoUrlArg} (branch: ${branch}) en ${repoDir}...`);
execSync(`git clone --depth=1 --branch ${branch} ${repoUrlArg} ${repoDir}`, { stdio: "inherit" });

console.log("Escaneando con Bearer CLI (via WSL) y generando HTML...");
const outHtml = join(repoDir, "bearer-report.html");
const wslRepoDir = repoDir.replace(/\\/g, '/').replace(/^([A-Z]):/, '/mnt/$1').toLowerCase();
const wslOutHtml = outHtml.replace(/\\/g, '/').replace(/^([A-Z]):/, '/mnt/$1').toLowerCase();

const cmd = [
  'wsl',
  'bash',
  '-c',
  `"bearer scan '${wslRepoDir}' --format html --report security --scanner sast,secrets --severity critical,high,medium,low,warning --output '${wslOutHtml}'"`
].join(' ');

try {
  execSync(cmd, { stdio: "inherit" });
} catch (error) {
  // Bearer CLI puede salir con código 1 incluso cuando el escaneo es exitoso
  // Verificamos si el archivo de reporte se generó correctamente
  if (!existsSync(outHtml)) {
    console.error("Error: No se pudo generar el reporte");
    process.exit(1);
  }
  console.log("Escaneo completado (Bearer CLI salió con código de advertencia)");
}

const projectRoot = process.cwd();
const pubReports = resolve(projectRoot, "public", "reports");
mkdirSync(pubReports, { recursive: true });

const safeName = repoUrlArg.replace(/[^a-z0-9-_]+/gi, "_");
const targetHtml = resolve(pubReports, `${safeName}_${branch}.html`);
writeFileSync(targetHtml, readFileSync(outHtml));
console.log(`OK -> ${targetHtml}`);
