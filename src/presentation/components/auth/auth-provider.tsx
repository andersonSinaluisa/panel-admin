import React, { useEffect } from 'react';
import { AuthContext, AuthContextProps } from 'application/common/hooks/use-auth';
import { auth_interfaces } from 'infrastructure/api/auth';
import {useNavigate} from 'react-router-dom';
import { initLogin } from 'application/models/auth';


type LoginResponse = auth_interfaces.LoginResponse;
type LoginRequest = auth_interfaces.LoginRequest;

/* Una definición de tipo para las propiedades que recibirá el componente. */
interface AuthProviderProps {
  children?: React.ReactNode;
  dataLogin:LoginResponse,
  onLoginAsync:Function;
  onLogoutAsync:Function;
  error:string;
};


/**
 * El AuthProvider es un componente de React que proporciona el AuthContext a todos sus elementos
 * secundarios.
 * @param {AuthProviderProps}  - El componente que será envuelto por el proveedor.
 * @returns Se está devolviendo el AuthProvider.
 */
const AuthProvider = (props: AuthProviderProps) => {
  const navigate = useNavigate();

  const init: LoginResponse = initLogin;
  const [token, setToken] = React.useState<string | null>("");
  const [dataLogin, setDataLogin] = React.useState<LoginResponse>(init);
  const [error,setError] = React.useState<string>("")
  useEffect(() => {
    console.log(props.dataLogin)
    setDataLogin(props.dataLogin); 
    setError(props.error)

    if (props.dataLogin.token != "") {

      navigate("/inicio/")
    }
  }, [props]);


  const handleLogin = async (data: LoginRequest) => {
    props.onLoginAsync(data)
  };

  const handleLogout = () => {
    props.onLogoutAsync({token:dataLogin.token})
   
  };

  const value: AuthContextProps = {
    dataLogin,
    token:dataLogin.token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    error:error
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

