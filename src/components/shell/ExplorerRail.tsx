import { FileText, FolderOpen, Terminal, PanelLeftClose } from "lucide-react";
import { navItems } from "@/lib/navigation";
import { profile } from "@/data/profile";
import type { SectionId } from "@/hooks/useScrollSpy";

interface ExplorerRailProps {
  activeId: SectionId;
  onNavigate: (id: SectionId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const iconMap = {
  "about.md": FileText,
  "experience.log": FileText,
  "projects/": FolderOpen,
  "skills.json": FileText,
  "education.md": FileText,
  "contact.sh": Terminal,
} as const;

/**
 * Explorer rail — desktop ≥1024px.
 * Fixed left, stops above the status bar (bottom-7) to eliminate any overlap.
 * Collapsible via toggle button or Ctrl+B shortcut.
 */
export function ExplorerRail({
  activeId,
  onNavigate,
  collapsed,
  onToggleCollapse,
}: ExplorerRailProps) {
  return (
    <aside
      className={`fixed left-0 top-0 bottom-7 z-30 hidden h-[calc(100vh-1.75rem)] flex-col border-r border-line bg-surface transition-all duration-200 ease-in-out lg:flex ${
        collapsed
          ? "w-0 -translate-x-full border-r-0 opacity-0 pointer-events-none"
          : "w-[240px] translate-x-0 opacity-100"
      }`}
    >
      {/* Header with collapse button */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3 bg-surface-2/30">
        <span className="font-mono text-xs tracking-wide text-muted font-medium">
          explorer
        </span>
        <button
          onClick={onToggleCollapse}
          className="rounded-[2px] p-1 text-muted hover:bg-surface-2 hover:text-primary transition-colors cursor-pointer"
          title="Collapse sidebar (Ctrl+B)"
          aria-label="Collapse sidebar"
        >
          <PanelLeftClose size={15} />
        </button>
      </div>

      {/* File tree */}
      <nav aria-label="Section navigation" className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = iconMap[item.label as keyof typeof iconMap] ?? FileText;
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`flex w-full items-center gap-2.5 rounded-[2px] px-3 py-1.5 text-left font-mono text-sm transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-muted hover:bg-surface-2 hover:text-primary"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <Icon
                    size={15}
                    className={isActive ? "text-accent" : "text-muted"}
                    aria-hidden
                  />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Identity block at bottom — safely above status bar */}
      <div className="border-t border-line px-4 py-3 bg-surface-2/20 shrink-0">
        <p className="font-mono text-xs text-primary font-medium">{profile.shortName}</p>
        <p className="font-mono text-[11px] text-muted opacity-75">
          {profile.role}
        </p>
      </div>
    </aside>
  );
}
