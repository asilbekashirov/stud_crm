export interface IUniversityAdd {
  name: {
    ru: string
    uz: string
    en: string
  }
  _id?: string
  createdAt?: string | Date
  updatedAt?: string | Date
  foundIn: string;
  country: string;
  city: string;
  description: {
    en: string
    uz: string
    ru: string
  }
  image: File | null | string;
  bachelors: IUniversityProgramm[];
  masters: IUniversityProgramm[];
  phd: IUniversityProgramm[];
}

export const universityObj: IUniversityAdd = {
  name: {
    en: "",
    ru: "",
    uz: ""
  },
  foundIn: "",
  country: "",
  city: "",
  description: {
    en: "",
    ru: "",
    uz: ""
  },
  image: null,
  bachelors: [],
  masters: [],
  phd: [],
};

export interface IUniversityProgramm {
  name: {
    ru: string
    en: string
    uz: string
  }
  description: {
    en: string
    ru: string
    uz: string
  }
  active: boolean;
  tuitionFee: number;
  semesters: number;
  intake: {
    fall: boolean
    spring: boolean
  }
}

export const universityProgrammObj: IUniversityProgramm = {
  name: {
    ru: "",
    en: "",
    uz: ""
  },
  description: {
    en: "",
    ru: "",
    uz: ""
  },
  active: false,
  tuitionFee: 0,
  semesters: 0,
  intake: {
    spring: false,
    fall: false
  }
};
