import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler"
import DetailUser from '../../components/users/detail'
import { CreateUserStateProps, GetUserProps } from 'application/models/users';
import { CreateUserRequest } from 'infrastructure/api/users/interface';
import { user_interface } from 'infrastructure/api/users';



export interface UserDetailProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    GetUser:user_interface.User;
    onGetUserAsync:(props:{headers:HeaderProps,id:number})=>void;
}
       
const mapSatateToProps = ({ AUTH,USERS, Groups}: any, ownProps: any) => ({
    token: AUTH.Session.data.token,
    title: ownProps.title,
    breadcrumbs: ownProps.breadcrumbs,
    GetUser:USERS.GetUser.data.data
})

const mapDispatchToProps = ({USERS}: any) => ({
    onGetUserAsync:(props:{headers:HeaderProps,id:number})=>USERS.onGetUserAsync(props),
})

export default connect(mapSatateToProps, mapDispatchToProps)(DetailUser)
