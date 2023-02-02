import * as Globals from 'application/common';
import { GetClientsStateProps } from 'application/models/clients';
import { Observable } from 'rxjs';
import * as APIHANDLER from '../api-handler';
import { ClientUpdateRequest, CreateClientRequest } from './interface';



const GetClients = (props:APIHANDLER.HeaderProps):Observable<GetClientsStateProps>=>{
    let perPage = props.perPage?props.perPage:15;
    let page = props.page?props.page:1;
    
    return APIHANDLER.get(`${Globals.GET_CLIENTS}?perPage=${perPage}&page=${page}${props.search?"&search="+props.search:""}  `,{
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


const UpdateClient = (props:{headers:APIHANDLER.HeaderProps,body:ClientUpdateRequest,id:number})=>{
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

const DeleteClient = (props:{headers:APIHANDLER.HeaderProps,id:number})=>{
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