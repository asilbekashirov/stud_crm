import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/universities";
import { useParams } from "react-router-dom";
import { ILanguages } from "../../models";
import { useTranslation } from "react-i18next";
import UniversityCourseDescription from "../../components/universityDescription/UniversityCourseDescription";
import { useMemo } from "react";
import { useToggle } from "../../hooks/useToggle";

const UniversityDetailPage = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["university-by-id", id],
    queryFn: id ? () => api.getUniversityById(id as string) : undefined,
  });
  const universityInfo = data?.data.university || null;
  const { t, i18n } = useTranslation();
  const imageError = useToggle(false);

  const lng = i18n.language as ILanguages;

  const programs = useMemo(() => {
    return [
      { name: "bsc", value: universityInfo?.bachelors },
      { name: "masters", value: universityInfo?.masters },
      { name: "phd", value: universityInfo?.phd },
    ];
  }, [universityInfo]);

  return (
    <main className="">
      <div className="w-full h-96">
        {!imageError.state ? (
          <img
            className="w-full h-full object-cover"
            src={("http://localhost:5000" + universityInfo?.image) as string}
            alt={universityInfo?.name.en}
            onError={() => imageError.on()}
            onLoad={() => imageError.off()}
          />
        ) : (
          <div className="w-full rounded-xl border h-full grid place-items-center">
            <Icon
              width={70}
              className="text-secondary-800"
              icon="ic:twotone-broken-image"
            />
            <p className="text-xl">Error loading image</p>
          </div>
        )}
      </div>
      <h2 className="text-3xl mt-4 font-semibold">
        {universityInfo?.name[lng]}
      </h2>
      <h5 className="flex items-center text-primary-700 text-lg mt-2">
        <Icon icon="mdi:location-outline" width={25} />
        {universityInfo?.country},&nbsp;{universityInfo?.city}
      </h5>
      <h4 className="text-2xl font-semibold mt-5">{t("university.info")}:</h4>
      <p className="mt-2 text-lg">{universityInfo?.description.en}</p>
      <h4 className="text-2xl font-semibold mt-5">
        {t("university.available_courses")}
      </h4>
      {programs.map((program) => (
        <div key={program.name}>
          <h6 className="text-xl mt-2">{t(`university.${program.name}`)}:</h6>
          <div className="flex flex-col">
            {program.value?.length ? (
              program.value?.map((course, index) => (
                <UniversityCourseDescription
                  {...course}
                  key={index}
                  lng={lng}
                />
              ))
            ) : (
              <p className="w-full text-center py-4 text-lg text-primary-700">
                {t("common.no_data")}
              </p>
            )}
          </div>
        </div>
      ))}
    </main>
  );
};

export default UniversityDetailPage;
