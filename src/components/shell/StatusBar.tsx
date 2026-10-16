import { sectionLabels } from "@/lib/navigation";
import { profile } from "@/data/profile";
import type { SectionId } from "@/hooks/useScrollSpy";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface StatusBarProps {
  activeId: SectionId;
  scrollProgress: number;
  onOpenPalette?: () => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export function StatusBar({
  activeId,
  scrollProgress,
  onOpenPalette,
  isSidebarCollapsed,
  onToggleSidebar,
}: StatusBarProps) {
  return (
    <footer
      className={`fixed bottom-0 left-0 z-40 flex h-7 w-full items-center justify-between border-t border-line bg-surface px-3 font-mono text-xs text-muted transition-all duration-200 ${
        isSidebarCollapsed ? "lg:pl-3" : "lg:pl-[252px]"
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Toggle sidebar button (desktop only) */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="hidden lg:flex items-center justify-center p-0.5 rounded-[2px] text-muted hover:text-primary hover:bg-surface-2 transition-colors cursor-pointer mr-0.5"
            title={isSidebarCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen size={14} className="text-accent" />
            ) : (
              <PanelLeftClose size={14} />
            )}
          </button>
        )}

        {/* Section name */}
        <span className="text-primary font-medium">
          {sectionLabels[activeId]}
        </span>

        {/* Scroll progress */}
        <span>
          {scrollProgress}%
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Availability badge — signal dot per spec §5.2 */}
        <span className="flex items-center gap-1.5 text-[11px] sm:text-xs">
          <span
            className="inline-block h-2 w-2 shrink-0 rounded-full bg-signal"
            aria-hidden
            style={{ animation: "pulse 3s ease-in-out infinite" }}
          />
          <span className="truncate max-w-[130px] sm:max-w-none">{profile.availability}</span>
        </span>

        {/* Cmd/Ctrl+K hint */}
        <button
          onClick={onOpenPalette}
          className="hidden text-muted sm:inline hover:text-primary transition-colors cursor-pointer"
          title="Open Command Palette"
        >
          <kbd className="rounded-[2px] border border-line bg-surface-2 px-1.5 py-0.5 text-[10px]">
            Ctrl K
          </kbd>
        </button>
      </div>
    </footer>
  );
}
