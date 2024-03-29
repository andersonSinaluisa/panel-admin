import * as Globals from 'application/common';
import * as APIHANDLER from '../api-handler';
import { CreateUserRequest } from './interface';



const GetUsers = (props:APIHANDLER.HeaderProps)=>{
    const perPage = props.perPage?props.perPage: 10;
    const page = props.page?props.page: 1;
    return APIHANDLER.get(Globals.GET_USERS+"?perPage="+perPage+"&page="+page,{
        headers:{
            Authorization: "Bearer "+props.token
        }
    })
}

const GetUser = (props:{headers:APIHANDLER.HeaderProps,id:number})=>{
    return APIHANDLER.get(Globals.GET_USERS+"/"+props.id,{
        headers:{
            Authorization: "Bearer "+props.headers.token

        }
    })
}


const CreateUser = (props:{headers:APIHANDLER.HeaderProps,body:CreateUserRequest})=>{

    return APIHANDLER.post(Globals.CREATE_USER,props.body,{
        Authorization: "Bearer "+props.headers.token

    })
}   



const DeleteUser = (props:{headers:APIHANDLER.HeaderProps,id:string})=>{
    return APIHANDLER.del(Globals.DELETE_USER+props.id,{
        Authorization: "Bearer "+props.headers.token
    })
}


export {
    GetUsers,
    CreateUser,
    DeleteUser,
    GetUser
}