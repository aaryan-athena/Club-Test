import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

// Lets client components (the site header) show the signed-in state while the
// public pages themselves stay statically rendered.
export async function GET() {
  const session = await getSession();
  const user = session
    ? { email: session.email, name: session.name ?? null, isAdmin: session.isAdmin }
    : null;
  return NextResponse.json({ user }, { headers: { "Cache-Control": "private, no-store" } });
}
