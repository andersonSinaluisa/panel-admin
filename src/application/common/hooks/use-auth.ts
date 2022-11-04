import React from 'react';
import  { auth_interfaces } from 'infrastructure/api/auth';

type LoginResponse = auth_interfaces.LoginResponse;
type LoginRequest = auth_interfaces.LoginRequest;

export interface AuthContextProps {
  dataLogin: LoginResponse;
  token: string|null;
  onLogin: Function;
  onLogout: Function;
  error:string;
};


const initialContext: AuthContextProps = {
  dataLogin: {} as LoginResponse,
  token: '',
  onLogin: () => { },
  onLogout: () => { },
  error:""
};

/* Creación de un objeto de contexto. */
export const AuthContext = React.createContext<AuthContextProps>(initialContext);

/**
 * Devuelve el valor del AuthContext
 * @returns El objeto AuthContext.
 */
export const useAuth = () => {
  return React.useContext<AuthContextProps>(AuthContext);
};




