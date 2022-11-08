import CreatePersonal from "presentation/components/personal/create";
import { connect } from 'react-redux'
import { HeaderProps } from 'infrastructure/api/api-handler'
import { CreatePersonalStateProps } from "application/models/personal";
import { CreatePersonalRequest } from "infrastructure/api/personal/interface";
import { user_interface } from "infrastructure/api/users";

export interface   CreatePersonalProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    CreatePersonal: CreatePersonalStateProps;
    onCreatePersonalAsync:(payload:{ headers: HeaderProps, body: CreatePersonalRequest })=>void;
    GetUsers: user_interface.User[]


}
//connect to redux
const mapStateToProps = ({PERSONAL,AUTH,USERS}:any,ownProps:any) => {
    return {
        CreatePersonal:PERSONAL.CreatePersonal,
        token: AUTH.Session.data.message.token,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        GetUsers:USERS.GetUsers.status===200?USERS.GetUsers.data.message:[]

    };
}

const mapDispatchToProps = ({PERSONAL}: any) => {
    return {
        onCreatePersonalAsync:(payload:{ headers: HeaderProps, body: CreatePersonalRequest })=>PERSONAL.onCreatePersonalAsync(payload),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePersonal);