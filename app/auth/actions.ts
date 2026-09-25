"use server";

import { redirect } from "next/navigation";
import { clearSession, createSession, isAuthConfigured } from "@/lib/auth/session";

export type SessionActionResult = { error: string } | { redirectTo: string };

const sessionErrors = {
  unverified: "Verify your email address first. Check your inbox for the verification link.",
  stale: "Your sign-in expired. Please sign in again.",
  invalid: "We could not verify your sign-in. Please try again.",
} as const;

function safeNext(next: string, isAdmin: boolean) {
  const internal = next.startsWith("/") && !next.startsWith("//");
  if (!internal || next.startsWith("/login") || next.startsWith("/signup")) {
    return isAdmin ? "/admin" : "/";
  }
  if (next.startsWith("/admin") && !isAdmin) return "/";
  return next;
}

export async function createSessionAction(idToken: string, next: string): Promise<SessionActionResult> {
  if (!isAuthConfigured()) {
    return { error: "Sign-in is not configured on this server." };
  }

  const result = await createSession(idToken);
  if (!result.ok) return { error: sessionErrors[result.reason] };

  return { redirectTo: safeNext(next, result.isAdmin) };
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}
