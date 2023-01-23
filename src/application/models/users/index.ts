import { createModel } from "@rematch/core";
import { ResponseServer } from "infrastructure/api/api-handler";
import { user_interface, user_request } from "infrastructure/api/users";
import { RootModel } from "..";
import * as APIHANDLER from 'infrastructure/api/api-handler';
import { CreateUserRequest } from "infrastructure/api/users/interface";



export interface GetUserStateProps extends ResponseServer {
    data: user_interface.GetUsers;
}

export interface CreateUserStateProps extends ResponseServer {
    data: {
        status: number;
        message: string;
    }
}

export interface DeleteUserStateProps extends ResponseServer {
    data: {
        status: number;
        message: string;
    }
}




export interface GetUserProps {
    data: user_interface.User | null;
}



export const initUser: user_interface.User = {

    id: 0,
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
    passwordChanged: false,
    emailVerifiedAt: "",
    secondaryEmailVerifiedAt: "",
    backupEmailVerifiedAt: "",
    whatsappVerifiedAt: "",
    nickName: "",
    firstName: "",
    secondName: "",
    firstSurname: "",
    secondSurname: "",
    email: "",
    secondaryEmail: "",

    backupEmail: "",
    documentValue: "",
    province: "",
    location: "",
    direction: "",
    postalCode: "",
    landlinePhone: "",
    mobilePhone: "",
    firstContact: "",
    secondContact: "",
    contactSchedule: "",
    discount: "",
    tracing: "",
    description: "",
    state: {

        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        name: ""
    },
    availability: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        name: ""
    },
    role: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        name: ""
    },
    personType: {

        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        name: ""
    },
    documentType: {

        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        name: ""
    },
    streetType: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        name: ""
    },
    createdBy: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        name: ""
    },
    country: {
        id: 0,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        name: ""
    },
    secondaryEmailRelationship: null,
    backupEmailRelationship: null

}

export const USERS = createModel<RootModel>()({
    state: {
        GetUsers: {
            status: 0,
            data: {
                data: [],
                ...APIHANDLER.initialMetaResponse
            },
            error: ""
        } as GetUserStateProps,
        CreateUser: {
            data: {
                message: "",
                status: 0
            },
            error: "",
            status: 0
        } as CreateUserStateProps,
        DeleteUser: {
            data: {
                message: "",
                status: 0
            },
            error: "",
            status: 0
        } as DeleteUserStateProps,
        GetUser: {
            data: null,
            error: "",
            status: 0

        } as GetUserProps
    },
    effects: (dispatch: any) => ({
        async onGetUsersAync(props: APIHANDLER.HeaderProps) {
            try {

                const res = await user_request.GetUsers(props).toPromise();
                dispatch.USERS.onGetUsers({
                    data: res.data,
                    status: res.status,
                    error: ""
                })
            } catch (e: any) {
                dispatch.USERS.onGetUsers({
                    data: {
                        message: [],
                        status: 0
                    },
                    status: e.response.status ?? 400,
                    error: e.response.data.message ?? "Ocurrio un error"
                })
            }
        },
        async onCreateUsersAsync(props: { headers: APIHANDLER.HeaderProps, body: CreateUserRequest }) {
            try {

                const res = await user_request.CreateUser(props).toPromise()
                dispatch.USERS.onCreateUser({
                    data: res.data,
                    status: res.status,
                    error: ""
                })
            } catch (e: any) {
                dispatch.USERS.onCreateUser({
                    data: {
                        message: "",
                        status: 0
                    },
                    status: e.response.status ?? 400,
                    error: e.response.data.message ?? "Ocurrio un error"
                })
            }
        },
        async onDeleteUserAsync(props: { headers: APIHANDLER.HeaderProps, id: string }) {
            try {
                const res = await user_request.DeleteUser(props).toPromise();
                dispatch.USERS.onDelete({
                    data: res.data,
                    status: res.status,
                    error: ""
                })

            } catch (e: any) {
                dispatch.USERS.onDelete({
                    data: {
                        message: "",
                        status: 0
                    },
                    status: e.response.status ?? 400,
                    error: e.response.data.message ?? "Ocurrio un error"
                })
            }
        },
        onClear() {
            dispatch.USERS.onDelete({
                data: {
                    message: "",
                    status: 0
                },
                error: "",
                status: 0
            })
            dispatch.USERS.onCreateUser({
                data: {
                    message: "",
                    status: 0
                },
                error: "",
                status: 0
            })
        },
        async onGetUserAsync(props: { headers: APIHANDLER.HeaderProps, id: string }) {
            try {
                const res = await user_request.GetUser(props).toPromise();
                dispatch.USERS.onGetUser({
                    data: res.data,
                    status: res.status,
                    error: ""
                })
            } catch (e: any) {
                dispatch.USERS.onGetUser({
                    data: {
                        message: {
                            _id: "",
                            identityCounter: "",
                            email: "",
                            role: "",
                            personalData: "",
                            createdAt: ""
                        },
                        status: 0
                    },
                    status: e.response.status ?? 400,
                    error: e.response.data.message ?? "Ocurrio un error"
                })
            }
        }
    }),
    reducers: {
        onGetUsers(state: any, payload: any) {
            return { ...state, GetUsers: payload }
        },
        onCreateUser(state: any, payload: any) {
            return { ...state, CreateUser: payload }
        },
        onDelete(state: any, payload: any) {
            return { ...state, DeleteUser: payload }
        },
        onGetUser(state: any, payload: any) {
            return { ...state, GetUser: payload }
        }
    }
})