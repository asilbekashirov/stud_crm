import { ISavedUniversity, IUniversity } from "../../models/university";
import { motion, AnimatePresence } from "framer-motion";
import { FC } from "react";
import styles from "./universityDescriptionCard.module.css";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { useAppSelector } from "../../hooks/redux";
import { isCreatedUni } from "../../utils/helpers";

type IProps = IUniversity & {
  selectedId: string;
  close: () => void;
  edit: (e: any) => void;
};

const UniversityDescriptionModal: FC<IProps> = (props) => {
  const {
    selectedId,
    name,
    image,
    country,
    city,
    description,
    close,
    foundIn,
    edit,
  } = props;

  const navigate = useNavigate();
  const isAdmin = useAppSelector((state) => state.app.user).role === "admin";

  const goToUniPage = () => {
    if (!isCreatedUni(props)) return;
    navigate(`/dashboard/university/${props._id}`);
  };

  return (
    <AnimatePresence>
      <motion.div className={styles.card_wrapper}>
        <motion.div
          layoutId={selectedId!}
          className={[
            "rounded-lg bg-primary-700 flex flex-col md:w-3/5 w-11/12",
            styles.card,
          ].join(" ")}
        >
          <motion.div className="w-full md:h-96 relative">
            <motion.img
              src={("http://localhost:5000" + image!) as string}
              alt={name.en}
              className="w-full h-full object-cover rounded-t-lg block"
            />
            <div className="w-full bg-gradient-to-b from-white to-black absolute top-0 left-0 h-full"></div>
            <motion.h5 className="text-2xl absolute bottom-0 left-0 md:ml-4 ml-2 text-white font-semibold mb-3">
              {name.en}
            </motion.h5>
          </motion.div>
          <motion.div className="md:p-4 p-2">
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
                <motion.h6 className="flex items-center text-gray-700 md:mt-3 mt-1">
                  <Icon
                    className="mr-3"
                    width={25}
                    icon="mdi:calendar-month-outline"
                  />{" "}
                  Found in: {foundIn}
                </motion.h6>
              </motion.div>

              {/* <motion.div className="ml-10">
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
                </motion.div> */}
            </motion.div>

            <motion.p className="mt-4">{description.en}</motion.p>
            <div className="flex justify-end">
              <Button
                text="Close"
                onClick={close}
                afterIcon="iconamoon:close-circle-1-duotone"
                wrapperClassName="bg-red-500 text-white"
              />
              <Button
                text="More"
                onClick={goToUniPage}
                afterIcon="iconamoon:information-circle-duotone"
                wrapperClassName="bg-blue-400 text-white mx-2"
              />
              {isAdmin ? (
                <Button
                  text="Edit"
                  afterIcon="iconamoon:edit-duotone"
                  onClick={edit}
                  wrapperClassName="bg-primary-900 text-white"
                />
              ) : (
                <Button
                  text="Add to list"
                  afterIcon="iconamoon:sign-plus-circle-duotone"
                  wrapperClassName="bg-green-500 text-white"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UniversityDescriptionModal;
