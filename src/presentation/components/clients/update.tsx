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
import { initialClient } from "application/models/clients";
import { CATALOGUE_TYPE_COUNTRY, CATALOGUE_TYPE_DOCUMENT, CATALOGUE_TYPE_MAIN_ROL_CLIENT, CATALOGUE_TYPE_MAIN_ROL_STAFF, CATALOGUE_TYPE_ORGANISATION_OR_ENTITY_WITH_PERSONALITY_LEGAL, CATALOGUE_TYPE_RECORD_AVAILABILITY, CATALOGUE_TYPE_SECONDARY_ROL_CLIENT, CATALOGUE_TYPE_SECONDARY_ROL_STAFF, CATALOGUE_TYPE_STREET, CATALOGUE_TYPE_USER_STATE, SUCCESS_HTTP_CODE_CREATED } from "application/common";
import { interface_core } from "infrastructure/api/core";
import { ClientUpdateRequest } from "infrastructure/api/clients/interface";


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


  const [catalogue, setCatalogues] = useState<interface_core.State[]>([])
  const [load, setLoad] = useState<boolean>(false)




  const [form, setForm] =
    useState<clients_interface.Client>(
      initialClient
    );


  useEffect(() => {
    setLoad(props.isLoading)
  }, [props.isLoading])

  useEffect(() => {
    let _id = id as string;
    props.onGetClientByIdAsync({
      headers: {
        token: props.token
      },
      id: parseInt(_id)
    })
  }, [id])


  useEffect(() => {
    if (props.catalogues.status == 200) {
      setCatalogues(props.catalogues.data.data)
      return;
    }
    if (props.catalogues.status != 0) {
      setMessage({
        description: props.catalogues.error,
        title: "Error la obtener catalogo",
        type: "danger",
        visible: true
      })
      setTimeout(() => {
        setMessage({
          type: "info",
          visible: false,
          title: "",
          description: "",
        });
      }, 8000);
      return;
    }

  }, [props.catalogues])

  useEffect(() => {
    if (props.GetClientById.status === 200) {


      setForm(props.GetClientById.data.data)
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
      setTimeout(() => {
        setMessage({
          type: "info",
          visible: false,
          title: "",
          description: "",
        });
      }, 8000);
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


    props.onUpdateClientAsync({
      headers: {
        token: props.token
      },
      body: form,
      id: form.id
    })


  };


  const handleChangeSelect = (
    event: React.FormEvent<HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [event.currentTarget.name]: {
        id: event.currentTarget.value
      },
    });
  };

  const getListByCode = (code: string) => {
    return catalogue.filter((item) => item.type.code === code).map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    })
  }


  return (
    <section id="basic-vertical-layouts">
      <div className="col-12 row bg-cover">
        <div className="row p-2 col-12">

          <div className="col-lg-6">
            <Input
              label="Primer Nombre"
              name="firstName"
              type={"text"}
              value={form.firstName}
              onChange={handleChange}

            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Segundo Nombre"
              name="secondName"
              type={"text"}
              value={form.secondName}
              onChange={handleChange}


            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Primer Apellido"
              name="firstSurname"
              type={"text"}
              value={form.firstSurname}
              onChange={handleChange}


            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Segundo Apellido"
              name="secondSurname"
              type={"text"}
              value={form.secondSurname}
              onChange={handleChange}


            />
          </div>
          <div className="col-lg-6">
            <Select
              label="Tipo de Persona"
              name="personType"
              onChange={handleChangeSelect}
              options={getListByCode(CATALOGUE_TYPE_ORGANISATION_OR_ENTITY_WITH_PERSONALITY_LEGAL)}
              selected={form.personType.id}
            />
          </div>
          <div className="col-lg-6">
            <Select
              label="Tipo de Documento"
              name="documentType"
              onChange={handleChangeSelect}
              options={getListByCode(CATALOGUE_TYPE_DOCUMENT)}
              selected={form.documentType.id}
            />
          </div>

          <div className="col-lg-6">
            <Input
              label="Documento"
              name="documentValue"
              type={"text"}
              onChange={handleChange}

              value={form.documentValue}
            />
          </div>
          <div className="col-lg-6">
            <Select
              label="Pais"
              name="country"
              onChange={handleChangeSelect}
              options={getListByCode(CATALOGUE_TYPE_COUNTRY)}
              selected={form.country.id}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Estado/Pronvincia"
              name="province"
              type={"text"}
              onChange={handleChange}

              value={form.province}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Localidad"
              name="location"
              type={"text"}
              onChange={handleChange}

              value={form.location}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Dirección"
              name="direction"
              type={"text"}
              onChange={handleChange}

              value={form.direction}
            />
          </div>
          <div className="col-lg-6">
            <Select
              label="Tipo de Calle"
              name="streetType"
              onChange={handleChangeSelect}
              options={getListByCode(CATALOGUE_TYPE_STREET)}
              selected={form.streetType.id}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Codigo Postal"
              name="postalCode"
              type={"text"}
              onChange={handleChange}


              value={form.postalCode}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Telefono Fijo"
              name="landlinePhone"
              type={"tel"}
              onChange={handleChange}

              value={form.landlinePhone}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Telefono Celular"
              name="mobilePhone"
              type={"tel"}
              onChange={handleChange}

              value={form.mobilePhone}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Telefono de contacto"
              name="firstContact"
              type={"tel"}
              onChange={handleChange}

              value={form.firstContact}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Telefono de contacto secundario"
              name="secondContact"
              type={"tel"}
              onChange={handleChange}

              value={form.secondContact}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Horario de contacto"
              name="contactSchedule"
              type={"text"}
              onChange={handleChange}

              value={form.contactSchedule}
            />
          </div>
        </div>
        <hr />
        <div className="col-12 row p-2">
          <div className="col-lg-6">
            <Input
              label="Nombre de usuario"
              name="nickName"
              type={"text"}
              onChange={handleChange}

              value={form.nickName}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Email"
              name="email"
              type={"email"}
              onChange={handleChange}

              value={form.email}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Email Secundario"
              name="secondaryEmail"
              type={"email"}
              onChange={handleChange}

              value={form.secondaryEmail}
            />
          </div>
          <div className="col-lg-6">
            <Input
              label="Email de respaldo"
              name="backupEmail"
              type={"email"}
              onChange={handleChange}

              value={form.backupEmail}
            />
          </div>

          <div className="col-lg-6">
            <Select
              label="Rol"
              name="role"
              onChange={handleChangeSelect}
              options={getListByCode(CATALOGUE_TYPE_MAIN_ROL_CLIENT)}
              selected={form.role.id}
            />
          </div>

          <div className="col-lg-6">
            <Select
              label="Activo"
              name="state"
              onChange={handleChangeSelect}
              options={getListByCode(CATALOGUE_TYPE_USER_STATE)}
              selected={form.state.id}
            />
          </div>
          <div className="col-lg-6">
            <Select
              label="Disponibilidad"
              name="availability"
              onChange={handleChangeSelect}
              options={getListByCode(CATALOGUE_TYPE_RECORD_AVAILABILITY)}
              selected={form.availability.id}
            />
          </div>
        </div>
        <div className="col-12 r.ow ">
          <div className="col-12 justify-content-end d-md-flex ">
            <Link
              type="button"
              className="btn btn-lg btn-outline-dark m-2"
              to={`/inicio/clientes/`}
            >
              Atrás
            </Link>
            {
              load ? <button type="button" className="btn btn-lg btn-primary m-2" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Cargando...
              </button> : <button
                type="submit"
                className="btn btn-lg btn-primary m-2"
                value={"Agregar"}
                onClick={handleSubmit}
              >
                Guardar
              </button>
            }

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
