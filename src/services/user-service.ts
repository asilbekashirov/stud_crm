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