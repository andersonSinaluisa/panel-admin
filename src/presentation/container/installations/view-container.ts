import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler"
import ViewInstallations from '../../components/installations/view'
import { installations_interface } from 'infrastructure/api/installation';
import { DeleteInstallationStateProps, UpdateStateInstallationStateProps } from 'application/models/installations';
import { clients_interface } from 'infrastructure/api/clients';



//create interface for view
export interface ViewInstallationsProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    GetInstallations:installations_interface.GetInstallationsResponse;
    GetInstallationsAsync:(props:HeaderProps)=>void;
    UpdateStateInstallation:UpdateStateInstallationStateProps;
    DeleteInstallation:DeleteInstallationStateProps;
    UpdateStateInstallationAsync:(payload:{headers:HeaderProps,id:string,body:installations_interface.UpdateStateInstallationsRequest})=>void;
    DeleteInstallationAsync:(payload:{headers:HeaderProps,id:string})=>void;
    ClearState:()=>void;
    GetClients: clients_interface.GetClientsResponse;
    onGetClientsAsync:(props:HeaderProps)=>void;
}


       
const mapSatateToProps = ({ AUTH,INSTALLATIONS,CLIENTS}: any, ownProps: any) => ({
    token: AUTH.Session.data.message.token,
    title: ownProps.title,
    breadcrumbs: ownProps.breadcrumbs,
    GetInstallations:INSTALLATIONS.GetInstallations.data,
    UpdateStateInstallation:INSTALLATIONS.UpdateStateInstallation,
    DeleteInstallation:INSTALLATIONS.DeleteInstallation,
    GetClients: CLIENTS.GetClients.data
})


const mapDispatchToProps = ({INSTALLATIONS,CLIENTS}: any) => ({
    GetInstallationsAsync:(props:HeaderProps)=>INSTALLATIONS.GetInstallationsAsync(props),
    UpdateStateInstallationAsync:(payload:{headers:HeaderProps,id:string,body:installations_interface.UpdateStateInstallationsRequest})=>INSTALLATIONS.UpdateStateInstallationAsync(payload),
    DeleteInstallationAsync:(payload:{headers:HeaderProps,id:string})=>INSTALLATIONS.DeleteInstallationAsync(payload),
    ClearState:()=>INSTALLATIONS.ClearState(),
    onGetClientsAsync:(props:HeaderProps)=>CLIENTS.onGetClientsAsync(props)
})

export default connect(mapSatateToProps, mapDispatchToProps)(ViewInstallations)
