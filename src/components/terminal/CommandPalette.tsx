import React, { useState, useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Search } from "lucide-react";
import { executeCommand, publicCommands, type CommandContext } from "./registry";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (sectionId: string) => void;
  onHighlightEmail?: () => void;
}

export function CommandPalette({
  open,
  onOpenChange,
  onNavigate,
  onHighlightEmail,
}: CommandPaletteProps) {
  const [inputVal, setInputVal] = useState("");
  const [outputNode, setOutputNode] = useState<React.ReactNode | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandContext: CommandContext = {
    scrollToSection: onNavigate,
    highlightEmailRow: onHighlightEmail,
    closePalette: () => onOpenChange(false),
    clearTerminal: () => {
      setOutputNode(null);
      setInputVal("");
    },
  };

  // Keyboard shortcut listener: Cmd/Ctrl+K and /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      } else if (
        e.key === "/" &&
        !open &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        onOpenChange(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setOutputNode(null);
      setInputVal("");
      setHistoryIndex(-1);
    }
  }, [open]);

  const runCommand = async (cmdString: string) => {
    if (!cmdString.trim()) return;
    setHistory((prev) => [cmdString, ...prev]);
    setHistoryIndex(-1);
    const res = await executeCommand(cmdString, commandContext);
    if (!res.isClear) {
      setOutputNode(res.output);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(inputVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const prevIndex = historyIndex - 1;
        setHistoryIndex(prevIndex);
        setInputVal(history[prevIndex] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  const filteredSuggestions = inputVal.trim()
    ? publicCommands.filter((c) =>
        c.name.toLowerCase().startsWith(inputVal.trim().toLowerCase()),
      )
    : publicCommands.slice(0, 6);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/85 backdrop-blur-[1px]" />
        <Dialog.Content className="fixed left-1/2 top-[18%] z-50 w-full max-w-xl -translate-x-1/2 rounded-md border border-line bg-surface p-0 font-mono shadow-2xl focus:outline-none max-h-[80vh] flex flex-col">
          {/* Palette header */}
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5 bg-surface-2/40">
            <div className="flex items-center gap-2 text-xs text-muted">
              <Search size={14} className="text-accent" />
              <span>command palette</span>
            </div>
            <Dialog.Close asChild>
              <button
                className="rounded-[2px] p-1 text-muted hover:bg-surface-2 hover:text-primary cursor-pointer"
                aria-label="Close command palette"
              >
                <X size={15} />
              </button>
            </Dialog.Close>
          </div>

          {/* Input field */}
          <form onSubmit={handleSubmit} className="flex items-center border-b border-line px-4 py-3">
            <span className="text-accent font-bold mr-2 text-sm select-none">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command (try 'help', 'whoami', 'projects', 'resume')..."
              className="flex-1 bg-transparent text-sm text-primary placeholder:text-muted/60 focus:outline-none"
              spellCheck="false"
              autoComplete="off"
            />
          </form>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[50vh]">
            {/* Command output */}
            {outputNode && (
              <div className="rounded border border-line bg-surface-2/50 p-3 text-xs">
                {outputNode}
              </div>
            )}

            {/* Autocomplete / Suggested commands */}
            {!outputNode && (
              <div className="space-y-1">
                <p className="text-[11px] text-muted uppercase tracking-wider mb-2">
                  {inputVal ? "Matching commands" : "Suggested commands"}
                </p>
                <div className="space-y-1">
                  {filteredSuggestions.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        setInputVal(item.name);
                        runCommand(item.name);
                      }}
                      className="w-full flex items-center justify-between px-3 py-1.5 rounded-[2px] hover:bg-surface-2 text-left text-xs transition-colors group cursor-pointer"
                    >
                      <span className="text-accent group-hover:text-primary font-bold">
                        {item.name}
                      </span>
                      <span className="text-muted text-[11px]">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Palette footer */}
          <div className="border-t border-line px-4 py-2 text-[10px] text-muted flex items-center justify-between bg-surface-2/20">
            <span>↑↓ history · Enter to run · Esc to close</span>
            <span className="text-accent">rashmiprakash.dev</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
