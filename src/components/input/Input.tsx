import { DetailedHTMLProps, InputHTMLAttributes, LegacyRef, forwardRef } from "react";
import { Icon } from "@iconify/react";
import { useToggle } from "../../hooks/useToggle";

type IProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  beforeIcon?: string;
  afterIcon?: string;
  wrapperClassName?: string;
  multiline?: boolean;
};

const Input = forwardRef<unknown, IProps>((props, ref) => {
  const {
    className = "",
    beforeIcon,
    afterIcon,
    wrapperClassName,
    multiline,
    ...rest
  } = props;

  const showPassword = useToggle(false);
  const focus = useToggle(false);

  return (
    <div
      className={`border-2 border-solid rounded-lg relative flex items-center h-full transition-colors ${
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
      {multiline ? (
        <textarea
          className={"p-2 w-full resize-y rounded-lg".concat(
            className?.length ? ` ${className}` : ""
          )}
          //@ts-ignore
          ref={ref as unknown as LegacyRef<HTMLTextAreaElement>}
          {...rest}
        />
      ) : (
        <input
          className={"p-2 w-full rounded-lg".concat(
            className?.length ? ` ${className}` : ""
          )}
          ref={ref as unknown as LegacyRef<HTMLInputElement>}
          {...rest}
          type={showPassword.state ? "text" : rest.type}
        />
      )}
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

Input.displayName = "Input";

export default Input;
