import { connect } from 'react-redux'
import PrivateLayout from '../components/private-layout';
import { auth_interfaces } from '../../infrastructure/api/auth';
import { HeaderProps } from 'infrastructure/api/api-handler';
import { SearchResponse } from 'infrastructure/api/search/interface';
import { UserStateProps } from 'application/models/auth';
import { Socket } from 'socket.io-client';
import { notification } from 'application/models/notifications';
import { LoginResponse } from 'infrastructure/api/auth/interface';


export interface PrivateLayoutProps{
    dataLogin:auth_interfaces.LoginResponse,
    token:string;
    loading:boolean;
    clearSession:(props:HeaderProps)=>void;
    connectToWebSocket:()=>Socket;
    onSearchAsync:(props:{
        headers:HeaderProps,
        identityCounter:string,
        type:string
    })=>void;
    search:SearchResponse;
    addNotification:(payload:notification)=>void;
    notifications:notification[];
    getCataloguesAsync: (props: HeaderProps) => void;
}


const mapSatateToProps = ({AUTH,SEARCH,NOTIFICATIONS}:any)=>(
    {
        dataLogin: AUTH.Session,
        search:SEARCH.search.data,
        notifications: NOTIFICATIONS.notifications
    }
)


const mapDispatchToProps = ({ AUTH , SEARCH,NOTIFICATIONS,CORE}: any) => ({
    clearSession:(props:HeaderProps)=>AUTH.clearSession(props),
    connectToWebSocket:()=>AUTH.connectToWebSocket(),
    onSearchAsync:(props:{
        headers:HeaderProps,
        identityCounter:string
    })=>SEARCH.onSearchAsync(props),
    addNotification:(payload:notification)=>NOTIFICATIONS.addNotification(payload),
    getCataloguesAsync:(props:HeaderProps)=>CORE.getCataloguesAsync(props)
})

export default connect(mapSatateToProps, mapDispatchToProps)(PrivateLayout)