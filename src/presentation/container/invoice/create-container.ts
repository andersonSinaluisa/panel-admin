import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler"
import CreateInvoice from 'presentation/components/invoice/create';
import { CreateInvoiceStateProps } from 'application/models/invoice';
import { CreateInvoiceRequest } from 'infrastructure/api/invoice/interface';
import { GetClientsResponse } from 'infrastructure/api/clients/interface';
import { GetProductsResponse } from 'infrastructure/api/products/interface';




export interface CreateInvoiceProps {
    CreateInvoice: CreateInvoiceStateProps;
    onGetClientsAsync: (payload: HeaderProps) => void;
    onCreateInvoiceAsync:(props:{
        body:CreateInvoiceRequest;
        headers:HeaderProps;
    })=> void;
    GetClients: GetClientsResponse;
    token: string;
    title: string;
    breadcrumbs: string[];
    onGetProductsAsync:(props:HeaderProps)=>void;
    GetProducts:GetProductsResponse
}



const mapStateToProps = ({ INVOICE , AUTH,CLIENTS,PRODUCTS}: any, ownProps:any) => {
    return {
        CreateInvoice: INVOICE.CreateInvoice,
        GetClients: CLIENTS.GetClients.data,
        token: AUTH.Session.data.message.token,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        GetProducts: PRODUCTS.GetProducts.data,
    };
}



//connect to redux
const mapDispatchToProps = ({ INVOICE,CLIENTS,PRODUCTS }: any) => {
    return {
        onCreateInvoiceAsync:(props:{
            body:CreateInvoiceRequest;
            headers:HeaderProps;
        })=> INVOICE.onCreateInvoiceAsync(props),
        onGetClientsAsync:(props:HeaderProps)=>CLIENTS.onGetClientsAsync(props),
        onGetProductsAsync:(props:HeaderProps)=>PRODUCTS.onGetProductsAsync(props),
    };
}

//connect to redux
export default connect(mapStateToProps, mapDispatchToProps)(CreateInvoice);