import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

const sessionCookie = "__session";
const sessionLifetimeMs = 12 * 60 * 60 * 1_000;
// Only mint a session from a fresh sign-in, so a leaked old ID token can't be upgraded.
const maxSignInAgeSeconds = 5 * 60;

export type AdminSession = { uid: string; email: string };
export type CreateSessionResult = "ok" | "unverified" | "forbidden" | "stale" | "invalid";

function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function isAdminEmail(email: string | undefined) {
  return Boolean(email) && adminEmails().includes(email!.toLowerCase());
}

export function isAdminConfigured() {
  return isFirebaseAdminConfigured() && adminEmails().length > 0;
}

export async function createAdminSession(idToken: string): Promise<CreateSessionResult> {
  let decoded;
  try {
    decoded = await adminAuth().verifyIdToken(idToken, true);
  } catch {
    return "invalid";
  }

  if (Date.now() / 1_000 - decoded.auth_time > maxSignInAgeSeconds) return "stale";
  // Email/password sign-up doesn't prove ownership of the address, so an unverified
  // account must never match the allowlist.
  if (!decoded.email_verified) return "unverified";
  if (!isAdminEmail(decoded.email)) return "forbidden";

  const sessionValue = await adminAuth().createSessionCookie(idToken, { expiresIn: sessionLifetimeMs });
  (await cookies()).set(sessionCookie, sessionValue, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: sessionLifetimeMs / 1_000,
    path: "/",
  });
  return "ok";
}

export async function getAdminSession(): Promise<AdminSession | null> {
  if (!isAdminConfigured()) return null;
  const token = (await cookies()).get(sessionCookie)?.value;
  if (!token) return null;

  try {
    const decoded = await adminAuth().verifySessionCookie(token, true);
    if (!decoded.email_verified || !isAdminEmail(decoded.email)) return null;
    return { uid: decoded.uid, email: decoded.email!.toLowerCase() };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie)?.value;
  cookieStore.delete(sessionCookie);
  if (!token || !isFirebaseAdminConfigured()) return;

  try {
    const decoded = await adminAuth().verifySessionCookie(token);
    await adminAuth().revokeRefreshTokens(decoded.sub);
  } catch {
    // The cookie is already gone; an expired or invalid session needs no revocation.
  }
}
