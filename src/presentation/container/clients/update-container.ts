import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler"
import UpdateClient from '../../components/clients/update'
import { clients_interface } from 'infrastructure/api/clients';
import {  GetClientByIdStateProps, UpdateClientStateProps } from 'application/models/clients';
import { CatalogueState } from 'application/models/core';



export interface UpdateClientProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    UpdateClient:UpdateClientStateProps;
    onUpdateClientAsync:(props:{headers:HeaderProps,body:clients_interface.ClientUpdateRequest,id:number})=>void;
    onGetClientByIdAsync:(props:{headers:HeaderProps,id:number})=>void;
    GetClientById:GetClientByIdStateProps;
    catalogues: CatalogueState;
    isLoading:boolean;
}
       
const mapSatateToProps = ({ AUTH,CLIENTS,CORE,loading}: any, ownProps: any) => ({
    token: AUTH.Session.data.token,
    title: ownProps.title,
    breadcrumbs: ownProps.breadcrumbs,
    UpdateClient:CLIENTS.UpdateClient,
    catalogues: CORE.catalogues,
    GetClientById:CLIENTS.GetClientById,
    isLoading: CLIENTS.isLoading
})

const mapDispatchToProps = ({CLIENTS}: any) => ({
    onUpdateClientAsync:(props:{headers:HeaderProps,body:clients_interface.ClientUpdateRequest,id:number})=>CLIENTS.onUpdateClientAsync(props),
    onGetClientByIdAsync:(props:{headers:HeaderProps,id:number})=>CLIENTS.onGetClientByIdAsync(props)
})

export default connect(mapSatateToProps, mapDispatchToProps)(UpdateClient)
