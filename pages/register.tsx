import Button from "@/components/button/Button"
import Input from "@/components/input/Input"
import { IRegisterData, registerObj } from "@/models/register"
import Link from "next/link"
import { useForm } from "react-hook-form"

const RegisterPage = () => {

    const {handleSubmit, register} = useForm<IRegisterData>({
        defaultValues: Object.assign({}, registerObj)
    })

    const registerUser = async () => {

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
                <Button text="Submit" type="submit" wrapperClassName="mt-3 bg-primary-900" afterIcon="iconamoon:send-duotone" />
                <p className="pt-2 text-center">Already a user? <Link href="/login" className="text-secondary-800">Login instead</Link> </p>
                <p className="text-center w-full pt-1">
                    <Link href="/dashboard/home">Go to a dashboard</Link>
                </p>
            </form>
        </div>
    )
}

export default RegisterPage