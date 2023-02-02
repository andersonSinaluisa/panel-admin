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
    isLoading: boolean;
}


const mapStateToProps = ({PERSONAL,AUTH,loading}:any,ownProps:any) => {
    return {
        GetPersonal: PERSONAL.GetPersonal.data,
        token: AUTH.Session.data.token,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        DeletePersonal: PERSONAL.DeletePersonal,
        isLoading:  loading.effects.PERSONAL.onGetPersonalAsync
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