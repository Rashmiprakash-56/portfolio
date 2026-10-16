import React from "react";
import { profile, summary } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skills, skillGroupOrder } from "@/data/skills";
import { education } from "@/data/education";
import { copyToClipboard } from "@/lib/clipboard";

import { trackEvent } from "@/lib/analytics";

export interface CommandContext {
  scrollToSection: (id: string) => void;
  highlightEmailRow?: () => void;
  closePalette?: () => void;
  clearTerminal?: () => void;
}

export interface CommandResult {
  output: React.ReactNode;
  isClear?: boolean;
}

export const publicCommands = [
  { name: "help", desc: "List all available commands" },
  { name: "whoami", desc: "Print brief profile overview" },
  { name: "stats", desc: "Print headline engineering metrics" },
  { name: "ls", desc: "List all portfolio sections" },
  { name: "projects", desc: "List projects and links" },
  { name: "skills", desc: "List technical skills by category" },
  { name: "experience", desc: "List work experience history" },
  { name: "education", desc: "Print academic background" },
  { name: "resume", desc: "Download PDF resume" },
  { name: "contact", desc: "Jump to contact section" },
  { name: "email", desc: "Copy email address to clipboard" },
  { name: "github", desc: "Open GitHub profile in new tab" },
  { name: "linkedin", desc: "Open LinkedIn profile in new tab" },
  { name: "leetcode", desc: "Open LeetCode profile in new tab" },
  { name: "gfg", desc: "Open GeeksforGeeks profile in new tab" },
  { name: "clear", desc: "Clear terminal screen" },
];

