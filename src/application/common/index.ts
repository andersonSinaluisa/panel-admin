export const URLAPI = "http://80.240.126.227:3000"
export const WEBSOCKET = "ws://80.240.126.227:8080"
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


export const GET_PERSONAL = "/personal"
export const CREATE_PERSONAL = "/personal"
export const GET_BY_ID_PERSONAL = "/personal/"
export const DELETE_PERSONAL = "/personal/delete/"


export const GET_JOBS = "/jobs/";
export const CREATE_JOBS = "/jobs/";
export const CLOSE_JOBS = "/jobs/close/";
export const DELETE_JOBS = "/jobs/delete/";

export const GET_TASKS = "/tasks";
export const CREATE_TASKS = "/tasks/";
export const CLOSE_TASKS = "/tasks/close/";
export const DELETE_TASKS = "/tasks/delete/";





export const GET_PRODUCTS = "/products/";
export const CREATE_CATALOGED_PRODUCTS = "/products/cataloged";
export const CREATE_UNCATALOGED_PRODUCTS = "/products/uncataloged";
export const UPDATE_PRODUCTS = "/products/update/";
export const UPDATE_STOCK_PRODUCT = "/products/update-stock/";
export const CATALOGE_PRODUCT = "/products/catalog/";
export const DELETE_PRODUCT = "/products/delete/";


export const SEARCH = "/searcher/";

export const GET_BILLING = "/billing";
export const CREATE_BILLING = "/billing";
export const DELETE_BILLING = "/factura/delete/";



// Error Messages
export const errorEncountered = 'Error was encountered processing this request';
export const timeoutMessage = "We are unable to fetch data at this time, kindly check your internet connection and we'll reconnect you.";
export const timeoutDuration = 30000;

export const SUCCESS_HTTP_CODE_CREATED = 201

export const APP_NAME = "Panel"



export const getStatusInstallation = (id: number) => {
    switch (id) {
        case 1:
            return { color: 'primary', label: "ACTIVO" };
        case 2:
            return { color: 'primary', label: "ACTIVO" };
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
    { color: 'primary', label: "ACTIVO",id:1 },
    { color: 'primary', label: "ACTIVO",id:2 },
    { color: 'warning', label: "Dormir",id:3 },
    { color: 'secondary', label: "Bloqueado",id:4 },

    { color: 'danger', label: "Apagado",id:5 },
    { color: 'success', label: "Autocierre",id:6 },

    { color: 'secondary', label: "Antipánico",id:7 },

    { color: 'warning', label: "Antibaby",id:8 }
]


export const TASK_OPEN = "abierto";
export const TASK_CLOSE = "cerrado";