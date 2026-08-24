import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPortfolioFile, updatePortfolioFile } from "@/lib/github";
import type { PortfolioData } from "@/types/portfolio";

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.isOwner) {
    return NextResponse.json(
      { error: "You're not signed in as the portfolio owner." },
      { status: 403 }
    );
  }

  if (!session.accessToken) {
    return NextResponse.json(
      { error: "Missing GitHub access token — try signing out and back in." },
      { status: 401 }
    );
  }

  let body: PortfolioData;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    // Always fetch the latest sha right before writing, so we don't clobber
    // a newer commit (e.g. edited from two tabs).
    const { sha } = await getPortfolioFile();
    await updatePortfolioFile(body, sha, session.accessToken);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
