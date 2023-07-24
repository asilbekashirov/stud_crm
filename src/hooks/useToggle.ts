import { useState } from "react";

export function useToggle(initialState: boolean) {
    const [state, setState] = useState<boolean>(initialState);

    const on = () => setState(true);
    const off = () => setState(false);
    const toggle = () => setState(!state);

    return { state, on, off, toggle };

}