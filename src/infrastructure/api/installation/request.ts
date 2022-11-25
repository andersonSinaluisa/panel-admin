import * as Globals from 'application/common';
import * as APIHANDLER from '../api-handler';
import { CreateInstallationRequest, UpdateStateInstallationsRequest } from './interface';


const GetInstallations = (props:APIHANDLER.HeaderProps)=>{
    return APIHANDLER.get(Globals.GET_INSTALLATIONS,{
        headers:{
            Authorization: "Bearer "+props.token
        }
    })
}

//create with params HeaderProps in headers and CreateInstallation interface in body
const CreateInstallation = (props:{headers:APIHANDLER.HeaderProps,body:CreateInstallationRequest})=>{
    return APIHANDLER.post(Globals.CREATE_INSTALLATION,props.body,{
            Authorization: "Bearer "+props.headers.token
        
    })
}

//delete
const DeleteInstallation = (props:{headers:APIHANDLER.HeaderProps,id:string})=>{
    return APIHANDLER.del(Globals.DELETE_INSTALLATION+props.id,{
            Authorization: "Bearer "+props.headers.token
    })
}

//update status
const UpdateStateInstallation = (props:{headers:APIHANDLER.HeaderProps,id:string,body:UpdateStateInstallationsRequest})=>{
    return APIHANDLER.put(Globals.UPDATE_STATE_INSTALLATION+props.id,props.body,{
            Authorization: "Bearer "+props.headers.token
    })
}

const GetInstallation = (props:{headers:APIHANDLER.HeaderProps,id:string})=>{	
    return APIHANDLER.get(Globals.GET_INSTALLATIONS+props.id,{	
        headers:{	
            Authorization: "Bearer "+props.headers.token	
        }	
    })	
}




export {
    GetInstallations,
    CreateInstallation,
    UpdateStateInstallation,
    DeleteInstallation,
    GetInstallation
}