import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { experience } from "@/data/experience";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 40%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  /**
   * Helper to highlight quantified values with accent color
   * Quantified metrics: 300+, 100K+, 10M+, 50%, under 3% MAPE, 12%, 40%
   */
  const highlightMetrics = (text: string) => {
    const regex = /(300\+|100K\+|10M\+|50%|under 3% MAPE|12%|40%)/g;
    const parts = text.split(regex);
    return parts.map((part, i) => {
      if (part.match(regex)) {
        return (
          <span key={i} className="text-accent font-semibold">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section id="experience" className="px-4 py-20 sm:px-6 lg:px-12 lg:py-28 border-t border-line">
      {/* Section Header */}
      <div className="flex items-center gap-3 font-mono text-xs text-muted mb-8">
        <span className="text-accent">&gt;</span>
        <h2 className="text-primary font-bold tracking-wide" tabIndex={-1}>
          experience.log
        </h2>
        <span className="text-line">/</span>
        <span className="text-muted text-[11px]">career history</span>
      </div>

      <div ref={containerRef} className="relative">
        {/* Company Header Block */}
        <div className="mb-8 pl-8 sm:pl-10">
          <h3 className="font-mono text-lg sm:text-xl font-bold text-primary">
            Mercados Energy Markets India Limited
          </h3>
          <p className="font-mono text-xs text-muted mt-1">
            Energy market analytics &amp; software development
          </p>
        </div>

        {/* Timeline wrapper */}
        <div className="relative pl-8 sm:pl-10 space-y-12">
          {/* Vertical scroll-drawn line */}
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-line">
            {!prefersReduced ? (
              <motion.div
                style={{ scaleY, transformOrigin: "top" }}
                className="w-full h-full bg-accent"
              />
            ) : (
              <div className="w-full h-full bg-accent/60" />
            )}
          </div>

          {/* Roles */}
          {experience.map((role, idx) => (
            <div key={idx} className="relative space-y-3">
              {/* Git commit-style node marker */}
              <div className="absolute -left-[27px] sm:-left-[35px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg" />

              {/* Role title and dates */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h4 className="font-mono text-base font-bold text-primary">
                  {role.title}
                </h4>
                <span className="font-mono text-xs text-muted">
                  {role.start} — {role.end}
                </span>
              </div>

              {/* Verbatim bullets with highlighted metrics */}
              <ul className="space-y-2.5 font-sans text-sm sm:text-base text-muted leading-relaxed prose-width">
                {role.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2">
                    <span className="text-accent shrink-0 mt-1 font-mono text-xs">›</span>
                    <span>{highlightMetrics(bullet)}</span>
                  </li>
                ))}
              </ul>

              {/* Stack as plain mono text separated by commas (no pill chips §7.3) */}
              <div className="pt-2">
                <p className="font-mono text-xs text-muted">
                  <span className="text-primary font-medium">Stack: </span>
                  {role.stack.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
