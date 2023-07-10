import { IUser } from "@/models/user"
import { Icon } from "@iconify/react"
import { FC } from "react"

const UserCard: FC<IUser> = ({fullName, birthday, email, isActivated}) => {

    return (
        <div className="p-2 rounded-lg mt-2 flex flex-col border-2 border-solid border-primary-900">
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
        </div>
    )
}

export default UserCard