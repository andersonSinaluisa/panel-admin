import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler" 
import EditInstallation from '../../components/installations/edit'
import { installations_interface } from 'infrastructure/api/installation'
import { CreateInstallationStateProps } from 'application/models/installations';
import { clients_interface } from 'infrastructure/api/clients';



//interface
export interface EditInstallationProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    CreateInstallation:CreateInstallationStateProps;
    GetClients:clients_interface.GetClientsResponse;
    onGetClientsAsync:(props:HeaderProps)=>void;
    GetInstallationAsync:(payload: { headers: HeaderProps, id: string })=>void;
    GetInstallation: installations_interface.GetInstallationResponse;
}


const mapSatateToProps = ({ AUTH,INSTALLATIONS,CLIENTS}: any, ownProps: any) => ({
    token: AUTH.Session.data.message.token,
    title: ownProps.title,
    breadcrumbs: ownProps.breadcrumbs,
    CreateInstallation:INSTALLATIONS.CreateInstallation,
    GetClients:CLIENTS.GetClients.data,
    GetInstallation: INSTALLATIONS.GetInstallation.data
})

const mapDispatchToProps = ({INSTALLATIONS,CLIENTS}: any) => ({
    onGetClientsAsync:(props:HeaderProps)=>CLIENTS.onGetClientsAsync(props),
    GetInstallationAsync:(payload: { headers: HeaderProps, id: string })=>INSTALLATIONS.GetInstallationAsync(payload),

})

export default connect(mapSatateToProps, mapDispatchToProps)(EditInstallation)