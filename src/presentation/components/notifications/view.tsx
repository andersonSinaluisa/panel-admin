import { NOTIFICATION_STATUS_VIEWED } from "application/common";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { GetNotificationState } from "application/models/notifications";
import { initialMetaResponse } from "infrastructure/api/api-handler";
import { GetNotifications, Notification } from "infrastructure/api/notifications/interface";
import { NotificationsViewProps } from "presentation/container/notifications/view-container";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const NotificationsView = (props: NotificationsViewProps) => {

    useTitle(props.title)
    useBreadcrumbs(props.breadcrumbs)

    let navigate = useNavigate()
    const [notifications, setNotifications] = useState<GetNotificationState>({
        data: {
            data: [],
            ...initialMetaResponse,
        },
        error: "",
        status: 0
    })
    const [message, setMessage] = useState("")

    const [load, setLoad] = useState(false)

    useEffect(() => {
        props.GetNotificationAsync({
            token: props.token,
        })
    }, [])

    useEffect(() => {
        console.log(props.isLoading)
        setLoad(props.isLoading)
    }, [props.isLoading])

    useEffect(() => {
        if (props.notifications.error != "") {
            setMessage(props.notifications.error)
        }
        setNotifications(props.notifications)
    }, [props.notifications])


    const getDate = (date: string) => {
        const date1 = new Date(date)

        return date1.toLocaleDateString()
    }


    const changePage = (link: any) => {
        if (link.url != null) {

            let page: any = link.url.split("page=")[1];
            page = parseInt(page);
            props.GetNotificationAsync({
                token: props.token,
                page: page,
            })
        }
    }

    return (
        <div className="row" id="table-borderless">
            <div className="card-body">
                <p>
                    {/*crea un texto para mostrar el numero de notificaciones*/}
                    <span className="badge badge-pill badge-light-success mr-1">{notifications.data.meta.total}</span>
                    <span className="text-bold-600">Notificaciones</span>
                </p>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item current">
                        <a className="nav-link active" id="all-tab" data-toggle="tab" href="#all" aria-controls="all" role="tab" aria-selected="true">
                            <i className="bx bx-grid-small align-middle"></i>
                            <span className="align-middle">Todas</span>
                        </a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link " id="recive-tab" data-toggle="tab" href="#recive" aria-controls="recive" role="tab" aria-selected="true">
                            <i className="bx bx-check align-middle"></i>
                            <span className="align-middle">Recibidas</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="seen-tab" data-toggle="tab" href="#seen" aria-controls="seen" role="tab" aria-selected="false">
                            <i className="bx bx-show-alt align-middle"></i>
                            <span className="align-middle">Vistas</span>
                        </a>
                    </li>

                </ul>
                <div className="tab-content">
                    <div className="tab-pane active" id="all" aria-labelledby="all-tab" role="tabpanel">
                        <ul className="list-group list-group-flush"
                            style={{
                                height: "400px",
                                overflowY: "scroll",
                            }}
                        >

                            {
                                !load ? notifications.data.data.map((notification: Notification) => {
                                    return <li className="list-group-item">
                                        <div className="media">
                                            <div className="avatar bg-primary bg-lighten-5 mr-1 m-0 p-25">
                                                <span className="avatar-content text-primary font-medium-2">
                                                    <i className="bx bxs-briefcase-alt-2"></i>
                                                </span>
                                            </div>
                                            <div className="media-body">
                                                <h6 className="media-heading mb-0">{notification.type.name}</h6>
                                                <small className="text-muted">{notification.description}</small>
                                                <div className="font-small-2 row ">
                                                    <span className="mr-50">{getDate(notification.createdAt)}</span>
                                                    <span className="bullet">
                                                        {
                                                            notification.state.code == NOTIFICATION_STATUS_VIEWED ?
                                                                <i className="bx  bx-show-alt"></i> : <i className="bx bx-check"></i>
                                                        }
                                                    </span>
                                                    <a className="nav-link btn-sm ml-1" onClick={() => {
                                                        navigate(`/inicio/notificaciones/${notification.id}`, {
                                                            state: {
                                                                data: notification
                                                            }
                                                        })

                                                    }}>
                                                            <i className="bx bx-right-arrow-alt"></i>
                                                    </a>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </li>
                                }) : null
                            }
                            {
                                message != "" && <li className="list-group-item">
                                    <div className="media">
                                        <div className="media-body">
                                            <h6 className="media-heading mb-0">{message}{load}</h6>
                                            <br />
                                            <br />
                                            <button type="button" className="btn btn-outline-primary btn-sm ml-1" onClick={() => {
                                                setMessage("")
                                                props.GetNotificationAsync({
                                                    token: props.token,
                                                })
                                            }}>
                                                <i className="bx bx-sync"></i>
                                            </button>
                                        </div>
                                    </div>

                                </li>
                            }
                            {
                                load ? <li className="list-group-item">
                                    <div className="media">
                                        <div className="media-body">
                                            <h6 className="media-heading mb-0">Cargando...</h6>
                                        </div>
                                    </div>
                                </li> : null
                            }
                            <ul className="pagination justify-content-center mt-2">



                                {
                                    notifications.data.meta.links.map(link => {
                                        return <li className={"page-item" + (link.active ? " active" : "")}
                                            onClick={() => {
                                                changePage(link)
                                            }}
                                        >
                                            <a className="page-link" href="#">
                                                {link.label.includes("Anterior") ?
                                                    (<i className="bx bx-chevron-left"></i>) :
                                                    link.label.includes("Próximo") ?
                                                        (<i className="bx bx-chevron-right"></i>) : link.label
                                                }
                                            </a></li>
                                    })
                                }
                            </ul>
                        </ul>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default NotificationsView;