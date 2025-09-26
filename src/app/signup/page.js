"use client";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  async function handleGoogle() {
    try {
      await signIn("google", { callbackUrl: "/dashboard", redirect: true });
    } catch (e) {
      console.error("Google sign-up failed", e);
      window.location.href = "/api/auth/signin?provider=google";
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md rounded-2xl border p-6 space-y-4 text-center">
        <h1 className="text-xl font-semibold">Create your account</h1>
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full rounded-xl border px-4 py-2 hover:bg-muted/60"
        >
          Continue with Google
        </button>
      </div>
    </main>
  );
}
