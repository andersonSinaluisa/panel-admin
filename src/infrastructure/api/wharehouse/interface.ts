import { MetaResponse } from "../api-handler"
import { Availability, Country, State } from "../core/interface"

interface WhareHouse{
    id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
    name: string,
    province: string,
    location: string,
    state: State,
    availability: Availability,
    country: Country,

}

interface GetWharehouse extends MetaResponse{
    data: WhareHouse[]
}

export type {
    WhareHouse,
    GetWharehouse
}