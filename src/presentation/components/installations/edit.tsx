import React, { useEffect, useState } from "react";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import Input from "infrastructure/components/input";
import Toast, { ToastProps } from "infrastructure/components/toast";
import { CreateInstallationProps } from "presentation/container/installations/create-container";
import { Link, useNavigate } from "react-router-dom";
import { installations_interface } from "infrastructure/api/installation";
import { SUCCESS_HTTP_CODE_CREATED } from "application/common";
import Select from "infrastructure/components/select";
import { clients_interface } from "infrastructure/api/clients";
import SelectReact from 'react-select';

const EditInstallation = (props: CreateInstallationProps) => {
  useTitle(props.title);
  useBreadcrumbs(props.breadcrumbs);

  let navigate = useNavigate();

  const [message, setMessage] = useState<ToastProps>({
    type: "info",
    visible: false,
    title: "",
    description: "",
  });

  const [form, setForm] =
    useState<installations_interface.CreateInstallationRequest>({
      name: "",
      owner: "",
      postalCode: "",
      location: "",
      province: "",
      country: "",
      note: "",
    });


  const [clients, setClients] = useState<clients_interface.GetClientsResponse>({
    message: [],
    status: 0
  })

  useEffect(() => {
    if (props.CreateInstallation.status === 200) {
      setMessage({
        description: "Proveedor Creado correctamente",
        title: "",
        type: "success",
        visible: true,
      });

      navigate("/inicio/instalaciones/");
    }

    if (props.CreateInstallation.status !== 0) {
      setMessage({
        description: props.CreateInstallation.error,
        title: "Error",
        type: "danger",
        visible: true,
      });
    }
  }, [props.CreateInstallation]);

  useEffect(() => {
    setClients(props.GetClients);
  }, [props.GetClients])

  useEffect(() => {

    props.onGetClientsAsync({
      token: props.token
    })
  }, [])




  const handleChange = (
    event: React.FormEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = () => {
    //validate form fields
    if (form.country == "") {
      setMessage({
        description: "El campo pais es requerido",
        title: "Error",
        type: "danger",
        visible: true,
      });
      return;
    }

    if (form.location == "") {
      setMessage({
        description: "El campo localidad es requerido",
        title: "Error",
        type: "danger",
        visible: true,
      });
      return;
    }

    if (form.name == "") {
      setMessage({
        description: "El campo nombre es requerido",
        title: "Error",
        type: "danger",
        visible: true,
      });
      return;
    }

    if (form.owner == "") {
      setMessage({
        description: "El campo propietario es requerido",
        title: "Error",
        type: "danger",
        visible: true,
      });
      return;
    }

    if (form.postalCode == "") {
      setMessage({
        description: "El campo codigo postal es requerido",
        title: "Error",
        type: "danger",
        visible: true,
      });

      return;
    }

    if (form.province == "") {
      setMessage({
        description: "El campo provincia es requerido",
        title: "Error",
        type: "danger",
        visible: true,
      });
      return;
    }

    props.CreateInstallationAsync({
      headers: {
        token: props.token,
      },
      body: form,
    });
  };

  return (
    <section id="basic-vertical-layouts">
      <div className="col-12 row bg-cover">
        <div className="row p-2 col-12">
          <div className="col-lg-6">
            <Input
              label="Nombre"
              name="name"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-5">
          
            <label htmlFor="userId">Propietario</label>
            <SelectReact
              isSearchable={true}
              name="owner"
              options={clients.message.map(e => ({
                value: e._id,
                label: e.name + " " + e.lastname
              }))}
              placeholder="Seleccione un propietario"
              onChange={
                (e: any) => {
                  setForm({
                    ...form,
                    owner: e.value,
                  })
                }
              }

            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Código Postal"
              name="postalCode"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Ubicación"
              name="location"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Provincia"
              name="province"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="País"
              name="country"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">

            <div className="form-group row align-items-center">
              <div className="col-sm-1 col-4">
                <label className="col-form-label">Notas</label>
              </div>
              <div className="col-sm-11 col-8">
                <textarea className="form-control" id="note"
                  name="note"
                  onChange={handleChange}
                  rows={3} placeholder="Agrega detalles aqui"></textarea>
              </div>
            </div>
          </div>

          <div className="col-lg-6"></div>
        </div>
        <div className="col-12 row ">
          <div className="col-12 justify-content-end d-md-flex ">
            <Link
              type="button"
              className="btn btn-lg btn-outline-dark m-2"
              to={`/inicio/instalaciones/`}
            >
              Atrás
            </Link>
            <button
              type="submit"
              className="btn btn-lg btn-primary m-2"
              value={"Agregar"}
              onClick={handleSubmit}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
      <div className="toast-bs-container">
        <Toast {...message} />
      </div>
    </section>
  );
};

export default EditInstallation;
