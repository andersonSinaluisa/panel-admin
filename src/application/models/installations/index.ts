import { createModel } from "@rematch/core";
import { HeaderProps, ResponseServer } from "infrastructure/api/api-handler";
import { installations_interface, installations_request } from "infrastructure/api/installation";
import { RootModel } from "..";


interface GetInstallationsStateProps extends ResponseServer{
    data:installations_interface.GetInstallationsResponse;
}
export interface CreateInstallationStateProps extends ResponseServer{
    data:{
        status:number;
        message:string;
    }
}

export interface UpdateStateInstallationStateProps extends ResponseServer{
    data:{
        status:number;
        message:string;
    }
}
export interface DeleteInstallationStateProps extends ResponseServer{
    data:{
        status:number;
        message:string;
    }
}

export const INSTALLATIONS = createModel<RootModel>()({
    state:{
        GetInstallations:{
            data:{
                code:"",
                message:[],
                status:0,
            },
            status:0,
            error:""
        } as GetInstallationsStateProps,
        CreateInstallation:{
            data:{
                status:0,
                message:""
            },
            status:0,
            error:""
        } as CreateInstallationStateProps,
        UpdateStateInstallation:{
            data:{
                status:0,
                message:""
            },
            status:0,
            error:""
        } as UpdateStateInstallationStateProps,
        DeleteInstallation:{
            data:{
                status:0,
                message:""
            },
            status:0,
            error:""
        } as DeleteInstallationStateProps


    },
    reducers:{
        //reducer for GetInstallations
        onGetInstallations(state:any,payload:any){
            return {
                ...state,
                GetInstallations:payload
            }
        },
        //reducer for CreateInstallation
        onCreateInstallation(state:any,payload:any){
            return {
                ...state,
                CreateInstallation:payload
            }
        },
        //reducer for UpdateStateInstallation
        onUpdateStateInstallation(state:any,payload:any){
            return {
                ...state,
                UpdateStateInstallation:payload
            }
        },
        //reducer for DeleteInstallation
        onDeleteInstallation(state:any,payload:any){
            return {
                ...state,
                DeleteInstallation:payload
            }
        }

    },
    effects:(dispatch:any)=>({

        //effect for GetInstallations
        async GetInstallationsAsync(payload:HeaderProps){
        
            try{
                const response = await installations_request.GetInstallations(payload).toPromise();
                dispatch.INSTALLATIONS.onGetInstallations({
                    data:response.data,
                    status:response.status,
                    error:""
                });
            }catch(e:any){
                dispatch.INSTALLATIONS.onGetInstallations({
                    data:{
                        code:"",
                        message:[],
                        status:0,
                    },
                    status:e.response.status??400,
                    error:e.response.data.message??"Ocurrio un error"
                });
            }
        },
        //effect for CreateInstallation
        async CreateInstallationAsync(payload:{headers:HeaderProps,body:installations_interface.CreateInstallationRequest}){
            try{
                const response = await installations_request.CreateInstallation(payload).toPromise();
                dispatch.INSTALLATIONS.onCreateInstallation({
                    data:response.data,
                    status:response.status,
                    error:""
                });
            }catch(e:any){
                dispatch.INSTALLATIONS.onCreateInstallation({
                    data:{
                        status:e.response.status??400,
                        message:e.response.data.message??"Ocurrio un error"
                    },
                    status:e.response.status??400,
                    error:e.response.data.message??"Ocurrio un error"
                });
            }
        },
        //effect for UpdateStateInstallation
        async UpdateStateInstallationAsync(payload:{headers:HeaderProps,id:string,body:installations_interface.UpdateStateInstallationsRequest}){
            try{
                const response = await installations_request.UpdateStateInstallation(payload).toPromise();
                dispatch.INSTALLATIONS.onUpdateStateInstallation({
                    data:response.data,
                    status:response.status,
                    error:""
                });
            }catch(e:any){
                dispatch.INSTALLATIONS.onUpdateStateInstallation({
                    data:{
                        status:e.response.status??400,
                        message:e.response.data.message??"Ocurrio un error"
                    },
                    status:e.response.status??400,
                    error:e.response.data.message??"Ocurrio un error"
                });
            }
        },
        //effect for DeleteInstallation
        async DeleteInstallationAsync(payload:{headers:HeaderProps,id:string}){
            try{
                const response = await installations_request.DeleteInstallation(payload).toPromise();
                dispatch.INSTALLATIONS.onDeleteInstallation({
                    data:response.data,
                    status:response.status,
                    error:""
                });
            }catch(e:any){
                dispatch.INSTALLATIONS.onDeleteInstallation({
                    data:{
                        status:e.response.status??400,
                        message:e.response.data.message??"Ocurrio un error"
                    },
                    status:e.response.status??400,
                    error:e.response.data.message??"Ocurrio un error"
                });
            }
        },
        //clear state
        ClearState(){
        
            dispatch.INSTALLATIONS.onCreateInstallation({
                data:{
                    status:0,
                    message:""
                },
                status:0,
                error:""
            });
            dispatch.INSTALLATIONS.onUpdateStateInstallation({
                data:{
                    status:0,
                    message:""
                },
                status:0,
                error:""
            });
            dispatch.INSTALLATIONS.onDeleteInstallation({
                data:{
                    status:0,
                    message:""
                },
                status:0,
                error:""
            });
        }

    })
})