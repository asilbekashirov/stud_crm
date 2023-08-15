import api from '../api/universities'
import { ICreateUniversity, IUniversity } from '../models/university'

export const fetchCreateUniversity = async (data: FormData) => {
    try {
        return await api.createUniversity(data)
    } catch (error) {
        console.log(error);
    }
}