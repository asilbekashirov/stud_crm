import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { Icon } from "@iconify/react";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

interface IProps {
  images: string[];
}

const Slideshow: React.FC<IProps> = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="rounded-xl object-cover w-full absolute h-full"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        />
      </AnimatePresence>
      <div
        className="absolute cursor-pointer flex justify-center items-center top-1/2 w-10 h-10 right-1 opacity-40 hover:opacity-100 p-2 rounded-full bg-primary-700 z-20"
        onClick={() => paginate(1)}
      >
        <Icon icon="iconamoon:player-next-duotone" width={25} />
      </div>
      <div
        className="absolute cursor-pointer flex justify-center items-center top-1/2 w-10 h-10 left-1 opacity-40 hover:opacity-100 p-2 rounded-full bg-primary-700 z-20"
        onClick={() => paginate(-1)}
      >
        <Icon icon="iconamoon:player-previous-duotone" width={25} />
      </div>
    </>
  );
};

export default Slideshow;
