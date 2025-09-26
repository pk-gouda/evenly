"use client";

import React from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

/* ---------- Small UI helpers ---------- */
function Field(props) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border px-3 py-2 bg-white/95 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

function Btn({ children, variant = "primary", className = "", ...rest }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600",
    ghost: "border text-foreground bg-transparent hover:bg-muted/40 focus:ring-muted-foreground",
    ghostDark:
      "border border-white/30 text-white bg-white/10 hover:bg-white/20 focus:ring-white/60",
    outline: "border text-foreground hover:bg-muted/40 focus:ring-muted-foreground",
  };
  return (
    <button className={[base, variants[variant], className].join(" ")} {...rest}>
      {children}
    </button>
  );
}

/* ---------- High-contrast shiny CTA for blue panel ---------- */
function ShinyCTA({ children, onClick, className = "" }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={[
        "relative inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-base",
        "bg-white text-blue-700 shadow-md focus:outline-none focus:ring-2 focus:ring-white",
        "overflow-hidden", // for shine sweep mask
        className,
      ].join(" ")}
    >
      {/* Shine sweep */}
      <motion.span
        aria-hidden
        initial={{ x: "-120%" }}
        whileHover={{ x: "120%" }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-white/40 blur-sm"
      />
      <span className="relative z-10">{children}</span>
      <ChevronRight className="relative z-10 h-4 w-4" />
    </motion.button>
  );
}

function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <img src="/logo/EVenly.png" alt="Evenly" className="h-5 w-auto" />
      <span className="font-semibold">Evenly</span>
    </Link>
  );
}

/* ---------- Main component ---------- */
export default function AuthSlider({ mode = "signin" }) {
  const [panel, setPanel] = React.useState(mode); // 'signin' | 'signup'
  const [err, setErr] = React.useState("");

  const [signin, setSignin] = React.useState({ email: "", password: "" });
  const [signup, setSignup] = React.useState({ name: "", email: "", password: "" });

  function toggle() {
    setErr("");
    setPanel((p) => (p === "signin" ? "signup" : "signin"));
  }

  async function onGoogle() {
    await signIn("google", { callbackUrl: "/dashboard", redirect: true });
  }

  const isEmail = (e) => /\S+@\S+\.\S+/.test(e);

  function handleSignin(e) {
    e.preventDefault();
    if (!isEmail(signin.email)) return setErr("Please enter a valid email.");
    if (!signin.password) return setErr("Please enter your password.");
    alert("Demo: wire this to your credentials backend or NextAuth Credentials.");
  }

  function handleSignup(e) {
    e.preventDefault();
    if (!signup.name.trim()) return setErr("Please enter your name.");
    if (!isEmail(signup.email)) return setErr("Please enter a valid email.");
    if (signup.password.length < 6) return setErr("Password must be at least 6 characters.");
    alert("Demo: POST to /api/auth/register then redirect to /dashboard.");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/40 text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Logo />

        <div className="mt-6 overflow-hidden rounded-3xl border bg-background shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* LEFT: form side (Sign In OR Sign Up) */}
            <div className="p-10">
              <AnimatePresence mode="wait">
                {panel === "signin" ? (
                  <motion.div
                    key="signin"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.6 }}
                    className="mx-auto max-w-md"
                  >
                    <h1 className="text-3xl font-semibold">Sign In</h1>

                    <div className="mt-5 flex justify-center">
                      <Btn variant="ghost" className="rounded-full shadow" onClick={onGoogle}>
                        Continue with Google
                      </Btn>
                    </div>

                    <div className="my-4 border-t" />
                    <div className="mb-3 text-center text-xs text-muted-foreground">
                      or sign in with email
                    </div>

                    <form onSubmit={handleSignin} className="space-y-3">
                      <Field
                        type="email"
                        placeholder="Email"
                        value={signin.email}
                        onChange={(e) => setSignin({ ...signin, email: e.target.value })}
                      />
                      <Field
                        type="password"
                        placeholder="Password"
                        value={signin.password}
                        onChange={(e) => setSignin({ ...signin, password: e.target.value })}
                      />
                      <div className="text-xs text-muted-foreground">Forgot Your Password?</div>
                      {err && <div className="text-sm text-red-600">{err}</div>}
                      <Btn type="submit" className="w-full">
                        SIGN IN
                      </Btn>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.6 }}
                    className="mx-auto max-w-md"
                  >
                    <h1 className="text-3xl font-semibold">Create Account</h1>

                    <div className="mt-5 flex justify-center">
                      <Btn variant="ghost" className="rounded-full shadow" onClick={onGoogle}>
                        Continue with Google
                      </Btn>
                    </div>

                    <div className="my-4 border-t" />
                    <div className="mb-3 text-center text-xs text-muted-foreground">
                      or create with email
                    </div>

                    <form onSubmit={handleSignup} className="space-y-3">
                      <Field
                        placeholder="Name"
                        value={signup.name}
                        onChange={(e) => setSignup({ ...signup, name: e.target.value })}
                      />
                      <Field
                        type="email"
                        placeholder="Email"
                        value={signup.email}
                        onChange={(e) => setSignup({ ...signup, email: e.target.value })}
                      />
                      <Field
                        type="password"
                        placeholder="Password"
                        value={signup.password}
                        onChange={(e) => setSignup({ ...signup, password: e.target.value })}
                      />
                      {err && <div className="text-sm text-red-600">{err}</div>}
                      <Btn type="submit" className="w-full">
                        SIGN UP
                      </Btn>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6">
                <Link href="/" className="text-sm text-muted-foreground hover:underline">
                  ← Back home
                </Link>
              </div>
            </div>

            {/* RIGHT: gradient panel with shiny CTA */}
            <div className="hidden md:block">
              <div className="h-full rounded-l-[2.5rem] bg-gradient-to-br from-blue-600 to-blue-500 p-10 text-white">
                {panel === "signin" ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-2 inline-flex items-center gap-2">
                      <img
                        src="/logo/EVenly.png"
                        alt="Evenly"
                        className="h-6 w-auto drop-shadow-sm"
                      />
                      <span className="sr-only">Evenly</span>
                    </div>
                    <h2 className="text-4xl font-semibold">Hi, new to Evenly?</h2>
                    <p className="mt-2 text-white/90">Register with Google or email</p>

                    <ShinyCTA className="mt-6" onClick={toggle}>
                      SIGN UP
                    </ShinyCTA>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <h2 className="text-4xl font-semibold">Welcome Back!</h2>
                    <p className="mt-2 text-white/90">Sign in with Google or email</p>

                    <ShinyCTA className="mt-6" onClick={toggle}>
                      SIGN IN
                    </ShinyCTA>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
