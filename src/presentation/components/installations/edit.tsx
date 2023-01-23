import React, { useEffect, useState } from "react";
import { useBreadcrumbs, useTitle } from "application/common/hooks/use-title";
import Input from "infrastructure/components/input";
import Toast, { ToastProps } from "infrastructure/components/toast";
import { CreateInstallationProps } from "presentation/container/installations/create-container";
import { Link, useNavigate, useParams } from "react-router-dom";
import { installations_interface } from "infrastructure/api/installation";
import { SUCCESS_HTTP_CODE_CREATED } from "application/common";
import Select from "infrastructure/components/select";
import { clients_interface } from "infrastructure/api/clients";
import SelectReact from 'react-select';
import { EditInstallationProps } from "presentation/container/installations/edit-container";
import { initialMetaResponse } from "infrastructure/api/api-handler";
import { initialInstallation } from "application/models/installations";

const EditInstallation = (props: EditInstallationProps) => {
  useTitle(props.title);
  useBreadcrumbs(props.breadcrumbs);

  let navigate = useNavigate();

  const [message, setMessage] = useState<ToastProps>({
    type: "info",
    visible: false,
    title: "",
    description: "",
  });

  const { id } = useParams();

  const [form, setForm] =
    useState<installations_interface.Installation>(initialInstallation);


  const [clients, setClients] = useState<clients_interface.GetClientsResponse>({
    data: [],
   ...initialMetaResponse
  })

  useEffect(() => {
    setForm(props.GetInstallation.message);
  }, [props.GetInstallation]);


  useEffect(() => {
    props.GetInstallationAsync({
      headers: {
        token: props.token
      },
      id: id as string
    });
  }, []);

  useEffect(() => {
    setClients(props.GetClients);
  }, [props.GetClients])

  useEffect(() => {

    props.onGetClientsAsync({
      token: props.token
    })
  }, [])






  return (
    <section id="basic-vertical-layouts">
      <div className="col-12 row bg-cover">
        <div className="row p-2 col-12">

          <div className="col-lg-6">

            <label htmlFor="userId">Propietario</label>
            
          </div>
          <div className="col-lg-6">
            <Input
              label="Código Postal"
              name="postalCode"
              type={"text"}
              value={form.postalCode}
              enabled={true}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Locación"
              name="location"
              type={"text"}
              enabled={true}

              value={form.location}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Provincia"
              name="province"
              type={"text"}
              enabled={true}

              value={form.province}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="País"
              name="country"
              type={"text"}
              enabled={true}

              value={""}
            />
          </div>
          <div className="col-lg-6">

            <div className="form-group ">
                <label className="col-form-label">Notas</label>
                <textarea className="form-control" id="note"
                  name="note"
                  disabled={true}
                  value={""}
                  rows={3}></textarea>
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
