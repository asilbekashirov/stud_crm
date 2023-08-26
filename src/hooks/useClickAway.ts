import { useEffect, useRef } from "react";

export function useClickAway<T extends HTMLElement>(closeFn: (e?: any) => any, open: boolean) {
  const wrapperRef = useRef<null | T>(null);

  useEffect(() => {
    window.addEventListener("click", clickAway);

    return () => window.removeEventListener("click", clickAway);
  }, []);

  const clickAway = (e: MouseEvent) => {
    if (!wrapperRef.current && !open) return;

    if (!wrapperRef.current?.contains(e.target as Node)) {
      closeFn();
    }
  }

  return { wrapperRef };
}
