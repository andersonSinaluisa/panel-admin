import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useBreadcrumbs,
  useTitle,
} from "application/common/hooks/use-title";
import Input from "infrastructure/components/input";
import Toast, { ToastProps } from "infrastructure/components/toast";
import Select from "infrastructure/components/select";
import { clients_interface } from "infrastructure/api/clients";
import { user_interface } from "infrastructure/api/users";
import { UpdateClientProps } from "presentation/container/clients/update-container";
import DataTable from "infrastructure/components/data-table";
import { initialClient, initialClientUpdate } from "application/models/clients";

const UpdateClient = (props: UpdateClientProps) => {
  useTitle(props.title);
  useBreadcrumbs(props.breadcrumbs);

  const { id } = useParams();

  let navigate = useNavigate()

  const [message, setMessage] = useState<ToastProps>({
    type: "info",
    visible: false,
    title: "",
    description: "",
  });


  const [users, setUsers] = useState<user_interface.User[]>([])

  const [form, setForm] =
    useState<clients_interface.Client>(
      initialClient
    );


  useEffect(() => {
    let _id = id as string;
    props.onGetClientByIdAsync({
      headers: {
        token: props.token
      },
      id: _id
    })
  }, [id])


  useEffect(() => {
    if (props.GetClientById.status === 200) {


      setForm(props.GetClientById.data.message)
    }
  }, [props.GetClientById])

  useEffect(() => {
    if (props.UpdateClient.status === 200) {
      setMessage({
        description: "Cliente Creado correctamente",
        title: "",
        type: "success",
        visible: true
      })

      navigate('/inicio/clientes/')
    }

    if (props.UpdateClient.status !== 0) {
      setMessage({
        description: props.UpdateClient.error,
        title: "Error",
        type: "danger",
        visible: true
      })
    }
  }, [props.UpdateClient])


  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = () => {

    let error = ""

    let datos:clients_interface.ClientUpdateRequest = initialClientUpdate;

    //validate data from key and values typescript
    Object.keys(datos).forEach((key) => {
      if (datos[key as keyof clients_interface.ClientUpdateRequest] === "") {
        error = "Todos los campos son obligatorios";
      }
    });



    if (error !== "") {
      setMessage({
        description: error,
        title: "Error",
        type: "danger",
        visible: true
      })
      return;
    }

    props.onUpdateClientAsync({
      headers: {
        token: props.token
      },
      body: datos,
      id: form.id
    })


  };

  return (
    <section id="basic-vertical-layouts">
      <div className="col-12 row bg-cover">
        <div className="row p-2 col-12">


        </div>
        <div className="col-12 row ">
          <div className="col-12 justify-content-end d-md-flex ">
            <Link
              type="button"
              className="btn btn-lg btn-outline-dark m-2"
              to={`/inicio/clientes/`}
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

export default UpdateClient;
