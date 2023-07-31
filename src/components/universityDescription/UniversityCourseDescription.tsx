import { Icon } from "@iconify/react";
import { FC } from "react";
import { IUniversityProgramm } from "../../models/university";
import { useTranslation } from "react-i18next";
import Card from "../card/Card";

interface IProps extends IUniversityProgramm {
    lng: "ru" | "en" | "uz"
}

const UniversityCourseDescription: FC<IProps> = (props) => {
  
    const {name, languages, semesters, educationType, lng} = props;
    const {t} = useTranslation()
  
    return (
    <Card className="w-full flex flex-col justify-start mt-2">
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
    </Card>
  );
};

export default UniversityCourseDescription;
