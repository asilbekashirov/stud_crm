import { useToggle } from "@/hooks/useToggle";
import { Icon } from "@iconify/react";
import { FC, useMemo } from "react";

interface IProps {
  initialState?: boolean;
  checkedIcon?: string;
  uncheckedIcon?: string;
  text?: string;
  trueText?: string;
  falseText?: string;
  callback?: () => any
}

const Checkbox: FC<IProps> = ({ initialState, checkedIcon, trueText, falseText, callback, uncheckedIcon, text }) => {
  const checked = useToggle(initialState || false);

  const icons = useMemo(() => {
    return {
      checked: checkedIcon || "iconamoon:check-circle-1-duotone",
      unchecked: uncheckedIcon || "iconamoon:sign-times-circle-duotone",
    };
  }, [checkedIcon, uncheckedIcon]);

  const handleCheckBoxState = () => {
    callback && callback()
    checked.toggle()
  }

  return (
    <div className="flex items-center p-2 cursor-pointer" onClick={handleCheckBoxState}>
      <Icon className={`${checked.state ? "text-green-500" : "text-red-500"}`} width={25} icon={checked.state ? icons.checked : icons.unchecked} />
      {
        !!(text || trueText || falseText) && (
            <p className="ml-1">{!!text ? text : checked.state ? trueText : falseText}</p>
        )
      }
    </div>
  );
};

export default Checkbox;
