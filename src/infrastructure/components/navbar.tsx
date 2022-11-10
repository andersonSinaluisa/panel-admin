import React, { useEffect, useState } from "react";
import { URLAPI } from "../../application/common";
import { LoginResponse } from "../api/auth/interface";

interface NavbarProps{
    dataLogin:LoginResponse;
    onLogout:Function;
}

const Navbar = (props:NavbarProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      openMenu();
    } else {
      hideMenu();
    }
  }, [open]);

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
  
              <li className="dropdown dropdown-notification nav-item">
                <a
                  className="nav-link nav-link-label"
                  href="#"
                  data-toggle="dropdown"
                >
                  <i className="ficon bx bx-bell"></i>
                  <span className="badge badge-pill badge-primary badge-up">
                    5
                  </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-media dropdown-menu-right">
                  <li className="dropdown-menu-header">
                    <div className="dropdown-header px-1 py-75 d-flex justify-content-between">
                      <span className="notification-title">
                        7 new Notification
                      </span>
                      <span className="text-bold-400 cursor-pointer">
                        Mark all as read
                      </span>
                    </div>
                  </li>
                  <li className="scrollable-container media-list">
                    <a
                      className="d-flex justify-content-between"
                      href="javascript:void(0)"
                    >
                      <div className="media d-flex align-items-center">
                        <div className="media-left pr-0">
                          <div className="avatar mr-1 m-0">
                            <img
                              src="../../../app-assets/images/portrait/small/avatar-s-11.jpg"
                              alt="avatar"
                              height="39"
                              width="39"
                            />
                          </div>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">
                            <span className="text-bold-500">
                              Congratulate Socrates Itumay
                            </span>{" "}
                            for work anniversaries
                          </h6>
                          <small className="notification-text">
                            Mar 15 12:32pm
                          </small>
                        </div>
                      </div>
                    </a>
                    <div className="d-flex justify-content-between read-notification cursor-pointer">
                      <div className="media d-flex align-items-center">
                        <div className="media-left pr-0">
                          <div className="avatar mr-1 m-0">
                            <img
                              src="../../../app-assets/images/portrait/small/avatar-s-16.jpg"
                              alt="avatar"
                              height="39"
                              width="39"
                            />
                          </div>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">
                            <span className="text-bold-500">New Message</span>{" "}
                            received
                          </h6>
                          <small className="notification-text">
                            You have 18 unread messages
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between cursor-pointer">
                      <div className="media d-flex align-items-center py-0">
                        <div className="media-left pr-0">
                          <img
                            className="mr-1"
                            src="../../../app-assets/images/icon/sketch-mac-icon.png"
                            alt="avatar"
                            height="39"
                            width="39"
                          />
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">
                            <span className="text-bold-500">
                              Updates Available
                            </span>
                          </h6>
                          <small className="notification-text">
                            Sketch 50.2 is currently newly added
                          </small>
                        </div>
                        <div className="media-right pl-0">
                          <div className="row border-left text-center">
                            <div className="col-12 px-50 py-75 border-bottom">
                              <h6 className="media-heading text-bold-500 mb-0">
                                Update
                              </h6>
                            </div>
                            <div className="col-12 px-50 py-75">
                              <h6 className="media-heading mb-0">Close</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between cursor-pointer">
                      <div className="media d-flex align-items-center">
                        <div className="media-left pr-0">
                          <div className="avatar bg-primary bg-lighten-5 mr-1 m-0 p-25">
                            <span className="avatar-content text-primary font-medium-2">
                              LD
                            </span>
                          </div>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">
                            <span className="text-bold-500">New customer</span>{" "}
                            is registered
                          </h6>
                          <small className="notification-text">1 hrs ago</small>
                        </div>
                      </div>
                    </div>
                    <div className="cursor-pointer">
                      <div className="media d-flex align-items-center justify-content-between">
                        <div className="media-left pr-0">
                          <div className="media-body">
                            <h6 className="media-heading">New Offers</h6>
                          </div>
                        </div>
                        <div className="media-right">
                          <div className="custom-control custom-switch">
                            <input
                              className="custom-control-input"
                              type="checkbox"
                              checked
                              id="notificationSwtich"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="notificationSwtich"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between cursor-pointer">
                      <div className="media d-flex align-items-center">
                        <div className="media-left pr-0">
                          <div className="avatar bg-danger bg-lighten-5 mr-1 m-0 p-25">
                            <span className="avatar-content">
                              <i className="bx bxs-heart text-danger"></i>
                            </span>
                          </div>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">
                            <span className="text-bold-500">Application</span>{" "}
                            has been approved
                          </h6>
                          <small className="notification-text">6 hrs ago</small>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between read-notification cursor-pointer">
                      <div className="media d-flex align-items-center">
                        <div className="media-left pr-0">
                          <div className="avatar mr-1 m-0">
                            <img
                              src="../../../app-assets/images/portrait/small/avatar-s-4.jpg"
                              alt="avatar"
                              height="39"
                              width="39"
                            />
                          </div>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">
                            <span className="text-bold-500">New file</span> has
                            been uploaded
                          </h6>
                          <small className="notification-text">4 hrs ago</small>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between cursor-pointer">
                      <div className="media d-flex align-items-center">
                        <div className="media-left pr-0">
                          <div className="avatar bg-rgba-danger m-0 mr-1 p-25">
                            <div className="avatar-content">
                              <i className="bx bx-detail text-danger"></i>
                            </div>
                          </div>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">
                            <span className="text-bold-500">
                              Finance report
                            </span>{" "}
                            has been generated
                          </h6>
                          <small className="notification-text">
                            25 hrs ago
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between cursor-pointer">
                      <div className="media d-flex align-items-center border-0">
                        <div className="media-left pr-0">
                          <div className="avatar mr-1 m-0">
                            <img
                              src="../../../app-assets/images/portrait/small/avatar-s-16.jpg"
                              alt="avatar"
                              height="39"
                              width="39"
                            />
                          </div>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">
                            <span className="text-bold-500">New customer</span>{" "}
                            comment recieved
                          </h6>
                          <small className="notification-text">
                            2 days ago
                          </small>
                        </div>
                      </div>
                    </div>
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
                >
                  <div className="user-nav d-sm-flex d-none">
                    <span className="user-name">User</span>
                    <span className="user-status">User</span>
                  </div>
                  <span>
                    <img
                      className="round"
                      src={window.location.origin+"/assets/app-assets/images/portrait/small/avatar-s-11.jpg"}
                      alt="avatar"
                      height="40"
                      width="40"
                    />
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-user mr-50"></i> Edit Profile
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-envelope mr-50"></i> My Inbox
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-check-square mr-50"></i> Task
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-message mr-50"></i> Chats
                  </a>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item"  onClick={()=>props.onLogout()}>
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
