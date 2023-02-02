import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler" 
import CreateInstallation from '../../components/installations/create'
import { installations_interface } from 'infrastructure/api/installation'
import { CreateInstallationStateProps } from 'application/models/installations';
import { clients_interface } from 'infrastructure/api/clients';
import { CatalogueState } from 'application/models/core';


//interface
export interface CreateInstallationProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    CreateInstallation:CreateInstallationStateProps;
    GetClients:clients_interface.GetClientsResponse;
    CreateInstallationAsync:(props:{headers:HeaderProps,body:installations_interface.CreateInstallationRequest})=>void;
    onGetClientsAsync:(props:HeaderProps)=>void;
    catalogues: CatalogueState;
    isLoading:boolean;

}


const mapSatateToProps = ({ AUTH,INSTALLATIONS,CLIENTS,CORE,loading}: any, ownProps: any) => ({
    token: AUTH.Session.data.token,
    title: ownProps.title,
    breadcrumbs: ownProps.breadcrumbs,
    CreateInstallation:INSTALLATIONS.CreateInstallation,
    GetClients:CLIENTS.GetClients.data,
    catalogues: CORE.catalogues,
    isLoading : loading.effects.INSTALLATIONS.CreateInstallationAsync
 
})

const mapDispatchToProps = ({INSTALLATIONS,CLIENTS}: any) => ({
    CreateInstallationAsync:(props:{headers:HeaderProps,body:installations_interface.CreateInstallationRequest})=>INSTALLATIONS.CreateInstallationAsync(props),
    onGetClientsAsync:(props:HeaderProps)=>CLIENTS.onGetClientsAsync(props)

})

export default connect(mapSatateToProps, mapDispatchToProps)(CreateInstallation)