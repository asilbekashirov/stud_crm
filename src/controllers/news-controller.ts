import { ICreateNews, INews } from "../models/news";
import api from '../api/news'

export const createNewsRecord = async (data: FormData) => {
    try {
        return await api.createNews(data)
    } catch (error) {
        console.log(error);
    }
}