import { connect } from 'react-redux'
import PrivateLayout from '../components/private-layout';
import { auth_interfaces } from '../../infrastructure/api/auth';


export interface PrivateLayoutProps{
    dataLogin:auth_interfaces.LoginResponse,
    token:string;
    loading:boolean;
    clearSession:()=>void;
    connectToWebSocket:()=>WebSocket;
}


const mapSatateToProps = ({AUTH,loading}:any)=>(
    {
        dataLogin: AUTH.Session,
    }
)


const mapDispatchToProps = ({ AUTH }: any) => ({
    clearSession:()=>AUTH.clearSession(),
    connectToWebSocket:()=>AUTH.connectToWebSocket()
})

export default connect(mapSatateToProps, mapDispatchToProps)(PrivateLayout)