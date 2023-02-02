import { MetaResponse } from "../api-handler"
import { Availability, Client, Client2, Country, Peripheral, State } from "../core/interface"

  
interface Installation {
    id: number
    createdAt: string
    updatedAt: string
    deletedAt: any
    name: string
    postalCode: string
    province: string
    location: string
    direction: string
    description: string
    state: State
    availability: Availability
    country: Country
    client: Client
    peripherals: Peripheral[]
    clients: Client2[]
    devices: any[]
}

interface CreateInstallationRequest{
    name: string;
    postalCode: string;
    province: string;
    location: string;
    direction: string;
    description: string;
    country: {
        id: number;
    };
    client: {
        id: number;
    };
    clients: number[];
}

interface GetInstallationsResponse extends MetaResponse{
    data: Installation[];

}
interface GetInstallationResponse{
    code: string;
    status: number;
    message: Installation
}


interface UpdateInstallationsRequest{
    name: string;
    postalCode: string;
    province: string;
    location: string;
    direction: string;
    description: string;
    country: {
        id: number;
    };
    client: {
        id: number;
    };
    state: {
        id: number;
    };
}



export type{
    GetInstallationsResponse,
    Installation,
    CreateInstallationRequest,
    UpdateInstallationsRequest,
    GetInstallationResponse
}