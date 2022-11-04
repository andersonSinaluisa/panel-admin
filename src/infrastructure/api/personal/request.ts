import * as Globals from 'application/common';
import * as APIHANDLER from '../api-handler';
import { CreatePersonalRequest } from './interface';


const GetPersonal = (props: APIHANDLER.HeaderProps) => {
    return APIHANDLER.get(Globals.GET_PERSONAL, {
        headers: {
            Authorization: "Bearer " + props.token

        }
    })
}

const CreatePersonal = (props: { headers: APIHANDLER.HeaderProps, body: CreatePersonalRequest }) => {
    return APIHANDLER.post(Globals.CREATE_PERSONAL, props.body, {
        Authorization: "Bearer " + props.headers.token

    })
}

const GetPersonalById = (props: { headers: APIHANDLER.HeaderProps, id: string }) => {
    return APIHANDLER.get(Globals.GET_BY_ID_PERSONAL + props.id, {
        headers: {
            Authorization: "Bearer " + props.headers.token
        }
    })
}

//delete
const DeletePersonal = (props: { headers: APIHANDLER.HeaderProps, id: string }) => {
    return APIHANDLER.del(Globals.DELETE_PERSONAL + props.id, {
        Authorization: "Bearer " + props.headers.token
    })
}



export {
    GetPersonal,
    CreatePersonal,
    GetPersonalById,
    DeletePersonal
}