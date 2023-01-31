import * as APIHANDLER from '../api-handler';
import * as Globals from 'application/common';


const GetCatalogueType = (params: APIHANDLER.HeaderProps) => {
    let perPage = params.perPage ?? 500;
    let page = params.page ?? 1;

    return APIHANDLER.get(Globals.GET_CATALOGUE_TYPE + "?perPage=" + perPage + "&page=" + page, {
        headers: {
            Authorization: "Bearer " + params.token

        }
    })
}


export {GetCatalogueType}