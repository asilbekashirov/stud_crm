import api from '@/api/user'
import { ILoginData } from '@/models/login';

export const fetchLogin = async ({email, password}: ILoginData) => {
    try {
        return await api.login({email, password})
    } catch (error) {
        console.log(error);
    }
}