/**
 * @fileoverview  Archivo que contiene las peticiones de la api de tareas
 * @author Anderson Sinaluisa - andersonsinaluisa.com
 * @version 1.0.0
 * @since 1.0.0
 * @module api/tasks/request
 * 
 * @requires application/common
 * @requires rxjs
 * @requires api-handler
 * @requires ./interface
 */

import * as Globals from 'application/common';
import { DeleteTaskStateProps } from 'application/models/tasks';
import { Observable } from 'rxjs';
import * as APIHANDLER from '../api-handler';
import { CloseTaskRequest, CreateTaskRequest } from './interface';

/**
 * @description Obtiene las tareas
 * @param {APIHANDLER.HeaderProps} props
 * @returns {Observable<GetTasksStateProps>}
 * @memberof TasksRequest
 */
const GetTask = (props:APIHANDLER.HeaderProps)=>{
    let perPage = props.perPage ? props.perPage : 10;
    let page = props.page ? props.page : 1;
    return APIHANDLER.get(Globals.GET_TASKS+"?perPage="+perPage+"&page="+page,{
        headers:{
            Authorization:"Bearer "+props.token
        }
    })
}

/**
 * @description Crea una tarea
 * @param {CreateTaskRequest} props
 * @returns {Observable<CreateTaskStateProps>}
 * @memberof TasksRequest
 * 
 */
const CreateTask = (props:{headers:APIHANDLER.HeaderProps,body:CreateTaskRequest})=>{
    return APIHANDLER.post(Globals.CREATE_TASKS,props.body,{
            Authorization:"Bearer "+props.headers.token
        
    })
}

/**
 * @description Obtiene una tarea por id
 * @param {GetTaskByIdRequest} props
 * @returns {Observable<GetTaskByIdStateProps>}
 * @memberof TasksRequest
 * 
 */
const GetTaskById = (props:{headers:APIHANDLER.HeaderProps,id:string})=>{
    return APIHANDLER.get(Globals.GET_TASKS+props.id,{
        headers:{
            Authorization:"Bearer "+props.headers.token
        }
    })
}
/**
 * @description Cierra una tarea
 * @param {CloseTaskRequest} props
 * @returns {Observable<CloseTaskStateProps>}
 * @memberof TasksRequest
 * 
 */
const CloseTask = (props:{headers:APIHANDLER.HeaderProps,body:CloseTaskRequest,id:string})=>{
    return APIHANDLER.put(Globals.CLOSE_TASKS.replace(":task_id",props.id),props.body,{
        Authorization:"Bearer "+props.headers.token
    })
    
}

/**
 * @description Elimina una tarea
 * @param {DeleteTaskRequest} props
 * @returns {Observable<DeleteTaskStateProps>}
 * @memberof TasksRequest
 * 
 */
const DeleteTask = (props:{headers:APIHANDLER.HeaderProps,id:number})=>{
    return APIHANDLER.del(Globals.DELETE_TASKS+props.id,{
            Authorization:"Bearer "+props.headers.token
        
    })
}

export{
    GetTask,
    CreateTask,
    GetTaskById,
    CloseTask,
    DeleteTask
}