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
    DeleteInstallation:DeleteInstallationStateProps;
    DeleteInstallationAsync:(payload:{headers:HeaderProps,id:number})=>void;
    ClearState:()=>void;
    GetClients: clients_interface.GetClientsResponse;
    onGetClientsAsync:(props:HeaderProps)=>void;
    isLoading:boolean;
}


       
const mapSatateToProps = ({ AUTH,INSTALLATIONS,CLIENTS,loading}: any, ownProps: any) => ({
    token: AUTH.Session.data.token,
    title: ownProps.title,
    breadcrumbs: ownProps.breadcrumbs,
    GetInstallations:INSTALLATIONS.GetInstallations.data,
    DeleteInstallation:INSTALLATIONS.DeleteInstallation,
    GetClients: CLIENTS.GetClients.data,
    isLoading :loading.effects.INSTALLATIONS.GetInstallationsAsync
})


const mapDispatchToProps = ({INSTALLATIONS,CLIENTS}: any) => ({
    GetInstallationsAsync:(props:HeaderProps)=>INSTALLATIONS.GetInstallationsAsync(props),
    DeleteInstallationAsync:(payload:{headers:HeaderProps,id:number})=>INSTALLATIONS.DeleteInstallationAsync(payload),
    ClearState:()=>INSTALLATIONS.ClearState(),
    onGetClientsAsync:(props:HeaderProps)=>CLIENTS.onGetClientsAsync(props)
})

export default connect(mapSatateToProps, mapDispatchToProps)(ViewInstallations)
