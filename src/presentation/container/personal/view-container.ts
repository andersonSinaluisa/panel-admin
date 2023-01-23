import { DeletePersonalStateProps } from 'application/models/personal';
import { HeaderProps } from 'infrastructure/api/api-handler'
import { GetPersonalResponse } from 'infrastructure/api/personal/interface';
import { connect } from 'react-redux'
import PersonalView from '../../components/personal/view'


export interface PersonalViewProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    GetPersonal: GetPersonalResponse;
    onGetPersonalAsync:(payload: HeaderProps)=>void;
    DeletePersonal: DeletePersonalStateProps;
    onDeletePersonalAsync:(payload:{ headers: HeaderProps, id: number })=>void;
    clear: ()=>void;
}


const mapStateToProps = ({PERSONAL,AUTH}:any,ownProps:any) => {
    return {
        GetPersonal: PERSONAL.GetPersonal.data,
        token: AUTH.Session.data.token,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        DeletePersonal: PERSONAL.DeletePersonal
    }
}

const mapDispatchToProps = ({PERSONAL}: any) => {
    return {
        onGetPersonalAsync:(payload: HeaderProps)=>PERSONAL.onGetPersonalAsync(payload),
        clear: ()=>PERSONAL.clear(),
        onDeletePersonalAsync:(payload:{ headers: HeaderProps, id: number })=>PERSONAL.onDeletePersonalAsync(payload)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalView)