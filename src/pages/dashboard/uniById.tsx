import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/universities";
import { useParams } from "react-router-dom";

const UniversityDetailPage = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["university-by-id", id],
    queryFn: id ? () => api.getUniversityById(id as string) : undefined,
  });
  const universityInfo = data?.data.university || null;

  return (
    <main className="">
      <div className="w-full h-96">
        <img
          className="w-full h-full object-cover"
          src={("http://localhost:5000" + universityInfo?.image) as string}
          alt={universityInfo?.name.en}
        />
      </div>
      <h2 className="text-3xl mt-4 font-semibold">{universityInfo?.name.en}</h2>
      <h5 className="flex items-center text-gray-700 text-lg mt-2">
        <Icon icon="mdi:location-outline" width={25} color="#555" />
        {universityInfo?.country},&nbsp;{universityInfo?.city}
      </h5>
      <h4 className="text-xl font-semibold mt-5">University info:</h4>
      <p className="mt-2">{universityInfo?.description.en}</p>
      <h4 className="text-xl font-semibold mt-5">Available courses</h4>
      <h6 className="text-lg mt-2">BSc:</h6>
      <div className="flex flex-col">
        {universityInfo?.bachelors.map((course, index) => (
          <div
            key={index}
            className="w-full p-2 flex flex-col justify-start bg-slate-100 border border-gray-400 border-solid rounded-md mt-2"
          >
            <h4 className="text-gray-600 text-lg">{course.name["en"]}</h4>
            <div className="mt-1 flex items-center">
              <Icon
                color="#444"
                className="mr-1"
                icon="mdi:translate"
                width={20}
              />
              {course.languages.map((lng) => (
                <div>{lng}</div>
              ))}
            </div>
            <div className="mt-1 flex items-center">
              <Icon
                color="#444"
                className="mr-1"
                icon="mdi:calendar-month-outline"
                width={20}
              />
              {course.semesters}
            </div>
            <div className="mt-1 flex items-center">
              <Icon
                color="#444"
                className="mr-1"
                icon="mdi:clock-outline"
                width={20}
              />
              {course.educationType.fullTime && "Full-time / "}
              {course.educationType.partTime && "Part-time"}
            </div>
          </div>
        ))}
      </div>
      <h6 className="text-lg mt-2">MSc:</h6>
      <div className="flex flex-col">
        {universityInfo?.masters.map((course, index) => (
          <div
            key={index}
            className="w-full p-2 flex flex-col justify-start bg-slate-100 border border-gray-400 border-solid rounded-md mt-2"
          >
            <h4 className="text-gray-600 text-lg">{course.name["en"]}</h4>
            <div className="mt-1 flex items-center">
              <Icon
                color="#444"
                className="mr-1"
                icon="mdi:translate"
                width={20}
              />
              {course.languages.map((lng) => (
                <div>{lng}</div>
              ))}
            </div>
            <div className="mt-1 flex items-center">
              <Icon
                color="#444"
                className="mr-1"
                icon="mdi:calendar-month-outline"
                width={20}
              />
              {course.semesters}
            </div>
            <div className="mt-1 flex items-center">
              <Icon
                color="#444"
                className="mr-1"
                icon="mdi:clock-outline"
                width={20}
              />
              {course.educationType.fullTime && "Full-time / "}
              {course.educationType.partTime && "Part-time"}
            </div>
          </div>
        ))}
      </div>
      <h6 className="text-lg mt-2">Phd:</h6>
      <div className="flex flex-col">
        {universityInfo?.phd.map((course, index) => (
          <div
            key={index}
            className="w-full p-2 flex flex-col justify-start bg-slate-100 border border-gray-400 border-solid rounded-md mt-2"
          >
            <h4 className="text-gray-600 text-lg">{course.name["en"]}</h4>
            <div className="mt-1 flex items-center">
              <Icon
                color="#444"
                className="mr-1"
                icon="mdi:translate"
                width={20}
              />
              {course.languages.map((lng) => (
                <div>{lng}</div>
              ))}
            </div>
            <div className="mt-1 flex items-center">
              <Icon
                color="#444"
                className="mr-1"
                icon="mdi:calendar-month-outline"
                width={20}
              />
              {course.semesters}
            </div>
            <div className="mt-1 flex items-center">
              <Icon
                color="#444"
                className="mr-1"
                icon="mdi:clock-outline"
                width={20}
              />
              {course.educationType.fullTime && "Full-time / "}
              {course.educationType.partTime && "Part-time"}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default UniversityDetailPage;
