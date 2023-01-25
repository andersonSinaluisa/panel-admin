import * as APIHANDLER from '../api-handler';
import * as Globals from 'application/common';
import { CloseJobRequest, CreateJobRequest } from './interface';

const GetJobs = (props:APIHANDLER.HeaderProps)=>{
    let perPage = props.perPage?props.perPage:10;
    let page = props.page?props.page:1;
    return APIHANDLER.get(Globals.GET_JOBS+"?perPage="+perPage+"&page="+page,{
        headers:{
            Authorization:"Bearer "+props.token
        }
    })
}

const CreateJobs = (props:{headers:APIHANDLER.HeaderProps,body:CreateJobRequest})=>{
    return APIHANDLER.post(Globals.CREATE_JOBS,props.body,{
            Authorization:"Bearer "+props.headers.token
    })
}

const CloseJobs = (props:{headers:APIHANDLER.HeaderProps,body:CloseJobRequest,id:number})=>{
    return APIHANDLER.put(Globals.CLOSE_JOBS+props.id,props.body,{
            Authorization:"Bearer "+props.headers.token
    })
}


//delete jobs
const DeleteJobs = (props:{headers:APIHANDLER.HeaderProps,id:number})=>{
    return APIHANDLER.del(Globals.DELETE_JOBS+props.id,{
            Authorization:"Bearer "+props.headers.token
    })
}

export {
    GetJobs,
    CreateJobs,
    CloseJobs,
    DeleteJobs
}