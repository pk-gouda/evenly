"use client";
import { useEffect, useState } from "react";

/**
 * Temporary user source:
 * Reads { preferredName: "…" } from localStorage under "evenly_user".
 * Example to test in DevTools: localStorage.setItem("evenly_user", JSON.stringify({ preferredName:"Prathik" }))
 * Replace this with your real auth session later (e.g., NextAuth/Cognito/your API).
 */
export function useUser() {
  const [user, setUser] = useState({ preferredName: "there" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("evenly_user");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.preferredName) setUser({ preferredName: parsed.preferredName });
      }
    } catch (_) {
      // ignore
    }
  }, []);

  return user;
}
