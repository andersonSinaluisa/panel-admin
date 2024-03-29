import { getStatusInstallation } from 'application/common';
import { useSocket } from 'application/common/hooks/use-socket';
import { initLogin } from 'application/models/auth';
import { notification } from 'application/models/notifications';
import { auth_interfaces } from 'infrastructure/api/auth';
import { installations_interface } from 'infrastructure/api/installation';
import { Installation } from 'infrastructure/api/installation/interface';
import { search_interface } from 'infrastructure/api/search';
import { user_interface } from 'infrastructure/api/users';
import Footer from 'infrastructure/components/footer';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from "../../application/common/hooks/use-auth";
import Navbar from '../../infrastructure/components/navbar';
import Sidebar from '../../infrastructure/components/sidebar';
import { PrivateLayoutProps } from '../container/private-layout-container';


/**
 * Si el usuario no ha iniciado sesión, rediríjalo a la página de inicio de sesión. De lo contrario,
 * represente la barra de navegación, la barra lateral y el contenido.
 */

const PrivateLayout = (props: PrivateLayoutProps): JSX.Element => {
    const { token, dataLogin, onLogout } = useAuth();

    let navigate = useNavigate();
    const [onpenSearch, setOnpenSearch] = useState(false);


    useEffect(() => {
        document.body.className = "";
        document.body.className = "vertical-layout vertical-menu-modern boxicon-layout no-card-shadow 2-columns navbar-sticky footer-static  ";
        document.body.setAttribute("data-open", "click")
        document.body.setAttribute("data-menu", "vertical-menu-modern")
        document.body.setAttribute("data-col", "2-columns")
    }, [])

    const [title, setTitle] = useState("");
    const [breadcrumbs, setBreadcrumbs] = useState([]);



    useEffect(() => {
        if (title) {
            document.title = title;
        }

    }, [title])


    let audio = new Audio(window.location.origin + '/assets/audio/audio.mp3');


    useSocket({
        type: "INCIDENT",
        callBack: (payload:{
            installation: Installation
        }) => {
            audio.play();
            console.log(payload)
            props.addNotification({
                data: payload.installation,
                datetime: new Date(),
                type: "error",
                description: "Se ha generado un incidente en la instalación del Cliente " + payload.installation.client?.firstName+" "+payload.installation.client?.firstSurname,
                duration: 5000,
                onSee: () => {
                    navigate("/instalaciones/" + payload.installation.id)
                },
                see:false,
                title: "Incidente"
            })
        }
    });


    useEffect(() => {
        if (token) {
            props.getCataloguesAsync({
                token: token as string
            })
        }

    }, [token])


    if (!token) {
        return <Navigate to="/" replace />;
    }


    const handleSearch = (value: string, type: string) => {
        props.onSearchAsync({
            headers: {
                token: token
            },
            identityCounter: value,
            type: type
        })
    }

    //connecto to websocket


    return (
        <>
            <div className="header-navbar-shadow"></div>

            <Navbar dataLogin={dataLogin} onLogout={onLogout} onSearch={handleSearch} onOpenSearch={setOnpenSearch} openSearch={onpenSearch}
                notifications={props.notifications}
            />

            <Sidebar dataLogin={dataLogin} />
            <div className={`app-content content ${onpenSearch ? 'show-overlay' : ''}`} >
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                        <div className="content-header-left col-12 mb-2 mt-1">
                            <div className="row breadcrumbs-top">
                                <div className="col-12">
                                    <h5 className="content-header-title float-left pr-1 mb-0">{title}</h5>
                                    <div className="breadcrumb-wrapper col-12">
                                        <ol className="breadcrumb p-0 mb-0">

                                            {
                                                breadcrumbs.map(e => {
                                                    return <li className="breadcrumb-item"><a href="#">{e}</a>
                                                    </li>
                                                })
                                            }


                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-body">


                        <Outlet context={{ title, setTitle, breadcrumbs, setBreadcrumbs }} />


                    </div>
                </div>
            </div>

            <Footer />

        </>
    )
};
export default PrivateLayout;