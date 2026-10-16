import { track } from "@vercel/analytics";

/**
 * Privacy-friendly event tracking — spec §13
 * Events: resume download, email copy, email link click, outbound project/profile clicks
 */
export function trackEvent(name: string, properties?: Record<string, string | number | boolean>) {
  try {
    track(name, properties);
  } catch {
    // Graceful no-op in local or non-Vercel environments
  }
}
