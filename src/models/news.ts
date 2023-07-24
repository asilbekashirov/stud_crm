export interface INews {
    name: {
        ru: string
        en: string
        uz: string
    },
    _id: string
    image: File | string
}

export const newsObj: INews = {
    name: {
        ru: "",
        en: "",
        uz: "",
    },
    image: "",
    _id: "",
}