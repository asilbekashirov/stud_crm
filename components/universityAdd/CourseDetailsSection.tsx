import { IUniversityAdd, universityProgrammObj } from "@/models/university-add";
import { FC } from "react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import CourseItem from "./CourseItem";
import Button from "../button/Button";

interface IProps {
  course: "phd" | "masters" | "bachelors";
  control: Control<IUniversityAdd>;
  register: UseFormRegister<IUniversityAdd>;
}

const CourseDetailsSection: FC<IProps> = ({ course, control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: course,
  });

  const addCourse = () => {
    append(Object.assign({}, universityProgrammObj))
  }

  return (
    <div className="w-full mt-2">
      <div className="flex items-center">
        <h4 className="uppercase text-lg">{course}</h4>
        <Button onClick={addCourse} wrapperClassName="bg-primary-900 ml-2" text="Add" afterIcon="iconamoon:sign-plus-circle-duotone" />
      </div>
      {fields.map((field, index) => (
        <CourseItem
          course={course}
          key={field.id}
          index={index}
          remove={remove}
          register={register}
        />
      ))}
    </div>
  );
};

export default CourseDetailsSection;
