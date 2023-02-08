import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler"
import CreateInvoice from 'presentation/components/invoice/create';
import { CreateInvoiceStateProps } from 'application/models/invoice';
import { CreateInvoiceRequest } from 'infrastructure/api/invoice/interface';
import { GetClientsResponse } from 'infrastructure/api/clients/interface';
import { GetProductsResponse } from 'infrastructure/api/products/interface';
import { CatalogueState } from 'application/models/core';




export interface CreateInvoiceProps {
    CreateInvoice: CreateInvoiceStateProps;
    onCreateInvoiceAsync:(props:{
        body:CreateInvoiceRequest;
        headers:HeaderProps;
    })=> void;
    GetClients: GetClientsResponse;
    token: string;
    title: string;
    breadcrumbs: string[];
    GetProducts:GetProductsResponse;
    catalogues: CatalogueState
}



const mapStateToProps = ({ INVOICE , AUTH, CORE}: any, ownProps:any) => {
    return {
        CreateInvoice: INVOICE.CreateInvoice,
        token: AUTH.Session.data.token,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        catalogues: CORE.catalogues,
    };
}



//connect to redux
const mapDispatchToProps = ({ INVOICE,CLIENTS,PRODUCTS }: any) => {
    return {
        onCreateInvoiceAsync:(props:{
            body:CreateInvoiceRequest;
            headers:HeaderProps;
        })=> INVOICE.onCreateInvoiceAsync(props),
    };
}

//connect to redux
export default connect(mapStateToProps, mapDispatchToProps)(CreateInvoice);