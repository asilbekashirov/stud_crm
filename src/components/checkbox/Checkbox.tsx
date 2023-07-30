import { Icon } from "@iconify/react";
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useMemo,
} from "react";
import { useToggle } from "../../hooks/useToggle";

interface IProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  checkedIcon?: string;
  uncheckedIcon?: string;
  text?: string;
  trueText?: string;
  falseText?: string;
  callback?: () => any;
}

const Checkbox = forwardRef<HTMLInputElement, IProps>(
  (
    {
      id,
      checkedIcon,
      trueText,
      falseText,
      callback,
      uncheckedIcon,
      defaultChecked,
      text,
      ...rest
    },
    ref
  ) => {

    const checked = useToggle(!!rest.checked)

    const icons = useMemo(() => {
      return {
        checked: checkedIcon || "iconamoon:check-circle-1-duotone",
        unchecked: uncheckedIcon || "iconamoon:sign-times-circle-duotone",
      };
    }, [checkedIcon, uncheckedIcon]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.target.checked ? checked.on() : checked.off();
      rest.onChange && rest.onChange(e)
    }

    return (
      <div onClick={() => checked.toggle()}>
        <label
          htmlFor={id}
          className="flex text-text-900 items-center p-2 cursor-pointer"
        >
          <input
            id={id}
            type="checkbox"
            className="hidden"
            {...rest}
            onChange={handleChange}
            ref={ref}
          />
          <Icon
            className={`${checked.state ? "text-green-500" : "text-red-500"}`}
            width={25}
            icon={checked.state ? icons.checked : icons.unchecked}
          />
          {!!(text || trueText || falseText) && (
            <p className="ml-1">
              {!!text ? text : checked.state ? trueText : falseText}
            </p>
          )}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
