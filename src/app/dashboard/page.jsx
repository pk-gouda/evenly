"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Coins,
  TrendingDown,
  TrendingUp,
  Users,
  Plus,
  ReceiptText,
  LogOut,
} from "lucide-react";

/** Small UI helpers */
const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border bg-white shadow-sm ${className}`}>{children}</div>
);
const CardHead = ({ children }) => (
  <div className="flex items-center justify-between border-b px-5 py-4">{children}</div>
);
const CardBody = ({ children }) => <div className="px-5 py-4">{children}</div>;
const Stat = ({ icon: Icon, label, value, tone = "emerald" }) => (
  <Card className="p-4">
    <div className="flex items-center gap-3">
      <div
        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg bg-${tone}-100 text-${tone}-700`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm text-neutral-500">{label}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  </Card>
);
const Button = ({ children, variant = "primary", className = "", ...rest }) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles = {
    primary:
      "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,.25)] hover:bg-blue-700 focus:ring-blue-600",
    ghost: "border text-neutral-800 bg-white hover:bg-neutral-50 focus:ring-neutral-400",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect guests to /signin
  React.useEffect(() => {
    if (status === "unauthenticated") router.replace("/signin");
  }, [status, router]);

  // Resolve display name: Google name OR locally saved preferred name OR email fallback
  const [preferredName, setPreferredName] = React.useState("");
  React.useEffect(() => {
    try {
      const p = localStorage.getItem("preferred_name");
      if (p) setPreferredName(p);
    } catch {}
  }, []);
  const name =
    preferredName ||
    session?.user?.name ||
    (session?.user?.email ? session.user.email.split("@")[0] : "friend");

  if (status === "loading") {
    return (
      <main className="min-h-[60vh] grid place-items-center text-neutral-600">
        Loading your dashboard…
      </main>
    );
  }
  if (!session) return null; // covered by redirect effect

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_60%)]">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <img src="/logo/EVenly.png" alt="Evenly" className="h-6 w-auto" />
            <span className="font-semibold">Evenly</span>
            <span className="ml-3 text-sm text-neutral-500">Split expenses with friends</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-neutral-600">
              Welcome back! <span className="font-medium">{name}</span>
            </span>
            <Button
              variant="ghost"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="!rounded-xl"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        {/* Stat row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={Coins} label="Total Balance" value="$0.00" tone="emerald" />
          <Stat icon={TrendingDown} label="You Owe" value="$0.00" tone="red" />
          <Stat icon={TrendingUp} label="You're Owed" value="$0.00" tone="emerald" />
          <Stat icon={Users} label="Groups" value="0" tone="blue" />
        </div>

        {/* 3-up panels */}
        <div className="grid gap-5 lg:grid-cols-3">
          {/* Quick actions */}
          <Card>
            <CardHead>
              <div>
                <div className="font-semibold">Quick Actions</div>
                <div className="text-sm text-neutral-500">
                  Get started with creating groups and adding expenses
                </div>
              </div>
            </CardHead>
            <CardBody className="space-y-3">
              <Button className="w-full !rounded-xl">
                <Plus className="h-4 w-4" />
                Create Group
              </Button>
              <Button variant="ghost" className="w-full !rounded-xl">
                <ReceiptText className="h-4 w-4" />
                Add Expense
              </Button>
            </CardBody>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHead>
              <div>
                <div className="font-semibold">Recent Activity</div>
                <div className="text-sm text-neutral-500">Latest updates from your groups</div>
              </div>
            </CardHead>
            <CardBody>
              <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
                <div className="text-2xl text-neutral-300">~</div>
                <div className="font-medium text-neutral-700">No recent activity</div>
                <div className="text-sm text-neutral-500">
                  Start by creating a group or adding an expense!
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Your Groups */}
          <Card>
            <CardHead>
              <div>
                <div className="font-semibold">Your Groups</div>
                <div className="text-sm text-neutral-500">Manage your expense groups</div>
              </div>
            </CardHead>
            <CardBody>
              <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
                <div className="text-2xl text-neutral-300">~</div>
                <div className="font-medium text-neutral-700">No groups yet</div>
                <div className="text-sm text-neutral-500">
                  Create your first group to start splitting expenses.
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Settled banner */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-emerald-700 bg-emerald-50">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            You’re all settled up! 🎉
          </div>
        </div>
      </div>
    </main>
  );
}
