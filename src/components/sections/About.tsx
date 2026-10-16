import { useState } from "react";
import { codingProfiles, achievements } from "@/data/achievements";
import { trackEvent } from "@/lib/analytics";

export function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-12 lg:py-28 border-t border-line">
      {/* Section Header */}
      <div className="flex items-center gap-3 font-mono text-xs text-muted mb-8">
        <span className="text-accent">&gt;</span>
        <h2 className="text-primary font-bold tracking-wide" tabIndex={-1}>
          about.md
        </h2>
        <span className="text-line">/</span>
        <span className="text-muted text-[11px]">profile &amp; background</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Prose & Highlights (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="font-sans text-muted leading-relaxed space-y-4 text-sm sm:text-base prose-width">
            <p>
              I began in Electrical Engineering at National Institute of Technology Raipur, where working with grid telemetry and mathematical modeling drew me naturally into software and distributed computing.
            </p>
            <p>
              Today, I build full-stack and backend systems in the energy sector at Mercados Energy Markets—engineering production bill verification platforms for 300+ power plants, high-throughput MongoDB services, and time-series demand forecasting pipelines.
            </p>
            <p>
              I focus on backend architecture: REST API design, concurrent queuing systems, data modeling, and query optimization. I hold a strong foundation in C++, Object-Oriented Programming, and Data Structures &amp; Algorithms (LeetCode contest rating 1927, Knight).
            </p>
          </div>

          {/* Coding profiles line */}
          <div className="pt-2 border-t border-line">
            <p className="font-mono text-xs text-primary font-bold mb-3 uppercase tracking-wider">
              Coding Profiles
            </p>
            <div className="flex flex-wrap gap-4 font-mono text-xs">
              {codingProfiles.map((cp) => (
                <a
                  key={cp.platform}
                  href={cp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("profile_click", { platform: cp.platform.toLowerCase(), source: "about" })}
                  className="inline-flex items-center gap-2 rounded-[2px] border border-line bg-surface px-3 py-1.5 text-muted hover:border-accent hover:text-primary transition-colors"
                >
                  <span className="text-accent font-bold">{cp.platform}:</span>
                  <span>{cp.stat}</span>
                  {cp.detail && <span className="text-signal text-[11px]">({cp.detail})</span>}
                </a>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="pt-2 border-t border-line">
            <p className="font-mono text-xs text-primary font-bold mb-2 uppercase tracking-wider">
              Achievements
            </p>
            <ul className="space-y-2 font-mono text-xs text-muted">
              {achievements.map((ach, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-accent shrink-0">•</span>
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Photo panel `whoami` (5 cols) */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <div className="w-full max-w-[320px] rounded-md border border-line bg-surface overflow-hidden group">
            {/* Panel title bar */}
            <div className="flex items-center justify-between border-b border-line px-3 py-2 bg-surface-2/40 font-mono text-xs text-muted">
              <span>whoami</span>
              <span className="text-[10px] text-accent">portrait</span>
            </div>

            {/* Photo frame with scanline & duotone treatment */}
            <div className="relative aspect-[4/5] w-full bg-surface-2 flex items-center justify-center overflow-hidden">
              {!imgError ? (
                <>
                  <img
                    src="/images/profile.jpg"
                    alt="Rashmiprakash Satapathy"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover transition-all duration-300 filter grayscale contrast-125 sepia-[0.3] hue-rotate-[140deg] group-hover:filter-none group-hover:scale-[1.02]"
                  />
                  {/* Subtle scanline overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,32,40,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]"
                    aria-hidden
                  />
                </>
              ) : (
                /* ASCII / Initials styled avatar fallback */
                <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 font-mono">
                  <div className="h-20 w-20 rounded-full border border-accent/40 bg-surface flex items-center justify-center text-accent text-2xl font-bold tracking-wider">
                    RS
                  </div>
                  <div className="space-y-1">
                    <p className="text-primary text-xs font-bold">Rashmiprakash Satapathy</p>
                    <p className="text-muted text-[11px]">Software Engineer</p>
                    <p className="text-accent text-[10px]">NIT Raipur (2021–2025)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
