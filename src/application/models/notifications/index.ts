import { createModel } from "@rematch/core";
import { HeaderProps, initialMetaResponse, ResponseServer } from "infrastructure/api/api-handler";
import { notifications_request } from "infrastructure/api/notifications";
import { GetNotifications } from "infrastructure/api/notifications/interface";
import { RootModel } from "..";

interface notification{
    title:string;
    description:string;
    type:'success'|'error'|'info'|'warning';
    duration:number;
    see:boolean;
    onSee:()=>void;
    datetime: Date;
    data:any;
}


interface GetNotificationState extends ResponseServer{
    data:GetNotifications;
}


export const NOTIFICATIONS = createModel<RootModel>()({
    state: {
        notifications:[] as notification[],

        GetNotifications:{
            data:{
                data:[],
                ...initialMetaResponse
            },
            error:"",
            status:0
        } as GetNotificationState
    },
    reducers: {
        addNotification(state, payload:notification) {
            return {
                ...state,
                notifications:[...state.notifications,payload]
            }
        },
        removeNotification(state, payload:notification) {
            return {
                ...state,
                notifications:state.notifications.filter((item)=>item!==payload)
            }
        },
        GetNotification(state, payload:GetNotificationState) {
            return {
                ...state,
                GetNotifications:payload
            }
        }
    },
    effects: (dispatch) => ({
        async addNotification(payload:notification) {
            dispatch.notifications.addNotification(payload);
            
        },
        async GetNotificationAsync(payload:HeaderProps) {
            try{
                const response = await notifications_request.GetNotifications(payload).toPromise();
                dispatch.NOTIFICATIONS.GetNotification({
                    data:response.data,
                    error:"",
                    status:response.status
                });
            }catch(e:any){
                console.log(e);
                let error = e.response?.data.message?.summary ?? "Ocurrio un error"
                error += e.response?.data.message?.detail ?? "" 
                dispatch.NOTIFICATIONS.GetNotification({
                    data:{
                        data:[],
                        ...initialMetaResponse
                    },
                    error,
                    status:e.response?.status ?? 500
                });
            }
        }
    }),
});

export type {
    notification
}