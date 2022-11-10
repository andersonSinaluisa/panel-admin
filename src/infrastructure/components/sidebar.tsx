import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Globlas from 'application/common'
import { auth_interfaces } from "infrastructure/api/auth";
import routes from "presentation/components/routes";


interface SidebarProps {
    dataLogin: auth_interfaces.LoginResponse;
}


const Sidebar = (props: SidebarProps) => {

    const [data, setData] = useState<auth_interfaces.LoginResponse>({
        message: {
            idUser: "",
            token: "",
        },
        status: 0
    })


    useEffect(() => {
        setData(props.dataLogin);
    }, [props.dataLogin])



    const hideMenu = () => {
        document.body.classList.remove('menu-open', 'menu-expanded')
        document.body.classList.add('menu-hide')
        document.body.style.overflow = "auto"

    }

    return (
        <div className="main-menu menu-fixed menu-dark menu-accordion menu-shadow" data-scroll-to-active="true">
            <div className="navbar-header">
                <ul className="nav navbar-nav flex-row">
                    <li className="nav-item mr-auto"><a className="navbar-brand" href="/">
                        <div className="brand-logo"><img className="logo" src={window.location.origin + "/assets/app-assets/images/logo/logo.png"}
                            style={{
                                WebkitFilter: "drop-shadow(1px 1px 0 white) drop-shadow(-1px -1px 0 white)",
                                filter: "drop-shadow(1px 1px 0 white) drop-shadow(-1px -1px 0 white)",
                                width: "150px",
                                height: "50px"
                                
                            }} /></div>
                    </a></li>
                    <li className="nav-item nav-toggle">
                        <a className="nav-link modern-nav-toggle pr-0" data-toggle="collapse" onClick={() => hideMenu()}>
                            <i className="bx bx-x d-block d-xl-none font-medium-4 primary"></i>
                            <i className="toggle-icon bx font-medium-4 d-none d-xl-block primary" data-ticon="bx-disc"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="shadow-bottom"></div>
            <div className="main-menu-content mt-5">
                <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation" data-icon-style="">

                    {
                        routes.map(e => {
                            return e.visible_in_menu ? <li className={window.location.pathname === e.path ? "nav-item active" : "nav-item"}>

                                <Link to={e.path}>
                                    <i className={e.icon}></i>
                                    <span className="menu-title" data-i18n="">{e.name}</span></Link>
                            </li> : null
                        })
                    }

                </ul>
            </div>
        </div>
    )
}


export default Sidebar;