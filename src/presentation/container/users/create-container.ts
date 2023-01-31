import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler"
import UserCreate from '../../components/users/create'
import { CreateUserStateProps } from 'application/models/users';
import { CreateUserRequest } from 'infrastructure/api/users/interface';
import { CatalogueState } from 'application/models/core';



export interface UserCreateProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    CreateUser:CreateUserStateProps;
    onCreateUsersAsync:(props:{headers:HeaderProps,body:CreateUserRequest})=>void;
    catalogues: CatalogueState;
}
       
const mapSatateToProps = ({ AUTH,USERS, CORE}: any, ownProps: any) => ({
    token: AUTH.Session.data.token,
    title: ownProps.title,
    breadcrumbs: ownProps.breadcrumbs,
    CreateUser:USERS.CreateUser,
    catalogues: CORE.catalogues
})

const mapDispatchToProps = ({USERS}: any) => ({
    onCreateUsersAsync:(props:{headers:HeaderProps,body:CreateUserRequest})=>USERS.onCreateUsersAsync(props),
})

export default connect(mapSatateToProps, mapDispatchToProps)(UserCreate)
