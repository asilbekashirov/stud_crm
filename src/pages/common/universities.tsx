import UniversityDescriptoinCard from "../../components/universityDescription/UniversityDescriptionCard";
import { Icon } from "@iconify/react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Group from "../../components/group/Group";
import Tooltip from "../../components/tooltip/Tooltip";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setList } from "../../redux/store/app";
import { useUniversities } from "../../hooks/useUniversities";
import { FC, useMemo, useState } from "react";
import Modal from "../../components/modal/Modal";
import Select from "../../components/select/Select";
import { useForm } from "react-hook-form";
import { IUniFilter } from "../../models/university";
import Skeleton from "../../components/skeleton/Skeleton";
import Container from "../../components/container/Container";

const UniversitiesPage = () => {
  const direction = useAppSelector((state) => state.app.list);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const {
    params,
    isLoading,
    isError,
    nextPage,
    prevPage,
    paginationLabel,
    handleFilter,
    filter,
  } = useUniversities();

  if (isError) return <p>Error</p>;

  const handleDirection = (dir: "col" | "row") => {
    dispatch(setList(dir));
  };

  return (
    <Container>
      <div className="flex justify-center w-full items-center">
        <Input
          beforeIcon="iconamoon:search-duotone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          wrapperClassName="w-full"
          placeholder="Type something and hit 'Enter' to search..."
        />
        <Modal
          btnText="Filter"
          btnClassName="ml-2 bg-secondary-800"
          icon="mdi:filter-outline"
          noActions
          className=" w-96"
          children={
            <FilterContent handleFilter={handleFilter} filter={filter} />
          }
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
      {isLoading ? (
        Array.from({ length: Math.floor(filter.limit / 2) }).map((_, i) => (
          <Skeleton key={i} className="mt-4 h-24 w-full bg-primary-800" />
        ))
      ) : (
        <>
          <div className="w-full flex justify-end gap-2 mt-3 items-center">
            <div>{paginationLabel}</div>
            <div
              className={`border p-2 rounded-full ${
                params?.hasPrevPage
                  ? "cursor-pointer"
                  : "text-primary-700 opacity-30 border-primary-700 cursor-not-allowed pointer-events-none"
              }`}
              onClick={prevPage}
            >
              <Icon icon="iconamoon:player-previous-duotone" width={20} />
            </div>
            <div
              className={`border p-2 rounded-full ${
                params?.hasNextPage
                  ? "cursor-pointer"
                  : " text-primary-700 opacity-30 border-primary-700 cursor-not-allowed pointer-events-none"
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
        </>
      )}
    </Container>
  );
};

export default UniversitiesPage;

interface IFilterContent {
  handleFilter: (data: IUniFilter) => void;
  filter: IUniFilter;
}

const FilterContent: FC<IFilterContent> = ({ handleFilter, filter }) => {
  const countries = useAppSelector((state) => state.utils.countries);
  const { handleSubmit, register } = useForm<IUniFilter>({
    defaultValues: { limit: 10, page: 1, name: "", courseName: "" },
  });
  const [country, setCountry] = useState(filter.country);

  const setFilterData = (data: IUniFilter) => {
    data.country = country;
    handleFilter(data);
  };

  const handleCountryChange = (data: string) => {
    setCountry(data);
  };

  const countriesList = useMemo(() => {
    const list = countries.map((a) => ({ name: a, value: a }));
    return [{ name: "-", value: "" }].concat(list);
  }, [countries]);

  const resetFilter = () => handleCountryChange("");

  return (
    <div>
      <form onSubmit={handleSubmit(setFilterData)}>
        <h3 className="text-xl font-bold">Filter options</h3>
        <Input
          {...register("courseName")}
          placeholder="Course name"
          wrapperClassName="mt-2"
        />
        <Select
          value={country}
          className="mt-2"
          onChange={handleCountryChange}
          iterable={countriesList}
          placeholder="Select a country"
        />
        <div className="flex justify-start gap-2">
          <Button
            type="reset"
            text="Clear filter"
            onClick={resetFilter}
            wrapperClassName="mt-2 bg-red-500"
          />
          <Button
            type="submit"
            text="Set filter"
            wrapperClassName="mt-2 bg-secondary-800"
          />
        </div>
      </form>
    </div>
  );
};
