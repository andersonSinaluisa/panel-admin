import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler"
import ClientsView from '../../components/clients/view'
import { clients_interface } from 'infrastructure/api/clients';
import { DeleteClientStateProps } from 'application/models/clients';



export interface ClientsViewProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    ClientsData: clients_interface.GetClientsResponse;
    DeleteClient:DeleteClientStateProps;
    onGetClientsAsync:(props:HeaderProps)=>void;
    onClear: ()=>void;
    onDeleteClientAsync:(props:{headers:HeaderProps,id:string})=>void;
}
       
const mapSatateToProps = ({ AUTH,CLIENTS, Groups}: any, ownProps: any) => ({
    token: AUTH.Session.data.message.token,
    title: ownProps.title,
    breadcrumbs: ownProps.breadcrumbs,
    ClientsData:CLIENTS.GetClients.data,
    DeleteClient:CLIENTS.DeleteClient
})

const mapDispatchToProps = ({CLIENTS}: any) => ({
    onGetClientsAsync:(props:HeaderProps)=>CLIENTS.onGetClientsAsync(props),
    onDeleteClientAsync:(props:{headers:HeaderProps,id:string})=>CLIENTS.onDeleteClientAsync(props),
    onClear: ()=>CLIENTS.onClear()
})

export default connect(mapSatateToProps, mapDispatchToProps)(ClientsView)