import { createModel } from "@rematch/core";
import { HeaderProps, initialMetaResponse, ResponseServer } from "infrastructure/api/api-handler";
import { CreatePersonalRequest, GetPersonalByIdResponse, GetPersonalResponse, Personal } from "infrastructure/api/personal/interface";
import { CreatePersonal, DeletePersonal, GetPersonal, GetPersonalById } from "infrastructure/api/personal/request";
import { RootModel } from "..";

interface GetPersonalStateProps extends ResponseServer{
    data: GetPersonalResponse
}

export interface CreatePersonalStateProps extends ResponseServer{
    data:{
        message:string;
        status:number;
    }
}
export interface GetPersonalByIdStateProps extends ResponseServer{
    data:GetPersonalByIdResponse
}

export interface DeletePersonalStateProps extends ResponseServer{
    data:{
        message:string;
        status:number;
    }
}

export interface PersonalStateProps extends ResponseServer{
    data:{
        message:Personal;
        status:number;
    }
}


export const initPersonal:Personal = {
   
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: null,
        passwordChanged: false,
        emailVerifiedAt: "",
        secondaryEmailVerifiedAt: "",
        backupEmailVerifiedAt: "",
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
        whatsappVerifiedAt: "",
        state: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            type: {
                id: 0,
                created_at: "",
                updated_at: "",
                deleted_at: null,
                name: "",
                code: ""
            },
            name: "",
            code: ""
        },
        availability: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            type: {
                id: 0,
                created_at: "",
                updated_at: "",
                deleted_at: null,
                name: "",
                code: ""
            },
            name: "",
            code: ""
        },
       
        sdf: {
            id: 0,
            created_at: "",
            updated_at: "",
            role_id: 0,
            role_child_id: 0
        },
        role: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            role: ""
        },
        streetType: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            type: {
                id: 0,
                created_at: "",
                updated_at: "",
                deleted_at: null,
                name: "",
                code: ""
            },
            name: "",
            code: ""
        },
       
        country: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            type: {
                id: 0,
                created_at: "",
                updated_at: "",
                deleted_at: null,
                name: "",
                code: ""
            },
            name: "",
            code: ""
        },
        secondaryEmailRelationship: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            type: {
                id: 0,
                created_at: "",
                updated_at: "",
                deleted_at: null,
                name: "",
                code: ""
            },
            name: "",
            code: ""
        },
        backupEmailRelationship: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            type: {
                id: 0,
                created_at: "",
                updated_at: "",
                deleted_at: null,
                name: "",
                code: ""
            },
            name: "",
            code: ""
        },

        personType: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            type: {
                id: 0,
                created_at: "",
                updated_at: "",
                deleted_at: null,
                name: "",
                code: ""
            },
            name: "",
            code: ""
        },
        createdBy: null,
        documentType: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            type: {
                id: 0,
                created_at: "",
                updated_at: "",
                deleted_at: null,
                name: "",
                code: ""
            },
            name: "",
            code: ""
        },
        dependents: [],
        permissions: []
} 

export const PERSONAL = createModel<RootModel>()({
    
    state: {
        GetPersonal:{
            data: {
                data:[],
                ...initialMetaResponse
            },
            status:0,
            error:""
        } as GetPersonalStateProps,
        CreatePersonal:{
            data:{
                message:"",
                status:0
            },
            status:0,
            error:""
        } as CreatePersonalStateProps,
        DeletePersonal:{
            data:{
                message:"",
                status:0
            },
            status:0,
            error:""
        } as DeletePersonalStateProps,
        GetPersonalById:{
            data:{
                data:initPersonal,
                message:""
            },
            error:"",
            status:0
        } as GetPersonalByIdStateProps,
                        
    },
    reducers: {
        onGetPersonal(state:any,payload:any){
            return {
                ...state,
                GetPersonal:payload
            }
        },
        onCreatePersonal(state:any,payload:any){
            return {
                ...state,
                CreatePersonal:payload
            }
        },
        onGetPersonalById(state:any,payload:any){
            return {
                ...state,
                GetPersonalById:payload
            }
        },
        onDeletePersonal(state:any,payload:any){
            return {
                ...state,
                DeletePersonal:payload
            }
        },
        
    },
    effects: (dispatch) => ({
        async onGetPersonalAsync(payload: HeaderProps){

            try{
                const res = await GetPersonal(payload).toPromise()
                dispatch.PERSONAL.onGetPersonal({
                    data:res.data,
                    status:res.status,
                    error:""
                })
            }catch(e:any){
                
                let error = e.response?e.response.data?.message?.summary:"Ocurrió un error"
                error+=e.response?e.response.data?.message?.detail:""
                dispatch.PERSONAL.onGetPersonal({
                    data:{
                        data:[],
                        ...initialMetaResponse
                    },
                    status:e.response?e.response.status:400,
                    error:error
                })
            }

        },
        async onCreatePersonalAsync(payload:{ headers: HeaderProps, body: CreatePersonalRequest }){
            try{
                const res = await CreatePersonal(payload).toPromise()
                dispatch.PERSONAL.onCreatePersonal({
                    data:{
                        message:res.data.message,
                        status:res.data.status
                    },
                    status:res.status,
                    error:""
                })
            }catch(e:any){
                dispatch.PERSONAL.onCreatePersonal({
                    data:{
                        message:"",
                        status:0
                    },
                    status:0,
                    error:e.message
                })
            }
        },
        async onGetPersonalByIdAsync(payload:{ headers: HeaderProps, id: number }){
            try{
                const res = await GetPersonalById(payload).toPromise()
                dispatch.PERSONAL.onGetPersonalById({
                    data:res.data,
                    status:res.status,
                    error:""
                })
            }catch(e:any){
                let error = e.response?e.response.data?.message?.summary:"Ocurrió un error"
                error+=e.response?e.response.data?.message?.detail:""
                dispatch.PERSONAL.onGetPersonalById({
                    data:{
                        data:initPersonal,
                        message:""
                    },
                    status:0,
                    error:error
                })
            }
        },
        async onDeletePersonalAsync(payload:{ headers: HeaderProps, id: string }){
            try{
                const res = await DeletePersonal(payload).toPromise()
                dispatch.PERSONAL.onDeletePersonal({
                    data:{
                        message:res.data.message,
                        status:res.data.status
                    },
                    status:res.status,
                    error:""
                })
            }catch(e:any){
                dispatch.PERSONAL.onDeletePersonal({
                    data:{
                        message:"",
                        status:0
                    },
                    status:0,
                    error:e.message
                })
            }
        },
        
        clear(){
            
            dispatch.PERSONAL.onCreatePersonal({
                data:{
                    message:"",
                    status:0
                },
                status:0,
                error:""
            })
            dispatch.PERSONAL.onGetPersonalById({
                data:{
                    message:[],
                    status:0
                },
                status:0,
                error:""
            })
            dispatch.PERSONAL.onDeletePersonal({
                data:{
                    message:"",
                    status:0
                },
                status:0,
                error:""
            })
        }
    })
})