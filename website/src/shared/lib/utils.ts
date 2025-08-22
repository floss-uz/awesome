// eslint-disable-next-line
export const debounce = <T extends (...args: any[]) => any>(callback: T, ms: number) => {
  let timeoutId: number;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.call(null, ...args);
    }, ms)
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !("matchMedia" in window)) {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToTop(options?: {
  element?: HTMLElement | Window;
  behavior?: ScrollBehavior;
}): void {
  const { element = window, behavior } = options ?? {};

  // Default behavior: smooth if no reduced motion, auto otherwise
  const finalBehavior: ScrollBehavior =
    behavior ?? (prefersReducedMotion() ? "auto" : "smooth");

  if (element instanceof Window) {
    element.scrollTo({ top: 0, behavior: finalBehavior });
  } else if (element instanceof HTMLElement) {
    element.scrollTo({ top: 0, behavior: finalBehavior });
  } else {
    throw new Error("Invalid scroll target: must be a Window or HTMLElement");
  }
}
