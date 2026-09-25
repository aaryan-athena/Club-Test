import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthPage } from "@/components/auth-page";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Sign Up | WWP South Math Club" };

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const [session, { next }] = await Promise.all([getSession(), searchParams]);
  if (session) redirect(session.isAdmin && next?.startsWith("/admin") ? next : "/");

  return <AuthPage mode="signup" nextPath={next} />;
}
