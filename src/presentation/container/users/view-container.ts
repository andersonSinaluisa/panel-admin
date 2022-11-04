import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler"
import { user_interface } from 'infrastructure/api/users';
import UserView from '../../components/users/view'
import { DeleteUserStateProps } from 'application/models/users';



export interface UsersViewProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    UsersData:user_interface.GetUsers;
    onGetUsersAync:(props: HeaderProps)=>void;
    onDeleteUserAsync:(props:{headers:HeaderProps,id:string})=>void;
    DeleteUser:DeleteUserStateProps;
    onClear:()=>void;
}
       
const mapSatateToProps = ({ AUTH,USERS, Groups}: any, ownProps: any) => ({
    token: AUTH.Session.data.message.token,
    title: ownProps.title,
    breadcrumbs: ownProps.breadcrumbs,
    UsersData:USERS.GetUsers.data,
    DeleteUser:USERS.DeleteUser
})

const mapDispatchToProps = ({USERS}: any) => ({
    onGetUsersAync:(props:HeaderProps)=>USERS.onGetUsersAync(props),
    onDeleteUserAsync:(props:{headers:HeaderProps,id:string})=>USERS.onDeleteUserAsync(props),
    onClear:()=>USERS.onClear()
})

export default connect(mapSatateToProps, mapDispatchToProps)(UserView)
