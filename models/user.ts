export interface IUser {
    birthday: string;
    email: string;
    id: string;
    isActivated: boolean;
    fullName: string;
    role: "user" | "admin"
}

export const userObj: IUser = {
    birthday: "",
    email: "",
    id: "",
    isActivated: false,
    fullName: "",
    role: "user"
}