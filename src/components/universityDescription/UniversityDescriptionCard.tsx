import { motion } from "framer-motion";
import { FC, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { ISavedUniversity, IUniversity } from "../../models/university";
import UniversityDescriptionModal from "./UniversityDescriptionModal";
import Button from "../button/Button";
import { useAppSelector } from "../../hooks/redux";
import { useTranslation } from "react-i18next";
import { ILanguages } from "../../models";
import Separator from "../separator/Separator";
import { useToggle } from "../../hooks/useToggle";
import { useUniversity } from "../../hooks/useUniversity";

const UniversityDescriptoinCard: FC<
  IUniversity & ISavedUniversity & { direction: "row" | "col" }
> = (uni) => {
  const { name, bachelors, masters, phd, direction, _id } = uni;

  const isAdmin = useAppSelector((state) => state.app.user).role == "admin";
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { i18n, t } = useTranslation();
  const lng = i18n.language as ILanguages;

  const programs = useMemo(() => {
    return uni.bachelors?.length + uni.masters?.length + uni.phd?.length || 0;
  }, [uni]);

  const handleUniSelect = () => setSelectedId(name.en);
  const closeDescription = () => setSelectedId(null);

  const activeApplication = useMemo(() => {
    return [...bachelors, ...masters, ...phd].some(
      (program) => program.intake.fall || program.intake.spring
    );
  }, []);

  return (
    <>
      {direction === "row" ? (
        <DisplayRow
          uni={uni}
          isAdmin={isAdmin}
          handleUniSelect={handleUniSelect}
          activeApplication={activeApplication}
          lng={lng}
          programs={programs}
        />
      ) : (
        <DisplayCol
          uni={uni}
          isAdmin={isAdmin}
          handleUniSelect={handleUniSelect}
          activeApplication={activeApplication}
          lng={lng}
          programs={programs}
        />
      )}
      {selectedId && (
        <UniversityDescriptionModal
          selectedId={selectedId}
          {...uni}
          close={closeDescription}
        />
      )}
    </>
  );
};

export default UniversityDescriptoinCard;

type ICard = {
  handleUniSelect: () => void;
  isAdmin: boolean;
  activeApplication: boolean;
  lng: ILanguages;
  programs: number;
  uni: IUniversity & ISavedUniversity;
};

const DisplayRow: FC<ICard> = ({
  uni,
  handleUniSelect,
  isAdmin,
  activeApplication,
  lng,
  programs,
}) => {
  const { name, country, city, foundIn } = uni;
  const { t } = useTranslation();
  const { deleteUniversity, editUniversity } = useUniversity();

  return (
    <motion.div
      className={
        "rounded-xl bg-primary-800 mt-3 md:p-3 p-1 cursor-pointer flex md:flex-row justify-between md:items-center flex-col items-start md:w-full w-full relative"
      }
      layoutId={name.en}
      onClick={handleUniSelect}
    >
      <motion.div className="flex flex-col gap-1 text-primary-700">
        <motion.h5 className="text-lg font-semibold text-text-900">
          {name[lng]}
        </motion.h5>
        <motion.h6 className="flex items-center">
          <Icon width={20} className="mr-2" icon="mdi:map-marker-outline" />{" "}
          {t("university.location")}: {country}, {city}
        </motion.h6>
        <motion.h6 className="flex items-center">
          <Icon width={20} className="mr-2" icon="mdi:calendar-month-outline" />{" "}
          {t("university.foundIn")}: {foundIn}
        </motion.h6>
        <h6 className="flex items-center">
          <Icon
            width={20}
            className="mr-2"
            icon="mdi:file-document-multiple-outline"
          />{" "}
          {t(`university.${activeApplication ? "open" : "closed"}`)}
        </h6>
      </motion.div>
      <div className="flex">
        <div className="flex items-center text-left">
          <Icon icon="mdi:book-education-outline" width={20} className="mr-2" />{" "}
          {t("university.programs")}: {programs}
        </div>
        {isAdmin && (
          <Button
            beforeIcon="iconamoon:edit-duotone"
            wrapperClassName="text-secondary-800"
            onClick={(e) => editUniversity(e, uni)}
          />
        )}
      </div>
    </motion.div>
  );
};

const DisplayCol: FC<ICard> = ({
  uni,
  handleUniSelect,
  isAdmin,
  activeApplication,
  lng,
  programs,
}) => {
  const { t } = useTranslation();
  const { name, country, city, foundIn, image } = uni;
  const imageError = useToggle(false);

  const { deleteUniversity, editUniversity } = useUniversity();

  return (
    <motion.div
      className={
        "rounded-xl bg-primary-800 cursor-pointer flex justify-between md:items-center flex-col items-start w-full relative"
      }
      layoutId={name.en}
      onClick={handleUniSelect}
    >
      <motion.div className="rounded-t-xl h-72 w-full relative">
        {!imageError.state ? (
          <motion.img
            className="w-full h-full object-cover rounded-t-xl"
            src={"http://localhost:5000" + image}
            onError={() => imageError.on()}
            onLoad={() => imageError.off()}
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
        <motion.h5 className="text-xl absolute left-2 z-40 bottom-2 break-words font-semibold text-text-900">
          {name[lng]}
        </motion.h5>
        <div className="w-full h-72 absolute top-0 left-0 bg-gradient-to-b from-transparent to-black">
          {/* gradient-layer  */}
        </div>
      </motion.div>
      <motion.div className="p-2 flex flex-col gap-3 my-2 text-primary-700 w-full">
        <div className="w-full flex">
          <motion.h6 className="flex items-center w-1/2">
            <Icon width={20} className="mr-2" icon="mdi:map-marker-outline" />{" "}
            {country}, {city}
          </motion.h6>
          <motion.h6 className="flex items-center w-1/2">
            <Icon
              width={20}
              className="mr-2"
              icon="mdi:calendar-month-outline"
            />{" "}
            {foundIn}
          </motion.h6>
        </div>
        <div className="w-full flex">
          <h6 className="flex items-center w-1/2">
            <Icon
              width={20}
              className="mr-2"
              icon="mdi:file-document-multiple-outline"
            />{" "}
            {t(`university.${activeApplication ? "open" : "closed"}`)}
          </h6>
          <h6 className="flex items-center text-left w-1/2">
            <Icon
              icon="mdi:book-education-outline"
              width={20}
              className="mr-2"
            />{" "}
            {t("university.programs")}: {programs}
          </h6>
        </div>
      </motion.div>
      {isAdmin && (
        <>
          <Separator direction="horizontal" />
          <div className="flex justify-end w-full p-2 gap-2">
            <Button
              beforeIcon="iconamoon:trash-duotone"
              text="Delete"
              wrapperClassName="flex gap-2 bg-red-500"
              onClick={(e) => deleteUniversity(e, uni._id)}
            />
            <Button
              beforeIcon="iconamoon:edit-duotone"
              text="Edit"
              wrapperClassName="flex gap-2 bg-secondary-800"
              onClick={(e) => editUniversity(e, uni)}
            />
          </div>
        </>
      )}
    </motion.div>
  );
};
