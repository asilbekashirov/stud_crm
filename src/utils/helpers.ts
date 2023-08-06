import { INews, ISavedNews } from "../models/news";
import { ISavedUniversity, IUniversity } from "../models/university";

export function copyObj(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}

export function isCreatedUni(university: IUniversity | undefined): university is IUniversity & ISavedUniversity {
    return (university as IUniversity & ISavedUniversity)?._id !== undefined
}

export function isCreatedNews(news: INews | undefined): news is INews & ISavedNews {
    return (news as INews & ISavedNews)?._id !== undefined
}