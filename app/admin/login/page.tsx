import { redirect } from "next/navigation";

// Kept so old admin bookmarks still work; sign-in now lives at /login.
export default async function AdminLoginPageRedirect({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  redirect(`/login?next=${encodeURIComponent(next?.startsWith("/admin") ? next : "/admin")}`);
}
