import AuthProvider from "../../components/auth/auth-provider";
import { connect } from 'react-redux'
import {auth_interfaces} from 'infrastructure/api/auth'
import { HeaderProps } from "infrastructure/api/api-handler";



const mapSatateToProps = ({ AUTH, loading }: any) => (
    {
        dataLogin: AUTH.Session.data,
        error:AUTH.Session.error,
    }
)

const mapDispatchToProps = ({AUTH}: any)=>({
    onLoginAsync: (data: auth_interfaces.LoginRequest) => AUTH.onLoginAsync(data),
    onLogoutAsync: (data: HeaderProps) => AUTH.clearSession(data)
})

export default connect(mapSatateToProps, mapDispatchToProps)(AuthProvider)