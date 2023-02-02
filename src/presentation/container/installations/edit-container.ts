import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler" 
import EditInstallation from '../../components/installations/edit'
import { installations_interface } from 'infrastructure/api/installation'
import {  UpdateStateInstallationStateProps } from 'application/models/installations';
import { CatalogueState } from 'application/models/core';



//interface
export interface EditInstallationProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    UpdateStateInstallation:UpdateStateInstallationStateProps;
    GetInstallationAsync:(payload: { headers: HeaderProps, id: number })=>void;
    GetInstallation: installations_interface.Installation;
    catalogues: CatalogueState;
    UpdateStateInstallationAsync: (payload: { headers: HeaderProps, id: number, body: installations_interface.UpdateInstallationsRequest }) => void;
    isLoading : boolean;
}


const mapSatateToProps = ({ AUTH,INSTALLATIONS,CORE,loading}: any, ownProps: any) => ({
    token: AUTH.Session.data.token,
    title: ownProps.title,
    breadcrumbs: ownProps.breadcrumbs,
    UpdateStateInstallation:INSTALLATIONS.UpdateStateInstallation,
    GetInstallation: INSTALLATIONS.GetInstallation.data.data,
    catalogues: CORE.catalogues,
    isLoading : loading.effects.INSTALLATIONS.UpdateStateInstallationAsync

})

const mapDispatchToProps = ({INSTALLATIONS}: any) => ({
    GetInstallationAsync:(payload: { headers: HeaderProps, id: number })=>INSTALLATIONS.GetInstallationAsync(payload),
    UpdateStateInstallationAsync: (payload: { headers: HeaderProps, id: number, body: installations_interface.UpdateInstallationsRequest }) => INSTALLATIONS.UpdateStateInstallationAsync(payload),
})

export default connect(mapSatateToProps, mapDispatchToProps)(EditInstallation)