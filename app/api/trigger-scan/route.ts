import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { repoUrl, branch = "master" } = await req.json();

    if (typeof repoUrl !== "string" || !repoUrl.startsWith("https://github.com/")) {
      return NextResponse.json({ error: "repoUrl inválido. Usa un URL de GitHub público." }, { status: 400 });
    }

    // Verificar si tenemos el token de GitHub
    if (!process.env.GITHUB_TOKEN) {
      return NextResponse.json({ 
        error: "Token de GitHub no configurado. Por favor, configura GITHUB_TOKEN en los secrets del repositorio." 
      }, { status: 500 });
    }

    // Trigger GitHub Actions workflow
    const response = await fetch(`https://api.github.com/repos/Harmeto/next-bearer-sast-lab/actions/workflows/security-scan.yml/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ref: 'main',
        inputs: {
          repo_url: repoUrl,
          branch: branch
        }
      })
    });

    const responseText = await response.text();
    console.log('GitHub API Response:', response.status, responseText);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} - ${responseText}`);
    }

    return NextResponse.json({
      success: true,
      message: "Escaneo iniciado. El reporte estará disponible en unos minutos.",
      repoUrl,
      branch,
      statusUrl: `https://github.com/Harmeto/next-bearer-sast-lab/actions`,
      debug: {
        hasToken: !!process.env.GITHUB_TOKEN,
        tokenLength: process.env.GITHUB_TOKEN?.length || 0
      }
    });

  } catch (err: any) {
    console.error('Error in trigger-scan:', err);
    return NextResponse.json({ 
      error: err?.message ?? "Error al iniciar el escaneo.",
      debug: {
        hasToken: !!process.env.GITHUB_TOKEN,
        tokenLength: process.env.GITHUB_TOKEN?.length || 0
      }
    }, { status: 500 });
  }
}
