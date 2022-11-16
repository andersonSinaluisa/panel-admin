import { connect } from 'react-redux'
import { HeaderProps } from "infrastructure/api/api-handler"
import DashboardView from 'presentation/components/dashboard/view'
import { GetInstallationsResponse } from 'infrastructure/api/installation/interface';
import { GetJobsResponse } from 'infrastructure/api/jobs/interface';
import { GetTaskResponse } from 'infrastructure/api/tasks/interface';
import { GetUsers } from 'infrastructure/api/users/interface';

export interface DashboardViewProps {
    token: string;
    title: string;
    breadcrumbs: string[];
    GetInstallations:GetInstallationsResponse;
    GetJobs:GetJobsResponse;
    GetTasks:GetTaskResponse;
    GetUsers:GetUsers;

    GetInstallationsAsync:(props:HeaderProps)=>void;
    GetJobsAsync:(props:HeaderProps)=>void;
    GetTasksAsync:(props:HeaderProps)=>void;
    GetUsersAsync:(props:HeaderProps)=>void;
}

const mapSatateToProps = ({ AUTH,JOBS,TASKS,USERS,INSTALLATIONS}: any, ownProps: any) => ({
    token: AUTH.Session.data.message.token,
    title: ownProps.title,
    breadcrumbs: ownProps.breadcrumbs,
    GetInstallations:INSTALLATIONS.GetInstallations.data,
    GetJobs:JOBS.GetJobs.data,
    GetTasks:TASKS.GetTasks.data,
    GetUsers:USERS.GetUsers.data,
    
})

const mapDispatchToProps = ({JOBS,TASKS,USERS,INSTALLATIONS}: any) => ({
    GetInstallationsAsync:(props:HeaderProps)=>INSTALLATIONS.GetInstallationsAsync(props),
    GetJobsAsync:(props:HeaderProps)=>JOBS.onGetJobsAsync(props),
    GetTasksAsync:(props:HeaderProps)=>TASKS.onGetTasksAsync(props),
    GetUsersAsync:(props:HeaderProps)=>USERS.onGetUsersAync(props),
})

export default connect(mapSatateToProps, mapDispatchToProps)(DashboardView)