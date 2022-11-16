
interface Job{
    _id: string;
    identityCounter: string;
    idClient: string;
    direction: string;
    contactName: string;
    contactPhone: string;
    obsContact: string;
    type:string;
    priority: string;
    interventionDate: string;
    description: string;
    material: string;
    technical: string;
    workReport: string;
    note: string;
    createdAt: string;
    state: string;
}

interface GetJobsResponse{
    status: number;
    message: Job[]
}



interface CreateJobRequest{
    idClient: string;
    direction: string;
    contactName: string;
    contactPhone: string;
    obsContact: string;
    type: string;
    priority: string;
    interventionDate: string;
    description: string;
    material: string;
    technical: string;
}


interface CloseJobRequest{
    
    material: string;
    workReport: string;
    note: string;
}


export type{
    GetJobsResponse,
    CreateJobRequest,
    CloseJobRequest,
    Job
}