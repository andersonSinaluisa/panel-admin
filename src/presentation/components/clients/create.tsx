import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SUCCESS_HTTP_CODE_CREATED } from "application/common";
import {
  useBreadcrumbs,
  useTitle,
} from "application/common/hooks/use-title";
import Input from "infrastructure/components/input";
import Toast, { ToastProps } from "infrastructure/components/toast";
import Select from "infrastructure/components/select";
import { CreateClientProps } from "presentation/container/clients/create-container";
import { clients_interface } from "infrastructure/api/clients";
import { user_interface } from "infrastructure/api/users";
import SelectReact from 'react-select';
import json from 'application/common/utils/datos.json';


const CreateClient = (props: CreateClientProps) => {
  useTitle(props.title);
  useBreadcrumbs(props.breadcrumbs);

  let navigate = useNavigate()

  const [message, setMessage] = useState<ToastProps>({
    type: "info",
    visible: false,
    title: "",
    description: "",
  });


  const [users, setUsers] = useState<user_interface.User[]>([])

  const [form, setForm] = useState<clients_interface.CreateClientRequest>(
    {
      userId: "",
      personType: "",
      documentType: "",
      document: "",
      name: "",
      lastname: "",
      customerType: "",
      roadType: "",
      direction: "",
      postalCode: "",
      location: "",
      province: "",
      country: "",
      phone: "",
      mobilePhone: "",
      contact: "",
      contact2: "",
      email: "",
      webpage: "",
      contactSchedule: "",
      discount: "0",
      note: "",
    }
  );


  useEffect(() => {
    setUsers(props.GetUsers);
  }, [props.GetUsers])

  useEffect(() => {
    props.onGetUsersAync({
      token: props.token
    })
  }, [])

  useEffect(() => {
    if (props.CreateClients.status === SUCCESS_HTTP_CODE_CREATED) {
      setMessage({
        description: "Cliente Creado correctamente",
        title: "",
        type: "success",
        visible: true
      })

      navigate('/inicio/personal/')
    }

    if (props.CreateClients.status !== 0) {
      setMessage({
        description: props.CreateClients.error,
        title: "Error",
        type: "danger",
        visible: true
      })
    }
  }, [props.CreateClients])


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


    Object.values(form).forEach(e => {
      if (e == "") {
        error = "Complete todos los campos"
        return;
      }
    })



    if (error !== "") {
      setMessage({
        description: error,
        title: "Error",
        type: "danger",
        visible: true
      })
      return;
    }

    props.onCreateClientsAsync({
      headers: {
        token: props.token
      },
      body: form
    })


  };

  return (
    <section id="basic-vertical-layouts">
      <div className="col-12 row bg-cover">
        <div className="row p-2 col-12">
          <div className="col-lg-6">
            <label htmlFor="userId">Usuario</label>
            <SelectReact
              isSearchable={true}
              name="userId"
              options={users.map(e => ({
                value: e.id,
                label: e.email
              }))}
              placeholder="Seleccione un usuario"
              onChange={
                (e: any) => {
                  setForm({
                    ...form,
                    userId: e.value
                  })
                }
              }

            />

          </div>
          <div className="col-lg-6">

            <Select
              label="Tipo de Persona"
              name="personType"
              onChange={handleChange}
              options={[
                { label: 'Física', value: 'fisica' },
                { label: 'Jurídica', value: 'juridica' }
              ]}
            />
          </div>
          <div className="col-lg-6">

            <Select
              label="Tipo de Documento"
              name="documentType"
              onChange={handleChange}
              options={[
                { label: 'DNI', value: 'DNI' },
                { label: 'Otro', value: 'Otro' }
              ]}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Documento"
              name="document"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Nombre"
              name="name"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Apellido"
              name="lastname"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Select
              label="Tipo de Cliente"
              name="customerType"
              onChange={handleChange}
              options={[
                { label: 'propietario', value: 'propietario' },
                { label: 'invitado', value: 'invitado' }
              ]}
            />
          </div>
          <div className="col-lg-6">
            <Select
              label="Tipo de Vía"
              name="roadType"
              onChange={handleChange}
              options={[
                { label: 'Calle', value: 'Calle' },
                { label: 'Avenida', value: 'Avenida' },
                { label: 'Ctra', value: 'Ctra' },
                { label: 'Plaza', value: 'Plaza' }
              ]}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Dirección con numero y piso"
              name="direction"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
              <label htmlFor="">Codigo Postal</label>
            <SelectReact
              isSearchable={true}
              name="postalCode"
              options={json.map(e => ({
                value: e.codigo_postal,
                label: e.municipio_nombre+ " "+ e.codigo_postal
              }))}
              
              placeholder="Seleccione el codigo postal"
              onChange={
                (e: any) => {
                  setForm({
                    ...form,
                    postalCode: e.value
                  })
                }
              }
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Localidad"
              name="location"
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
            <Input
              label="Provincia"
              name="province"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Teléfono"
              name="phone"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Teléfono movil"
              name="mobilePhone"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Contacto"
              name="contact"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Contacto 2"
              name="contact2"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Correo"
              name="email"
              type={"email"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Sitio web"
              name="webpage"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Descuento"
              name="discount"
              type={"number"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Horario de contacto"
              name="contactSchedule"
              type={"text"}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Notas"
              name="note"
              type={"text"}
              onChange={handleChange}
            />
          </div>
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

export default CreateClient;
