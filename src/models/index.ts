export type ILanguages = "en" | "uz" | "ru"
export type IParams<T> = {
    docs: T[]
    hasNextPage: boolean
    hasPrevPage: boolean
    limit: number
    nextPage: number
    page: number
    pagingCounter: number
    prevPage: null | number
    totalDocs: number
    totalPages: number
}