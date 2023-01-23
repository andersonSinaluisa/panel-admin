import { MetaResponse } from "../api-handler";



 interface Type {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
    name: string;
    code: string;
}

 interface State {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: any;
    type: Type;
    name: string;
    code: string;
}

 interface Type2 {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
    name: string;
    code: string;
}

 interface Availability {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: any;
    type: Type2;
    name: string;
    code: string;
}

 interface Sdf {
    id: number;
    created_at: string;
    updated_at: string;
    role_id: number;
    role_child_id: number;
}

 interface Role {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: any;
    role: string;
}

 interface Type3 {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
    name: string;
    code: string;
}

 interface StreetType {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: any;
    type: Type3;
    name: string;
    code: string;
}

 interface Type4 {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
    name: string;
    code: string;
}

 interface Country {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: any;
    type: Type4;
    name: string;
    code: string;
}

 interface Type5 {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
    name: string;
    code: string;
}

 interface SecondaryEmailRelationship {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: any;
    type: Type5;
    name: string;
    code: string;
}

 interface Type6 {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
    name: string;
    code: string;
}

 interface BackupEmailRelationship {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: any;
    type: Type6;
    name: string;
    code: string;
}

 interface Type7 {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
    name: string;
    code: string;
}

 interface PersonType {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: any;
    type: Type7;
    name: string;
    code: string;
}

 interface Type8 {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
    name: string;
    code: string;
}

 interface DocumentType {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: any;
    type: Type8;
    name: string;
    code: string;
}

 interface Personal {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: any;
    passwordChanged: boolean;
    emailVerifiedAt: string;
    secondaryEmailVerifiedAt: string;
    backupEmailVerifiedAt: string;
    whatsappVerifiedAt: string;
    nickName: string;
    firstName: string;
    secondName: string;
    firstSurname: string;
    secondSurname: string;
    email: string;
    secondaryEmail: string;
    backupEmail: string;
    documentValue: string;
    province: string;
    location: string;
    direction: string;
    postalCode: string;
    landlinePhone: string;
    mobilePhone: string;
    firstContact: string;
    secondContact: string;
    contactSchedule: string;
    discount: string;
    tracing: string;
    description: string;
    state: State;
    availability: Availability;
    sdf: Sdf;
    role: Role;
    streetType: StreetType;
    country: Country;
    secondaryEmailRelationship: SecondaryEmailRelationship;
    backupEmailRelationship: BackupEmailRelationship;
    personType: PersonType;
    createdBy?: any;
    documentType: DocumentType;
    dependents: any[];
    permissions: any[];
}




interface Permission {
    id: string;
    name: string;
}


interface GetPersonalResponse extends MetaResponse{
    data: Personal[];
}
interface GetPersonalByIdResponse {
    message: string;
    data: Personal;
}

interface CreatePersonalRequest {
    userId: string;
    documentType: string;
    document: string;
    name: string;
    lastname1: string;
    type: string;
    direction: string;
    postalCode: string;
    location: string;
    province: string;
    country: string;
    phone: string;
    mobilePhone: string;
    contact: string;
    contact2: string;
    email: string;
    contactSchedule: string;
    note: string;
    createdBy: string;
}


 export type {
    Personal,
    Permission,
    GetPersonalResponse,
    CreatePersonalRequest,
    GetPersonalByIdResponse
}