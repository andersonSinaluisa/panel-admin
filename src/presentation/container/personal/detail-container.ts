import { connect } from 'react-redux'
import { HeaderProps } from 'infrastructure/api/api-handler'
import {  PersonalStateProps } from "application/models/personal";
import DetailPersonal from "presentation/components/personal/detail";

export interface   DetailPersonalProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    GetPersonalById: PersonalStateProps;
    onGetPersonalByIdAsync:(payload:{ headers: HeaderProps, id: string })=>void;
}
//connect to redux
const mapStateToProps = ({PERSONAL,AUTH,USERS}:any,ownProps:any) => {
    return {
        GetPersonalById:PERSONAL.GetPersonalById,
        token: AUTH.Session.data.message.token,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,

    };
}

const mapDispatchToProps = ({PERSONAL}: any) => {
    return {
        onGetPersonalByIdAsync:(payload:{ headers: HeaderProps, id: string })=>PERSONAL.onGetPersonalByIdAsync(payload),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPersonal);