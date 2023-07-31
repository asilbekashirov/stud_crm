import { motion } from "framer-motion";
import { FC, useMemo, useState } from "react";
import styles from "./universityDescriptionCard.module.css";
import { Icon } from "@iconify/react";
import { IUniversity } from "../../models/university";
import UniversityDescriptionModal from "./UniversityDescriptionModal";
import Button from "../button/Button";
import { useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { isCreatedUni } from "../../utils/helpers";
import { useTranslation } from "react-i18next";
import { ILanguages } from "../../models";

const UniversityDescriptoinCard: FC<IUniversity> = (uni) => {
  const { name, country, city, foundIn } = uni;

  const navigate = useNavigate();
  const isAdmin = useAppSelector((state) => state.app.user).role == "admin";
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const {i18n, t} = useTranslation()
  const lng = i18n.language as ILanguages

  const programs = useMemo(() => {
    return uni.bachelors?.length + uni.masters?.length + uni.phd?.length || 0;
  }, [uni]);

  const handleUniSelect = () => setSelectedId(name.en);
  const closeDescription = () => setSelectedId(null);

  const editUniversity = (e: any) => {
    e.stopPropagation();
    if (!isCreatedUni(uni)) return;
    navigate(`/admin/university-add?mode=edit&id=${uni._id}`);
  };

  return (
    <>
      <motion.div
        className={
          "rounded-xl bg-primary-800 mt-3 md:p-3 p-1 cursor-pointer flex md:flex-row justify-between md:items-center flex-col items-start md:w-4/5 w-full relative"
        }
        layoutId={name.en}
        onClick={handleUniSelect}
      >
        <motion.div className="flex flex-col gap-1">
          <motion.h5 className="text-lg font-semibold text-text-900">{name[lng]}</motion.h5>
          <motion.h6 className="flex items-center text-primary-700">
            <Icon width={20} className="mr-2" icon="mdi:map-marker-outline" />{" "}
            {t("university.location")}: {country}, {city}
          </motion.h6>
          <motion.h6 className="flex items-center text-primary-700">
            <Icon
              width={20}
              className="mr-2"
              icon="mdi:calendar-month-outline"
            />{" "}
            {t("university.foundIn")}: {foundIn}
          </motion.h6>
          {/* <motion.h6 className="flex items-center text-gray-700">
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
          </motion.h6> */}
        </motion.div>
        <div className="flex">
          <div className="flex items-center text-left">
            <Icon
              icon="mdi:book-education-outline"
              width={20}
              className="mr-2"
            />{" "}
            {t("university.programs")}: {programs}
          </div>
          {isAdmin && (
            <Button
              beforeIcon="iconamoon:edit-duotone"
              onClick={editUniversity}
            />
          )}
        </div>
      </motion.div>
      {selectedId && (
        <UniversityDescriptionModal
          selectedId={selectedId}
          {...uni}
          close={closeDescription}
          edit={editUniversity}
        />
      )}
    </>
  );
};

export default UniversityDescriptoinCard;
