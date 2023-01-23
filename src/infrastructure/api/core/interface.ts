
  
  export interface State {
    id: number
    createdAt: string
    updatedAt: string
    deletedAt: any
    type: Type
    name: string
  }
  
  export interface Type {
    id: number
    created_at: string
    updated_at: string
    deleted_at: any
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