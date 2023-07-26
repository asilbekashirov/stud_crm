import { ISavedUniversity, IUniversity } from "../models/university";
import axios from "axios";

export default {
    updateUniversity(id: string, data: Partial<IUniversity & ISavedUniversity>) {
        return axios.put<IUniversity>(`/uni/${id}/update`, data)
    },
    deleteUniversity(id: string) {
        return axios.delete<{message: string}>(`/uni/${id}/delete`)
    },
    getUniversityById(id: string) {
        return axios.get<{university: IUniversity & ISavedUniversity}>(`/uni/get/${id}`)
    },
    getUniversities() {
        return axios.get<(IUniversity & ISavedUniversity)[]>(`/uni/list`)
    },
    createUniversity(data: FormData) {
        return axios.post<IUniversity & ISavedUniversity>("/uni/create", data)
    }
}