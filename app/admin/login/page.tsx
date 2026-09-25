import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { BrandMark } from "@/components/brand-mark";
import { getAdminSession } from "@/lib/auth/admin";

export const metadata: Metadata = { title: "Admin Login | WWP South Math Club" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (await getAdminSession()) redirect("/admin");
  const { next } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="mb-7 flex items-center gap-3 text-emerald-800">
          <BrandMark className="h-10 w-10" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em]">Protected area</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">Admin sign in</h1>
          </div>
        </div>
        <AdminLoginForm mode="login" nextPath={next} />
      </div>
    </main>
  );
}
