import { useState, useEffect, useRef, useCallback } from "react";

const SECTION_IDS = [
  "top",
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/**
 * IntersectionObserver-based scroll spy.
 * Returns the ID of the section currently most visible in the viewport,
 * and a scroll progress percentage (0–100).
 */
export function useScrollSpy() {
  const [activeId, setActiveId] = useState<SectionId>("top");
  const [scrollProgress, setScrollProgress] = useState(0);
  const activeRef = useRef<SectionId>("top");

  // Track scroll progress
  const handleScroll = useCallback(() => {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    setScrollProgress(
      scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0,
    );
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Observe section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            if (id !== activeRef.current) {
              activeRef.current = id;
              setActiveId(id);
              window.history.replaceState(null, "", `#${id}`);
            }
          }
        }
      },
      {
        // Trigger when a section's top 20% is in the top 20% of the viewport
        rootMargin: "-10% 0px -80% 0px",
        threshold: 0,
      },
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return { activeId, scrollProgress, sectionIds: SECTION_IDS };
}
