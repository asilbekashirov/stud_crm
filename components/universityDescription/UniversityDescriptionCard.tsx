import { IUniversity } from "@/demo/universities";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useMemo, useState } from "react";
import styles from "./universityDescriptionCard.module.css";
import { Icon } from "@iconify/react";
import { fDate } from "@/utils/date";

const UniversityDescriptoinCard: FC<IUniversity> = ({
  name,
  createdAt,
  description,
  programs,
  country,
  city,
  active
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleUnivSelect = (id: string) => {
    !!id ? setSelectedId(id) : setSelectedId(null);
  };

  const closeDescription = () => setSelectedId(null);

  const UniDescription = useMemo(
    () => (
      <AnimatePresence>
        <motion.div className={styles.card_wrapper}>
          <motion.div
            layoutId={selectedId!}
            className="rounded-lg bg-slate-200 p-4 w-1/2"
          >
            <motion.h5 className="text-2xl font-semibold mb-3">{name}</motion.h5>
            <motion.h6 className="flex items-center">
              <Icon className="mr-3" width={25} icon="mdi:map-marker-outline" /> Location:{" "}
              {country}, {city}
            </motion.h6>
            <motion.h6 className="flex items-center">
              <Icon className="mr-3" width={25} icon="mdi:calendar-month-outline" /> Found in:{" "}
              {fDate(createdAt)}
            </motion.h6>
            <motion.h6 className="flex items-center">
              <Icon className="mr-3" width={25} icon="mdi:file-document-multiple-outline" />{" "}
              Application is {active ? "open" : "closed"}
            </motion.h6>
            <motion.p className="mt-4">{description}</motion.p>
            <motion.div className="flex justify-end">
              <motion.button
                onClick={closeDescription}
                className="p-2 rounded-lg bg-red-500 text-white mr-2"
              >
                Close
              </motion.button>
              <motion.button className="p-2 rounded-lg bg-green-500 text-white">
                Add to list
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    ),
    [name, createdAt, selectedId]
  );

  return (
    <>
      <motion.div
        className="rounded-lg bg-slate-300 mt-2 p-3 cursor-pointer flex justify-between items-center w-4/5"
        layoutId={name}
        onClick={() => handleUnivSelect(name)}
      >
        <motion.div>
          <motion.h5 className="text-lg font-semibold">{name}</motion.h5>
          <motion.h6 className="flex items-center">
            <Icon width={20} className="mr-2" icon="mdi:map-marker-outline" /> Location:{" "}
            {country}, {city}
          </motion.h6>
          <motion.h6 className="flex items-center">
            <Icon width={20} className="mr-2" icon="mdi:calendar-month-outline" /> Found in:{" "}
            {fDate(createdAt)}
          </motion.h6>
          <motion.h6 className="flex items-center">
            <Icon width={20} className="mr-2" icon="mdi:file-document-multiple-outline" />{" "}
            Application is {active ? "open" : "closed"}
          </motion.h6>
        </motion.div>
        <motion.div className="flex items-center text-left">
          <Icon icon="mdi:book-education-outline" width={20} className="mr-2" />{" "}
          {programs} programs
        </motion.div>
      </motion.div>
      {selectedId && UniDescription}
    </>
  );
};

export default UniversityDescriptoinCard;
