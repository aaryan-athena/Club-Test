"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createSessionAction } from "@/app/admin/login/actions";
import { firebaseAuth, isFirebaseClientConfigured } from "@/lib/firebase/client";

const inputClass = "mt-2 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm shadow-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20";

type Mode = "login" | "signup";
type Notice = { error: boolean; text: string } | null;

function authErrorMessage(error: unknown) {
  const code = error instanceof FirebaseError ? error.code : "";
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Sign in instead.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/weak-password":
      return "Choose a stronger password (at least 8 characters).";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a few minutes and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export function AdminLoginForm({ mode, nextPath }: { mode: Mode; nextPath?: string }) {
  const router = useRouter();
  const [notice, setNotice] = useState<Notice>(null);
  const [pending, setPending] = useState(false);
  const isSignup = mode === "signup";

  if (!isFirebaseClientConfigured()) {
    return <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">Firebase is not configured. Add the NEXT_PUBLIC_FIREBASE_* values to your env file.</p>;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const email = String(form.get("email") ?? "").trim().toLowerCase();
    const password = String(form.get("password") ?? "");

    if (isSignup) {
      if (password.length < 8) return setNotice({ error: true, text: "Password must be at least 8 characters." });
      if (password !== String(form.get("confirmPassword") ?? "")) {
        return setNotice({ error: true, text: "Passwords do not match." });
      }
    }

    setPending(true);
    setNotice(null);
    const auth = await firebaseAuth();

    try {
      if (isSignup) {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(user);
        setNotice({ error: false, text: `Account created. We sent a verification link to ${email}. Verify it, then sign in.` });
        formElement.reset();
        return;
      }

      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (!user.emailVerified) {
        await sendEmailVerification(user);
        setNotice({ error: true, text: `Your email isn't verified yet. We sent a new verification link to ${email}.` });
        return;
      }

      const result = await createSessionAction(await user.getIdToken(), nextPath ?? "");
      if ("error" in result) {
        setNotice({ error: true, text: result.error });
        return;
      }
      router.replace(result.redirectTo);
      router.refresh();
    } catch (error) {
      setNotice({ error: true, text: authErrorMessage(error) });
    } finally {
      await signOut(auth).catch(() => undefined);
      setPending(false);
    }
  }

  async function handleForgotPassword() {
    const input = document.getElementById("email") as HTMLInputElement | null;
    const email = input?.value.trim() ?? "";
    if (!email) return setNotice({ error: true, text: "Enter your email above, then choose “Forgot password?”." });

    try {
      await sendPasswordResetEmail(await firebaseAuth(), email);
      // Same message whether or not the account exists, to avoid revealing accounts.
      setNotice({ error: false, text: `If an account exists for ${email}, a password reset link is on its way.` });
    } catch (error) {
      setNotice({ error: true, text: authErrorMessage(error) });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {notice ? (
        <p role={notice.error ? "alert" : "status"} className={`rounded-lg border px-4 py-3 text-sm ${notice.error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>
          {notice.text}
        </p>
      ) : null}
      <div>
        <label htmlFor="email" className="text-sm font-semibold text-slate-800">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required className={inputClass} />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-semibold text-slate-800">Password</label>
          {!isSignup ? (
            <button type="button" onClick={handleForgotPassword} className="text-xs font-semibold text-emerald-800 hover:underline">Forgot password?</button>
          ) : null}
        </div>
        <input id="password" name="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} minLength={isSignup ? 8 : undefined} required className={inputClass} />
      </div>
      {isSignup ? (
        <div>
          <label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-800">Confirm password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required className={inputClass} />
        </div>
      ) : null}
      <button type="submit" disabled={pending} className="w-full rounded-lg bg-emerald-800 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:opacity-60">
        {pending ? (isSignup ? "Creating account…" : "Signing in…") : (isSignup ? "Create account" : "Sign in")}
      </button>
      <p className="text-center text-sm text-slate-600">
        {isSignup ? (
          <>Already have an account? <Link href="/admin/login" className="font-semibold text-emerald-800 hover:underline">Sign in</Link></>
        ) : (
          <>Need an account? <Link href="/admin/signup" className="font-semibold text-emerald-800 hover:underline">Sign up</Link></>
        )}
      </p>
    </form>
  );
}
