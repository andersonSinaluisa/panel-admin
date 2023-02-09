import * as APIHANDLER from '../api-handler';
import * as Globals from 'application/common/index';


const GetNotifications = (props:APIHANDLER.HeaderProps)=>{
    let page = props.page || 1;
    let perPage = props.perPage || 10;
    
    return APIHANDLER.get(`${Globals.GET_NOTIFICATIONS}?perPage=${perPage}&page=${page}${props.search?"&search="+props.search:""}`,{
        headers:{
            'Authorization':'Bearer '+props.token,
        }
    })
}

export {
    GetNotifications
}