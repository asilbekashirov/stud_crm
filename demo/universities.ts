import { faker } from "@faker-js/faker";

export interface IUniversity {
    name: string;
    createdAt: Date;
}

export const universities: IUniversity[] = []

export function populateUniversity(): IUniversity {
    return {
        name: `University of ${faker.name.firstName()} ${faker.name.lastName()}`,
        createdAt: faker.date.past(Math.floor(Math.random() * 20))
    }
}

Array.from({length: 100}).map(() => universities.push(populateUniversity()))