import api from '../api/user'
import { ILoginData } from '../models/login';
import { IRegisterData } from '../models/register';
import { ISavedUniversity, IUniversity } from '../models/university';

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

export const fetchUniversitySelect = async (userId: string, university: Partial<IUniversity & ISavedUniversity>) => {
    try {
        return await api.selectUniversity(userId, university)
    } catch (error) {
        console.log(error);
    }
}