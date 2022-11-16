import { connect } from 'react-redux'
import PrivateLayout from '../components/private-layout';
import { auth_interfaces } from '../../infrastructure/api/auth';
import { HeaderProps } from 'infrastructure/api/api-handler';
import { SearchResponse } from 'infrastructure/api/search/interface';
import { UserStateProps } from 'application/models/auth';
import { Socket } from 'socket.io-client';


export interface PrivateLayoutProps{
    dataLogin:auth_interfaces.LoginResponse,
    token:string;
    loading:boolean;
    clearSession:()=>void;
    connectToWebSocket:()=>Socket;
    onSearchAsync:(props:{
        headers:HeaderProps,
        identityCounter:string
    })=>void;
    search:SearchResponse;
    onGetUserAsync:(props:{
        headers:HeaderProps,
        id:string
    })=>void;
    UserData: UserStateProps;
}


const mapSatateToProps = ({AUTH,SEARCH}:any)=>(
    {
        dataLogin: AUTH.Session,
        search:SEARCH.search.data,
        UserData:AUTH.UserData,
    }
)


const mapDispatchToProps = ({ AUTH , SEARCH}: any) => ({
    clearSession:()=>AUTH.clearSession(),
    connectToWebSocket:()=>AUTH.connectToWebSocket(),
    onSearchAsync:(props:{
        headers:HeaderProps,
        identityCounter:string
    })=>SEARCH.onSearchAsync(props),
    onGetUserAsync:(props:{
        headers:HeaderProps,
        id:string
    })=>AUTH.onGetUserAsync(props)
})

export default connect(mapSatateToProps, mapDispatchToProps)(PrivateLayout)