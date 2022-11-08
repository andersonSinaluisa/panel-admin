import { createModel } from "@rematch/core";
import { HeaderProps, ResponseServer } from "infrastructure/api/api-handler";
import { tasks_interface, tasks_request } from "infrastructure/api/tasks";
import { RootModel } from "..";


interface GetTasksStateProps extends ResponseServer{
    data: tasks_interface.GetTaskResponse;
}

export interface CreateTasksStateProps extends ResponseServer{
    data:{
        status:number;
        message:string;
    }
}

interface GetTaskByIdStateProps extends ResponseServer{
    data:tasks_interface.GetTaskByIdResponse;
}

export interface CloseTaskStateProps extends ResponseServer{
    data: {
        status:number;
        message:string;
    }
}
export interface DeleteTaskStateProps extends ResponseServer{
    data: {
        status:number;
        message:string;
    }
}


export const TASKS = createModel<RootModel>()({
    state: {
        GetTasks:{
            data: {
                message:[],
                status:0
            },
            status:0,
            error:""
        } as GetTasksStateProps,
        CreateTasks:{
            data:{
                status:0,
                message:""
            },
            error:"",
            status:0
        } as CreateTasksStateProps,
        GetTaskById:{
            data:{
                message:{},
                status:0
            },
            error:"",
            status:0
        } as GetTaskByIdStateProps,
        CloseTask:{
            data:{
                status:0,
                message:""
            },
            error:"",
            status:0
        } as CloseTaskStateProps,
        DeleteTask:{
            data:{
                status:0,
                message:""
            },
            error:"",
            status:0
        } as DeleteTaskStateProps
    },
    reducers: {
        onGetTasks(state, payload: GetTasksStateProps) {
            return {
                ...state,
                GetTasks: payload
            }
        },
        onCreateTasks(state, payload: CreateTasksStateProps) {
            return {
                ...state,
                CreateTasks: payload
            }
        },
        onGetTaskById(state, payload: GetTaskByIdStateProps) {
            return {
                ...state,
                GetTaskById: payload
            }
        },
        onCloseTask(state, payload: CloseTaskStateProps) {
            return {
                ...state,
                CloseTask: payload
            }
        },
        onDeleteTask(state, payload: DeleteTaskStateProps) {
            return {
                ...state,
                DeleteTask: payload
            }
        }
    },
    effects: (dispatch) => ({
        async onGetTasksAsync(props: HeaderProps) {
            try {
                const response = await tasks_request.GetTask(props).toPromise();
                dispatch.TASKS.onGetTasks({
                    data: response.data,
                    status: response.status,
                    error: ""

                });
            } catch (error:any) {
                dispatch.TASKS.onGetTasks({ data: { message: [], status: 0 }, status: 0, error: error.response?error.response.data.message:error.message });
            }
        },
        async onCreateTasksAsync(props: { headers: HeaderProps, body: tasks_interface.CreateTaskRequest }) {
            try {
                const response = await tasks_request.CreateTask(props).toPromise();
                dispatch.TASKS.onCreateTasks({
                    data: response.data,
                    status: response.status,
                    error: ""

                });
            } catch (error:any) {
                dispatch.TASKS.onCreateTasks({ data: { status: 0, message: "" }, status: 0, error: error.response?error.response.data.message:error.message });
            }
        },
        async onGetTaskByIdAsync(props: { headers: HeaderProps, id: string }) {
            try {
                const response = await tasks_request.GetTaskById(props).toPromise();
                dispatch.TASKS.onGetTaskById({
                    data: response.data,
                    status: response.status,
                    error: ""

                });
            } catch (error:any) {
                dispatch.TASKS.onGetTaskById({ data: { message: {}, status: 0 }, status: 0, error: error.response?error.response.data.message:error.message });
            }
        },
        async onCloseTaskAsync(props:{headers:HeaderProps,body:tasks_interface.CloseTaskRequest,id:string}) {
            try {
                const response = await tasks_request.CloseTask(props).toPromise();
                dispatch.TASKS.onCloseTask({
                    data: response.data,
                    status: response.status,
                    error: ""

                });
            } catch (error:any) {
                dispatch.TASKS.onCloseTask({ data: { status: 0, message: "" }, status: 0, error: error.response?error.response.data.message:error.message });
            }
        },
        async onDeleteTaskAsync(props:{headers:HeaderProps,id:string}) {
            try {
                const response = await tasks_request.DeleteTask(props).toPromise();
                dispatch.TASKS.onDeleteTask({
                    data: response.data,
                    status: response.status,
                    error: ""

                });
            } catch (error:any) {
                dispatch.TASKS.onDeleteTask({ data: { status: 0, message: "" }, status: 0, error: error.response?error.response.data.message:error.message });
            }
        },
        onClear(){
            dispatch.TASKS.onCreateTasks({ data: { status: 0, message: "" }, status: 0, error: "" });
            dispatch.TASKS.onGetTaskById({ data: { message: {}, status: 0 }, status: 0, error: "" });
            dispatch.TASKS.onCloseTask({ data: { status: 0, message: "" }, status: 0, error: "" });
            dispatch.TASKS.onDeleteTask({ data: { status: 0, message: "" }, status: 0, error: "" });
        }
        
    })
})