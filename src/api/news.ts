import { INews, ISavedNews } from "../models/news"
import axios from "axios"

export default {
    getNews() {
        return axios.get<(INews & ISavedNews)[]>('/news/all')
    },
    createNews() {
        return axios.post('/news/create')
    },
    deleteNews(id: string) {
        return axios.delete(`/news/delete/${id}`)
    },
    editNews(id: string) {
        return axios.put(`/news/edit/${id}`)
    }
}