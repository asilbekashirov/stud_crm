import { useRouter } from "next/router"

const AuthPage = () => {

    const router = useRouter()

    const handleRouterClick = () => {
        router.push('/dashboard/home')
    }

    return (
        <div>
            <h2>Auth page</h2>
            <button className="p-2 rounded-md border-solid" onClick={handleRouterClick}>Click here to go a Dashboard</button>
        </div>
    )
}

export default AuthPage