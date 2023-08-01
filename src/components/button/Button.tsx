import { Icon } from "@iconify/react";
import { ButtonHTMLAttributes, FC, forwardRef } from "react";

type IProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: React.ReactNode;
  beforeIcon?: string;
  afterIcon?: string;
  wrapperClassName?: string;
};

const Button = forwardRef<HTMLButtonElement, IProps>(
  ({ text, beforeIcon, afterIcon, wrapperClassName, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={[
          "text-center md:p-2 p-1 md:text-md text-sm cursor-pointer rounded-lg relative flex justify-center items-center h-ful transition-colors",
          wrapperClassName,
        ].join(" ")}
        {...rest}
      >
        {!!beforeIcon && (
          <div>
            <Icon icon={beforeIcon} width={25} className="text-inherit " />
          </div>
        )}

        <p className="text-text-900">{text}</p>

        {!!afterIcon && (
          <div className="ml-2">
            <Icon icon={afterIcon} className="text-inherit" width={20} />
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
