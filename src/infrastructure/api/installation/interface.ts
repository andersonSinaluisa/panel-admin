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
    owner: string;
    postalCode: string;
    location: string;
    province: string;
    country: string;
    note: string;
}

interface GetInstallationsResponse extends MetaResponse{
    data: Installation[];

}
interface GetInstallationResponse{
    code: string;
    status: number;
    message: Installation
}


interface UpdateStateInstallationsRequest{
    state:number;
}



export type{
    GetInstallationsResponse,
    Installation,
    CreateInstallationRequest,
    UpdateStateInstallationsRequest,
    GetInstallationResponse
}