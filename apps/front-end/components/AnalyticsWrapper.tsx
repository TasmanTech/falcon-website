"use client";

import React, { useState, useEffect } from "react";
import { whenIdleAfterLoad } from "@/lib/idle";

/**
 * Loads analytics (children) once the page has loaded and the browser is idle. Every visitor
 * is counted, including those who leave without interacting, and Google's tag checks can see
 * the tag.
 *
 * @param {React.ReactNode} children - The analytics scripts to load.
 * @returns {React.ReactNode} The children once the page is idle, otherwise nothing.
 */
export default function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    return whenIdleAfterLoad(() => setReady(true));
  }, [ready]);

  if (!ready) return null;

  return <>{children}</>;
}
