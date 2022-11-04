import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler"
import CreateClient from '../../components/clients/create'
import { CreateUserStateProps } from 'application/models/users';
import { CreateUserRequest } from 'infrastructure/api/users/interface';
import { clients_interface } from 'infrastructure/api/clients';
import { CreateClientsStateProps } from 'application/models/clients';
import { user_interface } from 'infrastructure/api/users';



export interface CreateClientProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    CreateClients:CreateClientsStateProps;
    onCreateClientsAsync:(props:{headers:HeaderProps,body:clients_interface.CreateClientRequest})=>void;
    onGetUsersAync:(props:HeaderProps)=>void;
    GetUsers: user_interface.User[]
}
       
const mapSatateToProps = ({ AUTH,CLIENTS,USERS}: any, ownProps: any) => ({
    token: AUTH.Session.data.message.token,
    title: ownProps.title,
    breadcrumbs: ownProps.breadcrumbs,
    CreateClients:CLIENTS.CreateClients,
    GetUsers:USERS.GetUsers.status===200?USERS.GetUsers.data.message:[]
})

const mapDispatchToProps = ({CLIENTS,USERS}: any) => ({
    onCreateClientsAsync:(props:{headers:HeaderProps,body:clients_interface.CreateClientRequest})=>CLIENTS.onCreateClientsAsync(props),
    onGetUsersAync:(props:HeaderProps)=>USERS.onGetUsersAync(props)
})

export default connect(mapSatateToProps, mapDispatchToProps)(CreateClient)
