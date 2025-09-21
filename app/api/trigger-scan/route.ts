import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { repoUrl, branch = "master" } = await req.json();

    if (typeof repoUrl !== "string" || !repoUrl.startsWith("https://github.com/")) {
      return NextResponse.json({ error: "repoUrl inválido. Usa un URL de GitHub público." }, { status: 400 });
    }

    // Trigger GitHub Actions workflow
    const response = await fetch(`https://api.github.com/repos/Harmeto/next-bearer-sast-lab/actions/workflows/deploy.yml/dispatches`, {
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

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return NextResponse.json({
      success: true,
      message: "Escaneo iniciado. El reporte estará disponible en unos minutos.",
      repoUrl,
      branch,
      statusUrl: `https://github.com/Harmeto/next-bearer-sast-lab/actions`
    });

  } catch (err: any) {
    return NextResponse.json({ 
      error: err?.message ?? "Error al iniciar el escaneo." 
    }, { status: 500 });
  }
}
