import { MetaResponse } from "../api-handler";
import { Client } from "../clients/interface";
import { Availability, State, Type } from "../core/interface";
import { Installation } from "../installation/interface";

interface Notification{
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    description: string;
    state:State;
    type:Type;
    availability:Availability;
    installation:Installation;
    client:Client;
    device:any;
}

interface GetNotifications extends MetaResponse{
    data:Notification[];
}

export type { Notification,GetNotifications };