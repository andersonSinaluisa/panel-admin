import { createModel } from "@rematch/core";
import { HeaderProps, initialMetaResponse, ResponseServer } from "infrastructure/api/api-handler";
import { invoice_interface, invoice_request } from "infrastructure/api/invoice";
import { Invoice } from "infrastructure/api/invoice/interface";
import { RootModel } from "..";


export interface GetInvoicesStateProps extends ResponseServer{

    data: invoice_interface.GetInvoicesResponse;

}

export interface GetInvoiceStateProps extends ResponseServer{
    data: invoice_interface.GetInvoiceResponse;
}

export interface CreateInvoiceStateProps extends ResponseServer{
    data: {
        status:number;
        message:string;
    }
}

export interface DeleteInvoiceStateProps extends ResponseServer{
    data: {
        status:number;
        message:string;
    }
}


export const initInvoice :Invoice={
    id:0,
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
    billingDate: "",
    taxIdentificationNumber: "",
    workReport: "",
    workDirection: "",
    discount: 0,
    clientDiscount: 0,
    iva: 0,
    variableTaxes: 0,
    description: "",
    availability: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: null,
        type: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            name: "",
            code: ""
        },
        name: "",
        code: ""
    },
    client: {
        createdAt: "",
        deletedAt:"",
        firstName: "",
        id: 0,
        firstSurname: "",
        secondSurname: "",
        secondName: "",
        nickName: "",
        role: {
            createdAt: "",
            deletedAt: "",
            id: 0,
            name: "",
            type: {
                code: "",
                createdAt: "",
                deletedAt: "",
                id: 0,
                name: "",
                updatedAt: ""
            },
            updatedAt: ""
        },
        updatedAt: "",
    },
    paymentMethod: {
        code: "",
        createdAt: "",
        deletedAt: "",
        id: 0,
        name: "",
        type: {
            code: "",
            createdAt: "",
            deletedAt: "",
            id: 0,
            name: "",
            updatedAt: ""
        },
        updatedAt: ""
    },
    state: {
        code: "",
        createdAt: "",
        deletedAt: "",
        id: 0,
        name: "",
        type: {
            code: "",
            createdAt: "",
            deletedAt   : "",
            id: 0,
            name: "",
            updatedAt: ""
        },
        updatedAt: ""
    },
}


export const INVOICE = createModel<RootModel>()({
    state: {
        GetInvoices:{
            data: {
                data:[],
                ...initialMetaResponse
            },
            error:"",
            status:0,
        } as GetInvoicesStateProps,
        GetInvoice:{
            data: {
                data:initInvoice
            },
            error:"",
            status:0,
        } as GetInvoiceStateProps,
        CreateInvoice:{
            data: {
                status:0,
                message:"",
            },
            error:"",
            status:0,
        } as CreateInvoiceStateProps,
        DeleteInvoice:{
            data: {
                status:0,
                message:"",
            },
            error:"",
            status:0,
        } as DeleteInvoiceStateProps,
    },
    effects: (dispatch) => ({

        async onGetInvoicesAsync(props:HeaderProps){

            try{

                const res = await invoice_request.GetInvoices(props).toPromise();

                dispatch.INVOICE.onGetInvoices({
                    data:res.data,
                    error:"",
                    status:200,
                });

                
            }catch(e:any){
                    
                    dispatch.INVOICE.onGetInvoices({
                        data:{
                            data:[],
                            ...initialMetaResponse
                        },
                        error:e.message,
                        status:e.response?.status || 500,
                    });
    

            }

        },

        async onGetInvoiceAsync(props:{
            id:string;
            headers:HeaderProps;
        }){

            try{

                const res = await invoice_request.GetInvoice(props).toPromise();

                dispatch.INVOICE.onGetInvoice({
                    data:res.data,
                    error:"",
                    status:res.status,
                });

                
            }catch(e:any){
                    
                    dispatch.INVOICE.onGetInvoice({
                        data:{
                            data:initInvoice
                        },
                        error:e.message,
                        status:e.response?.status || 500,
                    });
    

            }

        },

        async onCreateInvoiceAsync(props:{
            body:invoice_interface.CreateInvoiceRequest;
            headers:HeaderProps;
        }){
            try{

                const res = await invoice_request.CreateInvoice(props).toPromise();

                dispatch.INVOICE.onCreateInvoice({
                    data:res.data,
                    error:"",
                    status:res.status,
                });

                
            }catch(e:any){
                    
                    dispatch.INVOICE.onCreateInvoice({
                        data:{
                            status:0,
                            message:"",
                        },
                        error:e.message,
                        status:e.response?.status || 500,
                    });
    

            }
        },

        async onDeleteInvoiceAsync(props:{
            id:number;
            headers:HeaderProps;
        }){
            try{

                const res = await invoice_request.DeleteInvoice(props).toPromise();

                dispatch.INVOICE.onDeleteInvoice({
                    data:res.data,
                    error:"",
                    status:res.status,
                });
            
            }catch(e:any){

                dispatch.INVOICE.onDeleteInvoice({
                    data:{
                        status:0,
                        message:"",
                    },
                    error:e.message,
                    status:e.response?.status || 500,
                });
            }
        },
        clear(){
           
            dispatch.INVOICE.onGetInvoice({
                data:{
                    data:initInvoice
                },
                error:"",
                status:0,
            });
            dispatch.INVOICE.onCreateInvoice({
                data:{
                    status:0,
                    message:"",
                },
                error:"",
                status:0,
            });
            dispatch.INVOICE.onDeleteInvoice({
                data:{
                    status:0,
                    message:"",
                },
                error:"",
                status:0,
            });
        }

    }),
    reducers: {
        onGetInvoices(
            state,
            payload: GetInvoicesStateProps
        ){
            return {
                ...state,
                GetInvoices:payload
            }
        },
        onGetInvoice(
            state,
            payload: GetInvoiceStateProps
        ){
            return {
                ...state,
                GetInvoice:payload
            }
        },
        onCreateInvoice(
            state,
            payload: CreateInvoiceStateProps
        ){
            return {
                ...state,
                CreateInvoice:payload
            }
        },
        onDeleteInvoice(
            state,
            payload: DeleteInvoiceStateProps
        ){
            return {
                ...state,
                DeleteInvoice:payload
            }
        }
    },
});