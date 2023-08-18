import api from '../api/user'
import { ILoginData } from '../models/login';
import { IRegisterData } from '../models/register';

export const fetchLogin = async (props: ILoginData) => {
    try {
        return await api.login(props)
    } catch (error) {
        console.log(error);
    }
}

export const fetchCreateAccount = async (props: IRegisterData) => {
    try {
        return await api.register(props)
    } catch (error) {
        console.log(error);
    }
}

export const fetchUniversitySelect = async (userId: string, universitiesId: string[]) => {
    try {
        return await api.selectUniversities(userId, universitiesId)
    } catch (error) {
        console.log(error);
    }
}