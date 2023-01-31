import { MetaResponse } from "../api-handler"

  
  export interface State {
    id: number
    createdAt: string
    updatedAt: string
    deletedAt: any
    type: Type
    name: string
    code: string
  }
  
  export interface Type {
    id: number
    createdAt: string
    updatedAt: string
    deletedAt: any
    name: string
    code: string
  }
  
  export interface Availability {
    id: number
    createdAt: string
    updatedAt: string
    deletedAt: any
    type: Type
    name: string
    code: string
  }

  
  export interface Country {
    id: number
    createdAt: string
    updatedAt: string
    deletedAt: any
    type: Type
    name: string
  }

  
  export interface Client {
    id: number
    createdAt: string
    updatedAt: string
    deletedAt: any
    nickName: string
    firstName: string
    secondName: any
    firstSurname: string
    secondSurname: string
    role: Role
  }
  
  export interface Role {
    id: number
    createdAt: string
    updatedAt: string
    deletedAt: any
    type: Type
    name: string
  }
  

  
  export interface Peripheral {
    id: number
    createdAt: string
    updatedAt: string
    deletedAt: any
    type: Type
    value: any
    alive: boolean
    lastVerifiedLivedAt: any
  }


  
  export interface Client2 {
    id: number
    createdAt: string
    updatedAt: string
    deletedAt: any
    nickName: string
    firstName: string
    secondName: any
    firstSurname: string
    secondSurname: string
    role: Role2
  }
  
  export interface Role2 {
    id: number
    createdAt: string
    updatedAt: string
    deletedAt: any
    type: Type
    name: string
  }
  


export interface Warehouse {
    id: number
    createdAt: string
    updatedAt: string
    deletedAt: any
    state: State
    availability: Availability;
    country: Country;
    name: string;
    province: string;
    location: string;
}
export interface PersonType{
    id: number
    createdAt: string
    updatedAt: string
    deletedAt: any
    type: Type
    name: string
}

export interface DocumentType{
    id: number
    createdAt: string
    updatedAt: string
    deletedAt: any
    type: Type
    name: string
}

export interface StreetType{
  id: number
  createdAt: string
  updatedAt: string
  deletedAt: any
  type: Type
  name: string
}

export interface Priority{
  id: number
  createdAt: string
  updatedAt: string
  deletedAt: any
  type: Type
  name: string
}

export interface Name{
  id: number
  createdAt: string
  updatedAt: string
  deletedAt: any
  type: Type
  name: string
}
export interface SecondaryEmailRelationship{
  id: number
  createdAt: string
  updatedAt: string
  deletedAt: any
  type: Type
  name: string
}
export interface BackupEmailRelationship{
  id: number
  createdAt: string
  updatedAt: string
  deletedAt: any
  type: Type
  name: string
}
export interface Responsible{
  id:                         number;
    createdAt:                  string;
    updatedAt:                  string;
    deletedAt:                  null|string;
    passwordChanged:            boolean;
    emailVerifiedAt:            string;
    secondaryEmailVerifiedAt:   string;
    backupEmailVerifiedAt:      string;
    whatsappVerifiedAt:         string;
    nickName:                   string;
    firstName:                  string;
    secondName:                 string;
    firstSurname:               string;
    secondSurname:              string;
    email:                      string;
    secondaryEmail:             string;
    backupEmail:                string;
    documentValue:              string;
    province:                   string;
    location:                   string;
    direction:                  string;
    postalCode:                 string;
    landlinePhone:              string;
    mobilePhone:                string;
    firstContact:               string;
    secondContact:              string;
    contactSchedule:            string;
    discount:                   string;
    tracing:                    string;
    description:                string;
    state:                      State;
    availability:               Availability;
    role:                       Role;
    personType:                 PersonType;
    documentType:               DocumentType;
    streetType:                 StreetType;
    country:                    Country;
    secondaryEmailRelationship: SecondaryEmailRelationship;
    backupEmailRelationship:    BackupEmailRelationship;
}

export interface PaymentMethod{

  id: number
  createdAt: string
  updatedAt: string
  deletedAt: any
  type: Type
  name: string
  code: string
}

export interface GetCataloguesResponse extends MetaResponse{
  data: State[]
}