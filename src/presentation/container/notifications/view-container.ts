import { HeaderProps } from "infrastructure/api/api-handler";
import NotificationsView from "presentation/components/notifications/view";
import { connect } from "react-redux";



export interface NotificationsViewProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    GetNotificationAsync:(payload: HeaderProps)=>void;
    notifications: any;
    isLoading: boolean;
}

const mapStateToProps = ({NOTIFICATIONS,AUTH,loading}:any,ownProps:any) => {
    return {
        token: AUTH.Session.data.token,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        isLoading:  loading.effects.NOTIFICATIONS.GetNotificationAsync,
        notifications: NOTIFICATIONS.GetNotifications
    }
}

const mapDispatchToProps = ({NOTIFICATIONS}: any) => {
    return {
        GetNotificationAsync:(payload: HeaderProps)=>NOTIFICATIONS.GetNotificationAsync(payload),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsView)


