import { FC } from "react";
import ModalPortal from "../modal/ModalPortal";
import Button from "../button/Button";
import { IConfirmProps } from "./Confirm";

interface IProps extends IConfirmProps {
  show: boolean;
  trueFn?: () => void;
  falseFn?: () => void;
}

const ConfirmComponent: FC<IProps> = ({ show, trueFn, falseFn, message, trueText, falseText }) => {
  if (!show) return null;

  return (
    <ModalPortal>
      <div className="absolute top-0 left-0 z-50 backdrop-blur-sm grid place-items-center w-full h-full">
        <div className="flex flex-col p-4 rounded-lg bg-slate-200 border-2 border-solid border-slate-400 max-w-2xl min-w-[36rem]">
          <h4 className="text-2xl">Confirm the action</h4>
          <p className="my-3">
            {message}
          </p>
          <div className="flex justify-end">
            <Button
              text={falseText}
              afterIcon="iconamoon:sign-times-circle-duotone"
              wrapperClassName="bg-red-500 text-white mx-2"
              onClick={falseFn}
            />
            <Button
              wrapperClassName="bg-green-500 text-white"
              text={trueText}
              afterIcon="iconamoon:check-circle-1-duotone"
              onClick={trueFn}
            />
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ConfirmComponent