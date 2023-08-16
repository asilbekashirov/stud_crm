import { useQuery } from "@tanstack/react-query"
import { useAppSelector } from "../../hooks/redux"
import api from '../../api/user'

const ProfilePage = () => {

    const userId = useAppSelector(state => state.app.user._id)

    const {data, isLoading} = useQuery({
        queryKey: ["user"],
        queryFn: () => api.getProfile(userId)
    })

    if (isLoading) return <div>Loading...</div>    

    return (
        <main>
            profile
        </main>
    )
}

export default ProfilePage