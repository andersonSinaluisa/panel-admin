import { createModel } from "@rematch/core";
import { HeaderProps, ResponseServer } from "infrastructure/api/api-handler";
import { RootModel } from "..";
import {auth_interfaces, auth_request} from 'infrastructure/api/auth'
import { WEBSOCKET } from "application/common";
import { user_interface, user_request } from "infrastructure/api/users";
import { io } from "socket.io-client";

export interface SessionStateProps extends ResponseServer{
    data:auth_interfaces.LoginResponse|null;
}

export interface UserStateProps extends ResponseServer{
    data:{
        message:user_interface.User,
        status:number
    }
}



export const initLogin = {

            data:{
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
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
        state: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: "",
            name: ""

                },
        availability: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: "",
            name: ""
            
            },
        role: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: "",
            name: ""
            
                },
        personType: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: "",
            name: ""
            },
        createdBy: "",
        documentType: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: "",
            name: ""
        },
        streetType: "",
        country: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: "",
            name: ""
        },
        secondaryEmailRelationship: "",
        backupEmailRelationship: ""

      },
      token:"",
      message:{
        summary:"",
        detail:"",
            status:0
      }
}

export const AUTH = createModel<RootModel>()({
    state:{
        Session:{
            data:initLogin,
            status:0,
            error:""
            
        } as SessionStateProps
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
                let error = e.response?e.response.data?.message?.summary:"Ocurrió un error"
                error+=e.response?e.response.data?.message?.detail:""
                dispatch.AUTH.onLogin({
                    data:initLogin,
                    status:e.response?e.response.status:400,
                    error:error
                })
            }
        },
        async clearSession(props:HeaderProps){

            try{
                const res = await auth_request.Logout(props).toPromise()
            dispatch.AUTH.onLogin({
                    data:initLogin,
                status:0,
                error:""
            })
            }catch(e:any){
                
                dispatch.AUTH.onLogin({
                    data:initLogin,
                    status:0,
                    error:e.response?e.response.data?.message?.summary:"Ocurrió un error al cerrar sesión"
                })
            }
            
        },
        //connect to websocket
        connectToWebSocket(){
            //connect to websocket
            let socket = io(WEBSOCKET,{
                transports: ['websocket'],
            })
            
            return socket;
        },
        


    }),
    reducers:{
        onLogin(state:any,payload:any){
            return {...state,Session:payload}
        },
       
    }
})