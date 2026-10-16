import { useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const BOOT_LINES = [
  "initialising kernel...",
  "mounting filesystem /projects...",
  "loading profile & experience logs...",
  "network stack online...",
  "ready.",
];

export function BootSequence() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  const completeBoot = useCallback(() => {
    setFadingOut(true);
    setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("portfolio_boot_seen", "true");
      } catch {
        // Safe fallback
      }
    }, 250);
  }, []);

  useEffect(() => {
    if (prefersReduced) {
      return;
    }

    try {
      const alreadySeen = sessionStorage.getItem("portfolio_boot_seen");
      if (alreadySeen) return;
    } catch {
      // Ignore
    }

    setVisible(true);

    // Progression of boot lines (total duration <= 1.2s)
    let line = 0;
    const interval = window.setInterval(() => {
      line++;
      if (line < BOOT_LINES.length) {
        setCurrentLineIndex(line);
      } else {
        clearInterval(interval);
        setTimeout(completeBoot, 200);
      }
    }, 200);

    // Skip on click, keypress, or wheel
    const handleSkip = () => {
      clearInterval(interval);
      completeBoot();
    };

    window.addEventListener("click", handleSkip, { once: true });
    window.addEventListener("keydown", handleSkip, { once: true });
    window.addEventListener("wheel", handleSkip, { once: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("click", handleSkip);
      window.removeEventListener("keydown", handleSkip);
      window.removeEventListener("wheel", handleSkip);
    };
  }, [prefersReduced, completeBoot]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-bg font-mono text-xs text-muted transition-opacity duration-300 pointer-events-none select-none ${
        fadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-sm px-6 space-y-1">
        {BOOT_LINES.slice(0, currentLineIndex + 1).map((text, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-accent">&gt;</span>
            <span className={idx === currentLineIndex ? "text-primary font-bold" : "text-muted"}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
