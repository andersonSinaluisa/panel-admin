import { MetaResponse } from "../api-handler";
import { Availability, BackupEmailRelationship, DocumentType, Country, PersonType, Priority, Role, SecondaryEmailRelationship, State, StreetType, Type } from "../core/interface";

interface Job{
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    direction: string;
    contactName: string;
    contactPhone: string;
    workReport: string;
    interveneAt: string;
    description: string;
    state: State,
    availability: Availability;
    technical:{
        id: number;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        passwordChanged: boolean;
        emailVerifiedAt: string;
        secondaryEmailVerifiedAt: string;
        backupEmailVerifiedAt: string;
        whatsappVerifiedAt: string;
        nickName: string;
        firstName: string;
        secondName: string;
        firstSurname: string;
        secondSurname: string;
        email: string;
        secondaryEmail: string;
        backupEmail: string;
        documentValue: string;
        province: string;
        location: string;
        direction: string;
        postalCode: string;
        landlinePhone: string;
        mobilePhone: string;
        firstContact: string;
        secondContact: string;
        contactSchedule: string;
        discount: string;
        tracing: string;
        description: string;
        state:State;
        availability: Availability;
        role:Role;
        personType: PersonType;
        createdBy: string;
        documentType: DocumentType;
        streetType: StreetType;
        country: Country;
        secondaryEmailRelationship: SecondaryEmailRelationship;
        backupEmailRelationship: BackupEmailRelationship;  
    },
    type: Type;
    priority: Priority;
    materials: string[];
}





interface GetJobsResponse extends MetaResponse{
    data: Job[]
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