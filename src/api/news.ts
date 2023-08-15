import { ICreateNews, INews, ISavedNews } from "../models/news"
import axios from "axios"

export default {
    getNews() {
        return axios.get<(INews & ISavedNews)[]>('/news/all')
    },
    createNews(data: FormData) {
        return axios.post<(INews & ISavedNews)>('/news/create', data)
    },
    deleteNews(id: string) {
        return axios.delete(`/news/delete/${id}`)
    },
    editNews(id: string) {
        return axios.put<(INews & ISavedNews)>(`/news/edit/${id}`)
    }
}