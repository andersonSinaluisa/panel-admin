import { MetaResponse } from "../api-handler";
import { Availability, Name, Priority, Responsible, State, Type } from "../core/interface";

interface CreateTaskRequest{
    
    interventionAt: string;
    description:    string;
    observation:    string;
    responsible:    {
        id: number;
    };
    type:           {
        id: number;
    };
    priority:       {
        id: number;
    };
    name:           {
        id: number;
    };
}


interface Task{
    id:             number;
    createdAt:      string;
    updatedAt:      string;
    deletedAt:      null;
    interventionAt: string;
    description:    string;
    observation:    string;
    state:          State;
    availability:   Availability;
    responsible:    Responsible;
    type:           Type;
    priority:       Priority;
    name:           Name;
}


interface GetTaskResponse extends MetaResponse{
    
    data: Task[];
}

interface GetTaskByIdResponse{

    status: number;
    message: Task | any;
}

interface CloseTaskRequest{
    state:{
        id: number;
    }
}

export type{
    CreateTaskRequest,
    Task,
    GetTaskResponse,
    GetTaskByIdResponse,
    CloseTaskRequest
}