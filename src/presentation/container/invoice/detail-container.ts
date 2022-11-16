import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler"
import DetailInvoice from 'presentation/components/invoice/detail';
import { GetInvoiceStateProps } from 'application/models/invoice';
import { clients_interface } from 'infrastructure/api/clients';
import { invoice_interface } from 'infrastructure/api/invoice';


export interface DetailInvoiceProps {

    onGetInvoiceAsync: (payload: {
        id:string;
        headers:HeaderProps;
    }) => void;
    token: string;
    title: string;
    breadcrumbs: string[];
    GetClients: clients_interface.GetClientsResponse;
    GetInvoice: invoice_interface.GetInvoiceResponse;
    onGetClientsAsync:(props:HeaderProps)=>void;
}

const mapStateToProps = ({ INVOICE , AUTH,CLIENTS}: any, ownProps:any) => {
    return {
        token: AUTH.Session.data.message.token,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        GetInvoice: INVOICE.GetInvoice.data,
        GetClients: CLIENTS.GetClients.data

    };
}



//connect to redux
const mapDispatchToProps = ({ INVOICE,CLIENTS }: any) => {
    return {
        onGetInvoiceAsync:(props:{
            id:string;
            headers:HeaderProps;
        })=>INVOICE.onGetInvoiceAsync(props),
        onGetClientsAsync:(props:HeaderProps)=>CLIENTS.onGetClientsAsync(props)

    };
}

//connect to redux
export default connect(mapStateToProps, mapDispatchToProps)(DetailInvoice);