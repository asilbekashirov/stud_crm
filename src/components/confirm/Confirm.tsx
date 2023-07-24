import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import ConfirmComponent from "./ConfirmComponent";
import { useToggle } from "../../hooks/useToggle";

const defaultData = ({message, trueText, falseText}: IConfirmProps) => new Promise<boolean>((resolve, reject) => {})

const ConfirmDialog = createContext(defaultData)

interface IProps {
    children: React.ReactNode
}

export interface IConfirmProps {
    message: string
    trueText: string
    falseText: string
}

export function ConfirmDialogProvider({children}: IProps) {
    const open = useToggle(false)
    const [state, setState] = useState<IConfirmProps>({
        message: "",
        trueText: "",
        falseText: ""
    })

    const fn = useRef<(prop: boolean) => void>(() => {})

    const confirm = useCallback((data: IConfirmProps): Promise<boolean> => {
        return new Promise((resolve) => {
            open.on()
            setState(data)

            fn.current = (val: boolean) => {
                resolve(val)
                open.off()
                setState({
                    message: "",
                    trueText: "",
                    falseText: ""
                })
            }
        })
    }, [open])

    return (
        <ConfirmDialog.Provider value={confirm}>
            {children}
            <ConfirmComponent 
                {...state}
                show={open.state}
                trueFn={() => fn.current(true)}
                falseFn={() => fn.current(false)}
            />
        </ConfirmDialog.Provider>
    )

}

export default function useConfirm() {
    return useContext(ConfirmDialog)
}