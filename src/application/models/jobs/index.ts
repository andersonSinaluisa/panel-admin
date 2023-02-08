import { createModel } from "@rematch/core";
import { HeaderProps, initialMetaResponse, ResponseServer } from "infrastructure/api/api-handler";
import { jobs_interface, jobs_request } from "infrastructure/api/jobs";
import { GetJobsResponse, Job } from "infrastructure/api/jobs/interface";
import { RootModel } from "..";
import { initialClient } from "../clients";

interface GetJobsStateProps extends ResponseServer{
    data: GetJobsResponse;
}

export interface CreateJobStateProps extends ResponseServer{
    data:{
        status:number;
        message:string;
    }
}

export interface DeleteJobStateProps extends ResponseServer{
    data:{
        status:number;
        message:string;
    }
}

export interface CloseJobStateProps extends ResponseServer{
    data:{
        status:number;
        message:string;
    }
}

export const initJob :Job = {
    id:0,
    createdAt:"",
    updatedAt:"",
    deletedAt:"",
    direction:"",
    contactName:"",
    contactPhone:"",
    workReport:"",
    interveneAt:"",
    description:"",
    state:{
        id:0,
        name:"",
        createdAt:"",
        updatedAt:"",
        deletedAt:"",
        type:{
            id:0,
            name:"",
            createdAt:"",
            updatedAt:"",
            deletedAt:"",
            code:""
        },
        code:""
    },
    availability:{
        id:0,
        name:"",
        code:"",
        createdAt:"",
        updatedAt:"",
        deletedAt:"",
        type:{
            id:0,
            name:"",
            code:"",
            createdAt:"",
            updatedAt:"",
            deletedAt:""
        }
    },
    materials:[],
    priority:{
        id:0,
        name:"",
        code:"",
        createdAt:"",
        updatedAt:"",
        deletedAt:"",
        type:{
            id  :0,
            name:"",
            code:"",
            createdAt:"",
            updatedAt:"",
            deletedAt:""
        },
    },
    client:{
        ...initialClient
    },
    technical:{

        id:0,
        createdAt:"",
        updatedAt:"",
        deletedAt:"",
        passwordChanged:false,
        emailVerifiedAt:"",
        secondaryEmailVerifiedAt:"",
        backupEmailVerifiedAt:"",
        whatsappVerifiedAt:"",
        nickName:"",
        firstName:"",
        secondName:"",
        firstSurname:"",
        secondSurname:"",
        email:"",
        secondaryEmail:"",
        backupEmail:"",
        documentValue:"",
        province:"",
        location:"",
        direction:"",
        postalCode:"",
        landlinePhone:"",
        mobilePhone:"",
        firstContact:"",
        secondContact:"",
        contactSchedule:"",
        discount:"",
        tracing:"",
        description:"",
        state:{
            id:0,
            name:"",
            createdAt:"",
            updatedAt:"",
            deletedAt:"",
            type:{
                id:0,
                name:"",
                createdAt:"",
                updatedAt:"",
                deletedAt:"",
                code:""

            },
            code:""
        },

        availability:{

            id:0,
            name:"",
            code:"",
            createdAt:"",
            updatedAt:"",
            deletedAt:"",
            type:{
                id:0,
                name:"",
                code:"",
                createdAt:"",
                updatedAt:"",
                deletedAt:"",
            },
        },
        role:{
            id:0,
            name:"",
            createdAt:"",
            updatedAt:"",
            deletedAt:"",
            type:{
                id:0,
                name:"",
                code:"",
                createdAt:"",
                updatedAt:"",
                deletedAt:"",
            },
        },
        personType:{
            id:0,
            name:"",
            createdAt:"",
            updatedAt:"",
            deletedAt:"",
            type:{
                id:0,
                name:"",
                code:"",
                createdAt:"",
                updatedAt:"",
                deletedAt:"",
            },
        },
        backupEmailRelationship:{
            id:0,
            name:"",
            createdAt:"",
            updatedAt:"",
            deletedAt:"",
            type:{
                id:0,
                name:"",
                code:"",
                createdAt:"",
                updatedAt:"",
                deletedAt:"",
            },
        },
        secondaryEmailRelationship:{
            id:0,
            name:"",
            createdAt:"",
            updatedAt:"",
            deletedAt:"",
            type:{
                id:0,
                name:"",
                code:"",
                createdAt:"",
                updatedAt:"",
                deletedAt:"",
            },
        },
        createdBy:"",
        documentType:{
            name:"",
            createdAt:"",
            updatedAt:"",
            deletedAt:"",
            id:0,
            type:{
                id:0,
                name:"",
                code:"",
                createdAt:"",
                updatedAt:"",
                deletedAt:"",
            },
        },
        streetType:{
            id:0,
            name:"",
            createdAt:"",
            updatedAt:"",
            deletedAt:"",
            type:{
                id:0,
                name:"",
                code:"",
                createdAt:"",
                updatedAt:"",
                deletedAt:"",
            },
        },
        country:{
            id:0,
            name:"",
            createdAt:"",
            updatedAt:"",
            deletedAt:"",
            type:{
                id:0,
                name:"",
                code:"",
                createdAt:"",
                updatedAt:"",
                deletedAt:"",
            },
        },
    },
    type:{
        id:0,
        name:"",
        createdAt:"",
        updatedAt:"",
        deletedAt:"",
        code:""

    },
}

