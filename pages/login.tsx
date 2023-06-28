import Button from "@/components/button/Button"
import Input from "@/components/input/Input"
import { ILoginData, loginObj } from "@/models/login"
import Link from "next/link"
import { useForm } from "react-hook-form"

const LoginPage = () => {

    const {handleSubmit, register} = useForm<ILoginData>({
        defaultValues: Object.assign({}, loginObj)
    })

    const login = async (data: ILoginData) => {
        console.log(data);
    }

    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <form onSubmit={handleSubmit(login)}>
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
                <Button text="Submit" type="submit" wrapperClassName="mt-3 bg-primary-900" afterIcon="iconamoon:send-duotone" />
                <p className="pt-2 text-center">Don't have account yet? <Link className="text-secondary-800" href="/register">Create here</Link> </p>
                <p className="text-center w-full pt-1">
                    <Link href="/dashboard/home">Go to a dashboard</Link>
                </p>
            </form>
        </div>
    )
}

export default LoginPage