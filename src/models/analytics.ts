export interface ICountryAndCount {
    universities: number;
    country: string;
    _id: string;
}

export interface IAnalytics {
    totalUniversities: number;
    totalUsers: number;
    countriesAndCounts: ICountryAndCount[]
}