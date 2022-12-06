import { createModel } from "@rematch/core";
import { HeaderProps, ResponseServer } from "infrastructure/api/api-handler";
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

export const PERSONAL = createModel<RootModel>()({
    
    state: {
        GetPersonal:{
            data: {
                message:[],
                status:0
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
                message:{
                    _id : "",
                    identityCounter : "",
                    userId : "",
                    documentType : "",
                    document : "",
                    name : "",
                    lastname1 : "",
                    lastname2 : "",
                    type : "",
                    direction : "",
                    postalCode : "",

                    location : "",
                    province : "",
                    country : "",
                    phone : "",
                    mobilePhone : "",
                    contact : "",
                    contact2 : "",
                    email : "",
                    contactSchedule : "",
                    note : "",
                    permissions : [],
                    dependents : 0,
                    createdBy : "",
                    createdAt : "",
                },
                status:0
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
                dispatch.PERSONAL.onGetPersonal({
                    data:{
                        message:[],
                        status:0
                    },
                    status:0,
                    error:e.message
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
        async onGetPersonalByIdAsync(payload:{ headers: HeaderProps, id: string }){
            try{
                const res = await GetPersonalById(payload).toPromise()
                dispatch.PERSONAL.onGetPersonalById({
                    data:res.data,
                    status:res.status,
                    error:""
                })
            }catch(e:any){
                dispatch.PERSONAL.onGetPersonalById({
                    data:{
                        message:{
                            _id : "",
                            identityCounter : "",
                            userId : "",
                            documentType : "",
                            document : "",
                            name : "",
                            lastname1 : "",
                            lastname2 : "",
                            type : "",
                            direction : "",
                            postalCode : "",
                            location : "",
                            province : "",
                            country : "",
                            phone : "",
                            mobilePhone : "",
                            contact : "",
                            contact2 : "",
                            email : "",
                            contactSchedule : "",
                            note : "",
                            permissions : [],
                            dependents : 0,
                            createdBy : "",
                            createdAt : "",
                        },
                        status:0
                    },
                    status:0,
                    error:e.message
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