import { universities } from "@/demo/universities";
import UniversityDescriptoinCard from "@/components/universityDescription/UniversityDescriptionCard";

const SearchPage = () => {
  return (
    <div>
      <div className="flex justify-center">
        <input
          className="border-gray-500 border-2 border-solid w-4/5 rounded-md p-2"
          placeholder="Search..."
        />
      </div>
      <div className="flex justify-center items-center flex-col">
        {universities.map((item) => {
          return <UniversityDescriptoinCard key={item.name} {...item} />;
        })}
      </div>
    </div>
  );
};

export default SearchPage;
