import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

const sessionCookie = "__session";
const sessionLifetimeMs = 12 * 60 * 60 * 1_000;
// Only mint a session from a fresh sign-in, so a leaked old ID token can't be upgraded.
const maxSignInAgeSeconds = 5 * 60;

export type Session = { uid: string; email: string; name?: string; isAdmin: boolean };
export type CreateSessionResult =
  | { ok: true; isAdmin: boolean }
  | { ok: false; reason: "unverified" | "stale" | "invalid" };

function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

// Email/password sign-up doesn't prove ownership of the address, so an unverified
// account must never match the admin allowlist.
function isAdmin(email: string | undefined, emailVerified: boolean | undefined) {
  return Boolean(email && emailVerified) && adminEmails().includes(email!.toLowerCase());
}

export function isAuthConfigured() {
  return isFirebaseAdminConfigured();
}

export async function createSession(idToken: string): Promise<CreateSessionResult> {
  let decoded;
  try {
    decoded = await adminAuth().verifyIdToken(idToken, true);
  } catch {
    return { ok: false, reason: "invalid" };
  }

  if (Date.now() / 1_000 - decoded.auth_time > maxSignInAgeSeconds) return { ok: false, reason: "stale" };
  if (!decoded.email_verified) return { ok: false, reason: "unverified" };

  const sessionValue = await adminAuth().createSessionCookie(idToken, { expiresIn: sessionLifetimeMs });
  (await cookies()).set(sessionCookie, sessionValue, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: sessionLifetimeMs / 1_000,
    path: "/",
  });
  return { ok: true, isAdmin: isAdmin(decoded.email, decoded.email_verified) };
}

export async function getSession(): Promise<Session | null> {
  if (!isAuthConfigured()) return null;
  const token = (await cookies()).get(sessionCookie)?.value;
  if (!token) return null;

  try {
    const decoded = await adminAuth().verifySessionCookie(token, true);
    if (!decoded.email || !decoded.email_verified) return null;
    return {
      uid: decoded.uid,
      email: decoded.email.toLowerCase(),
      ...(typeof decoded.name === "string" ? { name: decoded.name } : {}),
      isAdmin: isAdmin(decoded.email, decoded.email_verified),
    };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/login?next=/admin");
  if (!session.isAdmin) redirect("/");
  return session;
}

export async function clearSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie)?.value;
  cookieStore.delete(sessionCookie);
  if (!token || !isAuthConfigured()) return;

  try {
    const decoded = await adminAuth().verifySessionCookie(token);
    await adminAuth().revokeRefreshTokens(decoded.sub);
  } catch {
    // The cookie is already gone; an expired or invalid session needs no revocation.
  }
}
