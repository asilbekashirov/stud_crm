import { Icon } from "@iconify/react";
import { useState } from "react";
import api from "../../api/universities";
import { useQuery } from "@tanstack/react-query";
import UniversityDescriptoinCard from "../../components/universityDescription/UniversityDescriptionCard";
import { useDebounce } from "../../hooks/useDebounce";
import Input from "../../components/input/Input";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 1000);

  const { isLoading, data, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.getUniversities()
  });

  console.log(data);

  if (isLoading) return <p>Loading</p>;

  return (
    <section>
      <div className="flex justify-center w-4/5 m-auto">
        <Input
          beforeIcon="iconamoon:search-duotone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          wrapperClassName="w-full"
          placeholder="Type something and hit 'Enter' to search..."
        />
        <button className="flex items-center justify-center p-2 bg-primary-900 ml-4 rounded-md">
          <Icon icon="mdi:filter-outline" width={20} /> Filter
        </button>
      </div>
      {!isError ? (
        <div className="mt-2 flex justify-center items-center flex-col">
          {data?.data.map((item: any) => (
            <UniversityDescriptoinCard key={item._id} {...item} />
          ))}
        </div>
      ) : (
        <p>Error during fetching</p>
      )}
    </section>
  );
};

export default SearchPage;
