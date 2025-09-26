"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  async function handleGoogle() {
    try {
      await signIn("google", { callbackUrl: "/dashboard", redirect: true });
    } catch (e) {
      console.error("Google sign-in failed", e);
      // fallback hard redirect if something intercepts signIn
      window.location.href = "/api/auth/signin?provider=google";
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md rounded-2xl border p-6 space-y-4">
        <div className="flex items-center gap-2 justify-center">
          <img src="/logo/EVenly.png" alt="Evenly" className="h-5" />
          <span className="font-semibold">Evenly</span>
        </div>

        <h1 className="text-xl font-semibold text-center">Welcome back</h1>

        <button
          type="button"
          onClick={handleGoogle}
          className="w-full rounded-xl border px-4 py-2 hover:bg-muted/60"
        >
          Continue with Google
        </button>

        <div className="text-xs text-muted-foreground text-center">
          or with email (placeholder)
        </div>

        <input className="w-full rounded-xl border px-3 py-2" placeholder="you@example.com" />
        <input className="w-full rounded-xl border px-3 py-2" placeholder="••••••••" type="password" />

        <button className="w-full rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Sign in
        </button>

        <div className="text-sm text-center">
          New to Evenly? <a href="/signup" className="text-blue-600 hover:underline">Create an account</a>
        </div>
      </div>
    </main>
  );
}
