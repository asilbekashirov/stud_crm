import { useToggle } from "@/hooks/useToggle";
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";
import { Icon } from "@iconify/react";

type IProps = DetailedHTMLProps<
InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
>& {
  beforeIcon?: string;
  afterIcon?: string;
  wrapperClassName?: string;
};

const Input = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { className = "", beforeIcon, afterIcon, wrapperClassName, ...rest } = props;

  const showPassword = useToggle(false);
  const focus = useToggle(false);

  return (
    <div
      className={`border-2 border-solid rounded-lg relative flex items-center h-ful transition-colors ${
        focus.state
          ? "border-primary-1000 shadow-primary-900"
          : "border-accent-900"
      }`.concat(` ${wrapperClassName}`)}
      onFocus={() => focus.on()}
      onBlur={() => focus.off()}
    >
      {!!beforeIcon && (
        <div className="p-2 bg-slate-200 flex h-full rounded-l-md">
          <Icon
            icon={beforeIcon}
            width={25}
            className={focus.state ? " text-primary-1000 " : ""}
          />
        </div>
      )}
      <input
        className={"p-2 w-full rounded-lg".concat(
          className?.length ? ` ${className}` : ""
        )}
        ref={ref}
        type={showPassword.state ? "text" : rest.type}
        {...rest}
      />
      {rest.type === "password" && (
        <div
          className="cursor-pointer px-1"
          onClick={() => showPassword.toggle()}
        >
          <Icon
            icon={`${
              showPassword.state
                ? "iconamoon:eye-off-duotone"
                : "iconamoon:eye-duotone"
            }`}
            width={25}
          />
        </div>
      )}
      {!!afterIcon && (
        <div className="p-2">
          <Icon icon={afterIcon} width={25} />
        </div>
      )}
    </div>
  );
});

export default Input;
