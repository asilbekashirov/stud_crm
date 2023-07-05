export interface IUniversityAdd {
  nameRu: string;
  nameEn: string;
  nameUz: string;
  foundIn: string | Date;
  country: string;
  city: string;
  descriptionRu: string;
  descriptionEn: string;
  descriptionUz: string;
  image: File | null | string;
  bachelors: IUniversityProgramm[];
  masters: IUniversityProgramm[];
  phd: IUniversityProgramm[];
}

export const universityObj: IUniversityAdd = {
  nameEn: "",
  nameRu: "",
  nameUz: "",
  foundIn: "",
  country: "",
  city: "",
  descriptionEn: "",
  descriptionRu: "",
  descriptionUz: "",
  image: null,
  bachelors: [],
  masters: [],
  phd: [],
};

export interface IUniversityProgramm {
  nameRu: string;
  nameEn: string;
  nameUz: string;
  descriptionRu: string;
  descriptionEn: string;
  descriptionUz: string;
  active: boolean;
  tuitionFee: number;
}

export const universityProgrammObj: IUniversityProgramm = {
  nameEn: "",
  nameRu: "",
  nameUz: "",
  descriptionRu: "",
  descriptionEn: "",
  descriptionUz: "",
  active: false,
  tuitionFee: 0,
};
