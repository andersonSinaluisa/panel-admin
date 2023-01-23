import React, { useEffect, useState } from "react";
import { useAuth } from "../../../application/common/hooks/use-auth";
import * as Globals from "../../../application/common/index";
import { auth_interfaces } from "infrastructure/api/auth";
import { Link } from "react-router-dom";
import Toast, { ToastProps } from "infrastructure/components/toast";

const Login = () => {
  let appname = Globals.APP_NAME;
  const { onLogin, error } = useAuth();

  const [data, setData] = useState<auth_interfaces.LoginRequest>({
    email: "",
    password: "",
  });

  const [load, setLoad] = useState<boolean>(false);

  const [message, setMessage] = useState<ToastProps>({
    type: "info",
    visible: false,
    title: "",
    description: "",
  });

  useEffect(() => {

    if (error !== "") {

      setMessage({
        description: error,
        title: "Error",
        type: "danger",
        visible: true,
      });
    }
    setLoad(false);

  }, [error, load]);

  const handleChange = (e: React.ChangeEvent) => {
    const target: EventTarget & HTMLInputElement = e.target as EventTarget &
      HTMLInputElement;
    const value = target.value;
    const name = target.name;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (load){
      return;
    }
    setLoad(true);
    onLogin(data);

  };

  return (
    <section id="auth-login" className="row flexbox-container ">
      <div className="col-xl-12 col-12">
        <div className="bg-authentication mb-0">
          <div className="row m-0">
            <div className="col-md-12  col-lg-6 col-12 px-md-5 mt-5">
              <h4 className="text-center mb-2"><img className="logo" src={window.location.origin + "/assets/app-assets/images/logo/logo.png"}
                style={{
                  WebkitFilter: "drop-shadow(1px 1px 0 white) drop-shadow(-1px -1px 0 white)",
                  filter: "drop-shadow(1px 1px 0 white) drop-shadow(-1px -1px 0 white)",
                  width: "150px",
                  height: "50px"

                }} /></h4>

              <div className="card disable-rounded-right mb-0 p-2  d-flex justify-content-center m-md-3">
                <div className="card-content">
                  <div className="card-body">
                    <form onSubmit={handleSubmit} className="p-md-2">
                      <div className="form-group mb-50">
                        <label htmlFor="email">Correo</label>
                        <input
                          type="email"
                          className="form-control"
                          onChange={handleChange}
                          name="email"
                          id="email"
                          placeholder=""
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                          type="password"
                          className="form-control"
                          onChange={handleChange}
                          name="password"
                          id="password"
                          placeholder=""
                        />
                      </div>
                      <div className="form-group d-flex flex-md-row flex-column justify-content-between align-items-center">
                        <div className="text-left"></div>
                        <div className="text-right">
                          <Link to="recordar-contrasenia" className="card-link">
                            <small>¿Olvidó su contraseña?</small>
                          </Link>
                        </div>
                      </div>
                      {
                        load ? (
                          <button
                            type="button"
                            className="btn btn-primary glow w-100 position-relative"
                            disabled
                          >
                            <i className="bx bx-loader bx-spin white align-middle mr-50"></i>
                            <span className="align-middle">Ingresando...</span>
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-primary glow w-100 position-relative"
                          >
                            Ingresar
                            <i
                              id="icon-arrow"
                              className="bx bx-right-arrow-alt"
                            ></i>
                          </button>)
                      }

                    </form>
                    <hr />

                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-lg-block d-none text-center align-self-center ">
              <div className="card-content">
                <img
                  className="img-fluid"
                  src={window.location.origin + "/assets/app-assets/images/pages/login/undraw_presentation_re_sxof.svg"}
                  alt="branding logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="toast-bs-container">
        <Toast {...message} />
      </div>
    </section>
  );
};

export default Login;
