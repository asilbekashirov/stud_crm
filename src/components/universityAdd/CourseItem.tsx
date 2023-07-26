import { IUniversity } from "../../models/university";
import { FC } from "react";
import { UseFieldArrayRemove, UseFormGetValues, UseFormRegister } from "react-hook-form";
import Input from "../input/Input";
import Button from "../button/Button";
import Checkbox from "../checkbox/Checkbox";

interface IProps {
  course: "phd" | "masters" | "bachelors";
  remove: UseFieldArrayRemove;
  register: UseFormRegister<IUniversity>;
  index: number;
  getValues: UseFormGetValues<IUniversity>
}

const CourseItem: FC<IProps> = ({ course, remove, index, register, getValues }) => {
  const deleteCourse = () => {
    remove(index);
  };

  return (
    <div className="p-1 border-2 flex flex-col mt-1 border-solid border-primary-900 rounded-lg">
      <span className="rounded-full flex justify-center border-accent-900 items-center p-2 w-8 h-8 border-2 border-solid">
        {index + 1}
      </span>
      <div className="flex gap-2 mt-2">
        <Input
          wrapperClassName="w-full"
          placeholder="Course name (En)"
          {...register(`${course}.${index}.name.en`)}
        />
        <Input
          wrapperClassName="w-full"
          placeholder="Course name (Ru)"
          {...register(`${course}.${index}.name.ru`)}
        />
        <Input
          placeholder="Course name (Uz)"
          wrapperClassName="w-full"
          {...register(`${course}.${index}.name.uz`)}
        />
      </div>
      <div className="mt-2">
        <div className="flex gap-2">
          <Checkbox
            id={`${course}.${index}.intake.fall`}
            trueText="Fall intake is active"
            {...register(`${course}.${index}.intake.fall`)}
            falseText="Fall intake is disabled"
          />
          <Checkbox
            id={`${course}.${index}.intake.spring`}
            trueText="Spring intake is active"
            {...register(`${course}.${index}.intake.spring`)}
            falseText="Spring intake is disabled"
          />
        </div>
        <Input
          placeholder="Tuition fee"
          type="number"
          {...register(`${course}.${index}.tuitionFee`)}
        />
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <h4 className="text-text-900 text-xl">Course description</h4>
        <Input
          placeholder="Description (EN)"
          multiline
          {...register(`${course}.${index}.description.en`)}
        />
        <Input
          placeholder="Description (Ru)"
          multiline
          {...register(`${course}.${index}.description.ru`)}
        />
        <Input
          placeholder="Description (Uz)"
          multiline
          {...register(`${course}.${index}.description.uz`)}
        />
      </div>
      <div className="flex justify-between my-2">
        <span></span>
        <Button
          onClick={deleteCourse}
          text="Delete"
          afterIcon="iconamoon:trash-duotone"
          wrapperClassName="bg-red-500 text-white"
        />
      </div>
    </div>
  );
};

export default CourseItem;
