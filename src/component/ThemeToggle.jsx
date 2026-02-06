"use client";
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) {
        const wantDark = stored === "dark";
        setIsDark(wantDark);
        if (wantDark) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
      } else {
        // respect existing class if present
        const hasDark = document.documentElement.classList.contains("dark");
        setIsDark(hasDark);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    try {
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    } catch (e) {}
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light" : "Switch to dark"}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
