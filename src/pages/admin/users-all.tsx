import { useQuery } from "@tanstack/react-query";
import api from "../../api/user"
import UserCard from "../../components/user-card/UserCard";

const AllUsersPage = () => {

    const {isLoading, data } = useQuery({queryKey: ["allUsers"], queryFn: () => api.getAllUsers()})

    if (isLoading) return <p>Loading...</p>

    return (
        <div>
            {
                data?.data?.map(user => (
                    <UserCard {...user} key={user._id} />
                ))                
            }
        </div>
    )
}

export default AllUsersPage