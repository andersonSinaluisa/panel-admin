

interface LoginRequest{
    email:string;
    password:string;
}


interface LoginResponse{
 
    data: {
        id: number,
        createdAt: string,
        updatedAt: string,
        deletedAt: string,
        passwordChanged: boolean,
        emailVerifiedAt: string,
        secondaryEmailVerifiedAt: string,
        backupEmailVerifiedAt: string,
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
        createdBy: string,
        documentType: {
            id: number,
            createdAt: string,
            updatedAt: string,
            deletedAt: string,
            name: string
        },
        streetType: string,
        country: {
            id: number,
            createdAt: string,
            updatedAt: string,
            deletedAt: string,

            name: string
        },
        secondaryEmailRelationship: string,
        backupEmailRelationship: string
    },

    token: string,
    message: {
        summary: string,
        detail: string,
        status: number
    }
}


export type{
    LoginRequest,
    LoginResponse
}