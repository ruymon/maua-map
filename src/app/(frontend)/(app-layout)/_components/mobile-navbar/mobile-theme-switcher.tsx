"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Theme } from "@/stores/types/themes";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

const themeIconVariants: { [key in Theme]: ReactNode } = {
  light: <SunIcon className="w-6" />,
  dark: <MoonIcon className="w-6" />,
  system: <SunMoonIcon className="w-6" />,
} as const;

export function MobileThemeSwitcher() {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex w-full items-center justify-center">
        <Skeleton className="h-6 w-6 rounded-sm" />
      </div>
    );
  }

  function handleThemeSwitch() {
    if (resolvedTheme === "light") {
      setTheme("dark");
    }

    if (resolvedTheme === "dark") {
      setTheme("light");
    }
  }

  return (
    <button
      type="button"
      onClick={handleThemeSwitch}
      className="flex w-full items-center justify-center text-muted-foreground transition-all hover:text-accent-foreground dark:text-muted-foreground/50 dark:hover:text-muted-foreground"
    >
      {themeIconVariants[resolvedTheme as keyof typeof themeIconVariants]}
      <span className="sr-only">Tema</span>
    </button>
  );
}
