"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Users,
  Receipt,
  SplitSquareHorizontal,
  Wallet,
  FileDown,
  Shield,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";

/* Theme toggle */
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("theme");
    const system = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const startDark = stored ? stored === "dark" : system;
    document.documentElement.classList.toggle("dark", startDark);
    setIsDark(startDark);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  return (
    <button
      onClick={toggleTheme}
      className="rounded-xl border px-3 py-1 text-sm hover:bg-muted/50"
      aria-label="Toggle theme"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}

/* tiny UI primitives */
function Btn({ onClick, variant = "primary", size = "md", className = "", children }) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";
  const sizes = { md: "px-4 py-2 text-sm", lg: "px-5 py-2.5 text-base" };
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600",
    secondary: "bg-muted text-foreground hover:bg-muted/80 focus:ring-muted-foreground",
    ghost: "bg-transparent hover:bg-muted/40 focus:ring-muted-foreground",
  };
  const cls = [base, sizes[size], variants[variant], className].filter(Boolean).join(" ");
  return (
    <button className={cls} onClick={onClick}>{children}</button>
  );
}

function Card({ className = "", children }) {
  return <div className={"rounded-2xl border bg-background " + className}>{children}</div>;
}
function CardHeader({ className = "", children }) {
  return <div className={"p-4 border-b flex items-start " + className}>{children}</div>;
}
function CardTitle({ className = "", children }) {
  return <div className={"text-lg font-semibold " + className}>{children}</div>;
}
function CardContent({ className = "", children }) {
  return <div className={"p-4 " + className}>{children}</div>;
}

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2 select-none hover:opacity-90">
      <img src="/logo/EVenly.png" alt="Evenly logo" className="h-8 w-auto" />
      <span className="text-lg font-semibold tracking-tight">Evenly</span>
    </a>
  );
}

export default function EvenlyHomepage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Logo />
          <nav className="hidden gap-6 md:flex text-sm">
            {/* no Dashboard until after login */}
            <a href="#features" className="hover:opacity-80">Features</a>
            <a href="#how" className="hover:opacity-80">How it works</a>
            <a href="#pricing" className="hover:opacity-80">Pricing</a>
            <a href="#faq" className="hover:opacity-80">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="/signin" className="inline-flex"><Btn variant="ghost">Sign in</Btn></a>
            <a href="/signup" className="inline-flex"><Btn>Get started</Btn></a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              <Rocket className="h-3.5 w-3.5" />
              Launching MVP on AWS Free Tier
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Split expenses. <span className="text-blue-600 dark:text-blue-500">Budget smarter.</span>
            </h1>
            <p className="mt-4 max-w-prose text-muted-foreground">
              Evenly helps friends and groups track shared expenses, settle up cleanly, and stay on budget—with receipt OCR and a
              simplified “who pays whom” view.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="/signup" className="inline-flex"><Btn size="lg">Create your account</Btn></a>
              <a href="#features" className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-base bg-muted hover:bg-muted/80">
                See features
              </a>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Free while you’re small</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Works in dark & light mode</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Mobile-first</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <Card className="shadow-sm">
              <CardHeader><CardTitle className="text-lg">Quick demo</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Add an expense, choose split type, attach receipt, and let Evenly auto-calc shares.</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl border p-4"><Users className="mx-auto h-6 w-6" /><div className="mt-1 text-xs">Groups</div></div>
                  <div className="rounded-xl border p-4"><SplitSquareHorizontal className="mx-auto h-6 w-6" /><div className="mt-1 text-xs">Smart splits</div></div>
                  <div className="rounded-xl border p-4"><Receipt className="mx-auto h-6 w-6" /><div className="mt-1 text-xs">OCR receipts</div></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <h2 className="text-2xl font-semibold md:text-3xl">Everything you need to split and settle</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">From friends to housemates to trips—Evenly keeps balances fair and transparent.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Users, title: "Friends & Groups", desc: "Create groups, invite friends, track per-person balances." },
            { icon: SplitSquareHorizontal, title: "Smart Splits", desc: "Equal, percentage, shares, exact amounts, multi-payer." },
            { icon: Receipt, title: "Bill Vault + OCR", desc: "Upload receipts and auto-extract totals and dates." },
            { icon: Wallet, title: "Settlements", desc: "Minimal \"who pays whom\" transfers and activity log." },
            { icon: FileDown, title: "Export CSV", desc: "Download monthly reports for taxes or budgeting." },
            { icon: Shield, title: "Secure by default", desc: "Auth, input validation, and scoped access built-in." },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title}>
              <CardHeader className="gap-3">
                <div className="rounded-xl bg-blue-50 p-2 dark:bg-blue-900/30"><Icon className="h-5 w-5" /></div>
                <CardTitle className="text-base">{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="border-t border-b bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
          <h2 className="text-2xl font-semibold md:text-3xl">How Evenly works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { step: "1", title: "Create a group", text: "Invite friends or share a link. Set default currency." },
              { step: "2", title: "Add expenses", text: "Choose split type, add payers/participants, attach receipt." },
              { step: "3", title: "Settle up", text: "Follow simplified transfers and export a CSV if needed." },
            ].map(({ step, title, text }) => (
              <Card key={step}>
                <CardHeader>
                  <div className="text-xs text-muted-foreground">Step {step}</div>
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{text}</CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8"><a href="/signup" className="inline-flex"><Btn size="lg">Start for free</Btn></a></div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <h2 className="text-2xl font-semibold md:text-3xl">Pricing</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">Optimized for AWS Free Tier.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2 border-blue-600">
            <CardHeader><CardTitle className="text-xl">Free</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Unlimited groups</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Smart splits & settlements</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Receipt OCR (Tesseract)</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Export CSV</div>
              <div className="pt-3"><a href="/signup" className="inline-flex w-full"><Btn className="w-full">Get started</Btn></a></div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="faq" className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center">
          <Logo />
          <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Evenly. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
