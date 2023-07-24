import { faker } from "@faker-js/faker";

export interface ITodo {
    text: string;
    completed: boolean;
}

export interface IUser {
    name: string
    surname: string
    dateOfBirth: Date
    email: string
    photoUrl: string
    password: string
    todo: ITodo[]
}

export const user: IUser = {
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    dateOfBirth: faker.date.birthdate(),
    email: faker.internet.email(),
    photoUrl: faker.image.avatar(),
    password: faker.internet.password(),
    todo: [
        {
            text: "Upload passport",
            completed: true
        },
        {
            text: "Upload photo",
            completed: false
        },
        {
            text: "Upload transcript of records",
            completed: false
        }
    ]
}