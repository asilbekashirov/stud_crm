import { useToggle } from "../../hooks/useToggle";
import ModalPortal from "./ModalPortal";
import { FC, ReactNode, useEffect, useRef } from "react";
import Button from "../button/Button";

interface IProps {
  btnText: string;
  rounded?: boolean;
  children: ReactNode;
  falseText?: string;
  trueText?: string;
}

const Modal: FC<IProps> = ({ btnText, rounded, falseText, trueText, children }) => {
  const modal = useToggle(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalRef.current) return;
    modal.state
      ? document.addEventListener("mousedown", handleClickAway)
      : document.removeEventListener("mousedown", handleClickAway);
  }, [modal.state, modalRef]);

  const handleClickAway = (e: MouseEvent): void => {
    //@ts-ignore
    if (modalRef.current && !modalRef.current?.contains(e.target)) {
      modal.off();
    }
  };

  return (
    <>
      <button onClick={() => modal.on()} className={`cursor-pointer ${rounded ? "rounded-full" : ""}`}>
        {btnText}
      </button>
      {modal.state && (
        <ModalPortal>
          <div ref={modalRef}>
            {children}
            <div>
              <Button wrapperClassName="bg-red-500" text={!!falseText ? falseText : "Close"} />
              <Button wrapperClassName="bg-green-500" text={!!trueText ? trueText : "Accept"} />
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
};

export default Modal;
