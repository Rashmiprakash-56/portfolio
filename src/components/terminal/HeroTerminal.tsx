import React, { useState, useEffect, useRef, useCallback } from "react";
import { executeCommand, type CommandContext } from "./registry";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LineItem {
  id: string;
  type: "input" | "output";
  text?: string;
  node?: React.ReactNode;
}

interface HeroTerminalProps {
  onNavigate: (sectionId: string) => void;
  onHighlightEmail?: () => void;
}

export function HeroTerminal({ onNavigate, onHighlightEmail }: HeroTerminalProps) {
  const prefersReduced = useReducedMotion();
  const [lines, setLines] = useState<LineItem[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTypingInitial, setIsTypingInitial] = useState(false);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [isReadyForInput, setIsReadyForInput] = useState(false);
  const [statsCount, setStatsCount] = useState({
    plants: 0,
    records: 0,
    etl: 0,
    mape: 3,
    rating: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoTypeTimerRef = useRef<number | null>(null);

  const commandContext: CommandContext = {
    scrollToSection: onNavigate,
    highlightEmailRow: onHighlightEmail,
    clearTerminal: () => setLines([]),
  };

  // Auto-scroll to bottom of terminal when lines update
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [lines, typedPrompt]);

  const finishAutoTypeInstantly = useCallback(() => {
    if (autoTypeTimerRef.current) {
      clearInterval(autoTypeTimerRef.current);
      autoTypeTimerRef.current = null;
    }
    setIsTypingInitial(false);
    setTypedPrompt("stats");
    setStatsCount({ plants: 300, records: 100, etl: 10, mape: 3, rating: 1927 });
    setLines([
      { id: "init-input", type: "input", text: "stats" },
      {
        id: "init-output",
        type: "output",
        node: (
          <div className="font-mono text-xs space-y-1 text-primary">
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
      },
    ]);
    setIsReadyForInput(true);
  }, []);

  // Initial auto-typing of "stats"
  useEffect(() => {
    if (prefersReduced) {
      finishAutoTypeInstantly();
      return;
    }

    const commandText = "stats";
    let index = 0;
    setIsTypingInitial(true);

    const timer = window.setInterval(() => {
      index++;
      setTypedPrompt(commandText.slice(0, index));
      if (index >= commandText.length) {
        clearInterval(timer);
        autoTypeTimerRef.current = null;
        setIsTypingInitial(false);

        // Stats count-up animation
        let progress = 0;
        const countTimer = window.setInterval(() => {
          progress += 0.1;
          if (progress >= 1) {
            clearInterval(countTimer);
            setStatsCount({ plants: 300, records: 100, etl: 10, mape: 3, rating: 1927 });
            setLines([
              { id: "init-input", type: "input", text: "stats" },
              {
                id: "init-output",
                type: "output",
                node: (
                  <div className="font-mono text-xs space-y-1 text-primary">
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
              },
            ]);
            setIsReadyForInput(true);
          } else {
            setStatsCount({
              plants: Math.round(300 * progress),
              records: Math.round(100 * progress),
              etl: Math.round(10 * progress),
              mape: 3,
              rating: Math.round(1927 * progress),
            });
          }
        }, 30);
      }
    }, 45);

    autoTypeTimerRef.current = timer;
    return () => {
      clearInterval(timer);
    };
  }, [prefersReduced, finishAutoTypeInstantly]);

  const handleContainerClick = () => {
    if (isTypingInitial) {
      finishAutoTypeInstantly();
    }
    // Only focus if not a touch device to prevent opening mobile keyboard automatically
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const runCommand = async (cmdToRun: string) => {
    if (!cmdToRun.trim()) return;
    const inputLine: LineItem = {
      id: `in-${Date.now()}`,
      type: "input",
      text: cmdToRun,
    };

    const res = await executeCommand(cmdToRun, commandContext);
    if (res.isClear) {
      setLines([]);
    } else {
      setLines((prev) => {
        const next = [...prev, inputLine];
        if (res.output) {
          next.push({
            id: `out-${Date.now()}`,
            type: "output",
            node: res.output,
          });
        }
        // Cap scrollback at 50 lines
        return next.slice(-50);
      });
    }
    setInputVal("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(inputVal);
  };

  return (
    <div className="w-full flex flex-col font-mono">
      {/* Terminal window panel */}
      <div
        onClick={handleContainerClick}
        className="w-full rounded-md border border-line bg-surface flex flex-col h-[320px] sm:h-[350px] shadow-none overflow-hidden cursor-text"
      >
        {/* Title bar - file path only, NO macOS dots (§6) */}
        <div className="flex items-center justify-between border-b border-line px-3 py-2 bg-surface-2/40">
          <span className="text-xs text-muted">visitor@rashmiprakash:~</span>
          <span className="text-[10px] text-muted opacity-60">bash</span>
        </div>

        {/* Scrollable output area */}
        <div
          ref={scrollContainerRef}
          aria-live="polite"
          className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs select-text"
        >
          {/* Initial typing phase */}
          {isTypingInitial && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <span className="text-accent">$</span>
                <span>{typedPrompt}</span>
                <span
                  className={`inline-block w-2 h-3.5 bg-accent ${
                    prefersReduced ? "" : "animate-pulse"
                  }`}
                />
              </div>
              {statsCount.plants > 0 && (
                <div className="font-mono text-xs space-y-1 text-muted">
                  <div className="flex justify-between py-0.5">
                    <span>power plants supported</span>
                    <span className="text-accent">{statsCount.plants}+</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>records optimized</span>
                    <span className="text-accent">{statsCount.records}K+</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>records processed (ETL)</span>
                    <span className="text-accent">{statsCount.etl}M+</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>leetcode rating</span>
                    <span className="text-accent">{statsCount.rating}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Rendered output lines */}
          {lines.map((item) => (
            <div key={item.id} className="space-y-1">
              {item.type === "input" ? (
                <div className="flex items-center gap-2 text-primary">
                  <span className="text-accent">$</span>
                  <span className="text-primary font-medium">{item.text}</span>
                </div>
              ) : (
                <div className="text-primary pl-4">{item.node}</div>
              )}
            </div>
          ))}

          {/* Interactive prompt */}
          {isReadyForInput && (
            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
              <label htmlFor="hero-terminal-input" className="text-accent font-bold select-none">
                $
              </label>
              <input
                id="hero-terminal-input"
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                autoComplete="off"
                spellCheck="false"
                aria-label="Terminal command input"
                className="flex-1 bg-transparent text-primary text-xs outline-none focus:outline-none"
              />
              <span
                className={`inline-block w-2 h-3.5 bg-accent shrink-0 ${
                  prefersReduced ? "" : "animate-pulse"
                }`}
                aria-hidden
              />
            </form>
          )}
        </div>

        {/* Hint footer bar */}
        <div className="border-t border-line px-3 py-1.5 text-[11px] text-muted flex items-center justify-between bg-surface-2/20">
          <span>type help, or press Ctrl K anywhere</span>
          <span className="hidden sm:inline text-[10px] opacity-70">Esc to blur</span>
        </div>
      </div>

      {/* Touch suggestion chips (plain mono text, no pills §9.1) */}
      <div className="mt-3 flex items-center gap-4 text-xs font-mono text-muted px-1">
        <span className="text-[11px] opacity-60">try:</span>
        <button
          onClick={() => runCommand("projects")}
          className="hover:text-accent cursor-pointer underline transition-colors"
        >
          projects
        </button>
        <button
          onClick={() => runCommand("resume")}
          className="hover:text-accent cursor-pointer underline transition-colors"
        >
          resume
        </button>
        <button
          onClick={() => runCommand("contact")}
          className="hover:text-accent cursor-pointer underline transition-colors"
        >
          contact
        </button>
      </div>
    </div>
  );
}
