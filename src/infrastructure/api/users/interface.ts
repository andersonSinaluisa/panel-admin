
interface User{
    
        _id: string,
        identityCounter: string,
        email: string,
        role: string,
        personalData: string
        created_at: string
    
}

interface GetUsers{
    status: number,
    message: User[]
    
}


interface CreateUserRequest{
    email: string,
    password: string,
    role: "personal"|"cliente",
}


interface DeleteUserResponse{
    status:number;
    message:string;
}


export type {
    GetUsers,
    CreateUserRequest,
    DeleteUserResponse,
    User
}