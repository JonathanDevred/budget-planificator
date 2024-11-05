"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  const currentTheme = theme || "light";

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-4 pr-24">
      <Button
        onClick={toggleTheme}
        className={`w-8 h-8 flex items-center justify-center rounded border border-gray-300 transition-colors duration-200 ${
          currentTheme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
        aria-label="Toggle theme"
      >
        {currentTheme === "light" ? (
          <Sun className="h-4 w-4 text-yellow-500" /> 
        ) : (
          <Moon className="h-4 w-4 text-blue-500" /> 
        )}
      </Button>
    </div>
  );
}
