export type ISavedUniversity = {
  _id: string
  image: string;
  createdAt?: string | Date
  updatedAt?: string | Date
}

export type ICreateUniversity = {
  image: File | null
}

export type IUniversity = {
  name: {
    ru: string
    uz: string
    en: string
  }
  foundIn: string;
  country: string;
  city: string;
  description: {
    en: string
    uz: string
    ru: string
  }
  bachelors: IUniversityProgramm[];
  masters: IUniversityProgramm[];
  phd: IUniversityProgramm[];
} & (ISavedUniversity | ICreateUniversity)

export const universityObj: IUniversity = {
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
  languages: string[];
  educationType: {
    fullTime: boolean
    partTime: boolean
  }
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
  educationType: {
    fullTime: false, 
    partTime: false
  },
  languages: [],
  semesters: 0,
  intake: {
    spring: false,
    fall: false
  }
};
