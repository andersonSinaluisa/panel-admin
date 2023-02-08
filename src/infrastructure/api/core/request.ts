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

const ExportData = (url:string,props:APIHANDLER.HeaderProps) => {
    return APIHANDLER.get(url, {
        headers: {
            Authorization: "Bearer " + props.token
        },
        responseType:'blob'
    })
}


export {GetCatalogueType,ExportData}