import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler"
import UpdateClient from '../../components/clients/update'
import { clients_interface } from 'infrastructure/api/clients';
import {  GetClientByIdStateProps, UpdateClientStateProps } from 'application/models/clients';



export interface UpdateClientProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    UpdateClient:UpdateClientStateProps;
    onUpdateClientAsync:(props:{headers:HeaderProps,body:clients_interface.ClientUpdateRequest,id:number})=>void;
    onGetClientByIdAsync:(props:{headers:HeaderProps,id:string})=>void;
    GetClientById:GetClientByIdStateProps;
}
       
const mapSatateToProps = ({ AUTH,CLIENTS}: any, ownProps: any) => ({
    token: AUTH.Session.data.message.token,
    title: ownProps.title,
    breadcrumbs: ownProps.breadcrumbs,
    UpdateClient:CLIENTS.UpdateClient,
    GetClientById:CLIENTS.GetClientById
})

const mapDispatchToProps = ({CLIENTS}: any) => ({
    onUpdateClientAsync:(props:{headers:HeaderProps,body:clients_interface.ClientUpdateRequest,id:number})=>CLIENTS.onUpdateClientAsync(props),
    onGetClientByIdAsync:(props:{headers:HeaderProps,id:string})=>CLIENTS.onGetClientByIdAsync(props)
})

export default connect(mapSatateToProps, mapDispatchToProps)(UpdateClient)
