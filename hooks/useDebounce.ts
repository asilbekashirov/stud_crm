import { useEffect, useState } from "react";

export function useDebounce(value: string, timeOut: number) {

    const [newValue, setNewValue] = useState<string>("")

    useEffect(() => {

        const timeOutId = setTimeout(() => {
            setNewValue(value)
        }, timeOut)

        return () => clearTimeout(timeOutId)

    }, [value, timeOut])

    return newValue
}