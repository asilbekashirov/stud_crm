import { useQuery } from "@tanstack/react-query";
import api from "../../api/universities";
import UniversityDescriptoinCard from "../../components/universityDescription/UniversityDescriptionCard";
import { Icon } from "@iconify/react";
import Input from "../../components/input/Input";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import Button from "../../components/button/Button";
import Group from "../../components/group/Group";
import Tooltip from "../../components/tooltip/Tooltip";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setList } from "../../redux/store/app";

const UniversitiesPage = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["universities"],
    queryFn: () => api.getUniversities(),
  });
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 1000);
  const direction = useAppSelector((state) => state.app.list);
  const dispatch = useAppDispatch();

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

  const handleDirection = (dir: "col" | "row") => {
    dispatch(setList(dir));
  };

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
        <Button
          text="Filter"
          afterIcon="mdi:filter-outline"
          wrapperClassName="ml-2 bg-secondary-800"
        />
        <Group direction="row" className="ml-2">
          <Tooltip text="Row" position="bottom">
            <div
              className="p-2"
              onClick={() => handleDirection("row")}
            >
              <Icon width={25} icon="fluent:dock-row-24-regular" />
            </div>
          </Tooltip>
          <Tooltip text="Column" position="bottom">
            <div
              className="p-2"
              onClick={() => handleDirection("col")}
            >
              <Icon width={25} icon="fluent:row-triple-20-regular" />
            </div>
          </Tooltip>
        </Group>
      </div>
      <div className="mt-2 flex flex-wrap justify-start items-center gap-5 w-4/5 m-auto">
        {data?.data?.map((item) => (
          <UniversityDescriptoinCard
            direction={direction}
            key={item._id}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default UniversitiesPage;
