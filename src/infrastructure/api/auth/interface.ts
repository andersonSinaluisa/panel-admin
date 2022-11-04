

interface LoginRequest{
    email:string;
    password:string;
}


interface LoginResponse{
    status: number,
    message: {
      idUser: number
      token: string;
    }
}


export type{
    LoginRequest,
    LoginResponse
}