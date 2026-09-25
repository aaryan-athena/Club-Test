"use server";

import { redirect } from "next/navigation";
import { clearAdminSession, createAdminSession, isAdminConfigured } from "@/lib/auth/admin";

export type SessionActionResult = { error: string } | { redirectTo: string };

const sessionErrors = {
  unverified: "Verify your email address first. Check your inbox for the verification link.",
  forbidden: "This account does not have admin access.",
  stale: "Your sign-in expired. Please sign in again.",
  invalid: "We could not verify your sign-in. Please try again.",
} as const;

export async function createSessionAction(idToken: string, next: string): Promise<SessionActionResult> {
  if (!isAdminConfigured()) {
    return { error: "Admin authentication is not configured on this server." };
  }

  const result = await createAdminSession(idToken);
  if (result !== "ok") return { error: sessionErrors[result] };

  return { redirectTo: next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin" };
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
