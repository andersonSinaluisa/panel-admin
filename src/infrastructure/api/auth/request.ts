import * as Globals from 'application/common';
import * as APIHANDLER from '../api-handler';
import { LoginRequest } from './interface'

const Login = (props: LoginRequest) => {
    return APIHANDLER.post(Globals.LOGIN, props);
}

const Logout = (props: APIHANDLER.HeaderProps) => {
    return APIHANDLER.post(Globals.LOGOUT, {}, {
            Authorization: "Bearer " + props.token

        
    });
}


export {
    Login,
    Logout
}

