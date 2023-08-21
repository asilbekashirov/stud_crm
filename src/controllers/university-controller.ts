import api from '../api/universities'

export const fetchCreateUniversity = async (data: FormData) => {
    try {
        return await api.createUniversity(data)
    } catch (error) {
        console.log(error);
    }
}

export const fetchEditUniversity = async (data: FormData) => {

}

export const fetchDeleteUniversity = async (id: string) => {
    try {
        return await api.deleteUniversity(id)
    } catch (error) {
        console.log(error);
    }
}