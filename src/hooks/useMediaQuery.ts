import { useEffect, useState } from "react";

const screenSizes = {
    sm: 767,
    md: 1023,
    lg: 1024
}

export function useMediaQuery(breakPoint: "sm" | "md" | "lg"): boolean {

    const [matches, setMatches] = useState(false);

    const handleResize = () => {
        if (window.innerWidth <= screenSizes[breakPoint]) {
            // if (matches) return
            setMatches(true);
        } else {
            // if (!matches) return
            setMatches(false);
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return matches

}