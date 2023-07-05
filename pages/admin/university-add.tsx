import DatePicker from "@/components/date-picker/DatePicker";
import Input from "@/components/input/Input";
import CourseDetailsSection from "@/components/universityAdd/CourseDetailsSection";
import { IUniversityAdd, universityObj } from "@/models/university-add";
import { useForm } from "react-hook-form";

const UniversityAddPage = () => {
  const { register, handleSubmit, control } = useForm<IUniversityAdd>({
    defaultValues: Object.assign({}, universityObj),
  });

  const createUniversity = async (data: IUniversityAdd) => {
    console.table(data)
  };

  return (
    <div>
      <form
        className="p-2 gap-2 flex flex-col"
        onSubmit={handleSubmit(createUniversity)}
      >
        <h3 className="text-center text-2xl">Add university details below</h3>
        <div className="flex gap-2 mt-2">
          <Input
            wrapperClassName="w-full"
            placeholder="English name"
            {...register("nameEn")}
          />
          <Input
            wrapperClassName="w-full"
            placeholder="Russian name"
            {...register("nameRu")}
          />
          <Input
            wrapperClassName="w-full"
            placeholder="Uzbek name"
            {...register("nameUz")}
          />
        </div>
        <div className="flex gap-2">
          <DatePicker wrapperClassName="w-full" placeholder="Foundation date" />
          <Input
            wrapperClassName="w-full"
            placeholder="Country"
            {...register("country")}
          />
          <Input
            wrapperClassName="w-full"
            placeholder="City"
            {...register("city")}
          />
        </div>
        <div>
            <CourseDetailsSection course="bachelors" control={control} register={register} />
            <CourseDetailsSection course="masters" control={control} register={register} />
            <CourseDetailsSection course="phd" control={control} register={register} />
        </div>
      </form>
    </div>
  );
};

export default UniversityAddPage;
