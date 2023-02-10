import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import { initNotification } from "application/models/notifications";
import { Notification } from "infrastructure/api/notifications/interface";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'

const NotificationDetail = ({ title, breadcrumbs }: any) => {

    useTitle(title)
    useBreadcrumbs(breadcrumbs)

    const location = useLocation()

    const { data } = location.state as { data: Notification }

    const [notification, setNotification] = useState<Notification>(initNotification)
    useEffect(() => {
        setNotification(data)
    }, [data])
    return (
        <div className="card collapse-header open" role="tablist">
            <div id="headingCollapse7" className="card-header d-flex justify-content-between align-items-center" data-toggle="collapse" role="tab" data-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                <div className="collapse-title media">
                    <div className="pr-1">
                        <div className="avatar bg-primary bg-lighten-5 mr-1 m-0 p-25">
                            <span className="avatar-content text-primary font-medium-2">
                                <i className="bx bxs-briefcase-alt-2"></i>
                            </span>
                        </div>
                    </div>
                    <div className="media-body mt-25">
                        <span className="text-primary">{notification.type.name}</span>
                        <small className="text-muted d-block">{notification.state.name}</small>
                    </div>
                </div>
                <div className="information d-sm-flex d-none align-items-center">
                    <small className="text-muted mr-50">{new Date(notification.createdAt).toDateString()}</small>

                </div>
            </div>
            <div id="collapse7" role="tabpanel" aria-labelledby="headingCollapse7" className="collapse show">
                <div className="card-content">
                    <div className="card-body py-1">
                        <p>
                            {notification.description}
                        </p>


                    </div>
                    <div className="card-footer row pt-0 border-top">
                        <div className="col-6">
                            <label className="sidebar-label">Instalación</label>
                            <br />
                            <label className="sidebar-label">{
                                notification.installation.location
                            }</label>
                            <ul className="list-unstyled mb-0">
                                <li className="cursor-pointer pb-25">
                                    <small className="text-muted ml-1 attchement-text">
                                        {notification.installation.availability.name}
                                    </small>
                                </li>
                                <li className="cursor-pointer">
                                    <small className="text-muted ml-1 attchement-text">
                                        {notification.installation.description}
                                    </small>
                                </li>
                                <li className="cursor-pointer">
                                    <small className="text-muted ml-1 attchement-text">
                                        {notification.installation.postalCode}
                                    </small>
                                </li>
                                <li className="cursor-pointer">
                                    <small className="text-muted ml-1 attchement-text">
                                        {notification.installation.direction}
                                    </small>
                                </li>
                                <li className="cursor-pointer">
                                    <small className="text-muted ml-1 attchement-text">
                                        {notification.installation.location}
                                    </small>
                                </li>
                                <li className="cursor-pointer">
                                    <small className="text-muted ml-1 attchement-text">
                                        {notification.installation.province}
                                    </small>
                                </li>
                                <li className="cursor-pointer">
                                    <small className="text-muted ml-1 attchement-text">
                                        {notification.installation.country?.name}
                                    </small>
                                </li>
                                <li className="cursor-pointer">
                                    <small className="text-muted ml-1 attchement-text">
                                        <Link to={`/inicio/instalaciones/${notification.installation.id}`}>Ver más</Link>
                                    </small>
                                </li>


                            </ul>
                        </div>
                        <div className="col-6">
                            <label className="sidebar-label">Cliente</label>
                            <br />
                            <label className="sidebar-label">{
                                notification.client.firstName +" "+
                                notification.client.firstSurname
                            }
                            </label>
                            <ul className="list-unstyled mb-0">
                                <li className="cursor-pointer pb-25">
                                    <small className="text-muted ml-1 attchement-text">
                                        {notification.client.description}
                                    </small>
                                </li>
                                <li className="cursor-pointer">
                                    <small className="text-muted ml-1 attchement-text">
                                        {notification.client.mobilePhone}

                                    </small>
                                </li>
                                <li className="cursor-pointer">
                                    <small className="text-muted ml-1 attchement-text">
                                        {notification.client.email}
                                    </small>
                                </li>
                                <li className="cursor-pointer">
                                    <small className="text-muted ml-1 attchement-text">
                                        {notification.client.direction}
                                    </small>
                                </li>
                                <li className="cursor-pointer">
                                    <small className="text-muted ml-1 attchement-text">
                                        {notification.client.postalCode}
                                    </small>
                                </li>
                                <li className="cursor-pointer">
                                    <small className="text-muted ml-1 attchement-text">
                                        {notification.client.province}
                                    </small>
                                </li>
                                <li className="cursor-pointer">
                                    <small className="text-muted ml-1 attchement-text">
                                        {notification.client.country.name}
                                    </small>
                                </li>
                                <li className="cursor-pointer">
                                    <small className="text-muted ml-1 attchement-text">
                                        <Link to={`/inicio/clientes/${notification.client.id}`}>Ver más</Link>
                                    </small>
                                </li>

                            </ul>
                        </div>

                    </div>
                    <div className="card-footer row pt-0 border-top mt-5">
                        <div className="col-2">
                            <Link to="/inicio/notificaciones/" className="btn btn-outline-dark btn-block">Volver</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationDetail;