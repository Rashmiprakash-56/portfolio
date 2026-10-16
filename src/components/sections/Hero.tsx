import { useState } from "react";
import { profile } from "@/data/profile";
import { copyToClipboard } from "@/lib/clipboard";
import { trackEvent } from "@/lib/analytics";
import { HeroTerminal } from "@/components/terminal/HeroTerminal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroProps {
  onNavigate: (id: string) => void;
  onHighlightEmail?: () => void;
}

export function Hero({ onNavigate, onHighlightEmail }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleCopyEmail = async () => {
    trackEvent("email_copy", { source: "hero_button" });
    const ok = await copyToClipboard(profile.email);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadResume = () => {
    trackEvent("resume_download", { source: "hero_button" });
  };

  return (
    <section
      id="top"
      aria-label="Hero"
      className="flex min-h-[calc(100vh-3.5rem)] items-center px-4 py-12 sm:px-6 lg:px-12 lg:py-16"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left column: Identity block (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 rounded-[2px] border border-line bg-surface px-2.5 py-1 text-xs font-mono text-muted">
            <span
              className="inline-block h-2 w-2 rounded-full bg-signal shrink-0"
              aria-hidden
              style={{ animation: prefersReduced ? "none" : "pulse 3s ease-in-out infinite" }}
            />
            <span className="text-primary">{profile.availability}</span>
          </div>

          {/* H1 Name with block cursor */}
          <h1 className="font-mono text-3xl sm:text-4xl lg:text-3xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight text-primary leading-tight">
            <span className="inline-block">{profile.shortName}</span>{" "}
            <span className="inline-block">
              Satapathy
              <span
                className={`inline-block w-3 h-[1em] ml-2 align-middle bg-accent ${
                  prefersReduced ? "" : "animate-pulse"
                }`}
                aria-hidden
              />
            </span>
          </h1>


          {/* Descriptor */}
          <p className="font-sans text-lg sm:text-xl text-primary font-medium leading-snug max-w-xl">
            Backend engineer. APIs, data pipelines, and the infrastructure that keeps them running.
          </p>

          {/* Sub-line from resume */}
          <p className="font-sans text-sm sm:text-base text-muted leading-relaxed max-w-xl">
            Currently building a production bill verification platform for 300+ power plants at Mercados Energy Markets.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary: Download resume */}
            <a
              href={profile.links.resume}
              download="Rashmiprakash_Satapathy.pdf"
              onClick={handleDownloadResume}
              className="inline-flex items-center justify-center rounded-[2px] bg-accent px-4 py-2 font-mono text-xs font-bold text-bg transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Download resume
            </a>

            {/* Secondary: Copy email */}
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center rounded-[2px] border border-line bg-surface px-4 py-2 font-mono text-xs text-primary transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
            >
              {copied ? "Copied" : "Copy email"}
            </button>

            {/* Small icon links */}
            <div className="flex items-center gap-3 pl-2">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("profile_click", { platform: "github", source: "hero" })}
                className="text-muted hover:text-accent transition-colors"
                aria-label="GitHub Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("profile_click", { platform: "linkedin", source: "hero" })}
                className="text-muted hover:text-accent transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Terminal (5 cols on lg) */}
        <div className="lg:col-span-5 w-full">
          <HeroTerminal onNavigate={onNavigate} onHighlightEmail={onHighlightEmail} />
        </div>
      </div>
    </section>
  );
}
