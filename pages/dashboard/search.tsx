import { universities } from "@/demo/universities";
import UniversityDescriptoinCard from "@/components/universityDescription/UniversityDescriptionCard";
import { Icon } from "@iconify/react";

const SearchPage = () => {
  return (
    <div>
      <div className="flex justify-center w-4/5 m-auto">
        <input
          className="border-gray-500 border-2 border-solid w-full rounded-md p-2"
          placeholder="Search..."
        />
        <button className="flex items-center justify-center p-2 bg-primary-900 text-white ml-4 rounded-md">
            <Icon icon="mdi:filter-outline" width={20} /> Filter
        </button>
      </div>
      <div className="flex justify-center items-center flex-col mt-2">
        {universities.slice(0, 10).map((item) => {
          return <UniversityDescriptoinCard key={item.name} {...item} />;
        })}
      </div>
    </div>
  );
};

export default SearchPage;
