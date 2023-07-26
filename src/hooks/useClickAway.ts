import { useCallback, useEffect, useRef } from "react";

export function useClickAway<T extends HTMLElement>(closeFn: (e?: any) => any) {
  const wrapperRef = useRef<null | T>(null);

  useEffect(() => {
    window.addEventListener("click", clickAway);

    return () => window.removeEventListener("click", clickAway);
  }, []);

  const clickAway = useCallback((e: MouseEvent) => {
    if (!wrapperRef.current) return;

    if (!wrapperRef.current?.contains(e.target as Node)) {
      closeFn();
    }
  }, [wrapperRef]);

  return { wrapperRef };
}
