import { createModel } from "@rematch/core";
import { RootModel } from "..";

interface notification{
    title:string;
    description:string;
    type:'success'|'error'|'info'|'warning';
    duration:number;
    see:boolean;
    onSee:()=>void;
    datetime: Date;
}




export const NOTIFICATIONS = createModel<RootModel>()({
    state: {
        notifications:[] as notification[]
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
    },
    effects: (dispatch) => ({
        async addNotification(payload:notification) {
            dispatch.notifications.addNotification(payload);
            
        },
    }),
});

export type {
    notification
}