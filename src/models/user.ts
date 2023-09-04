interface IUserUnis {
    name: {
        ru: string
        en: string
        uz: string
    },
    country: string
    city: string
    _id: string
}

export interface IUser {
    birthday: string;
    email: string;
    _id: string;
    isActivated: boolean;
    fullName: string;
    role: "user" | "admin"
    createdAt?: string;
    selectedUniversities: IUserUnis[]
    appliedUniversities: IUserUnis[]
    image: string
    documents: [
        {transcript: ""},
        {languageCertificates: []},
    ]
}

export const userObj: IUser = {
    birthday: "",
    email: "",
    _id: "",
    isActivated: false,
    fullName: "",
    role: "user",
    selectedUniversities: [],
    appliedUniversities: [],
    image: "",
    documents: [
        {transcript: ""},
        {languageCertificates: []},
    ]
}