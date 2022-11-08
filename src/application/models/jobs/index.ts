import { createModel } from "@rematch/core";
import { HeaderProps, ResponseServer } from "infrastructure/api/api-handler";
import { jobs_interface, jobs_request } from "infrastructure/api/jobs";
import { GetJobsResponse } from "infrastructure/api/jobs/interface";
import { RootModel } from "..";

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


export const JOBS = createModel<RootModel>()({

    state: {
        GetJobs:{
            data:{
                status:0,
                message:[]
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
                        status:0,
                        message:[]
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
        async onDeleteJobAsync(payload:{headers:HeaderProps,id:string}){
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
        async onCloseJobAsync(payload:{headers:HeaderProps,body:jobs_interface.CloseJobRequest,id:string}){
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