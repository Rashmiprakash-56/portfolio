import { useState, useEffect, useCallback, useRef } from "react";
import Lenis from "lenis";
import { SkipLink } from "@/components/shell/SkipLink";
import { ExplorerRail } from "@/components/shell/ExplorerRail";
import { StatusBar } from "@/components/shell/StatusBar";
import { MobileSheet } from "@/components/shell/MobileSheet";
import { BootSequence } from "@/components/shell/BootSequence";
import { CommandPalette } from "@/components/terminal/CommandPalette";
import { PanelLeftOpen } from "lucide-react";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { SectionId } from "@/hooks/useScrollSpy";

export default function App() {
  const { activeId, scrollProgress } = useScrollSpy();
  const prefersReduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [isEmailHighlighted, setIsEmailHighlighted] = useState(false);
  const emailRowRef = useRef<HTMLDivElement>(null);

  // Collapsible sidebar state with localStorage persistence
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem("portfolio_sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("portfolio_sidebar_collapsed", String(next));
      } catch {
        // Safe fallback
      }
      return next;
    });
  }, []);

  // Keyboard shortcut Ctrl+B / Cmd+B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        if (
          document.activeElement?.tagName !== "INPUT" &&
          document.activeElement?.tagName !== "TEXTAREA"
        ) {
          e.preventDefault();
          toggleSidebar();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // Initialize Lenis smooth scroll — spec §8.2
  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({ lerp: 0.1 });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  // Navigate to section: Lenis scroll + hash update + accessible heading focus
  const navigateTo = useCallback(
    (id: string) => {
      const cleanId = id.replace(/^#/, "");
      const el = document.getElementById(cleanId);
      if (!el) return;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: cleanId === "top" ? 0 : -32 });
      } else {
        el.scrollIntoView({ behavior: prefersReduced ? "instant" : "smooth" });
      }

      window.history.pushState(null, "", `#${cleanId}`);

      const heading = el.querySelector("h2, h1, h3");
      if (heading instanceof HTMLElement) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    },
    [prefersReduced],
  );

  // Briefly highlight the contact email row (triggered by contact command or sudo hire-me)
  const triggerEmailHighlight = useCallback(() => {
    setIsEmailHighlighted(true);
    setTimeout(() => {
      setIsEmailHighlighted(false);
    }, 2500);
  }, []);

  return (
    <>
      <SkipLink />
      <BootSequence />

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onNavigate={navigateTo}
        onHighlightEmail={triggerEmailHighlight}
      />

      <MobileSheet activeId={activeId} onNavigate={(id) => navigateTo(id as SectionId)} />

      {/* Collapsible desktop explorer rail */}
      <ExplorerRail
        activeId={activeId}
        onNavigate={(id) => navigateTo(id as SectionId)}
        collapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      {/* Floating expand button when sidebar is collapsed */}
      {isSidebarCollapsed && (
        <button
          onClick={toggleSidebar}
          className="fixed left-4 top-4 z-30 hidden lg:flex items-center gap-2 rounded-[2px] border border-line bg-surface/90 backdrop-blur-sm px-2.5 py-1.5 font-mono text-xs text-muted hover:border-accent hover:text-primary transition-all cursor-pointer"
          title="Expand sidebar (Ctrl+B)"
          aria-label="Expand sidebar"
        >
          <PanelLeftOpen size={14} className="text-accent" />
          <span className="text-[11px]">explorer</span>
        </button>
      )}

      {/* Main content pane with dynamic margin based on sidebar state */}
      <main
        id="main-content"
        className={`min-h-screen overflow-x-hidden pb-12 pt-12 lg:pt-0 transition-all duration-200 ${
          isSidebarCollapsed ? "lg:ml-0" : "lg:ml-[240px]"
        }`}
      >
        <Hero onNavigate={navigateTo} onHighlightEmail={triggerEmailHighlight} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact emailRowRef={emailRowRef} isEmailHighlighted={isEmailHighlighted} />
      </main>

      {/* Status bar with dynamic offset and sidebar toggle button */}
      <StatusBar
        activeId={activeId}
        scrollProgress={scrollProgress}
        onOpenPalette={() => setPaletteOpen(true)}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />
    </>
  );
}
