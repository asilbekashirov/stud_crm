import { useQuery } from "@tanstack/react-query";
import api from "../../api/universities";
import UniversityDescriptoinCard from "../../components/universityDescription/UniversityDescriptionCard";
import { Icon } from "@iconify/react";
import Input from "../../components/input/Input";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import Button from "../../components/button/Button";

const UniversitiesPage = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["universities"],
    queryFn: () => api.getUniversities(),
  });
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 1000);

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

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
        <Button text="Filter" afterIcon="mdi:filter-outline" wrapperClassName="ml-2 bg-secondary-800" />
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
