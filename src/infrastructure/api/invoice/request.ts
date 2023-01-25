import * as APIHANLDER from '../api-handler';
import * as Global from 'application/common';
import { CreateInvoiceRequest } from './interface';


const GetInvoices = (props:APIHANLDER.HeaderProps)=>{
    let perPage =props.perPage || 10;
    let page = props.page || 1;
    return APIHANLDER.get(Global.GET_BILLING+"?perPage="+perPage+"&page="+page,{
        headers:{
            'Authorization':"Bearer "+props.token
        }
    });
}

const GetInvoice = (props:{
    headers: APIHANLDER.HeaderProps,
    id: string
})=>{
    return APIHANLDER.get(Global.GET_BILLING+"/"+props.id,{
        headers:{
            'Authorization':"Bearer "+props.headers.token
        }
    });
}

const CreateInvoice = (props:{
    headers:APIHANLDER.HeaderProps,
    body: CreateInvoiceRequest
})=>{
    return APIHANLDER.post(Global.CREATE_BILLING,props.body,{
            'Authorization':"Bearer "+props.headers.token
    });
}

const DeleteInvoice = (props:{
    headers:APIHANLDER.HeaderProps,
    id: number
})=>{
    return APIHANLDER.del(Global.DELETE_BILLING+props.id,{
            'Authorization':"Bearer "+props.headers.token
    });
}


export {
    GetInvoices,
    GetInvoice,
    CreateInvoice,
    DeleteInvoice
}