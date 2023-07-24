import { useQuery } from "@tanstack/react-query";
import api from '../../api/universities'
import UniversityDescriptoinCard from "../../components/universityDescription/UniversityDescriptionCard";
import { Icon } from "@iconify/react";
import Input from "../../components/input/Input";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

const UniversitiesPage = () => {

    const {isLoading, data, isError } = useQuery({queryKey: ["universities"], queryFn: () => api.getUniversities()})
    const [search, setSearch] = useState("");
    const debounceValue = useDebounce(search, 1000);

  if (isLoading) return <p>Loading</p>
  if (isError) return <p>Error</p>

  return (
    <div>
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
      <div className="mt-2 flex justify-center items-center flex-col">
        {data?.data?.map((item) => (
          <UniversityDescriptoinCard key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default UniversitiesPage;
