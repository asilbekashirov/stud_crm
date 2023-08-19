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

type IProps = IUniversity &
  ISavedUniversity & {
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
    _id,
  } = props;

  const navigate = useNavigate();
  const { isAuth, user } = useAppSelector((state) => state.app);
  const isAdmin = user.role === "admin";
  const dispatch = useAppDispatch()


  const imageError = useToggle(false);
  const isSelectedUniversity = useToggle(user.selectedUniversities.some(u => u._id === _id) || false);

  const goToUniPage = () => {
    if (!isCreatedUni(props)) return;
    navigate(`/${isAdmin ? "admin" : "app"}/university/${props._id}`);
  };

  const handleUniversityAdd = async () => {
    if (!isAuth) navigate("/login");

    const res = await fetchUniversitySelect(user._id, {_id, name, city, country});
    if (res?.status === 200) {
      isSelectedUniversity.on()
      close()
      dispatch(setUser(res.data.user))
    }
  };

  const handleUniversityRemove = async () => {
    const res = await fetchUniversityRemove(user._id, _id)
    if (res?.status === 200) {
      isSelectedUniversity.off()
      close()
      dispatch(setUser(res.data.user))
    }
  }

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
                  wrapperClassName="bg-secondary-800 text-white"
                />
              ) : isSelectedUniversity.state ? (
                <Button
                  text="Remove from list"
                  afterIcon="iconamoon:sign-minus-circle-duotone"
                  wrapperClassName="bg-red-500 text-white"
                  onClick={handleUniversityRemove}
                />
              ) : (
                <Button
                  text="Add to list"
                  afterIcon="iconamoon:sign-plus-circle-duotone"
                  wrapperClassName="bg-green-500 text-white"
                  onClick={handleUniversityAdd}
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
