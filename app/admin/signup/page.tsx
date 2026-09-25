import { redirect } from "next/navigation";

// Kept so old admin bookmarks still work; sign-in now lives at /signup.
export default async function AdminSignupPageRedirect({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  redirect(`/signup?next=${encodeURIComponent(next?.startsWith("/admin") ? next : "/admin")}`);
}
