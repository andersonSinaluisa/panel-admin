
interface CreateTaskRequest{
    name: string;
    type: string;
    description: string;
    priority: string;
    interventionDate: string;
    responsible: string;
    observation: string;
}


interface Task{
    _id: string;
    identityCounter: string;
    name: string;
    type: string;
    description: string;
    state: string;
    priority: string;
    interventionDate: string;
    responsible: string;
    createdBy: string;
    observation: string;
    createdAt: string;
}


interface GetTaskResponse{
    
    status: number;
    message: Task[];
}

interface GetTaskByIdResponse{

    status: number;
    message: Task | any;
}

interface CloseTaskRequest{
    note:string;
}

export type{
    CreateTaskRequest,
    Task,
    GetTaskResponse,
    GetTaskByIdResponse,
    CloseTaskRequest
}