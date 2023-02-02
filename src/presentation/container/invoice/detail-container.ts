import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler"
import DetailInvoice from 'presentation/components/invoice/detail';
import { GetInvoiceStateProps } from 'application/models/invoice';
import { clients_interface } from 'infrastructure/api/clients';
import { invoice_interface } from 'infrastructure/api/invoice';
import { GetProductsResponse } from 'infrastructure/api/products/interface';


export interface DetailInvoiceProps {

    onGetInvoiceAsync: (payload: {
        id:string;
        headers:HeaderProps;
    }) => void;
    token: string;
    title: string;
    breadcrumbs: string[];
    GetInvoice: invoice_interface.GetInvoiceResponse;
    onGetClientsAsync:(props:HeaderProps)=>void;
    onGetClientByIdAsync:(props:{headers:HeaderProps,id:number})=> void;
    GetClientById:clients_interface.Client;
    onGetProductsAsync:(props:HeaderProps)=>void;
    GetProducts:GetProductsResponse;
}

const mapStateToProps = ({ INVOICE , AUTH,CLIENTS,PRODUCTS}: any, ownProps:any) => {
    return {
        token: AUTH.Session.data.token,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        GetInvoice: INVOICE.GetInvoice.data,
        GetClientById: CLIENTS.GetClientById.data.message,
        GetProducts: PRODUCTS.GetProducts.data,

    };
}



//connect to redux
const mapDispatchToProps = ({ INVOICE,CLIENTS,PRODUCTS }: any) => {
    return {
        onGetInvoiceAsync:(props:{
            id:string;
            headers:HeaderProps;
        })=>INVOICE.onGetInvoiceAsync(props),
        onGetClientByIdAsync:(props:{headers:HeaderProps,id:number})=> CLIENTS.onGetClientByIdAsync(props),
        onGetProductsAsync:(props:HeaderProps)=>PRODUCTS.onGetProductsAsync(props),
    };
}

//connect to redux
export default connect(mapStateToProps, mapDispatchToProps)(DetailInvoice);