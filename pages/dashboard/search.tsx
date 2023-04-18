import { universities } from "@/demo/universities";
import UniversityDescriptoinCard from "@/components/universityDescription/UniversityDescriptionCard";
import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const SearchPage = () => {

  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 1000)

  const filteredList = useMemo(() => {
    return universities.filter(uni => uni.name.toLowerCase().includes(debounceValue.toLowerCase()))
  }, [debounceValue])

  return (
    <div>
      <div className="flex justify-center w-4/5 m-auto">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-gray-500 border-2 border-solid w-full rounded-md p-2"
          placeholder="Type something and hit 'Enter' to search..."
        />
        <button className="flex items-center justify-center p-2 bg-primary-900 ml-4 rounded-md">
            <Icon icon="mdi:filter-outline" width={20} /> Filter
        </button>
      </div>
      <div className="mt-2 flex justify-center items-center flex-col">
        {filteredList.slice(0, 10).map((item) => (
            <UniversityDescriptoinCard key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
