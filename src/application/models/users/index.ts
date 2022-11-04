import { createModel } from "@rematch/core";
import { ResponseServer } from "infrastructure/api/api-handler";
import { user_interface,user_request } from "infrastructure/api/users";
import { RootModel } from "..";
import * as APIHANDLER from 'infrastructure/api/api-handler';
import { CreateUserRequest } from "infrastructure/api/users/interface";



export interface GetUserStateProps extends ResponseServer{
    data:user_interface.GetUsers;
}

export interface CreateUserStateProps extends ResponseServer{
    data:{
        status:number;
        message:string;
    }
}

export interface DeleteUserStateProps extends ResponseServer{
    data:{
        status:number;
        message:string;
    }
}

export const USERS  = createModel<RootModel>()({
    state:{
        GetUsers:{
            status:0,
            data:{
                message:[],
                status:0
            },
            error:""
        } as GetUserStateProps,
        CreateUser:{
            data:{
                message:"",
                status:0
            },
            error:"",
            status:0
        } as CreateUserStateProps,
        DeleteUser:{
            data:{
                message:"",
                status:0
            },
            error:"",
            status:0
        } as DeleteUserStateProps
    },
    effects:(dispatch:any)=>({
        async onGetUsersAync(props:APIHANDLER.HeaderProps){
            try{

                const res = await user_request.GetUsers(props).toPromise() ;
                dispatch.USERS.onGetUsers({
                    data:res.data,
                    status:res.status,
                    error:""
                })
            }catch(e:any){
                dispatch.USERS.onGetUsers({
                    data:{
                        message:[],
                        status:0
                    },
                    status:e.response.status??400,
                    error:e.response.data.message??"Ocurrio un error"
                })
            }
        },
        async onCreateUsersAsync(props:{headers:APIHANDLER.HeaderProps,body:CreateUserRequest}){
            try{

                const res = await user_request.CreateUser(props).toPromise()
                dispatch.USERS.onCreateUser({
                    data:res.data,
                    status:res.status,
                    error:""
                })
            }catch(e:any){
                dispatch.USERS.onCreateUser({
                    data:{
                        message:"",
                        status:0
                    },
                    status:e.response.status??400,
                    error:e.response.data.message??"Ocurrio un error"
                })
            }
        },
        async onDeleteUserAsync(props:{headers:APIHANDLER.HeaderProps,id:string}){
            try{
                const res = await user_request.DeleteUser(props).toPromise();
                dispatch.USERS.onDelete({
                    data:res.data,
                    status:res.status,
                    error:""
                })

            }catch(e:any){
                dispatch.USERS.onDelete({
                    data:{
                        message:"",
                        status:0
                    },
                    status:e.response.status??400,
                    error:e.response.data.message??"Ocurrio un error"
                })
            }
        },
        onClear(){
            dispatch.USERS.onDelete({
                data:{
                    message:"",
                    status:0
                },
                error:"",
                status:0
            })
            dispatch.USERS.onCreateUser({
                data:{
                    message:"",
                    status:0
                },
                error:"",
                status:0
            })
        }
    }),
    reducers:{
        onGetUsers(state:any,payload:any){
            return {...state,GetUsers:payload }
        },
        onCreateUser(state:any,payload:any){
            return {...state,CreateUser:payload}
        },
        onDelete(state:any,payload:any){
            return {...state,DeleteUser:payload}
        }
    }
})