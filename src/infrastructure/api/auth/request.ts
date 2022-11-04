import * as Globals from 'application/common';
import * as APIHANDLER from '../api-handler';
import {LoginRequest} from './interface'

const Login = (props:LoginRequest)=>{
    return APIHANDLER.post(Globals.LOGIN,props);
}


export {
    Login
}

