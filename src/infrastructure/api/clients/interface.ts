import { MetaResponse } from "../api-handler";

interface Client{


    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
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
        
    state: {
        id: number;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        name: string;
    };
    availability: {
        id: number;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        name: string;
    };
    role: {
        id: number;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        name: string;
    };
    personType: {
        id: number;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        name: string;
    };
    createdBy: any;
    documentType: {
        id: number;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        name: string;
    };
    streetType: {
        id: number;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        name: string;

    };
    country: {
        id: number;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        name: string;
    };
    secondaryEmailRelationship: {
        id: number;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        name: string;
    };
    backupEmailRelationship: {
        id: number;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        name: string;
    };
}


interface GetClientsResponse extends MetaResponse{
    data: Client[]
}

interface CreateClientRequest{
    userId: string;
    personType: string;
    documentType: string;
    document: string;
    name: string;
    lastname: string;
    customerType:string;
    roadType: string;
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
    webpage: string;
    contactSchedule: string;
    discount: string;
    note: string;
}


interface ClientUpdateRequest{
    name: string;
    secondaryEmail: string;
    backupEmail: string;
    mobilePhone: string;
    documentValue: string;
    province: string;
    location: string;
    direction: string;
    postalCode: string;
    landlinePhone: string;
    firstContact: string;
    secondContact: string;
    contactSchedule: string;
    discount: string;
    tracing: string;
    description: string;
    personType: {
        id: number;
    };
    documentType: {
        id: number;
    };
    streetType: {
        id: number;
    };
    country: {
        id: number;
    };
    secondaryEmailRelationship: {
        id: number;
    };
    backupEmailRelationship: {
        id: number;
    };


    
}


export type{
    GetClientsResponse,
    Client,
    CreateClientRequest,
    ClientUpdateRequest
}