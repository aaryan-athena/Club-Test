"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { createSessionAction } from "@/app/auth/actions";
import { firebaseAuth, isFirebaseClientConfigured } from "@/lib/firebase/client";

const inputClass = "mt-2 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm shadow-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20";

type Mode = "login" | "signup";
type Notice = { error: boolean; text: string } | null;

// Codes that mean the person closed the Google popup themselves; no message needed.
const dismissedPopupCodes = new Set(["auth/popup-closed-by-user", "auth/cancelled-popup-request"]);

function authErrorMessage(error: unknown) {
  const code = error instanceof FirebaseError ? error.code : "";
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Log in instead.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/weak-password":
      return "Choose a stronger password (at least 8 characters).";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a few minutes and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    case "auth/popup-blocked":
      return "Your browser blocked the Google sign-in popup. Allow popups for this site and try again.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email. Log in with your email and password.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled yet.";
    case "auth/unauthorized-domain":
      return "This website's domain is not authorized for sign-in in Firebase.";
    default:
      return "Something went wrong. Please try again.";
  }
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.88-3.02c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.11A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.29 14.28A7.2 7.2 0 0 1 4.91 12c0-.79.14-1.56.38-2.28V6.61H1.28a12 12 0 0 0 0 10.78l4.01-3.11z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.28 6.61l4.01 3.11C6.23 6.88 8.88 4.77 12 4.77z" />
    </svg>
  );
}

export function AuthForm({ mode, nextPath }: { mode: Mode; nextPath?: string }) {
  const router = useRouter();
  const [notice, setNotice] = useState<Notice>(null);
  const [pending, setPending] = useState(false);
  const isSignup = mode === "signup";
  const nextQuery = nextPath ? `?next=${encodeURIComponent(nextPath)}` : "";

  if (!isFirebaseClientConfigured()) {
    return <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">Firebase is not configured. Add the NEXT_PUBLIC_FIREBASE_* values to your env file.</p>;
  }

  // Exchanges the Firebase ID token for the server's session cookie, then leaves the page.
  async function startSession(user: User) {
    const result = await createSessionAction(await user.getIdToken(), nextPath ?? "");
    if ("error" in result) {
      setNotice({ error: true, text: result.error });
      return;
    }
    router.replace(result.redirectTo);
    router.refresh();
  }

  async function handleGoogle() {
    setPending(true);
    setNotice(null);
    const auth = await firebaseAuth();

    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
      await startSession(user);
    } catch (error) {
      if (!(error instanceof FirebaseError && dismissedPopupCodes.has(error.code))) {
        setNotice({ error: true, text: authErrorMessage(error) });
      }
    } finally {
      await signOut(auth).catch(() => undefined);
      setPending(false);
    }
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
        setNotice({ error: false, text: `Account created. We sent a verification link to ${email}. Verify it, then log in.` });
        formElement.reset();
        return;
      }

      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (!user.emailVerified) {
        await sendEmailVerification(user);
        setNotice({ error: true, text: `Your email isn't verified yet. We sent a new verification link to ${email}.` });
        return;
      }
      await startSession(user);
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
    <div className="space-y-5">
      {notice ? (
        <p role={notice.error ? "alert" : "status"} className={`rounded-lg border px-4 py-3 text-sm ${notice.error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>
          {notice.text}
        </p>
      ) : null}

      <button type="button" onClick={handleGoogle} disabled={pending} className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:opacity-60">
        <GoogleIcon />
        {isSignup ? "Sign up with Google" : "Continue with Google"}
      </button>

      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        or
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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
          {pending ? "Please wait…" : (isSignup ? "Create account" : "Log in")}
        </button>
      </form>

      <p className="text-center text-sm text-slate-600">
        {isSignup ? (
          <>Already have an account? <Link href={`/login${nextQuery}`} className="font-semibold text-emerald-800 hover:underline">Log in</Link></>
        ) : (
          <>New here? <Link href={`/signup${nextQuery}`} className="font-semibold text-emerald-800 hover:underline">Create an account</Link></>
        )}
      </p>
    </div>
  );
}
