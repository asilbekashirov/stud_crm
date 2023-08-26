import { motion, Variants } from "framer-motion";
import { useToggle } from "../../hooks/useToggle";
import { FC, MouseEventHandler, useMemo, useState } from "react";
import { useClickAway } from "../../hooks/useClickAway";
import { Icon } from "@iconify/react";
import Card from "../card/Card";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

interface IIterable {
  name: string;
  value: string;
  icon?: string;
}

interface IProps {
  // text: React.ReactNode;
  hideIcon?: boolean;
  onChange: (e: string) => void;
  iterable: IIterable[];
  initialValue?: string;
  className?: string;
}

const Select: FC<IProps> = ({ hideIcon, className, onChange, iterable, initialValue }) => {
  const open = useToggle(false);
  const [value, setValue] = useState<string | undefined>(initialValue);
  const memoValue = useMemo(() => {
    return iterable.find((item) => item.value === value);
  }, [value]);

  // const { wrapperRef } = useClickAway<HTMLDivElement>(() => open.off(), open.state);

  const handleSelect = (data: string) => {
    setValue(data);
    open.off();
    onChange(data);
  };

  const selectItem = (data: string) => {
    setValue(data)
    onChange(data)
  }

  return (
    <div onClick={() => open.toggle()} className={["relative", className].join(" ")}>
      <select className="hidden"></select>
      <div className="px-2 py-1 rounded-md border-primary-700 cursor-pointer border-2">{value}</div>
      {open.state && (
        <Card className="absolute top-full left-0 z-[100]">
          <div>
            {iterable.map(item => (
              <li className="px-2 cursor-pointer py-1 flex justify-between hover:bg-primary-700 rounded-md" key={item.value} onClick={() => selectItem(item.value)}>
                {item.name}
                {item.icon && (<Icon width={20} icon={item.icon} />)}
              </li>
            ))}
          </div>
        </Card>
      )}
    </div>
  );

  // return (
  //   <motion.div
  //     initial={false}
  //     animate={open.state ? "open" : "closed"}
  //     ref={wrapperRef}
  //   >
  //     <motion.button
  //       className="flex items-center capitalize relative justify-center rounded-lg p-2"
  //       whileTap={{ scale: 0.97 }}
  //       onClick={() => open.toggle()}
  //     >
  //       {memoValue?.icon &&
  //         <Icon icon={memoValue.icon} className="mr-2" />
  //       }
  //       {memoValue?.value}
  //       {!hideIcon && (
  //         <motion.div
  //           variants={{
  //             open: { rotate: 180 },
  //             closed: { rotate: 0 },
  //           }}
  //           className="px-2"
  //           transition={{ duration: 0.2 }}
  //           style={{ originY: 0.55 }}
  //         >
  //           <svg width="15" height="15" viewBox="0 0 20 20">
  //             <path d="M0 7 L 20 7 L 10 16" />
  //           </svg>
  //         </motion.div>
  //       )}
  //     </motion.button>
  //     <motion.ul
  //       className="py-2 rounded-lg bg-primary-800 absolute top-full left-0 z-50 w-max mt-1"
  //       variants={{
  //         open: {
  //           clipPath: "inset(0% 0% 0% 0% round 10px)",
  //           transition: {
  //             type: "spring",
  //             bounce: 0,
  //             duration: 0.7,
  //             delayChildren: 0.3,
  //             staggerChildren: 0.05,
  //           },
  //         },
  //         closed: {
  //           clipPath: "inset(10% 50% 90% 50% round 10px)",
  //           transition: {
  //             type: "spring",
  //             bounce: 0,
  //             duration: 0.3,
  //           },
  //         },
  //       }}
  //       style={{ pointerEvents: open.state ? "auto" : "none" }}
  //     >
  //       {iterable.length &&
  //         iterable.map((item) => (
  //           <motion.li
  //             key={item.value}
  //             onClick={() => handleSelect(item.value)}
  //             className="cursor-pointer flex items-center py-1 px-4 text-lg text-text-900 hover:bg-primary-700 w-full"
  //             variants={itemVariants}
  //             value={item.value}
  //           >
  //             {item.icon && <Icon icon={item.icon} className="mr-2" />}
  //             {item.name}
  //           </motion.li>
  //         ))}
  //     </motion.ul>
  //   </motion.div>
  // );
};

export default Select;
