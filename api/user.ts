import { ILoginData } from "@/models/login"
import { IRegisterData } from "@/models/register"
import { IUser } from "@/models/user"
import axios from "axios"

export default {
    login(data: ILoginData) {
        return axios.post<{accessToken: string, user: IUser}>("/auth/login", data)
    },
    register(data: IRegisterData) {
        return axios.post("/auth/register", data)
    },
    getAllUsers() {
        return axios.get<IUser[]>("/auth/users")
    }
}