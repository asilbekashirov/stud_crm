import { faker } from "@faker-js/faker";

export interface IUser {
    name: string
    surname: string
    dateOfBirth: Date
    email: string
    photoUrl: string
    password: string
}

export const user: IUser = {
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    dateOfBirth: faker.date.birthdate(),
    email: faker.internet.email(),
    photoUrl: faker.image.avatar(),
    password: faker.internet.password()
}