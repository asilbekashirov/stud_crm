import { IUser } from "../../models/user";
import { Icon } from "@iconify/react";
import { FC } from "react";
import Button from "../button/Button";
import { fDate } from "../../utils/date";
import useConfirm from "../confirm/Confirm";
import { useAppDispatch } from "../../hooks/redux";
import { showAlert } from "../../redux/store/app";

const UserCard: FC<IUser> = ({
  fullName,
  birthday,
  email,
  isActivated,
  role,
  createdAt,
}) => {

  const confirmDialog = useConfirm()
  const dispatch = useAppDispatch()

  const promoteToAdmin = async () => {
    const res = await confirmDialog({
      message: "Assign this user Admin privileges?",
      trueText: "Assign",
      falseText: "Cancel"
    })

    dispatch(showAlert({
      text: "User has been promoted to Admin",
      show: true,
      type: "success"
    }))
    
  };

  return (
    <>
      <div
        className="p-2 relative bg-primary-800 rounded-lg mt-2 flex flex-col"
      >
        {
          !isActivated && (
            <div className="absolute top-2 border-2 border-solid border-red-500 right-2 bg-primary-800 px-2 py-1 rounded-full text-sm">
              Account is not activated
            </div>
          )
        }
        <div className="flex gap-2">
          <Icon width={25} icon="iconamoon:profile-circle-duotone" />
          <p>{fullName}</p>
        </div>
        <div className="flex gap-2">
          <Icon width={25} icon="iconamoon:email-duotone" />
          <p>{email}</p>
        </div>
        <div className="flex gap-2">
          <Icon width={25} icon="iconamoon:calendar-1-duotone" />
          <p>{birthday}</p>
        </div>
        <div className="flex gap-2">
          <Icon width={25} icon="iconamoon:cloud-add-duotone" />
          <p>{fDate(createdAt as string)}</p>
        </div>
        {role === "user" && (
          <Button
            onClick={promoteToAdmin}
            wrapperClassName="text-white mt-2 bg-blue-500 w-max flex justify-center"
            text="Promote to Admin"
            afterIcon="iconamoon:certificate-badge-duotone"
          />
        )}
      </div>
    </>
  );
};

export default UserCard;
