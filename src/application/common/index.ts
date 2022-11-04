export const URLAPI = "http://80.240.126.227:3000"
export const LOGIN = "/users/login"
export const GET_USERS = "/users"
export const CREATE_USER = "/users/register"
export const DELETE_USER = "/users/delete/"




export const GET_CLIENTS = "/client"
export const CREATE_CLIENT = "/client"
export const UPDATE_CLIENT = "/client/update/"
export const DELETE_CLIENT = "/client/delete/"

export const GET_INSTALLATIONS = "/installations/"
export const CREATE_INSTALLATION = "/installations/"
export const DELETE_INSTALLATION = "/installations/delete/"
export const UPDATE_STATE_INSTALLATION = "/installations/state/"

// Error Messages
export const errorEncountered = 'Error was encountered processing this request';
export const timeoutMessage = "We are unable to fetch data at this time, kindly check your internet connection and we'll reconnect you.";
export const timeoutDuration = 30000;

export const SUCCESS_HTTP_CODE_CREATED = 201

export const APP_NAME = "Panel"



export const getStatusInstallation = (id: number) => {
    switch (id) {
        case 1:
            return { color: 'primary', label: "Armado" };
        case 2:
            return { color: 'info', label: "Desarmado" };
        case 3:
            return { color: 'warning', label: "Dormir" };
        case 4:
            return { color: 'secondary', label: "Bloqueado" };
        case 5:
            return { color: 'danger', label: "Apagado" };
        case 6:
            return { color: 'success', label: "Autocierre" };
        case 7:
            return { color: 'secondary', label: "Antipánico" };
        case 8:
            return { color: 'warning', label: "Antibaby" };
        default:
            return { color: 'primary', label: "Armado" };
    }
}


export const status = [
    { color: 'primary', label: "Armado",id:1 },
    { color: 'info', label: "Desarmado",id:2 },
    { color: 'warning', label: "Dormir",id:3 },
    { color: 'secondary', label: "Bloqueado",id:4 },

    { color: 'danger', label: "Apagado",id:5 },
    { color: 'success', label: "Autocierre",id:6 },

    { color: 'secondary', label: "Antipánico",id:7 },

    { color: 'warning', label: "Antibaby",id:8 }
]
