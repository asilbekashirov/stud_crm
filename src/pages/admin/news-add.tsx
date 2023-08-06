import Input from "../../components/input/Input";
import Tooltip from "../../components/tooltip/Tooltip";
import { ICreateNews, INews, ISavedNews, newsObj } from "../../models/news";
import { copyObj } from "../../utils/helpers";
import { Icon } from "@iconify/react";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const NewsAddPage = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const { register, handleSubmit, setValue } = useForm<INews & (ICreateNews | ISavedNews)>({
    defaultValues: copyObj(newsObj),
  });

  const createNews = async (data: INews) => {
    const formData = new FormData(formRef.current || undefined);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      setUploadedImage(null);
      return;
    }
    setValue("image", e.target.files[0]);
    setUploadedImage(e.target.files[0]);
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    setValue("image", "");
  };

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={handleSubmit(createNews)}
        className="flex flex-col"
      >
        <h3 className="text-center text-2xl">Add details below</h3>
        {uploadedImage && (
          <div className="w-full h-[26rem] mt-4">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={URL.createObjectURL(uploadedImage)}
              alt="News preview"
            />
          </div>
        )}
        <h4 className="my-2 text-lg">Name:</h4>
        <div className="flex gap-2">
          <Input
            placeholder="En"
            wrapperClassName="w-full"
            {...register("name.en")}
          />
          <Input
            placeholder="Ru"
            wrapperClassName="w-full"
            {...register("name.ru")}
          />
          <Input
            placeholder="Uz"
            wrapperClassName="w-full"
            {...register("name.uz")}
          />
        </div>
        <h4 className="my-2 text-lg">Description:</h4>
        <div className="flex gap-2">
          <Input
            placeholder="En"
            wrapperClassName="w-full"
            multiline
            {...register("description.en")}
          />
          <Input
            placeholder="Ru"
            multiline
            wrapperClassName="w-full"
            {...register("description.ru")}
          />
          <Input
            placeholder="Uz"
            multiline
            wrapperClassName="w-full"
            {...register("description.uz")}
          />
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <input
              type="file"
              id="uni_image"
              className="hidden"
              accept="image/png, image/gif, image/jpeg, image/webp, image/svg"
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
                    <Icon
                      icon="iconamoon:sign-times-circle-duotone"
                      width={25}
                    />
                  </div>
                </Tooltip>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewsAddPage;
