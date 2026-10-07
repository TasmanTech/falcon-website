/**
 * Runs a callback once the page has loaded and the main thread is idle, so third-party
 * scripts don't compete with the first render.
 *
 * @param {() => void} callback - The work to defer.
 * @returns {() => void} A function that cancels the callback if it hasn't run yet.
 */
export function whenIdleAfterLoad(callback: () => void): () => void {
  let cancelled = false;
  const run = () => {
    if (!cancelled) callback();
  };
  const schedule = () => {
    if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 3000 });
    else setTimeout(run, 1);
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener("load", schedule);
  };
}
