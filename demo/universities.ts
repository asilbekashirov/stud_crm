import { faker } from "@faker-js/faker";

export interface IUniversity {
    name: string;
    createdAt: Date;
    programs: number
    description: string;
}

export const universities: IUniversity[] = []

export function populateUniversity(): IUniversity {
    return {
        name: `University of ${faker.name.firstName()} ${faker.name.lastName()}`,
        description: faker.lorem.paragraphs(2),
        programs: Math.round(Math.random() * 25),
        createdAt: faker.date.past(Math.round(Math.random() * 200))
    }
}

Array.from({length: 100}).map(() => universities.push(populateUniversity()))