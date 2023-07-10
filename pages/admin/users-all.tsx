import { useQuery } from "@tanstack/react-query";
import api from "@/api/user"

const AllUsersPage = () => {

    const {isLoading, data} = useQuery({queryKey: ["allUsers"], queryFn: () => api.getAllUsers()})

    console.log(isLoading);
    console.log(data)

    return (
        <div>

        </div>
    )
}

export default AllUsersPage