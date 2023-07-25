import { motion, Variants } from "framer-motion";
import { useToggle } from "../../hooks/useToggle";
import { FC, MouseEventHandler, useState } from "react";

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
}

interface IProps {
  text: React.ReactNode;
  hideIcon?: boolean;
  onChange?: (e: React.ChangeEvent) => void;
  iterable: IIterable[]
}

const Select: FC<IProps> = ({ text, hideIcon, onChange, iterable }) => {
  const open = useToggle(false);
  const [value, setValue] = useState<string | null>(null)

  const handleSelect = (data: string) => {
    setValue(data)
    open.off()
  }

  return (
    <motion.div
      className=""
      initial={false}
      animate={open.state ? "open" : "closed"}
    >
      <motion.button
        className="flex items-center relative justify-center rounded-lg bg-primary-900 p-2"
        whileTap={{ scale: 0.97 }}
        onClick={() => open.toggle()}
      >
        {text}
        {!hideIcon && (
          <motion.div
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 },
            }}
            className="px-2"
            transition={{ duration: 0.2 }}
            style={{ originY: 0.55 }}
          >
            <svg width="15" height="15" viewBox="0 0 20 20">
              <path d="M0 7 L 20 7 L 10 16" />
            </svg>
          </motion.div>
        )}
      </motion.button>
      <motion.ul
        className="py-2 rounded-lg bg-primary-900 absolute top-full left-0 z-50 w-max mt-1"
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: open.state ? "auto" : "none" }}
      >
        {iterable.length &&
          iterable.map((item) => (
            <motion.li
                onClick={() => handleSelect(item.value)}
              className="cursor-pointer py-1 px-4 transi hover:bg-primary-1000 w-full"
              variants={itemVariants}
              value={item.value}
            >
              {item.name}
            </motion.li>
          ))}
      </motion.ul>
    </motion.div>
  );
};

export default Select;
