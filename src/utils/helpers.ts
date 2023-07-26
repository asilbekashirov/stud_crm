import { ISavedUniversity, IUniversity } from "../models/university";

export function copyObj(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}

export function isCreatedUni(university: IUniversity | undefined): university is IUniversity & ISavedUniversity {
    return (university as IUniversity & ISavedUniversity)?._id !== undefined
}