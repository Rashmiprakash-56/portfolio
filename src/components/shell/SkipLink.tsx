/**
 * Skip link — first focusable element on the page.
 * Spec §10: "Skip to content" as the first focusable element.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed top-0 left-0 z-50 -translate-y-full bg-accent px-4 py-2 font-mono text-sm text-bg transition-transform focus:translate-y-0"
    >
      Skip to content
    </a>
  );
}
