interface Client{
    _id: string;
    identityCounter: string;
    userId: string;
    personType: string;
    documentType: string;
    document: string;
    name: string;
    lastname:string;
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
    installations: Array<{
        id: string;
        role: string;
        permissions: Array<
            {
                id: string;
                name: string;
            }
            >;
    }>;
    createdAt: string;
}


interface GetClientsResponse{
    status: number,
    message: Client[]
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
    personType: string;
    documentType: string;
    document:string;
    name: string;
    customerType:string;
    roadType: string;
    lastname:string;
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


export type{
    GetClientsResponse,
    Client,
    CreateClientRequest,
    ClientUpdateRequest
}