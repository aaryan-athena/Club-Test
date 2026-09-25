import { AuthForm } from "@/components/auth-form";
import { BrandMark } from "@/components/brand-mark";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function AuthPage({ mode, nextPath }: { mode: "login" | "signup"; nextPath?: string }) {
  const isSignup = mode === "signup";

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-950">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center bg-slate-50/75 px-5 py-12 sm:py-16">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="mb-7 flex items-center gap-3 text-emerald-800">
            <BrandMark className="h-10 w-10" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em]">SMC Resources</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                {isSignup ? "Create your account" : "Welcome back"}
              </h1>
            </div>
          </div>
          <AuthForm mode={mode} nextPath={nextPath} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
