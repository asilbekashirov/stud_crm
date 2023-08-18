import { ILoginData } from "../models/login"
import { IRegisterData } from "../models/register"
import { ISavedUniversity, IUniversity } from "../models/university"
import { IUser } from "../models/user"
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
    },
    updateUser(id: string, data: Partial<IUser>) {
        return axios.put<IUser>(`/auth/user/${id}/update`, data)
    },
    deleteUser(id: string) {
        return axios.delete<{message: string}>(`/auth/user/${id}/delete`)
    },
    getProfile(id: string) {
        return axios.get<IUser>(`/auth/user/${id}`)
    },
    selectUniversity(userId: string, university: Partial<IUniversity & ISavedUniversity>) {
        return axios.post(`/auth/user/${userId}/add-university`, university)
    }
}