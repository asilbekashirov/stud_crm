import { useToggle } from "../../hooks/useToggle";
import ModalPortal from "./ModalPortal";
import { FC, ReactNode, useEffect, useMemo, useRef } from "react";
import Button from "../button/Button";
import Card from "../card/Card";
import Separator from "../separator/Separator";

interface IProps {
  btnText: string;
  btnClassName?: string;
  rounded?: boolean;
  children: ReactNode;
  falseText?: string;
  trueText?: string;
  center?: boolean;
  icon?: string;
  noActions?: boolean;
  className?: string
}

const Modal: FC<IProps> = ({
  btnText,
  rounded,
  falseText,
  trueText,
  children,
  icon,
  center,
  btnClassName,
  noActions,
  className
}) => {
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

  const Content = () => (
    <div className={[modalWrapClassName, className].join(" ")}>
        <Card>
          {children}
          {!noActions && (
            <>
              <Separator direction="horizontal" className="my-2" />
              <div className="flex justify-end gap-2">
                <Button
                  wrapperClassName="bg-red-500"
                  text={!!falseText ? falseText : "Close"}
                  onClick={() => modal.off()}
                />
                <Button
                  wrapperClassName="bg-green-500"
                  text={!!trueText ? trueText : "Accept"}
                />
              </div>
            </>
          )}
        </Card>
    </div>
  );

  const modalWrapClassName = useMemo(() => {
    return `${
      center
        ? "absolute w-full top-0 right-0 h-screen z-[100] backdrop-blur-md grid place-items-center"
        : "absolute top-full right-0 z-[100]"
    }`;
  }, [center]);

  return (
    <div className="relative" ref={modalRef}>
      <Button
        text={btnText}
        onClick={() => modal.toggle()}
        afterIcon={icon}
        wrapperClassName={[
          "cursor-pointer",
          rounded ? "rounded-full" : "",
          btnClassName,
        ].join(" ")}
      />
      {modal.state ? (
        center ? (
          <ModalPortal>{<Content />}</ModalPortal>
        ) : (
          <Content />
        )
      ) : null}
    </div>
  );
};

export default Modal;
