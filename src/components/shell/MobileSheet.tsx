import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, FileText, FolderOpen, Terminal } from "lucide-react";
import { navItems } from "@/lib/navigation";
import { profile } from "@/data/profile";
import type { SectionId } from "@/hooks/useScrollSpy";

interface MobileSheetProps {
  activeId: SectionId;
  onNavigate: (id: SectionId) => void;
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
 * Mobile navigation — spec §5.5:
 * "Rail collapses to a slim top bar with the name and a menu button
 *  opening a Radix Dialog sheet with the same tree."
 */
export function MobileSheet({ activeId, onNavigate }: MobileSheetProps) {
  const [open, setOpen] = useState(false);

  function handleNav(id: SectionId) {
    onNavigate(id);
    setOpen(false);
  }

  return (
    <>
      {/* Top bar — visible <1024px */}
      <header className="fixed top-0 left-0 z-30 flex h-12 w-full items-center justify-between border-b border-line bg-surface px-4 lg:hidden">
        <span className="font-mono text-sm text-primary">
          {profile.shortName}
        </span>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              className="flex items-center justify-center rounded-[2px] p-1.5 text-muted hover:bg-surface-2 hover:text-primary"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-bg/80" />
            <Dialog.Content className="fixed right-0 top-0 z-50 flex h-screen w-[280px] flex-col border-l border-line bg-surface">
              {/* Sheet header */}
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <Dialog.Title className="font-mono text-xs text-muted">
                  explorer
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    className="rounded-[2px] p-1 text-muted hover:bg-surface-2 hover:text-primary"
                    aria-label="Close navigation menu"
                  >
                    <X size={16} />
                  </button>
                </Dialog.Close>
              </div>

              {/* Nav items */}
              <nav aria-label="Section navigation" className="flex-1 overflow-y-auto px-2 py-3">
                <ul className="space-y-0.5">
                  {navItems.map((item) => {
                    const Icon =
                      iconMap[item.label as keyof typeof iconMap] ?? FileText;
                    const isActive = activeId === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => handleNav(item.id)}
                          className={`flex w-full items-center gap-2.5 rounded-[2px] px-3 py-2 text-left font-mono text-sm transition-colors duration-150 ${
                            isActive
                              ? "bg-accent/10 text-accent"
                              : "text-muted hover:bg-surface-2 hover:text-primary"
                          }`}
                          aria-current={isActive ? "true" : undefined}
                        >
                          <Icon
                            size={15}
                            className={
                              isActive ? "text-accent" : "text-muted"
                            }
                            aria-hidden
                          />
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Identity */}
              <Dialog.Description asChild>
                <div className="border-t border-line px-4 py-4">
                  <p className="font-mono text-xs text-muted">
                    {profile.shortName}
                  </p>
                  <p className="font-mono text-xs text-muted opacity-60">
                    {profile.role}
                  </p>
                </div>
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </header>
    </>
  );
}
