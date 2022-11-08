import { createModel } from "@rematch/core";
import { ResponseServer } from "infrastructure/api/api-handler";
import { RootModel } from "..";
import {auth_interfaces, auth_request} from 'infrastructure/api/auth'
import { WEBSOCKET } from "application/common";

export interface SessionStateProps extends ResponseServer{
    data:auth_interfaces.LoginResponse;
}


export const AUTH = createModel<RootModel>()({
    state:{
        Session:{
            data:{
                message:{
                    idUser:0,
                    token:""
                },
                status:0
            },
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
        async connectToWebSocket(){
            let ws = new WebSocket(WEBSOCKET);
            
            return new Promise((resolve,reject)=>{
                ws.onopen = function(){
                    resolve(ws);
                }
                ws.onerror = function(e){
                    reject(e);
                }
            })
        }


    }),
    reducers:{
        onLogin(state:any,payload:any){
            return {...state,Session:payload}
        }
    }
})