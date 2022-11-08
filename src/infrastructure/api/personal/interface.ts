
interface Permission{
    id: string;
    name: string;
}

interface Personal{
    _id: string;
    identityCounter: string;
    userId: string;
    documentType: string;
    document: string;
    name: string;
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
    permissions: Permission[];
    dependents: number;
    createdBy: string;
    createdAt: string;


}

interface GetPersonalResponse{
    status: number;
    message: Personal[];
}
interface GetPersonalByIdResponse{
    status: number;
    message: Personal;
}

interface CreatePersonalRequest{
    userId: string;
    documentType: string;
    document: string;
    name: string;
    lastname1:string;
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