export const JOBS = createModel<RootModel>()({

    state: {
        GetJobs:{
            data:{
                data:[],
                ...initialMetaResponse
            },
            error:"",
            status:0

        } as GetJobsStateProps,
        CreateJob:{
            data:{
                status:0,
                message:""
            },
            error:"",
            status:0
        } as CreateJobStateProps,
        DeleteJob:{
            data:{
                status:0,
                message:""
            },
            error:"",
            status:0
        } as DeleteJobStateProps,
        CloseJob:{
            data:{
                status:0,
                message:""
            },
            error:"",
            status:0
        } as CloseJobStateProps
    },
    reducers: {
        onGetJobs(state, payload: GetJobsStateProps) {
            return {
                ...state,
                GetJobs: payload
            }
        },
        onCreateJob(state, payload: CreateJobStateProps) {
            return {
                ...state,
                CreateJob: payload
            }
        },
        onDeleteJob(state, payload: DeleteJobStateProps) {
            return {
                ...state,
                DeleteJob: payload
            }
        },
        onCloseJob(state, payload: CloseJobStateProps) {
            return {
                ...state,
                CloseJob: payload
            }
        }
    },
    effects: (dispatch) => ({
        async onGetJobsAsync(payload:HeaderProps){
            try{
                const response = await jobs_request.GetJobs(payload).toPromise()
                dispatch.JOBS.onGetJobs({
                    data:response.data,
                    error:"",
                    status:response.status
                });
            }catch(e:any){
                dispatch.JOBS.onGetJobs({
                    data:{
                        data:[],
                        ...initialMetaResponse
                    },
                    error:e.response?e.response.data.message:"Ocurrio un error",
                    status:e.response?e.response.status:400
                });
            }
        },
        async onCreateJobAsync(payload:{headers:HeaderProps,body:jobs_interface.CreateJobRequest}){
            try{
                const response = await jobs_request.CreateJobs(payload).toPromise()
                dispatch.JOBS.onCreateJob({
                    data:response.data,
                    error:"",
                    status:response.status
                });
            }catch(e:any){
                dispatch.JOBS.onCreateJob({
                    data:{
                        status:0,
                        message:""
                    },
                    error:e.response?e.response.data.message:"Ocurrio un error",
                    status:e.response?e.response.status:400
                });
            }
        },
        async onDeleteJobAsync(payload:{headers:HeaderProps,id:number}){
            try{
                const response = await jobs_request.DeleteJobs(payload).toPromise()
                dispatch.JOBS.onDeleteJob({
                    data:response.data,
                    error:"",
                    status:response.status
                });
            }catch(e:any){
                dispatch.JOBS.onDeleteJob({
                    data:{
                        status:0,
                        message:""
                    },
                    error:e.response?e.response.data.message:"Ocurrio un error",
                    status:e.response?e.response.status:400
                });
            }
        },
        async onCloseJobAsync(payload:{headers:HeaderProps,body:jobs_interface.CloseJobRequest,id:number}){
            try{
                const response = await jobs_request.CloseJobs(payload).toPromise()
                dispatch.JOBS.onCloseJob({
                    data:response.data,
                    error:"",
                    status:response.status
                });
            }catch(e:any){
                dispatch.JOBS.onCloseJob({
                    data:{
                        status:0,
                        message:""
                    },
                    error:e.response?e.response.data.message:"Ocurrio un error",
                    status:e.response?e.response.status:400
                });
            }
        }


    })
})