export type INews = {
    name: {
        ru: string
        en: string
        uz: string
    },
    description: {
        ru: string
        en: string
        uz: string
    }
} & (ISavedNews | ICreateNews)

export type ISavedNews = {
    _id: string
    image: File | null
}

export type ICreateNews = {
    image: string
}

export const newsObj: INews = {
    name: {
        ru: "",
        en: "",
        uz: "",
    },
    description: {
        ru: "",
        en: "",
        uz: "",
    },
    image: ""
}