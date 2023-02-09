import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { Notification } from "infrastructure/api/notifications/interface";
import { NotificationsViewProps } from "presentation/container/notifications/view-container";
import React, { useEffect, useState } from "react";


const NotificationsView = (props: NotificationsViewProps) => {

    useTitle(props.title)
    useBreadcrumbs(props.breadcrumbs)

    const [notifications, setNotifications] = useState<Notification[]>([])
    const [message, setMessage] = useState("")

    const [load, setLoad] = useState(false)

    useEffect(() => {
        props.GetNotificationAsync({
            token: props.token,
        })
    }, [])

    useEffect(() => {
        setLoad(props.isLoading)
    }, [props.isLoading])

    useEffect(() => {
        if (props.notifications.error != "") {
            setMessage(props.notifications.error)
        }
        setNotifications(props.notifications.data.data)
    }, [props.notifications])


    const getDate = (date: string) => {
        const date1 = new Date(date)

        return date1.toLocaleDateString()
    }

    return (
        <div className="row" id="table-borderless">
            <div className="card-body">
                <p>
                    {/*crea un texto para mostrar el numero de notificaciones*/}
                    <span className="badge badge-pill badge-light-success mr-1">{notifications.length}</span>
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
                                notifications.map((notification: Notification) => {
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
                                                <div className="font-small-2">
                                                    <span className="mr-50">{getDate(notification.createdAt)}</span>
                                                    <span className="bullet bullet-primary align-middle"></span>
                                                    <span className="text-primary align-middle">{notification.state.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                })
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
                        </ul>
                    </div>
                    <div className="tab-pane" id="recive" aria-labelledby="recive-tab" role="tabpanel">
                        <ul className="list-group list-group-flush">
                            {
                                notifications.map((notification: Notification) => {
                                    return <li className="list-group-item">
                                        <div className="media">
                                            <div className="avatar mr-75">
                                                <img src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/avatar-s-11.2a8b4b9f.jpg" alt="avtar images" width="32" height="32" />
                                            </div>
                                            <div className="media-body">
                                                <h6 className="media-heading mb-0">{notification.type.name}</h6>
                                                <small className="text-muted">{notification.description}</small>
                                                <div className="font-small-2">
                                                    <span className="mr-50">{notification.createdAt}</span>
                                                    <span className="bullet bullet-primary align-middle"></span>
                                                    <span className="text-primary align-middle">{notification.state.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="tab-pane" id="seen" aria-labelledby="seen-tab" role="tabpanel">
                        <ul className="list-group list-group-flush">
                            {
                                notifications.map((notification: Notification) => {
                                    return <li className="list-group-item">
                                        <div className="media">
                                            <div className="avatar mr-75">
                                                <img src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/avatar-s-11.2a8b4b9f.jpg" alt="avtar images" width="32" height="32" />
                                            </div>
                                            <div className="media-body">
                                                <h6 className="media-heading mb-0">{notification.type.name}</h6>
                                                <small className="text-muted">{notification.description}</small>
                                                <div className="font-small-2">
                                                    <span className="mr-50">{notification.createdAt}</span>
                                                    <span className="bullet bullet-primary align-middle"></span>
                                                    <span className="text-primary align-middle">{notification.state.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default NotificationsView;