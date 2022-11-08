import { HeaderProps } from "infrastructure/api/api-handler"
import { connect } from 'react-redux'
import TaskView from "presentation/components/tasks/view"
import { tasks_interface } from "infrastructure/api/tasks";
import { CloseTaskStateProps, CreateTasksStateProps, DeleteTaskStateProps } from "application/models/tasks";
import { user_interface } from "infrastructure/api/users";


export interface TasksViewProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    GetTasks:tasks_interface.GetTaskResponse;
    onGetTasksAsync:(props: HeaderProps)=>void;
    onCreateTasksAsync:(props: { headers: HeaderProps, body: tasks_interface.CreateTaskRequest })=>void;
    CreateTasks:CreateTasksStateProps;
    onGetUsersAync:(props:HeaderProps)=>void;
    onCloseTaskAsync:(props:{headers:HeaderProps,body:tasks_interface.CloseTaskRequest,id:string})=>void;
    GetUsers:user_interface.GetUsers;
    CloseTask:CloseTaskStateProps;
    onClear:()=>void;
    onDeleteTaskAsync:(props:{headers:HeaderProps,id:string})=>void;
    DeleteTask:DeleteTaskStateProps;
}


//connect to redux
const mapStateToProps = ({AUTH,TASKS,USERS}:any,ownProps:any) => {
    return {
        token: AUTH.Session.data.message.token,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        GetTasks:TASKS.GetTasks.data,
        CreateTasks:TASKS.CreateTasks,
        GetUsers:USERS.GetUsers.data,
        CloseTask:TASKS.CloseTask,
        DeleteTask:TASKS.DeleteTask
    }
}

const mapDispatchToProps = ({TASKS,USERS}: any) => ({
    onGetTasksAsync:(props: HeaderProps)=>TASKS.onGetTasksAsync(props),
    onCreateTasksAsync:(props: { headers: HeaderProps, body: tasks_interface.CreateTaskRequest })=>TASKS.onCreateTasksAsync(props),
    onGetUsersAync:(props:HeaderProps)=>USERS.onGetUsersAync(props),
    onCloseTaskAsync:(props:{headers:HeaderProps,body:tasks_interface.CloseTaskRequest,id:string})=>TASKS.onCloseTaskAsync(props),
    onClear:()=>TASKS.onClear(),
    onDeleteTaskAsync:(props:{headers:HeaderProps,id:string})=>TASKS.onDeleteTaskAsync(props)
})
export default connect(mapStateToProps, mapDispatchToProps)(TaskView)

