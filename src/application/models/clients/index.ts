import { createModel } from "@rematch/core";
import { ResponseServer } from "infrastructure/api/api-handler";
import { clients_interface, clients_request } from "infrastructure/api/clients";
import { RootModel } from "..";
import * as APIHANDLER from 'infrastructure/api/api-handler';


interface GetClientsStateProps extends ResponseServer{
    data: clients_interface.GetClientsResponse;
}

export interface CreateClientsStateProps extends ResponseServer{
    data: {
        message:string;
        status:number;
    }
}

export interface UpdateClientStateProps extends ResponseServer{
    data:{
        message:string;
        status:number;
    }
}

export interface GetClientByIdStateProps extends ResponseServer{
    data:{
        message:clients_interface.Client,
        status:number;
    }
}

//interface for delete state
export interface DeleteClientStateProps extends ResponseServer{
    data:{
        message:string;
        status:number;
    }
}


export const CLIENTS = createModel<RootModel>()({
    state:{
        GetClients:{
            data:{
                status:0,
                message:[]
            },
            status:0,
            error:""
        } as GetClientsStateProps,
        CreateClients:{
            data:{
                status:0,
                message:""
            },
            status:0,
            error:""
        } as CreateClientsStateProps,
        UpdateClient:{
            status:0,
            data:{
                message:"",
                status:0
            },
            error:""
        } as UpdateClientStateProps,
        GetClientById:{
            status:0,
            data:{
                message:{
                    
                },
                status:0
            }
        } as GetClientByIdStateProps,
        DeleteClient:{
            status:0,
            data:{
                message:"",
                status:0
            },
            error:""
        } as DeleteClientStateProps

    },
    effects:(dispatch:any)=>({
        async onGetClientsAsync(props:APIHANDLER.HeaderProps){
            try{
                const res = await clients_request.GetClients(props).toPromise()
                dispatch.CLIENTS.onGetClients({
                    data:res.data,
                    status:res.status,
                    error:""
                })

                
            }catch(e:any){
                dispatch.CLIENTS.onGetClients({
                    data:{
                        status:0,
                        message:[]
                    },
                    status:e.response.status??400,
                    error:e.response.data.message??"Ocurrio un error"
                })

            }
        },
        async onCreateClientsAsync(props:{headers:APIHANDLER.HeaderProps,body:clients_interface.CreateClientRequest}){
            try{
                const res = await clients_request.CreateClient(props).toPromise()
                dispatch.CLIENTS.onCreateClients({
                    data:res.data,
                    status:res.status,
                    error:""
                })

            }catch(e:any){
                dispatch.CLIENTS.onCreateClients({
                    data:{
                        status:0,
                        message:""
                    },
                    status:e.response.status??400,
                    error:e.response.data.message??"Ocurrio un error"
                })
            }     

        },
        async onUpdateClientAsync(props:{headers:APIHANDLER.HeaderProps,body:clients_interface.ClientUpdateRequest,id:string}){
            try{
                const res = await clients_request.UpdateClient(props).toPromise()
                dispatch.CLIENTS.onUpdateClient({
                    data:res.data,
                    status:res.status,
                    error:""
                })
            }catch(e:any){
                dispatch.CLIENTS.onUpdateClient({
                    data:{
                        status:0,
                        message:""
                    },
                    status:e.response.status??400,
                    error:e.response.data.message??"Ocurrio un error"
                })
            }
        },
        async onGetClientByIdAsync(props:{headers:APIHANDLER.HeaderProps,id:string}){
            try{
                const res = await clients_request.GetClientById(props).toPromise()
                dispatch.CLIENTS.onGetClientById({
                    data:res.data,
                    status:res.status,
                    error:""
                })
            }catch(e:any){
                dispatch.CLIENTS.onGetClientById({
                    data:{
                        status:0,
                        message:""
                    },
                    status:e.response.status??400,
                    error:e.response.data.message??"Ocurrio un error"
                })
            }
        },
        async onDeleteClientAsync(props:{headers:APIHANDLER.HeaderProps,id:string}){
            try{
                const res = await clients_request.DeleteClient(props).toPromise()
                dispatch.CLIENTS.onDeleteClient({
                    data:res.data,
                    status:res.status,
                    error:""
                })
            }catch(e:any){
                dispatch.CLIENTS.onDeleteClient({
                    data:{
                        status:0,
                        message:""
                    },
                    status:e.response.status??400,
                    error:e.response.data.message??"Ocurrio un error"
                })
            }
        },
        onClear(){
            dispatch.CLIENTS.onCreateClients({
                data:{
                    status:0,
                    message:""
                },
                status:0,
                error:""
            })
            dispatch.CLIENTS.onGetClientById({
                data:{
                    status:0,
                    message:null
                },
                status:0,
                error:""
            })
            dispatch.CLIENTS.onUpdateClient({
                data:{
                    status:0,
                    message:""
                },
                status:0,
                error:""
            })
            dispatch.CLIENTS.onDeleteClient({
                data:{
                    status:0,
                    message:""
                },
                status:0,
                error:""
            })
        }
    }),
    reducers:{
        onGetClients(state:any,payload:any){
            return {...state,GetClients:payload}
        },
        onCreateClients(state:any,payload:any){
            return {...state,CreateClients:payload}
        },
        onUpdateClient(state:any,payload:any){
            return {...state,UpdateClient:payload}
        },
        onGetClientById(state:any,payload:any){
            return {...state,GetClientById:payload}
        },
        onDeleteClient(state:any,payload:any){
            return {...state,DeleteClient:payload}
        }

    }
})