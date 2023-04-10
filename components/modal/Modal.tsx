import { useToggle } from "@/hooks/useToggle";
import ModalPortal from "./ModalPortal";
import { FC, ReactNode, useEffect, useRef } from "react";

interface IProps {
  btnText: string;
  rounded?: boolean;
  children: ReactNode
}

const Modal: FC<IProps> = (props) => {
  const { btnText, rounded, children } = props;
  const modal = useToggle(false);
  const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!modalRef.current) return
        modal.state ? 
            document.addEventListener("mousedown", handleClickAway)  :
            document.removeEventListener("mousedown", handleClickAway)
    }, [modal.state, modalRef])

  const handleClickAway = (e: MouseEvent): void => {
    //@ts-ignore
    if (modalRef.current && !modalRef.current?.contains(e.target)) {
        modal.off()
    }
  }

  return (
    <>
      <button
        className={`cursor-pointer ${rounded ? 'rounded-full' : ''}`}
      >
        {btnText}
        </button>
      {modal.state && (
        <ModalPortal>
          <div ref={modalRef}>
            {children}
          </div>
        </ModalPortal>
      )}
    </>
  );
};

export default Modal;
