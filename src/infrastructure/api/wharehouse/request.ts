import * as Globals from 'application/common';
import { GetWharehouseStateProps } from 'application/models/wharehouse';
import { Observable } from 'rxjs';
import * as APIHANDLER from '../api-handler';

const GetWharehouse = (props: APIHANDLER.HeaderProps):Observable<GetWharehouseStateProps> =>  {
    let page = props.page ? props.page : 1;
    let perPage = props.perPage ? props.perPage : 15;

    return APIHANDLER.get(`${Globals.GET_WHAREHOUSES}?page=${page}&perPage=${perPage}${props.search ? "&search=" + props.search : ""}`, {
        headers: {
            Authorization: "Bearer " + props.token
        }
    })
}

export {
    GetWharehouse
}