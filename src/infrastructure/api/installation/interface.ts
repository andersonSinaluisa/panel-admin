
interface Installation {
    _id: string;
    identityCounter: string;
    name: string;
    owner: string;
    postalCode: string;
    location: string;
    province: string;
    country: string;
    note: string;
    devices:string;
    users: Array<
        {
            id: string;
            role: string;
        }
    >,
    createdAt: string;
    state:number;
}

interface CreateInstallationRequest{
    name: string;
    owner: string;
    postalCode: string;
    location: string;
    province: string;
    country: string;
    note: string;
}

interface GetInstallationsResponse{
    code: string;
    status: number;
    message: Array<Installation>
}


interface UpdateStateInstallationsRequest{
    state:number;
}



export type{
    GetInstallationsResponse,
    Installation,
    CreateInstallationRequest,
    UpdateStateInstallationsRequest
}