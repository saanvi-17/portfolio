import type Lenis from "lenis";

declare global {
  interface Window {
    /** Set by SmoothScroll provider; used by the anchor nav to smooth-scroll. */
    __lenis?: Lenis;
  }
}

export {};
