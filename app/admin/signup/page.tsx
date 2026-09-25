import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { BrandMark } from "@/components/brand-mark";
import { getAdminSession } from "@/lib/auth/admin";

export const metadata: Metadata = { title: "Admin Sign Up | WWP South Math Club" };
export const dynamic = "force-dynamic";

export default async function AdminSignupPage() {
  if (await getAdminSession()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="mb-7 flex items-center gap-3 text-emerald-800">
          <BrandMark className="h-10 w-10" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em]">Protected area</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">Create admin account</h1>
          </div>
        </div>
        <p className="-mt-3 mb-6 text-sm text-slate-600">Only emails on the admin allowlist can open the dashboard after verifying their address.</p>
        <AdminLoginForm mode="signup" />
      </div>
    </main>
  );
}
