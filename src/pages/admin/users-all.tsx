import { useQuery } from "@tanstack/react-query";
import api from "../../api/user"
import UserCard from "../../components/user-card/UserCard";

const AllUsersPage = () => {

    const {isLoading, data, isError } = useQuery({queryKey: ["allUsers"], queryFn: () => api.getAllUsers()})

    if (isLoading) return <p>Loading</p>;
    if (isError) return <p>Error</p>;

    return (
        <div className="flex flex-col justify-center w-4/5 m-auto">
            {
                data?.data?.map(user => (
                    <UserCard {...user} key={user._id} />
                ))                
            }
        </div>
    )
}

export default AllUsersPage