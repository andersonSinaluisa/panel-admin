import { createModel } from "@rematch/core";
import { HeaderProps, initialMetaResponse, ResponseServer } from "infrastructure/api/api-handler";
import { installations_interface, installations_request } from "infrastructure/api/installation";
import { GetInstallationsResponse, Installation } from "infrastructure/api/installation/interface";
import { RootModel } from "..";


interface GetInstallationsStateProps extends ResponseServer {
    data: installations_interface.GetInstallationsResponse;
}
export interface CreateInstallationStateProps extends ResponseServer {
    data: {
        status: number;
        message: string;
    }
}

export interface UpdateStateInstallationStateProps extends ResponseServer {
    data: {
        status: number;
        message: string;
    }
}
export interface DeleteInstallationStateProps extends ResponseServer {
    data: {
        status: number;
        message: string;
    }
}

export interface GetInstallationStateProps extends ResponseServer {
    data: GetInstallationsResponse;
}


export const initialInstallation:Installation = {

    id:0,
    createdAt: "",
    updatedAt: "",
    deletedAt: null,
    name: "",
    postalCode: "",
    province: "",
    location: "",
    direction: "",
    description: "",
    state: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: null,
        type: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            name: "",
            code: ""
        },
        name: "",
        code: ""
    },
   
    availability: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: null,
        type: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            name: "",
            code: ""
        },
        name: "",
        code:""
    },
    country: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: null,
        type: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            name: "",
            code: ""
        },
        name: ""
    },
    
    client: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: null,
        nickName: "",
        firstName: "",
        secondName: "",
        firstSurname: "",
        secondSurname: "",
        role: {
            id: 0,
            createdAt: "",
            updatedAt: "",
            deletedAt: null,
            type: {
                id: 0,
                createdAt: "",
                updatedAt: "",
                deletedAt: null,
                name: "",
                code: ""
            },
            name: "",
        }
    },
    peripherals: [],
    clients: [],
    devices: []

            
    

}

