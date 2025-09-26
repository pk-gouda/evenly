"use client";
import React from "react";

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2 select-none hover:opacity-80">
      <img src="/logo/EVenly.png" alt="Evenly logo" className="h-8 w-auto" />
      <span className="text-lg font-semibold tracking-tight">Evenly</span>
    </a>
  );
}

export default function AuthLayout({ title, children, footer }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-background shadow">
        {/* Logo Header */}
        <div className="p-4 flex items-center justify-center border-b">
          <Logo />
        </div>

        {/* Page Title */}
        <div className="px-4 pt-4">
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-4">{children}</div>

        {/* Footer */}
        {footer ? (
          <div className="border-t p-4 text-sm text-center">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