export async function executeCommand(
  rawInput: string,
  ctx: CommandContext,
): Promise<CommandResult> {
  const trimmed = rawInput.trim();
  if (!trimmed) return { output: null };

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0]?.toLowerCase() ?? "";
  const arg = parts.slice(1).join(" ").toLowerCase();

  // Handle clear
  if (cmd === "clear") {
    ctx.clearTerminal?.();
    return { output: null, isClear: true };
  }

  // Handle cd / open
  if (cmd === "cd" || cmd === "open") {
    if (!arg) {
      return {
        output: <span className="text-muted">Usage: {cmd} &lt;section-or-project&gt;</span>,
      };
    }
    const cleanArg = arg.replace(/^[/#]/, "").replace(/\/$/, "");
    if (["about", "experience", "projects", "skills", "education", "contact", "top"].includes(cleanArg)) {
      ctx.scrollToSection(cleanArg);
      ctx.closePalette?.();
      return { output: <span className="text-accent">Navigating to #{cleanArg}...</span> };
    }
    const targetProject = projects.find((p) => p.id === cleanArg);
    if (targetProject) {
      ctx.scrollToSection(`project-${cleanArg}`);
      ctx.closePalette?.();
      return { output: <span className="text-accent">Opening project {targetProject.title}...</span> };
    }
    return {
      output: (
        <span className="text-muted">
          Target not found: &apos;{arg}&apos;. Try <span className="text-primary">ls</span> to see valid destinations.
        </span>
      ),
    };
  }

  // Hidden command: sudo hire-me
  if (trimmed === "sudo hire-me") {
    ctx.scrollToSection("contact");
    ctx.highlightEmailRow?.();
    ctx.closePalette?.();
    return {
      output: (
        <div className="space-y-1">
          <p className="text-accent">permission granted.</p>
          <p className="text-muted">Redirecting to contact channels...</p>
        </div>
      ),
    };
  }

  // Hidden command: rm -rf /
  if (trimmed === "rm -rf /" || trimmed.startsWith("rm -rf")) {
    return {
      output: <span className="text-signal">nice try. nothing was harmed.</span>,
    };
  }

  // Hidden command: exit
  if (cmd === "exit") {
    ctx.closePalette?.();
    return {
      output: <span className="text-muted">Terminal session active. Type &apos;help&apos; for commands.</span>,
    };
  }

  // Hidden command: git log
  if (trimmed === "git log") {
    return {
      output: (
        <div className="space-y-3 font-mono text-xs">
          {experience.map((exp, idx) => (
            <div key={idx} className="space-y-0.5">
              <p className="text-accent">
                commit {Math.random().toString(16).substring(2, 9)} ({exp.start} - {exp.end})
              </p>
              <p className="text-primary font-bold">{exp.title} @ {exp.company}</p>
              <p className="text-muted text-[11px]">{exp.stack.join(", ")}</p>
            </div>
          ))}
        </div>
      ),
    };
  }

  // Hidden command: neofetch
  if (cmd === "neofetch") {
    return {
      output: (
        <div className="grid grid-cols-1 gap-4 font-mono text-xs sm:grid-cols-2">
          <pre className="text-accent text-[10px] leading-tight select-none">
{`   _____ _____  ____  
  |  __ \\  __ \\/ ___| 
  | |__) | |__) \\___ \\ 
  |  _  /|  ___/ ___) |
  |_| \\_\\|_|    |____/ `}
          </pre>
          <div className="space-y-1 text-xs">
            <p className="text-primary font-bold">{profile.name}</p>
            <div className="h-px bg-line my-1" />
            <p><span className="text-muted">OS:</span> Web Workspace (Vite + React)</p>
            <p><span className="text-muted">Host:</span> {profile.role}</p>
            <p><span className="text-muted">Focus:</span> Backend &amp; Distributed Systems</p>
            <p><span className="text-muted">Languages:</span> C++, Python, SQL, JS, TS</p>
            <p><span className="text-muted">Databases:</span> PostgreSQL, Redis, MongoDB</p>
            <p><span className="text-muted">Rating:</span> LeetCode 1927 (Knight)</p>
            <p><span className="text-muted">Status:</span> <span className="text-signal">{profile.availability}</span></p>
          </div>
        </div>
      ),
    };
  }

  // Hidden command: cat resume.txt
  if (trimmed === "cat resume.txt" || trimmed === "cat resume") {
    return {
      output: (
        <div className="space-y-3 font-mono text-xs text-muted max-h-72 overflow-y-auto pr-2">
          <p className="text-primary font-bold">{profile.name} — {profile.role}</p>
          <p className="text-accent">{profile.email} | {profile.links.github}</p>
          <div className="h-px bg-line" />
          <p className="text-primary font-bold">SUMMARY</p>
          <p>{summary}</p>
          <div className="h-px bg-line" />
          <p className="text-primary font-bold">EXPERIENCE</p>
          {experience.map((e, i) => (
            <div key={i} className="space-y-1">
              <p className="text-primary">{e.title} — {e.company} ({e.start} - {e.end})</p>
              {e.bullets.map((b, bi) => (
                <p key={bi}>• {b}</p>
              ))}
            </div>
          ))}
          <div className="h-px bg-line" />
          <p className="text-primary font-bold">EDUCATION</p>
          <p>{education.institution} - {education.degree} in {education.field} (CGPA {education.cgpa})</p>
        </div>
      ),
    };
  }

  // Public commands
  switch (cmd) {
    case "help":
      return {
        output: (
          <div className="space-y-1 font-mono text-xs">
            <p className="text-muted mb-2">Available commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              {publicCommands.map((c) => (
                <div key={c.name} className="flex gap-2">
                  <span className="text-accent font-bold w-24 shrink-0">{c.name}</span>
                  <span className="text-muted text-[11px]">{c.desc}</span>
                </div>
              ))}
            </div>
            <p className="text-muted text-[11px] mt-2">
              Tip: type <span className="text-primary">open &lt;section&gt;</span> or <span className="text-primary">cd &lt;section&gt;</span> to jump.
            </p>
          </div>
        ),
      };

    case "whoami":
      return {
        output: (
          <div className="space-y-2 font-mono text-xs">
            <p className="text-primary font-bold">{profile.name}</p>
            <p className="text-muted leading-relaxed">{summary}</p>
            <p className="text-accent">{profile.availability}</p>
          </div>
        ),
      };

    case "stats":
      return {
        output: (
          <div className="font-mono text-xs space-y-1">
            <div className="flex justify-between border-b border-line pb-1 text-muted text-[11px]">
              <span>metric</span>
              <span>value</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-muted">power plants supported</span>
              <span className="text-accent font-bold">300+</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-muted">records optimized (MongoDB)</span>
              <span className="text-accent font-bold">100K+</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-muted">records processed (ETL)</span>
              <span className="text-accent font-bold">10M+</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-muted">forecast error</span>
              <span className="text-accent font-bold">&lt;3% MAPE</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-muted">leetcode rating</span>
              <span className="text-accent font-bold">1927 (Knight)</span>
            </div>
          </div>
        ),
      };

    case "ls":
      return {
        output: (
          <div className="space-y-1 font-mono text-xs">
            <p className="text-muted">Sections (use &apos;open &lt;name&gt;&apos; or &apos;cd &lt;name&gt;&apos;):</p>
            <div className="flex flex-wrap gap-3 pt-1">
              {["about", "experience", "projects", "skills", "education", "contact"].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    ctx.scrollToSection(s);
                    ctx.closePalette?.();
                  }}
                  className="text-accent hover:underline cursor-pointer"
                >
                  {s}/
                </button>
              ))}
            </div>
          </div>
        ),
      };

    case "projects":
      return {
        output: (
          <div className="space-y-3 font-mono text-xs">
            {projects.map((p) => (
              <div key={p.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      ctx.scrollToSection(`project-${p.id}`);
                      ctx.closePalette?.();
                    }}
                    className="text-accent font-bold hover:underline cursor-pointer text-left"
                  >
                    {p.title}
                  </button>
                </div>
                <p className="text-[11px] text-muted">{p.stack.join(" · ")}</p>
                <div className="flex gap-3 text-[11px]">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent underline"
                  >
                    GitHub
                  </a>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent underline"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ),
      };

    case "skills":
      return {
        output: (
          <div className="space-y-2 font-mono text-xs">
            {skillGroupOrder.map((group) => (
              <div key={group}>
                <span className="text-primary font-bold">{group}: </span>
                <span className="text-muted">{skills[group].join(", ")}</span>
              </div>
            ))}
          </div>
        ),
      };

    case "experience":
      return {
        output: (
          <div className="space-y-3 font-mono text-xs">
            <p className="text-primary font-bold">Mercados Energy Markets India Limited</p>
            {experience.map((e, idx) => (
              <div key={idx} className="pl-3 border-l border-line space-y-0.5">
                <p className="text-accent font-semibold">{e.title}</p>
                <p className="text-[11px] text-muted">{e.start} – {e.end}</p>
                <p className="text-[11px] text-muted">{e.stack.join(", ")}</p>
              </div>
            ))}
          </div>
        ),
      };

    case "education":
      return {
        output: (
          <div className="space-y-1 font-mono text-xs">
            <p className="text-primary font-bold">{education.institution}</p>
            <p className="text-muted">{education.degree} in {education.field}</p>
            <p className="text-accent">CGPA {education.cgpa} ({education.start} – {education.end})</p>
            <p className="text-[11px] text-muted">{education.location}</p>
          </div>
        ),
      };

    case "resume": {
      trackEvent("resume_download", { source: "terminal" });
      const link = document.createElement("a");
      link.href = profile.links.resume;
      link.download = "Rashmiprakash_Satapathy.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return {
        output: (
          <span className="text-accent">
            Downloading resume: {profile.links.resume}...
          </span>
        ),
      };
    }

    case "contact":
      ctx.scrollToSection("contact");
      ctx.highlightEmailRow?.();
      ctx.closePalette?.();
      return {
        output: (
          <div className="space-y-1 font-mono text-xs">
            <p className="text-accent">Navigating to contact section...</p>
            <p className="text-muted">Email: {profile.email}</p>
          </div>
        ),
      };

    case "email": {
      trackEvent("email_copy", { source: "terminal" });
      await copyToClipboard(profile.email);
      return {
        output: (
          <span className="text-accent">
            Copied {profile.email} to clipboard!
          </span>
        ),
      };
    }

    case "github":
      trackEvent("profile_click", { platform: "github", source: "terminal" });
      window.open(profile.links.github, "_blank", "noopener,noreferrer");
      return { output: <span className="text-muted">Opening GitHub in new tab...</span> };

    case "linkedin":
      trackEvent("profile_click", { platform: "linkedin", source: "terminal" });
      window.open(profile.links.linkedin, "_blank", "noopener,noreferrer");
      return { output: <span className="text-muted">Opening LinkedIn in new tab...</span> };

    case "leetcode":
      trackEvent("profile_click", { platform: "leetcode", source: "terminal" });
      window.open(profile.links.leetcode, "_blank", "noopener,noreferrer");
      return { output: <span className="text-muted">Opening LeetCode in new tab...</span> };

    case "gfg":
      trackEvent("profile_click", { platform: "geeksforgeeks", source: "terminal" });
      window.open(profile.links.geeksforgeeks, "_blank", "noopener,noreferrer");
      return { output: <span className="text-muted">Opening GeeksforGeeks in new tab...</span> };

    default:
      return {
        output: (
          <span className="text-muted">
            command not found: <span className="text-primary">{trimmed}</span>. try <span className="text-accent">help</span>.
          </span>
        ),
      };
  }
}
