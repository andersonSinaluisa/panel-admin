import * as Globals from 'application/common';
import { Observable } from 'rxjs';
import * as APIHANDLER from '../api-handler';
import { ClientUpdateRequest, CreateClientRequest } from './interface';



const GetClients = (props:APIHANDLER.HeaderProps)=>{
    return APIHANDLER.get(Globals.GET_CLIENTS,{
        headers:{
            Authorization: "Bearer "+props.token

        }
    })
}

const CreateClient = (props:{headers:APIHANDLER.HeaderProps,body:CreateClientRequest}):Observable<{status:number,message:string}|any>=>{
    return APIHANDLER.post(Globals.CREATE_CLIENT,props.body,{
        Authorization: "Bearer "+props.headers.token

    })
}


const UpdateClient = (props:{headers:APIHANDLER.HeaderProps,body:ClientUpdateRequest,id:string})=>{
    return APIHANDLER.put(Globals.UPDATE_CLIENT+props.id,props.body,{
        Authorization: "Bearer "+props.headers.token

    })
}

const GetClientById = (props:{headers:APIHANDLER.HeaderProps,id:string})=>{
    return APIHANDLER.get(Globals.GET_CLIENTS+"/"+props.id,{
        headers:{
            Authorization: "Bearer "+props.headers.token

        }
    })
}

const DeleteClient = (props:{headers:APIHANDLER.HeaderProps,id:string})=>{
    return APIHANDLER.del(Globals.DELETE_CLIENT+props.id,{
            Authorization: "Bearer "+props.headers.token

        
    })
}




export {
    GetClients,
    CreateClient,
    UpdateClient,
    GetClientById,
    DeleteClient
}