import type { Metadata } from "next";
import LeadMessage from "./LeadMessage";

export const metadata: Metadata = {
  title: "Lead Message",
  robots: { index: false, follow: false },
};

/**
 * Builds a lead message to paste into Telegram. Runs entirely in the browser,
 * so it needs no access token; the proxy still requires a session to reach it.
 *
 * @returns {JSX.Element} The page.
 */
export default function LeadMessagePage() {
  return <LeadMessage />;
}
