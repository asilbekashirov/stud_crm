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

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
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
        className="absolute flex justify-center items-center top-1/2 w-10 h-10 right-1 opacity-40 hover:opacity-100 p-2 rounded-full bg-slate-200 z-20"
        onClick={() => paginate(1)}
      >
        <Icon icon="iconamoon:player-next-duotone" width={25} />
      </div>
      <div
        className="absolute flex justify-center items-center top-1/2 w-10 h-10 left-1 opacity-40 hover:opacity-100 p-2 rounded-full bg-slate-200 z-20"
        onClick={() => paginate(-1)}
      >
        <Icon icon="iconamoon:player-previous-duotone" width={25} />
      </div>
    </>
  );
};

export default Slideshow;
