import { useAppSelector } from "@/hooks/redux"
import { useRouter } from "next/router"
import { useEffect } from "react"

const IndexAdminPage = () => {

    const {isAuth, user: {role}} = useAppSelector(state => state.app)
    const router = useRouter()

    useEffect(() => {
        if (!isAuth && role !== 'admin') {
            router.push('/login')
        } else if (role !== 'admin') {
            router.push('/dashboard/home')
        }
    }, [isAuth, role])

    return (
        <div>
            test
        </div>
    )
}

export default IndexAdminPage