"use client";

import { useEffect, useState } from "react";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** True on touch / coarse-pointer devices, where double-click/tap is unreliable. */
export function useCoarsePointer(): boolean {
  return useMediaQuery("(pointer: coarse)");
}

/** True when the OS surface is in its single-column "mobile" layout. */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 640px)");
}
