import * as Globals from 'application/common';
import * as APIHANDLER from '../api-handler';
import { CloseTaskRequest, CreateTaskRequest } from './interface';


const GetTask = (props:APIHANDLER.HeaderProps)=>{
    return APIHANDLER.get(Globals.GET_TASKS,{
        headers:{
            Authorization:"Bearer "+props.token
        }
    })
}

const CreateTask = (props:{headers:APIHANDLER.HeaderProps,body:CreateTaskRequest})=>{
    return APIHANDLER.post(Globals.CREATE_TASKS,props.body,{
            Authorization:"Bearer "+props.headers.token
        
    })
}

const GetTaskById = (props:{headers:APIHANDLER.HeaderProps,id:string})=>{
    return APIHANDLER.get(Globals.GET_TASKS+props.id,{
        headers:{
            Authorization:"Bearer "+props.headers.token
        }
    })
}

const CloseTask = (props:{headers:APIHANDLER.HeaderProps,body:CloseTaskRequest,id:string})=>{
    return APIHANDLER.put(Globals.CLOSE_TASKS+props.id,props.body,{
        
            Authorization:"Bearer "+props.headers.token
        
    })
    
}

//delete
const DeleteTask = (props:{headers:APIHANDLER.HeaderProps,id:string})=>{
    return APIHANDLER.del(Globals.DELETE_TASKS+props.id,{
            Authorization:"Bearer "+props.headers.token
        
    })
}

export{
    GetTask,
    CreateTask,
    GetTaskById,
    CloseTask,
    DeleteTask
}