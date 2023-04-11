import { IUniversity } from "@/demo/universities";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useMemo, useState } from "react";
import styles from "./universityDescriptionCard.module.css";

const UniversityDescriptoinCard: FC<IUniversity> = ({ name, createdAt }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleUnivSelect = (id: string) => {
    !!id ? setSelectedId(id) : setSelectedId(null);
  };

  const closeDescription = () => setSelectedId(null);

  const UniDescription = useMemo(
    () => (
      <AnimatePresence>
        {selectedId && (
          <div className={styles.card_wrapper}>
            <motion.div
              layoutId={selectedId}
              className="rounded-xl bg-slate-400 p-4 w-1/2"
            >
              <motion.h5>{name}</motion.h5>
              <motion.h6>{createdAt.toJSON()}</motion.h6>
              <motion.button onClick={closeDescription}>Close</motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    ),
    [name, createdAt, selectedId]
  );

  return (
    <>
      <motion.div
        className="rounded-lg bg-slate-300 mt-2 p-3 cursor-pointer"
        layoutId={name}
        onClick={() => handleUnivSelect(name)}
      >
        <motion.h5>{name}</motion.h5>
        <motion.h6>{createdAt.toJSON()}</motion.h6>
      </motion.div>
      {UniDescription}
    </>
  );
};

export default UniversityDescriptoinCard;
