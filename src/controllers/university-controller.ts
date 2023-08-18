import api from '../api/universities'

export const fetchCreateUniversity = async (data: FormData) => {
    try {
        return await api.createUniversity(data)
    } catch (error) {
        console.log(error);
    }
}