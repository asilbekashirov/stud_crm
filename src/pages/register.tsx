import {Link, useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form"
import Input from "../components/input/Input"
import DatePicker from "../components/date-picker/DatePicker"
import Button from "../components/button/Button"
import { useAppDispatch } from "../hooks/redux"
import { copyObj } from "../utils/helpers"
import { IRegisterData, registerObj } from "../models/register"
import { fetchCreateAccount } from "../services/user-service"
import { login, showAlert } from "../redux/store/app"

const RegisterPage = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {handleSubmit, register, setValue} = useForm<IRegisterData>({
        defaultValues: copyObj(registerObj)
    })

    const registerUser = async (data: IRegisterData) => {
        const res = await fetchCreateAccount(data)

        if (res?.status === 200) {
            dispatch(login(res.data))
            navigate("/app/home")
            dispatch(showAlert({
                show: true,
                text: "Account successfully created. Open your email and activate your account to get full access.",
                type: "success"
            }))
        } else {
            dispatch(showAlert({
                show: true,
                text: "Registration error",
                type: "error"
            }))
        }

    }

    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <form onSubmit={handleSubmit(registerUser)}>
                <h2 className="text-2xl text-center">Registration page</h2>
                <Input
                    beforeIcon="iconamoon:profile-circle-duotone"
                    placeholder="Full name"
                    {...register("fullName")}
                    wrapperClassName="mt-3"
                />
                <Input
                    beforeIcon="iconamoon:email-duotone"
                    wrapperClassName="mt-2"
                    type="email"
                    placeholder="E-mail"
                    {...register("email")}
                />
                <Input
                    beforeIcon="iconamoon:lock-duotone"
                    type="password"
                    placeholder="Password"
                    wrapperClassName="mt-2"
                    {...register("password")}
                />
                <DatePicker 
                    wrapperClassName="mt-2"
                    placeholder="Birth date"
                    setvalue={setValue}
                    name="birthday"
                />
                <Button text="Submit" type="submit" wrapperClassName="mt-3 bg-primary-900 w-full" afterIcon="iconamoon:send-duotone" />
                <p className="pt-2 text-center">Already a user? <Link to="/login" className="text-secondary-800">Login instead</Link> </p>
                <p className="text-center w-full pt-1">
                    <Link to="/app/home">Go to a dashboard</Link>
                </p>
            </form>
        </div>
    )
}

export default RegisterPage