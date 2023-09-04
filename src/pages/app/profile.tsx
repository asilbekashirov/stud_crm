import { useQuery } from "@tanstack/react-query"
import { useAppSelector } from "../../hooks/redux"
import api from '../../api/user'
import Container from "../../components/container/Container"

const ProfilePage = () => {

    const userId = useAppSelector(state => state.app.user._id)

    const {data, isLoading} = useQuery({
        queryKey: ["user"],
        queryFn: () => api.getProfile(userId)
    })

    const profile = data?.data.user

    if (isLoading) return <div>Loading...</div>    

    return (
        <Container>
            <h1 className="text-2xl font-bold">
                {profile?.fullName}
            </h1>
        </Container>
    )
}

export default ProfilePage