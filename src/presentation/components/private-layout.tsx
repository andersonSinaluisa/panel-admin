import { getStatusInstallation } from 'application/common';
import { notification } from 'application/models/notifications';
import { search_interface } from 'infrastructure/api/search';
import { user_interface } from 'infrastructure/api/users';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../../application/common/hooks/use-auth";
import Navbar from '../../infrastructure/components/navbar';
import Sidebar from '../../infrastructure/components/sidebar';
import { PrivateLayoutProps } from '../container/private-layout-container';


/**
 * Si el usuario no ha iniciado sesión, rediríjalo a la página de inicio de sesión. De lo contrario,
 * represente la barra de navegación, la barra lateral y el contenido.
 */

const PrivateLayout = (props:PrivateLayoutProps): JSX.Element => {
    const { token ,dataLogin, onLogout} = useAuth();

    const [showOverlay, setShowOverlay] = useState(false);
    const [onpenSearch, setOnpenSearch] = useState(false);
    const [userData,setUserData] = useState<user_interface.User>({
        _id:"",
        createdAt:"",
        email:"",
        identityCounter:"",
        personalData:"",
        role:""
    })


    useEffect(() => {
        document.body.className = "";
        document.body.className = "vertical-layout vertical-menu-modern boxicon-layout no-card-shadow 2-columns navbar-sticky footer-static  ";
        document.body.setAttribute("data-open", "click")
        document.body.setAttribute("data-menu", "vertical-menu-modern")
        document.body.setAttribute("data-col", "2-columns")
    }, [])

    const [title, setTitle] = useState("");
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [search, setSearch] = useState<search_interface.SearchResponse>({
        message: null,
        status:0
    });


 
    useEffect(()=>{
        if(title){
            document.title=title;
        }
        
    },[title])


    useEffect(()=>{
        setSearch(props.search);
    },[props.search])


    useEffect(()=>{
        props.onGetUserAsync({
            headers:{
                token:token as string
            },
            id:dataLogin.message.idUser
        })
    },[token])
    useEffect(()=>{
        setUserData(props.UserData.data.message)
    },[props.UserData])


    useEffect(()=>{
        props.connectToWebSocket().on("connect",()=>{    
            
            props.connectToWebSocket().onAny((event, ...args) => {
                console.log(event, args);
                //event start with installation-
                if(event.startsWith("installation-")){
                   let id = event.split("-")[1];
                   let state = args[0];
                   //parseInt
                     let status = parseInt(state);
                    props.addNotification(
                        {
                            title: 'Instalación',
                            description: `La instalación ${id} ha cambiado de estado a ${getStatusInstallation(status).label}`,
                            type: 'info',
                            duration: 5000,
                            onSee:()=>{
                               
                            },
                            see:false,
                            datetime: new Date()
                        }
                    )

                }
            });
        })
      
        return ()=> { props.connectToWebSocket().close()}
    
    },[])


    if (!token) {
        return <Navigate to="/" replace />;
    }


    const handleSearch = (value:string,type:string)=>{
        props.onSearchAsync({
            headers:{
                token:token
            },
            identityCounter:value,
            type:type
        })
    }

    //connecto to websocket
    

    return (
        <>
            <div className="header-navbar-shadow"></div>

            <Navbar dataLogin={dataLogin} onLogout={props.clearSession}
                dataSearch={search} onSearch={handleSearch} onOpenSearch={setOnpenSearch} openSearch={onpenSearch}
                    userData={userData}
                    notifications={props.notifications}
                />
        
            <Sidebar dataLogin={dataLogin}/>
            <div className={`app-content content ${onpenSearch?'show-overlay':''}`} >
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

        </>
    )
};
export default PrivateLayout;