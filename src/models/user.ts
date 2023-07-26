export interface IUser {
    birthday: string;
    email: string;
    _id: string;
    isActivated: boolean;
    fullName: string;
    role: "user" | "admin"
    createdAt?: string;
}

export const userObj: IUser = {
    birthday: "",
    email: "",
    _id: "",
    isActivated: false,
    fullName: "",
    role: "user"
}