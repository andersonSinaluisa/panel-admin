import { createModel } from "@rematch/core";
import { HeaderProps, ResponseServer } from "infrastructure/api/api-handler";
import { RootModel } from "..";
import {auth_interfaces, auth_request} from 'infrastructure/api/auth'
import { WEBSOCKET } from "application/common";
import { user_interface, user_request } from "infrastructure/api/users";
import { io } from "socket.io-client";

export interface SessionStateProps extends ResponseServer{
    data:auth_interfaces.LoginResponse;
}

export interface UserStateProps extends ResponseServer{
    data:{
        message:user_interface.User,
        status:number
    }
}


export const AUTH = createModel<RootModel>()({
    state:{
        Session:{
            data:{
                message:{
                    idUser:"",
                    token:""
                },
                status:0
            },
            status:0,
            error:""
            
        } as SessionStateProps,
        UserData:{
            data:{
                message:{
                    _id:"",
                    createdAt:"",
                    email:"",
                    identityCounter:"",
                    personalData:"",
                    role:"",
                },
                status:0
            },
            error:"",
            status:0
        } as UserStateProps
    },
    effects:(dispatch:any)=>({

        async onLoginAsync(props:auth_interfaces.LoginRequest){
            try{
                const res = await auth_request.Login(props).toPromise()
                dispatch.AUTH.onLogin({
                    data:res.data,
                    status:res.status,
                    error:""
                })
            }catch(e:any){
                dispatch.AUTH.onLogin({
                    data:{
                        message:{
                            idUser:0,
                            token:""
                        },
                        status:0
                    },
                    status:e.response?e.response.status:400,
                    error:e.response?e.response.data.message:"Ocurrió un error"
                })
            }
        },
        clearSession(){
            dispatch.AUTH.onLogin({
                data:{
                    message:{
                        idUser:0,
                        token:""
                    },
                    status:0
                },
                status:0,
                error:""
            })
        },
        //connect to websocket
        connectToWebSocket(){
            //connect to websocket
            let socket = io(WEBSOCKET,{
                transports: ['websocket'],
            })
            
            return socket;
        },
        async onGetUserAsync(props:{
            headers:HeaderProps,
            id:string
        }){

            try{
                const res = await user_request.GetUser(props).toPromise();
                dispatch.AUTH.onGetUser({
                    data:res.data,
                    status:res.status,
                    error:""
                })
            }catch(e:any){
                dispatch.AUTH.onGetUser({
                    data:{
                        message:{
                            _id:"",
                            identityCounter:"",
                            email:"",
                            role:"",
                            personalData:"",
                            createdAt:""
                        },
                        status:0
                    },
                    status:e.response?e.response.status:400,
                    error:e.response?e.response.data.message:"Ocurrió un error"
                })
            }
        },

        


    }),
    reducers:{
        onLogin(state:any,payload:any){
            return {...state,Session:payload}
        },
        onGetUser(state:any,payload:any){
            return {...state,UserData:payload}
        }
    }
})