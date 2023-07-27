import DatePicker from "../../components/date-picker/DatePicker";
import Input from "../../components/input/Input";
import CourseDetailsSection from "../../components/universityAdd/CourseDetailsSection";
import {
  ICreateUniversity,
  ISavedUniversity,
  IUniversity,
  universityObj,
} from "../../models/university";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../api/universities";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "../../components/button/Button";
import { Icon } from "@iconify/react";
import Tooltip from "../../components/tooltip/Tooltip";
import { copyObj, isCreatedUni } from "../../utils/helpers";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "../../components/select/Select";
import { useToggle } from "../../hooks/useToggle";
import { useAppDispatch } from "../../hooks/redux";
import { showAlert } from "../../redux/store/app";

const UniversityAddPage = () => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const disabled = useToggle(false);
  const dispatch = useAppDispatch();

  const uniId = params.get("id");
  const isEditMode = params.get("mode") === "edit";

  const { data, isLoading } = useQuery({
    queryKey: ["university-by-id", uniId],
    queryFn: uniId ? () => api.getUniversityById(uniId) : undefined,
  });

  const create = useMutation({
    mutationFn: (data: FormData) => api.createUniversity(data),
  });

  const { register, handleSubmit, control, reset, setValue, getValues } =
    useForm<IUniversity & (ICreateUniversity | ISavedUniversity)>({
      defaultValues: copyObj(universityObj),
    });

  const createUniversity = async (data: IUniversity) => {
    // console.log(data);
    // return;

    disabled.on();
    const formData = new FormData(formRef.current || undefined);

    formData.append("bachelors", JSON.stringify(data.bachelors));
    formData.append("masters", JSON.stringify(data.masters));
    formData.append("phd", JSON.stringify(data.phd));

    //@ts-ignore
    uploadedImage && formData.append("image", uploadedImage);
    create.mutate(formData);

    !create.isLoading && disabled.off();
    if (create.isSuccess) {
      dispatch(
        showAlert({
          text: "University has been created successfully",
          show: true,
          type: "success",
        })
      );
      goBack();
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    setValue("image", null);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      setUploadedImage(null);
      return;
    }
    setValue("image", e.target.files[0]);
    setUploadedImage(e.target.files[0]);
  };

  useEffect(() => {
    if (!isEditMode) reset(copyObj(universityObj));
  }, [isEditMode]);

  useEffect(() => {
    if (!isCreatedUni(data?.data.university)) return;
    reset(data?.data.university);
  }, [data]);

  const editUniversity = async (data: Partial<IUniversity>) => {};

  if (isLoading && uniId)
    return <p>Getting information about the university</p>;

  return (
    <div>
      <form
        ref={formRef}
        className="p-2 gap-2 flex flex-col"
        onSubmit={handleSubmit(isEditMode ? editUniversity : createUniversity)}
      >
        <h3 className="text-center text-3xl">Add university details below</h3>
        <h4 className="my-1 text-xl">Name:</h4>
        <div className="flex gap-2">
          <Input
            wrapperClassName="w-full"
            placeholder="English"
            {...register("name.en")}
          />
          <Input
            wrapperClassName="w-full"
            placeholder="Russian"
            {...register("name.ru")}
          />
          <Input
            wrapperClassName="w-full"
            placeholder="Uzbek"
            {...register("name.uz")}
          />
        </div>
        <div className="flex gap-2">
          <DatePicker
            name="foundIn"
            setvalue={setValue}
            wrapperClassName="w-full"
            placeholder="Foundation date"
          />
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
        <h4 className="my-1 text-xl">Description:</h4>
        <div className="flex gap-2">
          <Input
            multiline
            wrapperClassName="w-full"
            placeholder="English"
            {...register("description.en")}
          />
          <Input
            multiline
            placeholder="Russian"
            wrapperClassName="w-full"
            {...register("description.ru")}
          />
          <Input
            multiline
            placeholder="Uzbek"
            wrapperClassName="w-full"
            {...register("description.uz")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="file"
            id="uni_image"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label
            htmlFor="uni_image"
            className="cursor-pointer flex p-2 gap-2 bg-primary-900 w-max rounded-lg mt-2"
          >
            <Icon icon="iconamoon:cloud-upload-duotone" width={25} />
            <p>Upload image</p>
          </label>
          {uploadedImage && (
            <>
              <p>{uploadedImage.name}</p>
              <Tooltip text="Delete" position="bottom">
                <div
                  onClick={removeUploadedImage}
                  className="text-red-500 rounded-lg cursor-pointer p-1"
                >
                  <Icon icon="iconamoon:sign-times-circle-duotone" width={25} />
                </div>
              </Tooltip>
            </>
          )}
        </div>
        <h4 className="mt-1 text-xl">Programms:</h4>
        <div>
          <CourseDetailsSection
            course="bachelors"
            control={control}
            register={register}
            getValues={getValues}
          />
          <CourseDetailsSection
            course="masters"
            control={control}
            register={register}
            getValues={getValues}
          />
          <CourseDetailsSection
            course="phd"
            control={control}
            register={register}
            getValues={getValues}
          />
        </div>
        <div className="w-full mt-2 h-[1px] bg-slate-400 rounded-full"></div>
        <div className="w-full flex justify-center">
          <Button
            text="Cancel"
            afterIcon="iconamoon:sign-times-circle-duotone"
            wrapperClassName="bg-red-500 text-white mx-2"
            onClick={goBack}
          />
          {isEditMode ? (
            <Button
              text="Save changes"
              type="submit"
              afterIcon="iconamoon:edit-duotone"
              wrapperClassName="bg-blue-400 text-white"
              disabled={disabled.state}
            />
          ) : (
            <Button
              text="Create record"
              type="submit"
              afterIcon="iconamoon:sign-plus-square-duotone"
              wrapperClassName="bg-green-500 text-white"
              disabled={disabled.state}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default UniversityAddPage;
