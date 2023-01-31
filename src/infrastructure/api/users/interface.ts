import { MetaResponse } from "../api-handler"

interface User {
    
    id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
    passwordChanged: boolean,
    emailVerifiedAt: string,
    secondaryEmailVerifiedAt: string,
    backupEmailVerifiedAt: string,
    whatsappVerifiedAt: string,
    nickName: string,
    firstName: string,
    secondName: string,
    firstSurname: string,
    secondSurname: string,
    email: string,
    secondaryEmail: string,
    backupEmail: string,
    documentValue: string,
    province: string,
    location: string,
    direction: string,
    postalCode: string,
    landlinePhone: string,
    mobilePhone: string,
    firstContact: string,
    secondContact: string,
    contactSchedule: string,
    discount: string,
    tracing: string,
    description: string,
    state: {
        id: number,
        createdAt: string,
        updatedAt: string,
        deletedAt: string,
        name: string
    },
    availability: {
        id: number,
        createdAt: string,
        updatedAt: string,
        deletedAt: string,
        name: string
    },
    role: {
        id: number,
        createdAt: string,
        updatedAt: string,
        deletedAt: string,
        name: string
    },
    personType: {
        id: number,
        createdAt: string,
        updatedAt: string,
        deletedAt: string,
        name: string
    },
    documentType: {
        id: number,
        createdAt: string,

        updatedAt: string,
        deletedAt: string,
        name: string
    },
    streetType: {
        id: number,
        createdAt: string,
        updatedAt: string,
        deletedAt: string,
        name: string
    },
    createdBy: {
        id: number,
        createdAt: string,
        updatedAt: string,
        deletedAt: string,
        name: string
    },
    country: {
        id: number,
        createdAt: string,
        updatedAt: string,
        deletedAt: string,
        name: string
    },
    secondaryEmailRelationship: {
        id: number,
        createdAt: string,
        updatedAt: string,
        deletedAt: string,
        name: string
    } | null,
    backupEmailRelationship: {
        id: number,
        createdAt: string,
        updatedAt: string,
        deletedAt: string,
        name: string
    } | null

    
}





interface GetUsers extends MetaResponse {
    data: User[],
    
}


interface CreateUserRequest {

    nickName: string;
    firstName: string;
    secondName: string;
    firstSurname: string;
    secondSurname: string;
    email: string;
    secondaryEmail: string;
    backupEmail: string;
    password: string;
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
        id: number
    };
    availability: {
        id: number
    };
    role: {
        id: number,
        role:{
            id: number
        }
    };
    personType: {
        id: number
    };
    documentType: {
        id: number
    };
    streetType: {
        id: number
    };
    country: {
        id: number
    };
    createdBy: {
        id: number
    };
    secondaryEmailRelationship: {
        id: number
    } | null;
    backupEmailRelationship: {
        id: number
    } | null;
    perPage?: number;
}


interface DeleteUserResponse {
    status: number;
    message: string;
}


export type {
    GetUsers,
    CreateUserRequest,
    DeleteUserResponse,
    User
}