import UniversityDescriptoinCard from "../../components/universityDescription/UniversityDescriptionCard";
import { Icon } from "@iconify/react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Group from "../../components/group/Group";
import Tooltip from "../../components/tooltip/Tooltip";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setList } from "../../redux/store/app";
import { useUniversities } from "../../hooks/useUniversities";
import { useMemo, useState } from "react";
import { useToggle } from "../../hooks/useToggle";

const UniversitiesPage = () => {
  const direction = useAppSelector((state) => state.app.list);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const filter = useToggle(false)

  const { params, isLoading, isError, nextPage, prevPage, paginationLabel } = useUniversities();

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

  const handleDirection = (dir: "col" | "row") => {
    dispatch(setList(dir));
  };

  return (
    <section className="w-4/5 m-auto">
      <div className="flex justify-center w-full">
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
          onClick={() => filter.toggle()}
          wrapperClassName="ml-2 bg-secondary-800"
        />
        <Group direction="row" className="ml-2">
          <Tooltip text="Grid" position="bottom">
            <div className="p-2" onClick={() => handleDirection("col")}>
              <Icon width={25} icon="fluent:dock-row-24-regular" />
            </div>
          </Tooltip>
          <Tooltip text="Column" position="bottom">
            <div className="p-2" onClick={() => handleDirection("row")}>
              <Icon width={25} icon="fluent:row-triple-20-regular" />
            </div>
          </Tooltip>
        </Group>
      </div>
      <div className="w-full flex justify-end gap-2 mt-3 items-center">
        <div>
            {paginationLabel}
        </div>
        <div
          className={`border p-2 rounded-full ${
            params?.hasPrevPage
              ? "cursor-pointer"
              : "text-primary-700 border-primary-700 cursor-not-allowed pointer-events-none"
          }`}
          onClick={prevPage}
        >
          <Icon icon="iconamoon:player-previous-duotone" width={20} />
        </div>
        <div
          className={`border p-2 rounded-full ${
            params?.hasNextPage
              ? "cursor-pointer"
              : " text-primary-700 border-primary-700 cursor-not-allowed pointer-events-none"
          }`}
          onClick={nextPage}
        >
          <Icon icon="iconamoon:player-next-duotone" width={20} />
        </div>
      </div>
      <div
        className={`mt-2 grid ${
          direction === "row"
            ? "grid-cols-1 gap-2"
            : "gap-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1"
        } justify-start items-center w-full`}
      >
        {params?.docs.map((item) => (
          <UniversityDescriptoinCard
            direction={direction}
            key={item._id}
            {...item}
          />
        ))}
      </div>
    </section>
  );
};

export default UniversitiesPage;
