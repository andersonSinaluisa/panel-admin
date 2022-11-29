import { isClient, isInstallation, isJob, isPersonal, isTask, isUser } from "application/common/utils/is";
import { notification } from "application/models/notifications";
import { search_interface } from "infrastructure/api/search";
import { tasks_interface } from "infrastructure/api/tasks";
import { user_interface } from "infrastructure/api/users";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URLAPI } from "../../application/common";
import { LoginResponse } from "../api/auth/interface";

interface NavbarProps {
  dataLogin: LoginResponse;
  onLogout: Function;
  onSearch: (value: string, type: string) => void;
  dataSearch: search_interface.SearchResponse;
  openSearch: boolean;
  onOpenSearch: (value: boolean) => void;
  userData: user_interface.User;
  notifications: notification[];
}

const Navbar = (props: NavbarProps) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState<search_interface.SearchResponse>({
    message: null,
    status: 0
  });
  const [showDrop, setShowDrop] = useState(false);

  const [showNotification, setShowNotification] = useState(false);

  const [not, setNot] = useState<notification[]>([]);


  const [seachParam, setSearchParam] = useState({
    identityCounter: "",
    type: "",
  });


  useEffect(() => {
    if (open) {
      openMenu();
    } else {
      hideMenu();
    }
  }, [open]);

  useEffect(() => {
    setSearch(props.dataSearch);
    setOpenSearch(props.openSearch);
  }, [props.dataSearch, props.openSearch])


  useEffect(() => {
    setNot(props.notifications)
  }, [props.notifications])


  const openMenu = () => {
    document.body.classList.remove("menu-hide", "menu-collapsed");
    document.body.classList.add("menu-open");
    document.body.classList.add("menu-expanded");

    if (document.body.classList.contains("vertical-overlay-menu")) {
      document.body.style.overflow = "hidden";
    }
  };

  const hideMenu = () => {
    document.body.classList.remove("menu-open", "menu-expanded");
    document.body.classList.add("menu-hide");

    document.body.style.overflow = "auto";
  };

  const handleChange = (e: any) => {



    props.onSearch(
      e.currentTarget.value,
      seachParam.type
    );
  }


  const handleChangeType = (e: any) => {
    setSearchParam({
      ...seachParam,
      type: e.currentTarget.value
    })
  }



  const validateSearch = (search: search_interface.SearchResponse) => {


    //obtener la interface de search.message
    const data = search.message as search_interface.SearchResponse["message"];

    if (data) {

      if (isClient(data)) {
        return data.name + " " + data.lastname + "/" + data.document;
      }

      if (isInstallation(data)) {
        return data.name + "/" + data.location;
      }

      if (isUser(data)) {
        return data.email;
      }
      if (isJob(data)) {
        return data.type + "/" + data.description;
      }

      if (isPersonal(data)) {
        return data.name + " " + data.document;
      }

      if (isTask(data)) {
        return data.description;
      }

      console.log(data);

    }





    return "no";
  }


  const handleSelectItem = (item:any) => {
    
    if (seachParam.type === "clients") {
      navigate(`/clientes/${item.id}`);
    }

    if (seachParam.type === "installations") {
      navigate(`/instalaciones/${item.id}`);
    }

    if (seachParam.type === "jobs") {
      navigate(`/trabajos/${item.id}`);
    }

    if (seachParam.type === "personals") {
      navigate(`/personal/${item.id}`);
    }

    if (seachParam.type === "tasks") {
      navigate(`/tareas/${item.id}`);
    }

    if (seachParam.type === "users") {
      navigate(`/usuarios/${item.id}`);
    }

    

    
  }


  return (
    <nav className="header-navbar main-header-navbar navbar-expand-lg navbar navbar-with-menu fixed-top ">
      <div className="navbar-wrapper">
        <div className="navbar-container content">
          <div className="navbar-collapse" id="navbar-mobile">
            <div className="mr-auto float-left bookmark-wrapper d-flex align-items-center">
              <ul className="nav navbar-nav">
                <li className="nav-item mobile-menu d-xl-none mr-auto">
                  <a
                    className="nav-link nav-menu-main menu-toggle hidden-xs"
                    href="#"
                    onClick={() => setOpen(!open)}
                  >
                    <i className="ficon bx bx-menu"></i>
                  </a>
                </li>
              </ul>

              <ul className="nav navbar-nav">
                <li className="nav-item d-none d-lg-block">

                  <div className="bookmark-input search-input">
                    <div className="bookmark-input-icon">
                      <i className="bx bx-search primary"></i>
                    </div>
                    <input
                      className="form-control input"
                      type="text"
                      placeholder="Explore Frest..."
                      tabIndex={0}
                      data-search="starter-list"
                    />
                    <ul className="search-list"></ul>
                  </div>
                </li>
              </ul>
            </div>

            <ul className="nav navbar-nav float-right">
              <li className="nav-item nav-search "><a className="nav-link nav-link-search"
                onClick={() => props.onOpenSearch(!openSearch)}>
                <i className="ficon bx bx-search"></i></a>
                <div className={openSearch ? "search-input  open" : "search-input"}>
                  <div className="row">
                    <div className="search-input-icon col-1 mr-5" ><i className="bx bx-search primary"></i></div>
                    <div className="col-1"></div>
                    <select className="form-control col-3  mt-1" onChange={handleChangeType}>
                      <option value="clients">Cliente</option>
                      <option value="installations">Instalación</option>
                      <option value="jobs">Trabajo</option>
                      <option value="personal">Personal</option>
                      <option value="tasks">Tarea</option>
                      <option value="users">Usuario</option>
                      <option value="billing">Factura</option>
                      <option value="products">Productos</option>
                    </select>
                    <input className="input col-6 " type="text" placeholder="Buscar..."
                      data-search="template-search" onChange={handleChange} />

                    <div className="search-input-close col-1">
                      <i className="bx bx-x" onClick={() => props.onOpenSearch(!openSearch)}></i></div>
                  </div>

                  <ul className={openSearch ? 'search-list show' : 'search-list'}>


                    {
                      search.status === 200 ?
                        <li className="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer ">
                          
                              <div className="row m-2">

                              
                                {
                                  search.message?.map((item: any, index) => {
                                    if (seachParam.type === "clients") {
                                      return <a className="d-flex align-items-center justify-content-between w-100 col-12" href="content-helper-classes.html">
                                        <div className="d-flex justify-content-start">
                                          <span>
                                            {item.name} {item.lastname} / {item.document}
                                          </span>
                                        </div>
                                      </a>
                                    } else if (seachParam.type === "installations") {
                                      return <a className="d-flex align-items-center justify-content-between w-100" href="content-helper-classes.html">
                                        <div className="d-flex justify-content-start">
                                          <span>
                                            {item.name} / {item.location}
                                          </span>
                                        </div>
                                      </a>
                                    } else if (seachParam.type === "jobs") {
                                      return <a className="d-flex align-items-center justify-content-between w-100" href="content-helper-classes.html">
                                        <div className="d-flex justify-content-start">
                                          <span>
                                            {item.type} / {item.description}
                                          </span>
                                        </div>
                                      </a>
                                    } else if (seachParam.type === "personal") {
                                      return <a className="d-flex align-items-center justify-content-between w-100" href="content-helper-classes.html">
                                        <div className="d-flex justify-content-start">
                                          <span>
                                            {item.name} / {item.document}
                                          </span>
                                        </div>
                                      </a>
                                    } else if (seachParam.type === "tasks") {
                                      return <a className="d-flex align-items-center justify-content-between w-100" href="content-helper-classes.html">
                                        <div className="d-flex justify-content-start">
                                          <span>
                                            {item.name} / {item.description}
                                          </span>
                                        </div>
                                      </a>
                                    } else if (seachParam.type === "users") {
                                      return <div key={index}>{item.email}</div>
                                    } else if (seachParam.type === "billing") {
                                      return <div key={index}>{item.description}</div>
                                    } else if (seachParam.type === "products") {
                                      return <div key={index}>{item.description}</div>
                                    }

                                  })
                                }
</div>
                              
                        </li> : <li className="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer current_item">
                          <a className="d-flex align-items-center justify-content-between w-100" href="content-helper-classes.html">
                            <div className="d-flex justify-content-start">
                              <span className="mr-75 bx bx-help-circle" data-icon="bx bx-help-circle"></span>
                              <span>Sin Resultados</span>
                            </div>
                          </a>
                        </li>

                    }

                  </ul>
                </div>
              </li>
              <li className="dropdown dropdown-notification nav-item">
                <a
                  className="nav-link nav-link-label"
                  href="#"
                  data-toggle="dropdown"

                  onClick={
                    (e) => {
                      setShowNotification(!showNotification);
                    }
                  }
                >
                  <i className="ficon bx bx-bell"></i>
                  <span className="badge badge-pill badge-primary badge-up">
                    {not.length}
                  </span>
                </a>
                <ul className={`dropdown-menu dropdown-menu-media dropdown-menu-right ${showNotification ? "show" : ""
                  }`}>
                  <li className="dropdown-menu-header">
                    <div className="dropdown-header px-1 py-75 d-flex justify-content-between">
                      <span className="notification-title">
                        {not.length} Nuevas Notificaciones
                      </span>
                      <span className="text-bold-400 cursor-pointer">
                        Marcar como leidas
                      </span>
                    </div>
                  </li>
                  <li className="scrollable-container media-list">
                    {
                      not.map((item, index) => {
                        return <div className="d-flex justify-content-between cursor-pointer">
                          <div className="media d-flex align-items-center">
                            <div className="media-left pr-0">
                              <div className="avatar bg-primary bg-lighten-5 mr-1 m-0 p-25">
                                <span className="avatar-content text-primary font-medium-2">
                                  <i className="bx bxs-briefcase-alt-2"></i>
                                </span>
                              </div>
                            </div>
                            <div className="media-body">
                              <h6 className="media-heading">
                                <span className="text-bold-500">{item.title}</span>{" "}
                                <br />
                                {item.description}
                              </h6>
                              <small className="notification-text">{
                                item.datetime.toDateString()
                              }</small>
                            </div>
                          </div>
                        </div>
                      })
                    }




                  </li>
                  <li className="dropdown-menu-footer">
                    <a
                      className="dropdown-item p-50 text-primary justify-content-center"
                      href="javascript:void(0)"
                    >
                      Read all notifications
                    </a>
                  </li>
                </ul>
              </li>
              <li className="dropdown dropdown-user nav-item">
                <a
                  className="dropdown-toggle nav-link dropdown-user-link"
                  href="#"
                  data-toggle="dropdown"
                  onClick={
                    (e) => setShowDrop(!showDrop)
                  }
                >
                  <div className="user-nav d-sm-flex d-none">
                    <span className="user-name">{props.userData.email}</span>
                    <span className="user-status">{props.userData.role}</span>
                  </div>
                  <span>
                    <img
                      className="round"
                      src={window.location.origin + "/assets/app-assets/images/portrait/small/avatar-s-11.jpg"}
                      alt="avatar"
                      height="40"
                      width="40"
                    />
                  </span>
                </a>
                <div className={`dropdown-menu dropdown-menu-right ${showDrop ? "show" : ""
                  }`}>

                  <Link className="dropdown-item" to="/inicio/tareas">
                    <i className="bx bx-check-square mr-50"></i> Tareas
                  </Link>
                  <Link className="dropdown-item" to="/inicio/trabajos">
                    <i className="bx bx-briefcase-alt-2 mr-50"></i> Trabajos
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={() => props.onLogout()}>
                    <i className="bx bx-power-off mr-50"></i> Logout
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
