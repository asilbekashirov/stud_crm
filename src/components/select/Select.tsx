import { motion, Variants } from "framer-motion";
import { useToggle } from "../../hooks/useToggle";
import { FC } from "react";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

interface IProps {
    children: React.ReactNode
    text: React.ReactNode
}

const Select: FC<IProps> = ({children, text}) => {
  const open = useToggle(false);

  return (
    <motion.div className="" initial={false} animate={open.state ? "open" : "closed"}>
      <motion.button
        className="flex items-center justify-center rounded-lg bg-primary-900 p-2"
        whileTap={{ scale: 0.97 }}
        onClick={() => open.toggle()}
      >
        {text}
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
      </motion.button>
      <motion.ul
      className="py-2 rounded-lg bg-primary-900 w-max mt-1"
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
        {
            (Array.isArray(children) && children.map(child => (
                <motion.li className="cursor-pointer py-1 px-4 transi hover:bg-primary-1000 w-full" variants={itemVariants}>
                    {child}
                </motion.li>
            )))
        }
      </motion.ul>
    </motion.div>
  );
};

export default Select;