export const INSTALLATIONS = createModel<RootModel>()({
    state: {
        GetInstallations: {
            data: {
                data: [],
                ...initialMetaResponse
            },
            status: 0,
            error: ""
        } as GetInstallationsStateProps,
        CreateInstallation: {
            data: {
                status: 0,
                message: ""
            },
            status: 0,
            error: ""
        } as CreateInstallationStateProps,
        UpdateStateInstallation: {
            data: {
                status: 0,
                message: ""
            },
            status: 0,
            error: ""
        } as UpdateStateInstallationStateProps,
        DeleteInstallation: {
            data: {
                status: 0,
                message: ""
            },
            status: 0,
            error: ""
        } as DeleteInstallationStateProps,
        GetInstallation: {
            data: {},
            status: 0,
            error: ""

        } as GetInstallationStateProps


    },
    reducers: {
        //reducer for GetInstallations
        onGetInstallations(state: any, payload: any) {
            return {
                ...state,
                GetInstallations: payload
            }
        },
        //reducer for CreateInstallation
        onCreateInstallation(state: any, payload: any) {
            return {
                ...state,
                CreateInstallation: payload
            }
        },
        //reducer for UpdateStateInstallation
        onUpdateStateInstallation(state: any, payload: any) {
            return {
                ...state,
                UpdateStateInstallation: payload
            }
        },
        //reducer for DeleteInstallation
        onDeleteInstallation(state: any, payload: any) {
            return {
                ...state,
                DeleteInstallation: payload
            }
        },
        onGetInstallation(state: any, payload: any) {
            return {
                ...state,
                GetInstallation: payload
            }
        }

    },
    effects: (dispatch: any) => ({

        //effect for GetInstallations
        async GetInstallationsAsync(payload: HeaderProps) {

            try {
                const response = await installations_request.GetInstallations(payload).toPromise();
                dispatch.INSTALLATIONS.onGetInstallations({
                    data: response.data,
                    status: response.status,
                    error: ""
                });
            } catch (e: any) {
                dispatch.INSTALLATIONS.onGetInstallations({
                    data: {
                        code: "",
                        message: [],
                        status: 0,
                    },
                    status: e.response.status ?? 400,
                    error: e.response.data.message ?? "Ocurrio un error"
                });
            }
        },
        //effect for CreateInstallation
        async CreateInstallationAsync(payload: { headers: HeaderProps, body: installations_interface.CreateInstallationRequest }) {
            try {
                const response = await installations_request.CreateInstallation(payload).toPromise();
                dispatch.INSTALLATIONS.onCreateInstallation({
                    data: response.data,
                    status: response.status,
                    error: ""
                });
            } catch (e: any) {
                dispatch.INSTALLATIONS.onCreateInstallation({
                    data: {
                        status: e.response.status ?? 400,
                        message: e.response.data.message ?? "Ocurrio un error"
                    },
                    status: e.response.status ?? 400,
                    error: e.response.data.message ?? "Ocurrio un error"
                });
            }
        },
        //effect for UpdateStateInstallation
        async UpdateStateInstallationAsync(payload: { headers: HeaderProps, id: string, body: installations_interface.UpdateStateInstallationsRequest }) {
            try {
                const response = await installations_request.UpdateStateInstallation(payload).toPromise();
                dispatch.INSTALLATIONS.onUpdateStateInstallation({
                    data: response.data,
                    status: response.status,
                    error: ""
                });
            } catch (e: any) {
                dispatch.INSTALLATIONS.onUpdateStateInstallation({
                    data: {
                        status: e.response.status ?? 400,
                        message: e.response.data.message ?? "Ocurrio un error"
                    },
                    status: e.response.status ?? 400,
                    error: e.response.data.message ?? "Ocurrio un error"
                });
            }
        },
        //effect for DeleteInstallation
        async DeleteInstallationAsync(payload: { headers: HeaderProps, id: string }) {
            try {
                const response = await installations_request.DeleteInstallation(payload).toPromise();
                dispatch.INSTALLATIONS.onDeleteInstallation({
                    data: response.data,
                    status: response.status,
                    error: ""
                });
            } catch (e: any) {
                dispatch.INSTALLATIONS.onDeleteInstallation({
                    data: {
                        status: e.response.status ?? 400,
                        message: e.response.data.message ?? "Ocurrio un error"
                    },
                    status: e.response.status ?? 400,
                    error: e.response.data.message ?? "Ocurrio un error"
                });
            }
        },
        async GetInstallationAsync(payload: { headers: HeaderProps, id: string }) {
            try {
                const response = await installations_request.GetInstallation(payload).toPromise();
                dispatch.INSTALLATIONS.onGetInstallation({
                    data: response.data,
                    status: response.status,
                    error: ""
                });
            } catch (e: any) {
                dispatch.INSTALLATIONS.onGetInstallation({
                    data: {
                        status: e.response.status ?? 400,
                        message: {
                            _id: "",
                            country: "",
                            createdAt: "",
                            devices: "",
                            identityCounter: "",
                            location: "",
                            name: "",
                            note: "",
                            owner: "",
                            postalCode: "",
                            province: "",
                            state: 0,
                            users: []
                        }
                    },
                    error: e.response.data.message ?? "Ocurrio un error",
                    status: e.response.data.status ?? 600
                });
            }
        },

        //clear state
        ClearState() {

            dispatch.INSTALLATIONS.onCreateInstallation({
                data: {
                    status: 0,
                    message: ""
                },
                status: 0,
                error: ""
            });
            dispatch.INSTALLATIONS.onUpdateStateInstallation({
                data: {
                    status: 0,
                    message: ""
                },
                status: 0,
                error: ""
            });
            dispatch.INSTALLATIONS.onDeleteInstallation({
                data: {
                    status: 0,
                    message: ""
                },
                status: 0,
                error: ""
            });
        }

    })
})