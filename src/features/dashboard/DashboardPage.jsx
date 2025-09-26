"use client";

import React from "react";
import { useSession, signIn } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  if (status === "loading") return null;

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="rounded-2xl border p-6 text-center space-y-4">
          <h1 className="text-xl font-semibold">Please sign in to view your dashboard</h1>
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  const preferredName = session.user?.name || "there";

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Welcome back, {preferredName}!</h1>
      {/* ...rest of your dashboard cards... */}
    </main>
  );
}
