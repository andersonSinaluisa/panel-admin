import * as Globals from 'application/common';
import { GetPersonalStateProps } from 'application/models/personal';
import { Observable } from 'rxjs';
import * as APIHANDLER from '../api-handler';
import { CreatePersonalRequest, UpdatePersonalRequest } from './interface';


const GetPersonal = (props: APIHANDLER.HeaderProps):Observable<GetPersonalStateProps> => {
    let perPage = props.perPage ? props.perPage : 15;
    let page = props.page ? props.page : 1;
    return APIHANDLER.get(Globals.GET_PERSONAL+"?perPage="+perPage+"&page="+page, {
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

const GetPersonalById = (props: { headers: APIHANDLER.HeaderProps, id: number }) => {
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


const UpdatePersonal = (props: { headers: APIHANDLER.HeaderProps, id: number, body: UpdatePersonalRequest }) => {
    return APIHANDLER.put(Globals.UPDATE_PERSONAL + props.id, props.body, {
        Authorization: "Bearer " + props.headers.token
    })
}


export {
    GetPersonal,
    CreatePersonal,
    GetPersonalById,
    DeletePersonal,
    UpdatePersonal
}