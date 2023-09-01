import { useToggle } from "../../hooks/useToggle";
import { FC } from "react";
import { Icon } from "@iconify/react";
import Card from "../card/Card";

interface IIterable {
  name: string;
  value: string;
  icon?: string;
}

interface IProps {
  hideIcon?: boolean;
  onChange: (data: string) => void;
  iterable: IIterable[];
  initialValue?: string;
  className?: string;
  value: string;
  placeholder?: string
}

const Select: FC<IProps> = ({ hideIcon, placeholder, value, className, onChange, iterable }) => {
  const open = useToggle(false);

  const selectItem = (data: string) => {
   onChange(data);
  };

  return (
    <div
      onClick={() => open.toggle()}
      className={[
        "relative",
        className,
        open.state
          ? "border-secondary-800"
          : "border-primary-700 text-primary-700",
      ].join(" ")}
    >
      <div className="px-2 py-1 flex justify-between items-center h-10 rounded-md border-primary-700 cursor-pointer border-2">
        {value || placeholder}
        {!hideIcon && (
          <Icon
            className={["transition-transform", open.state ? "rotate-180" : "rotate-0"].join(" ")}
            icon="feather:chevron-down"
            width={20}
          />
        )}
      </div>
      {open.state && (
        <Card className="absolute top-full h-[max(w-full max-content)] left-0 z-[100]">
          <div className="w-full">
            {iterable.map((item) => (
              <li
                className="px-2 cursor-pointer hover:text-secondary-700 py-1 flex items-center gap-2 justify-between hover:bg-primary-700 rounded-md"
                key={item.value}
                onClick={() => selectItem(item.value)}
              >
                {item.icon && <Icon width={20} icon={item.icon} />}
                {item.name}
              </li>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Select;
