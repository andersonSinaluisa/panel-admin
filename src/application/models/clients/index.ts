import { createModel } from "@rematch/core";
import { ResponseServer } from "infrastructure/api/api-handler";
import { clients_interface, clients_request } from "infrastructure/api/clients";
import { RootModel } from "..";
import * as APIHANDLER from 'infrastructure/api/api-handler';
import { ClientUpdateRequest } from "infrastructure/api/clients/interface";


interface GetClientsStateProps extends ResponseServer{
    data: clients_interface.GetClientsResponse;
}

export interface CreateClientsStateProps extends ResponseServer{
    data:clients_interface.CreateClientResponse;
}

export interface UpdateClientStateProps extends ResponseServer{
    data: clients_interface.UpdateClientResponse;
}

export interface GetClientByIdStateProps extends ResponseServer{
    data: clients_interface.GetClientById;
}

//interface for delete state
export interface DeleteClientStateProps extends ResponseServer{
    data:{
        message:string;
        status:number;
    }
}


export const initialClient = {

    id: 0,
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
    passwordChanged: false,
    emailVerifiedAt: "",
    secondaryEmailVerifiedAt: "",
    backupEmailVerifiedAt: "",
    whatsappVerifiedAt: "",
    nickName: "",
    firstName: "",
    secondName: "",
    firstSurname: "",
    secondSurname: "",
    email: "",
    secondaryEmail: "",
    backupEmail: "",
    documentValue: "",
    province: "",
    location: "",
    direction: "",
    postalCode: "",
    landlinePhone: "",
    mobilePhone: "",
    firstContact: "",
    secondContact: "",
    contactSchedule: "",
    discount: "",
    tracing: "",
    description: "",

    state: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        name: "",
    },
    availability: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        name: "",
    },
    role: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        name: "",
    },
    personType: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        name: "",
    },
    createdBy: null,
    documentType: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        name: "",
    },
    streetType: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        name: "",
    },
    country: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        name: "",
    },
    secondaryEmailRelationship: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        name: "",
    },
    backupEmailRelationship: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        name: "",
    },
    whatsapp: "",
    whatsappVerified: false,
    emailVerified: false,
    secondaryEmailVerified: false,
    backupEmailVerified: false,
    password: "",
    passwordConfirmation: "",
    rememberToken: "",
    emailVerificationToken: "",
    
    
}



export const CLIENTS = createModel<RootModel>()({
    state:{
        GetClients:{
            data:{
                data:[],
                ...APIHANDLER.initialMetaResponse
            },
            status:0,
            error:""
        } as GetClientsStateProps,
        CreateClients:{
            data:{
                data:{},
                ...APIHANDLER.initialMetaResponse
            },
            status:0,
            error:""
        } as CreateClientsStateProps,
        UpdateClient:{
            status:0,
            data:{ 
                data:{},
                ...APIHANDLER.initialMetaResponse
            },
            error:""
        } as UpdateClientStateProps,
        GetClientById:{
            status:0,
            data:{
                data:initialClient,
                ...APIHANDLER.initialMetaResponse
            },
            error:""
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
                        data:[],
                        ...APIHANDLER.initialMetaResponse
                    },
                    status:e.response?.status??400,
                    error:e.response?.data.message??"Ocurrio un error"
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
                
                let error = e.response?e.response.data?.message?.summary:"Ocurrió un error"
                error+=e.response?e.response.data?.message?.detail:""
                dispatch.CLIENTS.onCreateClients({
                    data:{
                       data:{},
                       ...APIHANDLER.initialMetaResponse
                    },
                    status:e.response?.status??400,
                    error:error
                })
            }     

        },
        async onUpdateClientAsync(props:{headers:APIHANDLER.HeaderProps,body:clients_interface.ClientUpdateRequest,id:number}){
            try{
                const res = await clients_request.UpdateClient(props).toPromise()
                dispatch.CLIENTS.onUpdateClient({
                    data:res.data,
                    status:res.status,
                    error:""
                })
            }catch(e:any){
                
                let error = e.response?e.response.data?.message?.summary:"Ocurrió un error"
                error+=e.response?e.response.data?.message?.detail:""
                dispatch.CLIENTS.onUpdateClient({
                    data:{
                        data:{},
                        ...APIHANDLER.initialMetaResponse
                    },
                    status:e.response?.status??400,
                    error:error
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
                let error = e.response?e.response.data?.message?.summary:"Ocurrió un error"
                error+=e.response?e.response.data?.message?.detail:""
                dispatch.CLIENTS.onGetClientById({
                    data:{
                       data:initialClient,
                       ...APIHANDLER.initialMetaResponse
                    },
                    status:e.response?.status??400,
                    error:error
                })
            }
        },
        async onDeleteClientAsync(props:{headers:APIHANDLER.HeaderProps,id:number}){
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
                    status:e.response?.status??400,
                    error:e.response?.data?.message??"Ocurrio un error"
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
                    data:initialClient,
                    ...APIHANDLER.initialMetaResponse
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