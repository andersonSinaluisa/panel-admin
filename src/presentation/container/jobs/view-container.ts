import ViewJobs from "presentation/components/jobs/view";
import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler"
import { CloseJobRequest, CreateJobRequest, GetJobsResponse } from "infrastructure/api/jobs/interface";
import { } from 'application/models/jobs'
import { CreateJobStateProps, DeleteJobStateProps, CloseJobStateProps } from "application/models/jobs";
import { GetClientsResponse } from "infrastructure/api/clients/interface";


export interface ViewJobsProps {
    GetJobs: GetJobsResponse;
    CreateJob: CreateJobStateProps;
    DeleteJob: DeleteJobStateProps;
    CloseJob: CloseJobStateProps;
    onGetJobsAsync: (payload: HeaderProps) => void;
    onCreateJobAsync: (payload: { headers: HeaderProps, body: CreateJobRequest }) => void;
    onDeleteJobAsync: (payload: { headers: HeaderProps, id: string }) => void;
    onCloseJobAsync: (payload: { headers: HeaderProps, body: CloseJobRequest, id: string }) => void;
    onGetClientsAsync:(props:HeaderProps)=>void;
    token: string;
    title: string;
    breadcrumbs: string[];
    GetClients:GetClientsResponse;
}



//connect to redux
const mapStateToProps = ({ JOBS , AUTH,CLIENTS}: any, ownProps:any) => {
    return {
        GetJobs: JOBS.GetJobs.data,
        CreateJob: JOBS.CreateJob,
        DeleteJob: JOBS.DeleteJob,
        CloseJob: JOBS.CloseJob,
        token: AUTH.Session.data.message.token,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        GetClients: CLIENTS.GetClients.data

    };
}



//connect to redux
const mapDispatchToProps = ({ JOBS,CLIENTS }: any) => {
    return {
        onGetJobsAsync: (payload: HeaderProps) => JOBS.onGetJobsAsync(payload),
        onCreateJobAsync: (payload: { headers: HeaderProps, body: CreateJobRequest }) => JOBS.onCreateJobAsync(payload),
        onDeleteJobAsync: (payload: { headers: HeaderProps, id: string }) => JOBS.onDeleteJobAsync(payload),
        onCloseJobAsync: (payload: { headers: HeaderProps, body: CloseJobRequest, id: string }) => JOBS.onCloseJobAsync(payload),
        onGetClientsAsync:(props:HeaderProps)=>CLIENTS.onGetClientsAsync(props)
    };
}

//connect to redux
export default connect(mapStateToProps, mapDispatchToProps)(ViewJobs);