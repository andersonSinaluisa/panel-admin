import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler"
import UserCreate from '../../components/users/create'
import { CreateUserStateProps } from 'application/models/users';
import { CreateUserRequest } from 'infrastructure/api/users/interface';



export interface UserCreateProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    CreateUser:CreateUserStateProps;
    onCreateUsersAsync:(props:{headers:HeaderProps,body:CreateUserRequest})=>void;
}
       
const mapSatateToProps = ({ AUTH,USERS, Groups}: any, ownProps: any) => ({
    token: AUTH.Session.data.message.token,
    title: ownProps.title,
    breadcrumbs: ownProps.breadcrumbs,
    CreateUser:USERS.CreateUser
})

const mapDispatchToProps = ({USERS}: any) => ({
    onCreateUsersAsync:(props:{headers:HeaderProps,body:CreateUserRequest})=>USERS.onCreateUsersAsync(props),
})

export default connect(mapSatateToProps, mapDispatchToProps)(UserCreate)
