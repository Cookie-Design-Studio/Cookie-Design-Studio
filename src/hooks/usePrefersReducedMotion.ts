import { useSyncExternalStore } from "react";

const REDUCE_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCE_MOTION_QUERY).matches;
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const mql = window.matchMedia(REDUCE_MOTION_QUERY);
  const handler = () => onStoreChange();

  // 兼容旧版 Safari（仅支持 addListener/removeListener）
  if ("addEventListener" in mql) {
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }

  const legacyMql = mql as MediaQueryList & {
    addListener?: (cb: (event: MediaQueryListEvent) => void) => void;
    removeListener?: (cb: (event: MediaQueryListEvent) => void) => void;
  };
  legacyMql.addListener?.(handler);
  return () => legacyMql.removeListener?.(handler);
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
