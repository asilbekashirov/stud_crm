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
    image: string
}

export type ICreateNews = {
    image: File | null
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
    image: null
}