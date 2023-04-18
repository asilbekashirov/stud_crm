import { IUniversity } from "@/demo/universities";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useMemo, useState } from "react";
import styles from "./universityDescriptionCard.module.css";
import { Icon } from "@iconify/react";
import { fDate } from "@/utils/date";
import { useRouter } from "next/router";

const UniversityDescriptoinCard: FC<IUniversity> = ({
  name,
  createdAt,
  description,
  programs,
  country,
  city,
  active,
  tuitionFee,
  image,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleUnivSelect = (id: string) => {
    !!id ? setSelectedId(id) : setSelectedId(null);
  };

  const router = useRouter()

  const closeDescription = () => setSelectedId(null);

  const goToUniPage = () => {
    router.push(`/dashboard/university/${name}`)
  }

  const UniDescription = useMemo(
    () => (
      <AnimatePresence>
        <motion.div className={styles.card_wrapper}>
          <motion.div
            layoutId={selectedId!}
            className={['rounded-lg bg-slate-100 flex flex-col', styles.card].join(' ')}
          >
            <motion.div className="w-full h-60">
              <motion.img
                src={image}
                className="w-full h-full object-cover rounded-t-lg block"
              />
            </motion.div>
            <motion.div className="p-4">
              <motion.h5 className="text-2xl font-semibold mb-3">
                {name}
              </motion.h5>

              <motion.div className="flex justify-start">
                <motion.div>
                  <motion.h6 className="flex items-center text-gray-700">
                    <Icon
                      className="mr-3"
                      width={25}
                      icon="mdi:map-marker-outline"
                    />{" "}
                    Location: {country}, {city}
                  </motion.h6>
                  <motion.h6 className="flex items-center text-gray-700 mt-3">
                    <Icon
                      className="mr-3"
                      width={25}
                      icon="mdi:calendar-month-outline"
                    />{" "}
                    Found in: {fDate(createdAt)}
                  </motion.h6>
                </motion.div>

                <motion.div className="ml-10">
                  <motion.h6 className="flex items-center text-gray-700">
                    <Icon
                      className="mr-3"
                      width={25}
                      icon="mdi:file-document-multiple-outline"
                    />{" "}
                    Application is {active ? "open" : "closed"}
                  </motion.h6>
                  <motion.h6 className="flex items-center text-gray-700 mt-3">
                    <Icon width={25} className="mr-3" icon="mdi:currency-usd" />{" "}
                    Tuition fee: {tuitionFee}$/year
                  </motion.h6>
                </motion.div>
              </motion.div>

              <motion.p className="mt-4">{description}</motion.p>
              <motion.div className="flex justify-end">
                <motion.button
                  onClick={closeDescription}
                  className="px-2 py-1 text-md rounded-lg bg-red-500 text-white mr-2"
                >
                  Close
                </motion.button>
                <motion.button 
                  onClick={goToUniPage}
                  className="px-2 text-md py-1 rounded-lg text-white bg-blue-400 mr-2"
                >
                  More
                </motion.button>
                <motion.button className="px-2 py-1 text-md rounded-lg bg-green-500 text-white">
                  Add to list
                </motion.button>
              </motion.div>
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
        className={
          [styles.card_main, 'rounded-lg bg-slate-100 mt-3 p-3 cursor-pointer flex justify-between items-center w-4/5 hover:bg-slate-200 transition-colors'].join(' ')
        }
        layoutId={name}
        onClick={() => handleUnivSelect(name)}
      >
        <motion.div>
          <motion.h5 className="text-lg font-semibold">{name}</motion.h5>
          <motion.h6 className="flex items-center text-gray-700">
            <Icon width={20} className="mr-2" icon="mdi:map-marker-outline" />{" "}
            Location: {country}, {city}
          </motion.h6>
          <motion.h6 className="flex items-center text-gray-700">
            <Icon
              width={20}
              className="mr-2"
              icon="mdi:calendar-month-outline"
            />{" "}
            Found in: {fDate(createdAt)}
          </motion.h6>
          <motion.h6 className="flex items-center text-gray-700">
            <Icon
              width={20}
              className="mr-2"
              icon="mdi:file-document-multiple-outline"
            />{" "}
            Application is {active ? "open" : "closed"}
          </motion.h6>
          <motion.h6 className="flex items-center text-gray-700">
            <Icon width={20} className="mr-2" icon="mdi:currency-usd" />{" "}
            Tuition fee: {tuitionFee}$/year
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
