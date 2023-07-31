import { Icon } from "@iconify/react";
import { FC } from "react";
import { IUniversityProgramm } from "../../models/university";
import { useTranslation } from "react-i18next";

interface IProps extends IUniversityProgramm {
    lng: "ru" | "en" | "uz"
}

const UniversityCourseDescription: FC<IProps> = (props) => {
  
    const {name, description, languages, semesters, educationType, lng} = props;
    const {t} = useTranslation()
  
    return (
    <div className="w-full p-2 flex flex-col justify-start bg-primary-800 rounded-xl mt-2">
      <h4 className="text-text-900 text-lg">{name[lng]}</h4>
      <div className="mt-1 flex items-center text-primary-700">
        <Icon className="mr-1" icon="mdi:translate" width={20} />
        {languages.map((lang) => (
          <div>{lang}</div>
        ))}
      </div>
      <div className="mt-1 flex items-center text-primary-700">
        <Icon className="mr-1" icon="mdi:calendar-month-outline" width={20} />
        {t("university.duration")}: {semesters}{" "}
        {t("university.semesters")}
      </div>
      <div className="mt-1 flex items-center text-primary-700">
        <Icon className="mr-1" icon="mdi:clock-outline" width={20} />
        {educationType.fullTime && `${t("university.fullTime")} / `}
        {educationType.partTime && `${t("university.partTime")}`}
      </div>
    </div>
  );
};

export default UniversityCourseDescription;
