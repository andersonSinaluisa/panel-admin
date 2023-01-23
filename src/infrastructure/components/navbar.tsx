import { isClient, isInstallation, isJob, isPersonal, isTask, isUser } from "application/common/utils/is";
import { similarity } from "application/common/utils/similarity";
import { notification } from "application/models/notifications";
import { auth_interfaces } from "infrastructure/api/auth";
import { clients_interface } from "infrastructure/api/clients";
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
  notifications: notification[];
}

const Navbar = (props: NavbarProps) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState<search_interface.SearchResponse>({
    message: {
      clients: [],
      installations: [],
      jobs: [],
      personal  : [],
      tasks: [],
      products  : [],
      users: [],
    },
    status: 0
  });
  const [showDrop, setShowDrop] = useState(false);

  const [showNotification, setShowNotification] = useState(false);

  const [not, setNot] = useState<notification[]>([]);


  const [seachParam, setSearchParam] = useState({
    identityCounter: "",
    type: "",
  });

  const [showNotTask, setShowNotTask] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState("0");

  const [selectFilter, SetSelectFilter] = useState<{
    type: string,
    label: string
  }[]>([])


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

    //obtener la similitud de la palabra escrita en el input
    let client = similarity(e.currentTarget.value, "Clientes");
    let type = "";
    let label = "";
    if (client > 0.5) {
      type = "clients";
      label = "Clientes";
    }

    let installation = similarity(e.currentTarget.value, "Instalaciones");
    if (installation > 0.5) {
      type = "installations";
      label = "Instalaciones";
    }

    let job = similarity(e.currentTarget.value, "Trabajos");
    if (job > 0.5) {
      type = "jobs";
      label = "Trabajos";
    }

    let task = similarity(e.currentTarget.value, "Tareas");
    if (task > 0.5) {
      type = "tasks";
      label = "Tareas";
    }

    let user = similarity(e.currentTarget.value, "Usuarios");
    if (user > 0.5) {
      type = "users";
      label = "Usuarios";
    }

    let personal = similarity(e.currentTarget.value, "Personal");
    if (personal > 0.5) {
      type = "personal";
      label = "Personal";
    }

    let billing = similarity(e.currentTarget.value, "Facturas");
    if (billing > 0.5) {
      type = "billing";
      label = "Facturas";
    }
    


    seachParam.type = type;

    if (type != "") {

      //si el tipo de busqueda no se encuentra en selectFilter
      if (selectFilter.findIndex((item) => item.type == type) == -1) {

        SetSelectFilter([{
          type: type,
          label: label
        }])
      }
      console.log(selectFilter)

    }
    props.onSearch(
      "",
      type
    );




  }



  


  const handleSelectItem = (item: any) => {
    console.log(item)
    if (seachParam.type === "clients") {
      navigate(`/inicio/clientes/${item._id}`);
    }

    if (seachParam.type === "installations") {
      navigate(`/inicio/instalaciones/${item._id}`);
    }

    if (seachParam.type === "jobs") {
      navigate(`/inicio/trabajos/${item._id}`);
    }

    if (seachParam.type === "personals") {
      navigate(`/inicio/personal/${item._id}`);
    }

    if (seachParam.type === "tasks") {
      navigate(`/inicio/tareas/${item._id}`);
    }

    if (seachParam.type === "users") {
      navigate(`/inicio/usuarios/${item._id}`);
    }

    if (seachParam.type === "billing") {
      navigate(`/inicio/facturas/${item._id}`);
    }
    props.onOpenSearch(false);
  }



  const handleFilterData = (e: any) => {
    let value = e.currentTarget.value;

    console.log(e.currentTarget)
    let data = selectFilter;
    //get selected

    //if value and name no exist in selectFilter
    if (data.findIndex((item) => item.label == value) == -1) {

      data.push({
        label: value,
        type: value
      })

      SetSelectFilter(data);

    }
    setSelectedFilter(value);

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
                <li className="dropdown dropdown-notification nav-item">
                <a
                  className="nav-link nav-link-label"
                  href="#"
                  data-toggle="dropdown"

                  onClick={
                    (e) => {
                      setShowNotTask(!showNotTask);
                    }
                  }
                >
                  <i className="ficon bx bx-check-square"></i>
                  <span className="badge badge-pill badge-warning badge-up">
                    { not.filter(x=>x.title=="Tareas").length}
                  </span>
                </a>
                <ul className={`dropdown-menu dropdown-menu-media dropdown-menu-left ${showNotTask ? "show" : ""
                  }`}>
                  <li className="dropdown-menu-header bg-warning">
                    <div className="dropdown-header px-1 py-75 d-flex justify-content-between">
                      <span className="notification-title">
                        { not.filter(x=>x.title=="Tareas").length} Nuevas Notificaciones
                      </span>
                      <span className="text-bold-400 cursor-pointer">
                        Marcar como leidas
                      </span>
                    </div>
                  </li>
                  <li className="scrollable-container media-list" style={{
                    overflowY: "scroll",
                  }}>
                    {
                       not.filter(x=>x.title=="Tareas").map((item, index) => {
                        return <div className="d-flex justify-content-between cursor-pointer" onClick={
                          () => {
                            navigate(`/inicio/tareas/?task=${item.data._id}`);
                          }
                        }>
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

                    <input className="input col-6 ml-5" type="text" placeholder="Buscar..."
                      data-search="template-search" onChange={handleChangeType} />
                    {
                      seachParam.type !== "" ?
                        <div>

                          <div className="d-flex align-items-center justify-content--between w-100 col-12"

                          >
                            <div className="d-flex align-items-center">
                              <div className="list-item-heading w-100 row" style={
                                {
                                  display: openSearch ? "flex" : "none"
                                }
                              }>
                              </div>


                            </div>
                          </div>
                        </div>

                        : null
                    }
                    <div className="search-input-close col-1">
                      <i className="bx bx-x" onClick={() => props.onOpenSearch(!openSearch)}></i>
                    </div>
                  </div>

                  <ul className={openSearch ? 'search-list show' : 'search-list'}>
                    <li className="d-flex cursor-pointer">
                      {
                        //add badge to search list
                        selectFilter.map(item => {
                          return (
                            <a className="d-flex" href="content-helper-classes.html">
                              <div className="chip chip-success chip-closeable">
                                <div className="chip-body">
                                  <span className="chip-text">{item.label}</span>
                                </div>
                                <button type="button" className="close" aria-label="Close">
                                  <i className="bx bx-x"></i>
                                </button>
                              </div>

                            </a>

                          )
                        })

                      }
                    </li>



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
                    {not.filter(x=>x.title=='Instalación').length}
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
                  <li className="scrollable-container media-list" style={{
                    overflowY: "scroll",
                  }}>
                    {
                      not.filter(x=>x.title=="Instalación").map((item, index) => {
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
                    <span className="user-name">{props.dataLogin.data.firstName+ " "+props.dataLogin.data.secondName}</span>
                    <span className="user-status">{props.dataLogin.data.role?.name}</span>
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
