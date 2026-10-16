import React, { useState } from "react";
import { profile } from "@/data/profile";
import { copyToClipboard } from "@/lib/clipboard";
import { trackEvent } from "@/lib/analytics";

interface ContactProps {
  emailRowRef?: React.RefObject<HTMLDivElement>;
  isEmailHighlighted?: boolean;
}


export function Contact({ emailRowRef, isEmailHighlighted }: ContactProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    trackEvent("email_copy", { source: "contact_section" });
    const ok = await copyToClipboard(profile.email);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEmailLinkClick = () => {
    trackEvent("email_link_click", { source: "contact_section" });
  };

  return (
    <section id="contact" className="px-4 py-20 pb-28 sm:px-6 lg:px-12 lg:py-28 lg:pb-32 border-t border-line">
      {/* Section Header */}
      <div className="flex items-center gap-3 font-mono text-xs text-muted mb-8">
        <span className="text-accent">&gt;</span>
        <h2 className="text-primary font-bold tracking-wide" tabIndex={-1}>
          contact.sh
        </h2>
        <span className="text-line">/</span>
        <span className="text-muted text-[11px]">direct channels</span>
      </div>

      <div className="space-y-6">
        <p className="font-sans text-sm sm:text-base text-muted prose-width">
          Email is the best way to reach me. I respond to direct inquiries regarding software engineering roles, distributed systems, and backend development.
        </p>

        {/* Terminal output box */}
        <div className="w-full rounded-md border border-line bg-surface p-6 sm:p-8 font-mono text-xs space-y-4">
          <div className="flex items-center gap-2 text-primary pb-2 border-b border-line">
            <span className="text-accent font-bold">$</span>
            <span>contact</span>
          </div>

          <div className="space-y-3 pt-2">
            {/* Email row */}
            <div
              ref={emailRowRef}
              className={`flex flex-wrap items-center justify-between gap-3 p-2 rounded transition-colors duration-500 ${
                isEmailHighlighted
                  ? "bg-accent/15 border-b-2 border-accent"
                  : "hover:bg-surface-2"
              }`}
            >
              <div className="flex items-center gap-4 sm:gap-8">
                <span className="text-muted w-20 shrink-0">email</span>
                <a
                  href={`mailto:${profile.email}?subject=Hello%20Rashmiprakash`}
                  onClick={handleEmailLinkClick}
                  className="text-primary hover:text-accent underline break-all font-medium"
                >
                  {profile.email}
                </a>
              </div>
              <button
                onClick={handleCopyEmail}
                className="rounded-[2px] border border-line bg-surface-2 px-2.5 py-1 text-[11px] text-muted hover:border-accent hover:text-accent transition-colors cursor-pointer"
              >
                {copied ? "Copied" : "copy"}
              </button>
            </div>

            {/* LinkedIn row */}
            <div className="flex items-center justify-between gap-3 p-2 rounded hover:bg-surface-2 transition-colors">
              <div className="flex items-center gap-4 sm:gap-8">
                <span className="text-muted w-20 shrink-0">linkedin</span>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("profile_click", {
                      platform: "linkedin",
                      source: "contact",
                    })
                  }
                  className="text-primary hover:text-accent underline break-all"
                >
                  linkedin.com/in/rpsatapathy04
                </a>
              </div>
              <span className="text-[11px] text-muted">external ↗</span>
            </div>

            {/* GitHub row */}
            <div className="flex items-center justify-between gap-3 p-2 rounded hover:bg-surface-2 transition-colors">
              <div className="flex items-center gap-4 sm:gap-8">
                <span className="text-muted w-20 shrink-0">github</span>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("profile_click", {
                      platform: "github",
                      source: "contact",
                    })
                  }
                  className="text-primary hover:text-accent underline break-all"
                >
                  github.com/Rashmiprakash-56
                </a>
              </div>
              <span className="text-[11px] text-muted">external ↗</span>
            </div>
          </div>
        </div>

        {/* Footer line per spec §7.7: Name and year only. No "made with love" filler. */}
        <div className="pt-12 text-center sm:text-left font-mono text-xs text-muted">
          <p>© {new Date().getFullYear()} Rashmiprakash Satapathy</p>
        </div>
      </div>
    </section>
  );
}
