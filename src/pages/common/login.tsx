import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { Link, useNavigate } from "react-router-dom"
import { ILoginData, loginObj } from "../../models/login"
import { copyObj } from "../../utils/helpers"
import { fetchLogin } from "../../controllers/user-controller"
import { login } from "../../redux/store/app"
import Input from "../../components/input/Input"
import Button from "../../components/button/Button"
import { errorAlert } from "../../redux/store/alert"

const LoginPage = () => {

    const {isAuth, user: {role}} = useAppSelector(state => state.app)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {handleSubmit, register} = useForm<ILoginData>({
        defaultValues: copyObj(loginObj)
    })

    const userLogin = async (data: ILoginData) => {
        const res = await fetchLogin(data)
        if (res?.status === 200) {
            dispatch(login(res.data))
            navigate(res.data.user.role === "admin" ? "/admin/universities" : "/app/home")
        } else {
            dispatch(errorAlert({
                message: "Login failed"
            }))
        }
    }

    useEffect(() => {
        if (!isAuth || !role) return
        navigate(role === "admin" ? "/admin/universities" : "/app/home")
    }, [role])

    return (
        <div className="flex flex-col min-h-screen justify-center items-center bg-primary-900">
            <form onSubmit={handleSubmit(userLogin)}>
                <h2 className="text-2xl text-center">Login page</h2>
                <Input
                    beforeIcon="iconamoon:email-duotone"
                    placeholder="E-mail"
                    type="email"
                    {...register("email")}
                    wrapperClassName="mt-3"
                />
                <Input
                    beforeIcon="iconamoon:lock-duotone"
                    placeholder="Password"
                    {...register("password")}
                    type="password"
                    wrapperClassName="mt-2"
                />
                <Button text="Submit" type="submit" wrapperClassName="mt-3 bg-secondary-800 w-full" afterIcon="iconamoon:send-duotone" />
                <p className="pt-2 text-center">Don&apos;t have account yet? <Link className="text-secondary-800" to="/register">Create here</Link> </p>
                <p className="text-center w-full pt-1">
                    <Link to="/app/home">Go to a dashboard</Link>
                </p>
            </form>
        </div>
    )
}

export default LoginPage