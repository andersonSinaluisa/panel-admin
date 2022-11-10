

interface LoginRequest{
    email:string;
    password:string;
}


interface LoginResponse{
    status: number,
    message: {
      idUser: string
      token: string;
    }
}


export type{
    LoginRequest,
    LoginResponse
}