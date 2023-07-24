import { ReactNode } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({children}: {children: ReactNode}) => {
    return createPortal(children, document.querySelector("#modals") as Element)
}

export default ModalPortal