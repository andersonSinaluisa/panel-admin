import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler"
import ViewInvoices from 'presentation/components/invoice/view';
import { GetInvoicesResponse } from 'infrastructure/api/invoice/interface';
import { DeleteInvoiceStateProps } from 'application/models/invoice';
import { clients_interface } from 'infrastructure/api/clients';


export interface ViewInvoicesProps {
    GetInvoices: GetInvoicesResponse;
    onGetInvoicesAsync: (payload: HeaderProps) => void;
    token: string;
    title: string;
    breadcrumbs: string[];
    onDeleteInvoiceAsync: (payload: {
        id:number;
        headers:HeaderProps;
    }) => void;
    DeleteInvoice:DeleteInvoiceStateProps;
    GetClients: clients_interface.GetClientsResponse;
    onGetClientsAsync:(props:HeaderProps)=>void;
    clear: () => void;
    clearClients: ()=>void;
}


const mapStateToProps = ({ INVOICE , AUTH,CLIENTS}: any, ownProps:any) => {
    return {
        GetInvoices: INVOICE.GetInvoices.data,
        token: AUTH.Session.data.token,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        DeleteInvoice: INVOICE.DeleteInvoice,
        GetClients: CLIENTS.GetClients.data


    };
}



//connect to redux
const mapDispatchToProps = ({ INVOICE,CLIENTS }: any) => {
    return {
        onGetInvoicesAsync:(props:HeaderProps)=>INVOICE.onGetInvoicesAsync(props),
        onDeleteInvoiceAsync:(props:{
            id:number;
            headers:HeaderProps;
        })=>INVOICE.onDeleteInvoiceAsync(props),
        onGetClientsAsync:(props:HeaderProps)=>CLIENTS.onGetClientsAsync(props),
        clear: () => INVOICE.clear(),
        clearClients: ()=>CLIENTS.onClear()
    };
}

//connect to redux
export default connect(mapStateToProps, mapDispatchToProps)(ViewInvoices);