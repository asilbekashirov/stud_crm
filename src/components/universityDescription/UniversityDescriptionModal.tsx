import { ISavedUniversity, IUniversity } from "../../models/university";
import { motion, AnimatePresence } from "framer-motion";
import { FC } from "react";
import styles from "./universityDescriptionCard.module.css";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { isCreatedUni } from "../../utils/helpers";
import { useToggle } from "../../hooks/useToggle";
import { fetchUniversityRemove, fetchUniversitySelect } from "../../controllers/user-controller";
import { setUser } from "../../redux/store/app";
import { useUniversity } from "../../hooks/useUniversity";

type IProps = IUniversity &
  ISavedUniversity & {
    selectedId: string;
    close: () => void;
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
    _id,
  } = props;

  const navigate = useNavigate();
  const user = useAppSelector((state) => state.app.user);
  const isAdmin = user.role === "admin";
  const {editUniversity, handleUniversityAdd, handleUniversityRemove, goToUniPage} = useUniversity()

  const imageError = useToggle(false);
  const isSelectedUniversity = useToggle(user.selectedUniversities.some(u => u._id === _id) || false);

  const addUniToList = () => handleUniversityAdd(user._id, {_id, name, country, city}, close)
  const removeUniFromList = () => handleUniversityRemove(user._id, _id, close)
  

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
            {!imageError.state ? (
              <motion.img
                src={("http://localhost:5000" + image!) as string}
                alt={name.en}
                className="w-full h-full object-cover rounded-t-lg block"
                onError={() => imageError.on()}
              />
            ) : (
              <div className="w-full h-full grid place-items-center">
                <Icon
                  width={70}
                  className="text-secondary-800"
                  icon="ic:twotone-broken-image"
                />
              </div>
            )}
            <div className="w-full bg-gradient-to-b from-transparent to-black absolute top-0 left-0 h-full"></div>
            <motion.h5 className="text-2xl absolute bottom-0 left-0 md:ml-4 ml-2 text-white font-semibold mb-3">
              {name.en}
            </motion.h5>
          </motion.div>
          <motion.div className="md:p-4 p-2">
            
            <motion.div className="flex justify-start">
              <motion.div>
                <motion.h6 className="flex items-center text-primary-800">
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
                onClick={() => goToUniPage(props)}
                afterIcon="iconamoon:information-circle-duotone"
                wrapperClassName="bg-blue-400 text-white mx-2"
              />
              {isAdmin ? (
                <Button
                  text="Edit"
                  afterIcon="iconamoon:edit-duotone"
                  onClick={e => editUniversity(e, props)}
                  wrapperClassName="bg-secondary-800 text-white"
                />
              ) : isSelectedUniversity.state ? (
                <Button
                  text="Remove from list"
                  afterIcon="iconamoon:sign-minus-circle-duotone"
                  wrapperClassName="bg-red-500 text-white"
                  onClick={removeUniFromList}
                />
              ) : (
                <Button
                  text="Add to list"
                  afterIcon="iconamoon:sign-plus-circle-duotone"
                  wrapperClassName="bg-green-500 text-white"
                  onClick={addUniToList}
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
