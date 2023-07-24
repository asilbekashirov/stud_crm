import { IUniversityAdd } from "../models/university-add";
import axios from "axios";

export default {
    updateUniversity(id: string, data: Partial<IUniversityAdd>) {
        return axios.put<IUniversityAdd>(`/uni/${id}/update`, data)
    },
    deleteUniversity(id: string) {
        return axios.delete<{message: string}>(`/uni/${id}/delete`)
    },
    getUniversityById(id: string) {
        return axios.get<{university: IUniversityAdd}>(`/uni/get/${id}`)
    },
    getUniversities() {
        return axios.get<IUniversityAdd[]>(`/uni/list`)
    },
    createUniversity(data: FormData) {
        return axios.post<IUniversityAdd>("/uni/create", data)
    }
}