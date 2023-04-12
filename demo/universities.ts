import { faker } from "@faker-js/faker";

export interface IUniversity {
    name: string;
    createdAt: Date;
    programs: number;
    country: string;
    city: string;
    active: boolean;
    educationCost: number;
    description: string;
}

export const universities: IUniversity[] = []

export function populateUniversity(): IUniversity {
    return {
        name: `University of ${faker.name.firstName()} ${faker.name.lastName()}`,
        description: faker.lorem.paragraphs(2),
        programs: Math.round(Math.random() * 25),
        country: faker.address.country(),
        city: faker.address.city(),
        active: Math.round(Math.random() * 2) === 1,
        educationCost: Math.round(Math.random() * 10000),
        createdAt: faker.date.past(Math.round(Math.random() * 200))
    }
}

Array.from({length: 100}).map(() => universities.push(populateUniversity()))