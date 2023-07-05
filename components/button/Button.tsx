import { Icon } from "@iconify/react";
import { ButtonHTMLAttributes, FC } from "react";

type IProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: React.ReactNode;
  beforeIcon?: string;
  afterIcon?: string;
  wrapperClassName?: string;
};

const Button: FC<IProps> = ({
  text,
  beforeIcon,
  afterIcon,
  wrapperClassName,
  ...rest
}) => {
  return (
    <button
      className={`text-text-900 text-center p-2 cursor-pointer rounded-lg relative flex justify-center items-center h-ful transition-colors`.concat(
        ` ${wrapperClassName}`
      )}
      {...rest}
    >
      {!!beforeIcon && (
        <div>
          <Icon icon={beforeIcon} width={25} className="text-primary-1000 " />
        </div>
      )}

      <p>{text}</p>

      {!!afterIcon && (
        <div className="ml-2">
          <Icon icon={afterIcon} width={25} />
        </div>
      )}
    </button>
  );
};

export default Button;
