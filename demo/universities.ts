import { faker } from "@faker-js/faker";

export interface IUniversity {
    id: number | string;
    name: string;
    createdAt: Date;
    programs: number;
    country: string;
    city: string;
    active: boolean;
    tuitionFee: number;
    description: string;
    image: string;
    foundIn: Date;
}

export const universities: IUniversity[] = []

export function populateUniversity(id: number): IUniversity {
    return {
        id: id,
        name: `University of ${faker.name.firstName()} ${faker.name.lastName()}`,
        description: faker.lorem.paragraphs(4),
        programs: Math.round(Math.random() * 25),
        country: faker.address.country(),
        city: faker.address.city(),
        active: Math.round(Math.random() * 2) === 1,
        image: faker.image.city(undefined, undefined, true),
        tuitionFee: Math.round(Math.random() * 10000),
        createdAt: faker.date.past(Math.round(Math.random() * 200)),
        foundIn: faker.date.past(Math.round(Math.random() * 200))
    }
}

Array.from({length: 100}).map((_, index) => universities.push(populateUniversity(index)))